# jonathanliu1401.github.io

Personal website for **Jonathan Liu** - UW ECE undergraduate targeting analog IC design
(BSMS). Static single-page site built with plain HTML, CSS, and a tiny bit of vanilla JS.
No build step, no frameworks, no dependencies.

Live URL: <https://jonathanliu1401.github.io/>

---

## File layout

```
jonathanliu1401.github.io/
  index.html                    # all page content + inline SVG icon sprite
  styles.css                    # design tokens, layout, responsive, dark mode, print
  script.js                     # theme toggle, mobile nav, year stamp
  assets/                       # drop project images / static assets here
    .gitkeep
  Jonathan_Liu_Resume.pdf       # (add this - referenced by the Resume buttons)
  README.md
```

---

## Deploy to GitHub Pages

The repo name **must** match your username so Pages serves it at the apex URL.

1. Create a new **public** GitHub repo named exactly `JonathanLiu1401.github.io`.
   Do not initialize it with a README - keep it empty.

2. From inside this folder, run:

   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/JonathanLiu1401/JonathanLiu1401.github.io.git
   git push -u origin main
   ```

3. Enable Pages: **Repo Settings → Pages → Source: `main` branch, `/` (root)**.
   The site goes live in ~1 minute at <https://jonathanliu1401.github.io/>.

Future updates: edit, commit, push - Pages redeploys automatically.

---

## Local preview

From this folder:

```bash
python -m http.server 8000
```

Then visit <http://localhost:8000>. You can also just double-click `index.html` -
everything is fully relative.

---

## Where to update what

| What you want to change | Where to edit |
|---|---|
| Hero name / tagline / pitch | `index.html` → `<section class="hero">` |
| About paragraphs | `index.html` → `<section id="about">` |
| Experience entries | `index.html` → `<section id="experience">` (`.timeline-item` blocks) |
| Project cards | `index.html` → `<section id="projects">` (`.project-card` blocks) |
| Skills tags | `index.html` → `<section id="skills">` (`.skill-group` blocks) |
| Education | `index.html` → `<section id="education">` |
| Awards & activities | `index.html` → `<section id="awards">` |
| Contact info & resume button | `index.html` → `<section id="contact">` and header `.btn-resume` |
| Colors / spacing / typography | `styles.css` → `:root` and `html[data-theme="dark"]` tokens |
| Default theme | Default is light. Toggle persists per visitor via `localStorage`. |

### Adding the resume PDF

Drop your latest PDF into this folder and rename it to **`Jonathan_Liu_Resume.pdf`**
(the header and contact buttons already link to `./Jonathan_Liu_Resume.pdf`).
If you want a different filename, search-and-replace `Jonathan_Liu_Resume.pdf` in
`index.html` (two references).

### Adding project images

1. Drop the image into `assets/` (e.g. `assets/ota-schematic.png`).
2. In `index.html`, inside the matching `<article class="project-card">`, add an
   `<img>` near the top of the card:

   ```html
   <img src="assets/ota-schematic.png" alt="5T OTA schematic in Cadence Virtuoso"
        style="border-radius:8px;margin-bottom:0.8rem;border:1px solid var(--border);" />
   ```

   Keep alt text descriptive (matters for accessibility and Lighthouse score).

### Adding / removing a project

Copy any `<article class="project-card">` block, change the `<h3>`, the
description, the `.tag-list` items, and the `.project-date`. The grid is
auto-balancing - no other edits needed.

---

## Notes

- No analytics / tracking scripts. None.
- All icons are inline SVG - no external icon CDN, works offline.
- Dark-mode preference persists in `localStorage` under the key `theme`.
- Print stylesheet hides nav and renders a clean resume-style document.
- Tested to be Lighthouse-friendly: semantic landmarks, alt text, aria labels,
  meta description, Open Graph tags, single H1.
