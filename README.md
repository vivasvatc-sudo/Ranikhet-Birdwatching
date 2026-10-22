# Ranikhet Birdwatching — Viv's Nature Scope

Static website for ranikhetbirdwatching.com: small-group guided birding around Ranikhet, Majkhali and Binsar in the Kumaon Himalaya.

Hosted on GitHub Pages from the `main` branch. The `CNAME` file holds the custom domain.

## Pages

| URL | File |
| --- | --- |
| `/` | `index.html` |
| `/tours/ranikhet/` | `tours/ranikhet/index.html` |
| `/tours/binsar/` | `tours/binsar/index.html` |
| `/birds/` | `birds/index.html` |
| `/birds/cheer-pheasant/` | `birds/cheer-pheasant/index.html` |
| `/birds/spotted-forktail/` | `birds/spotted-forktail/index.html` |
| `/photographs/` | `photographs/index.html` |
| `/enquire/` | `enquire/index.html` |

Shared files: `assets/css/site.css`, `assets/js/site.js`, `assets/fonts/`, `img/`.

## Adding a page

1. Copy a page folder, such as `birds/spotted-forktail/`, to a new folder.
2. Change the `<title>`, meta description, canonical link and the text.
3. Add the new URL to `sitemap.xml`.

## Enquiry form

The form opens WhatsApp with the visitor's answers filled in. To receive enquiries by email instead, connect a form service such as Formspree and change the form handler in `assets/js/site.js`.
