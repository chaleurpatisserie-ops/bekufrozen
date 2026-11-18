"""Builds bekufrozen.com from build/base.json (fixed texts) + the settings file
that Alfred edits in the beku° Website admin page (Google Drive JSON).
If the settings file cannot be read, build/defaults.json is used, so the site never breaks.
Run from the repo root:  python3 build/build.py
"""
import json, os, re, io, random, hashlib, urllib.parse, urllib.request, html as H

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
B = os.path.join(ROOT, 'build')
SITE = 'https://bekufrozen.com'
SETTINGS_ID = os.environ.get('SETTINGS_FILE_ID', '').strip()

base = json.load(open(os.path.join(B, 'base.json'), encoding='utf-8'))
T, EX = base['T'], base['EX']


def fetch(url, timeout=60):
    req = urllib.request.Request(url, headers={'User-Agent': 'beku-site-builder'})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()


def drive_url(fid):
    return 'https://drive.google.com/uc?export=download&id=' + urllib.parse.quote(fid)


def load_settings():
    if SETTINGS_ID:
        try:
            s = json.loads(fetch(drive_url(SETTINGS_ID)).decode('utf-8'))
            if s.get('seo') and s.get('products'):
                print('settings: from Drive')
                return s
        except Exception as ex:  # keep the site up
            print('settings: Drive read failed, using defaults:', ex)
    return json.load(open(os.path.join(B, 'defaults.json'), encoding='utf-8'))


S = load_settings()
CONTACT = S.get('contact') or {}
WA_NUM = re.sub(r'\D', '', CONTACT.get('whatsapp') or '60143490928') or '60143490928'
EMAIL = CONTACT.get('email') or 'orderbeku@gmail.com'
ADDR = CONTACT.get('address') or '01-03, Zennith Suites, Jalan Kebun Teh 2, Larkin, 80250 Johor Bahru'

# ---------- images from Drive ----------
try:
    from PIL import Image
except ImportError:  # pragma: no cover
    Image = None
IMG = os.path.join(ROOT, 'img')
os.makedirs(IMG, exist_ok=True)


def drive_image(fid, kind):
    """Download a Drive photo once and save a web-ready copy. Returns site path or None."""
    if not fid or Image is None:
        return None
    safe = re.sub(r'[^A-Za-z0-9_-]', '', fid)
    name = ('u-%s.webp' % safe) if kind == 'product' else ('share-%s.jpg' % safe)
    out = os.path.join(IMG, name)
    if not os.path.exists(out):
        try:
            im = Image.open(io.BytesIO(fetch(drive_url(fid)))).convert('RGBA')
            if kind == 'product':
                im.thumbnail((480, 480))
                im.save(out, 'WEBP', quality=88)
            else:  # share picture: cover-crop to 1200x630
                im = im.convert('RGB')
                w, h = im.size
                r = max(1200 / w, 630 / h)
                im = im.resize((int(w * r + .5), int(h * r + .5)))
                w, h = im.size
                l, t = (w - 1200) // 2, (h - 630) // 2
                im.crop((l, t, l + 1200, t + 630)).save(out, 'JPEG', quality=86)
        except Exception as ex:
            print('image failed', fid, ex)
            return None
    return '/img/' + name


share_path = drive_image(S.get('shareImage') or '', 'share')
if not share_path:
    share_path = '/img/share.jpg'
    with open(os.path.join(B, 'share-default.jpg'), 'rb') as f, open(os.path.join(IMG, 'share.jpg'), 'wb') as g:
        g.write(f.read())

prods = []
for p in S['products']:
    if p.get('show', True) is False:
        continue
    q = dict(p)
    q['img'] = drive_image(p.get('photo') or '', 'product') or p.get('img') or '/img/BK-PG-101.webp'
    prods.append(q)


def wa(t):
    return 'https://wa.me/%s?text=%s' % (WA_NUM, urllib.parse.quote(t))


e = H.escape


def md(s):  # **bold** -> <b>, blank line -> paragraph
    s = e(s or '')
    s = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', s)
    return ''.join('<p>%s</p>' % x.strip().replace('\n', '<br>') for x in re.split(r'\n\s*\n', s) if x.strip())


random.seed(12)
SN = ['<span class="sn" style="left:%d%%;width:%dpx;height:%dpx;animation-duration:%ds;animation-delay:-%ds"></span>' % (random.randint(1, 99), w, w, random.randint(9, 18), random.randint(0, 18)) for w in [random.choice([4, 5, 6, 8, 10]) for _ in range(40)]]
SNOW = '<div class="snow" aria-hidden="true">' + ''.join(SN) + '</div>'
SNOW2 = '<div class="snow" aria-hidden="true">' + ''.join(SN[:18]) + '</div>'
BUNT = '<div class="bunt" aria-hidden="true">' + ''.join('<span style="border-top-color:%s"></span>' % c for c in ['#d6404a', '#fffdfa', '#2f7d4f', '#fff0a0'] * 12) + '</div>'


def WAVE(top, bot, flip=False):
    st = ' style="transform:scaleX(-1)"' if flip else ''
    return '<div class="wave" style="background:%s" aria-hidden="true"><svg viewBox="0 0 1440 100" preserveAspectRatio="none"%s><path d="M0,40 C240,90 480,0 720,40 C960,80 1200,10 1440,40 L1440,100 L0,100 Z" fill="%s"/></svg></div>' % (top, st, bot)


def orn(c, l, h, d):
    return '<span class="orn" aria-hidden="true" style="left:%s;height:%dpx;animation-delay:-%ds"><i style="background:%s"></i></span>' % (l, h, d, c)


def page(lang):
    t, x = T[lang], EX[lang]
    seo = S['seo'][lang]
    hero = (S.get('hero') or {}).get(lang) or {}
    ribbon = (S.get('ribbon') or {}).get(lang, t['ribbon'])
    title, desc = seo.get('title') or 'beku°', seo.get('desc') or ''
    stitle, stext = seo.get('shareTitle') or title, seo.get('shareText') or desc
    items = []
    for p in prods:
        tx = (p.get('tx') or {}).get(lang) or (p.get('tx') or {}).get('en') or ['', '', '']
        tx = (list(tx) + ['', '', ''])[:3]
        items.append(dict(p, layers=tx[0], profile=tx[1], tag=tx[2]))

    def card(p):
        return '<button type="button" class="scoop" data-id="%s" aria-label="%s"><span class="ball" style="background:%s"><img src="%s" alt="%s" width="130" height="130" loading="lazy"></span><span class="nm" style="color:%s">%s</span><span class="sp" style="color:%s">%s</span><span class="pf">%s</span></button>' % (
            e(p['id']), e(p['name']), e(p.get('bg') or '#cbe9f8'), e(p['img']), e(p['name']), e(p.get('ink') or '#17558c'), e(p['name']), e(p.get('ink') or '#17558c'), e(p.get('spec') or ''), e(p['profile']))

    def cat(c):
        return ''.join(card(p) for p in items if p.get('cat') == c)

    pdata = {p['id']: dict(n=p['name'], i=p['img'], bg=p.get('bg') or '#cbe9f8', ink=p.get('ink') or '#17558c', s=p.get('spec') or '', l=p['layers'], f=p['profile'], t=p['tag'], w=wa(t['waP'].replace('{n}', p['name']))) for p in items}
    alt = ''.join('<link rel="alternate" hreflang="%s" href="%s%s">' % (EX[l]['hl'], SITE, EX[l]['path']) for l in EX) + '<link rel="alternate" hreflang="x-default" href="%s/">' % SITE
    langs = ''.join('<a href="%s" class="lg%s" lang="%s"%s>%s</a>' % (EX[l]['path'], ' on' if l == lang else '', EX[l]['hl'], ' aria-current="page"' if l == lang else '', lab) for l, lab in [('en', 'EN'), ('zh', '中文'), ('ms', 'BM')])
    ld = {"@context": "https://schema.org", "@type": "WholesaleStore", "name": "beku°", "url": SITE + x['path'], "telephone": "+" + WA_NUM, "email": EMAIL, "description": desc, "image": SITE + share_path,
          "parentOrganization": {"@type": "Organization", "name": "Chaleur Atelier F&B Sdn. Bhd.", "identifier": "202501028873"},
          "address": {"@type": "PostalAddress", "streetAddress": ADDR, "addressLocality": "Johor Bahru", "addressRegion": "Johor", "addressCountry": "MY"},
          "areaServed": "Johor Bahru", "keywords": seo.get('keywords') or '', "alternateName": ["beku frozen desserts"],
          "makesOffer": [{"@type": "Offer", "itemOffered": {"@type": "Product", "name": p['name'], "description": p['layers'], "image": SITE + p['img']}} for p in items]}
    owa, swa = wa(x['orderWa']), wa(x['sampleWa'])
    chips = [c.strip() for c in (seo.get('chips') or '').split(',') if c.strip()]
    seo_block = ''
    if seo.get('heading') or seo.get('text'):
        seo_block = '<section id="s" class="wrap seo"><h2>%s</h2>%s<ul class="chips">%s</ul></section>\n' % (e(seo.get('heading') or ''), md(seo.get('text')), ''.join('<li>%s</li>' % e(c) for c in chips))
    sv = hashlib.md5(share_path.encode()).hexdigest()[:8]
    return f'''<!doctype html>
<html lang="{x['hl']}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(title)}</title>
<meta name="description" content="{e(desc)}">
<meta name="google-site-verification" content="CltcXd6i4bjFEzPn-iN3eoDdQ-URc3Fs5-kobhTKSiw">
<meta name="keywords" content="{e(seo.get('keywords') or '')}">
<link rel="canonical" href="{SITE}{x['path']}">
{alt}
<meta property="og:type" content="website"><meta property="og:site_name" content="beku°"><meta property="og:title" content="{e(stitle)}"><meta property="og:description" content="{e(stext)}"><meta property="og:url" content="{SITE}{x['path']}">
<meta property="og:image" content="{SITE}{share_path}?v={sv}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="beku° frozen desserts">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="{e(stitle)}"><meta name="twitter:description" content="{e(stext)}"><meta name="twitter:image" content="{SITE}{share_path}?v={sv}">
<link rel="icon" href="/img/favicon.png" type="image/png"><link rel="apple-touch-icon" href="/img/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Fredoka:wght@500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/style.css">
<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>
</head>
<body>
<div class="ribbon">{e(ribbon)}</div>
<div class="top">{SNOW}{BUNT}
<header><nav class="wrap nav"><a href="{x['path']}" class="logo"><img src="/img/beku-logo-256.webp" alt="beku° frozen desserts" width="52" height="52"></a>
<div class="links"><a href="#d">{e(t['nD'])}</a><a href="#h">{e(t['nH'])}</a><a href="#f">{e(t['nF'])}</a><span class="langs" role="group" aria-label="Language">{langs}</span><a class="btn sm" href="{owa}" target="_blank" rel="noopener">{e(x['orderBtn'])}</a></div></nav></header>
<section class="wrap hero"><div class="ht">
<span class="tag">{e(hero.get('tag', t['tag']))}</span>
<h1><span>{e(hero.get('h1a', t['h1a']))}</span><span>{e(hero.get('h1b', t['h1b']))}</span><span>{e(hero.get('h1c', t['h1c']))}</span></h1>
<p class="sub">{e(hero.get('sub', t['sub']))}</p>
<div class="btns"><a class="btn" href="{owa}" target="_blank" rel="noopener">{e(x['orderBtn'])}</a><a class="btn light" href="{swa}" target="_blank" rel="noopener">{e(t['bSample'])}</a></div>
<p class="soon">{e(x['soon'])}</p></div>
<div class="hv"><img class="dr" src="/img/BK-PG-109.webp" alt="" width="130" height="130" style="left:-10px;top:-6px">{orn('#d6404a','30%',34,0)}{orn('#2f7d4f','55%',54,1)}{orn('#fff0a0','78%',24,2)}<img class="dr" src="/img/BK-PG-108.webp" alt="" width="130" height="130" style="right:-6px;top:-10px;animation-delay:-2s">
<div class="glance"><h2>{e(t['glance'])}</h2>{''.join(f'<div class="gr"><span>{e(g["k"])}</span><b>{e(g["v"])}</b></div>' for g in t['g'])}</div>
<img class="dr" src="/img/BK-PG-110.webp" alt="" width="120" height="120" style="right:30px;bottom:-14px;animation-delay:-4s"></div></section></div>
{WAVE('#cbe9f8','#fffdfa')}
<main>
<section id="d" class="wrap range">
{('<div class="xmas">'+SNOW2+'<div class="xh"><div class="lim">'+e(t['xmLim'])+'</div><h2>'+e(t['xmT'])+'</h2><p>'+e(t['xmS'])+'</p></div><div class="grid">'+cat('xm')+'</div><div class="c"><a class="btn white" href="'+owa+'" target="_blank" rel="noopener">'+e(t['xmB'])+'</a></div></div>') if cat('xm') else ''}
<div class="sh"><h2>{e(t['range'])}</h2><span>{e(t['tap'])}</span></div>
{('<h3>'+e(t['catPg'])+'</h3><div class="grid">'+cat('pg')+'</div>') if cat('pg') else ''}
{('<h3>'+e(t['catBk'])+'</h3><div class="grid">'+cat('bk')+'</div>') if cat('bk') else ''}
<div class="c"><a class="btn" href="{owa}" target="_blank" rel="noopener">{e(x['orderBtn'])}</a></div></section>
{seo_block}{WAVE('#fffdfa','#17558c',True)}
<section id="h" class="how">{SNOW2}<div class="wrap"><h2>{e(t['how'])}</h2><div class="steps">{''.join(f'<div><div class="n">{s["n"]}</div><h3>{e(s["t"])}</h3><p>{e(s["d"])}</p></div>' for s in t['steps'])}</div><p class="strip">{e(t['strip'])}</p></div></section>
{WAVE('#17558c','#cbe9f8')}
<section id="f" class="faq"><div class="wrap narrow"><h2>{e(t['faqT'])}</h2>{''.join(f'<details><summary>{e(q["q"])}<span class="pl" aria-hidden="true">+</span></summary><p>{e(q["a"])}</p></details>' for q in t['faq'])}</div></section>
{WAVE('#cbe9f8','#fffdfa',True)}
</main>
<footer class="foot"><div class="ft">{e(t['foot'])}</div><a class="btn" href="{wa(t['wa'])}" target="_blank" rel="noopener">{e(t['fWa'])}</a><p>{e(EMAIL)} · {e(ADDR)}</p><p class="sm">{e(t['fLine'])} · <a href="/privacy.html">{e(x['privacy'])}</a></p></footer>
<dialog id="pd" aria-labelledby="pdn"><button type="button" class="x" aria-label="{e(t['close'])}">×</button><div class="ph"><img id="pdi" alt="" width="220" height="220"></div><div class="pb"><span id="pdt" class="ptag"></span><h3 id="pdn"></h3><div id="pds" class="psp"></div><p><b>{e(t['layers'])}:</b> <span id="pdl"></span></p><p><b>{e(t['flav'])}:</b> <span id="pdf"></span></p><a id="pdo" class="btn" href="{owa}" target="_blank" rel="noopener">{e(x['orderBtn'])}</a><a id="pdw" class="btn green" target="_blank" rel="noopener">{e(t['askThis'])}</a></div></dialog>
<script>window.BEKU={json.dumps(pdata, ensure_ascii=False)};</script>
<script src="/app.js" defer></script>
</body>
</html>
'''


for l in EX:
    d = ROOT if EX[l]['path'] == '/' else os.path.join(ROOT, EX[l]['path'].strip('/'))
    os.makedirs(d, exist_ok=True)
    with open(os.path.join(d, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(page(l))
print('built', len(prods), 'products, share', share_path)
