/* beku° one-tap language (Alfred 21 Nov 14:35): the language a visitor picks once is remembered
   (same key as the order/track pages, "beku_lang") and every page then opens in that language. */
(function () {
  var K = 'beku_lang';
  function get() { try { return localStorage.getItem(K); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(K, v); } catch (e) {} }
  function code(s) { s = (s || '').toLowerCase(); return s.indexOf('zh') === 0 ? 'zh' : (s.indexOf('ms') === 0 ? 'ms' : 'en'); }
  var cur = code(document.documentElement.lang);
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[data-lang], a.lg[lang]');
    if (a) set(a.getAttribute('data-lang') || code(a.getAttribute('lang')));
  }, true);
  var want = get();
  if (!want || want === cur) return;
  var sel = want === 'zh' ? 'zh' : want;
  var alts = document.querySelectorAll('link[rel="alternate"][hreflang]');
  for (var i = 0; i < alts.length; i++) {
    var h = alts[i].getAttribute('hreflang');
    if (h !== 'x-default' && code(h) === sel) { var u = new URL(alts[i].href, location.href); location.replace(u.pathname + location.search + location.hash); return; }
  }
})();
