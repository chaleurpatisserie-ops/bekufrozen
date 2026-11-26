# -*- coding: utf-8 -*-
"""中文 + BM versions of the English-only pages (About, Clients, Partners).
Alfred 21 Nov 14:35: "all page will change language and customer only need to press one time, and all other page follows."
The English page is built first; localize() swaps the visible texts and the links.
Rules: pork, lard & alcohol free ("khinzir", never "babi"); no halal; no self-pickup; no OEM; no prices beyond the sample box rule.
"""
import re

LANGS = {'zh': {'hl': 'zh-Hans', 'pre': '/zh'}, 'ms': {'hl': 'ms', 'pre': '/ms'}}

# (English, 中文, BM). Longest first is applied automatically.
T = [
    # About: ingredients + chef (Alfred 26 Nov 14:37)
    ("what goes in, and what doesn't", '用料讲究，不加多余', 'apa yang kami guna, dan apa yang tidak'),
    ('real ingredients, kept by the cold', '真材实料，靠冷冻保鲜', 'bahan sebenar, dijaga oleh suhu sejuk'),
    ('Our desserts keep because of the science behind freezing, not because of preservatives. We freeze them properly, so they hold their taste and texture until you thaw them.', '我们的甜点能保存，靠的是冷冻背后的科学，而不是防腐剂。正确冷冻，让味道和口感一直保持到您解冻的那一刻。', 'Pencuci mulut kami tahan lama kerana sains di sebalik pembekuan, bukan kerana pengawet. Kami membekukannya dengan betul supaya rasa dan teksturnya kekal sehingga anda nyahbeku.'),
    ('<b>Premium &amp; imported ingredients</b>chosen for taste, not for cost', '<b>优质进口原料</b>为味道而选，不为省成本', '<b>Bahan premium &amp; import</b>dipilih untuk rasa, bukan kos'),
    ('<b>Natural, no additives</b>nothing added to stretch the shelf life', '<b>天然，无添加</b>不靠添加物延长保质期', '<b>Semula jadi, tanpa bahan tambahan</b>tiada apa ditambah untuk panjangkan hayat'),
    ('<b>No preservatives</b>freezing keeps them, not chemicals', '<b>无防腐剂</b>靠冷冻保存，不靠化学品', '<b>Tanpa pengawet</b>dijaga oleh pembekuan, bukan bahan kimia'),
    ('<b>Pork, lard &amp; alcohol free</b>every dessert, every carton', '<b>不含猪肉、猪油和酒精</b>每一款、每一箱', '<b>Tanpa khinzir, lemak khinzir &amp; alkohol</b>setiap pencuci mulut, setiap karton'),
    ('<b>Made in Malaysia</b>in our kitchen in Johor Bahru', '<b>马来西亚制造</b>在我们新山的厨房制作', '<b>Buatan Malaysia</b>di dapur kami di Johor Bahru'),
    ('meet our chef', '认识我们的主厨', 'kenali cef kami'),
    ('Director &amp; Executive Chef, Chaleur Atelier F&amp;B', 'Chaleur Atelier F&amp;B 董事兼行政总厨', 'Pengarah &amp; Cef Eksekutif, Chaleur Atelier F&amp;B'),
    ('An expert in dessert production and in the frozen dessert chain, from the kitchen to your freezer. Chef Alfred builds every beku° recipe on natural ingredients with no additives, so each dessert freezes well and tastes the way it should after thawing.', '甜点生产与冷冻甜点供应链专家，从厨房到您的冷冻柜全程把关。Alfred 主厨的每一款 beku° 配方都以天然原料为基础、无添加，让甜点冷冻得好，解冻后依然是应有的味道。', 'Pakar dalam pengeluaran pencuci mulut dan rantaian pencuci mulut sejuk beku, dari dapur ke peti sejuk beku anda. Cef Alfred membina setiap resipi beku° dengan bahan semula jadi tanpa bahan tambahan, supaya setiap pencuci mulut beku dengan baik dan rasanya tetap seperti sepatutnya selepas nyahbeku.'),
    # menu + header
    ('Order online', '在线下单', 'Pesan dalam talian'),
    ('Sample box · RM50', '样品盒 · RM50', 'Kotak sampel · RM50'),
    ('>Desserts<', '>甜点<', '>Pencuci mulut<'),
    ('>How it works<', '>如何运作<', '>Cara ia berfungsi<'),
    ('>About us<', '>关于我们<', '>Tentang kami<'),
    ('>Our clients<', '>我们的客户<', '>Pelanggan kami<'),
    ('>For partners<', '>合作伙伴专区<', '>Untuk rakan niaga<'),
    ('>FAQ<', '>常见问题<', '>Soalan<'),
    ('>Track order<', '>追踪订单<', '>Jejak order<'),
    ('aria-label="Menu"', 'aria-label="菜单"', 'aria-label="Menu"'),
    # titles / descriptions
    ('About us · Chaleur Atelier, the pâtisserie behind beku°', '关于我们 · beku° 背后的甜点坊 Chaleur Atelier', 'Tentang kami · Chaleur Atelier, pâtisserie di sebalik beku°'),
    ('beku° is the frozen wholesale line of Chaleur Atelier Pâtisserie in Larkin, Johor Bahru: freezable desserts made by our own pastry chefs, pork, lard and alcohol free.',
     'beku° 是新山 Larkin 的 Chaleur Atelier Pâtisserie 旗下的冷冻甜点批发品牌：由我们自己的甜点师制作、专为冷冻设计的甜点，不含猪肉、猪油和酒精。',
     'beku° ialah barisan borong sejuk beku Chaleur Atelier Pâtisserie di Larkin, Johor Bahru: pencuci mulut yang boleh dibekukan, dibuat oleh cef pastri kami sendiri, tanpa khinzir, lemak khinzir dan alkohol.'),
    ('Our clients &amp; our work · beku° frozen desserts, Johor Bahru', '我们的客户 · beku° 冷冻甜点，新山', 'Pelanggan kami · beku° pencuci mulut sejuk beku, Johor Bahru'),
    ('beku° · Our clients &amp; our work', 'beku° · 我们的客户', 'beku° · Pelanggan kami'),
    ('Cafés, restaurants, hotels and brands served by the Chaleur Atelier pastry team, the makers of beku° frozen petit gâteaux and bakes in Johor Bahru. Pork, lard and alcohol free.',
     '由 Chaleur Atelier 甜点团队服务过的咖啡馆、餐厅、酒店和品牌。我们也是新山 beku° 冷冻法式小蛋糕和烘焙的制作者。不含猪肉、猪油和酒精。',
     'Kafe, restoran, hotel dan jenama yang pernah dilayan oleh pasukan pastri Chaleur Atelier, pembuat petit gâteau dan kek sejuk beku beku° di Johor Bahru. Tanpa khinzir, lemak khinzir dan alkohol.'),
    ('For partners · free marketing material · beku°', '合作伙伴专区 · 免费宣传素材 · beku°', 'Untuk rakan niaga · bahan pemasaran percuma · beku°'),
    ('Free photos, ready captions and badges for cafés and restaurants that serve beku° desserts, plus how to get featured on our Instagram.',
     '给售卖 beku° 甜点的咖啡馆和餐厅：免费照片、现成文案和标志，以及如何登上我们的 Instagram。',
     'Gambar percuma, kapsyen sedia ada dan lencana untuk kafe dan restoran yang menjual pencuci mulut beku°, serta cara untuk dipaparkan di Instagram kami.'),
    # about: Chaleur section
    ('alt="Chaleur Atelier Pâtisserie"', 'alt="Chaleur Atelier Pâtisserie"', 'alt="Chaleur Atelier Pâtisserie"'),
    ('>by Chaleur Atelier<', '>来自 Chaleur Atelier<', '>oleh Chaleur Atelier<'),
    ('the pâtisserie behind beku°', 'beku° 背后的甜点坊', 'pâtisserie di sebalik beku°'),
    ('<p>beku° is the frozen wholesale line of <b>Chaleur Atelier Pâtisserie</b>, a modern French dessert atelier in Larkin, Johor Bahru. We started as a small two-person pastry workshop; today our team makes petit gâteaux, whole cakes and viennoiseries for our own shop and for cafés and restaurants across JB.</p>',
     '<p>beku° 是 <b>Chaleur Atelier Pâtisserie</b> 旗下的冷冻甜点批发品牌。Chaleur Atelier 是位于新山 Larkin 的现代法式甜点工作室，从两个人的小小甜点工作室起步，如今我们的团队为自家门店以及新山各地的咖啡馆和餐厅制作法式小蛋糕、整个蛋糕和维也纳面包。</p>',
     '<p>beku° ialah barisan borong sejuk beku <b>Chaleur Atelier Pâtisserie</b>, atelier pencuci mulut Perancis moden di Larkin, Johor Bahru. Kami bermula sebagai bengkel pastri kecil dua orang; hari ini pasukan kami membuat petit gâteau, kek penuh dan viennoiserie untuk kedai kami sendiri serta kafe dan restoran di seluruh JB.</p>'),
    ('<b>Same skill, different direction.</b> beku° desserts are not our shop cakes frozen. Each one is designed with careful thought for the way a business works: freezable by design, a longer shelf life, easy storage, and easy for your staff to plate and serve. We start from your problem (waste, staff time, an empty counter) and build the dessert around it. And we never stand still: our chefs keep creating new, on-trend desserts and keep growing the range.',
     '<b>同样的手艺，不同的方向。</b>beku° 的甜点不是把门店蛋糕直接冷冻。每一款都根据商家的实际运作用心设计：专为冷冻而设计、保质期更长、容易储存，员工也容易摆盘上桌。我们从您的问题出发（浪费、人手、柜台空空），再围绕它设计甜点。我们也从不停步：甜点师持续推出新颖、紧跟潮流的甜点，不断扩大产品系列。',
     '<b>Kemahiran yang sama, hala tuju yang berbeza.</b> Pencuci mulut beku° bukan kek kedai kami yang dibekukan. Setiap satu direka dengan teliti mengikut cara perniagaan anda berjalan: direka untuk dibekukan, jangka hayat lebih panjang, mudah disimpan, dan mudah untuk staf anda hidang. Kami bermula daripada masalah anda (pembaziran, masa staf, kaunter kosong) dan membina pencuci mulut di sekitarnya. Dan kami tidak pernah berhenti: cef kami terus mencipta pencuci mulut baharu yang mengikut trend dan terus menambah pilihan.'),
    ('<b>Freezable by design</b>recipes built to freeze well', '<b>专为冷冻设计</b>配方适合冷冻', '<b>Direka untuk dibekukan</b>resipi yang tahan dibekukan'),
    ('<b>Longer shelf life</b>easy to store, less waste', '<b>保质期更长</b>容易储存，减少浪费', '<b>Jangka hayat lebih panjang</b>mudah disimpan, kurang pembaziran'),
    ('<b>Easy for your staff</b>no pastry skills needed', '<b>员工轻松上手</b>无需甜点技术', '<b>Mudah untuk staf anda</b>tiada kemahiran pastri diperlukan'),
    ('<b>Always something new</b>new, on-trend desserts, a growing range', '<b>总有新品</b>新颖潮流甜点，系列不断扩大', '<b>Sentiasa ada yang baharu</b>pencuci mulut baharu ikut trend, pilihan makin banyak'),
    ('<b>No pork, lard or alcohol</b>made by our own pastry chefs', '<b>不含猪肉、猪油和酒精</b>由我们自己的甜点师制作', '<b>Tanpa khinzir, lemak khinzir atau alkohol</b>dibuat oleh cef pastri kami sendiri'),
    ('>our vision<', '>我们的愿景<', '>visi kami<'),
    ('To be the dessert partner every café and restaurant in Malaysia can count on.', '成为马来西亚每一家咖啡馆和餐厅都能信赖的甜点伙伴。', 'Menjadi rakan pencuci mulut yang boleh diharap oleh setiap kafe dan restoran di Malaysia.'),
    ('>our mission<', '>我们的使命<', '>misi kami<'),
    ('Solve real problems for F&amp;B businesses with frozen desserts made for shelf life, easy storage and easy serving, with pâtissier-level quality.',
     '以甜点师级别的品质，用专为保质期、方便储存和方便上桌而设计的冷冻甜点，解决餐饮商家的真实问题。',
     'Menyelesaikan masalah sebenar perniagaan F&amp;B dengan pencuci mulut sejuk beku yang direka untuk jangka hayat, mudah disimpan dan mudah dihidang, dengan kualiti tahap pâtissier.'),
    ('Visit our shop: Lobby, Zennith Suites, Jalan Kebun Teh 2, Larkin · open daily 11am–7pm', '欢迎来店：Larkin, Jalan Kebun Teh 2, Zennith Suites 大堂 · 每天 11am–7pm 营业', 'Kunjungi kedai kami: Lobi, Zennith Suites, Jalan Kebun Teh 2, Larkin · dibuka setiap hari 11pg–7ptg'),
    ('>see all our profiles<', '>查看我们的所有平台<', '>lihat semua profil kami<'),
    ('<b>beku° on Instagram</b>', '<b>beku° 的 Instagram</b>', '<b>beku° di Instagram</b>'),
    ('<b>Chaleur Atelier website</b>', '<b>Chaleur Atelier 网站</b>', '<b>Laman web Chaleur Atelier</b>'),
    ('<b>Chaleur Atelier online shop</b>', '<b>Chaleur Atelier 网店</b>', '<b>Kedai dalam talian Chaleur Atelier</b>'),
    ('cakes for home &amp; gifts', '自用和送礼蛋糕', 'kek untuk rumah &amp; hadiah'),
    # about: behind the scenes
    ('>behind the scenes<', '>幕后花絮<', '>di sebalik tabir<'),
    ('from our kitchen to your counter', '从我们的厨房到您的柜台', 'dari dapur kami ke kaunter anda'),
    ('made by hand in our kitchen', '在我们的厨房手工制作', 'dibuat dengan tangan di dapur kami'),
    ('Every piece is piped, glazed and finished by our own pastry chefs in Larkin.', '每一个都由我们在 Larkin 的甜点师亲手挤花、淋面和装饰。', 'Setiap biji dipaip, disalut dan disiapkan oleh cef pastri kami sendiri di Larkin.'),
    ('Piping chantilly, one by one', '一个一个挤上香缇奶油', 'Memaip chantilly, satu demi satu'),
    ('A tray of cake, before cutting', '切块前的一整盘蛋糕', 'Sedulang kek, sebelum dipotong'),
    ('Glazed and finished by hand', '手工淋面和装饰', 'Disalut dan disiapkan dengan tangan'),
    ('made in batches, made the same', '批量制作，品质如一', 'dibuat secara berkelompok, tetap sama'),
    ('Big batches, the same care: every carton looks like the last one.', '大批量，同样用心：每一箱都和上一箱一样。', 'Kelompok besar, penjagaan yang sama: setiap karton sama seperti yang sebelumnya.'),
    ('Gingerbread Man, a full tray', '满满一盘 Gingerbread Man', 'Gingerbread Man, sedulang penuh'),
    ('Ready for the freezer', '准备入冷冻库', 'Sedia untuk peti sejuk beku'),
    ('Checked before packing', '包装前逐一检查', 'Diperiksa sebelum dibungkus'),
    ('packed for your freezer', '为您的冷冻库包装', 'dibungkus untuk peti sejuk beku anda'),
    ('Each piece sits in its own place in the carton, so it arrives whole.', '每一个在箱子里都有自己的位置，送到时完整无缺。', 'Setiap biji ada tempatnya sendiri dalam karton, jadi ia sampai dalam keadaan sempurna.'),
    ('12 pieces per carton', '每箱 12 个', '12 biji setiap karton'),
    ('What our customers see when they open it', '顾客打开箱子时看到的样子', 'Apa yang pelanggan kami lihat apabila membukanya'),
    ('Straight from the carton to the counter', '从箱子直接上柜台', 'Terus dari karton ke kaunter'),
    ('cut into it', '切开看看', 'potong dan lihat'),
    ('Layers you can see: mousse, insert, sponge and crunch.', '看得见的层次：慕斯、内馅、蛋糕体和脆底。', 'Lapisan yang boleh dilihat: mousse, inti, span dan rangup.'),
    ('Raspberry, cut open', '切开的覆盆子蛋糕', 'Raspberi, dipotong'),
    ('Chocolate layers', '巧克力层次', 'Lapisan coklat'),
    ('A fruit insert inside', '里面的水果内馅', 'Inti buah di dalam'),
    # sample box CTA
    ('>your counter next?<', '>下一个就是您的柜台？<', '>kaunter anda seterusnya?<'),
    ('start with a sample box · RM50', '先试样品盒 · RM50', 'mula dengan kotak sampel · RM50'),
    ('Any 4 pieces, free delivery in JB. The RM50 comes off your first order above RM350 within 1 month.', '任选 4 个，新山免运费。1 个月内首单满 RM350，可抵扣 RM50。', 'Mana-mana 4 biji, penghantaran percuma di JB. RM50 ditolak daripada pesanan pertama anda melebihi RM350 dalam masa 1 bulan.'),
    ('>Order a sample box<', '>订购样品盒<', '>Pesan kotak sampel<'),
    ('>See all desserts<', '>查看全部甜点<', '>Lihat semua pencuci mulut<'),
    ('beku° is a brand of Chaleur Atelier F&amp;B Sdn. Bhd. · Larkin, Johor Bahru', 'beku° 是 Chaleur Atelier F&amp;B Sdn. Bhd. 旗下品牌 · 新山 Larkin', 'beku° ialah jenama Chaleur Atelier F&amp;B Sdn. Bhd. · Larkin, Johor Bahru'),
    # clients page
    ('>our clients &amp; our work<', '>我们的客户<', '>pelanggan kami<'),
    ('the pastry team behind their dessert counters.', '他们甜点柜台背后的甜点团队。', 'pasukan pastri di sebalik kaunter pencuci mulut mereka.'),
    ('Cafés, restaurants, hotels and brands in Johor Bahru and Singapore have served desserts from our pastry team. beku° brings the same petit gâteaux to your freezer, made in Larkin and delivered frozen.',
     '新山和新加坡的咖啡馆、餐厅、酒店和品牌都曾供应我们甜点团队的作品。beku° 把同样的法式小蛋糕带进您的冷冻库：在 Larkin 制作，冷冻配送。',
     'Kafe, restoran, hotel dan jenama di Johor Bahru dan Singapura pernah menghidangkan pencuci mulut daripada pasukan pastri kami. beku° membawa petit gâteau yang sama ke peti sejuk beku anda, dibuat di Larkin dan dihantar sejuk beku.'),
    ('Pork, lard &amp; alcohol free', '不含猪肉、猪油和酒精', 'Tanpa khinzir, lemak khinzir &amp; alkohol'),
    ('>No additives<', '>无添加剂<', '>Tiada bahan tambahan<'),
    ('>Made by pastry chefs<', '>甜点师制作<', '>Dibuat oleh cef pastri<'),
    ('>trusted by<', '>信赖我们的<', '>dipercayai oleh<'),
    ('<h2>our clients</h2>', '<h2>我们的客户</h2>', '<h2>pelanggan kami</h2>'),
    ('Cafés, restaurants, hotels and brands our pastry team has made desserts for.', '我们的甜点团队曾为这些咖啡馆、餐厅、酒店和品牌制作甜点。', 'Kafe, restoran, hotel dan jenama yang pernah kami buatkan pencuci mulut.'),
    ('aria-label="Our clients"', 'aria-label="我们的客户"', 'aria-label="Pelanggan kami"'),
    ('>at their counters<', '>在他们的柜台<', '>di kaunter mereka<'),
    ('our desserts, served by our clients', '客户柜台上的我们的甜点', 'pencuci mulut kami, dihidang oleh pelanggan kami'),
    ('>post it, tag us<', '>发帖，标记我们<', '>kongsi, tag kami<'),
    ('your café, on our Instagram', '让您的咖啡馆登上我们的 Instagram', 'kafe anda, di Instagram kami'),
    ("Serving beku° desserts? Post them and tag <b>@beku_frozendessert</b> with <b>#bekuatmycafe</b>. We share our customers' posts on beku°, and the best ones on Chaleur Atelier's Instagram too: more eyes on your café, and more trust for both of us.",
     '正在售卖 beku° 甜点？发帖时标记 <b>@beku_frozendessert</b> 并加上 <b>#bekuatmycafe</b>。我们会在 beku° 分享客户的帖子，精选的也会分享到 Chaleur Atelier 的 Instagram：让更多人看到您的咖啡馆，也让彼此更有信任。',
     'Menjual pencuci mulut beku°? Kongsi dan tag <b>@beku_frozendessert</b> dengan <b>#bekuatmycafe</b>. Kami kongsi hantaran pelanggan di beku°, dan yang terbaik di Instagram Chaleur Atelier juga: lebih ramai melihat kafe anda, dan lebih kepercayaan untuk kita berdua.'),
    ('How it works &amp; free marketing material', '了解详情和免费宣传素材', 'Cara ia berfungsi &amp; bahan pemasaran percuma'),
    ('>WhatsApp us<', '>WhatsApp 我们<', '>WhatsApp kami<'),
    ('>beku° Instagram<', '>beku° 的 Instagram<', '>Instagram beku°<'),
    ('aria-label="Close"', 'aria-label="关闭"', 'aria-label="Tutup"'),
    ('aria-label="Previous"', 'aria-label="上一张"', 'aria-label="Sebelum"'),
    ('aria-label="Next"', 'aria-label="下一张"', 'aria-label="Seterusnya"'),
    # partners page
    ('>for our partners<', '>给我们的合作伙伴<', '>untuk rakan niaga kami<'),
    ('everything you need to sell beku° desserts.', '售卖 beku° 甜点所需的一切。', 'semua yang anda perlukan untuk menjual pencuci mulut beku°.'),
    ("Free photos, ready captions and a badge for your menu. Use them on your counter, menu, Instagram, Grab or WhatsApp. Tag us and we'll share you too.",
     '免费照片、现成文案和菜单标志。可用在柜台、菜单、Instagram、Grab 或 WhatsApp。标记我们，我们也会分享您。',
     'Gambar percuma, kapsyen sedia ada dan lencana untuk menu anda. Gunakan di kaunter, menu, Instagram, Grab atau WhatsApp. Tag kami dan kami akan kongsi anda juga.'),
    ('>step 1<', '>第 1 步<', '>langkah 1<'),
    ('photos to download', '下载照片', 'gambar untuk dimuat turun'),
    ('Our dessert pictures, free for any beku° customer to use. Tap <b>Download</b> under a picture.', '我们的甜点图片，beku° 的所有客户都可免费使用。点击图片下方的<b>下载</b>。', 'Gambar pencuci mulut kami, percuma untuk semua pelanggan beku°. Tekan <b>Muat turun</b> di bawah gambar.'),
    ('download>Download</a>', 'download>下载</a>', 'download>Muat turun</a>'),
    ('>The full line-up<', '>全系列<', '>Barisan penuh<'),
    ('>step 2<', '>第 2 步<', '>langkah 2<'),
    ('ready captions', '现成文案', 'kapsyen sedia ada'),
    ('Copy, paste, post. Change the words to fit your café.', '复制、粘贴、发布。可按您的咖啡馆修改文字。', 'Salin, tampal, kongsi. Ubah ayat ikut kafe anda.'),
    ('class="cp">Copy</button>', 'class="cp">复制</button>', 'class="cp">Salin</button>'),
    ("b.textContent='Copied ✓'", "b.textContent='已复制 ✓'", "b.textContent='Disalin ✓'"),
    ("b.textContent='Copy'", "b.textContent='复制'", "b.textContent='Salin'"),
    ('>step 3<', '>第 3 步<', '>langkah 3<'),
    ('a badge for your menu', '菜单标志', 'lencana untuk menu anda'),
    ('Put it on your menu, counter card or post, next to our desserts.', '放在菜单、柜台卡或帖子里，放在我们的甜点旁边。', 'Letakkan di menu, kad kaunter atau hantaran anda, di sebelah pencuci mulut kami.'),
    ('>Download PNG<', '>下载 PNG<', '>Muat turun PNG<'),
    ('>Download SVG<', '>下载 SVG<', '>Muat turun SVG<'),
    ('>step 4 · get featured<', '>第 4 步 · 获得曝光<', '>langkah 4 · dapatkan tumpuan<'),
    ('tag us, we share you', '标记我们，我们分享您', 'tag kami, kami kongsi anda'),
    ('<li><b>Post</b> our desserts at your café: a photo, a Reel or a Story.</li>', '<li><b>发帖</b>分享您咖啡馆里的我们的甜点：照片、Reel 或限时动态都可以。</li>', '<li><b>Kongsi</b> pencuci mulut kami di kafe anda: gambar, Reel atau Story.</li>'),
    ('<li><b>Tag</b> <b>@beku_frozendessert</b> and add <b>#bekuatmycafe</b>.</li>', '<li><b>标记</b> <b>@beku_frozendessert</b> 并加上 <b>#bekuatmycafe</b>。</li>', '<li><b>Tag</b> <b>@beku_frozendessert</b> dan tambah <b>#bekuatmycafe</b>.</li>'),
    ("<li><b>We share it</b> on beku°'s Instagram, and the best posts on Chaleur Atelier's Instagram (@chaleuratelier_my) too.</li>", '<li><b>我们分享</b>到 beku° 的 Instagram，精选帖子也会分享到 Chaleur Atelier 的 Instagram（@chaleuratelier_my）。</li>', '<li><b>Kami kongsi</b> di Instagram beku°, dan hantaran terbaik di Instagram Chaleur Atelier (@chaleuratelier_my) juga.</li>'),
    ('<li><b>You get seen</b> by our followers, and your café is featured on our <a href="/clients/">clients page</a>.</li>', '<li><b>让我们的粉丝看到您</b>，您的咖啡馆也会出现在我们的<a href="/clients/">客户页面</a>。</li>', '<li><b>Anda dilihat</b> oleh pengikut kami, dan kafe anda dipaparkan di <a href="/clients/">halaman pelanggan</a> kami.</li>'),
    ('Open to every beku° customer. Nothing to sign up for, just tag us.', '所有 beku° 客户都可参加。无需报名，只要标记我们。', 'Terbuka untuk semua pelanggan beku°. Tiada pendaftaran, cuma tag kami.'),
    ('Follow @beku_frozendessert', '关注 @beku_frozendessert', 'Ikuti @beku_frozendessert'),
    ('Follow @chaleuratelier_my', '关注 @chaleuratelier_my', 'Ikuti @chaleuratelier_my'),
]

PAGES = ['desserts', 'how', 'faq', 'about', 'clients', 'partners']


def localize(h, lang, path):
    """h = English page html, path like '/about/'."""
    i = 1 if lang == 'zh' else 2
    for row in sorted(T, key=lambda r: -len(r[0])):
        h = h.replace(row[0], row[i])
    pre = LANGS[lang]['pre']
    h = re.sub(r'href="/(%s)/(#[^"]*)?"' % '|'.join(PAGES), lambda m: 'href="%s/%s/%s"' % (pre, m.group(1), m.group(2) or ''), h)
    h = h.replace('href="/"', 'href="%s/"' % pre)
    h = re.sub(r'href="/order/\?([^"]*)"', lambda m: 'href="/order/?%s&lang=%s"' % (m.group(1), lang), h)
    h = h.replace('href="/order/"', 'href="/order/?lang=%s"' % lang)
    h = h.replace('href="/track/"', 'href="/track/?lang=%s"' % lang)
    h = h.replace('<html lang="en">', '<html lang="%s">' % LANGS[lang]['hl'], 1)
    h = h.replace('<link rel="canonical" href="https://bekufrozen.com%s">' % path, '<link rel="canonical" href="https://bekufrozen.com%s%s">' % (pre, path), 1)
    return h


def lang_bits(h, path, lang):
    """Add hreflang alternates, the language switch and the one-tap language memory (all languages)."""
    alts = ''.join('<link rel="alternate" hreflang="%s" href="https://bekufrozen.com%s%s">' % (hl, pre, path) for hl, pre in [('en', ''), ('zh-Hans', '/zh'), ('ms', '/ms')])
    alts += '<link rel="alternate" hreflang="x-default" href="https://bekufrozen.com%s">' % path
    h = h.replace('</head>', alts + '<script src="/lang.js"></script></head>', 1)
    sw = '<span class="lsw" role="group" aria-label="Language">' + ''.join(
        '<a href="%s%s" data-lang="%s" lang="%s"%s>%s</a>' % (pre, path, code, hl, ' class="on" aria-current="page"' if code == lang else '', lab)
        for code, pre, hl, lab in [('en', '', 'en', 'EN'), ('zh', '/zh', 'zh-Hans', '中文'), ('ms', '/ms', 'ms', 'BM')]) + '</span>'
    h = h.replace('<header class="top"><a href="', '<header class="top">' + '<a href="', 1)
    h = re.sub(r'(<header class="top">.*?<nav>)', lambda m: m.group(1) + sw, h, count=1, flags=re.S)
    return h
