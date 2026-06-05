/* Yago Modas — app principal */

const CATALOG_URL = "https://catalogo-vestorize.vercel.app";

function useTweaks(defaults) {
  const [t, setT] = React.useState(defaults);
  const setTweak = (k, v) => setT((prev) => ({ ...prev, [k]: v }));
  return [t, setTweak];
}

const TWEAK_DEFAULTS = { accent: "#C8A84B", radius: 14, showSizes: true, serifLogo: false };

function waLink(text) {
  return "https://wa.me/" + window.YAGO.WHATSAPP + "?text=" + encodeURIComponent(text);
}

function RoleGate({ serif, onClient }) {
  const goManager = () => { window.location.href = "gerenciador.html"; };
  return (
    <div className="role-gate">
      <div className="role-bg" />
      <div className="role-inner">
        <div className="brand-mark role-mark"><span>Y</span></div>
        <div className="role-brand" style={serif ? { fontFamily: '"Cormorant Garamond", serif', fontWeight: 700 } : null}>
          Yago<b> Modas</b>
        </div>
        <div className="role-tag">A loja que vai até você</div>
        <div className="role-q">Como você quer entrar?</div>
        <button className="role-btn primary" onClick={onClient}>
          <span className="rb-title">Sou cliente</span>
          <span className="rb-sub">Ver o catálogo de produtos</span>
        </button>
        <button className="role-btn" onClick={goManager}>
          <span className="rb-title">Sou gerenciador</span>
          <span className="rb-sub">Administrar a loja · requer senha</span>
        </button>
      </div>
    </div>
  );
}

function App() {
  const { CATS } = window.YAGO;
  const [t] = useTweaks(TWEAK_DEFAULTS);

  const [items, setItems] = React.useState(() => window.YagoStore.visible());
  const [role, setRole] = React.useState(null);

  const [view, setView] = React.useState("home");
  const [cat, setCat] = React.useState("FEM");
  const [sub, setSub] = React.useState("Todos");
  const [sizes, setSizes] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const [cart, setCart] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem("yago_cart_v1")) || {}; } catch (e) { return {}; }
  });
  const [cartOpen, setCartOpen] = React.useState(false);
  const [qvProduct, setQvProduct] = React.useState(null);
  const [qvOpen, setQvOpen] = React.useState(false);
  const qvTimer = React.useRef(null);
  const [loading, setLoading] = React.useState(false);
  const [bump, setBump] = React.useState(false);
  const [toast, setToast] = React.useState({ show: false, text: "" });
  const scrollRef = React.useRef(null);
  const toastTimer = React.useRef(null);

  const counts = React.useMemo(() => {
    const c = {};
    CATS.forEach((x) => { c[x.id] = items.filter((p) => p.cat === x.id).length; });
    return c;
  }, [items]);

  React.useEffect(() => {
    const refresh = () => { window.YagoStore.refresh && window.YagoStore.refresh(); setItems(window.YagoStore.visible()); };
    window.addEventListener("yago-store-change", refresh);
    window.addEventListener("storage", refresh);
    return () => { window.removeEventListener("yago-store-change", refresh); window.removeEventListener("storage", refresh); };
  }, []);

  const searching = query.trim().length > 0;

  const filtered = React.useMemo(() => {
    let src = items;
    const q = query.trim().toLowerCase();
    if (searching) {
      src = src.filter((p) => p.name.toLowerCase().includes(q) || p.code.includes(q));
    } else {
      src = src.filter((p) => p.cat === cat);
      if (sub !== "Todos") src = src.filter((p) => p.sub === sub);
    }
    if (sizes.length) src = src.filter((p) => p.sizes.some((s) => sizes.includes(s)));
    return src;
  }, [items, cat, sub, sizes, query, searching]);

  React.useEffect(() => {
    setLoading(true);
    const id = setTimeout(() => setLoading(false), 430);
    return () => clearTimeout(id);
  }, [cat, sub, sizes, query, view]);

  React.useEffect(() => {
    try { localStorage.setItem("yago_cart_v1", JSON.stringify(cart)); } catch (e) {}
  }, [cart]);

  const flash = (text) => {
    setToast({ show: true, text });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast((s) => ({ ...s, show: false })), 1900);
  };

  const bumpBadge = () => { setBump(true); setTimeout(() => setBump(false), 420); };

  const addToCart = (p, size, qty = 1) => {
    const key = p.id + "::" + size;
    setCart((c) => {
      const cur = c[key];
      return { ...c, [key]: { ...p, size, key, qty: (cur ? cur.qty : 0) + qty } };
    });
    bumpBadge();
    flash("Adicionado à sacolinha");
  };
  const inc = (it) => setCart((c) => ({ ...c, [it.key]: { ...c[it.key], qty: c[it.key].qty + 1 } }));
  const dec = (it) => setCart((c) => {
    const q = (c[it.key]?.qty || 0) - 1;
    if (q <= 0) { const n = { ...c }; delete n[it.key]; return n; }
    return { ...c, [it.key]: { ...c[it.key], qty: q } };
  });
  const remove = (it) => setCart((c) => { const n = { ...c }; delete n[it.key]; return n; });

  const cartByProduct = React.useMemo(() => {
    const m = {};
    Object.values(cart).forEach((it) => { m[it.id] = (m[it.id] || 0) + it.qty; });
    return m;
  }, [cart]);

  const cartCount = Object.values(cart).reduce((s, it) => s + it.qty, 0);

  const openQuick = (p) => { clearTimeout(qvTimer.current); setQvProduct(p); setQvOpen(true); };
  const closeQuick = () => { setQvOpen(false); qvTimer.current = setTimeout(() => setQvProduct(null), 380); };

  const orderOne = (p, size, qty = 1) => {
    const msg = "Olá, Yago Modas! 🛍️\nTenho interesse neste produto:\n\n"
      + "• [COD " + p.code + "] " + p.name + "\n"
      + "  Tamanho: " + size + " · Qtd: " + qty + "\n"
      + "  R$ " + window.fmt(p.price) + "\n\n"
      + "Visto no catálogo: " + CATALOG_URL + "\n\nPode me ajudar?";
    flash("Abrindo WhatsApp…");
    window.open(waLink(msg), "_blank");
  };

  const checkout = () => {
    const list = Object.values(cart);
    if (!list.length) return;
    let total = 0;
    const lines = list.map((it) => {
      total += it.qty * it.price;
      return "• [COD " + it.code + "] " + it.name + " — Tam " + it.size + " — " + it.qty + "un — R$ " + window.fmt(it.qty * it.price);
    });
    const msg = "Olá, Yago Modas! 🛍️\nMontei minha sacolinha pelo catálogo:\n\n"
      + lines.join("\n") + "\n\nTotal: R$ " + window.fmt(total)
      + "\n\nCatálogo: " + CATALOG_URL
      + "\nGostaria de finalizar este pedido.";
    flash("Abrindo WhatsApp…");
    window.open(waLink(msg), "_blank");
  };

  const pickCat = (id) => {
    setCat(id); setSub("Todos"); setSizes([]); setQuery(""); setView("browse");
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  };
  const goHome = () => { setView("home"); setQuery(""); if (scrollRef.current) scrollRef.current.scrollTop = 0; };
  const toggleSize = (s) => setSizes((cur) => cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]);

  const onTab = (id) => {
    if (id === "cart") { setCartOpen(true); return; }
    if (id === "wa") {
      flash("Abrindo WhatsApp…");
      window.open(waLink("Olá, Yago Modas! Gostaria de atendimento. 🛍️"), "_blank");
      return;
    }
    if (id === "home") goHome();
    if (id === "browse") { setView("browse"); setQuery(""); }
  };

  const activeTab = cartOpen ? "cart" : (view === "home" && !searching ? "home" : "browse");

  const rootStyle = {
    "--accent": t.accent,
    "--accent-soft": "#ddc275",
    "--accent-deep": "#8f7327",
    "--accent-rgb": "200,168,75",
    "--r": t.radius + "px",
  };

  const showBrowse = view === "browse" || searching;

  return (
    <div className="cat" style={rootStyle}>
      {role !== "cliente" && <RoleGate serif={t.serifLogo} onClient={() => setRole("cliente")} />}
      <Header query={query} setQuery={setQuery} cartCount={cartCount} bump={bump}
        onCart={() => setCartOpen(true)} serif={t.serifLogo} onBrand={() => setRole(null)} />

      <div className="cat-scroll no-bar" ref={scrollRef}>
        {!showBrowse && <HomeTiles onPick={pickCat} counts={counts} />}

        {showBrowse && !searching && (
          <FilterBar cat={cat} sub={sub} setSub={setSub} sizes={sizes}
            toggleSize={toggleSize} total={loading ? "…" : filtered.length} onBack={goHome} />
        )}

        {showBrowse && searching && (
          <div className="count-row" style={{ paddingTop: 16 }}>
            <span className="n">Resultados para "<b style={{ color: "var(--text)" }}>{query}</b>": <b>{filtered.length}</b></span>
          </div>
        )}

        {showBrowse && (
          loading ? (
            <div className="grid">{Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}</div>
          ) : filtered.length === 0 ? (
            <div className="empty">
              {I.search({ width: 40, height: 40 })}
              <h4>Nenhum produto encontrado</h4>
              <p>Tente outro tipo, tamanho ou termo de busca.</p>
            </div>
          ) : (
            <div className="grid">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} p={p} idx={i} inCart={cartByProduct[p.id] || 0}
                  onOpen={openQuick} showSizes={t.showSizes} />
              ))}
            </div>
          )
        )}
      </div>

      <TabBar active={activeTab} cartCount={cartCount} onTab={onTab} />

      <CartDrawer open={cartOpen} items={cart} onClose={() => setCartOpen(false)}
        onInc={inc} onDec={dec} onRemove={remove} onCheckout={checkout} />

      <QuickView product={qvProduct} open={qvOpen} onClose={closeQuick}
        onAdd={addToCart} onOrder={orderOne} />

      <Toast show={toast.show} text={toast.text} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
