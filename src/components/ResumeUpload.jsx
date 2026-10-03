import React, { useEffect, useRef, useState } from "react";
import './ResumeUpload.css';
import { UploadIcon } from "./icons";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

function ResumeUpload({ file, onFileSelect }){
    const inputRef = useRef(null);
    const [error, setError] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    // A file dropped anywhere outside the drop zone would otherwise make the
    // browser navigate away to open it.
    useEffect(() => {
        const preventFileNavigation = (event) => {
            if (event.dataTransfer?.types.includes("Files")) {
                event.preventDefault();
            }
        };
        window.addEventListener("dragover", preventFileNavigation);
        window.addEventListener("drop", preventFileNavigation);
        return () => {
            window.removeEventListener("dragover", preventFileNavigation);
            window.removeEventListener("drop", preventFileNavigation);
        };
    }, []);

    // Shared validation for both the file picker and drag & drop. Returns
    // whether the file was accepted.
    const selectFile = (selected) => {
        const isPdf = selected.type === "application/pdf" || selected.name.toLowerCase().endsWith(".pdf");
        if (!isPdf) {
            setError("Only PDF files are supported.");
            onFileSelect(null);
            return false;
        }

        if (selected.size > MAX_FILE_SIZE_BYTES) {
            setError("File must be 5MB or smaller.");
            onFileSelect(null);
            return false;
        }

        setError(null);
        onFileSelect(selected);
        return true;
    }

    const handleClick = () => {
        inputRef.current.click();
    }

    const handleChange = (event) => {
        const selected = event.target.files?.[0];
        if (!selected) return;
        if (!selectFile(selected)) {
            event.target.value = "";
        }
    }

    const handleDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
        setIsDragging(true);
    }

    const handleDragLeave = (event) => {
        // Ignore leave events fired when moving between the zone's children.
        if (!event.currentTarget.contains(event.relatedTarget)) {
            setIsDragging(false);
        }
    }

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);
        const dropped = event.dataTransfer.files?.[0];
        if (dropped) {
            selectFile(dropped);
        }
    }

    return(
        <div className="upload-panel glass-panel">
            <span className="panel-label">Your Resume</span>
            <div
                className={`upload-card ${file ? "upload-card--filled" : ""} ${isDragging ? "upload-card--dragging" : ""}`}
                onClick={handleClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <span className="upload-icon">
                    <UploadIcon width={26} height={26} />
                </span>
                <h3 className="upload-title">{isDragging ? "Drop to upload" : "Drag & Drop Resume"}</h3>
                <p className="upload-subtitle">Supports PDF (Max 5MB)</p>
                <button type="button" className="upload-browse-btn">
                    {file?.name ?? "Browse Files"}
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
        </div>
    )
}

export default ResumeUpload;
