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

## After changing CSS or JavaScript

Pages link to `site.css?v=N` and `site.js?v=N`. When you change either file, raise `N` in every page's links so browsers fetch the new version instead of a cached one.

## Blog

Posts live in `blog/<post-slug>/index.html`, and `blog/index.html` lists them newest first. To add a post, copy an existing post folder, change its text, title, description, canonical link and BlogPosting schema, add a card to the top of `blog/index.html`, and add the URL to `sitemap.xml`.
