const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const multer = require('multer');
const fs = require('fs');
app.use(express.json());

// Middleware
app.use(cors());
  // Middleware to parse JSON data
app.use(bodyParser.json());

// Connect to MongoDB (replace the URL with your MongoDB URI)
mongoose.connect("mongodb://localhost:27017/AWS_Clone", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Define User Schema and Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);

// Route to handle user signup
app.post("/api/Login", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Encrypt the password

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: "User Login / Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error. Please Try Again Later" });
  }
});

// Function to create a JWT token
const createSecretToken = (userId) => {
  const token = jwt.login({ userId }, "your-secret-key", { expiresIn: "1h" });
  return token;
};

app.get("/home", (req, res) => {
  res.send("Welcome to the home page!");
});

const uploadDir = path.join(__dirname, 'uploads');

// Check if the uploads directory exists, if not, create it
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Define storage for uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to store files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Ensure unique filenames
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'text/plain'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only .pdf or .txt files are allowed!'), false);
    }
    cb(null, true);
  }
});

// POST: Upload Resume
app.post('/upload', upload.single('resume'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    // Assuming you want to save the filename to the user's record
    const userId = '675beb6f710c8a370e1beeb6'; // Replace with user-specific logic
    await User.findByIdAndUpdate(userId, { resumeFileName: req.file.filename });

    console.log(`File uploaded: ${req.file.filename}`);
    res.status(200).json({ message: 'Resume uploaded successfully!', file: req.file.filename });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error saving file information to the database.' });
  }
});


// Start the server
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});



  


