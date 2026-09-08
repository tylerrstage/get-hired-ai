from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Curated vocabulary of technical skills, tools, and concepts commonly named in
# software engineering job postings. Matching is restricted to these terms
# (instead of every word in the job description) so the score reflects actual
# technical overlap instead of being diluted by company narrative/marketing text.
SKILL_VOCABULARY = [
    # Languages
    "python", "java", "javascript", "typescript", "go", "golang", "ruby", "php",
    "swift", "kotlin", "rust", "scala", "sql", "html", "css",
    # Frameworks & libraries
    "react", "react native", "nextjs", "nodejs", "express", "vue", "angular",
    "django", "flask", "spring", "rails", "tailwind", "bootstrap", "redux",
    "graphql", "tensorflow", "pytorch", "pandas", "numpy",
    # Databases
    "mongodb", "postgresql", "postgres", "mysql", "sqlite", "firebase",
    "firestore", "dynamodb", "redis", "nosql", "database", "databases",
    # Cloud & devops
    "aws", "azure", "gcp", "lambda", "s3", "ec2", "docker", "kubernetes",
    "terraform", "jenkins", "git", "github", "gitlab", "cloud", "serverless",
    "ci", "cd", "cicd",
    # Concepts & practices
    "data structures", "algorithms", "rest api", "rest apis", "api", "apis",
    "microservices", "unit testing", "unit tests", "testing", "debugging",
    "authentication", "authorization", "oauth", "jwt", "websocket",
    "websockets", "agile", "scrum", "object oriented", "version control",
    "accessibility", "performance", "reliability", "scalability",
    # AI / ML
    "machine learning", "artificial intelligence", "llm", "llms", "nlp",
    "prompt engineering",
    # Mobile
    "ios", "android", "flutter", "mobile development", "cross platform",
]

def analyze_keyword_match(resume_text: str, job_description_text: str, top_n_missing: int = 5):

    # Restricting the vectorizer's vocabulary to SKILL_VOCABULARY means only real
    # technical terms are scored, and ngram_range=(1, 2) lets multi-word terms
    # like "data structures" or "rest api" be matched as single features.
    vectorizer = TfidfVectorizer(vocabulary=sorted(set(SKILL_VOCABULARY)), ngram_range=(1, 2))
    tfidf_matrix = vectorizer.fit_transform([resume_text, job_description_text])

    feature_names = vectorizer.get_feature_names_out()
    resume_scores = tfidf_matrix[0].toarray()[0]
    job_scores = tfidf_matrix[1].toarray()[0]

    # Only vocabulary terms actually named in this job description are candidates
    # for the missing-keywords list below — a skill the JD never mentions can't be
    # "missing" from the resume in any way that matters.
    job_terms = [
        (word, job_score, resume_score)
        for word, job_score, resume_score in zip(feature_names, job_scores, resume_scores)
        if job_score > 0
    ]

    if not job_terms:
        return 0, []

    # cosine_similarity measures the ANGLE between the resume's and job description's
    # TF-IDF vectors over the whole skill vocabulary (not just the job_score > 0 terms
    # above — job_terms is only used for the missing-keyword ranking below). Because
    # it uses the actual TF-IDF weights rather than a simple "present or not" check, a
    # skill the JD repeats several times counts for more than one it mentions once,
    # and partial overlap produces a smoother, in-between score instead of a hard 0/1
    # per term. tfidf_matrix has exactly 2 rows: [0] = resume, [1] = job description.
    # cosine_similarity returns a 2D array (each input can hold multiple vectors), so
    # [0][0] pulls out the single scalar comparing those two rows to each other.
    similarity = cosine_similarity(tfidf_matrix[0], tfidf_matrix[1])[0][0]
    keyword_match_percent = round(100 * similarity)

    # Ranks the JD's missing skill terms by their TF-IDF weight in the job posting,
    # so the most emphasized missing skills surface first.
    missing_candidates = [(word, job_score) for word, job_score, resume_score in job_terms if resume_score == 0]
    missing_candidates.sort(key=lambda pair: pair[1], reverse=True)
    missing_keywords = [word for word, _ in missing_candidates[:top_n_missing]]

    return keyword_match_percent, missing_keywords
