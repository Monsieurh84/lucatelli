/* Lucatelli — panier commun aux trois directions (même stockage que le site principal) */
const LK = {
  key: 'lucatelli_cart', price: 185,
  get() { try { return JSON.parse(localStorage.getItem(this.key) || '[]') } catch (e) { return [] } },
  set(c) { try { localStorage.setItem(this.key, JSON.stringify(c)) } catch (e) {} },
  add(o = {}) {
    const c = this.get(), eng = (o.engrave || '').trim().toUpperCase().slice(0, 10), q = Math.max(1, +o.q || 1);
    const k = 'sole-dolce' + (eng ? '|' + eng : ''); const f = c.find(x => x.k === k);
    f ? f.q += q : c.push({ k, slug: 'sole-dolce', q, engrave: eng });
    this.set(c); this.paint(); return { q, eng, total: this.total() };
  },
  count() { return this.get().reduce((s, x) => s + x.q, 0) },
  total() { return this.get().reduce((s, x) => s + x.q * this.price, 0) },
  paint() { const n = this.count(); document.querySelectorAll('[data-count]').forEach(e => { e.textContent = n; e.classList.toggle('has', n > 0) }) },
  eur(v) { return v.toLocaleString('fr-FR') + ' €' }
};
document.addEventListener('DOMContentLoaded', () => LK.paint());
