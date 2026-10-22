"""Point the site's photos, styles and scripts at jsDelivr, a fast free CDN that mirrors this GitHub repo.

GitHub Pages serves large files slowly in India, so every page loads its assets from
https://cdn.jsdelivr.net/gh/vivasvatc-sudo/Ranikhet-Birdwatching@<commit>/...
Pinning to a commit keeps the files fixed and lets jsDelivr cache them for good.

Usage (from the repo root), after any new or changed photo, CSS or JS is pushed:
    python3 tools/cdn.py <commit>        # commit hash that contains the assets
    python3 tools/cdn.py                 # uses the current HEAD commit

Each <img> also gets a WebP srcset (img/<name>-640.webp, img/<name>-1280.webp);
create those with `python3 tools/cdn.py --webp` before committing new photos.
The script is safe to rerun: it rewrites relative paths and earlier CDN paths alike.
"""
import glob, os, re, subprocess, sys
from PIL import Image

REPO = 'vivasvatc-sudo/Ranikhet-Birdwatching'
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CDN_RE = r'https://cdn\.jsdelivr\.net/gh/' + re.escape(REPO) + r'@[0-9a-f]+/'


def make_webp():
    made = 0
    for path in sorted(glob.glob(os.path.join(ROOT, 'img', '*.jpg'))):
        base = path[:-4]
        im = Image.open(path).convert('RGB')
        w0, h0 = im.size
        for w in (640, 1280):
            out = f'{base}-{w}.webp'
            if os.path.exists(out) or (w == 1280 and w0 <= 1280):
                continue
            tw = min(w, w0)
            c = im.copy()
            c.thumbnail((tw, round(h0 * tw / w0) + 1))
            c.save(out, 'WEBP', quality=76, method=6)
            made += 1
    print(f'created {made} webp files')


def width_of(rel):
    return Image.open(os.path.join(ROOT, rel)).size[0]


def rewrite(commit):
    cdn = f'https://cdn.jsdelivr.net/gh/{REPO}@{commit}/'
    pages = [p for p in glob.glob(os.path.join(ROOT, '**', '*.html'), recursive=True) if '/tools/' not in p]
    for page in pages:
        s = open(page).read()
        orig = s
        rel_prefix = r'(?:\.\./)*'  # ../../img/x.jpg, img/x.jpg, /img/x.jpg

        def asset_url(path):
            return cdn + path

        # stylesheets and scripts
        s = re.sub(r'(href|src)="(?:' + CDN_RE + r'|/|' + rel_prefix + r')(assets/[^"?]+)(?:\?[^"]*)?"',
                   lambda m: f'{m.group(1)}="{asset_url(m.group(2))}"', s)

        # images: src + WebP srcset + sizes
        def img_tag(m):
            tag = m.group(0)
            src = re.search(r'\ssrc="([^"]+)"', tag).group(1)
            mm = re.match(r'(?:' + CDN_RE + r'|/|' + rel_prefix + r')(img/([^"/]+)\.jpg)$', src)
            if not mm:
                return tag
            rel, name = mm.group(1), mm.group(2)
            tag = re.sub(r'\ssrc="[^"]+"', f' src="{asset_url(rel)}"', tag)
            cands = []
            for w in (640, 1280):
                wf = f'img/{name}-{w}.webp'
                if os.path.exists(os.path.join(ROOT, wf)):
                    cands.append(f'{asset_url(wf)} {width_of(wf)}w')
            tag = re.sub(r'\s(srcset|sizes)="[^"]*"', '', tag)
            if cands:
                hero = 'fetchpriority="high"' in tag
                sizes = '100vw' if hero else '(max-width: 640px) 100vw, 640px'
                tag = tag.replace('<img', f'<img srcset="{", ".join(cands)}" sizes="{sizes}"', 1)
            return tag

        s = re.sub(r'<img\b[^>]*>', img_tag, s)
        if s != orig:
            open(page, 'w').write(s)
            print('updated', os.path.relpath(page, ROOT))


if __name__ == '__main__':
    args = sys.argv[1:]
    if args and args[0] == '--webp':
        make_webp()
        sys.exit()
    commit = args[0] if args else subprocess.check_output(['git', '-C', ROOT, 'rev-parse', 'HEAD'], text=True).strip()
    rewrite(commit[:12])
