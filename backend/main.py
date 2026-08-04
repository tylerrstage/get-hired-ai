from fastapi import FastAPI
from pydantic import BaseModel
from fastapi import File, Form, UploadFile

class MissingKeyword(BaseModel):
    label: str
    variant: str # "danger" or "info"

class AnalysisResponse(BaseModel):
    score: int
    score_max: int
    keyword_match_percent: int
    format_check_passed: bool
    readability_label: str
    strengths: list[str]
    missing_keywords: list[MissingKeyword]
    suggestion_text: str
    suggestion_action: str

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:5173"],
    allow_methods = ["*"],
    allow_headers = ["*"],
)

@app.get("/")
def read_root():
    return {"status": "ok"}

@app.post("/analyze", response_model = AnalysisResponse)
async def analyze(resume: UploadFile = File(...), job_description: str = Form(...)):
    contents = await resume.read()
    print(f"Received file: {resume.filename}, {len(contents)} bytes")
    print(f"Job description length: {len(job_description)} characters")

    return AnalysisResponse(
        score = 78,
        score_max = 100,
        keyword_match_percent = 65,
        format_check_passed = True,
        readability_label = "Professional",
        strengths = [
            "Action verb usage is strong in the most recent roles.",
            "Clear, parsable contact information block.",
            "Education section is well-structured and easily extracted.",
        ],
         missing_keywords = [
            MissingKeyword(label = "Agile Methodology", variant = "danger"),
            MissingKeyword(label = "Python", variant = "danger"),
            MissingKeyword(label = "AWS", variant = "info"),
        ],
        suggestion_text = "Your summary statement lacks quantifiable metrics.",
        suggestion_action = "Add Projects",
    )