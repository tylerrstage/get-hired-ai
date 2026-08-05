import React from "react";
import './Navbar.css';
import AnalyzeButton from './AnalyzeButton';

function NavBar({ onAnalyze, analyzeDisabled, isLoading }){
    return(
        <div className="navbar">
            <div className="navbar-inner">
                <span className="navbar-logo">GetHired</span>
                <AnalyzeButton onClick={onAnalyze} disabled={analyzeDisabled} isLoading={isLoading} />
            </div>
        </div>
    )
}

export default NavBar;
