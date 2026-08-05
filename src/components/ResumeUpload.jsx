import React, { useRef, useState } from "react";
import './ResumeUpload.css';
import { UploadIcon } from "./icons";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

function ResumeUpload({ onFileSelect}){
    const inputRef = useRef(null);
    const [fileName, setFileName] = useState(null);
    const [error, setError] = useState(null);

    const handleClick = () => {
        inputRef.current.click();
    }

    const handleChange = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
        if (!isPdf) {
            setError("Only PDF files are supported.");
            setFileName(null);
            onFileSelect(null);
            event.target.value = "";
            return;
        }

        if (file.size > MAX_FILE_SIZE_BYTES) {
            setError("File must be 5MB or smaller.");
            setFileName(null);
            onFileSelect(null);
            event.target.value = "";
            return;
        }

        setError(null);
        setFileName(file.name);
        onFileSelect(file);
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
            {error && <p className="upload-error">{error}</p>}
            <input
                ref={inputRef}
                type="file"
                accept="application/pdf,.pdf"
                style={{ display: "none" }}
                onChange={handleChange}
            />
        </div>
    )
}

export default ResumeUpload;
