#!/usr/bin/env python3
"""
YAGO MODAS — Atualização do catálogo
Uso: python3 scripts/atualizar-catalogo.py

O que esse script faz:
  1. Lê a planilha dados/catalogo-produtos.xls
  2. Filtra produtos com estoque e preço > 0
  3. Categoriza automaticamente por descrição
  4. Regenera catalogo/index.html

Como adicionar fotos:
  - Crie a pasta: catalogo/fotos/[CODIGO_DO_PRODUTO]/
  - Coloque até 3 fotos com os nomes: 1.jpg, 2.jpg, 3.jpg
  - Exemplo: catalogo/fotos/1826/1.jpg

Como incluir um produto novo:
  - Inclua na planilha dados/catalogo-produtos.xls com estoque e preço preenchidos
  - Rode esse script de novo

Como excluir um produto:
  - Zere o estoque ou o preço na planilha
  - Rode esse script de novo
  - O produto some do catálogo automaticamente

Como rodar:
  python3 scripts/atualizar-catalogo.py
"""

import xlrd, re, json, base64, os, sys
from collections import Counter

PLANILHA = 'dados/catalogo-produtos.xls'
LOGO     = 'marca/logo.png'
SAIDA    = 'catalogo/index.html'
WA       = '5527996683886'

TAMS_LETRA = ["PP","P","P2","M","G","G2","G3","G4","GG","GG2","GG3","GG4","GG5","XG","XGG","GGG"]
TAMS_NUM   = ["34","36","38","40","42","44","46","48","50","52","54","56","58","60","62","64"]
TAMS_INF   = ["2 ANOS","3 ANOS","4 ANOS","6 ANOS","8 ANOS","10 ANOS","12 ANOS","14 ANOS","16 ANOS"]

def extrair_tamanho(d):
    d = d.upper()
    m = re.search(r'\b([2-9]|1[0-6])\s*ANOS?\b', d)
    if m: return m.group(1) + ' ANOS'
    for t in ["XGG","XG","GGG","GG5","GG4","GG3","GG2","GG","G4","G3","G2","G","PP","P2","P","M"]:
        if re.search(r'\b' + t + r'\b', d): return t
    m = re.search(r'\b([3-6][0-9])\b', d)
    if m and 34 <= int(m.group(1)) <= 64: return m.group(1)
    return ''

def categorizar(d):
    d = d.upper()
    if any(x in d for x in ['PANELA','FRITADEIRA','LIQUIDIFIC','MICRO-ONDAS','APARELHO DE JANTAR',
                              'JOGO DE','PRATO','XÍCARA','XICARA','KIT BANHEIRO','TAPETE','TOALHA',
                              'TRAVESSEIRO','LENÇOL','LENCOL','COBERT','SABONETEIRA','UTENSÍLIO',
                              'UTENSILIO','MARMITA','AFIADOR','CUTELO','LAMPIÃO','LAMPIAO',
                              'CÂMERA','CAMERA','WELLMIX','LIQUIDIFICADOR','KIT UTENSÍLIO']): return 'Casa & Utensílios'
    if any(x in d for x in ['INFANT','BEBÊ','BEBE']) or re.search(r'\b([2-9]|1[0-6])\s*ANOS?\b', d): return 'Infantil'
    if any(x in d for x in ['CUECA','CALCINHA','SUTIÃ','SUTIA']): return 'Roupas Íntimas'
    if any(x in d for x in ['CALÇA JEANS','CALCA JEANS','JEANS']): return 'Calças Jeans'
    if 'CARGO' in d: return 'Calças Cargo'
    if 'SARUEL' in d: return 'Calças Saruel'
    if 'SARJA' in d: return 'Calças Sarja'
    if any(x in d for x in ['CALÇA','CALCA','CALCOLA']): return 'Calças'
    if any(x in d for x in ['BERMUDA','SHORT']): return 'Bermudas & Shorts'
    if 'VESTIDO' in d: return 'Vestidos'
    if 'SAIA' in d: return 'Saias'
    if any(x in d for x in ['BLUSA','CAMISETA','REGATA']): return 'Blusas & Camisetas'
    if 'CAMISA SOCIAL' in d: return 'Camisas Sociais'
    if any(x in d for x in ['CAMISA','GOLA POLO']): return 'Camisas'
    if any(x in d for x in ['CASACO','JAQUETA','MOLETOM']): return 'Casacos & Jaquetas'
    if any(x in d for x in ['CONJ','CONJUNTO']): return 'Conjuntos'
    return 'Outros'

def secao(d, grupo):
    d, g = d.upper(), grupo.upper()
    cat = categorizar(d)
    if cat == 'Casa & Utensílios': return 'casa'
    if cat == 'Infantil': return 'infantil'
    if g == 'FEMININO': return 'feminino'
    if g == 'MASCULINO': return 'masculino'
    if any(x in d for x in ['VESTIDO','SAIA','CALCINHA','BLUSA','CALCOLA']): return 'feminino'
    if any(x in d for x in ['CUECA','CAMISA SOCIAL']): return 'masculino'
    return 'geral'

def ler_produtos():
    if not os.path.exists(PLANILHA):
        print(f'ERRO: planilha não encontrada em {PLANILHA}')
        sys.exit(1)
    wb = xlrd.open_workbook(PLANILHA)
    ws = wb.sheet_by_index(0)
    produtos = []
    for r in range(6, ws.nrows):
        cod  = ws.cell_value(r, 0)
        desc = ws.cell_value(r, 6)
        grup = ws.cell_value(r, 12)
        qtd  = ws.cell_value(r, 18)
        prec = ws.cell_value(r, 23)
        if not cod or not desc or str(desc).strip() in ('', '3'): continue
        try:
            qtd = float(qtd); prec = float(prec); cod = int(float(cod))
        except: continue
        if qtd <= 0 or prec <= 0: continue
        desc = str(desc).strip()
        grupo = str(grup).strip()
        produtos.append({
            'cod': cod, 'desc': desc, 'grupo': grupo,
            'quant': int(qtd), 'preco': round(prec, 2),
            'cat': categorizar(desc),
            'sec': secao(desc, grupo),
            'tam': extrair_tamanho(desc)
        })
    return produtos

def gerar_html(produtos, logo_b64):
    produtos_js = json.dumps(produtos, ensure_ascii=False, separators=(',', ':'))
    tams_letra_js = json.dumps(TAMS_LETRA)
    tams_num_js = json.dumps(TAMS_NUM)
    tams_inf_js = json.dumps(TAMS_INF)

    return f'''<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<meta name="theme-color" content="#141414">
<title>Yago Modas — Catálogo</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*{{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}}
:root{{--bg:#141414;--surface:#1c1c1c;--surface2:#242424;--borda:#2e2e2e;
  --ouro:#C8A84B;--ouro-dk:#9e7e2a;--txt:#f0f0f0;--txt2:#aaa;--txt3:#666;--r:14px}}
html,body{{background:var(--bg);color:var(--txt);font-family:'Inter',sans-serif;min-height:100vh;overscroll-behavior-y:none}}

/* HEADER */
.hdr{{background:var(--surface);border-bottom:2px solid var(--ouro);padding:10px 14px;
  position:sticky;top:0;z-index:300;display:flex;align-items:center;gap:10px}}
.logo-img{{height:44px;width:44px;object-fit:contain;border-radius:8px;background:#fff;padding:2px;flex-shrink:0}}
.search-box{{flex:1;position:relative}}
.search-box input{{width:100%;padding:10px 38px 10px 14px;border-radius:10px;
  border:1.5px solid var(--borda);background:var(--surface2);color:var(--txt);
  font-size:15px;outline:none;font-family:inherit}}
.search-box input:focus{{border-color:var(--ouro)}}
.search-box input::placeholder{{color:var(--txt3)}}
.clr{{position:absolute;right:10px;top:50%;transform:translateY(-50%);color:var(--txt3);
  cursor:pointer;display:none;font-size:22px;line-height:1;background:none;border:none;padding:0}}

/* TRILHA */
.trilha{{display:flex;align-items:center;gap:5px;padding:10px 14px 0;
  font-size:12px;color:var(--txt3);flex-wrap:wrap;min-height:30px}}
.crumb{{cursor:pointer;color:var(--txt2);transition:color .2s}}
.crumb:hover{{color:var(--ouro)}}
.crumb.ativo{{color:var(--txt);font-weight:600;cursor:default}}
.sep{{color:var(--txt3)}}

/* TILES */
.sec-titulo{{padding:14px 14px 8px;font-size:10px;font-weight:700;letter-spacing:2px;color:var(--txt3);text-transform:uppercase}}
.tiles{{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:0 14px 16px}}
@media(min-width:480px){{.tiles{{grid-template-columns:repeat(3,1fr)}}}}
@media(min-width:700px){{.tiles{{grid-template-columns:repeat(5,1fr)}}}}
.tile{{background:var(--surface);border:1.5px solid var(--borda);border-radius:var(--r);
  padding:18px 10px;display:flex;flex-direction:column;align-items:center;
  justify-content:center;gap:7px;cursor:pointer;transition:all .2s;text-align:center;min-height:95px}}
.tile:active{{transform:scale(.97)}}
.tile:hover,.tile.ativo{{border-color:var(--ouro);background:#1d1b12}}
.tile-icon{{font-size:28px;line-height:1}}
.tile-label{{font-size:11px;font-weight:700;color:var(--txt2);letter-spacing:.5px;text-transform:uppercase}}
.tile-qtd{{font-size:10px;color:var(--txt3)}}

/* CHIPS CATEGORIA */
.chips-sec{{padding:0 14px 10px;display:none}}
.chips-sec.vis{{display:block}}
.chips-label{{font-size:10px;font-weight:700;letter-spacing:1.5px;color:var(--txt3);text-transform:uppercase;margin-bottom:8px}}
.chips-row{{display:flex;gap:6px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none}}
.chips-row::-webkit-scrollbar{{display:none}}
.chip{{white-space:nowrap;padding:9px 16px;border-radius:22px;border:1.5px solid var(--borda);
  background:transparent;color:var(--txt2);font-size:12px;font-weight:600;cursor:pointer;
  font-family:inherit;transition:all .15s}}
.chip.ativo{{background:var(--ouro);border-color:var(--ouro);color:#111;font-weight:800}}
.chip:active:not(.ativo){{background:var(--surface2)}}

/* TAMANHOS */
.tams-sec{{padding:0 14px 12px;display:none}}
.tams-sec.vis{{display:block}}
.tams-label{{font-size:10px;font-weight:700;letter-spacing:1.5px;color:var(--txt3);text-transform:uppercase;margin-bottom:8px}}
.tams-sub{{font-size:10px;color:var(--txt3);margin:6px 0}}
.tams-grupo{{display:flex;flex-wrap:wrap;gap:7px}}
.tam{{min-width:48px;padding:9px 8px;border-radius:9px;border:1.5px solid var(--borda);
  background:transparent;color:var(--txt2);font-size:12px;font-weight:700;cursor:pointer;
  font-family:inherit;transition:all .15s;text-align:center}}
.tam.ativo{{background:var(--ouro);border-color:var(--ouro);color:#111;font-weight:800}}
.tam:active:not(.ativo){{background:var(--surface2)}}

/* BARRA */
.barra{{display:flex;align-items:center;justify-content:space-between;padding:6px 14px 10px}}
.barra-txt{{font-size:12px;color:var(--txt3)}}
.barra-txt strong{{color:var(--ouro)}}
.btn-limpar{{font-size:11px;color:var(--txt3);background:none;border:none;cursor:pointer;font-family:inherit;text-decoration:underline;padding:4px;display:none}}

/* GRID */
.grid{{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:0 10px 120px}}
@media(min-width:540px){{.grid{{grid-template-columns:repeat(3,1fr)}}}}
@media(min-width:800px){{.grid{{grid-template-columns:repeat(4,1fr);padding:0 18px 120px}}}}

/* CARD */
.card{{background:var(--surface);border-radius:var(--r);overflow:hidden;border:1px solid var(--borda);display:flex;flex-direction:column}}
.card-foto{{position:relative;aspect-ratio:3/4;background:var(--surface2);overflow:hidden;touch-action:pan-y;user-select:none}}
.slides-inner{{display:flex;height:100%;transition:transform .28s cubic-bezier(.4,0,.2,1);will-change:transform}}
.slide{{flex:0 0 100%;height:100%}}
.slide img{{width:100%;height:100%;object-fit:cover;display:block;pointer-events:none}}
/* PLACEHOLDER */
.foto-ph{{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;
  justify-content:center;gap:8px;background:var(--surface2)}}
.foto-ph .ph-icon{{width:36px;height:36px;opacity:.25}}
.foto-ph .ph-txt{{font-size:11px;color:var(--txt3)}}
/* badges */
.badge-tam{{position:absolute;top:8px;left:8px;background:rgba(0,0,0,.82);color:var(--ouro);
  font-size:10px;font-weight:800;padding:3px 8px;border-radius:6px;letter-spacing:.5px;z-index:3}}
.badge-sec{{position:absolute;top:8px;right:8px;font-size:9px;font-weight:700;
  padding:3px 7px;border-radius:5px;text-transform:uppercase;letter-spacing:.5px;z-index:3}}
.badge-sec.feminino{{background:rgba(100,20,70,.85);color:#f0c0d8}}
.badge-sec.masculino{{background:rgba(10,40,90,.85);color:#a0c0f0}}
.badge-sec.infantil{{background:rgba(10,70,30,.85);color:#a0e0b0}}
/* dots */
.foto-dots{{position:absolute;bottom:0;left:0;right:0;display:flex;justify-content:center;gap:5px;
  padding:10px 8px;background:linear-gradient(transparent,rgba(0,0,0,.55));z-index:3}}
.dot{{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.3);transition:all .2s;cursor:pointer}}
.dot.ativo{{background:var(--ouro);width:14px;border-radius:3px}}

/* CARD INFO */
.card-info{{padding:10px 11px 11px;display:flex;flex-direction:column;gap:4px;flex:1}}
.card-cod{{font-size:10px;color:var(--txt3)}}
.card-nome{{font-size:12px;color:var(--txt2);line-height:1.35;flex:1;min-height:30px}}
.card-preco{{font-size:17px;font-weight:800;color:var(--txt);margin-top:2px}}
.card-preco small{{font-size:10px;font-weight:400;color:var(--txt3)}}
.card-acoes{{display:flex;gap:6px;margin-top:6px}}
.btn-cart{{flex:0 0 44px;height:40px;border-radius:9px;border:1.5px solid var(--borda);
  background:transparent;color:var(--txt2);cursor:pointer;display:flex;align-items:center;
  justify-content:center;transition:all .2s;font-family:inherit}}
.btn-cart:active,.btn-cart.adicionado{{background:var(--ouro);border-color:var(--ouro);color:#111}}
.btn-cart svg{{width:18px;height:18px;fill:currentColor}}
.btn-wa{{flex:1;height:40px;border-radius:9px;border:none;background:var(--ouro);
  color:#111;font-weight:800;font-size:12px;cursor:pointer;font-family:inherit;
  display:flex;align-items:center;justify-content:center;gap:5px}}
.btn-wa:active{{opacity:.8}}
.btn-wa svg{{width:14px;height:14px;fill:#111}}

/* VAZIO */
.vazio{{grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--txt3)}}
.vazio p{{margin-top:10px;font-size:13px}}

/* ── CARRINHO FAB ── */
.fab-cart{{position:fixed;bottom:70px;right:16px;z-index:400;
  width:56px;height:56px;border-radius:50%;background:var(--ouro);
  border:none;cursor:pointer;display:none;align-items:center;justify-content:center;
  box-shadow:0 4px 20px rgba(0,0,0,.5);transition:transform .2s}}
.fab-cart.vis{{display:flex}}
.fab-cart:active{{transform:scale(.92)}}
.fab-cart svg{{width:24px;height:24px;fill:#111}}
.fab-badge{{position:absolute;top:-4px;right:-4px;background:#e53;color:#fff;
  font-size:11px;font-weight:800;min-width:20px;height:20px;border-radius:10px;
  display:flex;align-items:center;justify-content:center;padding:0 4px}}

/* ── DRAWER CARRINHO ── */
.cart-overlay{{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:500;display:none;opacity:0;transition:opacity .3s}}
.cart-overlay.vis{{display:block;opacity:1}}
.cart-drawer{{position:fixed;bottom:0;left:0;right:0;z-index:501;
  background:var(--surface);border-radius:20px 20px 0 0;
  max-height:80vh;display:flex;flex-direction:column;
  transform:translateY(100%);transition:transform .3s cubic-bezier(.4,0,.2,1)}}
.cart-drawer.vis{{transform:translateY(0)}}
.cart-hdr{{padding:16px 16px 12px;display:flex;align-items:center;justify-content:space-between;
  border-bottom:1px solid var(--borda)}}
.cart-titulo{{font-size:15px;font-weight:700}}
.cart-close{{background:none;border:none;color:var(--txt3);cursor:pointer;font-size:24px;line-height:1;padding:0}}
.cart-lista{{overflow-y:auto;flex:1;padding:12px 16px}}
.cart-item{{display:flex;align-items:flex-start;gap:10px;padding:10px 0;border-bottom:1px solid var(--borda)}}
.cart-item:last-child{{border-bottom:none}}
.cart-item-info{{flex:1;min-width:0}}
.cart-item-cod{{font-size:10px;color:var(--txt3)}}
.cart-item-nome{{font-size:12px;color:var(--txt2);line-height:1.3;word-break:break-word}}
.cart-item-preco{{font-size:14px;font-weight:700;color:var(--txt);margin-top:3px}}
.cart-item-tam{{font-size:10px;color:var(--ouro);font-weight:700}}
.btn-rm{{background:none;border:none;color:var(--txt3);cursor:pointer;font-size:20px;line-height:1;
  padding:4px;flex-shrink:0;transition:color .2s}}
.btn-rm:hover{{color:#e53}}
.cart-footer{{padding:14px 16px;border-top:1px solid var(--borda)}}
.cart-total{{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}}
.cart-total-label{{font-size:13px;color:var(--txt2)}}
.cart-total-val{{font-size:18px;font-weight:800;color:var(--ouro)}}
.btn-enviar-wa{{width:100%;padding:14px;background:var(--ouro);color:#111;border:none;border-radius:12px;
  font-weight:800;font-size:14px;cursor:pointer;font-family:inherit;
  display:flex;align-items:center;justify-content:center;gap:8px}}
.btn-enviar-wa svg{{width:18px;height:18px;fill:#111}}
.btn-enviar-wa:active{{opacity:.8}}
.cart-vazio{{text-align:center;padding:40px 20px;color:var(--txt3);font-size:13px}}

/* FOOTER */
.footer{{position:fixed;bottom:0;left:0;right:0;background:var(--surface);
  border-top:1px solid var(--borda);padding:10px 16px;text-align:center;font-size:11px;color:var(--txt3)}}
.footer b{{color:var(--ouro)}}
</style>
</head>
<body>

<div class="hdr">
  <img class="logo-img" src="data:image/png;base64,{logo_b64}" alt="Yago Modas">
  <div class="search-box">
    <input type="search" id="busca" placeholder="Buscar produto ou código..." oninput="onBusca()" autocomplete="off">
    <button class="clr" id="clr" onclick="limparBusca()">×</button>
  </div>
</div>

<div class="trilha" id="trilha"></div>

<div id="tela-inicio">
  <div class="sec-titulo">O que você procura?</div>
  <div class="tiles" id="tiles"></div>
</div>

<div id="tela-filtros" style="display:none">
  <div class="chips-sec" id="chips-wrap">
    <div class="chips-label">Tipo de produto</div>
    <div class="chips-row" id="chips-row"></div>
  </div>
  <div class="tams-sec" id="tams-sec">
    <div class="tams-label">Tamanho</div>
    <div class="tams-grupo" id="tams-letra"></div>
    <div id="tams-num-w"><div class="tams-sub">Numeração</div><div class="tams-grupo" id="tams-num"></div></div>
    <div id="tams-inf-w"><div class="tams-sub">Infantil</div><div class="tams-grupo" id="tams-inf"></div></div>
  </div>
  <div class="barra">
    <span class="barra-txt" id="barra-txt"></span>
    <button class="btn-limpar" id="btn-limpar" onclick="limparFiltros()">Limpar filtros</button>
  </div>
  <div class="grid" id="grid"></div>
</div>

<!-- FAB CARRINHO -->
<button class="fab-cart" id="fab-cart" onclick="abrirCart()">
  <svg viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/></svg>
  <span class="fab-badge" id="fab-badge">0</span>
</button>

<!-- OVERLAY + DRAWER -->
<div class="cart-overlay" id="cart-overlay" onclick="fecharCart()"></div>
<div class="cart-drawer" id="cart-drawer">
  <div class="cart-hdr">
    <span class="cart-titulo">🛒 Meu carrinho</span>
    <button class="cart-close" onclick="fecharCart()">×</button>
  </div>
  <div class="cart-lista" id="cart-lista"></div>
  <div class="cart-footer">
    <div class="cart-total">
      <span class="cart-total-label">Total estimado</span>
      <span class="cart-total-val" id="cart-total">R$ 0,00</span>
    </div>
    <button class="btn-enviar-wa" onclick="enviarWA()">
      <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.845L.057 23.625a.75.75 0 0 0 .922.899l5.919-1.53A11.955 11.955 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.99 0-3.85-.575-5.42-1.57l-.39-.24-4.02 1.04 1.06-3.93-.25-.4A9.964 9.964 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
      Reservar todos via WhatsApp
    </button>
  </div>
</div>

<div class="footer">Yago Modas &middot; <b>A loja que vai até você</b></div>

<script>
const WA='{WA}';
const PRODS={produtos_js};
const TAMS_LETRA={tams_letra_js};
const TAMS_NUM={tams_num_js};
const TAMS_INF={tams_inf_js};
const SECOES=[
  {{id:'feminino',label:'Feminino',icon:'👗'}},
  {{id:'masculino',label:'Masculino',icon:'👕'}},
  {{id:'infantil',label:'Infantil',icon:'🧒'}},
  {{id:'casa',label:'Casa',icon:'🏠'}},
  {{id:'geral',label:'Geral',icon:'🛍️'}}
];

let E={{sec:'',cat:'',tam:'',busca:''}};
let CART={{}};  // cod -> produto

/* ── TILES ── */
function initTiles(){{
  document.getElementById('tiles').innerHTML=SECOES.map(s=>{{
    const n=PRODS.filter(p=>p.sec===s.id).length;
    return `<div class="tile" onclick="setSec('${{s.id}}')">
      <div class="tile-icon">${{s.icon}}</div>
      <div class="tile-label">${{s.label}}</div>
      <div class="tile-qtd">${{n}} produtos</div></div>`;
  }}).join('');
}}

function setSec(sec){{
  E={{sec,cat:'',tam:'',busca:''}};
  document.getElementById('busca').value='';
  document.getElementById('clr').style.display='none';
  document.getElementById('tela-inicio').style.display='none';
  document.getElementById('tela-filtros').style.display='';
  renderCats();renderTams();renderGrid();renderTrilha();
}}

/* ── CATEGORIAS ── */
function renderCats(){{
  const cats=[...new Set(PRODS.filter(p=>p.sec===E.sec).map(p=>p.cat))].sort();
  const wrap=document.getElementById('chips-wrap');
  const row=document.getElementById('chips-row');
  if(!cats.length){{wrap.classList.remove('vis');return;}}
  wrap.classList.add('vis');
  row.innerHTML=`<button class="chip ${{!E.cat?'ativo':''}}" onclick="setCat('')">Todos</button>`+
    cats.map(c=>`<button class="chip ${{E.cat===c?'ativo':''}}" onclick="setCat('${{c.replace(/'/g,"\\'")}}')">${{c}}</button>`).join('');
}}
function setCat(cat){{E.cat=cat;E.tam='';renderCats();renderTams();renderGrid();renderTrilha();updateLimpar();}}

/* ── TAMANHOS ── */
function renderTams(){{
  const tams=new Set(PRODS.filter(p=>p.sec===E.sec&&(!E.cat||p.cat===E.cat)&&p.tam).map(p=>p.tam));
  const sec=document.getElementById('tams-sec');
  if(!tams.size){{sec.classList.remove('vis');return;}}
  sec.classList.add('vis');
  const mk=(arr,id,wid)=>{{
    const f=arr.filter(t=>tams.has(t));
    if(wid)document.getElementById(wid).style.display=f.length?'':'none';
    document.getElementById(id).innerHTML=f.map(t=>
      `<button class="tam ${{E.tam===t?'ativo':''}}" onclick="setTam('${{t}}')">${{t}}</button>`).join('');
  }};
  mk(TAMS_LETRA,'tams-letra',null);
  mk(TAMS_NUM,'tams-num','tams-num-w');
  mk(TAMS_INF,'tams-inf','tams-inf-w');
}}
function setTam(t){{E.tam=E.tam===t?'':t;renderTams();renderGrid();renderTrilha();updateLimpar();}}

/* ── BUSCA ── */
function onBusca(){{
  E.busca=document.getElementById('busca').value.toLowerCase().trim();
  document.getElementById('clr').style.display=E.busca?'':'none';
  if(E.busca&&!E.sec){{
    document.getElementById('tela-inicio').style.display='none';
    document.getElementById('tela-filtros').style.display='';
    document.getElementById('chips-wrap').classList.remove('vis');
    document.getElementById('tams-sec').classList.remove('vis');
  }}
  renderGrid();renderTrilha();
}}
function limparBusca(){{
  document.getElementById('busca').value='';
  document.getElementById('clr').style.display='none';
  E.busca='';
  if(!E.sec){{document.getElementById('tela-inicio').style.display='';document.getElementById('tela-filtros').style.display='none';}}
  renderGrid();renderTrilha();
}}
function limparFiltros(){{E.cat='';E.tam='';renderCats();renderTams();renderGrid();renderTrilha();updateLimpar();}}
function updateLimpar(){{document.getElementById('btn-limpar').style.display=(E.cat||E.tam)?'':'none';}}

/* ── TRILHA ── */
function renderTrilha(){{
  const p=[];
  p.push(`<span class="crumb" onclick="voltarInicio()">Início</span>`);
  if(E.sec){{
    const s=SECOES.find(x=>x.id===E.sec);
    p.push(`<span class="sep">›</span><span class="crumb ${{!E.cat?'ativo':''}}" onclick="setSec('${{E.sec}}')">${{s.icon}} ${{s.label}}</span>`);
  }}
  if(E.cat)p.push(`<span class="sep">›</span><span class="crumb ${{!E.tam?'ativo':''}}" onclick="setCat('${{E.cat.replace(/'/g,"\\'")}}')">${{E.cat}}</span>`);
  if(E.tam)p.push(`<span class="sep">›</span><span class="crumb ativo">Tam. ${{E.tam}}</span>`);
  if(E.busca&&!E.sec)p.push(`<span class="sep">›</span><span class="crumb ativo">Busca: "${{E.busca}}"</span>`);
  document.getElementById('trilha').innerHTML=p.join('');
}}
function voltarInicio(){{
  E={{sec:'',cat:'',tam:'',busca:''}};
  document.getElementById('busca').value='';
  document.getElementById('clr').style.display='none';
  document.getElementById('tela-inicio').style.display='';
  document.getElementById('tela-filtros').style.display='none';
  renderTrilha();
}}

/* ── GRID ── */
const WA_SVG=`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.845L.057 23.625a.75.75 0 0 0 .922.899l5.919-1.53A11.955 11.955 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.99 0-3.85-.575-5.42-1.57l-.39-.24-4.02 1.04 1.06-3.93-.25-.4A9.964 9.964 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>`;
const CART_SVG=`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/></svg>`;

function renderGrid(){{
  const lista=PRODS.filter(p=>{{
    if(E.sec&&p.sec!==E.sec)return false;
    if(E.cat&&p.cat!==E.cat)return false;
    if(E.tam&&p.tam!==E.tam)return false;
    if(E.busca&&!p.desc.toLowerCase().includes(E.busca)&&!String(p.cod).includes(E.busca))return false;
    return true;
  }});
  document.getElementById('barra-txt').innerHTML=`<strong>${{lista.length}}</strong> produto${{lista.length!==1?'s':''}}`;
  const grid=document.getElementById('grid');
  if(!lista.length){{
    grid.innerHTML=`<div class="vazio"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--borda)" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg><p>Nenhum produto encontrado</p></div>`;
    return;
  }}
  grid.innerHTML=lista.map(p=>{{
    const tamBadge=p.tam?`<span class="badge-tam">${{p.tam}}</span>`:'';
    const secBadge=p.sec&&p.sec!=='geral'
      ?`<span class="badge-sec ${{p.sec}}">${{{{feminino:'Fem',masculino:'Masc',infantil:'Inf',casa:'Casa'}}[p.sec]}}</span>`:'';
    const inCart=!!CART[p.cod];
    const msg=encodeURIComponent(`Olá! Quero reservar:\\nCód: ${{p.cod}} — ${{p.desc}}\\nR$ ${{p.preco.toFixed(2)}}`);
    return `<div class="card">
      <div class="card-foto" id="fw${{p.cod}}" data-cod="${{p.cod}}" data-idx="0" data-total="3">
        <div class="slides-inner" id="si${{p.cod}}">
          <div class="slide"><img src="fotos/${{p.cod}}/1.jpg" loading="lazy" alt="${{p.desc}}" onerror="onImgErr(this)"></div>
          <div class="slide"><img src="fotos/${{p.cod}}/2.jpg" loading="lazy" alt="${{p.desc}}" onerror="onImgErr(this)"></div>
          <div class="slide"><img src="fotos/${{p.cod}}/3.jpg" loading="lazy" alt="${{p.desc}}" onerror="onImgErr(this)"></div>
        </div>
        <div class="foto-ph" id="ph${{p.cod}}" style="display:none">
          <svg class="ph-icon" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.2">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21,15 16,10 5,21"/>
          </svg>
          <span class="ph-txt">Foto em breve</span>
        </div>
        ${{tamBadge}}${{secBadge}}
        <div class="foto-dots" id="dots${{p.cod}}">
          <span class="dot ativo"></span><span class="dot"></span><span class="dot"></span>
        </div>
      </div>
      <div class="card-info">
        <div class="card-cod">Cód. ${{p.cod}}</div>
        <div class="card-nome">${{p.desc}}</div>
        <div class="card-preco">R$ ${{p.preco.toFixed(2)}} <small>/ un</small></div>
        <div class="card-acoes">
          <button class="btn-cart ${{inCart?'adicionado':''}}" id="bc${{p.cod}}" onclick="toggleCart(${{p.cod}})" title="Adicionar ao carrinho">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              ${{inCart?'':'<line x1="12" y1="9" x2="12" y2="15"/><line x1="9" y1="12" x2="15" y2="12"/>'}}
            </svg>
          </button>
          <button class="btn-wa" onclick="window.open('https://wa.me/${{WA}}?text=${{msg}}','_blank')">
            ${{WA_SVG}} Reservar
          </button>
        </div>
      </div>
    </div>`;
  }}).join('');
  document.querySelectorAll('.card-foto').forEach(initSwipe);
}}

/* ── PHOTO ERROR — captura fw ANTES de remover ── */
function onImgErr(img){{
  const fw=img.closest('.card-foto');
  const slide=img.parentElement;
  slide.remove();
  if(fw){{
    const total=fw.querySelectorAll('.slide').length;
    fw.dataset.total=total;
    if(total===0){{
      document.getElementById('ph'+fw.dataset.cod).style.display='flex';
      const dotsEl=document.getElementById('dots'+fw.dataset.cod);
      if(dotsEl)dotsEl.style.display='none';
    }}else{{
      goToSlide(fw,Math.min(parseInt(fw.dataset.idx)||0,total-1));
    }}
  }}
}}

/* ── SWIPE ── */
function getSlides(fw){{return fw.querySelector('.slides-inner').children;}}
function goToSlide(fw,idx){{
  const slides=getSlides(fw);const n=slides.length;
  if(!n)return;
  idx=Math.max(0,Math.min(idx,n-1));
  fw.dataset.idx=idx;
  fw.querySelector('.slides-inner').style.transform=`translateX(-${{idx*100}}%)`;
  syncDots(fw);
}}
function syncDots(fw){{
  const n=getSlides(fw).length;
  const idx=parseInt(fw.dataset.idx)||0;
  const dotsEl=document.getElementById('dots'+fw.dataset.cod);
  if(!dotsEl)return;
  const dots=dotsEl.querySelectorAll('.dot');
  dots.forEach((d,i)=>{{d.style.display=i<n?'':'none';d.classList.toggle('ativo',i===idx);}});
}}
function initSwipe(fw){{
  let x0=null,dragging=false,dx=0,t0;
  const inner=fw.querySelector('.slides-inner');
  fw.addEventListener('touchstart',e=>{{x0=e.touches[0].clientX;t0=Date.now();dragging=true;dx=0;inner.style.transition='none';}},{{passive:true}});
  fw.addEventListener('touchmove',e=>{{
    if(!dragging)return;
    dx=e.touches[0].clientX-x0;
    const idx=parseInt(fw.dataset.idx)||0;
    inner.style.transform=`translateX(calc(-${{idx*100}}% + ${{dx}}px))`;
  }},{{passive:true}});
  fw.addEventListener('touchend',()=>{{
    if(!dragging)return;
    inner.style.transition='';dragging=false;
    const idx=parseInt(fw.dataset.idx)||0;
    const n=getSlides(fw).length;
    const fast=Date.now()-t0<250;
    if(Math.abs(dx)>50||(Math.abs(dx)>20&&fast))goToSlide(fw,dx<0?Math.min(idx+1,n-1):Math.max(idx-1,0));
    else goToSlide(fw,idx);
    x0=null;dx=0;
  }});
  fw.addEventListener('click',()=>{{
    if(Math.abs(dx)>5)return;
    const idx=parseInt(fw.dataset.idx)||0;
    const n=getSlides(fw).length;
    if(n>1)goToSlide(fw,(idx+1)%n);
  }});
  syncDots(fw);
}}

/* ── CARRINHO ── */
function toggleCart(cod){{
  const p=PRODS.find(x=>x.cod===cod);if(!p)return;
  if(CART[cod]){{delete CART[cod];}}else{{CART[cod]=p;}}
  updateCartUI();
  // Feedback visual no botão
  const btn=document.getElementById('bc'+cod);
  if(btn){{btn.classList.toggle('adicionado',!!CART[cod]);}}
}}
function updateCartUI(){{
  const n=Object.keys(CART).length;
  const fab=document.getElementById('fab-cart');
  document.getElementById('fab-badge').textContent=n;
  fab.classList.toggle('vis',n>0);
}}
function abrirCart(){{
  renderCartLista();
  document.getElementById('cart-overlay').classList.add('vis');
  document.getElementById('cart-drawer').classList.add('vis');
  document.body.style.overflow='hidden';
}}
function fecharCart(){{
  document.getElementById('cart-overlay').classList.remove('vis');
  document.getElementById('cart-drawer').classList.remove('vis');
  document.body.style.overflow='';
}}
function renderCartLista(){{
  const itens=Object.values(CART);
  const lista=document.getElementById('cart-lista');
  if(!itens.length){{lista.innerHTML='<div class="cart-vazio">Nenhum produto no carrinho</div>';document.getElementById('cart-total').textContent='R$ 0,00';return;}}
  const total=itens.reduce((s,p)=>s+p.preco,0);
  document.getElementById('cart-total').textContent='R$ '+total.toFixed(2).replace('.',',');
  lista.innerHTML=itens.map(p=>`
    <div class="cart-item">
      <div class="cart-item-info">
        <div class="cart-item-cod">Cód. ${{p.cod}}${{p.tam?' · '+p.tam:''}}</div>
        <div class="cart-item-nome">${{p.desc}}</div>
        <div class="cart-item-preco">R$ ${{p.preco.toFixed(2)}}</div>
      </div>
      <button class="btn-rm" onclick="rmCart(${{p.cod}})">×</button>
    </div>`).join('');
}}
function rmCart(cod){{
  delete CART[cod];
  updateCartUI();renderCartLista();
  const btn=document.getElementById('bc'+cod);
  if(btn)btn.classList.remove('adicionado');
}}
function enviarWA(){{
  const itens=Object.values(CART);if(!itens.length)return;
  const total=itens.reduce((s,p)=>s+p.preco,0);
  let msg='Olá! Gostaria de reservar os seguintes produtos:\\n\\n';
  itens.forEach((p,i)=>{{msg+=`${{i+1}}. Cód. ${{p.cod}} — ${{p.desc}}${{p.tam?' ('+p.tam+')':''}} — R$ ${{p.preco.toFixed(2)}}\\n`;}});
  msg+=`\\nTotal estimado: R$ ${{total.toFixed(2)}}`;
  window.open('https://wa.me/${{WA}}?text='+encodeURIComponent(msg),'_blank');
}}

initTiles();
</script>
</body>
</html>'''

def main():
    print('Yago Modas — Atualizando catálogo...')
    print(f'Lendo: {PLANILHA}')
    produtos = ler_produtos()
    print(f'Produtos válidos: {len(produtos)}')

    if not os.path.exists(LOGO):
        print(f'AVISO: logo não encontrada em {LOGO}')
        logo_b64 = ''
    else:
        with open(LOGO, 'rb') as f:
            logo_b64 = base64.b64encode(f.read()).decode()

    cats = Counter(p['cat'] for p in produtos)
    secs = Counter(p['sec'] for p in produtos)
    print('\nSeções:')
    for sec, n in sorted(secs.items(), key=lambda x: -x[1]):
        print(f'  {sec}: {n}')

    html = gerar_html(produtos, logo_b64)
    os.makedirs('catalogo', exist_ok=True)
    with open(SAIDA, 'w', encoding='utf-8') as f:
        f.write(html)

    size_kb = os.path.getsize(SAIDA) // 1024
    print(f'\nCatálogo gerado: {SAIDA} ({size_kb} KB)')

    # Resumo de fotos
    fotos_dir = 'catalogo/fotos'
    if os.path.exists(fotos_dir):
        com_foto = sum(1 for p in produtos if os.path.exists(f'{fotos_dir}/{p["cod"]}/1.jpg'))
        sem_foto = len(produtos) - com_foto
        print(f'Produtos com foto: {com_foto} | Sem foto: {sem_foto}')
    else:
        print(f'Pasta de fotos ainda vazia: {fotos_dir}/')
        print('  → Crie: catalogo/fotos/[CODIGO]/1.jpg')

    print('\nPronto! Abra catalogo/index.html no navegador para visualizar.')

if __name__ == '__main__':
    main()
