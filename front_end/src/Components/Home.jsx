import React, { useState } from 'react';
import './Home.css'; // Optional: Create a CSS file for styling
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Home = () => {
    const [language, setLanguage] = useState('English');
    const [imageVisible, setImageVisible] = useState(false); // Track image visibility
    const [resume, setResume] = useState(null); // Define state for resume
    const [uploadedFileName, setUploadedFileName] = useState(''); // Define state for uploaded file name
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [fileNames, setFileNames] = useState([]); // Define state for file names
    const [successMessage, setSuccessMessage] = useState(''); // Add successMessage state


    const navigate = useNavigate();

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
        console.log(`Language changed to: ${event.target.value}`);
    };

    const handleLogin = () => {
        console.log("Navigating to Login...");
        navigate("/login"); 
    };
     // Toggle image visibility and active class
     const toggleProofImage = () => {
        setImageVisible(!imageVisible);
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
    
        // Validate file type (example: only accept PDF or DOCX)
        if (file && !['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
          setError('Please upload a valid resume (PDF or DOCX).');
          setResume(null); // Reset file
        } else if (file && file.size > 5 * 1024 * 1024) { // Limit file size to 5MB
          setError('File size exceeds 5MB. Please upload a smaller file.');
          setResume(null); // Reset file
        } else {
          setError('');
          setResume(file);
        }
      };
    
      const handleSubmit = async () => {
        if (!resume) {
          setError('Please upload your resume.');
          return;
        }
    
        setError('');
        setLoading(true);
    
        // Create FormData to send file in POST request
        const formData = new FormData();
        formData.append('resume', resume);
    
        try {
          const response = await axios.post('http://localhost:5000/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    
          setUploadedFileName(response.data.file);
          setSuccessMessage('Your documents have been uploaded successfully!'); // Set success message
        } catch (error) {
          // Handle error response
          console.log(error);
          setError('Error uploading resume. Please try again.');
        } finally {
          setLoading(false);
        }
      };
    

    return (
        <div className="home-container">
            {/* Navbar */}
            <nav className="navbar navbar-light bg-light">
                <a className="navbar-left" href="/">
                <img src="https://upload.aws.amazon.com/fd787e87dab37e20b9d5b0812cf1c3a3.png" height="50" alt="AWS Logo"></img></a>
                <div className="navbar-icons">
                    <select 
                        className="language-dropdown" 
                        value={language} 
                        onChange={handleLanguageChange}
                    >
                        <option value="English">English</option>
                        <option value="Japanese">Japanese</option>
                    </select>
                    <button
                        className="login-btn"
                        onClick={handleLogin}
                        title="Login"
                    >Console Log in</button>

                </div>
            </nav>
            <nav class="navbar custom-topbar">
            <div class="custom-brand">
            <span class="info-symbol">ⓘ</span> Our team can take up to 24 hours to review the information.
            </div>
            </nav>

            

        <div className="Document-container">

            
            <h1>AWS Document Upload Requirements</h1>
            <p>Documents uploaded must meet the criteria below:</p>
            <ul className="primary-bullets">
                <li>You should redact all biometric data, such as date of birth, ID card number, eye color, race, weight, etc. from your document before uploading.</li>
                <li>Must be eligible.</li>
                <li>Can't be password-protected (remove the password before uploading).</li>
                <li>Can't be a screenshot of the original document.</li>
                <li>Must be a recent document (up to 2 months old).</li>
                <li>Must clearly show the account holder's name and credit card holder's name.</li>
                <li>All outstanding invoices on the account must be paid.</li>
                <li>For bank/credit card documents, all of the following details must be clearly visible:</li>
            </ul>

            <ul className="secondary-bullets">
                <li>The last 2-4 digits on the card.</li>
                <li>The name on the credit account.</li>
                <li>The address of the account holder.</li>
                <li>The bank name.</li>
            </ul>

        
            <p>Legitimate documents may include:</p>
            <ul>                    
                <li>Valid proof of address.</li>
                    <ul className="proof-list">
                    <li className={`toggle-item ${imageVisible ? 'active' : ''}`} onClick={toggleProofImage}>
                        <span className="toggle-arrow">{imageVisible ? '▼' : '►'} Proof of address example</span> 
                        <span className={`proof-image-container ${imageVisible ? 'show' : ''}`}>
                        <img 
                            src="https://upload.aws.amazon.com/6b1f1e8fd373bea802044a10d91bd0e3.png
" 
                        alt=" " 
                        className="proof-image" 
                        />
                        </span>
                    </li>
                </ul>

                
            </ul>
                
                    <ul>
                    <li>Valid proof of bank statement.</li>
                    <ul className="proof-list">
                    <li className={`toggle-item ${imageVisible ? 'active' : ''}`} onClick={toggleProofImage}>
                        <span className="toggle-arrow">{imageVisible ? '▼' : '►'} Proof of bank statement example</span> 
                        <span className={`proof-image-container ${imageVisible ? 'show' : ''}`}>
                        <img 
                            src=" https://upload.aws.amazon.com/e36388676b7732797b5d639f330383b6.png" 
                        alt=" " 
                        className="proof-image" 
                        />
                        </span>
                    </li>
                </ul>
                </ul>
                <ul>
                    <li> Government-issued identification.</li>
                    <ul className="proof-list">
                    <li className={`toggle-item ${imageVisible ? 'active' : ''}`} onClick={toggleProofImage}>
                        <span className="toggle-arrow">{imageVisible ? '▼' : '►'} Proof of ID example</span> 
                        <span className={`proof-image-container ${imageVisible ? 'show' : ''}`}>
                        <img 
                            src="https://upload.aws.amazon.com/6c647d05ea5e748ab07ff0eeb2f3f134.png" 
                        alt=" " 
                        className="proof-image" 
                        />
                        </span>
                    </li>
                </ul>
                </ul>

                <ul>
                    <li>Additional Information.</li>
                    <ul className="proof-list">
                    <li className="toggle-item" onClick={toggleProofImage}>
                        <span className="toggle-arrow">{imageVisible ? '▼' : '►'} To expedite the request</span>
                        <span className={`proof-image-container ${imageVisible ? 'show' : ''}`}>
                    <ul className="secondary-bullets">
                        <li>Business name</li>
                        <li>Business phone number</li>
                        <li>The URL for your website, if applicable</li>
                        <li>A contact phone number where you can be reached if we need more information</li>
                        <li>Potential business/personal expectations for using AWS</li>
                    </ul>
                        </span>
                    </li>
                </ul>
                </ul>

                <div className="container move-left">
                <nav className="document-upload-navbar">
                <a class="navbar-brand" href="#"></a>
                <h2>Document Upload</h2> </nav>
                <p> To upload a document, choose Select File. Select up to 5 files to upload. Then choose Upload.</p>
                <p><strong>Note:</strong> Submitted documents can’t be removed later.</p>
                <input
                    type="file"
                    onChange={handleFileChange}
                    multiple
                    accept=".png, .jpg, .jpeg, .pdf"
                    className="input-file"
                />
                {error && <p className="error-message">{error}</p>}

                <div className="selected-files">
                <p>{fileNames}</p>
                </div>
                <p1>PNG, JPG, and PDF file types are accepted. Each PDF can have a maximum of 25 pages. The maximum file size is 4 MB.</p1>
                <br></br><br></br>
                <button
                    className={`button ${loading ? 'button-disabled' : ''}`}
                    onClick={handleSubmit}
                    disabled={loading}
                >
            
                {loading ? 'Submitting...' : 'Upload'}
                </button>
                {successMessage && <p className="success-message">{successMessage}</p>}
                </div>
        </div>
    </div>




    );
};

export default Home;
