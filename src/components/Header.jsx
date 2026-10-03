import React from "react";
import './Header.css';

function Header(){
    return(
        <div className="header animate-in">
            <h1 className="header-title">
                Optimize your <span className="header-title-accent">resume</span> for AI <span className="header-title-accent">success</span>
            </h1>
            <p className="header-subtitle">
                Upload your resume and a target job description to check formatting,
                keyword match, and ATS compatibility.
            </p>
        </div>
    )
}

export default Header;
