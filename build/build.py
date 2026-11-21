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


def QI(n):  # brand line icon, inline SVG in currentColor (quick menu, Alfred 20 Nov 22:04)
    svg = open(os.path.join(ROOT, 'img', 'brand', 'i-%s.svg' % n)).read().replace('stroke="#17558C"', 'stroke="currentColor"')
    return svg.replace('<svg ', '<svg class="qi" aria-hidden="true" ', 1)


# Brand signals for Google (Alfred 21 Nov 00:21: "make sure I appear with picture when search me, in many ways")
LD_SITE = {"@context": "https://schema.org", "@type": "WebSite", "name": "beku°", "url": SITE + "/",
           "alternateName": ["beku", "BEKU", "beku frozen", "beku frozen desserts", "BEKU Frozen Dessert", "orderbeku", "beku JB"],
           "publisher": {"@type": "Organization", "name": "beku°", "logo": SITE + "/img/logo-512.png"}}
LD_EXTRA = {"logo": SITE + "/img/logo-512.png",
            "image": [SITE + "/img/share.jpg", SITE + "/img/work/line-up.jpg", SITE + "/img/logo-512.png"],
            "sameAs": ["https://www.instagram.com/beku_frozendessert/"],
            "alternateName": ["beku", "BEKU", "beku frozen", "beku frozen desserts", "orderbeku"],
            "brand": {"@type": "Brand", "name": "beku°", "logo": SITE + "/img/logo-512.png"}}


NAVX = {'en': ('About us', 'For partners'), 'zh': ('关于我们', '合作伙伴专区'), 'ms': ('Tentang kami', 'Untuk rakan niaga')}
SUBP = {'desserts': 'nD', 'how': 'nH', 'faq': 'nF'}


def page(lang, kind='home'):
    t, x = T[lang], EX[lang]
    nA, nP = NAVX[lang]
    P = x['path']
    here = P + ('' if kind == 'home' else kind + '/')
    seo = S['seo'][lang]
    hero = (S.get('hero') or {}).get(lang) or {}
    ribbon = (S.get('ribbon') or {}).get(lang, t['ribbon'])
    title, desc = seo.get('title') or 'beku°', seo.get('desc') or ''
    if kind != 'home':
        title = '%s · beku° frozen desserts, Johor Bahru' % t[SUBP[kind]]
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
    sfx = '' if kind == 'home' else kind + '/'
    alt = ''.join('<link rel="alternate" hreflang="%s" href="%s%s%s">' % (EX[l]['hl'], SITE, EX[l]['path'], sfx) for l in EX) + '<link rel="alternate" hreflang="x-default" href="%s/%s">' % (SITE, sfx)
    langs = ''.join('<a href="%s" class="lg%s" lang="%s"%s>%s</a>' % (EX[l]['path'] + sfx, ' on' if l == lang else '', EX[l]['hl'], ' aria-current="page"' if l == lang else '', lab) for l, lab in [('en', 'EN'), ('zh', '中文'), ('ms', 'BM')])
    ld = {"@context": "https://schema.org", "@type": "WholesaleStore", "name": "beku°", "url": SITE + x['path'], "telephone": "+" + WA_NUM, "email": EMAIL, "description": desc, "image": SITE + share_path,
          "parentOrganization": {"@type": "Organization", "name": "Chaleur Atelier F&B Sdn. Bhd.", "identifier": "202501028873"},
          "address": {"@type": "PostalAddress", "streetAddress": ADDR, "addressLocality": "Johor Bahru", "addressRegion": "Johor", "addressCountry": "MY"},
          "areaServed": "Johor Bahru", "keywords": seo.get('keywords') or '', "alternateName": ["beku frozen desserts"],
          "knowsAbout": [p['name'] for p in items]}
    owa, swa = wa(x['orderWa']), wa(x['sampleWa'])
    ourl = '/order/' + ('' if lang == 'en' else '?lang=' + lang)   # online order page (Alfred 18 Nov 19:26: homepage order buttons -> Order online)
    chips = [c.strip() for c in (seo.get('chips') or '').split(',') if c.strip()]
    seo_block = ''
    if seo.get('heading') or seo.get('text'):
        seo_block = '<section id="s" class="wrap seo"><h2>%s</h2>%s<ul class="chips">%s</ul></section>\n' % (e(seo.get('heading') or ''), md(seo.get('text')), ''.join('<li>%s</li>' % e(c) for c in chips))
    sv = hashlib.md5(share_path.encode()).hexdigest()[:8]
    ld.update(LD_EXTRA)
    qm_items = [(P + 'desserts/', 'heart', t['nD'], 'desserts'), (P + 'how/', 'carton', t['nH'], 'how'), ('/about/', 'chef', nA, 'about'), ('/clients/', 'globe', t.get('nC') or 'Our clients', 'clients'),
                ('/partners/', 'gift', nP, 'partners'), (P + 'faq/', 'chat', t['nF'], 'faq'), ('/track/', 'truck', t['nT'], 'track')]
    QM = '<nav class="wrap qm qm8" aria-label="Menu">' + ''.join('<a href="%s"%s>%s<span>%s</span></a>' % (h, ' class="on" aria-current="page"' if k == kind else '', QI(ic), e(lb)) for h, ic, lb, k in qm_items) + '<a class="go" href="%s">%s<span>%s</span></a></nav>' % (ourl, QI('cart'), e(x['orderBtn']))
    if kind == 'home':
        HERO = f'''<section class="wrap hero"><div class="ht">
<span class="tag">{e(hero.get('tag', t['tag']))}</span>
<h1><span>{e(hero.get('h1a', t['h1a']))}</span><span>{e(hero.get('h1b', t['h1b']))}</span><span>{e(hero.get('h1c', t['h1c']))}</span></h1>
<p class="sub">{e(hero.get('sub', t['sub']))}</p>
<div class="btns"><a class="btn" href="{ourl}">{e(x['orderBtn'])}</a><a class="btn light" href="{swa}" target="_blank" rel="noopener">{e(t['bSample'])}</a></div>
<p class="soon">{e(x['soon'])}</p></div>
<div class="hv"><img class="dr" src="/img/BK-PG-109.webp" alt="" width="130" height="130" style="left:-10px;top:-6px">{orn('#d6404a','30%',34,0)}{orn('#2f7d4f','55%',54,1)}{orn('#fff0a0','78%',24,2)}<img class="dr" src="/img/BK-PG-108.webp" alt="" width="130" height="130" style="right:-6px;top:-10px;animation-delay:-2s">
<div class="glance"><h2>{e(t['glance'])}</h2>{''.join(f'<div class="gr"><span>{e(g["k"])}</span><b>{e(g["v"])}</b></div>' for g in t['g'])}</div>
<img class="dr" src="/img/BK-PG-110.webp" alt="" width="120" height="120" style="right:30px;bottom:-14px;animation-delay:-4s"></div></section></div>''' + WAVE('#cbe9f8', '#fffdfa')
    else:
        HERO = '</div>' + WAVE('#cbe9f8', '#fffdfa') + '<div class="wrap pt"><a class="bk" href="%s">‹ beku°</a><h1>%s</h1></div>' % (P, e(t[SUBP[kind]]))
    RNG = f'''<section id="d" class="wrap range">
{('<div class="xmas">'+SNOW2+'<div class="xh"><div class="lim">'+e(t['xmLim'])+'</div><h2>'+e(t['xmT'])+'</h2><p>'+e(t['xmS'])+'</p></div><div class="grid">'+cat('xm')+'</div><div class="c"><a class="btn white" href="'+ourl+'">'+e(t['xmB'])+'</a></div></div>') if cat('xm') else ''}
<div class="sh"><h2>{e(t['range'])}</h2><span>{e(t['tap'])}</span></div>
{('<h3>'+e(t['catPg'])+'</h3><div class="grid">'+cat('pg')+'</div>') if cat('pg') else ''}
{('<h3>'+e(t['catBk'])+'</h3><div class="grid">'+cat('bk')+'</div>') if cat('bk') else ''}
<div class="c"><a class="btn" href="{ourl}">{e(x['orderBtn'])}</a></div></section>
'''
    HOW = f'''{WAVE('#fffdfa','#17558c',True)}
<section id="h" class="how">{SNOW2}<div class="wrap"><h2>{e(t['how'])}</h2><div class="steps">{''.join(f'<div><div class="n">{s["n"]}</div><h3>{e(s["t"])}</h3><p>{e(s["d"])}</p></div>' for s in t['steps'])}</div><p class="strip">{e(t['strip'])}</p></div></section>
{WAVE('#17558c','#cbe9f8')}
'''
    FAQ = f'''<section id="f" class="faq"><div class="wrap narrow"><h2>{e(t['faqT'])}</h2>{''.join(f'<details><summary>{e(q["q"])}<span class="pl" aria-hidden="true">+</span></summary><p>{e(q["a"])}</p></details>' for q in t['faq'])}</div></section>
{WAVE('#cbe9f8','#fffdfa',True)}
'''
    if kind == 'home':
        xm = cat('xm')
        BODY = (('<section class="wrap range"><div class="xmas">' + SNOW2 + '<div class="xh"><div class="lim">' + e(t['xmLim']) + '</div><h2>' + e(t['xmT']) + '</h2><p>' + e(t['xmS']) + '</p></div><div class="grid">' + xm + '</div><div class="c"><a class="btn white" href="' + ourl + '">' + e(t['xmB']) + '</a></div></div></section>') if xm else '') \
            + '<div class="wrap c more"><a class="btn" href="%sdesserts/">%s ›</a></div>' % (P, e(t['range'])) + seo_block \
            + '<script>(function(){var m={"#d":"desserts/","#h":"how/","#f":"faq/"}[location.hash];if(m)location.replace("%s"+m)})()</script>' % P
    elif kind == 'desserts':
        BODY = RNG
    elif kind == 'how':
        BODY = HOW
    else:
        BODY = FAQ
    return f'''<!doctype html>
<html lang="{x['hl']}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(title)}</title>
<meta name="description" content="{e(desc)}">
<meta name="google-site-verification" content="CltcXd6i4bjFEzPn-iN3eoDdQ-URc3Fs5-kobhTKSiw">
<meta name="keywords" content="{e(seo.get('keywords') or '')}">
<link rel="canonical" href="{SITE}{here}">
{alt}
<meta property="og:type" content="website"><meta property="og:site_name" content="beku°"><meta property="og:title" content="{e(stitle)}"><meta property="og:description" content="{e(stext)}"><meta property="og:url" content="{SITE}{here}">
<meta property="og:image" content="{SITE}{share_path}?v={sv}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="beku° frozen desserts">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="{e(stitle)}"><meta name="twitter:description" content="{e(stext)}"><meta name="twitter:image" content="{SITE}{share_path}?v={sv}">
<link rel="icon" href="/favicon.ico" sizes="48x48"><link rel="icon" href="/img/favicon-192.png" type="image/png" sizes="192x192"><link rel="apple-touch-icon" href="/img/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Fredoka:wght@500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/style.css">
<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>
<script type="application/ld+json">{json.dumps(LD_SITE, ensure_ascii=False)}</script>
</head>
<body>
<div class="ribbon">{e(ribbon)}</div>
<div class="top">{SNOW}{BUNT}
<header><nav class="wrap nav"><a href="{x['path']}" class="logo"><img src="/img/beku-logo-256.webp" alt="beku° frozen desserts" width="52" height="52"></a>
<div class="links"><a href="{P}desserts/">{e(t['nD'])}</a><a href="{P}how/">{e(t['nH'])}</a><a href="/about/">{e(nA)}</a><a href="/clients/">{e(t.get('nC') or 'Our clients')}</a><a href="/track/">{e(t['nT'])}</a><span class="langs" role="group" aria-label="Language">{langs}</span><a class="btn sm" href="{ourl}">{e(x['orderBtn'])}</a></div></nav></header>
{HERO}
{QM}
<main>
{BODY}</main>
<footer class="foot"><div class="ft">{e(t['foot'])}</div><a class="btn" href="{wa(t['wa'])}" target="_blank" rel="noopener">{e(t['fWa'])}</a><p>{e(EMAIL)} · {e(ADDR)}</p><p class="byca"><a href="/about/">by Chaleur Atelier Pâtisserie</a> · <a href="https://www.instagram.com/chaleuratelier_my/" target="_blank" rel="noopener">Instagram</a> · <a href="https://www.tiktok.com/@chaleuratelier_my" target="_blank" rel="noopener">TikTok</a> · <a href="https://www.instagram.com/beku_frozendessert/" target="_blank" rel="noopener">beku° Instagram</a></p><p class="sm">{e(t['fLine'])} · <a href="/privacy.html">{e(x['privacy'])}</a></p></footer>
<dialog id="pd" aria-labelledby="pdn"><button type="button" class="x" aria-label="{e(t['close'])}">×</button><div class="ph"><img id="pdi" alt="" width="220" height="220"></div><div class="pb"><span id="pdt" class="ptag"></span><h3 id="pdn"></h3><div id="pds" class="psp"></div><p><b>{e(t['layers'])}:</b> <span id="pdl"></span></p><p><b>{e(t['flav'])}:</b> <span id="pdf"></span></p><a id="pdo" class="btn" href="{ourl}">{e(x['orderBtn'])}</a><a id="pdw" class="btn green" target="_blank" rel="noopener">{e(t['askThis'])}</a></div></dialog>
<script>window.BEKU={json.dumps(pdata, ensure_ascii=False)};</script>
<script src="/app.js" defer></script>
<script src="/wa.js" defer></script>
</body>
</html>
'''


for l in EX:
    d = ROOT if EX[l]['path'] == '/' else os.path.join(ROOT, EX[l]['path'].strip('/'))
    os.makedirs(d, exist_ok=True)
    with open(os.path.join(d, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(page(l))
    for k in SUBP:
        os.makedirs(os.path.join(d, k), exist_ok=True)
        with open(os.path.join(d, k, 'index.html'), 'w', encoding='utf-8') as f:
            f.write(page(l, k))


# ---------- introduction page /intro/ (Alfred 19 Nov 22:51: intro PDF with clickable links + the same intro on the web; English, no prices, 4-6 pages;
# 23:31 "with more beku brand kit and icon": wordmark, b° mark, carton mascot, -18°C badge, stickers, line icons) ----------
def intro_page():
    t = T['en']
    it = []
    for p in prods:
        tx = ((p.get('tx') or {}).get('en') or ['', '', '']) + ['', '', '']
        it.append(dict(p, layers=tx[0], profile=tx[1], tag=tx[2]))
    def IC(n):  # inline SVG (stroke = currentColor) so icons print sharp in the PDF, no mask edges
        svg = open(os.path.join(ROOT, 'img', 'brand', 'i-%s.svg' % n)).read().replace('stroke="#17558C"', 'stroke="currentColor"')
        return svg.replace('<svg ', '<svg class="ic" aria-hidden="true" ', 1)
    WM = '<img class="wm" src="/img/brand/wordmark-navy.svg" alt="beku°"><img class="wm wm-l" src="/img/brand/wordmark-milk.svg" alt="">'
    TEMP = '<span class="temp"><b></b>-18°C</span>'
    def card(p, big=False):
        ink, bg = e(p.get('ink') or '#17558c'), e(p.get('bg') or '#cbe9f8')
        return ('<div class="pc%s" style="--pbg:%s;--pink:%s"><div class="ball"><img src="%s" alt="%s">%s</div><div class="pt"><h3>%s</h3>'
                '<p class="pf">%s</p><p class="ly">%s</p><p class="sp">%s</p></div></div>') % (
            ' big' if big else '', bg, ink, e(p['img']), e(p['name']), ('<span class="stk">%s</span>' % e(p['tag'].upper())) if p['tag'] else '',
            e(p['name']), e(p['profile']), e(p['layers']), e(p.get('spec') or '') + ' · KEEP AT -18°C')
    pg = [p for p in it if p.get('cat') == 'pg']; xm = [p for p in it if p.get('cat') == 'xm']; bk = [p for p in it if p.get('cat') == 'bk']
    cover_imgs = ''.join('<img src="%s" alt="" style="--i:%d">' % (e(p['img']), i) for i, p in enumerate(it[:5]))
    glance = [g for g in t['g'] if not re.search(r'RM|\d+\s*sen', g['v'])]
    gicon = {'Range': 'heart', 'Pack': 'carton', 'Storage': 'freezer', 'Lead time': 'calendar', 'Delivery': 'truck', 'Payment': 'cart'}
    U = lambda path: SITE + path + ('&' if '?' in path else '?') + 'utm_source=intro'
    wa_link = 'https://wa.me/%s?text=%s' % (WA_NUM, urllib.parse.quote("Hi BEKU, I read your introduction and I'm interested in your frozen desserts for my business."))
    phone = '+%s %s-%s %s' % (WA_NUM[:2], WA_NUM[2:4], WA_NUM[4:7], WA_NUM[7:])
    promises = [('heart', 'Pork, lard &amp; alcohol free'), ('leaf', 'No additives'), ('chef', 'Made by pastry chefs in Larkin, JB'), ('truck', 'Delivered frozen across JB')]
    why = [('chef', 'Made by pastry chefs', 'Recipes developed and made by the Chaleur Atelier pastry team.'),
           ('freezer', 'Long freezer life', '6–9 months at -18°C, so you can stock up and waste less.'),
           ('carton', 'Easy portions', '12 pieces per carton for petit gâteaux. Take out only what you sell.'),
           ('truck', 'Local &amp; reliable', 'Made in Larkin and delivered frozen by car across the JB area.')]
    steps = [('gift', 'Try a sample box · RM50', 'Any 4 pieces for RM50, free delivery. Taste them at your counter; the RM50 comes off your first order above RM350 within 1 month.'),
             ('cart', 'Order online', 'Choose cartons at bekufrozen.com/order, enter your company and SSM details and pay online, or order on WhatsApp.'),
             ('chef', 'We make &amp; pack', 'Stock ships first, the rest is made fresh. Usually ready in 3–5 working days.'),
             ('truck', 'Delivered frozen', 'By car across the JB area, straight into your freezer. Invoice on WhatsApp.')]
    tips = [('thermo', 'Keep frozen at -18°C. Thaw in the chiller before serving.'), ('calendar', 'Delivery dates: Monday to Friday, across the Johor Bahru area.'),
            ('cart', 'Pay online by FPX, card, GrabPay or DuitNow QR. Invoice and receipt on WhatsApp.'),
            ('globe', 'Track every order at <a href="%s">bekufrozen.com/track</a>.' % U('/track/'))]
    n = [0]
    def foot():
        n[0] += 1
        return '<footer class="pfoot"><span>introduction 2026 · %02d</span>%s</footer>' % (n[0], WM)
    pages = []
    pages.append(f"""<section class="pg cover"><div class="dots"></div><div class="cv">
<img class="mascot" src="/img/beku-logo-256.webp" alt="beku° carton mascot">
<h1><img class="wm" src="/img/brand/wordmark-navy.svg" alt="beku°"><img class="wm wm-l" src="/img/brand/wordmark-milk.svg" alt=""></h1>
<p class="tagl">your dessert menu, on standby.</p>
<p class="lead">Frozen petit gâteaux &amp; bakes for cafés, restaurants and hotels in Johor Bahru.</p>
<div class="fan">{cover_imgs}</div>
<a class="sbadge" href="{U('/order/?mode=sample')}"><small>sample box</small>RM50<i>any 4 pcs</i></a>
<div class="cvb">{TEMP}<span class="pill">{IC('heart')}pork, lard &amp; alcohol free</span><span class="pill">{IC('leaf')}no additives</span></div>
<p class="by">By the pastry team behind <b>Chaleur Atelier Pâtisserie</b></p>
<p class="url"><a href="{U('/')}">{IC('globe')}bekufrozen.com</a></p></div></section>""")
    pages.append(f"""<section class="pg about"><div class="in">
<p class="kick">about us</p><h2>café-quality desserts, ready when you are.</h2>
<p class="big">beku° is the frozen wholesale line of Chaleur Atelier F&amp;B Sdn. Bhd., the team behind Chaleur Atelier Pâtisserie in Larkin, Johor Bahru. We make modern French petit gâteaux and bakes in our own kitchen, freeze them at their best and deliver them across JB.</p>
<p>For a café, restaurant or hotel that means a full dessert counter without a pastry kitchen: keep cartons in your freezer, take out what you need, thaw and serve. Every piece looks and tastes the same as the last.</p>
<div class="prom">{''.join('<span>%s%s</span>' % (IC(i), x) for i, x in promises)}</div>
<div class="why">{''.join('<div>%s<b>%s</b><p>%s</p></div>' % (IC(i), a, b) for i, a, b in why)}</div>
<div class="gl"><h3><img class="mk" src="/img/brand/mark-blue.svg" alt="">at a glance</h3>{''.join('<div><span>%s%s</span><b>%s</b></div>' % (IC(gicon.get(g['k'], 'heart')), e(g['k']), e(g['v'])) for g in glance)}</div>
</div>{foot()}</section>""")
    pages.append(f"""<section class="pg range"><div class="in">
<p class="kick">the range</p><h2>{e(t['catPg'])}</h2><p class="sub2">{TEMP} Seven all-year favourites, 12 pieces per carton.</p>
<div class="grid">{''.join(card(p) for p in pg)}</div>
</div>{foot()}</section>""")
    pages.append(f"""<section class="pg range2"><div class="in">
{('<div class="xm"><p class="kick">' + IC('snow') + 'seasonal</p><h2>christmas 2026</h2><p class="sub2">' + e(t['xmS']) + '</p><div class="grid g3">' + ''.join(card(p) for p in xm) + '</div></div>') if xm else ''}
{('<p class="kick">' + ('also from our kitchen' if xm else 'the range') + '</p><h2>' + e(t['catBk']) + '</h2><div class="grid g2">' + ''.join(card(p, True) for p in bk) + '</div>') if bk else ''}
<p class="note">Photos show the real products. Specifications per carton; weights are approximate.</p>
</div>{foot()}</section>""")
    pages.append(f"""<section class="pg how"><div class="in">
<p class="kick">how it works</p><h2>from our kitchen to your counter</h2>
<div class="steps">{''.join('<div><div class="n">%d</div>%s<h3>%s</h3><p>%s</p></div>' % (i + 1, IC(ic), a, b) for i, (ic, a, b) in enumerate(steps))}</div>
<div class="tips"><h3>good to know</h3><ul>{''.join('<li>%s<span>%s</span></li>' % (IC(i), x) for i, x in tips)}</ul></div>
</div>{foot()}</section>""")
    pages.append(f"""<section class="pg contact"><div class="dots"></div><div class="in">
<img class="mascot sm" src="/img/beku-logo-256.webp" alt="">
<p class="kick">let's talk</p><h2>stay cool, chef.<br>start with a sample box.</h2>
<p class="big">See the full range, order online or ask us anything. We reply on WhatsApp.</p>
<div class="cta">
<a class="b" href="{U('/')}">{IC('globe')}<small>Website</small>bekufrozen.com</a>
<a class="b" href="{U('/order/')}">{IC('cart')}<small>Order online</small>bekufrozen.com/order</a>
<a class="b wa" href="{wa_link}">{IC('chat')}<small>WhatsApp</small>{phone}</a>
<a class="b" href="mailto:{e(EMAIL)}">{IC('mail')}<small>Email</small>{e(EMAIL)}</a></div>
<a class="smp" href="{U('/order/?mode=sample')}"><span class="sp1">{IC('gift')}</span><span class="sp2"><small>sample box</small><b>any 4 pieces · RM50</b><em>Free delivery, paid first. Order above RM350 within 1 month and the RM50 comes off that order.</em></span><span class="sp3">order a sample box →</span></a>
<div class="qr"><img src="/img/qr-intro.svg" alt="QR code to bekufrozen.com"><p>Scan to visit<br><b>bekufrozen.com</b></p><img class="mk" src="/img/brand/mark-blue.svg" alt=""></div>
<p class="addr">{IC('pin')}{e(ADDR)}</p>
<p class="co">beku° is a brand of Chaleur Atelier F&amp;B Sdn. Bhd. (202501028873) · Pork, lard &amp; alcohol free · No additives</p>
</div>{foot()}</section>""")
    return f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>beku° · Introduction · Frozen petit gâteaux &amp; bakes for cafés in Johor Bahru</title>
<meta name="description" content="Introduction to beku°: frozen petit gâteaux and bakes for cafés, restaurants and hotels in Johor Bahru, by the pastry team behind Chaleur Atelier Pâtisserie. Pork, lard &amp; alcohol free.">
<link rel="canonical" href="{SITE}/intro/"><meta property="og:title" content="beku° · Introduction"><meta property="og:image" content="{SITE}{share_path}">
<link rel="icon" href="/favicon.ico" sizes="48x48"><link rel="icon" href="/img/favicon-192.png" type="image/png" sizes="192x192">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Fredoka:wght@500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/intro/intro.css">
</head><body>
<div class="bar"><a href="/"><img src="/img/brand/mark-blue.svg" alt="beku°" width="40" height="40"></a><img class="barwm" src="/img/brand/wordmark-navy.svg" alt="beku°"><span>introduction</span><a class="dl" href="/intro/beku-introduction.pdf" download>Download PDF</a></div>
{''.join(pages)}
<script src="/wa.js" defer></script>
</body></html>
"""


os.makedirs(os.path.join(ROOT, 'intro'), exist_ok=True)
with open(os.path.join(ROOT, 'intro', 'index.html'), 'w', encoding='utf-8') as f:
    f.write(intro_page())
print('built', len(prods), 'products, share', share_path)


# Our clients & our work page (Alfred 20 Nov 2026: "a page in the web for people to see our work ... some logo from our customer")
def QM_EN(kind):
    items = [('/desserts/', 'heart', 'Desserts', 'desserts'), ('/how/', 'carton', 'How it works', 'how'), ('/about/', 'chef', 'About us', 'about'), ('/clients/', 'globe', 'Our clients', 'clients'),
             ('/partners/', 'gift', 'For partners', 'partners'), ('/faq/', 'chat', 'FAQ', 'faq'), ('/track/', 'truck', 'Track order', 'track')]
    return '<nav class="qm qm8" aria-label="Menu">' + ''.join('<a href="%s"%s>%s<span>%s</span></a>' % (h, ' class="on" aria-current="page"' if k == kind else '', QI(ic), lb) for h, ic, lb, k in items) + '<a class="go" href="/order/">%s<span>Order online</span></a></nav>' % QI('cart')


def SUB_HEAD(title, desc, path, css='/clients/clients.css'):
    return f"""<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title}</title><meta name="description" content="{desc}">
<link rel="canonical" href="{SITE}{path}"><meta property="og:title" content="{title}"><meta property="og:description" content="{desc}"><meta property="og:image" content="{SITE}{share_path}">
<link rel="icon" href="/favicon.ico" sizes="48x48"><link rel="icon" href="/img/favicon-192.png" type="image/png" sizes="192x192">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Fredoka:wght@500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{css}">
</head><body>
<header class="top"><a href="/"><img src="/img/brand/wordmark-navy.svg" alt="beku°" height="30"></a><nav><a class="go" href="/order/">Order online</a></nav></header>
"""


def clients_page():
    cj = json.load(open(os.path.join(B, 'clients.json'), encoding='utf-8'))
    cl = cj.get('clients') or []
    def IC(n):
        svg = open(os.path.join(ROOT, 'img', 'brand', 'i-%s.svg' % n)).read().replace('stroke="#17558C"', 'stroke="currentColor"')
        return svg.replace('<svg ', '<svg class="ic" aria-hidden="true" ', 1)
    def logo(c):
        if c.get('logo'):
            return '<div class="lg"><img src="/img/clients/%s" alt="%s"></div>' % (e(c['logo']), e(c['name']))
        ini = ''.join(w[0] for w in re.findall(r'[A-Za-z]+', c['name'])[:2]).upper()
        return '<div class="lg nm"><span class="ini">%s</span><b>%s</b></div>' % (e(ini), e(c['name']))
    logos = ''.join(logo(c) for c in cl)
    logos_dup = logos.replace('<img ', '<img aria-hidden="true" ')  # second copy for a seamless loop
    shots = [(c['name'], ph) for c in cl for ph in (c.get('photos') or [])]
    counter = ''
    if shots:
        counter = '<section class="sec"><p class="kick">at their counters</p><h2>our desserts, served by our clients</h2><div class="shots">%s</div></section>' % ''.join(
            '<figure><img src="/img/clients/%s" alt="beku° desserts at %s" loading="lazy"><figcaption>%s</figcaption></figure>' % (e(ph), e(n), e(n)) for n, ph in shots)
    def pimg(n):  # the product's round photo for the tile (matched on the name before " · ")
        k = n.split(' · ')[0].strip().lower()
        for p in prods:
            if p['name'].split(' · ')[0].strip().lower() == k:
                return p['img'], p.get('bg') or '#cbe9f8'
        return None, '#cbe9f8'
    tiles = []
    for i, w in enumerate(cj.get('work') or []):
        im, bg = pimg(w['name'])
        tiles.append('<button class="tl" type="button" data-i="%d" style="--pbg:%s"><span class="tb"><img src="%s" alt="" loading="lazy"></span><b>%s</b><small>%s</small></button>' % (
            i + 1, e(bg), e(im or '/img/work/' + w['file']), e(w['name']), e(w['tag'])))
    lineup_tile = '<button class="tl tl-all" type="button" data-i="0"><span class="tb"><img src="/img/work/line-up.jpg" alt="" loading="lazy"></span><b>The full line-up</b><small>all desserts</small></button>'
    work = lineup_tile + ''.join(tiles)
    gal = [('/img/work/line-up.jpg', 'The beku° line-up')] + [('/img/work/' + w['file'], w['name']) for w in (cj.get('work') or [])]
    gal_js = json.dumps([[u, n] for u, n in gal], ensure_ascii=False)
    wa_link = 'https://wa.me/%s?text=%s' % (WA_NUM, urllib.parse.quote("Hi BEKU, I saw your clients page and I'm interested in your frozen desserts for my business."))
    return f"""<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Our clients &amp; our work · beku° frozen desserts, Johor Bahru</title>
<meta name="description" content="Cafés, restaurants, hotels and brands served by the Chaleur Atelier pastry team, the makers of beku° frozen petit gâteaux and bakes in Johor Bahru. Pork, lard and alcohol free.">
<link rel="canonical" href="{SITE}/clients/"><meta property="og:title" content="beku° · Our clients &amp; our work"><meta property="og:image" content="{SITE}{share_path}">
<link rel="icon" href="/favicon.ico" sizes="48x48"><link rel="icon" href="/img/favicon-192.png" type="image/png" sizes="192x192">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Fredoka:wght@500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/clients/clients.css">
</head><body>
<header class="top"><a href="/"><img src="/img/brand/wordmark-navy.svg" alt="beku°" height="30"></a><nav><a class="go" href="/order/">Order online</a></nav></header>
<section class="hero"><div class="hi"><p class="kick">our clients &amp; our work</p><h1>the pastry team behind their dessert counters.</h1>
<p class="lead">Cafés, restaurants, hotels and brands in Johor Bahru and Singapore have served desserts from our pastry team. beku° brings the same petit gâteaux to your freezer, made in Larkin and delivered frozen.</p>
<p class="pills"><span>{IC('heart')}Pork, lard &amp; alcohol free</span><span>{IC('leaf')}No additives</span><span>{IC('chef')}Made by pastry chefs</span></p></div>
<img class="mascot" src="/img/beku-logo-256.webp" alt="" width="120" height="120"></section>
{QM_EN('clients')}
<section class="sec"><p class="kick">trusted by</p><h2>our clients</h2><p class="sub">Cafés, restaurants, hotels and brands our pastry team has made desserts for.</p><div class="marq" aria-label="Our clients"><div class="track">{logos}{logos_dup}</div></div></section>
{counter}
<dialog class="lb" id="lb"><button class="x" type="button" aria-label="Close">×</button><button class="nv pv" type="button" aria-label="Previous">‹</button><figure><img alt=""><figcaption></figcaption></figure><button class="nv nx" type="button" aria-label="Next">›</button></dialog>
<script>(function(){{var G={gal_js},d=document.getElementById('lb'),im=d.querySelector('img'),cp=d.querySelector('figcaption'),i=0;
function show(n){{i=(n+G.length)%G.length;im.src=G[i][0];im.alt=G[i][1];cp.textContent=G[i][1];}}
document.querySelectorAll('.tl').forEach(function(b){{b.addEventListener('click',function(){{show(+b.dataset.i);d.showModal();try{{bkT&&bkT('click','Dessert: '+G[i][1])}}catch(e){{}}}});}});
d.querySelector('.x').onclick=function(){{d.close()}};d.querySelector('.pv').onclick=function(){{show(i-1)}};d.querySelector('.nx').onclick=function(){{show(i+1)}};
d.addEventListener('click',function(e){{if(e.target===d)d.close()}});
d.addEventListener('keydown',function(e){{if(e.key==='ArrowRight')show(i+1);if(e.key==='ArrowLeft')show(i-1)}});
var sx=0;d.addEventListener('touchstart',function(e){{sx=e.touches[0].clientX}},{{passive:true}});d.addEventListener('touchend',function(e){{var dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>50)show(i+(dx<0?1:-1))}});}})();</script>
<section class="sec tagus"><p class="kick">post it, tag us</p><h2>your café, on our Instagram</h2><p class="sub">Serving beku° desserts? Post them and tag <b>@beku_frozendessert</b> with <b>#bekuatmycafe</b>. We share our customers' posts on beku°, and the best ones on Chaleur Atelier's Instagram too: more eyes on your café, and more trust for both of us.</p><p class="btns"><a class="b1" href="/partners/">How it works &amp; free marketing material</a><a class="b2" href="https://www.instagram.com/beku_frozendessert/" target="_blank" rel="noopener">{IC('ig')}@beku_frozendessert</a></p></section>
<section class="cta"><div class="ci"><span class="cg">{IC('gift')}</span><div><p class="kick">your counter next?</p><h2>start with a sample box · RM50</h2><p>Any 4 pieces, free delivery in JB. The RM50 comes off your first order above RM350 within 1 month.</p></div></div>
<p class="btns"><a class="b1" href="/order/?mode=sample">Order a sample box</a><a class="b2" href="{e(wa_link)}">{IC('chat')}WhatsApp us</a></p></section>
<footer class="ft"><img src="/img/brand/wordmark-navy.svg" alt="beku°" height="22"><span>beku° is a brand of Chaleur Atelier F&amp;B Sdn. Bhd. · Larkin, Johor Bahru</span><span class="sl"><a href="https://www.instagram.com/chaleuratelier_my/" target="_blank" rel="noopener">Instagram</a> · <a href="https://www.tiktok.com/@chaleuratelier_my" target="_blank" rel="noopener">TikTok</a> · <a href="https://www.instagram.com/beku_frozendessert/" target="_blank" rel="noopener">beku° Instagram</a></span></footer>
<script src="/wa.js" defer></script>
</body></html>"""


os.makedirs(os.path.join(ROOT, 'clients'), exist_ok=True)
with open(os.path.join(ROOT, 'clients', 'index.html'), 'w', encoding='utf-8') as f:
    f.write(clients_page())


# beku° admin APP: bekufrozen.com/admin/ (Alfred 20 Nov 2026: "make it a app … allow me to log in with Google")
# Same screens as the Apps Script admin (build/admin/Admin.html), but signs in with Google and talks to the
# admin script's doPost API (checks the Google sign-in + allowed emails there).
ADMIN_API = 'https://script.google.com/macros/s/AKfycbxNYrq26BteZEz2XrrEHXEv7pvqnn5VDsoULjC1g2Q3JkpZSQNxg8CgQThCnFvCxtfJ6A/exec'
ADMIN_CLIENT_ID = '383653792650-5c9pt8ss2jfjmn57g19oe191eo0dqoga.apps.googleusercontent.com'
def about_page():
    def IC(n):
        svg = open(os.path.join(ROOT, 'img', 'brand', 'i-%s.svg' % n)).read().replace('stroke="#17558C"', 'stroke="currentColor"')
        return svg.replace('<svg ', '<svg class="ic" aria-hidden="true" ', 1)
    return SUB_HEAD('About us · Chaleur Atelier, the pâtisserie behind beku°', 'beku° is the frozen wholesale line of Chaleur Atelier Pâtisserie in Larkin, Johor Bahru: freezable desserts made by our own pastry chefs, pork, lard and alcohol free.', '/about/') + QM_EN('about') + f"""
<section class="sec ca" id="chaleur"><div class="cab"><div class="cat"><img class="calogo" src="/img/ca-logo.png" alt="Chaleur Atelier Pâtisserie" width="220" height="58"><p class="kick">by Chaleur Atelier</p><h1>the pâtisserie behind beku°</h1>
<p>beku° is the frozen wholesale line of <b>Chaleur Atelier Pâtisserie</b>, a modern French dessert atelier in Larkin, Johor Bahru. We started as a small two-person pastry workshop; today our team makes petit gâteaux, whole cakes and viennoiseries for our own shop and for cafés and restaurants across JB.</p>
<p class="dir"><b>Same skill, different direction.</b> beku° desserts are not our shop cakes frozen. Each one is designed with careful thought for the way a business works: freezable by design, a longer shelf life, easy storage, and easy for your staff to plate and serve. We start from your problem (waste, staff time, an empty counter) and build the dessert around it. And we never stand still: our chefs keep creating new, on-trend desserts and keep growing the range.</p>
<ul class="why"><li>{IC('snow')}<span><b>Freezable by design</b>recipes built to freeze well</span></li><li>{IC('freezer')}<span><b>Longer shelf life</b>easy to store, less waste</span></li><li>{IC('chef')}<span><b>Easy for your staff</b>no pastry skills needed</span></li><li>{IC('heart')}<span><b>Always something new</b>new, on-trend desserts, a growing range</span></li><li>{IC('leaf')}<span><b>No pork, lard or alcohol</b>made by our own pastry chefs</span></li></ul>
<div class="vm"><div><p class="vk">our vision</p><p>To be the dessert partner every café and restaurant in Malaysia can count on.</p></div><div><p class="vk">our mission</p><p>Solve real problems for F&amp;B businesses with frozen desserts made for shelf life, easy storage and easy serving, with pâtissier-level quality.</p></div></div>
<p class="shop">{IC('pin')}Visit our shop: Lobby, Zennith Suites, Jalan Kebun Teh 2, Larkin · open daily 11am–7pm</p></div>
<div class="prof"><p class="ph">see all our profiles</p>
<a href="https://www.instagram.com/chaleuratelier_my/" target="_blank" rel="noopener">{IC('ig')}<span><b>Instagram</b><small>@chaleuratelier_my</small></span></a>
<a href="https://www.tiktok.com/@chaleuratelier_my" target="_blank" rel="noopener">{IC('tiktok')}<span><b>TikTok</b><small>@chaleuratelier_my</small></span></a>
<a href="https://www.instagram.com/beku_frozendessert/" target="_blank" rel="noopener">{IC('ig')}<span><b>beku° on Instagram</b><small>@beku_frozendessert</small></span></a>
<a href="https://www.chaleurpatisserie.com" target="_blank" rel="noopener">{IC('globe')}<span><b>Chaleur Atelier website</b><small>chaleurpatisserie.com</small></span></a>
<a href="https://chaleurpatisserie.orderla.my/chaleur-atelier-patisserie-larkin" target="_blank" rel="noopener">{IC('cart')}<span><b>Chaleur Atelier online shop</b><small>cakes for home &amp; gifts</small></span></a></div></div></section>
<section class="sec bts"><p class="kick">behind the scenes</p><h2>from our kitchen to your counter</h2><div class="story"><div class="st"><span class="sn">1</span><div><h3>made by hand in our kitchen</h3><p>Every piece is piped, glazed and finished by our own pastry chefs in Larkin.</p></div></div><div class="ph3"><figure><img src="/img/bts/piping.webp" alt="Piping chantilly, one by one" loading="lazy"><figcaption>Piping chantilly, one by one</figcaption></figure><figure><img src="/img/bts/sheet.webp" alt="A tray of cake, before cutting" loading="lazy"><figcaption>A tray of cake, before cutting</figcaption></figure><figure><img src="/img/bts/red-batch.webp" alt="Glazed and finished by hand" loading="lazy"><figcaption>Glazed and finished by hand</figcaption></figure></div></div><div class="story"><div class="st"><span class="sn">2</span><div><h3>made in batches, made the same</h3><p>Big batches, the same care: every carton looks like the last one.</p></div></div><div class="ph3"><figure><img src="/img/bts/gingerbread-tray.webp" alt="Gingerbread Man, a full tray" loading="lazy"><figcaption>Gingerbread Man, a full tray</figcaption></figure><figure><img src="/img/bts/trays.webp" alt="Ready for the freezer" loading="lazy"><figcaption>Ready for the freezer</figcaption></figure><figure><img src="/img/bts/packing-trays.webp" alt="Checked before packing" loading="lazy"><figcaption>Checked before packing</figcaption></figure></div></div><div class="story"><div class="st"><span class="sn">3</span><div><h3>packed for your freezer</h3><p>Each piece sits in its own place in the carton, so it arrives whole.</p></div></div><div class="ph3"><figure><img src="/img/bts/carton-brownie.webp" alt="12 pieces per carton" loading="lazy"><figcaption>12 pieces per carton</figcaption></figure><figure><img src="/img/bts/carton-gingerbread.webp" alt="What our customers see when they open it" loading="lazy"><figcaption>What our customers see when they open it</figcaption></figure><figure><img src="/img/bts/carton-choc.webp" alt="Straight from the carton to the counter" loading="lazy"><figcaption>Straight from the carton to the counter</figcaption></figure></div></div><div class="story"><div class="st"><span class="sn">4</span><div><h3>cut into it</h3><p>Layers you can see: mousse, insert, sponge and crunch.</p></div></div><div class="ph3"><figure><img src="/img/bts/cut-pink.webp" alt="Raspberry, cut open" loading="lazy"><figcaption>Raspberry, cut open</figcaption></figure><figure><img src="/img/bts/cut-choc.webp" alt="Chocolate layers" loading="lazy"><figcaption>Chocolate layers</figcaption></figure><figure><img src="/img/bts/cut-purple.webp" alt="A fruit insert inside" loading="lazy"><figcaption>A fruit insert inside</figcaption></figure></div></div></section>
<section class="cta"><div class="ci"><span class="cg">{IC('gift')}</span><div><p class="kick">your counter next?</p><h2>start with a sample box · RM50</h2><p>Any 4 pieces, free delivery in JB. The RM50 comes off your first order above RM350 within 1 month.</p></div></div>
<p class="btns"><a class="b1" href="/order/?mode=sample">Order a sample box</a><a class="b2" href="/desserts/">See all desserts</a></p></section>
<footer class="ft"><img src="/img/brand/wordmark-navy.svg" alt="beku°" height="22"><span>beku° is a brand of Chaleur Atelier F&amp;B Sdn. Bhd. · Larkin, Johor Bahru</span></footer>
<script src="/wa.js" defer></script></body></html>"""


PCAP = {"en": ["New on our counter ❄️ Petit gâteaux by @beku_frozendessert, made by the pastry team of @chaleuratelier_my. Pork, lard and alcohol free. Come try one today! #bekuatmycafe", "Christmas is on our counter 🎄 Santa, Gingerbread Man and Star by @beku_frozendessert, only for the season. Grab yours before they're gone! #bekuatmycafe"], "zh": ["柜台新品 ❄️ 来自 @beku_frozendessert 的法式小蛋糕，由 @chaleuratelier_my 的甜点团队制作。不含猪肉、猪油和酒精。今天就来尝一块吧！#bekuatmycafe", "圣诞甜点上柜啦 🎄 @beku_frozendessert 的 Santa、Gingerbread Man 和 Star，季节限定，卖完就没了！#bekuatmycafe"], "ms": ["Baru di kaunter kami ❄️ Petit gâteau dari @beku_frozendessert, dibuat oleh pasukan pastri @chaleuratelier_my. Tanpa khinzir, lemak khinzir dan alkohol. Jom cuba hari ini! #bekuatmycafe", "Krismas dah sampai di kaunter kami 🎄 Santa, Gingerbread Man dan Star dari @beku_frozendessert, edisi musim ini sahaja. Cepat, sebelum habis! #bekuatmycafe"]}


def partners_page():
    def IC(n):
        svg = open(os.path.join(ROOT, 'img', 'brand', 'i-%s.svg' % n)).read().replace('stroke="#17558C"', 'stroke="currentColor"')
        return svg.replace('<svg ', '<svg class="ic" aria-hidden="true" ', 1)
    cj = json.load(open(os.path.join(B, 'clients.json'), encoding='utf-8'))
    pics = [('/img/work/line-up.jpg', 'The full line-up')] + [('/img/work/' + w['file'], w['name']) for w in (cj.get('work') or [])]
    dl = ''.join('<figure><img src="%s" alt="%s" loading="lazy"><figcaption>%s<a href="%s" download>Download</a></figcaption></figure>' % (u, e(n), e(n), u) for u, n in pics)
    caps = ''.join('<div class="capl"><p class="kick">%s</p>%s</div>' % (lab, ''.join('<div class="cap"><p>%s</p><button type="button" class="cp">Copy</button></div>' % e(c) for c in PCAP[k])) for k, lab in [('en', 'English'), ('zh', '中文'), ('ms', 'Bahasa Melayu')])
    return SUB_HEAD('For partners · free marketing material · beku°', 'Free photos, ready captions and badges for cafés and restaurants that serve beku° desserts, plus how to get featured on our Instagram.', '/partners/') + QM_EN('partners') + f"""
<section class="hero"><div class="hi"><p class="kick">for our partners</p><h1>everything you need to sell beku° desserts.</h1>
<p class="lead">Free photos, ready captions and a badge for your menu. Use them on your counter, menu, Instagram, Grab or WhatsApp. Tag us and we'll share you too.</p></div>
<img class="mascot" src="/img/beku-logo-256.webp" alt="" width="120" height="120"></section>
<section class="sec"><p class="kick">step 1</p><h2>photos to download</h2><p class="sub">Our dessert pictures, free for any beku° customer to use. Tap <b>Download</b> under a picture.</p><div class="dl">{dl}</div></section>
<section class="sec"><p class="kick">step 2</p><h2>ready captions</h2><p class="sub">Copy, paste, post. Change the words to fit your café.</p><div class="caps">{caps}</div></section>
<section class="sec"><p class="kick">step 3</p><h2>a badge for your menu</h2><div class="badgeb"><img src="/img/partners/badge-plaf.png" alt="Pork, lard &amp; alcohol free · desserts by beku°" width="220" height="220"><div><p>Put it on your menu, counter card or post, next to our desserts.</p><p class="btns"><a class="b1" href="/img/partners/badge-plaf.png" download>Download PNG</a><a class="b2" href="/img/partners/badge-plaf.svg" download>Download SVG</a></p></div></div></section>
<section class="sec tagus" id="collab"><p class="kick">step 4 · get featured</p><h2>tag us, we share you</h2>
<ol class="rules"><li><b>Post</b> our desserts at your café: a photo, a Reel or a Story.</li><li><b>Tag</b> <b>@beku_frozendessert</b> and add <b>#bekuatmycafe</b>.</li><li><b>We share it</b> on beku°'s Instagram, and the best posts on Chaleur Atelier's Instagram (@chaleuratelier_my) too.</li><li><b>You get seen</b> by our followers, and your café is featured on our <a href="/clients/">clients page</a>.</li></ol>
<p class="sub">Open to every beku° customer. Nothing to sign up for, just tag us.</p>
<p class="btns"><a class="b1" href="https://www.instagram.com/beku_frozendessert/" target="_blank" rel="noopener">{IC('ig')}Follow @beku_frozendessert</a><a class="b2" href="https://www.instagram.com/chaleuratelier_my/" target="_blank" rel="noopener">{IC('ig')}Follow @chaleuratelier_my</a></p></section>
<footer class="ft"><img src="/img/brand/wordmark-navy.svg" alt="beku°" height="22"><span>beku° is a brand of Chaleur Atelier F&amp;B Sdn. Bhd. · Larkin, Johor Bahru</span></footer>
<script>document.querySelectorAll('.cp').forEach(function(b){{b.onclick=function(){{var t=b.previousElementSibling.textContent;(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(function(){{b.textContent='Copied ✓';setTimeout(function(){{b.textContent='Copy'}},1500)}},function(){{var r=document.createRange();r.selectNodeContents(b.previousElementSibling);getSelection().removeAllRanges();getSelection().addRange(r)}})}}}})</script>
<script src="/wa.js" defer></script></body></html>"""


for _n, _f in [('about', about_page), ('partners', partners_page)]:
    os.makedirs(os.path.join(ROOT, _n), exist_ok=True)
    with open(os.path.join(ROOT, _n, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(_f())

def admin_app():
    h = open(os.path.join(B, 'admin', 'Admin.html'), encoding='utf-8').read()
    h = h.replace('<base target="_top">\n', '')
    head = ('<title>beku° admin</title><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
            '<meta name="theme-color" content="#17558c"><meta name="robots" content="noindex,nofollow">'
            '<link rel="manifest" href="/admin/manifest.webmanifest"><link rel="icon" href="/img/favicon-192.png" sizes="192x192">'
            '<link rel="apple-touch-icon" href="/admin/icon-192.png"><meta name="apple-mobile-web-app-capable" content="yes">'
            '<meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-title" content="beku admin">'
            '<script src="https://accounts.google.com/gsi/client" async defer></script>'
            '<style>#gate{position:fixed;inset:0;z-index:50;background:#f4f9fc;display:flex;align-items:center;justify-content:center;padding:24px}'
            '#gate.hide{display:none}#gate .card{background:#fff;border-radius:24px;padding:30px 26px;max-width:380px;width:100%;text-align:center;box-shadow:0 6px 24px #17558c22}'
            '#gate img{width:86px;height:86px;border-radius:50%;box-shadow:0 0 0 4px #cbe9f8}#gate h1{margin:14px 0 6px}#gate p{color:#5f6f80;margin:6px 0 18px}'
            '#gbtn{display:flex;justify-content:center;min-height:44px}#gmsg{color:#c0392b;font-weight:500;min-height:1.4em;margin-top:14px}'
            '#so{margin-left:auto;background:#fff;border:0;border-radius:999px;padding:6px 12px;font:600 13px Fredoka,sans-serif;color:#17558c;cursor:pointer}'
            '.top a{white-space:nowrap}</style>')
    h = h.replace('</head>', head + '</head>', 1)
    gate = ('<div id="gate"><div class="card"><img src="/img/beku-logo-256.webp" alt=""><h1>beku° admin</h1>'
            '<p>Sign in with your Google account to edit the website and see orders.</p><div id="gbtn"></div><div id="gmsg"></div></div></div>')
    h = h.replace('<body>', '<body>' + gate, 1)
    h = h.replace('target="_blank">Open my website ↗</a></div>', 'target="_blank">Open my website ↗</a><button id="so" type="button">Sign out</button></div>', 1)
    shim = r"""<script>
/* Google sign-in + API bridge: replaces google.script.run for the app. */
var GSR=(function(){
  var API='__API__', CID='__CID__', KEY='bekuAdminTok', tok=null, waiting=[], gisReady=false;
  try{ tok=JSON.parse(localStorage.getItem(KEY)||'null'); }catch(e){}
  function valid(){ return tok && tok.exp*1000 > Date.now()+120000; }
  function gate(show,msg){ document.getElementById('gate').classList.toggle('hide',!show); document.getElementById('gmsg').textContent=msg||''; if(show) initGis(); }
  function decode(t){ try{ var p=t.split('.')[1].replace(/-/g,'+').replace(/_/g,'/'); return JSON.parse(decodeURIComponent(escape(atob(p)))); }catch(e){ return {}; } }
  function onCred(r){ var c=decode(r.credential); tok={t:r.credential, exp:c.exp||0, email:c.email||''}; try{ localStorage.setItem(KEY,JSON.stringify(tok)); }catch(e){}
    gate(false); var w=waiting; waiting=[]; w.forEach(function(f){ f(tok.t); }); }
  function initGis(){
    if(!window.google || !google.accounts || !google.accounts.id){ setTimeout(initGis,300); return; }
    if(!gisReady){ gisReady=true; google.accounts.id.initialize({client_id:CID, callback:onCred, auto_select:true, use_fedcm_for_prompt:true, itp_support:true});
      google.accounts.id.renderButton(document.getElementById('gbtn'),{theme:'filled_blue',size:'large',shape:'pill',text:'signin_with',logo_alignment:'left'}); }
    try{ google.accounts.id.prompt(); }catch(e){}
  }
  function token(){ if(valid()) return Promise.resolve(tok.t); return new Promise(function(res){ waiting.push(res); gate(true); }); }
  function signOut(){ var em=tok&&tok.email; tok=null; try{ localStorage.removeItem(KEY); }catch(e){}
    try{ google.accounts.id.disableAutoSelect(); if(em) google.accounts.id.revoke(em,function(){}); }catch(e){} location.reload(); }
  function call(fn,args,ok,fail,tries){
    token().then(function(t){ return fetch(API,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({t:t,fn:fn,args:args})}); })
    .then(function(r){ return r.json(); })
    .then(function(j){
      if(j.ok){ ok&&ok(j.r); return; }
      if(j.err==='signin' && !(tries>0)){ tok=null; try{ localStorage.removeItem(KEY); }catch(e){} call(fn,args,ok,fail,1); return; }
      if(j.err==='noaccess'){ tok=null; try{ localStorage.removeItem(KEY); google.accounts.id.disableAutoSelect(); }catch(e){}
        gate(true,'The account '+(j.email||'')+' has no access. Please sign in with another Google account.'); waiting.push(function(){ call(fn,args,ok,fail); }); return; }
      var e=new Error(j.err||'Something went wrong'); if(fail) fail(e); else alert(e.message);
    })
    .catch(function(e){ e=new Error('No connection – please try again. ('+e.message+')'); if(fail) fail(e); else alert(e.message); });
  }
  function runner(ok,fail){ return new Proxy({}, {get:function(_,k){
    if(k==='withSuccessHandler') return function(f){ return runner(f,fail); };
    if(k==='withFailureHandler') return function(f){ return runner(ok,f); };
    return function(){ call(k,[].slice.call(arguments),ok,fail); }; }}); }
  document.addEventListener('DOMContentLoaded',function(){ var b=document.getElementById('so'); if(b) b.onclick=signOut; if(valid()) gate(false); });
  if('serviceWorker' in navigator) navigator.serviceWorker.register('/admin/sw.js',{scope:'/admin/'}).catch(function(){});
  return runner(null,null);
})();
</script>
""".replace('__API__', ADMIN_API).replace('__CID__', ADMIN_CLIENT_ID)
    i = h.index('<script>\n', h.index('<body>'))
    main = h[i:].replace('google.script.run', 'GSR')
    return h[:i] + shim + main


with open(os.path.join(ROOT, 'admin', 'index.html'), 'w', encoding='utf-8') as f:
    f.write(admin_app())

# Online order page + Track my order (static pages; prices load live from Bukku through the bot web app)
oprods = [dict(id=p['id'], name=p['name'], cat=p.get('cat') or 'pg', spec=p.get('spec') or '', img=p['img'], bg=p.get('bg') or '#cbe9f8', ink=p.get('ink') or '#17558c') for p in prods]
for name in ('order', 'track'):
    src = open(os.path.join(B, name + '.html'), encoding='utf-8').read()
    if name == 'order':
        src = src.replace('/*PRODUCTS*/[]', json.dumps(oprods, ensure_ascii=False))
    os.makedirs(os.path.join(ROOT, name), exist_ok=True)
    with open(os.path.join(ROOT, name, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(src)
print('order + track pages built')
