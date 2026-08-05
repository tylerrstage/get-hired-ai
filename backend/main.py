from fastapi import FastAPI
from pydantic import BaseModel
from fastapi import File, Form, UploadFile
from pdf_parser import extract_text_from_pdf
from fastapi.middleware.cors import CORSMiddleware
from tokenizer import tokenize, count_word_frequencies, top_n_words


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
    resume_frequencies = count_word_frequencies(resume_tokens)
    print("Top resume words: ", top_n_words(resume_frequencies))
    print(resume_text)

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