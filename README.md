# Cue Shift

Static English-Cantonese subtitle corpus explorer for *Spider-Man: Brand New
Day* (2026), built for the 2026R1 Translation Technology final project.

## Deliverable

- 502 complete unique subtitle pairs from Spider-Man: Brand New Day, each
  retaining its source workbook row.
- Search plus filters for translation profile, human-check status and target length.
- Linked dialogue-function network, profile/length treemap and profile/function heatmap.
- Sortable, paged data grid with filtered CSV export.
- English and Traditional Chinese interface.
- Learning report, bilingual codebook, 50-entry quality-check record and AI-use declaration.

## Preview

`index.html` can be opened directly because the corpus is also embedded in
`data/corpus.js`. The JSON file is retained for the published site.

For a server-based preview:

```bash
python3 -m http.server 8000
```

Open <http://127.0.0.1:8000>.

## Rebuild the corpus

The build starts from the source snapshot in `scripts/source-rows.json`.

```bash
python3 scripts/build_corpus.py
```

This writes `data/corpus.json`, `data/corpus.js` and `data/corpus.csv`. The local
JavaScript copy lets `index.html` work when opened directly. The public folder
contains short extracts only, not full subtitle tracks.

## Publish

The site is dependency-free and ready for GitHub Pages. Put the contents of this
folder at the repository root, then enable Pages from the main branch and root
folder.

## Before public submission

Confirm the source download location and licence. The supplied Excel does not
state either, and the file labels alone do not establish permission to publish
the excerpts.
