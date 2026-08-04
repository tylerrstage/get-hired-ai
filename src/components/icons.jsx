import React from "react";

const base = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
};

export function UploadIcon(props) {
    return (
        <svg {...base} {...props}>
            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
            <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z" />
            <path d="M12 11v6" />
            <path d="m9.5 13.5 2.5-2.5 2.5 2.5" />
        </svg>
    );
}

export function ChartIcon(props) {
    return (
        <svg {...base} {...props}>
            <rect x="3" y="12" width="4" height="8" rx="1" />
            <rect x="10" y="7" width="4" height="13" rx="1" />
            <rect x="17" y="3" width="4" height="17" rx="1" />
        </svg>
    );
}

export function DocumentIcon(props) {
    return (
        <svg {...base} {...props}>
            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
            <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z" />
            <path d="M9 13h6" />
            <path d="M9 17h6" />
        </svg>
    );
}

export function TargetIcon(props) {
    return (
        <svg {...base} {...props}>
            <circle cx="12" cy="12" r="8" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="12" cy="12" r="0.5" fill="currentColor" />
        </svg>
    );
}

export function CheckCircleIcon(props) {
    return (
        <svg {...base} {...props}>
            <circle cx="12" cy="12" r="9" />
            <path d="m8.5 12.5 2.3 2.3 4.7-5.1" />
        </svg>
    );
}

export function WarningIcon(props) {
    return (
        <svg {...base} {...props}>
            <path d="M12 3.5 21.5 20h-19Z" />
            <path d="M12 9.5v4.5" />
            <path d="M12 17h.01" />
        </svg>
    );
}

export function LightbulbIcon(props) {
    return (
        <svg {...base} {...props}>
            <path d="M9 18h6" />
            <path d="M10 21h4" />
            <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.45.9 1.15.9 1.9V16h5.2v-.2c0-.75.3-1.45.9-1.9A6 6 0 0 0 12 3Z" />
        </svg>
    );
}

export function SparkleIcon(props) {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M12 2.5 13.9 8l5.6 1.9L13.9 12l-1.9 5.6L10.1 12 4.5 9.9 10.1 8Z" />
        </svg>
    );
}
