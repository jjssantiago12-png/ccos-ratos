/* Yago Modas — Gerenciador (admin) com login mockado.
   Fase 1 (aqui): UI + edição + fotos, persistência local.
   Fase 2 (Claude Code): backend real de auth + banco de dados. */

/* credencial PLACEHOLDER — trocar por auth real no Claude Code */
const ADMIN_CREDS = { user: "Yago", pass: "yago1234" };

const SIZE_OPTIONS = (() => {
  const s = [...window.YAGO.SIZES, ...window.YAGO.NUMS, "Único"];
  return s.filter((v, i) => s.indexOf(v) === i);
})();

function afmt(v) {
  return Number(v || 0).toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/* ícones */
const A = {
  search: (p) => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/><path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>),
  plus: (p) => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round"/></svg>),
  x: (p) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>),
  trash: (p) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}><path d="M4 7h16M9 7V5h6v2M6 7l1 12.5A1.5 1.5 0 008.5 21h7a1.5 1.5 0 001.5-1.5L18 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  pencil: (p) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}><path d="M14.5 5.5l4 4M4 20l1-4L16 5a1.5 1.5 0 012 0l1 1a1.5 1.5 0 010 2L8 19l-4 1z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  img: (p) => (<svg width="30" height="30" viewBox="0 0 24 24" fill="none" {...p}><rect x="3.5" y="4.5" width="17" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.4"/><circle cx="9" cy="9.5" r="1.6" stroke="currentColor" strokeWidth="1.3"/><path d="M5 17l4.5-4.2a1.6 1.6 0 012.2 0L17 17.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  box: (p) => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><path d="M3 7l9-4 9 4v10l-9 4-9-4V7z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="M3 7l9 4 9-4M12 11v10" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/></svg>),
  eye: (p) => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" stroke="currentColor" strokeWidth="1.7"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7"/></svg>),
  camera: (p) => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><circle cx="12" cy="13" r="3.2" stroke="currentColor" strokeWidth="1.6"/></svg>),
  check: (p) => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}><path d="M5 12.5l4.5 4.5L19 6.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  out: (p) => (<svg width="17" height="17" viewBox="0 0 24 24" fill="none" {...p}><path d="M15 4h3a1 1 0 011 1v14a1 1 0 01-1 1h-3M10 8l-4 4 4 4M6 12h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  ext: (p) => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" {...p}><path d="M14 4h6v6M20 4l-9 9M18 13v5a1 1 0 01-1 1H6a1 1 0 01-1-1V7a1 1 0 011-1h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  lock: (p) => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}><rect x="4.5" y="10.5" width="15" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.8"/><path d="M8 10.5V8a4 4 0 018 0v2.5" stroke="currentColor" strokeWidth="1.8"/></svg>),
  user: (p) => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}><circle cx="12" cy="8" r="3.6" stroke="currentColor" strokeWidth="1.8"/><path d="M4.5 20a7.5 7.5 0 0115 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>),
};

/* reduz a imagem antes de salvar (cabe no armazenamento local) */
function resizeImage(file, max = 900, q = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        let w = img.width, h = img.height;
        if (w > h) { if (w > max) { h = Math.round(h * max / w); w = max; } }
        else { if (h > max) { w = Math.round(w * max / h); h = max; } }
        const c = document.createElement("canvas");
        c.width = w; c.height = h;
        c.getContext("2d").drawImage(img, 0, 0, w, h);
        resolve(c.toDataURL("image/jpeg", q));
      };
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* ============ LOGIN ============ */
function Login({ onOk }) {
  const [user, setUser] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [err, setErr] = React.useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (user.trim() === ADMIN_CREDS.user && pass === ADMIN_CREDS.pass) onOk();
    else { setErr(true); setTimeout(() => setErr(false), 1500); }
  };
  return (
    <div className="login-wrap">
      <form className="login-card" onSubmit={submit}>
        <div className="adm-mark" style={{ width: 52, height: 52, fontSize: 26, margin: "0 auto 18px" }}>Y</div>
        <h1 className="login-title">Yago<b> Modas</b></h1>
        <p className="login-sub">Área do Gerenciador</p>

        <div className="fld">
          <label>Usuário</label>
          <div className="login-inp">{A.user()}<input type="text" value={user} onChange={(e) => setUser(e.target.value)} placeholder="seu usuário" autoFocus /></div>
        </div>
        <div className="fld">
          <label>Senha</label>
          <div className="login-inp">{A.lock()}<input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="sua senha" /></div>
        </div>

        {err && <div className="login-err">Usuário ou senha inválidos.</div>}
        <button type="submit" className="btn btn-gold" style={{ width: "100%", height: 50, justifyContent: "center", marginTop: 6 }}>Entrar</button>
      </form>
    </div>
  );
}

/* ============ CSV IMPORT ============ */

const CSV_TEMPLATE = `nome,categoria,tipo,preco,tamanhos,descricao,ativo
Vestido Midi Floral,FEM,Vestidos,119.90,"P,M,G,G2",Tecido leve e fresquinho,sim
Calça Jeans Skinny,FEM,Calças Jeans,129.90,"36,38,40,42,44",Cintura alta,sim
Camiseta Básica,MASC,Camisetas,54.90,"P,M,G,GG,XG",,sim
Bermuda Infantil,INF,Bermudas & Shorts,39.90,"P,M,G",,sim`;

const CAT_ALIAS = {
  FEM: 'FEM', FEMININO: 'FEM', FEMININA: 'FEM',
  MASC: 'MASC', MASCULINO: 'MASC', MASCULINA: 'MASC',
  INF: 'INF', INFANTIL: 'INF',
  SAC: 'SAC', UTENSÍLIOS: 'SAC', UTENSILIOS: 'SAC', GERAL: 'SAC',
};

function parseCSVLine(line) {
  const fields = [];
  let cur = '', inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') { inQ = !inQ; }
    else if (c === ',' && !inQ) { fields.push(cur.trim()); cur = ''; }
    else cur += c;
  }
  fields.push(cur.trim());
  return fields;
}

function parseCSV(text) {
  const lines = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n').filter(l => l.trim());
  if (lines.length < 2) return { ok: [], errors: ['Arquivo vazio ou sem dados.'] };

  const ok = [], errors = [];
  for (let i = 1; i < lines.length; i++) {
    const f = parseCSVLine(lines[i]);
    const nome = f[0] || '';
    const catRaw = (f[1] || '').toUpperCase().trim();
    const tipo = f[2] || '';
    const precoRaw = (f[3] || '').replace(',', '.');
    const tamRaw = f[4] || '';
    const desc = f[5] || '';
    const ativoRaw = (f[6] || 'sim').toLowerCase().trim();

    if (!nome) { errors.push(`Linha ${i + 1}: nome em branco`); continue; }
    const cat = CAT_ALIAS[catRaw];
    if (!cat) { errors.push(`Linha ${i + 1}: categoria inválida "${f[1]}"`); continue; }
    const price = parseFloat(precoRaw);
    if (!price || price <= 0) { errors.push(`Linha ${i + 1}: preço inválido "${f[3]}"`); continue; }

    const subs = (window.YAGO.SUBS[cat] || []).filter(s => s !== 'Todos');
    const sub = subs.find(s => s.toLowerCase() === tipo.toLowerCase()) || subs[0] || '';
    const sizes = tamRaw ? tamRaw.split(',').map(s => s.trim()).filter(Boolean) : ['Único'];
    const active = !['nao', 'não', 'false', '0', 'no'].includes(ativoRaw);
    const code = window.YagoStore.nextCode();

    ok.push({
      id: window.YagoStore.newId(cat),
      code, name: nome, cat, sub, price, sizes, desc, active, img: null,
    });
  }
  return { ok, errors };
}

function downloadTemplate() {
  const blob = new Blob([CSV_TEMPLATE], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'template-produtos-yago-modas.csv';
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
}

function CsvImporter({ open, onClose, onImport }) {
  const [result, setResult] = React.useState(null);
  const [dragging, setDragging] = React.useState(false);
  const inputRef = React.useRef(null);

  React.useEffect(() => { if (!open) setResult(null); }, [open]);

  const handleFile = (file) => {
    if (!file || !file.name.endsWith('.csv')) { setResult({ ok: [], errors: ['Selecione um arquivo .csv'] }); return; }
    const reader = new FileReader();
    reader.onload = (e) => setResult(parseCSV(e.target.result));
    reader.readAsText(file, 'utf-8');
  };

  const confirm = () => {
    if (!result || !result.ok.length) return;
    result.ok.forEach(p => window.YagoStore.upsert(p));
    onImport(result.ok.length);
    onClose();
  };

  return (
    <React.Fragment>
      <div className={"adm-scrim" + (open ? " show" : "")} onClick={onClose} />
      <aside className={"editor" + (open ? " show" : "")}>
        <div className="editor-hd">
          <h3>Importação rápida via CSV</h3>
          <button className="iconbtn" onClick={onClose}>{A.x()}</button>
        </div>

        <div className="editor-body">
          <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6, margin: '0 0 18px' }}>
            Preencha a planilha com os dados dos produtos e importe de uma vez. As fotos você adiciona depois, um por um.
          </p>

          <div className="fld">
            <label>1. Baixe o template</label>
            <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', gap: 8 }} onClick={downloadTemplate}>
              {A.ext()} Baixar template CSV
            </button>
          </div>

          <div className="fld">
            <label>2. Preencha e importe</label>
            <div
              className={"drop csv-drop" + (dragging ? " over" : "")}
              style={{ aspectRatio: 'unset', height: 110 }}
              onClick={() => inputRef.current && inputRef.current.click()}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
            >
              {result ? (
                <div className="ph-mid" style={{ padding: 12, textAlign: 'center' }}>
                  <span style={{ fontSize: 28 }}>{result.ok.length > 0 ? '✓' : '✗'}</span>
                  <b style={{ color: result.ok.length > 0 ? 'var(--wa)' : '#e8786f', fontSize: 13 }}>
                    {result.ok.length} produto{result.ok.length !== 1 ? 's' : ''} prontos para importar
                  </b>
                  {result.errors.length > 0 && <span style={{ fontSize: 11, color: '#e8786f' }}>{result.errors.length} linha{result.errors.length !== 1 ? 's' : ''} com erro</span>}
                  <span style={{ fontSize: 11, color: 'var(--text-3)' }}>Clique para trocar o arquivo</span>
                </div>
              ) : (
                <div className="ph-mid">{A.img({ width: 28, height: 28 })}<b>Arraste o CSV aqui</b><span>ou clique para escolher</span></div>
              )}
              <input ref={inputRef} type="file" accept=".csv,text/csv" style={{ display: 'none' }}
                onChange={(e) => handleFile(e.target.files[0])} />
            </div>
          </div>

          {result && result.errors.length > 0 && (
            <div className="fld">
              <label>Erros encontrados</label>
              <div style={{ background: 'rgba(232,120,111,0.08)', border: '1px solid rgba(232,120,111,0.25)', borderRadius: 10, padding: '10px 13px' }}>
                {result.errors.slice(0, 5).map((e, i) => (
                  <div key={i} style={{ fontSize: 12, color: '#f0938a', marginBottom: 4 }}>• {e}</div>
                ))}
                {result.errors.length > 5 && <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>+{result.errors.length - 5} erros adicionais</div>}
              </div>
            </div>
          )}

          {result && result.ok.length > 0 && (
            <div className="fld">
              <label>Prévia ({Math.min(3, result.ok.length)} de {result.ok.length})</label>
              {result.ok.slice(0, 3).map((p, i) => (
                <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid var(--line)', fontSize: 13 }}>
                  <div style={{ fontWeight: 600, color: 'var(--text)' }}>{p.name}</div>
                  <div style={{ color: 'var(--text-3)', fontSize: 11, marginTop: 2 }}>
                    {p.cat} · {p.sub} · R$ {afmt(p.price)} · {p.sizes.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="editor-foot">
          <button className="btn btn-ghost" onClick={onClose}>Cancelar</button>
          <button className="btn btn-gold" onClick={confirm} disabled={!result || result.ok.length === 0}
            style={{ opacity: (!result || result.ok.length === 0) ? 0.4 : 1 }}>
            {A.check({ width: 16, height: 16 })} Importar {result ? result.ok.length : ''} produtos
          </button>
        </div>
      </aside>
    </React.Fragment>
  );
}

/* ============ DROPZONE DE FOTO ============ */
function PhotoDrop({ value, onChange }) {
  const [over, setOver] = React.useState(false);
  const inputRef = React.useRef(null);
  const handle = async (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    try { onChange(await resizeImage(file)); } catch (e) { /* ignore */ }
  };
  return (
    <div
      className={"drop" + (over ? " over" : "")}
      onClick={() => inputRef.current && inputRef.current.click()}
      onDragOver={(e) => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => { e.preventDefault(); setOver(false); handle(e.dataTransfer.files[0]); }}
    >
      {value ? (
        <React.Fragment>
          <img src={value} alt="" />
          <button type="button" className="drop-rm" onClick={(e) => { e.stopPropagation(); onChange(null); }}>{A.x()}</button>
        </React.Fragment>
      ) : (
        <div className="ph-mid">{A.camera({ width: 30, height: 30 })}<b>Adicionar foto</b><span>Arraste aqui ou clique para escolher</span></div>
      )}
      <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }}
        onChange={(e) => handle(e.target.files[0])} />
    </div>
  );
}

/* ============ EDITOR ============ */
function blankProduct() {
  return { id: null, code: window.YagoStore.nextCode(), name: "", cat: "FEM",
    sub: window.YAGO.SUBS.FEM.filter((s) => s !== "Todos")[0], price: "", sizes: [], img: null, desc: "", active: true };
}

function Editor({ product, open, onClose, onSave }) {
  const [f, setF] = React.useState(blankProduct());
  const [showErr, setShowErr] = React.useState(false);

  React.useEffect(() => {
    if (product) setF({ ...blankProduct(), ...product, price: product.price != null ? String(product.price) : "" });
  }, [product && product.id, open]);

  if (!product) return <div className={"adm-scrim" + (open ? " show" : "")} onClick={onClose} />;

  const subs = (window.YAGO.SUBS[f.cat] || ["Todos"]).filter((s) => s !== "Todos");
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const toggleSize = (s) => setF((p) => ({ ...p, sizes: p.sizes.includes(s) ? p.sizes.filter((x) => x !== s) : [...p.sizes, s] }));

  const priceNum = parseFloat(String(f.price).replace(",", "."));
  const valid = f.name.trim() && f.code.trim() && priceNum > 0 && f.sizes.length > 0;

  const save = () => {
    if (!valid) { setShowErr(true); return; }
    const isNew = !f.id;
    onSave({
      id: f.id || window.YagoStore.newId(f.cat),
      code: f.code.trim(), name: f.name.trim(), cat: f.cat, sub: f.sub,
      price: priceNum, sizes: f.sizes, img: f.img || null, desc: (f.desc || "").trim(), active: f.active !== false,
    }, isNew);
  };

  return (
    <React.Fragment>
      <div className={"adm-scrim" + (open ? " show" : "")} onClick={onClose} />
      <aside className={"editor" + (open ? " show" : "")}>
        <div className="editor-hd">
          <h3>{f.id ? "Editar produto" : "Novo produto"}</h3>
          <button className="iconbtn" onClick={onClose}>{A.x()}</button>
        </div>

        <div className="editor-body">
          <div className="fld"><label>Foto do produto</label><PhotoDrop value={f.img} onChange={(v) => set("img", v)} /></div>

          <div className={"fld" + (showErr && !f.name.trim() ? " invalid" : "")}>
            <label>Nome do produto</label>
            <input type="text" value={f.name} onChange={(e) => set("name", e.target.value)} placeholder="Ex: Vestido Midi Floral" />
          </div>

          <div className="fld-row">
            <div className={"fld" + (showErr && !f.code.trim() ? " invalid" : "")}>
              <label>Código</label>
              <input type="text" value={f.code} onChange={(e) => set("code", e.target.value)} placeholder="10500" />
            </div>
            <div className={"fld" + (showErr && !(priceNum > 0) ? " invalid" : "")}>
              <label>Preço (R$)</label>
              <input type="text" inputMode="decimal" value={f.price} onChange={(e) => set("price", e.target.value)} placeholder="89,90" />
            </div>
          </div>

          <div className="fld-row">
            <div className="fld">
              <label>Categoria</label>
              <select value={f.cat} onChange={(e) => { const c = e.target.value; const ns = (window.YAGO.SUBS[c] || []).filter((s) => s !== "Todos")[0]; setF((p) => ({ ...p, cat: c, sub: ns })); }}>
                {window.YAGO.CATS.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>
            <div className="fld">
              <label>Tipo</label>
              <select value={f.sub} onChange={(e) => set("sub", e.target.value)}>
                {subs.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className={"fld" + (showErr && f.sizes.length === 0 ? " invalid" : "")}>
            <label>Tamanhos disponíveis</label>
            <div className="chip-pick">
              {SIZE_OPTIONS.map((s) => (
                <button type="button" key={s} className={f.sizes.includes(s) ? "on" : ""} onClick={() => toggleSize(s)}>{s}</button>
              ))}
            </div>
            {showErr && f.sizes.length === 0 && <div className="err">Selecione ao menos um tamanho.</div>}
          </div>

          <div className="fld">
            <label>Descrição (opcional)</label>
            <textarea value={f.desc} onChange={(e) => set("desc", e.target.value)} placeholder="Tecido, caimento, observações…" />
          </div>

          <div className="fld">
            <label>Visibilidade</label>
            <div className="sw-wrap">
              <button type="button" className={"sw" + (f.active !== false ? " on" : "")} onClick={() => set("active", !(f.active !== false))} />
              <span className="lab" style={{ fontSize: 13, color: "var(--text-2)" }}>{f.active !== false ? "Visível no catálogo" : "Oculto do catálogo"}</span>
            </div>
          </div>
        </div>

        <div className="editor-foot">
          <button className="btn btn-ghost" onClick={onClose}>Cancelar</button>
          <button className="btn btn-gold" onClick={save}>{A.check({ width: 16, height: 16 })} Salvar produto</button>
        </div>
      </aside>
    </React.Fragment>
  );
}

/* ============ APP ============ */
function AdminApp({ onLogout }) {
  const [list, setList] = React.useState(() => window.YagoStore.all());
  const [query, setQuery] = React.useState("");
  const [catFilter, setCatFilter] = React.useState("Todos");
  const [editing, setEditing] = React.useState(null);
  const [editorOpen, setEditorOpen] = React.useState(false);
  const [toast, setToast] = React.useState({ show: false, text: "" });
  const [confirmId, setConfirmId] = React.useState(null);
  const [csvOpen, setCsvOpen] = React.useState(false);
  const tt = React.useRef(null);
  const edTimer = React.useRef(null);

  const refresh = () => setList(window.YagoStore.all());
  const flash = (text) => { setToast({ show: true, text }); clearTimeout(tt.current); tt.current = setTimeout(() => setToast((s) => ({ ...s, show: false })), 2000); };

  const stats = React.useMemo(() => ({
    total: list.length,
    vis: list.filter((p) => p.active !== false).length,
    foto: list.filter((p) => p.img).length,
    oculto: list.filter((p) => p.active === false).length,
  }), [list]);

  const filtered = React.useMemo(() => {
    let s = list;
    if (catFilter !== "Todos") s = s.filter((p) => p.cat === catFilter);
    const q = query.trim().toLowerCase();
    if (q) s = s.filter((p) => p.name.toLowerCase().includes(q) || p.code.includes(q));
    return s;
  }, [list, query, catFilter]);

  const openNew = () => { setEditing(blankProduct()); setEditorOpen(true); };
  const openEdit = (p) => { setEditing(p); setEditorOpen(true); };
  const closeEditor = () => { setEditorOpen(false); clearTimeout(edTimer.current); edTimer.current = setTimeout(() => setEditing(null), 340); };

  const save = (prod, isNew) => {
    window.YagoStore.upsert(prod); refresh();
    flash(isNew ? "Produto adicionado ao catálogo" : "Produto atualizado");
    closeEditor();
  };
  const toggle = (p) => { window.YagoStore.setActive(p.id, p.active === false); refresh(); };
  const del = (id) => { window.YagoStore.remove(id); refresh(); setConfirmId(null); flash("Produto excluído"); };

  return (
    <div className="adm">
      <header className="adm-top">
        <div className="adm-brand">
          <div className="adm-mark">Y</div>
          <div>
            <div className="nm">Yago<b> Modas</b></div>
            <div className="sub">Gerenciador</div>
          </div>
        </div>
        <div className="adm-top-actions">
          <a className="btn btn-ghost" href="index.html" target="_blank" rel="noreferrer">{A.ext()} Ver catálogo</a>
          <button className="btn btn-ghost" onClick={() => setCsvOpen(true)}>{A.img({ width: 16, height: 16 })} Importar CSV</button>
          <button className="btn btn-gold" onClick={openNew}>{A.plus()} Adicionar produto</button>
          <button className="btn btn-ghost" onClick={onLogout} title="Sair">{A.out()}</button>
        </div>
      </header>

      <main className="adm-main">
        <div className="adm-stats">
          <div className="stat"><div className="ic">{A.box()}</div><div className="k">Produtos</div><div className="v">{stats.total}</div></div>
          <div className="stat"><div className="ic">{A.eye()}</div><div className="k">Visíveis</div><div className="v gold">{stats.vis}</div></div>
          <div className="stat"><div className="ic">{A.camera()}</div><div className="k">Com foto</div><div className="v">{stats.foto}</div></div>
          <div className="stat"><div className="ic">{A.eye()}</div><div className="k">Ocultos</div><div className="v">{stats.oculto}</div></div>
        </div>

        <div className="adm-toolbar">
          <div className="adm-search">{A.search()}<input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por nome ou código…" /></div>
          <div className="seg">
            {["Todos", ...window.YAGO.CATS.map((c) => c.id)].map((c) => (
              <button key={c} className={catFilter === c ? "on" : ""} onClick={() => setCatFilter(c)}>
                {c === "Todos" ? "Todos" : window.YAGO.CATS.find((x) => x.id === c).label}
              </button>
            ))}
          </div>
        </div>

        <div className="adm-table">
          <div className="trow head">
            <div className="cell-thumb" style={{ width: 50 }}></div>
            <div className="cell-code">Código</div>
            <div className="cell-name">Produto</div>
            <div className="cell-cat">Categoria</div>
            <div className="cell-price">Preço</div>
            <div className="cell-status">Status</div>
            <div className="cell-actions"></div>
          </div>

          {filtered.length === 0 ? (
            <div className="adm-empty">Nenhum produto encontrado.</div>
          ) : filtered.map((p) => (
            <div className="trow" key={p.id} style={{ opacity: p.active === false ? 0.55 : 1 }}>
              <div className="cell-thumb t-thumb">
                {p.img ? <img src={p.img} alt="" /> : (<React.Fragment><div className="ph-stripes" />{A.img({ width: 20, height: 20 })}</React.Fragment>)}
              </div>
              <div className="cell-code t-code">{p.code}</div>
              <div className="cell-name">
                <div className="t-name">{p.name}</div>
                <div className="t-name ssub">{p.sub}</div>
              </div>
              <div className="cell-cat"><span className={"t-cat " + p.cat}>{p.cat === "SAC" ? "UTENS" : p.cat}</span></div>
              <div className="cell-price t-price">R$ {afmt(p.price)}</div>
              <div className="cell-status">
                <div className="sw-wrap">
                  <button className={"sw" + (p.active !== false ? " on" : "")} onClick={() => toggle(p)} />
                </div>
              </div>
              <div className="cell-actions t-actions">
                <button className="iconbtn" onClick={() => openEdit(p)} title="Editar">{A.pencil()}</button>
                <button className="iconbtn del" onClick={() => setConfirmId(p.id)} title="Excluir">{A.trash()}</button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Editor product={editing} open={editorOpen} onClose={closeEditor} onSave={save} />

      <CsvImporter open={csvOpen} onClose={() => setCsvOpen(false)}
        onImport={(n) => { refresh(); flash(`${n} produto${n !== 1 ? 's' : ''} importados com sucesso`); }} />

      {confirmId && (
        <React.Fragment>
          <div className="adm-scrim show" onClick={() => setConfirmId(null)} />
          <div className="confirm">
            <h4>Excluir produto?</h4>
            <p>Essa ação remove o produto do catálogo. Não dá pra desfazer.</p>
            <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
              <button className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }} onClick={() => setConfirmId(null)}>Cancelar</button>
              <button className="btn btn-danger" style={{ flex: 1, justifyContent: "center" }} onClick={() => del(confirmId)}>Excluir</button>
            </div>
          </div>
        </React.Fragment>
      )}

      <div className={"adm-toast" + (toast.show ? " show" : "")}>
        <span className="chk">{A.check({ width: 13, height: 13, style: { color: "#fff" } })}</span>{toast.text}
      </div>
    </div>
  );
}

/* ============ GATE ============ */
function Gate() {
  const [authed, setAuthed] = React.useState(() => {
    try { return localStorage.getItem("yago_admin_auth") === "1"; } catch (e) { return false; }
  });
  const login = () => { try { localStorage.setItem("yago_admin_auth", "1"); } catch (e) {} setAuthed(true); };
  const logout = () => { try { localStorage.removeItem("yago_admin_auth"); } catch (e) {} setAuthed(false); };
  return authed ? <AdminApp onLogout={logout} /> : <Login onOk={login} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(<Gate />);
