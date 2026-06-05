#!/usr/bin/env python3
"""
Converte catalogo-produtos.xls -> catalogo/data.js
Agrupa SKUs por produto base, extrai tamanhos dos nomes.
"""

import xlrd
import re
import json
import os

XLS = os.path.join(os.path.dirname(__file__), '../dados/catalogo-produtos.xls')
OUT = os.path.join(os.path.dirname(__file__), '../catalogo/data.js')

# Mapeamento de tamanhos normalizados
SIZE_MAP = {
    'P': 'P', 'M': 'M', 'G': 'G',
    'G1': 'G2', 'G2': 'G3', 'G3': 'G4', 'G4': 'G4', 'G5': 'G4', 'G6': 'G4',
    'GG': 'GG', 'XG': 'XG',
    '36': '36', '38': '38', '40': '40', '42': '42',
    '44': '44', '46': '46', '48': '48', '50': '50', '52': '52',
}

# Padrão de tamanho no final do nome
SIZE_RE = re.compile(
    r'(?:[-\s]+)(P|M|G{1,3}|XG|G[1-6]|N\s*\d{2}|\d{2})(?:\s*[-\s].*)?$',
    re.IGNORECASE
)

# Remover REF e código no final
CLEAN_RE = re.compile(r'\s*[-–]\s*REF\.?:?\s*[\w\d]+\s*$', re.IGNORECASE)

def title_case(s):
    lower_words = {'e', 'de', 'da', 'do', 'das', 'dos', 'com', 'em', 'a', 'o', 'as', 'os'}
    words = s.lower().split()
    result = []
    for i, w in enumerate(words):
        if i == 0 or w not in lower_words:
            result.append(w.capitalize())
        else:
            result.append(w)
    return ' '.join(result)

def detect_subcategory(name, cat):
    n = name.upper()
    if cat == 'FEM':
        if any(x in n for x in ['VESTIDO']): return 'Vestidos'
        if any(x in n for x in ['CALÇA JEANS', 'JEANS', 'DENIM']): return 'Calças Jeans'
        if any(x in n for x in ['SAIA']): return 'Saias'
        if any(x in n for x in ['CONJUNTO']): return 'Conjuntos'
        if any(x in n for x in ['JAQUETA', 'CASACO', 'BLASER', 'BLAZER']): return 'Casacos & Jaquetas'
        if any(x in n for x in ['CALCINHA', 'SUTIA', 'SUTIÃ', 'ÍNTIMA', 'INTIMA']): return 'Roupas Íntimas'
        if any(x in n for x in ['BERMUDA', 'SHORT']): return 'Bermudas & Shorts'
        if any(x in n for x in ['CALÇA', 'CALCA', 'LEGGING']): return 'Calças'
        if any(x in n for x in ['BLUSA', 'CAMISETA', 'CROPPED', 'CAMISA', 'REGATA', 'BODY', 'TOP']): return 'Blusas & Camisetas'
        return 'Blusas & Camisetas'
    elif cat == 'MASC':
        if any(x in n for x in ['CUECA', 'BOX', 'BOXER']): return 'Cuecas'
        if any(x in n for x in ['CALÇA JEANS', 'JEANS', 'DENIM']): return 'Calças Jeans'
        if any(x in n for x in ['BERMUDA', 'SHORT']): return 'Bermudas & Shorts'
        if any(x in n for x in ['CONJUNTO']): return 'Conjuntos'
        if any(x in n for x in ['JAQUETA', 'CASACO', 'CORTA']): return 'Casacos & Jaquetas'
        if any(x in n for x in ['CALÇA', 'CALCA', 'JOGGER', 'MOLETOM']): return 'Calças'
        if any(x in n for x in ['CAMISETA', 'REGATA', 'POLO']): return 'Camisetas'
        if any(x in n for x in ['CAMISA']): return 'Camisas'
        return 'Camisetas'
    elif cat == 'INF':
        if any(x in n for x in ['CONJUNTO']): return 'Conjuntos'
        if any(x in n for x in ['VESTIDO']): return 'Vestidos'
        if any(x in n for x in ['BERMUDA', 'SHORT']): return 'Bermudas & Shorts'
        if any(x in n for x in ['CALÇA', 'CALCA', 'LEGGING']): return 'Calças'
        return 'Camisetas'
    else:
        return 'Ofertas'

def extract_size_and_base(name):
    # Limpar REF. no final
    name = CLEAN_RE.sub('', name).strip()
    # Tentar extrair tamanho
    m = SIZE_RE.search(name)
    if m:
        raw_size = m.group(1).strip().upper().replace('N ', '').replace('N', '')
        size = SIZE_MAP.get(raw_size, raw_size)
        base = name[:m.start()].strip(' -–')
        return base, size
    return name, None

def map_cat(grupo, name):
    n = name.upper()
    if grupo == 'FEMININO':
        return 'FEM'
    elif grupo == 'MASCULINO':
        if 'INFANTIL' in n:
            return 'INF'
        return 'MASC'
    else:
        # GERAL: tentar classificar roupas
        clothing_kw = ['BLUSA','CAMISA','CAMISETA','CALCA','CALÇA','BERMUDA','SHORT',
                       'VESTIDO','SAIA','CONJUNTO','JAQUETA','CASACO','LEGGING',
                       'CUECA','BOX','CALCINHA','SUTIÃ','CROPPED','REGATA','POLO',
                       'JEANS','SHORTS']
        if any(kw in n for kw in clothing_kw):
            if 'INFANTIL' in n:
                return 'INF'
            if any(x in n for x in ['CALCINHA', 'SUTIÃ', 'VESTIDO', 'BLUSA', 'SAIA']):
                return 'FEM'
            return 'MASC'
        return 'SAC'

# ─── Leitura ─────────────────────────────────────────────────────────────
wb = xlrd.open_workbook(XLS)
sh = wb.sheet_by_index(0)

# Agrupar SKUs por (base_name, cat) → coletar tamanhos e pegar maior preço
groups = {}  # key: (base_name, cat) → {sizes: set, price: float, sub: str, code: str}

for i in range(6, sh.nrows):
    row = sh.row_values(i)
    raw_name = str(row[6]).strip()
    if not raw_name or raw_name in ('nan', '', '3'):
        continue

    grupo = str(row[12]).strip()
    if not grupo:
        continue

    try:
        stock = float(row[18]) if row[18] != '' else 0
    except:
        stock = 0
    if stock <= 0:
        continue

    try:
        price = float(row[23]) if row[23] != '' else 0
    except:
        price = 0
    if price <= 0:
        continue

    prod_code = str(int(row[0])) if row[0] else ''
    cat = map_cat(grupo, raw_name)
    base, size = extract_size_and_base(raw_name)
    base_clean = title_case(base)

    key = (base_clean, cat)
    if key not in groups:
        sub = detect_subcategory(base_clean, cat)
        groups[key] = {'sizes': set(), 'price': price, 'sub': sub, 'code': prod_code}
    else:
        groups[key]['price'] = max(groups[key]['price'], price)

    if size:
        groups[key]['sizes'].add(size)

# ─── Ordenar tamanhos ─────────────────────────────────────────────────────
SIZE_ORDER = ['P','M','G','G2','G3','G4','GG','XG','36','38','40','42','44','46','48','50','52']

def sort_sizes(sizes):
    ordered = [s for s in SIZE_ORDER if s in sizes]
    rest = sorted(s for s in sizes if s not in SIZE_ORDER)
    return ordered + rest

# ─── Montar lista de produtos ─────────────────────────────────────────────
items = []
for (name, cat), data in groups.items():
    sizes = sort_sizes(data['sizes'])
    if not sizes:
        sizes = ['Único']
    items.append({
        'name': name,
        'cat': cat,
        'sub': data['sub'],
        'price': round(data['price'], 2),
        'sizes': sizes,
        'code': data['code'],
    })

# Ordenar por categoria depois nome
CAT_ORDER = {'FEM': 0, 'MASC': 1, 'INF': 2, 'SAC': 3}
items.sort(key=lambda x: (CAT_ORDER.get(x['cat'], 9), x['name']))

# Gerar IDs
for idx, p in enumerate(items):
    p['id'] = p['cat'] + '-' + str(idx + 1)

# Stats
from collections import Counter
cat_counts = Counter(p['cat'] for p in items)
print(f"Produtos gerados: {len(items)}")
for cat, n in sorted(cat_counts.items()):
    print(f"  {cat}: {n}")

# ─── Gerar data.js ────────────────────────────────────────────────────────
items_js = json.dumps(items, ensure_ascii=False, indent=2)

js = f"""/* Yago Modas — dados do catálogo (gerado automaticamente de catalogo-produtos.xls) */
(function () {{
  const CATS = [
    {{ id: "FEM",  label: "Feminino",  ico: "dress" }},
    {{ id: "MASC", label: "Masculino", ico: "shirt" }},
    {{ id: "INF",  label: "Infantil",  ico: "baby" }},
    {{ id: "SAC",  label: "Utensílios", ico: "bag", sub: "Achadinhos & ofertas" }},
  ];

  const SUBS = {{
    FEM:  ["Todos","Blusas & Camisetas","Vestidos","Calças Jeans","Calças","Saias","Bermudas & Shorts","Conjuntos","Casacos & Jaquetas","Roupas Íntimas"],
    MASC: ["Todos","Camisas","Camisetas","Calças Jeans","Bermudas & Shorts","Calças","Casacos & Jaquetas","Cuecas"],
    INF:  ["Todos","Conjuntos","Camisetas","Vestidos","Bermudas & Shorts","Calças"],
    SAC:  ["Todos","Acessórios","Meias & Íntimas","Ofertas"],
  }};

  const SIZES = ["P","M","G","G2","G3","G4","GG","XG"];
  const NUMS  = ["36","38","40","42","44","46","48"];

  const ITEMS = {items_js};

  window.YAGO = {{
    CATS, SUBS, SIZES, NUMS, ITEMS,
    WHATSAPP: "5527996683886",
  }};
}})();
"""

with open(OUT, 'w', encoding='utf-8') as f:
    f.write(js)

print(f"\nArquivo gerado: {OUT}")
