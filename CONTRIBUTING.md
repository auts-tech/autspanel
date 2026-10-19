# Contributing to the AutsPanel website

Thanks for helping! Fixes to typos, unclear steps and outdated screenshots are very welcome.

## How to contribute

1. Fork https://github.com/auts-tech/autspanel and create a branch.
2. Edit the HTML files directly — there is no build step. Preview with `python3 -m http.server 8000`.
3. Open a pull request that explains what changed and why.

## Guidelines

- **Be accurate.** Documentation must match what the panel really does. If you're unsure, check the code in [auts-tech/backup-vps](https://github.com/auts-tech/backup-vps) or ask in an issue.
- **Be fair to other panels.** Comparison pages state facts that can be checked on the vendor's public pages, and say when another panel is the better choice. Don't add prices that change often.
- **Keep it fast.** No external fonts, trackers or large libraries. Compress images (PNG screenshots at 1440×900, WebP welcome).
- **Keep SEO intact.** Each page needs one `<h1>`, a unique `<title>` (≈60 characters) and `<meta name="description">` (≈155 characters), and a canonical URL. Add new pages to `sitemap.xml` and to the docs navigation in every docs page.
- **Accessibility.** Images need meaningful `alt` text; keep heading levels in order and colour contrast readable in both light and dark mode.

Changes to the panel itself belong in [auts-tech/backup-vps](https://github.com/auts-tech/backup-vps).
