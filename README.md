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

The form emails enquiries to the address in `ENQUIRY_EMAIL` at the top of the form code in `assets/js/site.js`, through FormSubmit (formsubmit.co). Visitors can also send the same enquiry on WhatsApp. To change the address, edit `ENQUIRY_EMAIL`; the first enquiry to a new address triggers an activation email that must be confirmed.

## Photos, styles and scripts load from jsDelivr

GitHub Pages serves large files slowly in India, so pages load photos, CSS, JS and fonts from jsDelivr, a free CDN that mirrors this repo, pinned to a commit. After adding or changing a photo, `site.css` or `site.js`:

1. `python3 tools/cdn.py --webp` to make WebP sizes of any new photos.
2. Commit and push those files.
3. `python3 tools/cdn.py` to point every page at that commit, then commit and push the pages.

## Blog

Posts live in `blog/<post-slug>/index.html`, and `blog/index.html` lists them newest first. To add a post, copy an existing post folder, change its text, title, description, canonical link and BlogPosting schema, add a card to the top of `blog/index.html`, and add the URL to `sitemap.xml`.
