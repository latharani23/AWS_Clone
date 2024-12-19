import React, { useState } from 'react';
import './Home.css'; // Optional: Create a CSS file for styling
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [language, setLanguage] = useState('English');
    const navigate = useNavigate();

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
        console.log(`Language changed to: ${event.target.value}`);
    };

    const handleLogin = () => {
        console.log("Navigating to Login...");
        navigate("/login"); 
    };

    return (
        <div className="home-container">
            {/* Navbar */}
            <nav className="navbar navbar-light bg-light">
                <a className="navbar-left" href="/">
                <img src="https://upload.aws.amazon.com/fd787e87dab37e20b9d5b0812cf1c3a3.png" height="32" alt="AWS Logo"></img></a>
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
        <div className="Document-container">

            {/* Main Content */}
            <h1>AWS Document Upload Requirements</h1>
            <p>Our team can take up to 24 hours to review the information.</p>
            <h2>Documents uploaded must meet the criteria below:</h2>
            <ul>
                <li>You should redact all biometric data, such as date of birth, ID card number, eye color, race, weight, etc. from your document before uploading.</li>
                <li>Must be legible.</li>
                <li>Can't be password-protected (remove the password before uploading).</li>
                <li>Can't be a screenshot of the original document.</li>
                <li>Must be a recent document (up to 2 months old).</li>
                <li>Must clearly show the account holder's name and credit card holder's name.</li>
                <li>All outstanding invoices on the account must be paid.</li>
                <li>For bank/credit card documents, all of the following details must be clearly visible:
                    <ul>
                        <li>The last 2-4 digits on the card.</li>
                        <li>The name on the credit account.</li>
                        <li>The address of the account holder.</li>
                        <li>The bank name.</li>
                    </ul>
                </li>
            </ul>
            <h2>Legitimate documents may include:</h2>
            <ul>
                <li>Valid proof of address.</li>
                <li>Valid proof of bank statement.</li>
                <li>Government-issued identification.</li>
            </ul>
            <h2>Additional Information</h2>
            <p>To expedite the request, please provide:</p>
            <ul>
                <li>Business name.</li>
                <li>Business phone number.</li>
                <li>The URL for your website, if applicable.</li>
                <li>A contact phone number where you can be reached if we need more information.</li>
                <li>Potential business/personal expectations for using AWS.</li>
            </ul>
        </div>
        </div>
    );
};

export default Home;
