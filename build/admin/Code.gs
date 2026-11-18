/** beku° Website admin — Alfred edits the website here (no code).
 *  Saves one settings file in Drive; the website (GitHub Action) reads it and rebuilds bekufrozen.com.
 */
var DEFAULTS = {"version": 1, "seo": {"en": {"title": "beku° · Cake & Frozen Dessert Supplier in Johor Bahru (JB) for Cafés, Restaurants & Hotels", "desc": "beku° is a wholesale cake supplier and frozen dessert supplier in Johor Bahru. Frozen cakes, petit gâteaux and bakes by the carton for cafés, restaurants, hotels and caterers. Pork, lard and alcohol free. Sample box RM50.", "keywords": "cake supplier, cake supplier JB, cake supply Johor Bahru, wholesale cake supplier, frozen cake supplier, frozen dessert supplier, dessert supplier, cafe supplier, café cake supplier, restaurant supplier, hotel dessert supplier, catering dessert supplier, frozen food supplier Johor Bahru, wholesale desserts Malaysia, petit gateaux wholesale", "shareTitle": "", "shareText": "", "heading": "Cake & dessert supplier in Johor Bahru", "text": "beku° is a wholesale **cake supplier in JB** and **frozen dessert supplier** for cafés, restaurants, hotels, caterers and event companies. We make our frozen cakes, petit gâteaux, pound cakes and brownies in our Johor Bahru kitchen, freeze them, and deliver them by the carton across the Johor Bahru area.\n\nLooking for a **café cake supplier** or a **restaurant dessert supplier** that saves you kitchen time? Our desserts arrive frozen, keep 6–9 months at −18°C, and only need thawing before you serve. Every product is pork, lard and alcohol free.", "chips": "Cake supplier JB, Frozen cake supplier, Frozen dessert supplier, Café supplier, Restaurant supplier, Hotel & catering desserts, Frozen food supplier Johor Bahru, Wholesale petit gâteaux"}, "zh": {"title": "beku° · 新山蛋糕批发 · 冷冻蛋糕与冷冻甜点供应商（咖啡馆、餐厅、酒店）", "desc": "beku° 是新山（JB）蛋糕批发与冷冻甜点供应商：冷冻蛋糕、法式小蛋糕与烘焙点心整箱批发，供应咖啡馆、餐厅、酒店和餐饮业者。不含猪肉、猪油和酒精。样品盒 RM50。", "keywords": "蛋糕批发, 新山蛋糕批发, 蛋糕供应商, 冷冻蛋糕, 冷冻蛋糕批发, 冷冻甜点, 冷冻甜点批发, 甜点供应商, 咖啡馆供应商, 餐厅甜点供应, 酒店甜点供应, 冷冻食品供应商, 新山甜点批发, 法式小蛋糕批发, cake supplier JB", "shareTitle": "", "shareText": "", "heading": "新山蛋糕批发与冷冻甜点供应商", "text": "beku° 是新山（JB）的**蛋糕批发**与**冷冻甜点供应商**，供应咖啡馆、餐厅、酒店、餐饮与活动公司。我们在新山自家厨房制作**冷冻蛋糕**、法式小蛋糕、磅蛋糕和布朗尼，急冻后整箱配送到新山各区。\n\n想找能帮你节省厨房时间的**咖啡馆甜点供应商**或**餐厅甜点供应**？我们的**冷冻甜点**在 −18°C 可保存 6–9 个月，解冻即可上桌。所有产品不含猪肉、猪油和酒精。", "chips": "新山蛋糕批发, 冷冻蛋糕, 冷冻甜点, 甜点供应商, 咖啡馆供应, 餐厅甜点供应, 酒店与餐饮甜点, 冷冻食品供应商"}, "ms": {"title": "beku° · Pembekal Kek & Pencuci Mulut Sejuk Beku Borong di Johor Bahru (JB)", "desc": "beku° ialah pembekal kek borong dan pencuci mulut sejuk beku di Johor Bahru. Kek sejuk beku, petit gâteaux dan bakes mengikut karton untuk kafe, restoran, hotel dan katering. Tanpa khinzir, lemak khinzir dan alkohol. Kotak sampel RM50.", "keywords": "pembekal kek, pembekal kek JB, pembekal kek Johor Bahru, kek borong, kek sejuk beku, pencuci mulut sejuk beku, pembekal pencuci mulut, pembekal kafe, pembekal restoran, pembekal makanan sejuk beku Johor Bahru, dessert supplier, cake supplier JB", "shareTitle": "", "shareText": "", "heading": "Pembekal kek & pencuci mulut di Johor Bahru", "text": "beku° ialah **pembekal kek borong di JB** dan **pembekal pencuci mulut sejuk beku** untuk kafe, restoran, hotel, katering dan syarikat acara. Kami buat **kek sejuk beku**, petit gâteaux, kek pound dan brownie di dapur kami di Johor Bahru, kemudian dihantar mengikut karton di sekitar Johor Bahru.\n\nCari **pembekal kek untuk kafe** atau **pembekal pencuci mulut untuk restoran** yang jimat masa dapur? Pencuci mulut kami tahan 6–9 bulan pada −18°C dan hanya perlu dinyahbeku sebelum dihidang. Semua produk tanpa khinzir, lemak khinzir dan alkohol.", "chips": "Pembekal kek JB, Kek sejuk beku, Pencuci mulut sejuk beku, Pembekal kafe, Pembekal restoran, Hotel & katering, Makanan sejuk beku Johor Bahru, Petit gâteaux borong"}}, "hero": {"en": {"tag": "christmas is coming · stock up your counter", "h1a": "wholesale frozen", "h1b": "desserts, explained", "h1c": "simply.", "sub": "Everything a café, restaurant or hotel in JB needs to know before ordering: the range, how it works, and the common questions."}, "zh": {"tag": "圣诞将至 · 为您的柜台备货", "h1a": "冷冻甜点批发，", "h1b": "一看就懂。", "h1c": "", "sub": "新山的咖啡馆、餐厅和酒店在下单前需要知道的一切：产品、流程和常见问题。"}, "ms": {"tag": "krismas semakin dekat · penuhkan kaunter anda", "h1a": "pencuci mulut sejuk beku", "h1b": "borong, diterangkan", "h1c": "dengan mudah.", "sub": "Semua yang kafe, restoran atau hotel di JB perlu tahu sebelum order: produk, cara ia berfungsi dan soalan lazim."}}, "ribbon": {"en": "christmas 2026 specials are here · Santa, Gingerbread Man & Star · while stocks last", "zh": "2026 圣诞限定已上架 · Santa、Gingerbread Man 与 Star · 售完即止", "ms": "istimewa krismas 2026 sudah tiba · Santa, Gingerbread Man & Star · sementara stok masih ada"}, "shareImage": "", "products": [{"id": "p0", "name": "Pistachio Kunafa", "cat": "pg", "spec": "12 PCS / CTN · 120 G ±", "show": true, "bg": "#d5f0b4", "ink": "#2f6b12", "img": "/img/BK-PG-102.webp", "photo": "", "tx": {"en": ["Pistachio mousse, pistachio kunafa, chocolate sponge, vanilla chantilly, pistachio sauce, chocolate coating", "Rich, nutty, chocolatey", "BEST SELLER"], "zh": ["开心果慕斯、开心果 kunafa、巧克力海绵蛋糕、香草香缇奶油、开心果酱、巧克力淋面", "浓郁、坚果香、巧克力味", "畅销"], "ms": ["Mousse pistachio, kunafa pistachio, span coklat, chantilly vanila, sos pistachio, salutan coklat", "Kaya, berkacang, coklat", "TERLARIS"]}}, {"id": "p1", "name": "Oolong Pear", "cat": "pg", "spec": "12 PCS / CTN · 120 G ±", "show": true, "bg": "#d5f0b4", "ink": "#2f6b12", "img": "/img/BK-PG-101.webp", "photo": "", "tx": {"en": ["Oolong mousse, pear jelly, vanilla chantilly, oolong sponge", "Tea, refreshing, fruity", "BEST SELLER"], "zh": ["乌龙茶慕斯、梨果冻、香草香缇奶油、乌龙茶海绵蛋糕", "茶香、清爽、果香", "畅销"], "ms": ["Mousse oolong, jeli pear, chantilly vanila, span oolong", "Teh, menyegarkan, buah-buahan", "TERLARIS"]}}, {"id": "p2", "name": "Chocolate Hazelnut", "cat": "pg", "spec": "12 PCS / CTN · 110 G ±", "show": true, "bg": "#efd9c8", "ink": "#6a3416", "img": "/img/BK-PG-105.webp", "photo": "", "tx": {"en": ["Hazelnut orange croustillant, chocolate ganache, chocolate sponge, chocolate mousse, caramelised hazelnut", "Chocolatey, nutty & citrusy", "BEST SELLER"], "zh": ["榛子橙香脆层、巧克力甘纳许、巧克力海绵蛋糕、巧克力慕斯、焦糖榛子", "巧克力、坚果、柑橘香", "畅销"], "ms": ["Rangup hazelnut oren, ganache coklat, span coklat, mousse coklat, hazelnut karamel", "Coklat, berkacang & sitrus", "TERLARIS"]}}, {"id": "p3", "name": "Raspberry Rose Lychee", "cat": "pg", "spec": "12 PCS / CTN · 120 G ±", "show": true, "bg": "#ffc6da", "ink": "#a30f47", "img": "/img/BK-PG-103.webp", "photo": "", "tx": {"en": ["Raspberry mousse, strawberry lychee compote, vanilla sponge, chocolate coating", "Floral notes & fruity", "BEST SELLER"], "zh": ["覆盆子慕斯、草莓荔枝果酱、香草海绵蛋糕、巧克力淋面", "花香、果香", "畅销"], "ms": ["Mousse raspberi, kompot strawberi laici, span vanila, salutan coklat", "Aroma bunga & buah-buahan", "TERLARIS"]}}, {"id": "p4", "name": "Decadent Chocolate", "cat": "pg", "spec": "12 PCS / CTN · 120 G ±", "show": true, "bg": "#efd9c8", "ink": "#6a3416", "img": "/img/BK-PG-107.webp", "photo": "", "tx": {"en": ["Moist chocolate sponge, chocolate disk, 70% dark chocolate crémeux, dark chocolate mousse", "Rich & chocolatey", "BEST SELLER"], "zh": ["湿润巧克力海绵蛋糕、巧克力片、70% 黑巧克力奶油霜、黑巧克力慕斯", "浓郁巧克力", "畅销"], "ms": ["Span coklat lembap, cakera coklat, crémeux coklat gelap 70%, mousse coklat gelap", "Kaya & coklat", "TERLARIS"]}}, {"id": "p5", "name": "Pandan Gula Melaka", "cat": "pg", "spec": "12 PCS / CTN · 140 G ±", "show": true, "bg": "#fff0a0", "ink": "#7a5a00", "img": "/img/BK-PG-104.webp", "photo": "", "tx": {"en": ["Pandan sponge, gula Melaka crémeux, coconut mousse, toasted coconut", "Aromatic, with caramel notes of gula Melaka", "BEST SELLER"], "zh": ["班兰海绵蛋糕、椰糖奶油霜、椰子慕斯、烤椰丝", "班兰清香，带椰糖焦糖风味", "畅销"], "ms": ["Span pandan, crémeux gula Melaka, mousse kelapa, kelapa bakar", "Wangi, dengan rasa karamel gula Melaka", "TERLARIS"]}}, {"id": "p6", "name": "Chocolate Banana", "cat": "pg", "spec": "12 PCS / CTN · 140 G ±", "show": true, "bg": "#ffd2a8", "ink": "#943800", "img": "/img/BK-PG-106.webp", "photo": "", "tx": {"en": ["Chocolate mousse, banana compote, chocolate sponge, chocolate coating, glaze", "Chocolatey & fruity", "KIDS' FAVOURITE"], "zh": ["巧克力慕斯、香蕉果酱、巧克力海绵蛋糕、巧克力淋面、镜面", "巧克力、果香", "小朋友最爱"], "ms": ["Mousse coklat, kompot pisang, span coklat, salutan coklat, glaze", "Coklat & buah-buahan", "KEGEMARAN KANAK-KANAK"]}}, {"id": "p7", "name": "Santa · Vanilla Strawberry", "cat": "xm", "spec": "12 PCS / CTN · 110 G ±", "show": true, "bg": "#cbe9f8", "ink": "#17558c", "img": "/img/BK-PG-108.webp", "photo": "", "tx": {"en": ["Vanilla mousse, vanilla sponge, strawberry compote, desiccated coconut", "Light & fruity", "SEASONAL"], "zh": ["香草慕斯、香草海绵蛋糕、草莓果酱、椰丝", "清爽果香", "季节限定"], "ms": ["Mousse vanila, span vanila, kompot strawberi, kelapa parut", "Ringan & buah-buahan", "MUSIM"]}}, {"id": "p8", "name": "Gingerbread Man · Black Forest", "cat": "xm", "spec": "12 PCS / CTN · 110 G ±", "show": true, "bg": "#cbe9f8", "ink": "#17558c", "img": "/img/BK-PG-109.webp", "photo": "", "tx": {"en": ["Chocolate mousse, chocolate sponge, sour cherry compote, almond chocolate coating", "Rich, chocolatey & fruity", "SEASONAL"], "zh": ["巧克力慕斯、巧克力海绵蛋糕、酸樱桃果酱、杏仁巧克力淋面", "浓郁巧克力与果香", "季节限定"], "ms": ["Mousse coklat, span coklat, kompot ceri masam, salutan coklat badam", "Kaya, coklat & buah-buahan", "MUSIM"]}}, {"id": "p9", "name": "Star · Blueberry Lavender", "cat": "xm", "spec": "12 PCS / CTN · 110 G ±", "show": true, "bg": "#cbe9f8", "ink": "#17558c", "img": "/img/BK-PG-110.webp", "photo": "", "tx": {"en": ["Blueberry mousse, blueberry lavender compote, vanilla sponge, chocolate coating", "Floral notes & fruity", "SEASONAL"], "zh": ["蓝莓慕斯、蓝莓薰衣草果酱、香草海绵蛋糕、巧克力淋面", "花香、果香", "季节限定"], "ms": ["Mousse blueberi, kompot blueberi lavender, span vanila, salutan coklat", "Aroma bunga & buah-buahan", "MUSIM"]}}, {"id": "p10", "name": "Lemon Pound", "cat": "bk", "spec": "10 PCS / CTN · 350 G ± LOAF", "show": true, "bg": "#fff0a0", "ink": "#7a5a00", "img": "/img/BK-SSB-201.webp", "photo": "", "tx": {"en": ["Moist, fluffy lemon pound loaf", "Rich, buttery & citrusy", "BEST SELLER"], "zh": ["湿润松软的柠檬磅蛋糕", "浓郁奶油香与柑橘味", "畅销"], "ms": ["Kek pound lemon yang lembap dan gebu", "Kaya, berlemak & sitrus", "TERLARIS"]}}, {"id": "p11", "name": "Sea-Salt Chocolate Almond Brownie", "cat": "bk", "spec": "45 PCS / CTN · 6×6 CM ±", "show": true, "bg": "#efd9c8", "ink": "#6a3416", "img": "/img/BK-SSB-202.webp", "photo": "", "tx": {"en": ["Fudgy sea-salt chocolate brownie topped with almonds", "Rich & chocolatey", "BEST SELLER"], "zh": ["海盐巧克力布朗尼，铺满杏仁", "浓郁巧克力", "畅销"], "ms": ["Brownie coklat garam laut yang fudgy dengan badam", "Kaya & coklat", "TERLARIS"]}}], "contact": {"whatsapp": "60143490928", "email": "orderbeku@gmail.com", "address": "01-03, Zennith Suites, Jalan Kebun Teh 2, Larkin, 80250 Johor Bahru"}};

function doGet() {
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
  var f = file_();
  var s = JSON.parse(f.getBlob().getDataAsString());
  s._fileId = f.getId();
  return s;
}

function saveSettings(s) {
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
    s.savedBy = Session.getActiveUser().getEmail() || 'admin';
    f.setContent(JSON.stringify(s));
    return { ok: true, savedAt: s.savedAt };
  } finally { lock.releaseLock(); }
}

function uploadPhoto(name, dataUrl) {
  var m = String(dataUrl).match(/^data:([^;]+);base64,(.*)$/);
  if (!m) throw new Error('Not a picture');
  var blob = Utilities.newBlob(Utilities.base64Decode(m[2]), m[1], name || 'photo');
  var f = sub_('photos').createFile(blob);
  f.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return { id: f.getId() };
}

function resetToDefaults() {
  return saveSettings(JSON.parse(JSON.stringify(DEFAULTS)));
}
