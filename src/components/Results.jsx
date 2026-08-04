import React from "react";
import './Results.css';
import {
    ChartIcon,
    DocumentIcon,
    TargetIcon,
    CheckCircleIcon,
    WarningIcon,
    LightbulbIcon,
    SparkleIcon,
} from "./icons";

const SCORE = 78;
const SCORE_MAX = 100;
const RING_RADIUS = 52;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

const strengths = [
    "Action verb usage is strong in the most recent roles.",
    "Clear, parsable contact information block.",
    "Education section is well-structured and easily extracted.",
];

const missingKeywords = [
    { label: "Agile Methodology", variant: "danger" },
    { label: "Python", variant: "danger" },
    { label: "Cross-functional Collaboration", variant: "danger" },
    { label: "AWS", variant: "info" },
];

function ScoreRing({ score, max }) {
    const progress = (score / max) * RING_CIRCUMFERENCE;

    return (
        <div className="score-ring">
            <svg width="130" height="130" viewBox="0 0 130 130">
                <circle cx="65" cy="65" r={RING_RADIUS} fill="none" stroke="#e6ebfa" strokeWidth="12" />
                <circle
                    cx="65"
                    cy="65"
                    r={RING_RADIUS}
                    fill="none"
                    stroke="#2952e3"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={`${progress} ${RING_CIRCUMFERENCE}`}
                    transform="rotate(-90 65 65)"
                />
            </svg>
            <div className="score-ring-label">
                <span className="score-ring-value">{score}</span>
                <span className="score-ring-max">/ {max}</span>
            </div>
        </div>
    );
}

function Results(){
    return(
        <div className="results-card">
            <div className="results-header">
                <div>
                    <h2 className="results-title">Detailed Analysis</h2>
                    <p className="results-subtitle">Based on standard Applicant Tracking Systems (ATS)</p>
                </div>
                <span className="results-sparkle">
                    <SparkleIcon />
                </span>
            </div>

            <div className="results-stats">
                <ScoreRing score={SCORE} max={SCORE_MAX} />

                <div className="stat-card">
                    <div className="stat-card-heading">
                        <ChartIcon width={16} height={16} />
                        <span>Keyword Match</span>
                    </div>
                    <div className="stat-card-value">65%</div>
                </div>

                <div className="stat-card">
                    <div className="stat-card-heading">
                        <DocumentIcon width={16} height={16} />
                        <span>Format Check</span>
                    </div>
                    <div className="stat-card-value stat-card-value--success">Passed</div>
                </div>

                <div className="stat-card stat-card--wide">
                    <div className="stat-card-heading">
                        <TargetIcon width={16} height={16} />
                        <span>Readability Score</span>
                    </div>
                    <div className="stat-card-value">Professional</div>
                </div>
            </div>

            <hr className="results-divider" />

            <div className="results-section">
                <div className="results-section-heading results-section-heading--success">
                    <CheckCircleIcon width={16} height={16} />
                    <span>KEY STRENGTHS</span>
                </div>
                <ul className="strengths-list">
                    {strengths.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </div>

            <div className="results-section">
                <div className="results-section-heading results-section-heading--warning">
                    <WarningIcon width={16} height={16} />
                    <span>MISSING KEYWORDS</span>
                </div>
                <div className="keyword-pills">
                    {missingKeywords.map((keyword) => (
                        <span key={keyword.label} className={`keyword-pill keyword-pill--${keyword.variant}`}>
                            {keyword.label}
                        </span>
                    ))}
                </div>
            </div>

            <div className="suggestions-box">
                <div className="suggestions-heading">
                    <LightbulbIcon width={18} height={18} />
                    <span>AI Suggested Improvements</span>
                </div>
                <p className="suggestions-text">
                    Your summary statement lacks quantifiable metrics. Consider adding specific
                    achievements to increase impact.
                </p>
                <p className="suggestions-action">Suggested Action: Add Projects</p>
                <p className="suggestions-text">
                    To cover missing 'Python' and 'AWS' keywords, consider adding a distinct
                    "Technical Projects" section if you have relevant portfolio items.
                </p>
            </div>
        </div>
    )
}

export default Results;
