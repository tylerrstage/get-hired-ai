import re

REQUIRED_SECTIONS = ("experience", "education", "skills")

def has_email(text: str) -> bool:
    return re.search(r"[\w.+-]+@[\w-]+\.[\w.-]+", text) is not None

def has_phone_number(text: str) -> bool:
    pattern = r"(\+?\d{1,2}[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}"
    return re.search(pattern, text) is not None

def has_required_sections(text: str) -> bool:
    lowered = text.lower()
    return all(section in lowered for section in REQUIRED_SECTIONS)

def check_format(text: str) -> bool:
    return has_email(text) and has_phone_number(text) and has_required_sections(text)