# Wenyang Jia — personal site (Phase 1 static)

English-only academic homepage. **Live:** [https://wyplayground.github.io](https://wyplayground.github.io)

## Preview

From this folder:

```powershell
cd "D:\2026\生物技术中心\Github publication\personal-site"
python -m http.server 8080
```

Open [http://localhost:8080](http://localhost:8080). Do not open `index.html` via `file://` — the browser will block loading `data/profile.json`.

## Edit content

Almost everything is in **`data/profile.json`**:

| Field | Purpose |
|--------|---------|
| `about` | About paragraphs (array of strings) |
| `interests` | Research interests list |
| `experience` | Title, org, location, period (no bullet list) |
| `metrics` | `hIndex`, `citations`, `works`, `asOf` — fill from [Google Scholar](https://scholar.google.ca/citations?user=YFQVZK4AAAAJ) |
| `publicationsFeatured` | IDs of highlighted papers (displayed newest → oldest by `year`) |
| `publications` | Full bibliography (`id`, `authors`, `title`, `venue`, `year`, `url`) |
| `projects` | GitHub repos (`pin: true` shows “Focus” badge) |
| `contact.emails` | `jiawenyang@cofco.com`, `wjia02@qub.ac.uk` |

After saving JSON, refresh the browser.

## CV PDF (local only)

`assets/CV_Wenyang_Jia.pdf` is gitignored and **not** deployed to GitHub Pages. Keep a copy on your machine for private use.

## Next phases (planned)

- **Phase 2:** Iterate copy and layout with you (still static).
- **Phase 3:** OpenAlex + GitHub Actions (weekly sync).
- **Phase 4:** Published at `https://wyplayground.github.io` (OpenAlex/GitHub sync still planned).
