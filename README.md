# AutsPanel website

The website and documentation for **[AutsPanel](https://github.com/auts-tech/backup-vps)** — a free, open-source (MIT) hosting control panel for Ubuntu and Debian VPS servers.

**Live site:** https://auts-tech.github.io/autspanel/

AutsPanel is developed by [Aashish Timalsina](https://github.com/aashishtimalsina) and published by [auts-tech](https://github.com/auts-tech). The panel's source code lives in [auts-tech/backup-vps](https://github.com/auts-tech/backup-vps); this repository only contains the website.

## What's inside

Plain HTML and CSS — no framework, no build step, no tracking, no third-party requests. A small script adds the light/dark switch, ⌘K docs search, the product-tour tabs and copy buttons; every page still works without JavaScript.

```
index.html                     Home page
features.html                  Feature tour
compare/                       AutsPanel vs cPanel, aaPanel, Plesk and other panels
docs/                          Documentation (installation, websites, deployments, …)
about.html                     Project, developer and contact
404.html                       Not-found page (GitHub Pages serves it automatically)
assets/css/style.css           All styles (light and dark theme)
assets/js/main.js              Theme switch, search, tabs, copy buttons, animations
assets/js/search-index.js      Pages and sections the search box can find
assets/fonts/                  Inter variable font (SIL Open Font License)
assets/img/                    Screenshots, social image and icons
sitemap.xml, robots.txt        For search engines
site.webmanifest, favicon.svg  Icons
```

## Preview locally

```bash
git clone https://github.com/auts-tech/autspanel.git
cd autspanel
python3 -m http.server 8000
# open http://localhost:8000
```

## Publish with GitHub Pages

1. Push this repository to `https://github.com/auts-tech/autspanel`.
2. On GitHub: **Settings → Pages → Build and deployment → Deploy from a branch**, branch `main`, folder `/ (root)`.
3. After a minute the site is live at https://auts-tech.github.io/autspanel/.

### Search engines

- Add the site in [Google Search Console](https://search.google.com/search-console) and [Bing Webmaster Tools](https://www.bing.com/webmasters) and submit `https://auts-tech.github.io/autspanel/sitemap.xml`.
- Every page has a unique title and description, a canonical URL, Open Graph and Twitter tags, and JSON-LD structured data (Organization, Person, SoftwareApplication, TechArticle, BreadcrumbList, FAQPage).
- Crawlers only read `robots.txt` at the root of a host. On `auts-tech.github.io/autspanel` it is informational; it takes effect once the site has its own domain.

### Use a custom domain

1. Add a `CNAME` file containing the domain (for example `autspanel.com`) and set the domain under **Settings → Pages**.
2. Point DNS to GitHub Pages as described in [GitHub's guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).
3. Replace the old base URL everywhere — canonical links, sitemap and structured data use absolute URLs:

```bash
grep -rl 'https://auts-tech.github.io/autspanel' . --exclude-dir=.git \
  | xargs sed -i '' 's#https://auts-tech.github.io/autspanel#https://autspanel.com#g'   # macOS; drop '' on Linux
```

## Editing pages

Each page is a complete HTML file, so the header and footer are repeated in every page. When you change navigation or footer links, search and replace across all `.html` files. Keep the `<title>`, `<meta name="description">` and the JSON-LD block of a page in sync with its content. When you add a page or a docs section, add it to `sitemap.xml` and to `assets/js/search-index.js` so search can find it.

The brand colour is indigo (`#4f46e5` light, `#818cf8` dark); all colours are CSS variables at the top of `style.css`.

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Contact

- Email: [tm.aashish1@gmail.com](mailto:tm.aashish1@gmail.com)
- Issues with the panel: https://github.com/auts-tech/backup-vps/issues

## License

[MIT](LICENSE) © 2026 auts-tech and Aashish Timalsina. cPanel, Plesk, aaPanel and the other product names mentioned on the site are trademarks of their respective owners.
