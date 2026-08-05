from fastapi import FastAPI
from pydantic import BaseModel
from fastapi import File, Form, UploadFile
from pdf_parser import extract_text_from_pdf
from fastapi.middleware.cors import CORSMiddleware
from tokenizer import tokenize, count_word_frequencies, top_n_words
from keyword_match import analyze_keyword_match
from readability import flesch_kincaid_grade, readability_label
from format_check import check_format, has_email, has_phone_number, has_required_sections
from ai_review import get_ai_review
from scoring import compute_overall_score


# Every item (missing keyword) needs more than a single value.
class MissingKeyword(BaseModel):
    label: str
    variant: str # "danger" or "info"

# Enforces shape. Ensures that every variable is of a specific type, else will raise an error.
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

# Since Vite and FastAPI run on different ports, the browser, by default, blocks them from making fetch requests to one another.
# This code intercepts every response and allows all HTTP methods (GET, POST, etc) and request headers to run from one origin to another.
app.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:5173"],
    allow_methods = ["*"],
    allow_headers = ["*"],
)

# When a GET request arrives at the URL path ("/"), read_root is called.
@app.get("/")
def read_root():
    return {"status": "ok"}

# Takes resume from user input, calls pdf_parser to extract text, and returns an analysis response.
@app.post("/analyze", response_model = AnalysisResponse)
async def analyze(resume: UploadFile = File(...), job_description: str = Form(...)):
    contents = await resume.read()
    resume_text = extract_text_from_pdf(contents)

    resume_tokens = tokenize(resume_text)
    job_tokens = tokenize(job_description)

    keyword_match_percent, missing_keyword_words = analyze_keyword_match(
        " ".join(resume_tokens), " ".join(job_tokens)
    )

    resume_frequencies = count_word_frequencies(resume_tokens)
    print("Top resume words: ", top_n_words(resume_frequencies))
    print(resume_text)

    grade = flesch_kincaid_grade(resume_text)
    readability = readability_label(grade)

    format_passed = check_format(resume_text)
    print(f"has_email = {has_email(resume_text)}, has_phone = {has_phone_number(resume_text)}, has_sections = {has_required_sections(resume_text)}")

    ai_result = get_ai_review(
        resume_text, job_description, keyword_match_percent, missing_keyword_words, readability, format_passed
    )

    overall_score = compute_overall_score(
        grade, format_passed, ai_result["overall_fit_score"]
    )

    return AnalysisResponse(
        score = overall_score,
        score_max = 100,
        keyword_match_percent = keyword_match_percent,
        format_check_passed = format_passed,
        readability_label = readability,
        strengths = ai_result["strengths"],
         missing_keywords = [
            MissingKeyword(label = word, variant = "danger") for word in missing_keyword_words
        ],
        suggestion_text = ai_result["suggestion_text"],
        suggestion_action = ai_result["suggestion_action"],
    )