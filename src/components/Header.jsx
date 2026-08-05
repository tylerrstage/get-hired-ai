import React from "react";
import './Header.css';

function Header(){
    return(
        <div className="header animate-in">
            <h1 className="header-title">Optimize Your Resume for AI Success</h1>
            <p className="header-subtitle">
                Upload your resume and target job description. Our advanced intelligence engine
                will analyze formatting, keyword density, and overall ATS compatibility.
            </p>
        </div>
    )
}

export default Header;
