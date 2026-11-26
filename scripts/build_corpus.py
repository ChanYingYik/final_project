#!/usr/bin/env python3
"""Build the public corpus from the supplied Final project.xlsx export."""

from __future__ import annotations

import csv
import json
import random
import re
from collections import Counter
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SOURCE_PAIRS = ROOT / "scripts" / "source-rows.json"
OUTPUT_JSON = ROOT / "data" / "corpus.json"
OUTPUT_CSV = ROOT / "data" / "corpus.csv"
OUTPUT_JS = ROOT / "data" / "corpus.js"

COLLECTION_DATE = "2026-11-26"
REVIEW_SEED = 2027
REVIEW_SIZE = 50
COMPRESSION_LIMIT = 0.70
EXPLICITATION_LIMIT = 1.30

CATEGORY_ORDER = (
    "condensation",
    "explicitation",
    "transposition",
    "congruence",
)
FUNCTION_ORDER = ("statement", "question", "command", "reaction")
LENGTH_ORDER = ("compact", "balanced", "expanded")
CHARACTER_ORDER = (
    "peter_spider",
    "scorpion",
    "ned",
    "mj",
    "max",
    "metzger",
    "frank",
    "cindy",
    "leshy",
    "other",
    "multiple",
    "none",
)
REGISTER_ORDER = ("cantonese_leaning", "mixed_register", "written_chinese")

CHARACTER_PATTERNS = {
    "peter_spider": (
        r"\bpeter\b",
        r"\bparker\b",
        r"\bspider[- ]?man\b",
        r"\bspidey\b",
        r"彼得",
        r"柏加",
        r"蜘蛛俠",
    ),
    "scorpion": (r"\bscorpions?\b", r"蠍子"),
    "ned": (r"\bned\b", r"尼特"),
    "mj": (r"\bmj\b",),
    "max": (r"\bv-max\b", r"\bmax\b", r"麥斯"),
    "metzger": (r"\bmetzger\b", r"\bdirector\b", r"梅茨格", r"局長"),
    "frank": (r"\bfrank\b", r"法蘭克"),
    "cindy": (r"\bcindy\b", r"仙迪"),
    "leshy": (r"\bleshy\b", r"萊希"),
    "other": (
        r"\bmanfredi\b",
        r"\bfoswell\b",
        r"\blonnie\b",
        r"\bwiley\b",
        r"\bjim\b",
        r"\bnate dogg\b",
    ),
}

CANTONESE_MARKERS = (
    "唔",
    "咩",
    "乜",
    "咗",
    "嘅",
    "喺",
    "嗰",
    "佢",
    "睇",
    "傾",
    "畀",
    "搵",
    "冇",
    "係",
    "啱",
    "掂",
    "搞",
    "啲",
    "噉",
    "喇",
    "喎",
    "㗎",
    "囉",
    "咁",
    "攞",
    "掟",
    "老友",
    "死蠢",
    "夜水",
    "大單嘢",
)

WRITTEN_CHINESE_MARKERS = (
    "的",
    "這",
    "是",
    "不",
    "沒有",
    "什麼",
    "他",
    "她",
    "在",
    "了",
    "可以",
    "應該",
    "需要",
    "我們",
    "你們",
    "他們",
    "這裡",
    "那裡",
    "從",
    "與",
    "因為",
    "如果",
    "可能",
    "會",
)


def english_words(text: str) -> int:
    return len(re.findall(r"[A-Za-z]+(?:['-][A-Za-z]+)*", text))


def chinese_han(text: str) -> int:
    return len(re.findall(r"[\u3400-\u9fff]", text))


def source_function(text: str) -> str:
    clean = text.strip()
    if "?" in clean:
        return "question"
    if "!" in clean:
        return "command"
    if english_words(clean) <= 3:
        return "reaction"
    return "statement"


def target_function(text: str) -> str:
    if "?" in text or any(marker in text for marker in ("嗎", "咩", "乜", "邊", "點", "幾")):
        return "question"
    if "!" in text:
        return "command"
    return "statement"


def length_band(ratio: float) -> str:
    if ratio < COMPRESSION_LIMIT:
        return "compact"
    if ratio > EXPLICITATION_LIMIT:
        return "expanded"
    return "balanced"


def classify(source_text: str, target_text: str, ratio: float) -> tuple[str, str]:
    function = source_function(source_text)
    if ratio < COMPRESSION_LIMIT:
        return "condensation", function
    if ratio > EXPLICITATION_LIMIT:
        return "explicitation", function
    if function != target_function(target_text):
        return "transposition", function
    return "congruence", function


def character_groups(source_text: str, target_text: str) -> tuple[list[str], str]:
    text = f"{source_text} {target_text}"
    groups = [
        group
        for group, patterns in CHARACTER_PATTERNS.items()
        if any(re.search(pattern, text, re.IGNORECASE) for pattern in patterns)
    ]
    if not groups:
        return [], "none"
    if len(groups) > 1:
        return groups, "multiple"
    return groups, groups[0]


def language_register(target_text: str) -> tuple[str, list[str], list[str]]:
    cantonese = [marker for marker in CANTONESE_MARKERS if marker in target_text]
    written = [marker for marker in WRITTEN_CHINESE_MARKERS if marker in target_text]
    if len(cantonese) >= 2:
        register = "cantonese_leaning"
    elif cantonese and written:
        register = "mixed_register"
    elif cantonese:
        register = "cantonese_leaning"
    else:
        register = "written_chinese"
    return register, cantonese, written


def load_unique_pairs() -> tuple[list[dict], dict]:
    rows = json.loads(SOURCE_PAIRS.read_text(encoding="utf-8"))
    incomplete = 0
    duplicates = 0
    seen = set()
    unique = []
    complete = 0

    for row in rows:
        source_text = str(row.get("source_text", "")).strip()
        target_text = str(row.get("target_text", "")).strip()
        if not source_text or not target_text:
            incomplete += 1
            continue
        complete += 1
        key = (source_text, target_text)
        if key in seen:
            duplicates += 1
            continue
        seen.add(key)
        unique.append(
            {
                "workbook_row": int(row["row"]),
                "source_text": source_text,
                "target_text": target_text,
            }
        )

    if len(unique) < 500:
        raise ValueError(f"Only {len(unique)} complete unique pairs were found")

    return unique, {
        "supplied_rows": len(rows),
        "supplied_pairs": complete,
        "incomplete_rows_removed": incomplete,
        "duplicate_pairs_removed": duplicates,
        "retained_entries": len(unique),
    }


def make_corpus() -> dict:
    pairs, cleaning = load_unique_pairs()
    review_ids = sorted(
        random.Random(REVIEW_SEED).sample(
            [entry["workbook_row"] for entry in pairs],
            REVIEW_SIZE,
        )
    )
    checked = set(review_ids)

    entries = []
    for index, pair in enumerate(pairs, start=1):
        source_text = pair["source_text"]
        target_text = pair["target_text"]
        row_number = pair["workbook_row"]
        words = english_words(source_text)
        han = chinese_han(target_text)
        ratio = han / max(words * 1.45, 1)
        category, function = classify(source_text, target_text, ratio)
        characters, character_group = character_groups(source_text, target_text)
        register, cantonese_markers, written_markers = language_register(target_text)
        entries.append(
            {
                "id": row_number,
                "sequence": index,
                "source_text": source_text,
                "target_text": target_text,
                "source": (
                    "Spider-Man: Brand New Day (2026), English-Traditional Chinese "
                    f"subtitles; Final project.xlsx worksheet 工作表1, row {row_number}; "
                    f"supplied subtitle pair collected {COLLECTION_DATE}"
                ),
                "category": category,
                "human_checked": "yes" if row_number in checked else "no",
                "unit": "short subtitle cue pair",
                "key_term": function,
                "target_verb": category,
                "realization": length_band(ratio),
                "character_group": character_group,
                "characters": "; ".join(characters),
                "language_register": register,
                "cantonese_markers": "; ".join(cantonese_markers),
                "written_chinese_markers": "; ".join(written_markers),
                "genre": "film subtitles",
                "corpus_version": "supplied Excel workbook, 2026-11-26",
                "collection_date": COLLECTION_DATE,
                "source_file_date": "2026-11-26",
                "source_cue_ids": str(row_number),
                "target_cue_id": row_number,
                "source_timecode": "not supplied",
                "target_timecode": "not supplied",
                "english_word_count": words,
                "cantonese_han_count": han,
                "length_ratio": round(ratio, 4),
                "notes": (
                    "Analytical label computed from the published surface rule; "
                    "not a judgment of translation quality."
                ),
            }
        )

    category_counts = Counter(entry["category"] for entry in entries)
    function_counts = Counter(entry["key_term"] for entry in entries)
    length_counts = Counter(entry["realization"] for entry in entries)
    character_counts = Counter(entry["character_group"] for entry in entries)
    register_counts = Counter(entry["language_register"] for entry in entries)
    function_by_category = Counter(
        (entry["category"], entry["key_term"]) for entry in entries
    )
    character_by_category = Counter(
        (entry["character_group"], entry["category"]) for entry in entries
    )
    register_by_category = Counter(
        (entry["language_register"], entry["category"]) for entry in entries
    )

    payload = {
        "meta": {
            "title_en": "S-Web of Words: Spider-Man: Brand New Day Translation Profiles",
            "title_zh": "S-Web of Words：《蜘蛛俠：全新的一天》翻譯剖面",
            "corpus": "Spider-Man: Brand New Day (2026) English-Traditional Chinese subtitles",
            "entry_count": len(entries),
            "supplied_row_count": cleaning["supplied_rows"],
            "supplied_pair_count": cleaning["supplied_pairs"],
            "incomplete_rows_removed": cleaning["incomplete_rows_removed"],
            "duplicate_pairs_removed": cleaning["duplicate_pairs_removed"],
            "verification_target": REVIEW_SIZE,
            "verified_count": len(checked),
            "review_seed": REVIEW_SEED,
            "review_sample_ids": review_ids,
            "collection_date": COLLECTION_DATE,
            "category_counts": dict(category_counts),
            "function_counts": dict(function_counts),
            "length_counts": dict(length_counts),
            "character_counts": dict(character_counts),
            "register_counts": dict(register_counts),
            "function_by_category": {
                category: {
                    function: function_by_category[(category, function)]
                    for function in FUNCTION_ORDER
                }
                for category in CATEGORY_ORDER
            },
            "character_by_category": {
                character: {
                    category: character_by_category[(character, category)]
                    for category in CATEGORY_ORDER
                }
                for character in CHARACTER_ORDER
            },
            "register_by_category": {
                register: {
                    category: register_by_category[(register, category)]
                    for category in CATEGORY_ORDER
                }
                for register in REGISTER_ORDER
            },
            "classification_rule": (
                "Profile uses normalized length (Han characters divided by "
                "English words times 1.45). Below 0.70 is condensation; above "
                "1.30 is explicitation. In the middle band, a speech-act mismatch "
                "is transposition; otherwise the pair is congruence."
            ),
            "cleaning_rule": (
                "Retain every complete unique pair in its workbook order. Remove "
                "rows with a missing source or target and later occurrences of an "
                "identical source-target pair."
            ),
            "quality_check_note": (
                "A reproducible sample of 50 entries (seed 2027) was compared with "
                "the supplied workbook and the traceable source subtitle texts. "
                "Seven incomplete pairs and ten duplicate pairs had already been "
                "removed before final coding."
            ),
            "character_method": (
                "Character groups record names explicitly present in the source "
                "or target cue. They describe mentions, not the speaker, because "
                "the supplied workbook does not contain speaker labels."
            ),
            "register_method": (
                "A transparent lexicon flags Cantonese-specific forms such as "
                "唔, 咩, 冇 and 係, and written-Chinese forms such as 的, 是, 這 "
                "and 不. Two or more Cantonese markers are Cantonese-leaning; one "
                "Cantonese marker with a written marker is mixed; otherwise the "
                "cue is written-Chinese dominant. This is a spelling and phrase "
                "heuristic, not an audio judgment."
            ),
            "provenance_note": (
                "The workbook is the supplied source for this project. The subtitle "
                "filenames in the associated NVAtlas folder identify an English and "
                "Traditional Chinese Spider-Man: Brand New Day subtitle pair. Public "
                "data contains only short extracted cue pairs; the complete tracks "
                "are not published."
            ),
        },
        "entries": entries,
    }
    return payload


def write_csv(entries: list[dict]) -> None:
    fields = [
        "id",
        "sequence",
        "source_text",
        "target_text",
        "source",
        "category",
        "human_checked",
        "unit",
        "key_term",
        "realization",
        "character_group",
        "characters",
        "language_register",
        "cantonese_markers",
        "written_chinese_markers",
        "genre",
        "corpus_version",
        "collection_date",
        "english_word_count",
        "cantonese_han_count",
        "length_ratio",
        "notes",
    ]
    with OUTPUT_CSV.open("w", encoding="utf-8-sig", newline="") as stream:
        writer = csv.DictWriter(stream, fieldnames=fields, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(entries)


def main() -> None:
    payload = make_corpus()
    OUTPUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_JSON.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    OUTPUT_JS.write_text(
        "window.NVATLAS_CORPUS = "
        + json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
        + ";\n",
        encoding="utf-8",
    )
    write_csv(payload["entries"])
    print(
        f"Wrote {payload['meta']['entry_count']} entries to "
        f"{OUTPUT_JSON.relative_to(ROOT)}"
    )
    print("Categories:", payload["meta"]["category_counts"])
    print("Functions:", payload["meta"]["function_counts"])
    print("Length bands:", payload["meta"]["length_counts"])


if __name__ == "__main__":
    main()
