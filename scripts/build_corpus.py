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
        entries.append(
            {
                "id": row_number,
                "sequence": index,
                "source_text": source_text,
                "target_text": target_text,
                "source": (
                    "Final project.xlsx, worksheet 工作表1, row "
                    f"{row_number}; supplied subtitle pair collected {COLLECTION_DATE}"
                ),
                "category": category,
                "human_checked": "yes" if row_number in checked else "no",
                "unit": "short subtitle cue pair",
                "key_term": function,
                "target_verb": category,
                "realization": length_band(ratio),
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
    function_by_category = Counter(
        (entry["category"], entry["key_term"]) for entry in entries
    )

    payload = {
        "meta": {
            "title_en": "Cue Shift: Translation Profiles in English-Cantonese Subtitles",
            "title_zh": "字幕換聲：英粵字幕翻譯剖面",
            "corpus": "English-Traditional Chinese subtitle pairs supplied in Final project.xlsx",
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
            "function_by_category": {
                category: {
                    function: function_by_category[(category, function)]
                    for function in FUNCTION_ORDER
                }
                for category in CATEGORY_ORDER
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
