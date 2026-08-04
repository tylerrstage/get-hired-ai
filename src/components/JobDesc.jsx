import React, { useState } from "react";
import './JobDesc.css';

function JobDesc(){
    const [jobDescription, setJobDescription] = useState("");

    return(
        <div className="jobdesc-card">
            <label className="jobdesc-label" htmlFor="job-description">Target Job Description</label>
            <textarea
                id="job-description"
                className="jobdesc-textarea"
                placeholder="Paste the job description here to tailor the analysis..."
                value={jobDescription}
                onChange={(event) => setJobDescription(event.target.value)}
            />
        </div>
    )
}

export default JobDesc;
