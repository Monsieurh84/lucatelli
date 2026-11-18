/* LUCATELLI — Maison : catalogue, en-tête, panier, pied de page */
const PRODUCTS = {
  'sole-dolce': {
    name: 'Sole Dolce', kind: 'Extrait de parfum', size: '50 ml', price: 185, status: 'ok',
    cut: '../img/sole-cut.webp', thumb: '../img/sole-dolce-800.webp',
    gallery: [['../img/sole-dolce.webp', 'Flacon Sole Dolce, verre rubis et bouchon doré biseauté'], ['../img/duo.webp', 'Sole Dolce aux côtés d\'Acanto'], ['../img/ecrin.webp', 'L\'écrin bordeaux de Sole Dolce, face et dos'], ['../img/ecrin-marbre.webp', 'L\'écrin Sole Dolce sur marbre noir']],
    tagline: 'La lumière du Sud, en extrait de parfum.',
    desc: "Sole Dolce s'ouvre sur l'éclat des agrumes, glisse vers un cœur floral lumineux et se pose sur un fond chaud, enveloppant et légèrement vanillé. Un parfum solaire, pensé pour être porté de l'aube jusqu'au soir.",
    notes: [['Tête', 'Bergamote, citron de Sicile'], ['Cœur', 'Fleur d\'oranger, rose, lavande'], ['Fond', 'Fève tonka, ambre, musc blanc']],
    inci: 'Alcohol denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol.'
  },
  'acanto': {
    name: 'Acanto', kind: 'Extrait de parfum', size: 'Bientôt', price: null, status: 'soon',
    cut: '../img/acanto-cut.webp', thumb: '../img/acanto-800.webp',
    gallery: [['../img/acanto.webp', 'Flacon Acanto, feuille d\'acanthe sculptée dans le verre rubis'], ['../img/duo.webp', 'Acanto aux côtés de Sole Dolce']],
    tagline: 'La feuille d\'acanthe, sculptée dans le verre.',
    desc: "Le second chapitre de la Maison. Un flacon architectural en verre rubis, orné d'une feuille d'acanthe sculptée en relief du pied jusqu'à l'épaule, hommage aux chapiteaux et aux palais italiens.",
    notes: null, inci: ''
  }
};
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const FREE = 150, MONO = '<svg viewBox="50 40 240 580" aria-hidden="true"><path d="M72 58V535H205M166 122V605M137 64H260V540"/></svg>';
const I = {
  menu: '<svg viewBox="0 0 24 24"><path d="M3 8h18M3 16h18"/></svg>',
  search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4-4"/></svg>',
  user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>',
  bag: '<svg viewBox="0 0 24 24"><path d="M5 8h14l-1 13H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>'
};

function shell(active) {
  const nav = [['index.html', 'Accueil'], ['parfums.html', 'Parfums'], ['histoire.html', 'Notre histoire'], ['contact.html', 'Contact']];
  document.body.insertAdjacentHTML('afterbegin', `<div class="ann">Livraison offerte dès ${FREE} € · Échantillon offert à chaque commande</div>
  <header class="hd"><div class="wrap in">
    <nav aria-label="Navigation principale">${nav.map(([h, t]) => `<a href="${h}"${active === h ? ' class="on" aria-current="page"' : ''}>${t}</a>`).join('')}</nav>
    <button class="ib burger" aria-label="Ouvrir le menu" onclick="openNav(true)">${I.menu}</button>
    <a href="index.html" class="logo" aria-label="Lucatelli, accueil">${MONO}<span>LUCΛTELLI</span></a>
    <div class="ic"><button class="ib srch" aria-label="Rechercher">${I.search}</button><button class="ib srch" aria-label="Mon compte">${I.user}</button><button class="ib" aria-label="Ouvrir le panier" onclick="openCart(true)">${I.bag}<span class="cnt" data-count>0</span></button></div>
  </div></header>
  <nav class="mnav" id="mnav" aria-label="Menu mobile"><button class="ib x" aria-label="Fermer" onclick="openNav(false)">✕</button>${nav.map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}<a href="produit.html?p=sole-dolce">Sole Dolce</a><small>Lucatelli · Maison de parfum</small></nav>`);
  document.body.insertAdjacentHTML('beforeend', `
  <section class="rea" aria-label="Nos services"><div class="wrap">
    <div><svg viewBox="0 0 32 32"><path d="M4 10h16v12H4zM20 14h5l3 4v4h-8"/><circle cx="9" cy="24" r="2"/><circle cx="24" cy="24" r="2"/></svg><b>Livraison offerte</b><span>dès ${FREE} € d'achat</span></div>
    <div><svg viewBox="0 0 32 32"><path d="M12 4h8v5l3 3v16H9V12l3-3z"/><path d="M12 9h8"/></svg><b>Échantillon offert</b><span>dans chaque commande</span></div>
    <div><svg viewBox="0 0 32 32"><path d="M6 26l4-1 15-15-3-3L7 22z"/><path d="M19 10l3 3"/></svg><b>Gravure</b><span>vos initiales sur le bouchon</span></div>
    <div><svg viewBox="0 0 32 32"><rect x="5" y="9" width="22" height="16"/><path d="M5 14h22M16 9v16"/></svg><b>Écrin cadeau</b><span>et carte manuscrite</span></div>
  </div></section>
  <footer class="ft"><div class="wrap">
    <div class="g">
      <div><div class="lg">LUCΛTELLI</div><p style="margin-top:16px;max-width:340px">Maison de parfum. Des extraits rares, pensés comme des objets à garder, entre lumière méditerranéenne et savoir-faire italien.</p></div>
      <div><h5>La Maison</h5><ul><li><a href="histoire.html">Notre histoire</a></li><li><a href="parfums.html">Nos parfums</a></li><li><a href="histoire.html#ecrin">L'écrin</a></li><li><a href="contact.html">Contact</a></li></ul></div>
      <div><h5>Service client</h5><ul><li><a href="contact.html#faq">Livraison &amp; retours</a></li><li><a href="contact.html#faq">Gravure</a></li><li><a href="contact.html#faq">Paiement sécurisé</a></li><li><a href="contact.html">Nous écrire</a></li></ul></div>
      <div><h5>Le Cercle Lucatelli</h5><p>Avant-premières, éditions limitées et invitations privées.</p><form class="nl" onsubmit="event.preventDefault();toast('Bienvenue dans le Cercle Lucatelli');this.reset()"><input type="email" required placeholder="Votre adresse e-mail" aria-label="Adresse e-mail"><button>S'inscrire</button></form></div>
    </div>
    <div class="b"><span>© 2026 Lucatelli · Mentions légales · CGV · Confidentialité</span><div class="pay"><span>Visa</span><span>Mastercard</span><span>Amex</span><span>Apple Pay</span><span>PayPal</span></div><span>Développé par Monsieur.H</span></div>
  </div></footer>
  <div class="veil" id="veil" onclick="openCart(false);openNav(false)"></div>
  <aside class="drawer" id="drawer" aria-label="Panier"><div class="dh"><h3>Votre panier</h3><button class="ib" aria-label="Fermer le panier" onclick="openCart(false)">✕</button></div>
    <div class="ship"><span id="shipTxt"></span><div class="bar"><i id="shipBar"></i></div></div>
    <div class="items" id="items"></div>
    <div class="df"><div class="row"><span>Livraison</span><span id="shipCost">Offerte</span></div><div class="row t"><span>Total</span><span id="total">0 €</span></div><button class="btn" onclick="toast('Paiement sécurisé · Shopify Checkout')">Passer commande</button><small>Paiement sécurisé · 3x sans frais · Apple Pay</small></div>
  </aside><div class="toast" id="toast" role="status"></div>`);
  renderCart();
  addEventListener('keydown', e => { if (e.key === 'Escape') { openCart(false); openNav(false) } });
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: .12, rootMargin: '0px 0px -30px 0px' });
  $$('.rv').forEach(el => io.observe(el));
}
function openNav(on) { $('#mnav').classList.toggle('on', on) }
function openCart(on) { renderCart(); $('#drawer').classList.toggle('on', on); $('#veil').classList.toggle('on', on) }
let _t; function toast(m) { const t = $('#toast'); t.textContent = m; t.classList.add('on'); clearTimeout(_t); _t = setTimeout(() => t.classList.remove('on'), 2600) }
function chg(k, d) { const c = LK.get(), f = c.find(x => x.k === k); if (!f) return; f.q += d; LK.set(d && f.q < 1 ? c.filter(x => x.k !== k) : c); LK.paint(); renderCart() }
function renderCart() {
  const c = LK.get(), tot = LK.total(); LK.paint();
  $('#items').innerHTML = c.length ? c.map(x => { const p = PRODUCTS[x.slug]; return `<div class="ci"><img src="${p.thumb}" alt="${p.name}"><div><h4>${p.name}</h4><small>${p.kind} · ${p.size}</small>${x.engrave ? `<small>Gravure : « ${x.engrave.replace(/</g, '')} »</small>` : ''}<div class="qty"><button aria-label="Retirer un" onclick="chg('${x.k}',-1)">−</button><span>${x.q}</span><button aria-label="Ajouter un" onclick="chg('${x.k}',1)">+</button></div></div><span>${LK.eur(p.price * x.q)}</span></div>` }).join('')
    : `<div class="empty"><h4>Votre panier est vide</h4><p>Découvrez Sole Dolce, notre premier extrait.</p><a class="link" href="produit.html?p=sole-dolce" style="display:inline-block;margin-top:18px">Découvrir</a></div>`;
  $('#total').textContent = LK.eur(tot);
  const left = Math.max(0, FREE - tot);
  $('#shipTxt').innerHTML = !tot ? `Livraison offerte dès ${FREE} €` : left ? `Plus que <b>${LK.eur(left)}</b> pour la livraison offerte` : '<b>La livraison vous est offerte</b>';
  $('#shipBar').style.width = Math.min(100, tot / FREE * 100) + '%';
  $('#shipCost').textContent = !tot || left ? 'Calculée à l\'étape suivante' : 'Offerte';
}
