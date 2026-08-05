IDEAL_READABILITY_MIN = 8
IDEAL_READABILITY_MAX = 14

def score_readability(grade: float) -> float:
    if IDEAL_READABILITY_MIN <= grade <= IDEAL_READABILITY_MAX:
        return 100.0
    distance = IDEAL_READABILITY_MIN - grade if grade < IDEAL_READABILITY_MIN else grade - IDEAL_READABILITY_MAX
    return max(0.0, 100.0 - distance * 10)

def score_format(format_passed: bool) -> float:
    return 100.0 if format_passed else 0.0

WEIGHTS = {
    "llm_fit": 0.70,
    "readability": 0.15,
    "format": 0.15,
}

def compute_overall_score(readability_grade, format_passed, llm_fit_score) -> int:
    readability_component = score_readability(readability_grade)
    format_component = score_format(format_passed)

    weighted_total = (
        + WEIGHTS["llm_fit"] * llm_fit_score
        + WEIGHTS["readability"] * readability_component
        + WEIGHTS["format"] * format_component
    )
    return round(weighted_total)
