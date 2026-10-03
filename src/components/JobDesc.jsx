import React from "react";
import './JobDesc.css';

function JobDesc({ value, onChange }){
    return(
        <div className="jobdesc-card glass-panel">
            <label className="panel-label" htmlFor="job-description">Target Job Description</label>
            <textarea
                id="job-description"
                className="jobdesc-textarea"
                placeholder="Paste the job description here to tailor the analysis..."
                value={value}
                onChange={(event) => onChange(event.target.value)}
            />
        </div>
    )
}

export default JobDesc;
