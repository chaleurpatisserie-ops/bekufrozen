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
    if (b.type) return out(publicCall_(b));   // website pop-up / cart / live pings (write-only)
    var who = verifyIdToken_(b.t);
    if (!who) return out({ ok: false, err: 'signin' });
    if (allowedEmails_().indexOf(who) < 0) return out({ ok: false, err: 'noaccess', email: who });
    API_USER = who;
    var fns = { getSettings: getSettings, saveSettings: saveSettings, uploadPhoto: uploadPhoto, getOrders: getOrders, getVisits: getVisits, getLive: getLive, markContacted: markContacted, getInsights: getInsights, getSearch: getSearch,
                whoami: function () { return who; } };
    if (!fns[b.fn]) return out({ ok: false, err: 'unknown function' });
    return out({ ok: true, r: fns[b.fn].apply(null, b.args || []) });
  } catch (err) {
    return out({ ok: false, err: String(err && err.message || err) });
  }
}


/* ---- Live visitors, carts, leads, pending (BEKU Website chat, Alfred 21 Nov 00:09–00:15: "cart, pending, live visitor" in admin;
   "ask them to fill in their name and number … only once"; "the number should be saved and I will contact them").
   The website posts {type:'web_lead'|'web_cart'|'web_ping', …} to this script's public API deployment (no sign-in needed to WRITE these;
   reading them needs the admin sign-in). Saved in the spreadsheet "beku° website visits", tabs Leads / Carts / Live. ---- */
var VISITS_ID = '1SfuAjnI0FwBCNgB3HNRH1Zy7tRJ9VWV5xjA58Kk_-eA';
function vTab_(name, head) {
  var ss = SpreadsheetApp.openById(VISITS_ID), sh = ss.getSheetByName(name);
  if (!sh) { sh = ss.insertSheet(name); sh.appendRow(head); sh.setFrozenRows(1); }
  return sh;
}
function cl_(d, k, n) { return String(d[k] == null ? '' : d[k]).replace(/[\r\n\t]/g, ' ').trim().slice(0, n || 120); }
function phone_(p) {
  var s = String(p || '').replace(/[^\d+]/g, '');
  if (/^\+/.test(s)) s = s.slice(1); else if (/^0/.test(s)) s = '6' + s; else if (/^1\d{8,9}$/.test(s)) s = '60' + s;
  return s.slice(0, 15);
}
function where_(z) { return /Kuala_Lumpur|Kuching/.test(z) ? 'Malaysia' : /Singapore/.test(z) ? 'Singapore' : String(z || '').replace(/^[^/]+\//, '').replace(/_/g, ' '); }
var LEAD_HEAD = ['Time', 'Visitor', 'Name', 'WhatsApp', 'Business', 'Page', 'Source', 'Language', 'Device', 'Location', 'Last seen', 'Contacted'];
var CART_HEAD = ['Started', 'Visitor', 'Name', 'WhatsApp', 'Items', 'Qty', 'Value (RM)', 'Kind', 'Status', 'Order no.', 'Updated', 'Page', 'Source'];
function pubLead_(d) {
  var name = cl_(d, 'name', 80), ph = phone_(d.phone), v = cl_(d, 'v', 20);
  if (!name || ph.length < 9) return { ok: false };
  var sh = vTab_('Leads', LEAD_HEAD), lock = LockService.getScriptLock(); lock.waitLock(15000);
  try {
    var f = v ? sh.getRange('B:B').createTextFinder(v).matchEntireCell(true).findNext() : null;
    var row = [v, name, ph, cl_(d, 'biz', 80), cl_(d, 'p'), cl_(d, 'r'), cl_(d, 'l', 5), cl_(d, 'd', 10), where_(cl_(d, 'z')), new Date()];
    if (f) sh.getRange(f.getRow(), 2, 1, row.length).setValues([row]);
    else sh.appendRow([new Date()].concat(row).concat(['']));
  } finally { lock.releaseLock(); }
  return { ok: true };
}
function pubCart_(d) {
  var v = cl_(d, 'v', 20); if (!v) return { ok: false };
  var st = cl_(d, 'st', 12); if (!/^(browsing|details|checkout|ordered|paid|emptied)$/.test(st)) st = 'browsing';
  var sh = vTab_('Carts', CART_HEAD), lock = LockService.getScriptLock(); lock.waitLock(15000);
  try {
    var last = sh.getLastRow(), r = 0;
    if (last > 1) { var vals = sh.getRange(2, 2, last - 1, 8).getValues();   // B..I
      for (var i = vals.length - 1; i >= 0; i--) if (String(vals[i][0]) === v && !/^(ordered|paid)$/.test(String(vals[i][7]))) { r = i + 2; break; } }
    var row = [cl_(d, 'name', 80), phone_(d.phone), cl_(d, 'items', 900), Number(d.q) || 0, Number(d.val) || 0, cl_(d, 'k', 20), st, cl_(d, 'o', 30), new Date(), cl_(d, 'p', 80), cl_(d, 'r', 80)];
    if (r) { var old = sh.getRange(r, 3, 1, 2).getValues()[0]; if (!row[0]) row[0] = old[0]; if (!row[1]) row[1] = old[1];
      sh.getRange(r, 3, 1, row.length).setValues([row]); }
    else if (st !== 'emptied' && (row[3] > 0 || st !== 'browsing')) sh.appendRow([new Date(), v].concat(row));
  } finally { lock.releaseLock(); }
  return { ok: true };
}
function pubPing_(d) {
  var sh = vTab_('Live', ['Time', 'Visitor', 'Session', 'Page', 'Title', 'Source', 'Device', 'Location']);
  sh.appendRow([new Date(), cl_(d, 'v', 20), cl_(d, 's', 20), cl_(d, 'p'), cl_(d, 'n'), cl_(d, 'r'), cl_(d, 'd', 10), where_(cl_(d, 'z'))]);
  if (sh.getLastRow() > 3000) sh.deleteRows(2, 2000);
  return { ok: true };
}
function publicCall_(b) {
  if (b.type === 'web_lead') return pubLead_(b);
  if (b.type === 'web_cart') return pubCart_(b);
  if (b.type === 'web_ping') return pubPing_(b);
  if (b.type === 'web_perf') return pubPerf_(b);
  return { ok: false };
}
function markContacted(visitor, done) {   // admin: tick a lead / cart as contacted
  guard_();
  var sh = vTab_('Leads', LEAD_HEAD), f = sh.getRange('B:B').createTextFinder(String(visitor)).matchEntireCell(true).findNext();
  if (f) sh.getRange(f.getRow(), 12).setValue(done ? Utilities.formatDate(new Date(), 'Asia/Kuala_Lumpur', 'd MMM HH:mm') + ' · ' + (API_USER || 'admin') : '');
  return { ok: !!f };
}
function getLive() {
  guard_();
  var tz = 'Asia/Kuala_Lumpur', now = Date.now(), ss = SpreadsheetApp.openById(VISITS_ID);
  function rows(name) { var sh = ss.getSheetByName(name); return sh && sh.getLastRow() > 1 ? sh.getRange(2, 1, sh.getLastRow() - 1, sh.getLastColumn()).getValues() : []; }
  function iso(t) { return t instanceof Date ? Utilities.formatDate(t, tz, "yyyy-MM-dd'T'HH:mm:ss") : String(t || ''); }
  var leads = rows('Leads'), byV = {};
  leads.forEach(function (r) { byV[String(r[1])] = { name: String(r[2]), phone: String(r[3]) }; });
  // live = activity in the last 3 minutes (pings every 30 s while the page is open), latest per session, not if they left
  var S = {}, cut = now - 3 * 60e3;
  function seen(t, v, s, ev, page, src, dev, loc, title) {
    t = t instanceof Date ? t.getTime() : new Date(t).getTime(); if (!(t >= cut)) return;
    var o = S[s] = S[s] || { v: v, s: s, first: t, t: 0 };
    if (t >= o.t) { o.t = t; o.ev = ev; if (page) o.page = page; if (title) o.title = title; }
    o.first = Math.min(o.first, t); if (src) o.src = src; if (dev) o.dev = dev; if (loc) o.loc = loc; o.n = (o.n || 0) + (ev === 'click' ? 1 : 0);
  }
  var vis = ss.getSheetByName('Visits'), vl = vis ? vis.getLastRow() : 0;
  if (vl > 1) { var k = Math.min(vl - 1, 1500); vis.getRange(vl - k + 1, 1, k, 12).getValues().forEach(function (r) {
    seen(r[0], String(r[1]), String(r[2]), String(r[3]), String(r[5]).split('?')[0], String(r[6]), String(r[9]), String(r[7]), r[3] === 'view' ? String(r[4]) : ''); }); }
  rows('Live').slice(-1500).forEach(function (r) { seen(r[0], String(r[1]), String(r[2]), 'ping', String(r[3]).split('?')[0], String(r[5]), String(r[6]), String(r[7]), String(r[4])); });
  var live = Object.keys(S).map(function (k) { return S[k]; }).filter(function (o) { return o.ev !== 'leave'; })
    .sort(function (a, b) { return b.t - a.t; })
    .map(function (o) { var w = byV[o.v] || {}; return { page: o.page || '/', title: o.title || '', src: o.src || '', dev: o.dev || '', loc: o.loc || '',
      ago: Math.round((now - o.t) / 1000), on: Math.round((o.t - o.first) / 1000), taps: o.n || 0, name: w.name || '', phone: w.phone || '' }; });
  var carts = rows('Carts').map(function (r) { var w = byV[String(r[1])] || {}; return { started: iso(r[0]), v: String(r[1]), name: String(r[2] || w.name || ''), phone: String(r[3] || w.phone || ''),
      items: String(r[4]), q: Number(r[5]) || 0, val: Number(r[6]) || 0, kind: String(r[7]), st: String(r[8]), no: String(r[9]), upd: iso(r[10]),
      mins: r[10] instanceof Date ? Math.round((now - r[10].getTime()) / 60e3) : 0 }; })
    .filter(function (c) { return c.q > 0 || /ordered|paid/.test(c.st); }).reverse().slice(0, 200);
  var lds = leads.map(function (r) { return { t: iso(r[0]), v: String(r[1]), name: String(r[2]), phone: String(r[3]), biz: String(r[4]), page: String(r[5]), src: String(r[6]),
      lang: String(r[7]), dev: String(r[8]), loc: String(r[9]), last: iso(r[10]), done: String(r[11] || '') }; }).reverse().slice(0, 300);
  var pend = getOrders().rows.filter(function (o) { return !/^paid/i.test(o.pay) && !/cancel|refund|deliver/i.test(o.st + ' ' + o.pay); }).slice(0, 100);
  return { live: live, carts: carts, leads: lds, pending: pend, at: new Date().toISOString() };
}


/* ---- Insights (BEKU Website chat, Alfred 21 Nov 00:35 "add all"): funnel, per dessert, per source/ad, returning visitors,
   leads → customers, busy hours, site speed & errors, customer value, Google search words, daily alert email. Read only. ---- */
var ALERT_TO = 'chaleurpatisserie@gmail.com';
var SC_SITE = 'https://bekufrozen.com/';
function pubPerf_(d) {
  var sh = vTab_('Health', ['Time', 'Visitor', 'Kind', 'Page', 'Load ms', 'First byte ms', 'Ready ms', 'Main picture ms', 'Network', 'Device', 'Detail']);
  sh.appendRow([new Date(), cl_(d, 'v', 20), cl_(d, 'k', 10), cl_(d, 'p'), Number(d.ms) || '', Number(d.ttfb) || '', Number(d.dom) || '', Number(d.lcp) || '',
    cl_(d, 'net', 10), cl_(d, 'd', 10), cl_(d, 'm', 200)]);
  if (sh.getLastRow() > 20000) sh.deleteRows(2, 5000);
  return { ok: true };
}
function phoneKey_(p) { var s = String(p || '').replace(/\D/g, ''); if (/^0/.test(s)) s = '6' + s; return s.length >= 9 ? s.slice(-9) : ''; }
function srcName_(s) {
  s = String(s || '').trim(); if (!s || s === 'direct') return 'Direct / typed / app';
  if (/google/i.test(s) && !/\//.test(s)) return 'Google search'; if (/bing|yahoo|duckduckgo/i.test(s)) return 'Other search engine';
  if (/^(l\.)?(m\.)?(facebook|instagram|fb)\.|lm\.facebook/i.test(s)) return 'Facebook / Instagram (link)';
  if (/whatsapp|wa\.me/i.test(s)) return 'WhatsApp'; return s;
}
function getInsights(days) {
  guard_();
  days = Math.min(Math.max(Number(days) || 30, 1), 365);
  var tz = 'Asia/Kuala_Lumpur', now = Date.now(), since = now - days * 864e5, ss = SpreadsheetApp.openById(VISITS_ID);
  function rows(name) { var sh = ss.getSheetByName(name); return sh && sh.getLastRow() > 1 ? sh.getRange(2, 1, sh.getLastRow() - 1, sh.getLastColumn()).getValues() : []; }
  function tm(x) { return x instanceof Date ? x.getTime() : new Date(x).getTime(); }
  function inP(x) { return tm(x) >= since; }
  function pct(a, b) { return b ? Math.round(1000 * a / b) / 10 : 0; }
  var S = getSettings(), names = (S.products || []).filter(function (p) { return p.name; }).map(function (p) { return p.name; });
  var short = names.map(function (n) { return n.split(' · ')[0].trim(); });
  function dessertsIn(txt) { txt = String(txt || '').toLowerCase(); var hit = []; short.forEach(function (n, i) { if (n && txt.indexOf(n.toLowerCase()) >= 0) hit.push(i); }); return hit; }
  // ---- read
  var visits = rows('Visits').filter(function (r) { return inP(r[0]); });
  var carts = rows('Carts'), leads = rows('Leads'), health = rows('Health').filter(function (r) { return inP(r[0]); });
  var orders = getOrders().rows.filter(function (o) { return !/test/i.test(o.biz + ' ' + o.items) && !/cancel|refund/i.test(o.pay + ' ' + o.st); });
  var leadBy = {}; leads.forEach(function (r) { leadBy[String(r[1])] = { name: String(r[2]), phone: String(r[3]), src: String(r[6]), t: tm(r[0]) }; });
  // ---- per visitor
  var V = {};
  visits.forEach(function (r) {
    var v = String(r[1]); if (!v) return; var o = V[v] = V[v] || { v: v, sess: {}, days: {}, views: 0, taps: 0, src: '', first: tm(r[0]), last: 0, dessert: false, order: false, pages: {} };
    var t = tm(r[0]), ev = String(r[3]), det = String(r[4]), pg = String(r[5]).split('?')[0] || '/';
    o.sess[String(r[2])] = 1; o.days[Utilities.formatDate(new Date(t), tz, 'yyyy-MM-dd')] = 1; o.first = Math.min(o.first, t); o.last = Math.max(o.last, t);
    if (!o.src && r[6]) o.src = srcName_(r[6]);
    if (ev === 'view') { o.views++; o.pages[pg] = 1; if (/^\/order\//.test(pg)) o.order = true; }
    if (ev === 'click') { o.taps++; if (dessertsIn(det).length || /^Dessert:/.test(det)) o.dessert = true; if (/order\//.test(det)) o.order = true; }
  });
  var vis = Object.keys(V).map(function (k) { return V[k]; });
  // ---- carts in period
  var cartsP = carts.filter(function (r) { return inP(r[0]) && (Number(r[5]) > 0 || /ordered|paid/.test(String(r[8]))); });
  var cartV = {}, detV = {}, ordV = {}, paidV = {};
  cartsP.forEach(function (r) { var v = String(r[1]), st = String(r[8]); cartV[v] = 1; if (/details|checkout|ordered|paid/.test(st)) detV[v] = 1; if (/ordered|paid/.test(st)) ordV[v] = 1; if (st === 'paid') paidV[v] = 1; });
  var nV = vis.length, nD = vis.filter(function (o) { return o.dessert; }).length, nO = vis.filter(function (o) { return o.order; }).length;
  var funnel = [['Visited the website', nV], ['Looked at a dessert', nD], ['Opened the order page', nO], ['Put something in the cart', Object.keys(cartV).length],
    ['Filled in their details', Object.keys(detV).length], ['Placed the order', Object.keys(ordV).length], ['Paid online by card / FPX', Object.keys(paidV).length]];
  funnel = funnel.map(function (f, i) { return { step: f[0], n: f[1], ofAll: pct(f[1], nV), ofPrev: i ? pct(f[1], funnel[i - 1][1]) : 100 }; });
  // ---- per dessert
  var D = names.map(function (n) { return { name: n, taps: 0, tapV: {}, carts: 0, cartQ: 0, orders: 0, ordQ: 0 }; });
  visits.forEach(function (r) { if (String(r[3]) !== 'click') return; dessertsIn(r[4]).forEach(function (i) { D[i].taps++; D[i].tapV[String(r[1])] = 1; }); });
  cartsP.forEach(function (r) { String(r[4]).split(/;\s*/).forEach(function (part) { var m = part.match(/(\d+)\s*x\s*(.+)/i); if (!m) return; dessertsIn(m[2]).forEach(function (i) { D[i].carts++; D[i].cartQ += Number(m[1]) || 0; }); }); });
  orders.filter(function (o) { return tm(o.d) >= since; }).forEach(function (o) { String(o.items).split(/;\s*/).forEach(function (part) {
    var m = part.match(/(.+?)\s*x\s*(\d+)/i) || part.match(/(\d+)\s*x\s*(.+)/i); if (!m) return; var nm = /^\d+$/.test(m[1]) ? m[2] : m[1], q = Number(/^\d+$/.test(m[1]) ? m[1] : m[2]) || 0;
    dessertsIn(nm).forEach(function (i) { D[i].orders++; D[i].ordQ += q; }); }); });
  var desserts = D.map(function (d) { return { name: d.name, taps: d.taps, people: Object.keys(d.tapV).length, carts: d.carts, cartQ: d.cartQ, orders: d.orders, ordQ: d.ordQ }; })
    .sort(function (a, b) { return (b.ordQ - a.ordQ) || (b.cartQ - a.cartQ) || (b.taps - a.taps); });
  // ---- per source / ad
  var SRC = {};
  function sAdd(s, k, n) { s = s || 'Direct / typed / app'; var o = SRC[s] = SRC[s] || { src: s, visitors: 0, leads: 0, carts: 0, orders: 0, paid: 0 }; o[k] += n || 1; }
  vis.forEach(function (o) { sAdd(o.src, 'visitors'); });
  leads.filter(function (r) { return inP(r[0]); }).forEach(function (r) { sAdd(srcName_(r[6]), 'leads'); });
  cartsP.forEach(function (r) { var s = srcName_(r[12]); sAdd(s, 'carts'); if (/ordered|paid/.test(String(r[8]))) sAdd(s, 'orders'); if (String(r[8]) === 'paid') sAdd(s, 'paid'); });
  var sources = Object.keys(SRC).map(function (k) { var o = SRC[k]; o.leadRate = pct(o.leads, o.visitors); o.orderRate = pct(o.orders, o.visitors); return o; })
    .sort(function (a, b) { return b.visitors - a.visitors; });
  // ---- returning visitors
  var ret = vis.filter(function (o) { return Object.keys(o.sess).length > 1; }).sort(function (a, b) { return Object.keys(b.sess).length - Object.keys(a.sess).length || b.last - a.last; });
  var returning = { total: nV, returning: ret.length, rate: pct(ret.length, nV),
    list: ret.slice(0, 30).map(function (o) { var l = leadBy[o.v] || {}; return { name: l.name || '', phone: l.phone || '', visits: Object.keys(o.sess).length, days: Object.keys(o.days).length,
      pages: Object.keys(o.pages).length, taps: o.taps, src: o.src, last: Utilities.formatDate(new Date(o.last), tz, "yyyy-MM-dd'T'HH:mm:ss"), cart: !!cartV[o.v] }; }) };
  // ---- leads → customers (match the WhatsApp number with orders)
  var firstOrd = {}; orders.forEach(function (o) { var k = phoneKey_(o.phone); if (!k) return; var t = tm(o.d); if (!firstOrd[k] || t < firstOrd[k].t) firstOrd[k] = { t: t, biz: o.biz, total: o.total }; });
  var lc = leads.map(function (r) { var k = phoneKey_(r[3]), o = k && firstOrd[k], t = tm(r[0]); return { name: String(r[2]), phone: String(r[3]), t: t, src: srcName_(r[6]),
      customer: !!o, before: !!(o && o.t < t), days: o && o.t >= t ? Math.round((o.t - t) / 864e5) : null, biz: o ? o.biz : '' }; });
  var conv = lc.filter(function (x) { return x.customer && !x.before; }), dd = conv.map(function (x) { return x.days; }).filter(function (x) { return x != null; });
  var leadsToCustomers = { leads: lc.length, became: conv.length, already: lc.filter(function (x) { return x.before; }).length, rate: pct(conv.length, lc.length),
    avgDays: dd.length ? Math.round(10 * dd.reduce(function (a, b) { return a + b; }, 0) / dd.length) / 10 : null,
    list: conv.slice(-20).reverse().map(function (x) { return { name: x.name, phone: x.phone, biz: x.biz, days: x.days, src: x.src }; }) };
  // ---- busy hours (visits: unique sessions per weekday x hour; orders per weekday x hour)
  var heat = [], oh = [], sx = {}; for (var w = 0; w < 7; w++) { heat.push([]); oh.push([]); for (var h = 0; h < 24; h++) { heat[w].push(0); oh[w].push(0); } }
  visits.forEach(function (r) { if (String(r[3]) !== 'view') return; var k = String(r[2]); var d = new Date(tm(r[0]));
    var wd = Number(Utilities.formatDate(d, tz, 'u')) % 7, hr = Number(Utilities.formatDate(d, tz, 'H')); if (sx[k + wd + '_' + hr]) return; sx[k + wd + '_' + hr] = 1; heat[wd][hr]++; });
  orders.filter(function (o) { return tm(o.d) >= since; }).forEach(function (o) { var d = new Date(tm(o.d)); if (isNaN(d)) return; oh[Number(Utilities.formatDate(d, tz, 'u')) % 7][Number(Utilities.formatDate(d, tz, 'H'))]++; });
  // ---- speed & errors
  function med(a) { if (!a.length) return null; a = a.slice().sort(function (x, y) { return x - y; }); return a[Math.floor(a.length / 2)]; }
  function p75(a) { if (!a.length) return null; a = a.slice().sort(function (x, y) { return x - y; }); return a[Math.floor(a.length * .75)]; }
  var loads = health.filter(function (r) { return String(r[2]) === 'load' && Number(r[4]) > 0; }), PG = {}, DV = {};
  loads.forEach(function (r) { var p = String(r[3]).split('?')[0]; (PG[p] = PG[p] || []).push(Number(r[4])); var dv = String(r[9]) || '?'; (DV[dv] = DV[dv] || []).push(Number(r[4])); });
  var errs = {}; health.filter(function (r) { return String(r[2]) === 'error'; }).forEach(function (r) { var k = String(r[10]); var o = errs[k] = errs[k] || { msg: k, n: 0, page: String(r[3]), last: 0 }; o.n++; o.last = Math.max(o.last, tm(r[0])); });
  var speed = { n: loads.length, median: med(loads.map(function (r) { return Number(r[4]); })), p75: p75(loads.map(function (r) { return Number(r[4]); })),
    lcp: med(loads.map(function (r) { return Number(r[7]); }).filter(function (x) { return x > 0; })),
    pages: Object.keys(PG).map(function (p) { return { page: p, n: PG[p].length, median: med(PG[p]), p75: p75(PG[p]) }; }).sort(function (a, b) { return b.n - a.n; }).slice(0, 15),
    devices: Object.keys(DV).map(function (d) { return { dev: d, n: DV[d].length, median: med(DV[d]) }; }),
    errors: Object.keys(errs).map(function (k) { var o = errs[k]; o.last = Utilities.formatDate(new Date(o.last), tz, "yyyy-MM-dd'T'HH:mm:ss"); return o; }).sort(function (a, b) { return b.n - a.n; }).slice(0, 20) };
  // ---- customer value (all time)
  var C = {};
  orders.forEach(function (o) { var b = String(o.biz || '').trim(); if (!b) return; var t = tm(o.d); if (isNaN(t)) return;
    var c = C[b.toUpperCase()] = C[b.toUpperCase()] || { biz: b, n: 0, paidTotal: 0, total: 0, ts: [] }; c.n++; c.total += Number(o.total) || 0; if (/^paid/i.test(o.pay)) c.paidTotal += Number(o.total) || 0; c.ts.push(t); });
  var customers = Object.keys(C).map(function (k) { var c = C[k]; c.ts.sort(); var gaps = []; for (var i = 1; i < c.ts.length; i++) gaps.push((c.ts[i] - c.ts[i - 1]) / 864e5);
    var gap = gaps.length ? gaps.reduce(function (a, b) { return a + b; }, 0) / gaps.length : null, last = c.ts[c.ts.length - 1];
    var next = gap ? last + gap * 864e5 : null;
    return { biz: c.biz, orders: c.n, total: Math.round(c.total * 100) / 100, avg: Math.round(100 * c.total / c.n) / 100, first: Utilities.formatDate(new Date(c.ts[0]), tz, 'yyyy-MM-dd'),
      last: Utilities.formatDate(new Date(last), tz, 'yyyy-MM-dd'), every: gap ? Math.round(gap) : null, next: next ? Utilities.formatDate(new Date(next), tz, 'yyyy-MM-dd') : '',
      late: next ? Math.round((now - next) / 864e5) : null, since: Math.round((now - last) / 864e5) }; })
    .sort(function (a, b) { return b.total - a.total; });
  var tot = customers.reduce(function (a, c) { return a + c.total; }, 0), rep = customers.filter(function (c) { return c.orders > 1; }).length;
  return { days: days, at: new Date().toISOString(), funnel: funnel, desserts: desserts, sources: sources, returning: returning, leadsToCustomers: leadsToCustomers,
    heat: heat, orderHeat: oh, speed: speed,
    customers: { list: customers, count: customers.length, repeat: rep, repeatRate: pct(rep, customers.length), total: Math.round(tot * 100) / 100,
      avgOrder: (function () { var n = customers.reduce(function (a, c) { return a + c.orders; }, 0); return n ? Math.round(100 * tot / n) / 100 : 0; })() } };
}
function getSearch(days) {   // Google search words + pages, from Search Console (data is ~2-3 days behind)
  guard_();
  days = Math.min(Math.max(Number(days) || 28, 1), 480);
  var tz = 'Asia/Kuala_Lumpur', end = new Date(Date.now() - 2 * 864e5), start = new Date(end.getTime() - (days - 1) * 864e5);
  function q(dims, limit) {
    var r = UrlFetchApp.fetch('https://searchconsole.googleapis.com/webmasters/v3/sites/' + encodeURIComponent(SC_SITE) + '/searchAnalytics/query', {
      method: 'post', contentType: 'application/json', muteHttpExceptions: true, headers: { Authorization: 'Bearer ' + ScriptApp.getOAuthToken() },
      payload: JSON.stringify({ startDate: Utilities.formatDate(start, tz, 'yyyy-MM-dd'), endDate: Utilities.formatDate(end, tz, 'yyyy-MM-dd'), dimensions: dims, rowLimit: limit || 50 }) });
    if (r.getResponseCode() !== 200) throw new Error('Search Console: ' + r.getContentText().slice(0, 200));
    return (JSON.parse(r.getContentText()).rows || []).map(function (x) { return { k: x.keys, clicks: x.clicks, imp: x.impressions, ctr: Math.round(1000 * x.ctr) / 10, pos: Math.round(10 * x.position) / 10 }; });
  }
  return { from: Utilities.formatDate(start, tz, 'd MMM'), to: Utilities.formatDate(end, tz, 'd MMM'), queries: q(['query'], 50), pages: q(['page'], 20), countries: q(['country'], 10), devices: q(['device'], 5) };
}
function dailyAlert() {   // 9am every day: emails Alfred when something needs attention (time trigger, set up by setupAlerts)
  var ss = SpreadsheetApp.openById(VISITS_ID), since = Date.now() - 864e5, tz = 'Asia/Kuala_Lumpur', lines = [];
  function rows(name) { var sh = ss.getSheetByName(name); return sh && sh.getLastRow() > 1 ? sh.getRange(2, 1, sh.getLastRow() - 1, sh.getLastColumn()).getValues() : []; }
  var h = rows('Health').filter(function (r) { return new Date(r[0]).getTime() >= since; });
  var errs = h.filter(function (r) { return r[2] === 'error'; }), loads = h.filter(function (r) { return r[2] === 'load' && Number(r[4]) > 0; }).map(function (r) { return Number(r[4]); }).sort(function (a, b) { return a - b; });
  var med = loads.length ? loads[Math.floor(loads.length / 2)] : 0;
  var newLeads = rows('Leads').filter(function (r) { return !r[11]; });
  var openCarts = rows('Carts').filter(function (r) { return Number(r[5]) > 0 && !/ordered|paid|emptied/.test(String(r[8])) && new Date(r[10]).getTime() >= since; });
  var visitors = {}; rows('Visits').forEach(function (r) { if (new Date(r[0]).getTime() >= since) visitors[r[1]] = 1; });
  if (newLeads.length) lines.push('🙋 ' + newLeads.length + ' lead(s) not contacted yet: ' + newLeads.slice(-10).map(function (r) { return r[2] + ' (' + r[3] + ')'; }).join(', '));
  if (openCarts.length) lines.push('🛒 ' + openCarts.length + ' cart(s) left without paying in the last 24 h: ' + openCarts.map(function (r) { return (r[2] || 'visitor') + ' – ' + r[4] + ' RM' + r[6]; }).join('; '));
  if (errs.length) lines.push('⚠️ ' + errs.length + ' website error(s) in the last 24 h, e.g. "' + String(errs[0][10]).slice(0, 120) + '" on ' + errs[0][3] + '. Tell the BEKU Website chat.');
  if (med > 5000) lines.push('🐢 The website was slow yesterday: pages took ' + (med / 1000).toFixed(1) + ' s to load (median). Tell the BEKU Website chat.');
  if (!lines.length) return;
  lines.unshift('Good morning! Website in the last 24 hours: ' + Object.keys(visitors).length + ' visitors.');
  lines.push('', 'Open the beku° admin app → 🟢 Live, carts & leads / 📊 Insights: https://bekufrozen.com/admin/');
  MailApp.sendEmail(ALERT_TO, 'beku° website – ' + Utilities.formatDate(new Date(), tz, 'd MMM') + ': things to follow up', lines.join('\n'));
}
function setupAlerts() {   // run once from the editor
  ScriptApp.getProjectTriggers().forEach(function (t) { if (t.getHandlerFunction() === 'dailyAlert') ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger('dailyAlert').timeBased().atHour(9).nearMinute(5).everyDays(1).inTimezone('Asia/Kuala_Lumpur').create();
  return 'daily alert set for 9am';
}
function testInsights() { var r = getInsights(30); Logger.log('funnel ' + JSON.stringify(r.funnel.map(function (f) { return f.n; })) + ' desserts ' + r.desserts.length + ' sources ' + r.sources.length + ' customers ' + r.customers.count + ' bytes ' + JSON.stringify(r).length); }
function testSearch() { var r = getSearch(28); Logger.log('queries ' + r.queries.length + ' pages ' + r.pages.length + ' ' + JSON.stringify(r.queries.slice(0, 3))); }
