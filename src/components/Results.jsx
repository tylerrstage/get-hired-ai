import React from "react";
import './Results.css';
import {
    ChartIcon,
    DocumentIcon,
    TargetIcon,
    CheckCircleIcon,
    WarningIcon,
    LightbulbIcon,
} from "./icons";

const RING_RADIUS = 52;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function ScoreRing({ score, max }) {
    const progress = (score / max) * RING_CIRCUMFERENCE;

    return (
        <div className="score-ring">
            <svg width="130" height="130" viewBox="0 0 130 130">
                <circle cx="65" cy="65" r={RING_RADIUS} fill="none" stroke="var(--color-info-bg)" strokeWidth="12" />
                <circle
                    cx="65"
                    cy="65"
                    r={RING_RADIUS}
                    fill="none"
                    stroke="var(--color-primary)"
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

function Results({ result }){
    if (!result) {
        return (
            <div className="results-card">
                <p>Upload a resume and job description, then click Analyze to see your report.</p>
            </div>
        );
    }

    const {
        score,
        score_max,
        keyword_match_percent,
        format_check_passed,
        readability_label,
        strengths,
        missing_keywords,
        suggestion_text,
        suggestion_action,
    } = result;

    return(
        <div className="results-card results-card--reveal">
            <div className="results-header">
                <div>
                    <h2 className="results-title">Detailed Analysis</h2>
                    <p className="results-subtitle">Based on standard Applicant Tracking Systems (ATS)</p>
                </div>
            </div>

            <div className="results-stats">
                <ScoreRing score={score} max={score_max} />

                <div className="stat-card">
                    <div className="stat-card-heading">
                        <ChartIcon width={16} height={16} />
                        <span>Keyword Match</span>
                    </div>
                    <div className="stat-card-value">{keyword_match_percent}%</div>
                </div>

                <div className="stat-card">
                    <div className="stat-card-heading">
                        <DocumentIcon width={16} height={16} />
                        <span>Format Check</span>
                    </div>
                    <div className={`stat-card-value ${format_check_passed ? "stat-card-value--success" : ""}`}>
                        {format_check_passed ? "Passed" : "Failed"}
                    </div>
                </div>

                <div className="stat-card stat-card--wide">
                    <div className="stat-card-heading">
                        <TargetIcon width={16} height={16} />
                        <span>Readability Score</span>
                    </div>
                    <div className="stat-card-value">{readability_label}</div>
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
                    {missing_keywords.map((keyword) => (
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
                <p className="suggestions-text">{suggestion_text}</p>
                <p className="suggestions-action">Suggested Action: {suggestion_action}</p>
            </div>
        </div>
    )
}

export default Results;
