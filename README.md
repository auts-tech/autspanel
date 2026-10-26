# AutsPanel website

The website and documentation for **[AutsPanel](https://github.com/auts-tech/backup-vps)** — a free, open-source (MIT) hosting control panel for Ubuntu and Debian VPS servers.

**Live site:** https://panel.auts.com.np/

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
site.webmanifest, favicon.ico  Icons
```

## Preview locally

```bash
git clone https://github.com/auts-tech/autspanel.git
cd autspanel
python3 -m http.server 8000
# open http://localhost:8000
```

## Publish with GitHub Pages

The site is published from this repository with GitHub Pages at **https://panel.auts.com.np/** (custom domain in `CNAME`).

1. **Settings → Pages → Build and deployment → Deploy from a branch**, branch `main`, folder `/ (root)`.
2. **Custom domain:** `panel.auts.com.np`. DNS needs a `CNAME` record for `panel` pointing to `auts-tech.github.io`.
3. Behind Cloudflare's proxy, set **SSL/TLS → Full** and turn on **Always Use HTTPS**.

Every push to `main` is live about a minute later.

### Search engines

- Add the site in [Google Search Console](https://search.google.com/search-console) and [Bing Webmaster Tools](https://www.bing.com/webmasters) and submit `https://panel.auts.com.np/sitemap.xml`.
- Every page has a unique title and description, a canonical URL, Open Graph and Twitter tags, and JSON-LD structured data (Organization, Person, SoftwareApplication, TechArticle, BreadcrumbList, FAQPage).

### Changing the domain

Canonical links, the sitemap and structured data use absolute URLs. To move the site, update `CNAME` and replace the base URL everywhere:

```bash
grep -rl 'https://panel.auts.com.np' . --exclude-dir=.git \
  | xargs sed -i '' 's#https://panel.auts.com.np#https://new.example.com#g'   # macOS; drop '' on Linux
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
