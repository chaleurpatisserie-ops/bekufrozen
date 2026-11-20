/* beku° floating WhatsApp button – general enquiries (Alfred 18 Nov 20:03) */
(function(){
  var N='60143490928';
  var T={en:['Ask us on WhatsApp','Hi BEKU, I have a question.'],zh:['WhatsApp 询问','你好 BEKU，我想询问一下。'],ms:['Tanya kami di WhatsApp','Hi BEKU, saya ada pertanyaan.']};
  function lg(){var l=(document.documentElement.lang||'en').slice(0,2);return T[l]?l:'en'}
  var s=document.createElement('style');
  s.textContent='.wafab{position:fixed;right:max(16px,env(safe-area-inset-right));bottom:max(16px,env(safe-area-inset-bottom));z-index:50;display:flex;align-items:center;gap:10px;text-decoration:none;font:700 15px "DM Sans",sans-serif}'+
  '.wafab i{width:58px;height:58px;border-radius:50%;background:#1f8f4e;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 18px rgba(23,85,140,.28);transition:transform .2s}'+
  '.wafab:hover i{transform:translateY(-3px) rotate(-6deg)}.wafab i svg{width:30px;height:30px;fill:#fff}'+
  '.wafab span{background:#fffdfa;color:#17558c;border:2px solid #cbe9f8;border-radius:999px;padding:8px 14px;box-shadow:0 4px 12px rgba(23,85,140,.15)}'+
  '@media(max-width:700px){.wafab span{display:none}}@media print{.wafab{display:none}}';
  document.head.appendChild(s);
  var a=document.createElement('a');a.className='wafab';a.target='_blank';a.rel='noopener';
  a.innerHTML='<span></span><i><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg></i>';
  function set(){var t=T[lg()];a.href='https://wa.me/'+N+'?text='+encodeURIComponent(t[1]);a.querySelector('span').textContent=t[0];a.setAttribute('aria-label',t[0])}
  set();document.body.appendChild(a);
  new MutationObserver(set).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
})();

/* beku° visit + action counter (Alfred 19 Nov 00:59: see who visits, what they tap, where from, rough location). No names, no IP, no cookies sent to others:
   a random visitor id stays in this browser only; the server keeps page, action, source, language, device, time zone. */
(function(){
  var API='https://script.google.com/macros/s/AKfycbyP-I4ZnGnmXWoq_G9zt2LxT1ODJofcG3PzC0UBKKM-jhrZzDNo8NB-9WgekMwWY7asoA/exec';
  if(navigator.webdriver||/bot|crawl|spider|slurp|lighthouse|headless|preview/i.test(navigator.userAgent))return;
  function st(k,v,l){try{var S=l?localStorage:sessionStorage;if(v!==undefined)S.setItem(k,v);return S.getItem(k)}catch(e){return ''}}
  function rid(){return Math.random().toString(36).slice(2,10)}
  var vid=st('bk_v',undefined,1)||st('bk_v',rid(),1), sid=st('bk_s')||st('bk_s',rid());
  var q=new URLSearchParams(location.search), src=st('bk_src');
  if(!src){var r='';try{r=document.referrer?new URL(document.referrer).hostname.replace(/^www\./,''):''}catch(e){}
    if(r===location.hostname)r='';
    src=q.get('utm_source')?(q.get('utm_source')+(q.get('utm_medium')?' / '+q.get('utm_medium'):'')+(q.get('utm_campaign')?' / '+q.get('utm_campaign'):'')):q.get('fbclid')?'Facebook / Instagram ad':q.get('gclid')?'Google ad':r||'direct';
    st('bk_src',src)}
  var dev=/iPad|Tablet/i.test(navigator.userAgent)?'tablet':/Mobi|Android|iPhone/i.test(navigator.userAgent)?'phone':'computer', tz='';
  try{tz=Intl.DateTimeFormat().resolvedOptions().timeZone||''}catch(e){}
  var first=!st('bk_seen',undefined,1); st('bk_seen','1',1);
  function send(ev,name){try{var u=API+'?type=web_hit&v='+vid+'&s='+sid+'&e='+encodeURIComponent(ev)+'&n='+encodeURIComponent(String(name||'').slice(0,120))+'&p='+encodeURIComponent(location.pathname+(location.search.replace(/([?&])(fbclid|gclid)=[^&]*/g,'$1').slice(0,60)))
    +'&r='+encodeURIComponent(src)+'&l='+encodeURIComponent((document.documentElement.lang||'').slice(0,5))+'&d='+dev+'&z='+encodeURIComponent(tz)+'&f='+(first?1:0);
    fetch(u,{mode:'no-cors',keepalive:true}).catch(function(){})}catch(e){}}
  window.bkT=send;
  send('view',document.title);
  var t0=Date.now(), maxS=Math.min(100,Math.round(100*innerHeight/Math.max(document.documentElement.scrollHeight,1))), left=false;
  addEventListener('scroll',function(){var h=document.documentElement;var pc=Math.round(100*(scrollY+innerHeight)/Math.max(h.scrollHeight,1));if(pc>maxS)maxS=Math.min(pc,100)},{passive:true});
  function leave(){if(left)return;left=true;send('leave',Math.round((Date.now()-t0)/1000)+'s · scrolled '+maxS+'% · screen '+screen.width+'x'+screen.height)}
  addEventListener('pagehide',leave);document.addEventListener('visibilitychange',function(){if(document.visibilityState==='hidden')leave()});
  if(q.get('paid'))send('order','Paid by card '+q.get('paid'));
  document.addEventListener('click',function(e){var a=e.target.closest('a,button,summary,[data-go],[data-lang]');if(!a)return;
    var h=a.getAttribute('href')||'', t=(a.innerText||a.getAttribute('aria-label')||'').replace(/\s+/g,' ').trim().slice(0,60), n;
    if(a.dataset.lang)n='Language '+a.dataset.lang;
    else if(/wa\.me/.test(h)){var m='';try{m=decodeURIComponent((h.split('text=')[1]||'')).slice(0,60)}catch(x){}n='WhatsApp: '+(t||'button')+(m?' ['+m+']':'')}
    else if(a.tagName==='SUMMARY')n='FAQ: '+t;
    else n=(h&&h.charAt(0)!=='#'?'Link: ':'Tap: ')+(t||h)+(h&&h.charAt(0)!=='#'?' → '+h.slice(0,40):'');
    send('click',n)},true);
})();
/* Welcome pop-up (name + WhatsApp, asked once), live pings and cart reporting.
   Alfred 21 Nov 2026 00:09–00:15: "ask them to fill in their name and number … when they first enter, then stop asking";
   "the number should be saved and I will contact them"; admin shows live visitors, carts and pending orders. */
(function(){
  var API2='https://script.google.com/macros/s/AKfycbxNYrq26BteZEz2XrrEHXEv7pvqnn5VDsoULjC1g2Q3JkpZSQNxg8CgQThCnFvCxtfJ6A/exec';
  if(navigator.webdriver||/bot|crawl|spider|slurp|lighthouse|headless|preview/i.test(navigator.userAgent))return;
  function ls(k,v){try{if(v!==undefined)localStorage.setItem(k,v);return localStorage.getItem(k)}catch(e){return null}}
  function ss(k){try{return sessionStorage.getItem(k)}catch(e){return null}}
  var dev=/iPad|Tablet/i.test(navigator.userAgent)?'tablet':/Mobi|Android|iPhone/i.test(navigator.userAgent)?'phone':'computer',tz='';
  try{tz=Intl.DateTimeFormat().resolvedOptions().timeZone||''}catch(e){}
  function lg(){var l=(document.documentElement.lang||'en').slice(0,2);return /^(zh|ms)$/.test(l)?l:'en'}
  function me(){var d={};try{d=JSON.parse(ls('beku_details')||'{}')}catch(e){}return d}
  function post(o){try{o.v=ls('bk_v')||'';o.s=ss('bk_s')||'';o.p=location.pathname+location.search.replace(/([?&])(fbclid|gclid)=[^&]*/g,'$1').slice(0,60);
    o.r=ss('bk_src')||'';o.l=lg();o.d=dev;o.z=tz;
    fetch(API2,{method:'POST',mode:'no-cors',keepalive:true,headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(o)}).catch(function(){})}catch(e){}}
  // live: a small ping every 30 s while the page is open and visible
  function ping(){if(document.visibilityState==='visible')post({type:'web_ping',n:document.title.slice(0,80)})}
  setTimeout(ping,4000);setInterval(ping,30000);
  // cart reporting for the order page (called by /order/)
  var lastCart='';
  window.bkCart=function(c){var d=me();c.type='web_cart';c.name=c.name||d.contact||'';c.phone=c.phone||d.phone||'';
    var sig=JSON.stringify([c.items,c.q,c.val,c.st,c.o,c.name,c.phone]);if(sig===lastCart)return;lastCart=sig;post(c)};
  // speed + errors (Alfred 21 Nov 00:35 "add all"): page load time once per page, and the first few script errors
  var LCP=0;try{new PerformanceObserver(function(l){var e=l.getEntries();if(e.length)LCP=e[e.length-1].startTime}).observe({type:'largest-contentful-paint',buffered:true})}catch(x){}
  var nErr=0;function perr(m){if(++nErr>3)return;post({type:'web_perf',k:'error',m:String(m||'').slice(0,200)})}
  addEventListener('error',function(e){if(e&&e.message)perr(e.message+' @ '+String(e.filename||'').split('/').pop()+':'+(e.lineno||''))});
  addEventListener('unhandledrejection',function(e){perr('promise: '+((e&&e.reason&&(e.reason.message||e.reason))||''))});
  addEventListener('load',function(){setTimeout(function(){try{var n=performance.getEntriesByType('navigation')[0];if(!n)return;
    var lcp=Math.round(LCP);
    post({type:'web_perf',k:'load',ms:Math.round(n.loadEventEnd||n.duration),ttfb:Math.round(n.responseStart),dom:Math.round(n.domContentLoadedEventEnd),lcp:lcp,net:(navigator.connection&&navigator.connection.effectiveType)||''})}catch(x){}},1500)});
  // welcome pop-up: once per visitor (answered or skipped)
  if(ls('bk_asked')||me().phone||/privacy|\/admin\//.test(location.pathname))return;
  var T={en:['welcome to beku° 👋','Leave your name and WhatsApp number and our team will send you prices, samples and our Christmas specials.','Your name','WhatsApp number','Business / shop name (optional)','Continue','Skip for now','We only use your number to contact you about beku° orders.','Privacy policy','Please fill in your name and a WhatsApp number.','Thank you! We will WhatsApp you soon 🧊'],
    zh:['欢迎来到 beku° 👋','留下您的名字和 WhatsApp 号码，我们的团队会发给您价格、样品和圣诞特别款。','您的名字','WhatsApp 号码','公司 / 店名（选填）','继续','稍后再说','您的号码只用于联系您有关 beku° 的订单。','隐私政策','请填写名字和 WhatsApp 号码。','谢谢！我们会尽快通过 WhatsApp 联系您 🧊'],
    ms:['selamat datang ke beku° 👋','Tinggalkan nama dan nombor WhatsApp anda, pasukan kami akan hantar harga, sampel dan menu Krismas kami.','Nama anda','Nombor WhatsApp','Nama perniagaan / kedai (pilihan)','Teruskan','Langkau dulu','Nombor anda hanya digunakan untuk menghubungi anda tentang order beku°.','Dasar privasi','Sila isi nama dan nombor WhatsApp.','Terima kasih! Kami akan WhatsApp anda tidak lama lagi 🧊']};
  function show(){
    if(ls('bk_asked')||document.getElementById('bkw'))return;var t=T[lg()];
    var st=document.createElement('style');st.textContent='#bkw{position:fixed;inset:0;z-index:2147483000;background:rgba(15,45,75,.55);display:flex;align-items:center;justify-content:center;padding:18px;font-family:"DM Sans",system-ui,sans-serif}'
      +'#bkw .bx{background:#fffdfa;border-radius:26px;max-width:400px;width:100%;padding:26px 22px 18px;box-shadow:0 18px 50px rgba(10,35,60,.35);position:relative;text-align:center;animation:bkin .25s ease-out}'
      +'@keyframes bkin{from{transform:translateY(16px);opacity:0}to{transform:none;opacity:1}}'
      +'#bkw img{width:74px;height:74px;border-radius:50%;box-shadow:0 0 0 4px #cbe9f8}#bkw h2{font:700 24px/1.15 Fredoka,sans-serif;color:#17558c;margin:12px 0 6px}#bkw p{margin:0 0 14px;color:#3c4d5e;font-size:15px;line-height:1.45}'
      +'#bkw input{display:block;width:100%;box-sizing:border-box;margin:0 0 10px;padding:13px 14px;border:2px solid #cbe9f8;border-radius:14px;font:16px "DM Sans",sans-serif;color:#1d2b3a;background:#fff;outline:none}#bkw input:focus{border-color:#17558c}'
      +'#bkw .go{width:100%;border:0;border-radius:999px;background:#17558c;color:#fff;font:600 17px Fredoka,sans-serif;padding:13px;cursor:pointer;margin-top:2px}'
      +'#bkw .sk{background:none;border:0;color:#5f6f80;font:500 14px "DM Sans",sans-serif;margin-top:8px;cursor:pointer;text-decoration:underline}'
      +'#bkw .nt{font-size:12px;color:#5f6f80;margin:10px 0 0}#bkw .nt a{color:#17558c}#bkw .er{color:#c0392b;font-size:14px;min-height:1.2em;margin:0 0 6px}';
    document.head.appendChild(st);
    var w=document.createElement('div');w.id='bkw';w.setAttribute('role','dialog');w.setAttribute('aria-modal','true');w.setAttribute('aria-label',t[0]);
    w.innerHTML='<form class="bx" novalidate><img src="/img/beku-logo-256.webp" alt=""><h2>'+t[0]+'</h2><p>'+t[1]+'</p>'
      +'<input name="n" autocomplete="name" placeholder="'+t[2]+'" required><input name="p" type="tel" inputmode="tel" autocomplete="tel" placeholder="'+t[3]+' · 012 345 6789" required>'
      +'<input name="b" autocomplete="organization" placeholder="'+t[4]+'"><div class="er"></div><button class="go" type="submit">'+t[5]+'</button>'
      +'<button class="sk" type="button">'+t[6]+'</button><p class="nt">'+t[7]+' <a href="/privacy.html">'+t[8]+'</a></p></form>';
    document.body.appendChild(w);ls('bk_asked','shown');try{window.bkT&&bkT('click','Welcome pop-up shown')}catch(e){}
    var f=w.querySelector('form');
    w.querySelector('.sk').onclick=function(){ls('bk_asked','skipped');w.remove();try{window.bkT&&bkT('click','Welcome pop-up skipped')}catch(e){}};
    f.onsubmit=function(e){e.preventDefault();var n=f.n.value.trim(),p=f.p.value.replace(/[^\d+]/g,''),b=f.b.value.trim();
      if(!n||p.replace(/\D/g,'').length<9){w.querySelector('.er').textContent=t[9];return}
      var d=me();d.contact=d.contact||n;d.phone=d.phone||f.p.value.trim();if(b&&!d.company)d.company=b;ls('beku_details',JSON.stringify(d));ls('bk_asked','answered');
      post({type:'web_lead',name:n,phone:p,biz:b});try{window.bkT&&bkT('click','Welcome pop-up answered')}catch(e){}
      f.innerHTML='<img src="/img/beku-logo-256.webp" alt=""><h2>'+t[10]+'</h2>';setTimeout(function(){w.remove()},1600)};
    setTimeout(function(){try{f.n.focus({preventScroll:true})}catch(e){}},50);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(show,1500)});else setTimeout(show,1500);
})();
