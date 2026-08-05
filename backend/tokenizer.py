import unicodedata

# Define a set of stopwords to filter out common words that may not be useful for analysis.
STOPWORDS = {
    "a", "an", "the", "and", "or", "but", "if", "then", "so", "of", "to",
    "in", "on", "at", "for", "with", "as", "by", "is", "are", "was", "were",
    "be", "been", "being", "this", "that", "these", "those", "it", "its",
    "from", "into", "than", "such", "not", "no", "we", "you", "your", "our",
    "i", "he", "she", "they", "them", "his", "her", "their", "will", "can",
    '•',
}

# Tokenize the input text by converting it to lowercase, removing punctuation, splitting it into words, and filtering out stopwords.
def tokenize(text: str) -> list[str]:
    text = text.lower()
    text = "".join(
        char for char in text
        if not unicodedata.category(char).startswith(("P", "S"))
    )
    words = text.split()
    return [word for word in words if word and word not in STOPWORDS]

# Takes every word from the list provided in the tokenize function and counts it's frequency, storing both word and frequency in a hash table.
def count_word_frequencies(tokens: list[str]) -> dict[str, int]:
    frequencies = {}
    for token in tokens:
        frequencies[token] = frequencies.get(token, 0) + 1
    return frequencies

# Takes the top N (in this case 10) most frequently used words and returns them in a sorted list.
def top_n_words(frequencies: dict[str, int], n: int = 10) -> list[tuple[str, int]]:
    return sorted(frequencies.items(), key=lambda item: item[1], reverse = True)[:n]