import re

# Grabs words
def extract_words(text: str) -> list[str]:
    return re.findall(r"[a-zA-Z']+", text)

# Grabs sentences by splitting on runs of .!?.
def count_sentences(text: str) -> int:
    sentences = re.split(r"[.!?]+", text)
    sentences = [s for s in sentences if s.strip()]
    return max(len(sentences), 1)

def count_syllables(word: str) -> int:
    word = word.lower()
    vowels = "aeiouy"
    count = 0
    previous_was_vowel = False
    for char in word:
        is_vowel = char in vowels
        if is_vowel and not previous_was_vowel:
            count += 1
        previous_was_vowel = is_vowel
    if word.endswith("e") and count > 1:
        count -= 1
    return max(count, 1)

def flesch_kincaid_grade(text: str) -> float:
    words = extract_words(text)
    word_count = len(words)
    if word_count == 0:
        return 0.0

    sentence_count = count_sentences(text)
    syllable_count = sum(count_syllables(word) for word in words)

    grade = (
        0.39 * (word_count / sentence_count)
        + 11.8 * (syllable_count / word_count)
        -15.59
    )

    return round(grade, 1)

def readability_label(grade: float) -> str:
    rounded = round(grade)
    if grade <= 8:
        return f"Simple (Grade {rounded})"
    elif grade <= 12:
        return f"Professional (Grade {rounded})"
    else:
        return f"Overly Complex (Grade {rounded})"