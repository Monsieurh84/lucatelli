/* LUCATELLI — socle commun : catalogue, panier, en-tête, animations */
const PRODUCTS = {
  'sole-dolce': {
    slug: 'sole-dolce', name: 'Sole Dolce', kind: 'Extrait de parfum', size: '50 ml · 1,7 fl.oz.', price: 185, status: 'ok',
    img: 'img/sole-dolce.webp', gallery: ['img/sole-dolce.webp', 'img/duo.webp', 'img/ecrin.webp', 'img/ecrin-marbre.webp'],
    tagline: 'Il sole, in una goccia.',
    desc: "Un éclat de lumière méditerranéenne capturé dans le verre rubis. Sole Dolce s'ouvre sur la fraîcheur des agrumes, glisse vers un cœur floral lumineux et se pose sur un fond chaud, enveloppant et légèrement vanillé.",
    notes: { 'Tête': ['Bergamote', 'Citron de Sicile'], 'Cœur': ['Fleur d\'oranger', 'Rose', 'Lavande'], 'Fond': ['Fève tonka', 'Ambre', 'Musc blanc'] },
    inci: 'Alcohol denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol.'
  },
  'acanto': {
    slug: 'acanto', name: 'Acanto', kind: 'Édition sculptée', size: 'Flacon gravé', price: null, status: 'soon',
    img: 'img/acanto.webp', gallery: ['img/acanto.webp', 'img/duo.webp'],
    tagline: 'La feuille d\'acanthe, sculptée dans le verre.',
    desc: "Le second chapitre de la Maison. Un flacon architectural orné d'une feuille d'acanthe sculptée, hommage aux chapiteaux et aux palais italiens.",
    notes: null, inci: ''
  }
};
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const eur = v => v.toLocaleString('fr-FR', { minimumFractionDigits: 0 }) + ' €';
const FREE = 150;

/* ---------- panier (persistant) ---------- */
const CK = 'lucatelli_cart';
let cart = []; try { cart = JSON.parse(localStorage.getItem(CK) || '[]') } catch (e) {}
const save = () => { try { localStorage.setItem(CK, JSON.stringify(cart)) } catch (e) {} };
function addToCart(slug, qty = 1, opts = {}) {
  const p = PRODUCTS[slug]; if (!p || p.status !== 'ok') return;
  const k = slug + (opts.engrave ? '|' + opts.engrave : '');
  const f = cart.find(c => c.k === k);
  f ? f.q += qty : cart.push({ k, slug, q: qty, engrave: opts.engrave || '' });
  save(); renderCart(); openCart();
}
function chg(k, d) { const f = cart.find(c => c.k === k); if (!f) return; f.q += d; if (f.q < 1) cart = cart.filter(c => c.k !== k); save(); renderCart() }
function renderCart() {
  const n = cart.reduce((s, c) => s + c.q, 0), tot = cart.reduce((s, c) => s + PRODUCTS[c.slug].price * c.q, 0);
  $$('.js-count').forEach(e => { e.hidden = !n; e.textContent = n });
  const it = $('#items'); if (!it) return;
  it.innerHTML = cart.length ? cart.map(c => { const p = PRODUCTS[c.slug]; return `<div class="ci"><img src="${p.img.replace('.webp', '-800.webp')}" alt="${p.name}"><div><div class="n">${p.name}</div><small>${p.kind} · ${p.size}</small>${c.engrave ? `<small>Gravure : « ${c.engrave.replace(/</g, '&lt;')} »</small>` : ''}<div class="qty"><button aria-label="Retirer un" onclick="chg('${c.k}',-1)">−</button><span>${c.q}</span><button aria-label="Ajouter un" onclick="chg('${c.k}',1)">+</button></div></div><div>${eur(p.price * c.q)}</div></div>` }).join('')
    : `<div class="empty"><span class="serif">Votre écrin est vide.</span><p>Laissez-vous guider par Sole Dolce.</p></div>`;
  $('#total').textContent = eur(tot);
  const left = Math.max(0, FREE - tot);
  $('#shipTxt').innerHTML = tot === 0 ? 'Livraison offerte dès ' + eur(FREE) : left > 0 ? `Plus que <b>${eur(left)}</b> pour la livraison offerte` : '<b>Livraison offerte</b> · échantillon offert';
  $('#shipBar').style.width = Math.min(100, tot / FREE * 100) + '%';
}
function openCart() { $('#drawer').classList.add('on'); $('#veil').classList.add('on') }
function openNav() { $('#mnav').classList.add('on') }
function closeAll() { ['#drawer', '#veil', '#mnav', '#zoom'].forEach(s => { const e = $(s); e && e.classList.remove('on') }) }
let _t; function toast(m) { const t = $('#toast'); t.textContent = m; t.classList.add('on'); clearTimeout(_t); _t = setTimeout(() => t.classList.remove('on'), 2600) }

/* ---------- gabarit partagé ---------- */
const MONO = '<svg class="mono" viewBox="50 40 240 580" aria-hidden="true"><path d="M72 58V535H205M166 122V605M137 64H260V540"/></svg>';
function shell() {
  $('#hdr').innerHTML = `<div class="wrap hd">
    <nav aria-label="Navigation principale"><a href="index.html#parfum">Le parfum</a><a href="index.html#flacon">Le flacon</a><a href="index.html#maison">La Maison</a></nav>
    <button class="ib burger" aria-label="Menu" onclick="openNav()"><svg viewBox="0 0 24 24"><path d="M3 8h18M3 16h12"/></svg></button>
    <a href="index.html" class="brand" aria-label="Lucatelli — accueil">${MONO}<span class="word">LUCΛTELLI</span></a>
    <div class="ic"><button class="ib" aria-label="Rechercher"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4-4"/></svg></button><button class="ib" aria-label="Panier" onclick="openCart()"><svg viewBox="0 0 24 24"><path d="M5 8h14l-1 13H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg><span class="cnt js-count" hidden>0</span></button></div></div>`;
  document.body.insertAdjacentHTML('beforeend', `
  <div class="veil" id="veil" onclick="closeAll()"></div>
  <nav class="mnav" id="mnav" aria-label="Menu mobile"><button class="ib x" onclick="closeAll()" aria-label="Fermer" style="color:var(--oro-l)">✕</button>
    <a href="index.html#parfum" onclick="closeAll()">Sole Dolce</a><a href="index.html#flacon" onclick="closeAll()">Le flacon</a><a href="index.html#notes" onclick="closeAll()">Les notes</a><a href="index.html#ecrin" onclick="closeAll()">L'écrin</a><a href="index.html#maison" onclick="closeAll()">La Maison</a><a href="product.html?p=sole-dolce" onclick="closeAll()">Commander</a>
    <div class="mf">Lucatelli · Extrait de parfum</div></nav>
  <aside class="drawer" id="drawer" aria-label="Panier">
    <div class="dh"><span class="serif">Votre écrin</span><button class="ib" onclick="closeAll()" aria-label="Fermer">✕</button></div>
    <div class="dship"><span id="shipTxt"></span><div class="bar"><i id="shipBar"></i></div></div>
    <div class="items" id="items"></div>
    <div class="gift" id="gift"><label><input type="checkbox" id="giftBox"> Emballage cadeau signature · offert</label><label><input type="checkbox" id="giftMsg" onchange="this.closest('.gift').classList.toggle('msg',this.checked)"> Ajouter un message manuscrit</label><textarea maxlength="180" placeholder="Votre message, écrit à la main sur une carte Lucatelli"></textarea></div>
    <div class="df"><div class="row"><span>Livraison</span><span>Calculée à l'étape suivante</span></div><div class="row t"><span>Total</span><span id="total">0 €</span></div>
      <button class="btn gold-b" onclick="toast('Paiement sécurisé · Shopify Checkout')">Finaliser la commande <span class="arr">→</span></button><small>Paiement sécurisé · Apple Pay · 3x sans frais</small></div>
  </aside>
  <div class="toast" id="toast" role="status"></div><div class="cur" id="cur"></div>`);
  $('#ftr').innerHTML = `<div class="pattern"></div><div class="wrap">
   <div class="ft">
    <div class="fbrand"><span class="word">LUCΛTELLI</span><p>Maison de parfum. Des extraits rares, pensés comme des objets d'art, entre lumière méditerranéenne et savoir-faire italien.</p></div>
    <div><h5>Collection</h5><ul><li><a href="product.html?p=sole-dolce">Sole Dolce</a></li><li><a href="product.html?p=acanto">Acanto · bientôt</a></li><li><a href="index.html#ecrin">L'écrin</a></li><li><a href="#">Coffret découverte</a></li></ul></div>
    <div><h5>Service</h5><ul><li><a href="#">Livraison &amp; retours</a></li><li><a href="#">Conseil olfactif</a></li><li><a href="#">Gravure du flacon</a></li><li><a href="#">Contact</a></li></ul></div>
    <div class="fnl"><h5>Le Cercle Lucatelli</h5><p style="font-size:13.5px">Avant-premières, éditions limitées et invitations privées.</p><form onsubmit="event.preventDefault();toast('Bienvenue dans le Cercle');this.reset()"><input type="email" required placeholder="Votre adresse e-mail" aria-label="Adresse e-mail"><button>S'inscrire</button></form></div>
   </div>
   <div class="fb"><span>© 2026 Lucatelli · Tous droits réservés · Développé par Monsieur.H</span><div class="pay"><span>Visa</span><span>Mastercard</span><span>Amex</span><span>Apple Pay</span></div></div></div>`;
  renderCart();
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAll() });
  // en-tête
  const h = $('#hdr'); const onS = () => h.classList.toggle('solid', scrollY > 40); addEventListener('scroll', onS, { passive: true }); onS();
  // apparitions
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: .15, rootMargin: '0px 0px -40px 0px' });
  $$('.rv,.mask').forEach(el => io.observe(el));
  // curseur
  const c = $('#cur'); if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
    let x = 0, y = 0, cx = 0, cy = 0; addEventListener('mousemove', e => { x = e.clientX; y = e.clientY }, { passive: true });
    (function loop() { cx += (x - cx) * .2; cy += (y - cy) * .2; c.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`; requestAnimationFrame(loop) })();
    document.addEventListener('mouseover', e => c.classList.toggle('big', !!e.target.closest('a,button,[data-cur]')));
  }
}
