"""Symptom-checking rules. Mirrors the logic in script.js so offline fallback gives the same answer."""
RED = {"chest", "breath", "unconscious", "seizure", "bleeding", "snake", "preg"}
COMMON = {"fever", "cough", "headache", "bodypain", "vomiting", "diarrhea"}
KNOWN = RED | COMMON
DURATIONS = {"1", "2", "3"}
AGES = {"child", "adult", "elder"}


def assess(symptoms, duration, age):
    """Return {"lv": red|gold|green, "why": [...]} in the shape script.js expects."""
    s = []
    for x in symptoms:
        if x in KNOWN and x not in s:
            s.append(x)
    if not s or duration not in DURATIONS or age not in AGES:
        raise ValueError("invalid input")

    red = [x for x in s if x in RED]
    if red:
        return {"lv": "red", "why": [{"k": "w_rd", "x": x} for x in red]}

    has = set(s)
    young = age != "adult"
    why = []
    if "fever" in has and young:
        why.append("w_fy")
    if "fever" in has and duration != "1":
        why.append("w_fl")
    if ("vomiting" in has or "diarrhea" in has) and (young or ("vomiting" in has and "diarrhea" in has)):
        why.append("w_dh")
    if duration != "1" and "w_fl" not in why:
        why.append("w_du")
    if len(has) >= 3:
        why.append("w_mn")
    if why:
        return {"lv": "gold", "why": why}
    return {"lv": "green", "why": ["w_ok"]}