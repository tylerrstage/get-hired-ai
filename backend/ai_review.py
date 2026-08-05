import json
import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key = os.environ["OPENAI_API_KEY"])

# JSON SCHEMA which provides a formal description of what shape I want the response in.
# In this case, I want an object with a strengths array of strings, suggestion_text string, and a suggestion_action string.
RESPONSE_SCHEMA = {
    "type": "object",
    "properties": {
        "strengths": {
            "type": "array",
            "items": {"type": "string"},
            "description": "3 specific strengths of the resume relative to the job description.",
        },
        "suggestion_text": {
            "type": "string",
            "description": "One paragraph of specific, actionable feedback on the resume's weakest area.",
        },
        "suggestion_action": {
            "type": "string",
            "description": "A short 2-4 word action label, e.g. 'Add Projects' or 'Quantify Impact'.",
        },
    },
    "required": ["strengths", "suggestion_text", "suggestion_action"],
    "additionalProperties": False,
}

# Gives the LLM model the resume and job description text so it can read them directly.
# Gives the LLM model metrics from other python files (keyword match percent, missing keywords, etc)
def build_prompt(resume_text, job_description, keyword_match_percent, missing_keywords, readability, format_passed):
    missing_keywords_str = ", ".join(missing_keywords) if missing_keywords else "none"
    return f"""You are a resume reviewer helping a candidate improve their resume for a specific job.

RESUME:
{resume_text}

JOB DESCRIPTION:
{job_description}

ALREADY-COMPUTED METRICS (use these, do not recalculate or contradict them):
- Keyword match with job description: {keyword_match_percent}%
- Missing keywords: {missing_keywords_str}
- Readability level: {readability}
- Standard formatting check passed: {format_passed}

Based on all of the above, identify 3 specific strengths of this resume relative to this job, one clear piece of actionable feedback on the resume's weakest area, and a short 2-4 word suggested action."""

def get_ai_review(resume_text, job_description, keyword_match_percent, missing_keywords, readability, format_passed):
    prompt = build_prompt(
        resume_text, job_description, keyword_match_percent, missing_keywords, readability, format_passed
    )

    response = client.chat.completions.create(
        model="gpt-5.4-mini",
        messages=[{"role": "user", "content": prompt}],
        response_format={
            "type": "json_schema",
            "json_schema": {
                "name": "resume_analysis",
                "schema": RESPONSE_SCHEMA,
                "strict": True,
            },
        },
    )

    return json.loads(response.choices[0].message.content)