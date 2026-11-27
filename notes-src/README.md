# Notes source

Built with Material for MkDocs and published at https://nameblank00.github.io/notes/

## Preview locally
    pip install -r requirements.txt
    mkdocs serve          # open http://127.0.0.1:8000

## Add a chapter
1. Create a Markdown file, e.g. `docs/mathematics/analysis/real-analysis/01-the-real-numbers.md`
2. Add its path under the course in the `nav:` section of `mkdocs.yml` (order there = sidebar order and Previous/Next order)

## Turn a one-page course into a multi-chapter course
Replace `docs/.../real-analysis.md` with a folder `docs/.../real-analysis/` containing `index.md`
plus chapter files, and in `mkdocs.yml` change

    - Real Analysis: mathematics/analysis/real-analysis.md

to

    - Real Analysis:
      - mathematics/analysis/real-analysis/index.md
      - mathematics/analysis/real-analysis/01-the-real-numbers.md

(See Physics → Classical Mechanics → Newtonian Mechanics for a working example.)

## Math
Inline `$...$`, display `$$...$$`. Callouts: `!!! abstract "Theorem"`, `!!! example`,
and a collapsible proof with `??? proof "Proof"`.

## Sidebar
Inside a course, the left sidebar shows only that course's chapters plus links to the
previous/next course (the order in `nav:`). The notes home and the Mathematics/Physics
index pages show the full tree. This is done in `overrides/partials/nav.html`; the logo
and "Back to main site" link go to the main page (`extra.homepage`).

## Research notes
`docs/research/` holds the research notes: one folder per model (HRG, NJL, Quark-Meson, …)
with an overview `index.md`, and one page per form of the model (e.g. Non-Local NJL). Each
stub lists its planned topics. In the full sidebar, Research shows as a single "Research Notes"
line; Mathematics and Physics sit under a "Course Notes" title.
