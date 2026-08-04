import React from "react";
import './AnalyzeButton.css';
import { ChartIcon } from "./icons";

function AnalyzeButton(){
    return(
        <button type="button" className="analyze-button">
            <ChartIcon width={18} height={18} />
            Analyze Resume
        </button>
    )
}

export default AnalyzeButton;
