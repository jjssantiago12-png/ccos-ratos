/* Yago Modas — store (localStorage). Catálogo e Gerenciador compartilham. */
(function () {
  const PKEY = "yago_products_v2";

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
    try { localStorage.setItem(PKEY, JSON.stringify(list)); } catch (e) {}
    try { window.dispatchEvent(new CustomEvent("yago-store-change")); } catch (e) {}
  }

  let products = load();

  window.YagoStore = {
    all()        { return products.slice(); },
    visible()    { return products.filter((p) => p.active !== false); },
    get(id)      { return products.find((p) => p.id === id); },
    upsert(prod) {
      const i = products.findIndex((p) => p.id === prod.id);
      if (i >= 0) products[i] = prod; else products.unshift(prod);
      persist(products);
    },
    remove(id)        { products = products.filter((p) => p.id !== id); persist(products); },
    setActive(id, v)  { const p = products.find((x) => x.id === id); if (p) { p.active = v; persist(products); } },
    reseed()          { products = seed(); persist(products); },
    nextCode()        { return String(products.reduce((m, p) => Math.max(m, parseInt(p.code, 10) || 0), 10400) + 1); },
    newId(cat)        { return (cat || "P") + "-" + Date.now().toString(36); },
    refresh()         { products = load(); return products; },
  };
})();
