# Gh0stlyKn1ght.github.io

Personal portfolio site for Gh0stlyKn1ght, built as a Jekyll static site for GitHub Pages.

## Structure
- `index.html` — single-page site with hero, about, projects, skills, and contact sections (Jekyll front matter added).
- `styles.css` — theme, layout, and responsive styling.
- `script.js` — mobile nav toggle and scroll-aware navigation highlight.
- `_config.yml` — Jekyll configuration (no theme, pretty permalinks).

## Running locally with Jekyll
1. Install Ruby and Jekyll if needed: `gem install bundler jekyll`
2. Serve locally: `bundle exec jekyll serve` (or `jekyll serve`)
3. Visit `http://localhost:4000`

You can also open `index.html` directly in a browser, but using Jekyll ensures asset paths and front matter are processed the same way as on GitHub Pages.
