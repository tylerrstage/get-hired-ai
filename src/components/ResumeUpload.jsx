import React, { useRef, useState } from "react";
import './ResumeUpload.css';
import { UploadIcon } from "./icons";

function ResumeUpload(){
    const inputRef = useRef(null);
    const [fileName, setFileName] = useState(null);

    const handleClick = () => {
        inputRef.current.click();
    }

    const handleChange = (event) => {
        const file = event.target.files?.[0];
        if (file) setFileName(file.name);
    }

    return(
        <div className="upload-card" onClick={handleClick}>
            <span className="upload-icon">
                <UploadIcon width={28} height={28} />
            </span>
            <h3 className="upload-title">Drag &amp; Drop Resume</h3>
            <p className="upload-subtitle">Supports PDF (Max 5MB)</p>
            <button type="button" className="upload-browse-btn">
                {fileName ?? "Browse Files"}
            </button>
            <input
                ref={inputRef}
                type="file"
                accept=".pdf,.docx"
                style={{ display: "none" }}
                onChange={handleChange}
            />
        </div>
    )
}

export default ResumeUpload;
