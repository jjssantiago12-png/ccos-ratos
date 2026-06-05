/* Yago Modas — store compartilhado (localStorage)
   Seedado a partir de data.js (window.YAGO.ITEMS) na primeira vez.
   Catálogo e Gerenciador leem/escrevem no mesmo lugar. */
(function () {
  const PKEY = "yago_products_v1";

  function seed() {
    return (window.YAGO.ITEMS || []).map((p) => ({
      ...p, active: p.active !== false, img: p.img || null,
    }));
  }

  function load() {
    try {
      const raw = localStorage.getItem(PKEY);
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr) && arr.length) return arr;
      }
    } catch (e) {}
    const s = seed();
    persist(s);
    return s;
  }

  function persist(list) {
    try { localStorage.setItem(PKEY, JSON.stringify(list)); }
    catch (e) { console.warn("Yago store: localStorage cheio", e); }
    try { window.dispatchEvent(new CustomEvent("yago-store-change")); } catch (e) {}
  }

  let products = load();

  const api = {
    all() { return products.slice(); },
    visible() { return products.filter((p) => p.active !== false); },
    get(id) { return products.find((p) => p.id === id); },
    upsert(prod) {
      const i = products.findIndex((p) => p.id === prod.id);
      if (i >= 0) products[i] = prod;
      else products.unshift(prod);
      persist(products);
    },
    remove(id) { products = products.filter((p) => p.id !== id); persist(products); },
    setActive(id, active) {
      const p = products.find((x) => x.id === id);
      if (p) { p.active = active; persist(products); }
    },
    reseed() { products = seed(); persist(products); },
    nextCode() {
      const max = products.reduce((m, p) => Math.max(m, parseInt(p.code, 10) || 0), 10400);
      return String(max + 1);
    },
    newId(cat) { return (cat || "P") + "-" + Date.now().toString(36); },
    // recarrega de outra aba (evento 'storage')
    refresh() { products = load(); return products; },
  };

  window.YagoStore = api;
})();
