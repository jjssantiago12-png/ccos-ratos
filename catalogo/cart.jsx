/* Yago Modas — sacola (drawer), tab bar, toast */

/* ---------------- Cart Drawer ---------------- */
function CartDrawer({ open, items, onClose, onInc, onDec, onRemove, onCheckout }) {
  const list = Object.values(items);
  const totalQty = list.reduce((s, it) => s + it.qty, 0);
  const totalVal = list.reduce((s, it) => s + it.qty * it.price, 0);

  return (
    <React.Fragment>
      <div className={"scrim" + (open ? " show" : "")} onClick={onClose} />
      <div className={"drawer" + (open ? " show" : "")}>
        <div className="drawer-hd">
          <div>
            <h3>Minha Sacolinha</h3>
            <span>{totalQty} {totalQty === 1 ? "item" : "itens"} selecionados</span>
          </div>
          <button className="drawer-x" onClick={onClose} aria-label="Fechar">{window.I.x()}</button>
        </div>

        {list.length === 0 ? (
          <div className="empty" style={{ flex: 1 }}>
            {window.I.bag({ width: 46, height: 46 })}
            <h4>Sua sacolinha está vazia</h4>
            <p>Toque em <b style={{ color: "var(--accent)" }}>+</b> nos produtos para montar seu pedido.</p>
          </div>
        ) : (
          <div className="drawer-list no-bar">
            {list.map((it) => (
              <div key={it.key} className="citem">
                <div className="citem-thumb">
                  <div className="ph-stripes" />
                  {window.I.img({ width: 22, height: 22 })}
                </div>
                <div className="citem-info">
                  <div className="code">COD {it.code}</div>
                  <div className="nm">{it.name}</div>
                  <div className="meta">Tamanho: <b style={{ color: "var(--text-2)" }}>{it.size}</b></div>
                  <div className="pr">R$ {window.fmt(it.price)}</div>
                </div>
                <div className="citem-right">
                  <button className="citem-rm" onClick={() => onRemove(it)} aria-label="Remover">{window.I.trash()}</button>
                  <div className="mini-step">
                    <button onClick={() => onDec(it)}>−</button>
                    <span className="q">{it.qty}</span>
                    <button onClick={() => onInc(it)}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {list.length > 0 && (
          <div className="drawer-foot">
            <div className="sum-row"><span>Itens</span><span>{totalQty}</span></div>
            <div className="sum-row total">
              <span className="k">Total</span>
              <span className="v">R$ {window.fmt(totalVal)}</span>
            </div>
            <button className="checkout" onClick={onCheckout}>{window.I.wa({ width: 20, height: 20 })} Finalizar pelo WhatsApp</button>
            <p className="checkout-note">Enviaremos seu pedido com todos os códigos para a loja.</p>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

/* ---------------- Tab bar ---------------- */
function TabBar({ active, cartCount, onTab }) {
  const tabs = [
    { id: "home", label: "Início", ico: "home" },
    { id: "browse", label: "Categorias", ico: "grid" },
    { id: "cart", label: "Sacolinha", ico: "bag", count: cartCount },
    { id: "wa", label: "Atendimento", ico: "wa" },
  ];
  return (
    <nav className="tabbar">
      {tabs.map((t) => (
        <button key={t.id} className={"tab" + (active === t.id ? " on" : "")} onClick={() => onTab(t.id)}>
          {active === t.id && <span className="dot" />}
          {window.I[t.ico]({ width: 22, height: 22 })}
          {t.count > 0 && <span className="tcount">{t.count}</span>}
          <span className="tl">{t.label}</span>
        </button>
      ))}
    </nav>
  );
}

/* ---------------- Toast ---------------- */
function Toast({ show, text }) {
  return (
    <div className={"toast" + (show ? " show" : "")}>
      <span className="chk">{window.I.check({ width: 13, height: 13, style: { color: "#fff" } })}</span>
      {text}
    </div>
  );
}

Object.assign(window, { CartDrawer, TabBar, Toast });
