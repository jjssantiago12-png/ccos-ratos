/* Yago Modas — Quick-view (folha de produto) */

function QuickView({ product, open, onClose, onAdd, onOrder }) {
  const [size, setSize] = React.useState(null);
  const [qty, setQty] = React.useState(1);
  const [err, setErr] = React.useState(false);

  React.useEffect(() => {
    if (product) {
      setSize(product.sizes.length === 1 ? product.sizes[0] : null);
      setQty(1);
      setErr(false);
    }
  }, [product && product.id]);

  if (!product) return <div className={"scrim" + (open ? " show" : "")} onClick={onClose} />;

  const catMap = { FEM: "Feminino", MASC: "Masculino", INF: "Infantil", SAC: "Sacolinha" };
  const catTag = { FEM: "FEM", MASC: "MASC", INF: "INF", SAC: "OFERTA" }[product.cat];

  const guard = (fn, close) => {
    if (!size) { setErr(true); setTimeout(() => setErr(false), 650); return; }
    fn(product, size, qty);
    if (close) onClose();
  };

  return (
    <React.Fragment>
      <div className={"scrim" + (open ? " show" : "")} onClick={onClose} />
      <div className={"qv" + (open ? " show" : "")}>
        <button className="drawer-x qv-close" onClick={onClose} aria-label="Fechar">{window.I.x()}</button>

        <div className="qv-scroll no-bar">
          <div className="qv-img">
            {product.img
              ? <img src={product.img} alt={product.name} />
              : (<image-slot id={"ph-" + product.code} shape="rounded" radius="16" placeholder="Arraste uma foto do produto"></image-slot>)}
            <span className={"tag tag-cat " + product.cat}>{catTag}</span>
          </div>

          <div className="qv-info">
            <div className="code">COD {product.code}</div>
            <h3 className="qv-name">{product.name}</h3>
            <div className="qv-meta">{catMap[product.cat]} · {product.sub}</div>
            {product.desc ? <p className="qv-desc">{product.desc}</p> : null}
            <div className="qv-price"><span className="c">R$</span>{window.fmt(product.price)}</div>

            <div className={"qv-section" + (err ? " err" : "")}>
              <div className="qv-label">Escolha o tamanho {err && <em>· selecione um tamanho</em>}</div>
              <div className="qv-sizes">
                {product.sizes.map((s) => (
                  <button key={s} className={"qv-sz" + (size === s ? " on" : "")} onClick={() => setSize(s)}>{s}</button>
                ))}
              </div>
            </div>

            <div className="qv-section">
              <div className="qv-label">Quantidade</div>
              <div className="qv-qty">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="menos">{window.I.minus()}</button>
                <span className="q">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} aria-label="mais">{window.I.plus()}</button>
              </div>
            </div>
          </div>
        </div>

        <div className="qv-foot">
          <button className="checkout" onClick={() => guard(onOrder, true)}>
            {window.I.wa({ width: 20, height: 20 })} Pedir pelo WhatsApp
          </button>
          <button className="btn-bag" onClick={() => guard(onAdd, true)}>
            {window.I.bag({ width: 18, height: 18 })} Adicionar à sacolinha
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { QuickView });
