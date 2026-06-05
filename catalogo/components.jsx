/* Yago Modas — ícones (SVG inline, stroke currentColor) */

const I = {
  search: (p) => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/><path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>),
  cart: (p) => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><path d="M3 5h2l1.6 10.5a1.5 1.5 0 001.5 1.3h8.3a1.5 1.5 0 001.5-1.2L19.5 8H6.2" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9.5" cy="20" r="1.4" fill="currentColor"/><circle cx="17" cy="20" r="1.4" fill="currentColor"/></svg>),
  bag: (p) => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><path d="M5.5 8h13l-1 11.5a1.5 1.5 0 01-1.5 1.4H8a1.5 1.5 0 01-1.5-1.4L5.5 8z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round"/><path d="M8.5 8V6.5a3.5 3.5 0 017 0V8" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"/></svg>),
  plus: (p) => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>),
  minus: (p) => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}><path d="M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>),
  check: (p) => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}><path d="M5 12.5l4.5 4.5L19 6.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  chevL: (p) => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}><path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  chevR: (p) => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  x: (p) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>),
  trash: (p) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}><path d="M4 7h16M9 7V5h6v2M6 7l1 12.5A1.5 1.5 0 008.5 21h7a1.5 1.5 0 001.5-1.5L18 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  img: (p) => (<svg width="34" height="34" viewBox="0 0 24 24" fill="none" {...p}><rect x="3.5" y="4.5" width="17" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.4"/><circle cx="9" cy="9.5" r="1.6" stroke="currentColor" strokeWidth="1.3"/><path d="M5 17l4.5-4.2a1.6 1.6 0 012.2 0L17 17.5M14 14l1.6-1.5a1.6 1.6 0 012.2 0L20 14.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  wa: (p) => (<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.4A10 10 0 1012 2zm0 1.8a8.2 8.2 0 11-4.3 15.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.2 8.2 0 0112 3.8zm-3 3.6c-.2 0-.5.1-.7.4-.3.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.9 4.5 4 .6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.5-.3l-1.7-.8c-.2-.1-.4-.1-.6.1l-.7.9c-.1.2-.3.2-.5.1-.7-.3-1.4-.6-2.2-1.5-.6-.7-1-1.5-1.1-1.7-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.2-.5.1-.2 0-.4 0-.5l-.7-1.7c-.2-.5-.4-.4-.6-.4h-.5z"/></svg>),
  sort: (p) => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" {...p}><path d="M7 5v14M7 19l-3-3M7 5l3 3M17 19V5M17 5l3 3M17 19l-3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  home: (p) => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><path d="M4 10.5L12 4l8 6.5V20a1 1 0 01-1 1h-4v-6h-6v6H5a1 1 0 01-1-1v-9.5z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round"/></svg>),
  grid: (p) => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.9"/><rect x="13" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.9"/><rect x="4" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.9"/><rect x="13" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.9"/></svg>),
  // category tile icons (larger)
  dress: (p) => (<svg width="30" height="30" viewBox="0 0 24 24" fill="none" {...p}><path d="M9 3l3 2 3-2M9 3l-.5 3.5L7 9l1.5 1.5L7 21h10l-1.5-10.5L17 9l-1.5-2.5L15 3M9 3c0 1.5 1.5 2.5 3 2.5S15 4.5 15 3" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>),
  shirt: (p) => (<svg width="30" height="30" viewBox="0 0 24 24" fill="none" {...p}><path d="M8 3L3 6l2 4 2-1v9h10v-9l2 1 2-4-5-3-2 2-2-2-2 0z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>),
  baby: (p) => (<svg width="30" height="30" viewBox="0 0 24 24" fill="none" {...p}><path d="M7 4l5 3 5-3M7 4v3l-2 1 1.5 3M17 4v3l2 1-1.5 3M6.5 11l1 9.5h9l1-9.5M9 7v4M15 7v4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>),
};

/* ---------------- Header ---------------- */
function Header({ query, setQuery, cartCount, bump, onCart, serif, onBrand }) {
  return (
    <header className="hd">
      <div className="hd-top">
        <div className="brand" onClick={onBrand} style={{ cursor: onBrand ? "pointer" : "default" }}>
          <div className="brand-mark"><span>Y</span></div>
          <div>
            <div className="brand-name" style={serif ? { fontFamily: '"Cormorant Garamond", serif', fontSize: 24, fontWeight: 700 } : null}>
              Yago<b> Modas</b>
            </div>
            <div className="brand-tag">A loja que vai até você</div>
          </div>
        </div>
        <button className="icon-btn" onClick={onCart} aria-label="Sacola">
          {I.bag()}
          {cartCount > 0 && <span className={"cart-badge" + (bump ? " pop" : "")}>{cartCount}</span>}
        </button>
      </div>
      <div className="search">
        {I.search()}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar produto ou código…"
          inputMode="search"
        />
        {query && <button className="clr" onClick={() => setQuery("")}>{I.x({ width: 12, height: 12 })}</button>}
      </div>
    </header>
  );
}

/* ---------------- Home tiles ---------------- */
function HomeTiles({ onPick, counts }) {
  const { CATS } = window.YAGO;
  return (
    <div>
      <div className="home-pad">
        <div className="eyebrow">Catálogo completo</div>
        <h2 className="h-title">O que você procura hoje?</h2>
        <p className="h-sub">Escolha uma seção e filtre por tipo, tamanho e numeração.</p>
      </div>
      <div className="tiles">
        {CATS.map((c, i) => (
          <div key={c.id} className="tile" style={{ animationDelay: (i * 70) + "ms" }} onClick={() => onPick(c.id)}>
            <div className="tile-bg" />
            <div className="tile-glow" />
            <div className="tile-ico">{I[c.ico] ? I[c.ico]() : I.bag()}</div>
            <div className="tile-label">{c.label}</div>
            <div className="tile-count">{c.sub ? c.sub : counts[c.id] + " peças"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Filter bar ---------------- */
function FilterBar({ cat, sub, setSub, sizes, toggleSize, total, onBack }) {
  const { CATS, SUBS, SIZES, NUMS } = window.YAGO;
  const catObj = CATS.find((c) => c.id === cat) || {};
  return (
    <div>
      <div className="crumb">
        <button className="back" onClick={onBack}>{I.chevL({ width: 15, height: 15 })} Início</button>
        <span style={{ color: "var(--text-3)" }}>/</span>
        <span className="now">{catObj.label}</span>
      </div>

      <div className="flt-label">Tipo de produto</div>
      <div className="chips no-bar">
        {(SUBS[cat] || ["Todos"]).map((s) => (
          <button key={s} className={"chip" + (sub === s ? " on" : "")} onClick={() => setSub(s)}>{s}</button>
        ))}
      </div>

      <div className="flt-label">Tamanho</div>
      <div className="chips no-bar">
        {SIZES.map((s) => (
          <button key={s} className={"chip sz" + (sizes.includes(s) ? " on" : "")} onClick={() => toggleSize(s)}>{s}</button>
        ))}
      </div>

      <div className="flt-label">Numeração</div>
      <div className="chips no-bar">
        {NUMS.map((s) => (
          <button key={s} className={"chip sz" + (sizes.includes(s) ? " on" : "")} onClick={() => toggleSize(s)}>{s}</button>
        ))}
      </div>

      <div className="count-row">
        <span className="n"><b>{total}</b> {total === 1 ? "produto" : "produtos"}</span>
        <button className="sort-btn">{I.sort()} Relevância</button>
      </div>
    </div>
  );
}

/* ---------------- Product card ---------------- */
function fmt(v) {
  return v.toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function ProductCard({ p, idx, inCart, onOpen, showSizes }) {
  const catLabel = { FEM: "FEM", MASC: "MASC", INF: "INF", SAC: "OFERTA" }[p.cat];
  return (
    <article className="card" style={{ animationDelay: Math.min(idx, 11) * 45 + "ms" }} onClick={() => onOpen(p)}>
      <div className="ph">
        {p.img
          ? <img className="ph-img" src={p.img} alt={p.name} />
          : (<React.Fragment>
              <div className="ph-stripes" />
              <div className="ph-mid">{I.img()}<span className="lbl">FOTO EM BREVE</span></div>
            </React.Fragment>)}
        <span className={"tag tag-cat " + p.cat}>{catLabel}</span>
        {inCart > 0 && <span className="tag tag-incart">{I.check({ width: 11, height: 11 })} {inCart}</span>}
      </div>
      <div className="card-body">
        <div className="code">COD {p.code}</div>
        <div className="pname">{p.name}</div>
        {showSizes && (
          <div className="szrow">
            {p.sizes.slice(0, 6).map((s) => <span key={s} className="szpill">{s}</span>)}
          </div>
        )}
        <div className="price-row">
          <span className="price"><span className="c">R$</span>{fmt(p.price)}</span>
        </div>
        <div className="card-actions">
          <button className="btn-wa" onClick={(e) => { e.stopPropagation(); onOpen(p); }}>
            {I.wa()} Pedir
          </button>
          <button className={"btn-add" + (inCart > 0 ? " added" : "")} onClick={(e) => { e.stopPropagation(); onOpen(p); }} title="Adicionar à sacolinha">
            {inCart > 0 ? I.check({ width: 16, height: 16 }) : I.bag({ width: 18, height: 18 })}
          </button>
        </div>
      </div>
    </article>
  );
}

/* ---------------- Skeleton card ---------------- */
function SkeletonCard() {
  return (
    <div className="card sk">
      <div className="ph sk-shimmer" />
      <div className="card-body">
        <div className="sk-line" style={{ width: "40%" }} />
        <div className="sk-line" style={{ width: "90%" }} />
        <div className="sk-line" style={{ width: "55%", height: 16, marginTop: 10 }} />
        <div className="sk-line" style={{ width: "100%", height: 40, marginTop: 12, borderRadius: 11 }} />
      </div>
    </div>
  );
}

Object.assign(window, { I, fmt, Header, HomeTiles, FilterBar, ProductCard, SkeletonCard });
