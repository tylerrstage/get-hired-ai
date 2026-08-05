import React from "react";
import './AnalyzeButton.css';
import { ChartIcon } from "./icons";

function AnalyzeButton({ onClick, disabled, isLoading }){
    return(
        <button type="button" className="analyze-button" onClick={onClick} disabled={disabled}>
            <ChartIcon width={18} height={18} />
            {isLoading ? "Analyzing..." : "Analyze Resume"}
        </button>
    )
}

export default AnalyzeButton;
