/** beku° Website admin — Alfred edits the website here (no code).
 *  Saves one settings file in Drive; the website (GitHub Action) reads it and rebuilds bekufrozen.com.
 */
var DEFAULTS = {"version": 1, "seo": {"en": {"title": "beku° · Cake & Frozen Dessert Supplier in Johor Bahru (JB) for Cafés, Restaurants & Hotels", "desc": "beku° is a wholesale cake supplier and frozen dessert supplier in Johor Bahru. Frozen cakes, petit gâteaux and bakes by the carton for cafés, restaurants, hotels and caterers. Pork, lard and alcohol free. Sample box RM50.", "keywords": "cake supplier, cake supplier JB, cake supply Johor Bahru, wholesale cake supplier, frozen cake supplier, frozen dessert supplier, dessert supplier, cafe supplier, café cake supplier, restaurant supplier, hotel dessert supplier, catering dessert supplier, frozen food supplier Johor Bahru, wholesale desserts Malaysia, petit gateaux wholesale", "shareTitle": "", "shareText": "", "heading": "Cake & dessert supplier in Johor Bahru", "text": "beku° is a wholesale **cake supplier in JB** and **frozen dessert supplier** for cafés, restaurants, hotels, caterers and event companies. We make our frozen cakes, petit gâteaux, pound cakes and brownies in our Johor Bahru kitchen, freeze them, and deliver them by the carton across the Johor Bahru area.\n\nLooking for a **café cake supplier** or a **restaurant dessert supplier** that saves you kitchen time? Our desserts arrive frozen, keep 6–9 months at −18°C, and only need thawing before you serve. Every product is pork, lard and alcohol free.", "chips": "Cake supplier JB, Frozen cake supplier, Frozen dessert supplier, Café supplier, Restaurant supplier, Hotel & catering desserts, Frozen food supplier Johor Bahru, Wholesale petit gâteaux"}, "zh": {"title": "beku° · 新山蛋糕批发 · 冷冻蛋糕与冷冻甜点供应商（咖啡馆、餐厅、酒店）", "desc": "beku° 是新山（JB）蛋糕批发与冷冻甜点供应商：冷冻蛋糕、法式小蛋糕与烘焙点心整箱批发，供应咖啡馆、餐厅、酒店和餐饮业者。不含猪肉、猪油和酒精。样品盒 RM50。", "keywords": "蛋糕批发, 新山蛋糕批发, 蛋糕供应商, 冷冻蛋糕, 冷冻蛋糕批发, 冷冻甜点, 冷冻甜点批发, 甜点供应商, 咖啡馆供应商, 餐厅甜点供应, 酒店甜点供应, 冷冻食品供应商, 新山甜点批发, 法式小蛋糕批发, cake supplier JB", "shareTitle": "", "shareText": "", "heading": "新山蛋糕批发与冷冻甜点供应商", "text": "beku° 是新山（JB）的**蛋糕批发**与**冷冻甜点供应商**，供应咖啡馆、餐厅、酒店、餐饮与活动公司。我们在新山自家厨房制作**冷冻蛋糕**、法式小蛋糕、磅蛋糕和布朗尼，急冻后整箱配送到新山各区。\n\n想找能帮你节省厨房时间的**咖啡馆甜点供应商**或**餐厅甜点供应**？我们的**冷冻甜点**在 −18°C 可保存 6–9 个月，解冻即可上桌。所有产品不含猪肉、猪油和酒精。", "chips": "新山蛋糕批发, 冷冻蛋糕, 冷冻甜点, 甜点供应商, 咖啡馆供应, 餐厅甜点供应, 酒店与餐饮甜点, 冷冻食品供应商"}, "ms": {"title": "beku° · Pembekal Kek & Pencuci Mulut Sejuk Beku Borong di Johor Bahru (JB)", "desc": "beku° ialah pembekal kek borong dan pencuci mulut sejuk beku di Johor Bahru. Kek sejuk beku, petit gâteaux dan bakes mengikut karton untuk kafe, restoran, hotel dan katering. Tanpa khinzir, lemak khinzir dan alkohol. Kotak sampel RM50.", "keywords": "pembekal kek, pembekal kek JB, pembekal kek Johor Bahru, kek borong, kek sejuk beku, pencuci mulut sejuk beku, pembekal pencuci mulut, pembekal kafe, pembekal restoran, pembekal makanan sejuk beku Johor Bahru, dessert supplier, cake supplier JB", "shareTitle": "", "shareText": "", "heading": "Pembekal kek & pencuci mulut di Johor Bahru", "text": "beku° ialah **pembekal kek borong di JB** dan **pembekal pencuci mulut sejuk beku** untuk kafe, restoran, hotel, katering dan syarikat acara. Kami buat **kek sejuk beku**, petit gâteaux, kek pound dan brownie di dapur kami di Johor Bahru, kemudian dihantar mengikut karton di sekitar Johor Bahru.\n\nCari **pembekal kek untuk kafe** atau **pembekal pencuci mulut untuk restoran** yang jimat masa dapur? Pencuci mulut kami tahan 6–9 bulan pada −18°C dan hanya perlu dinyahbeku sebelum dihidang. Semua produk tanpa khinzir, lemak khinzir dan alkohol.", "chips": "Pembekal kek JB, Kek sejuk beku, Pencuci mulut sejuk beku, Pembekal kafe, Pembekal restoran, Hotel & katering, Makanan sejuk beku Johor Bahru, Petit gâteaux borong"}}, "hero": {"en": {"tag": "christmas is coming · stock up your counter", "h1a": "wholesale frozen", "h1b": "desserts, explained", "h1c": "simply.", "sub": "Everything a café, restaurant or hotel in JB needs to know before ordering: the range, how it works, and the common questions."}, "zh": {"tag": "圣诞将至 · 为您的柜台备货", "h1a": "冷冻甜点批发，", "h1b": "一看就懂。", "h1c": "", "sub": "新山的咖啡馆、餐厅和酒店在下单前需要知道的一切：产品、流程和常见问题。"}, "ms": {"tag": "krismas semakin dekat · penuhkan kaunter anda", "h1a": "pencuci mulut sejuk beku", "h1b": "borong, diterangkan", "h1c": "dengan mudah.", "sub": "Semua yang kafe, restoran atau hotel di JB perlu tahu sebelum order: produk, cara ia berfungsi dan soalan lazim."}}, "ribbon": {"en": "christmas 2026 specials are here · Santa, Gingerbread Man & Star · while stocks last", "zh": "2026 圣诞限定已上架 · Santa、Gingerbread Man 与 Star · 售完即止", "ms": "istimewa krismas 2026 sudah tiba · Santa, Gingerbread Man & Star · sementara stok masih ada"}, "shareImage": "", "products": [{"id": "p0", "name": "Pistachio Kunafa", "cat": "pg", "spec": "12 PCS / CTN · 120 G ±", "show": true, "bg": "#d5f0b4", "ink": "#2f6b12", "img": "/img/BK-PG-102.webp", "photo": "", "tx": {"en": ["Pistachio mousse, pistachio kunafa, chocolate sponge, vanilla chantilly, pistachio sauce, chocolate coating", "Rich, nutty, chocolatey", "BEST SELLER"], "zh": ["开心果慕斯、开心果 kunafa、巧克力海绵蛋糕、香草香缇奶油、开心果酱、巧克力淋面", "浓郁、坚果香、巧克力味", "畅销"], "ms": ["Mousse pistachio, kunafa pistachio, span coklat, chantilly vanila, sos pistachio, salutan coklat", "Kaya, berkacang, coklat", "TERLARIS"]}}, {"id": "p1", "name": "Oolong Pear", "cat": "pg", "spec": "12 PCS / CTN · 120 G ±", "show": true, "bg": "#d5f0b4", "ink": "#2f6b12", "img": "/img/BK-PG-101.webp", "photo": "", "tx": {"en": ["Oolong mousse, pear jelly, vanilla chantilly, oolong sponge", "Tea, refreshing, fruity", "BEST SELLER"], "zh": ["乌龙茶慕斯、梨果冻、香草香缇奶油、乌龙茶海绵蛋糕", "茶香、清爽、果香", "畅销"], "ms": ["Mousse oolong, jeli pear, chantilly vanila, span oolong", "Teh, menyegarkan, buah-buahan", "TERLARIS"]}}, {"id": "p2", "name": "Chocolate Hazelnut", "cat": "pg", "spec": "12 PCS / CTN · 110 G ±", "show": true, "bg": "#efd9c8", "ink": "#6a3416", "img": "/img/BK-PG-105.webp", "photo": "", "tx": {"en": ["Hazelnut orange croustillant, chocolate ganache, chocolate sponge, chocolate mousse, caramelised hazelnut", "Chocolatey, nutty & citrusy", "BEST SELLER"], "zh": ["榛子橙香脆层、巧克力甘纳许、巧克力海绵蛋糕、巧克力慕斯、焦糖榛子", "巧克力、坚果、柑橘香", "畅销"], "ms": ["Rangup hazelnut oren, ganache coklat, span coklat, mousse coklat, hazelnut karamel", "Coklat, berkacang & sitrus", "TERLARIS"]}}, {"id": "p3", "name": "Raspberry Rose Lychee", "cat": "pg", "spec": "12 PCS / CTN · 120 G ±", "show": true, "bg": "#ffc6da", "ink": "#a30f47", "img": "/img/BK-PG-103.webp", "photo": "", "tx": {"en": ["Raspberry mousse, strawberry lychee compote, vanilla sponge, chocolate coating", "Floral notes & fruity", "BEST SELLER"], "zh": ["覆盆子慕斯、草莓荔枝果酱、香草海绵蛋糕、巧克力淋面", "花香、果香", "畅销"], "ms": ["Mousse raspberi, kompot strawberi laici, span vanila, salutan coklat", "Aroma bunga & buah-buahan", "TERLARIS"]}}, {"id": "p4", "name": "Decadent Chocolate", "cat": "pg", "spec": "12 PCS / CTN · 120 G ±", "show": true, "bg": "#efd9c8", "ink": "#6a3416", "img": "/img/BK-PG-107.webp", "photo": "", "tx": {"en": ["Moist chocolate sponge, chocolate disk, 70% dark chocolate crémeux, dark chocolate mousse", "Rich & chocolatey", "BEST SELLER"], "zh": ["湿润巧克力海绵蛋糕、巧克力片、70% 黑巧克力奶油霜、黑巧克力慕斯", "浓郁巧克力", "畅销"], "ms": ["Span coklat lembap, cakera coklat, crémeux coklat gelap 70%, mousse coklat gelap", "Kaya & coklat", "TERLARIS"]}}, {"id": "p5", "name": "Pandan Gula Melaka", "cat": "pg", "spec": "12 PCS / CTN · 140 G ±", "show": true, "bg": "#fff0a0", "ink": "#7a5a00", "img": "/img/BK-PG-104.webp", "photo": "", "tx": {"en": ["Pandan sponge, gula Melaka crémeux, coconut mousse, toasted coconut", "Aromatic, with caramel notes of gula Melaka", "BEST SELLER"], "zh": ["班兰海绵蛋糕、椰糖奶油霜、椰子慕斯、烤椰丝", "班兰清香，带椰糖焦糖风味", "畅销"], "ms": ["Span pandan, crémeux gula Melaka, mousse kelapa, kelapa bakar", "Wangi, dengan rasa karamel gula Melaka", "TERLARIS"]}}, {"id": "p6", "name": "Chocolate Banana", "cat": "pg", "spec": "12 PCS / CTN · 140 G ±", "show": true, "bg": "#ffd2a8", "ink": "#943800", "img": "/img/BK-PG-106.webp", "photo": "", "tx": {"en": ["Chocolate mousse, banana compote, chocolate sponge, chocolate coating, glaze", "Chocolatey & fruity", "KIDS' FAVOURITE"], "zh": ["巧克力慕斯、香蕉果酱、巧克力海绵蛋糕、巧克力淋面、镜面", "巧克力、果香", "小朋友最爱"], "ms": ["Mousse coklat, kompot pisang, span coklat, salutan coklat, glaze", "Coklat & buah-buahan", "KEGEMARAN KANAK-KANAK"]}}, {"id": "p7", "name": "Santa · Vanilla Strawberry", "cat": "xm", "spec": "12 PCS / CTN · 110 G ±", "show": true, "bg": "#cbe9f8", "ink": "#17558c", "img": "/img/BK-PG-108.webp", "photo": "", "tx": {"en": ["Vanilla mousse, vanilla sponge, strawberry compote, desiccated coconut", "Light & fruity", "SEASONAL"], "zh": ["香草慕斯、香草海绵蛋糕、草莓果酱、椰丝", "清爽果香", "季节限定"], "ms": ["Mousse vanila, span vanila, kompot strawberi, kelapa parut", "Ringan & buah-buahan", "MUSIM"]}}, {"id": "p8", "name": "Gingerbread Man · Black Forest", "cat": "xm", "spec": "12 PCS / CTN · 110 G ±", "show": true, "bg": "#cbe9f8", "ink": "#17558c", "img": "/img/BK-PG-109.webp", "photo": "", "tx": {"en": ["Chocolate mousse, chocolate sponge, sour cherry compote, almond chocolate coating", "Rich, chocolatey & fruity", "SEASONAL"], "zh": ["巧克力慕斯、巧克力海绵蛋糕、酸樱桃果酱、杏仁巧克力淋面", "浓郁巧克力与果香", "季节限定"], "ms": ["Mousse coklat, span coklat, kompot ceri masam, salutan coklat badam", "Kaya, coklat & buah-buahan", "MUSIM"]}}, {"id": "p9", "name": "Star · Blueberry Lavender", "cat": "xm", "spec": "12 PCS / CTN · 110 G ±", "show": true, "bg": "#cbe9f8", "ink": "#17558c", "img": "/img/BK-PG-110.webp", "photo": "", "tx": {"en": ["Blueberry mousse, blueberry lavender compote, vanilla sponge, chocolate coating", "Floral notes & fruity", "SEASONAL"], "zh": ["蓝莓慕斯、蓝莓薰衣草果酱、香草海绵蛋糕、巧克力淋面", "花香、果香", "季节限定"], "ms": ["Mousse blueberi, kompot blueberi lavender, span vanila, salutan coklat", "Aroma bunga & buah-buahan", "MUSIM"]}}, {"id": "p10", "name": "Lemon Pound", "cat": "bk", "spec": "10 PCS / CTN · 350 G ± LOAF", "show": true, "bg": "#fff0a0", "ink": "#7a5a00", "img": "/img/BK-SSB-201.webp", "photo": "", "tx": {"en": ["Moist, fluffy lemon pound loaf", "Rich, buttery & citrusy", "BEST SELLER"], "zh": ["湿润松软的柠檬磅蛋糕", "浓郁奶油香与柑橘味", "畅销"], "ms": ["Kek pound lemon yang lembap dan gebu", "Kaya, berlemak & sitrus", "TERLARIS"]}}, {"id": "p11", "name": "Sea-Salt Chocolate Almond Brownie", "cat": "bk", "spec": "45 PCS / CTN · 6×6 CM ±", "show": true, "bg": "#efd9c8", "ink": "#6a3416", "img": "/img/BK-SSB-202.webp", "photo": "", "tx": {"en": ["Fudgy sea-salt chocolate brownie topped with almonds", "Rich & chocolatey", "BEST SELLER"], "zh": ["海盐巧克力布朗尼，铺满杏仁", "浓郁巧克力", "畅销"], "ms": ["Brownie coklat garam laut yang fudgy dengan badam", "Kaya & coklat", "TERLARIS"]}}], "contact": {"whatsapp": "60143490928", "email": "orderbeku@gmail.com", "address": "01-03, Zennith Suites, Jalan Kebun Teh 2, Larkin, 80250 Johor Bahru"}};

function doGet() {
  if (!userOk_()) return HtmlService.createHtmlOutput('<p style="font:16px sans-serif;padding:24px">Please use the beku° admin app: <a href="https://bekufrozen.com/admin/">bekufrozen.com/admin</a></p>').setTitle('beku° admin');
  return HtmlService.createHtmlOutputFromFile('Admin')
    .setTitle('beku° Website admin')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setFaviconUrl('https://bekufrozen.com/img/favicon.png');
}

function props_() { return PropertiesService.getScriptProperties(); }

function folder_() {
  var id = props_().getProperty('FOLDER_ID');
  if (id) { try { return DriveApp.getFolderById(id); } catch (e) {} }
  var f = DriveApp.createFolder('beku° website (admin – do not delete)');
  props_().setProperty('FOLDER_ID', f.getId());
  return f;
}

function sub_(name) {
  var it = folder_().getFoldersByName(name);
  return it.hasNext() ? it.next() : folder_().createFolder(name);
}

function file_() {
  var id = props_().getProperty('SETTINGS_ID');
  if (id) { try { return DriveApp.getFileById(id); } catch (e) {} }
  var f = folder_().createFile('beku-website-settings.json', JSON.stringify(DEFAULTS), 'application/json');
  f.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  props_().setProperty('SETTINGS_ID', f.getId());
  return f;
}

/** Run once from the editor: creates the folder + settings file and logs the file id. */
function setup() {
  var f = file_();
  Logger.log('SETTINGS_FILE_ID=' + f.getId());
  return f.getId();
}

function getSettings() {
  guard_();
  var f = file_();
  var s = JSON.parse(f.getBlob().getDataAsString());
  s._fileId = f.getId();
  return s;
}

function saveSettings(s) {
  guard_();
  var lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    var f = file_();
    // keep a dated copy of the previous version (last 40 kept)
    var hist = sub_('history');
    hist.createFile('settings ' + Utilities.formatDate(new Date(), 'Asia/Kuala_Lumpur', 'yyyy-MM-dd HHmmss') + '.json', f.getBlob().getDataAsString(), 'application/json');
    var all = [], it = hist.getFiles(); while (it.hasNext()) all.push(it.next());
    all.sort(function (a, b) { return b.getDateCreated() - a.getDateCreated(); });
    for (var i = 40; i < all.length; i++) all[i].setTrashed(true);
    delete s._fileId;
    s.savedAt = new Date().toISOString();
    s.savedBy = API_USER || Session.getActiveUser().getEmail() || 'admin';
    f.setContent(JSON.stringify(s));
    return { ok: true, savedAt: s.savedAt };
  } finally { lock.releaseLock(); }
}

function uploadPhoto(name, dataUrl) {
  guard_();
  var m = String(dataUrl).match(/^data:([^;]+);base64,(.*)$/);
  if (!m) throw new Error('Not a picture');
  var blob = Utilities.newBlob(Utilities.base64Decode(m[2]), m[1], name || 'photo');
  var f = sub_('photos').createFile(blob);
  f.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return { id: f.getId() };
}

function resetToDefaults() {
  guard_();
  return saveSettings(JSON.parse(JSON.stringify(DEFAULTS)));
}

/* ---- Orders & sales tab (BEKU Website chat, 18 Nov 2026): reads the bot sheet "BEKU Customers & Leads" › Orders. Read only. ---- */
var ORDERS_SHEET_ID = '1QahunHiZ_0g8d0BCaWIXI6AfI9D8guFZtEIiwzHtcGg';
function getOrders() {
  guard_();
  var sh = SpreadsheetApp.openById(ORDERS_SHEET_ID).getSheetByName('Orders');
  var v = sh.getDataRange().getValues(), h = v[0].map(function (x) { return String(x).trim(); });
  var iSt = h.indexOf('Status'), iPk = h.indexOf('Packed cartons / batches');
  var tz = 'Asia/Kuala_Lumpur', out = [];
  function iso(d) { return d instanceof Date ? Utilities.formatDate(d, tz, "yyyy-MM-dd'T'HH:mm:ss") : String(d || ''); }
  function day(d) { return d instanceof Date ? Utilities.formatDate(d, tz, 'EEE d MMM') : String(d || ''); }
  for (var i = 1; i < v.length; i++) {
    var r = v[i]; if (!r[0] && !r[2] && !r[3]) continue;
    var notes = String(r[10] || ''), no = (notes.match(/WEB ORDER (BKW-\d{6}-\d{3})/) || [])[1] || '';
    var total = Number((notes.match(/Total RM([\d.]+)/) || [])[1]) || ((Number(r[6]) || 0) + (Number(r[7]) || 0));
    out.push({ d: iso(r[0]), no: no, inv: String(r[8] || ''), biz: String(r[2] || ''), items: String(r[3] || ''), del: day(r[4]), total: Math.round(total * 100) / 100,
      pay: String(r[9] || ''), st: iSt >= 0 ? String(r[iSt] || '').split(' · ')[0] : '', src: String(r[11] || ''), phone: String(r[1] || ''), packed: iPk >= 0 ? String(r[iPk] || '') : '' });
  }
  out.reverse();
  return { rows: out.slice(0, 500), at: new Date().toISOString() };
}

/* ---- Visitors tab (BEKU Website chat, 19 Nov 2026; Alfred: who visits, actions, location, where from, everything for analysis).
   Reads the spreadsheet "beku° website visits" that the bot's web_hit endpoint fills (one row per page view / tap / page leave / order). Read only. ---- */
function getVisits(days) {
  guard_();
  days = Math.min(Math.max(Number(days) || 30, 1), 365);
  var it = DriveApp.getFilesByName('beku° website visits'); if (!it.hasNext()) return { empty: true };
  var sh = SpreadsheetApp.open(it.next()).getSheetByName('Visits'); var v = sh.getDataRange().getValues();
  var tz = 'Asia/Kuala_Lumpur', since = Date.now() - days * 864e5;
  var D = {}, pages = {}, src = {}, loc = {}, dev = {}, lang = {}, act = {}, hrs = [], wd = [0, 0, 0, 0, 0, 0, 0], V = {}, S = {}, tp = {}, recent = [];
  for (var h = 0; h < 24; h++) hrs.push(0);
  function inc(o, k, n) { k = k || '(none)'; o[k] = (o[k] || 0) + (n || 1); }
  function top(o, n) { return Object.keys(o).map(function (k) { return [k, o[k]]; }).sort(function (a, b) { return b[1] - a[1]; }).slice(0, n || 15); }
  for (var i = 1; i < v.length; i++) {
    var r = v[i], t = r[0] instanceof Date ? r[0] : new Date(r[0]); if (!(t.getTime() >= since)) continue;
    var day = Utilities.formatDate(t, tz, 'yyyy-MM-dd'), vid = String(r[1]), sid = String(r[2]), ev = String(r[3]), det = String(r[4]), pg = String(r[5]).split('?')[0] || '/';
    var d = D[day] || (D[day] = { d: day, views: 0, vis: {}, ses: {}, nw: 0, wa: 0, oc: 0, orders: 0 });
    var s = S[sid] || (S[sid] = { src: String(r[6]), order: false, orderTap: false, placed: false, wa: false });
    d.vis[vid] = 1; d.ses[sid] = 1;
    if (!V[vid]) { V[vid] = { loc: String(r[7]), dev: String(r[9]) }; inc(loc, String(r[7]) || 'unknown'); inc(dev, String(r[9])); inc(lang, String(r[8]).slice(0, 2) || '?'); }
    if (ev === 'view') { d.views++; inc(pages, pg); hrs[Number(Utilities.formatDate(t, tz, 'H'))]++; wd[Number(Utilities.formatDate(t, tz, 'u')) % 7]++;
      if (r[10] === 'new') d.nw++; if (/^\/order\//.test(pg)) s.order = true; }
    if (ev === 'click') { inc(act, det.replace(/ \[.*\]$/, '')); if (/^WhatsApp/.test(det)) { d.wa++; s.wa = true; } if (/\/order\//.test(det)) d.oc++; if (/^\/order\//.test(pg) && !/^Language/.test(det)) s.orderTap = true; }
    if (ev === 'order') { d.orders++; s.placed = true; inc(act, 'ORDER: ' + det); }
    if (ev === 'leave') { var m = det.match(/^(\d+)s · scrolled (\d+)%/); if (m) { var x = tp[pg] || (tp[pg] = { n: 0, sec: 0, sc: 0 }); x.n++; x.sec += Math.min(Number(m[1]), 1800); x.sc += Number(m[2]); } }
    recent.push([Utilities.formatDate(t, tz, 'd MMM HH:mm'), ev, det, pg, String(r[6]), String(r[7]), String(r[9]), vid.slice(0, 4), String(r[10])]);
  }
  Object.keys(S).forEach(function (k) { inc(src, S[k].src || 'direct'); });
  var daysOut = Object.keys(D).sort().reverse().map(function (k) { var d = D[k]; return { d: k, views: d.views, visitors: Object.keys(d.vis).length, sessions: Object.keys(d.ses).length, nw: d.nw, wa: d.wa, oc: d.oc, orders: d.orders }; });
  var ses = Object.keys(S).map(function (k) { return S[k]; });
  var funnel = [['Visits (sessions)', ses.length], ['Opened the order page', ses.filter(function (s) { return s.order; }).length], ['Tapped something on the order page', ses.filter(function (s) { return s.orderTap; }).length], ['Placed an order (QR) / paid (card)', ses.filter(function (s) { return s.placed; }).length], ['Tapped a WhatsApp button', ses.filter(function (s) { return s.wa; }).length]];
  var time = Object.keys(tp).map(function (k) { var x = tp[k]; return [k, Math.round(x.sec / x.n), Math.round(x.sc / x.n), x.n]; }).sort(function (a, b) { return b[3] - a[3]; });
  return { days: days, visitors: Object.keys(V).length, sessions: ses.length, daily: daysOut, pages: top(pages), sources: top(src), locations: top(loc), devices: top(dev), langs: top(lang), actions: top(act, 25),
    hours: hrs, weekdays: wd, funnel: funnel, time: time, recent: recent.reverse().slice(0, 80), at: new Date().toISOString() };
}


/* ---- beku° admin APP (bekufrozen.com/admin/), Alfred 20 Nov 2026 "make it a app … log in with Google" ----
 * The app signs in with Google (Google Cloud project "beku-admin", OAuth web client below) and POSTs
 * {t: <Google ID token>, fn, args}. The token is checked with Google, then the email must be in
 * script property ADMIN_EMAILS (comma-separated; default below). Every admin function calls guard_():
 * it passes for an API call that passed that check, or for the signed-in owner on the old admin link. */
var ADMIN_CLIENT_ID = '383653792650-5c9pt8ss2jfjmn57g19oe191eo0dqoga.apps.googleusercontent.com';
var API_USER = '';
function allowedEmails_() {
  return String(props_().getProperty('ADMIN_EMAILS') || 'chaleurpatisserie@gmail.com,orderbeku@gmail.com')
    .toLowerCase().split(/[\s,;]+/).filter(String);
}
function userOk_() {
  if (API_USER) return true;
  var e = String(Session.getActiveUser().getEmail() || '').toLowerCase();
  return !!e && allowedEmails_().indexOf(e) >= 0;
}
function guard_() { if (!userOk_()) throw new Error('No access'); }
function verifyIdToken_(t) {
  if (!t) return '';
  var c = CacheService.getScriptCache();
  var k = 'tok' + Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, t)).slice(0, 40);
  var hit = c.get(k); if (hit) return hit;
  var r = UrlFetchApp.fetch('https://oauth2.googleapis.com/tokeninfo?id_token=' + encodeURIComponent(t), { muteHttpExceptions: true });
  if (r.getResponseCode() !== 200) return '';
  var j = JSON.parse(r.getContentText());
  if (j.aud !== ADMIN_CLIENT_ID) return '';
  if (String(j.email_verified) !== 'true') return '';
  if (['accounts.google.com', 'https://accounts.google.com'].indexOf(j.iss) < 0) return '';
  var left = Number(j.exp) - Math.floor(Date.now() / 1000);
  if (!(left > 0)) return '';
  var em = String(j.email || '').toLowerCase();
  c.put(k, em, Math.max(30, Math.min(3000, left)));
  return em;
}
function doPost(e) {
  var out = function (o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); };
  try {
    var b = JSON.parse(e.postData.contents);
    var who = verifyIdToken_(b.t);
    if (!who) return out({ ok: false, err: 'signin' });
    if (allowedEmails_().indexOf(who) < 0) return out({ ok: false, err: 'noaccess', email: who });
    API_USER = who;
    var fns = { getSettings: getSettings, saveSettings: saveSettings, uploadPhoto: uploadPhoto, getOrders: getOrders, getVisits: getVisits,
                whoami: function () { return who; } };
    if (!fns[b.fn]) return out({ ok: false, err: 'unknown function' });
    return out({ ok: true, r: fns[b.fn].apply(null, b.args || []) });
  } catch (err) {
    return out({ ok: false, err: String(err && err.message || err) });
  }
}
