(function(){var d=document.getElementById('pd'),P=window.BEKU||{};
function $(i){return document.getElementById(i)}
document.querySelectorAll('.scoop').forEach(function(b){b.addEventListener('click',function(){var p=P[b.dataset.id];if(!p)return;
$('pdi').src=p.i;$('pdi').alt=p.n;d.querySelector('.ph').style.background=p.bg;$('pdn').textContent=p.n;$('pdn').style.color=p.ink;$('pds').textContent=p.s;$('pdl').textContent=p.l;$('pdf').textContent=p.f;var t=$('pdt');t.textContent=p.t||'';t.style.background=p.ink;$('pdw').href=p.w;
if(d.showModal)d.showModal();else d.setAttribute('open','')})});
d.querySelector('.x').addEventListener('click',function(){d.close()});d.addEventListener('click',function(e){if(e.target===d)d.close()});})();
