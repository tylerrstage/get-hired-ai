from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def analyze_keyword_match(resume_text: str, job_description_text: str, top_n_missing: int = 5):

    # Creates a matrix where [0] is the resume text and [1] is the job text.
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform([resume_text, job_description_text])

    # Performs cosine similarity on the keywords from the resume and job description.
    similarity = cosine_similarity(tfidf_matrix[0], tfidf_matrix[1])[0][0]
    keyword_match_percent = round(similarity * 100)

    # Returns the tfidf_matrix from earlier as an array of words.
    feature_names = vectorizer.get_feature_names_out()
    # Unwraps the scores from the resume words as a 1D array of length N.
    resume_scores = tfidf_matrix[0].toarray()[0]
    # Unwraps the scores from the job description words as a 1D array of length N.
    job_scores = tfidf_matrix[1].toarray()[0]

    # Builds a list of the keywords that are found in the job description, but missing from the resume.
    candidates = [
        (word, job_score)
        for word, job_score, resume_score in zip(feature_names, job_scores, resume_scores)
        if resume_score == 0 and job_score > 0
    ]
    # Sorts the list of missing keywords from most important to least important.
    candidates.sort(key=lambda pair: pair[1], reverse=True)
    missing_keywords = [word for word, _ in candidates[:top_n_missing]]

    return keyword_match_percent, missing_keywords