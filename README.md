# Wyplayground.github.io

Personal homepage of **Wenyang Jia** — a lightweight, static academic site for bioinformatics, chemometrics, spectroscopy, and open-source work.

**Live site:** [https://wyplayground.github.io](https://wyplayground.github.io)

## Overview

Single-page site with no build step. Content is loaded from `data/profile.json` and rendered in the browser. Hosted on [GitHub Pages](https://pages.github.com/) from the `main` branch.

**Sections:** About · Experience · Education · Publications · Projects · Contact

## Repository structure

```
.
├── index.html          # Page shell and section layout
├── css/site.css        # Styles
├── js/site.js          # Renders content from profile.json
├── data/profile.json   # Site content (single source of truth)
└── assets/             # Local-only files (not deployed)
```

## Local preview

Run a static server from the repository root (required so `profile.json` can load):

```bash
python -m http.server 8080
```

Open [http://localhost:8080](http://localhost:8080). Opening `index.html` directly (`file://`) will not work because of browser fetch restrictions.

## Customization

Edit **`data/profile.json`** to update the site. Main fields:

| Field | Description |
| --- | --- |
| `about` | About text (array of paragraphs) |
| `interests` | Research interests |
| `experience` | Roles (`title`, `org`, `location`, `period`) |
| `education` | Degrees and institutions |
| `metrics` | Scholar metrics (`hIndex`, `citations`, `works`, `asOf`) |
| `publicationsFeatured` | IDs of papers shown under *Selected publications* |
| `publications` | Full bibliography (`id`, `authors`, `title`, `venue`, `year`, `url`) |
| `projects` | Pinned GitHub repositories |
| `contact` | Email addresses and profile links |

After saving, refresh the browser. To publish changes, commit and push to `main`.

## Deployment

This repository is configured as a user site (`username.github.io`). Pushes to `main` are deployed automatically by GitHub Pages.

## Privacy

`assets/CV_Wenyang_Jia.pdf` is listed in `.gitignore` and is **not** included in the public repository or site. Keep private documents only on your local machine.

## Links

- GitHub: [@Wyplayground](https://github.com/Wyplayground)
- Google Scholar: [YFQVZK4AAAAJ](https://scholar.google.ca/citations?user=YFQVZK4AAAAJ)
- ORCID: [0000-0001-6800-6706](https://orcid.org/0000-0001-6800-6706)

## License

Site content © Wenyang Jia. Code in this repository may be reused with attribution.
