/* Yago Modas — dados do catálogo (gerado automaticamente de catalogo-produtos.xls) */
(function () {
  const CATS = [
    { id: "FEM",  label: "Feminino",  ico: "dress" },
    { id: "MASC", label: "Masculino", ico: "shirt" },
    { id: "INF",  label: "Infantil",  ico: "baby" },
    { id: "SAC",  label: "Utensílios", ico: "bag", sub: "Achadinhos & ofertas" },
  ];

  const SUBS = {
    FEM:  ["Todos","Blusas & Camisetas","Vestidos","Calças Jeans","Calças","Saias","Bermudas & Shorts","Conjuntos","Casacos & Jaquetas","Roupas Íntimas"],
    MASC: ["Todos","Camisas","Camisetas","Calças Jeans","Bermudas & Shorts","Calças","Casacos & Jaquetas","Cuecas"],
    INF:  ["Todos","Conjuntos","Camisetas","Vestidos","Bermudas & Shorts","Calças"],
    SAC:  ["Todos","Acessórios","Meias & Íntimas","Ofertas"],
  };

  const SIZES = ["P","M","G","G2","G3","G4","GG","XG"];
  const NUMS  = ["36","38","40","42","44","46","48"];

  const ITEMS = [
  {
    "name": "105 Calcola Lateral e Frente Dupla",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 22.0,
    "sizes": [
      "XG"
    ],
    "code": "1826",
    "id": "FEM-1"
  },
  {
    "name": "Blusa - 0001",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 64.99,
    "sizes": [
      "G"
    ],
    "code": "2044",
    "id": "FEM-2"
  },
  {
    "name": "Blusa - 022",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 114.99,
    "sizes": [
      "M",
      "G",
      "G2"
    ],
    "code": "1921",
    "id": "FEM-3"
  },
  {
    "name": "Blusa - 040539",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 39.99,
    "sizes": [
      "GG"
    ],
    "code": "1986",
    "id": "FEM-4"
  },
  {
    "name": "Blusa - 1004",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 69.99,
    "sizes": [
      "P",
      "M",
      "G"
    ],
    "code": "2134",
    "id": "FEM-5"
  },
  {
    "name": "Blusa - 1072",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 94.99,
    "sizes": [
      "G",
      "G2"
    ],
    "code": "1922",
    "id": "FEM-6"
  },
  {
    "name": "Blusa - 1170",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 69.99,
    "sizes": [
      "G2"
    ],
    "code": "2289",
    "id": "FEM-7"
  },
  {
    "name": "Blusa - 1276",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 64.99,
    "sizes": [
      "GG"
    ],
    "code": "2045",
    "id": "FEM-8"
  },
  {
    "name": "Blusa - 137",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 114.99,
    "sizes": [
      "P",
      "M",
      "G",
      "GG"
    ],
    "code": "2273",
    "id": "FEM-9"
  },
  {
    "name": "Blusa - 1385",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 129.99,
    "sizes": [
      "P",
      "M",
      "G",
      "GG"
    ],
    "code": "2173",
    "id": "FEM-10"
  },
  {
    "name": "Blusa - 1432",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 129.99,
    "sizes": [
      "G",
      "GG"
    ],
    "code": "2175",
    "id": "FEM-11"
  },
  {
    "name": "Blusa - 1487",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 54.99,
    "sizes": [
      "M",
      "G"
    ],
    "code": "2158",
    "id": "FEM-12"
  },
  {
    "name": "Blusa - 1499",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 109.99,
    "sizes": [
      "M",
      "GG"
    ],
    "code": "2178",
    "id": "FEM-13"
  },
  {
    "name": "Blusa - 1553",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 74.99,
    "sizes": [
      "P",
      "G"
    ],
    "code": "2222",
    "id": "FEM-14"
  },
  {
    "name": "Blusa - 1614",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 94.99,
    "sizes": [
      "P",
      "M",
      "GG"
    ],
    "code": "2050",
    "id": "FEM-15"
  },
  {
    "name": "Blusa - 1625",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 94.99,
    "sizes": [
      "P",
      "G3",
      "GG"
    ],
    "code": "2301",
    "id": "FEM-16"
  },
  {
    "name": "Blusa - 1631",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 64.99,
    "sizes": [
      "M"
    ],
    "code": "2052",
    "id": "FEM-17"
  },
  {
    "name": "Blusa - 1711",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 89.99,
    "sizes": [
      "G4"
    ],
    "code": "2012",
    "id": "FEM-18"
  },
  {
    "name": "Blusa - 1887",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 69.99,
    "sizes": [
      "G2"
    ],
    "code": "2290",
    "id": "FEM-19"
  },
  {
    "name": "Blusa - 1953",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 69.99,
    "sizes": [
      "G3"
    ],
    "code": "2291",
    "id": "FEM-20"
  },
  {
    "name": "Blusa - 256",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 84.99,
    "sizes": [
      "G2",
      "G3",
      "G4"
    ],
    "code": "2311",
    "id": "FEM-21"
  },
  {
    "name": "Blusa - 394",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 39.99,
    "sizes": [
      "G"
    ],
    "code": "1987",
    "id": "FEM-22"
  },
  {
    "name": "Blusa - 4017",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 79.99,
    "sizes": [
      "G2"
    ],
    "code": "1973",
    "id": "FEM-23"
  },
  {
    "name": "Blusa - 5054",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 69.99,
    "sizes": [
      "G4"
    ],
    "code": "2292",
    "id": "FEM-24"
  },
  {
    "name": "Blusa - 6063",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 89.99,
    "sizes": [
      "G2"
    ],
    "code": "2013",
    "id": "FEM-25"
  },
  {
    "name": "Blusa - 7029",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 79.99,
    "sizes": [
      "G",
      "G3",
      "G4",
      "GG"
    ],
    "code": "1988",
    "id": "FEM-26"
  },
  {
    "name": "Blusa - 7036",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 94.99,
    "sizes": [
      "P",
      "G",
      "G3",
      "G4",
      "GG"
    ],
    "code": "2229",
    "id": "FEM-27"
  },
  {
    "name": "Blusa - 7042",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 74.99,
    "sizes": [
      "M",
      "GG"
    ],
    "code": "2162",
    "id": "FEM-28"
  },
  {
    "name": "Blusa - 7539",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 124.99,
    "sizes": [
      "P",
      "M",
      "G",
      "G2",
      "G3",
      "G4",
      "GG"
    ],
    "code": "2049",
    "id": "FEM-29"
  },
  {
    "name": "Blusa - 795",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 109.99,
    "sizes": [
      "P",
      "G"
    ],
    "code": "2182",
    "id": "FEM-30"
  },
  {
    "name": "Blusa - 817",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 94.99,
    "sizes": [
      "M",
      "G"
    ],
    "code": "2054",
    "id": "FEM-31"
  },
  {
    "name": "Blusa - 883",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 89.99,
    "sizes": [
      "P",
      "M",
      "G",
      "GG"
    ],
    "code": "2124",
    "id": "FEM-32"
  },
  {
    "name": "Blusa - 954",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 69.99,
    "sizes": [
      "M",
      "G",
      "GG"
    ],
    "code": "2136",
    "id": "FEM-33"
  },
  {
    "name": "Blusa Manga Longa - 1452",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 84.99,
    "sizes": [
      "M",
      "G"
    ],
    "code": "1999",
    "id": "FEM-34"
  },
  {
    "name": "Blusa Manga Longa - 1487",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 119.99,
    "sizes": [
      "P",
      "GG"
    ],
    "code": "2005",
    "id": "FEM-35"
  },
  {
    "name": "Blusa Manga Longa - 1499",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 119.99,
    "sizes": [
      "M",
      "G",
      "GG"
    ],
    "code": "1980",
    "id": "FEM-36"
  },
  {
    "name": "Blusa Manga Longa - 391",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 119.99,
    "sizes": [
      "M"
    ],
    "code": "2006",
    "id": "FEM-37"
  },
  {
    "name": "Blusa Manga Longa - 6032",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 104.99,
    "sizes": [
      "P",
      "M",
      "GG"
    ],
    "code": "2325",
    "id": "FEM-38"
  },
  {
    "name": "Blusa Manga Longa - 7042",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 104.99,
    "sizes": [
      "M",
      "G"
    ],
    "code": "2328",
    "id": "FEM-39"
  },
  {
    "name": "Blusa Manga Longa - 7539",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 119.99,
    "sizes": [
      "P",
      "M",
      "G",
      "GG"
    ],
    "code": "2002",
    "id": "FEM-40"
  },
  {
    "name": "Blusa Manga Morcego - 022",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 74.99,
    "sizes": [
      "G2",
      "G3"
    ],
    "code": "2279",
    "id": "FEM-41"
  },
  {
    "name": "Blusa Manga Morcego - 2074",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 74.99,
    "sizes": [
      "G2",
      "G4"
    ],
    "code": "2281",
    "id": "FEM-42"
  },
  {
    "name": "Blusa Manga Morcego - 7539",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 74.99,
    "sizes": [
      "G3",
      "G4"
    ],
    "code": "2283",
    "id": "FEM-43"
  },
  {
    "name": "Blusa de Alca - 6079",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 89.99,
    "sizes": [
      "P",
      "M",
      "G"
    ],
    "code": "2191",
    "id": "FEM-44"
  },
  {
    "name": "Blusa de Alca - 883",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 84.99,
    "sizes": [
      "M",
      "G",
      "GG"
    ],
    "code": "2192",
    "id": "FEM-45"
  },
  {
    "name": "Calca - 099",
    "cat": "FEM",
    "sub": "Calças",
    "price": 164.99,
    "sizes": [
      "P",
      "M",
      "G",
      "G2",
      "G3",
      "G4",
      "GG"
    ],
    "code": "2077",
    "id": "FEM-46"
  },
  {
    "name": "Calca - 1499",
    "cat": "FEM",
    "sub": "Calças",
    "price": 244.99,
    "sizes": [
      "P",
      "G"
    ],
    "code": "2165",
    "id": "FEM-47"
  },
  {
    "name": "Calca - 1645",
    "cat": "FEM",
    "sub": "Calças",
    "price": 164.99,
    "sizes": [
      "G2",
      "G3",
      "G4"
    ],
    "code": "1959",
    "id": "FEM-48"
  },
  {
    "name": "Calca - 1715",
    "cat": "FEM",
    "sub": "Calças",
    "price": 184.99,
    "sizes": [
      "P",
      "M",
      "G"
    ],
    "code": "2259",
    "id": "FEM-49"
  },
  {
    "name": "Calca - 6054",
    "cat": "FEM",
    "sub": "Calças",
    "price": 154.99,
    "sizes": [
      "G2",
      "G3",
      "G4"
    ],
    "code": "2202",
    "id": "FEM-50"
  },
  {
    "name": "Calca - 611",
    "cat": "FEM",
    "sub": "Calças",
    "price": 244.99,
    "sizes": [
      "P",
      "M",
      "G"
    ],
    "code": "2168",
    "id": "FEM-51"
  },
  {
    "name": "Calca - 7029",
    "cat": "FEM",
    "sub": "Calças",
    "price": 164.99,
    "sizes": [
      "P",
      "G",
      "GG"
    ],
    "code": "1949",
    "id": "FEM-52"
  },
  {
    "name": "Calca - 7539",
    "cat": "FEM",
    "sub": "Calças",
    "price": 244.99,
    "sizes": [
      "P",
      "M",
      "G",
      "G2",
      "G3",
      "G4",
      "GG"
    ],
    "code": "2261",
    "id": "FEM-53"
  },
  {
    "name": "Calca Pantalona - 7539",
    "cat": "FEM",
    "sub": "Calças",
    "price": 104.99,
    "sizes": [
      "P",
      "M",
      "G",
      "GG"
    ],
    "code": "1913",
    "id": "FEM-54"
  },
  {
    "name": "Calcinha Coton Katia",
    "cat": "FEM",
    "sub": "Roupas Íntimas",
    "price": 9.0,
    "sizes": [
      "M",
      "G",
      "GG"
    ],
    "code": "1382",
    "id": "FEM-55"
  },
  {
    "name": "Calça Infantil",
    "cat": "FEM",
    "sub": "Calças",
    "price": 79.99,
    "sizes": [
      "Único"
    ],
    "code": "1622",
    "id": "FEM-56"
  },
  {
    "name": "Calça Infantil Jeans",
    "cat": "FEM",
    "sub": "Calças Jeans",
    "price": 109.99,
    "sizes": [
      "Único"
    ],
    "code": "1623",
    "id": "FEM-57"
  },
  {
    "name": "Camisa Manga Longa - 6054",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 184.99,
    "sizes": [
      "P",
      "M",
      "G",
      "GG"
    ],
    "code": "2086",
    "id": "FEM-58"
  },
  {
    "name": "Camisa Manga Longa - 7539",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 184.99,
    "sizes": [
      "G",
      "GG"
    ],
    "code": "2089",
    "id": "FEM-59"
  },
  {
    "name": "Camiseta - 7029",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 64.99,
    "sizes": [
      "G2",
      "G3"
    ],
    "code": "2209",
    "id": "FEM-60"
  },
  {
    "name": "Camiseta - 7539",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 64.99,
    "sizes": [
      "G2",
      "G3",
      "G4"
    ],
    "code": "2211",
    "id": "FEM-61"
  },
  {
    "name": "Camisete",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 79.99,
    "sizes": [
      "M"
    ],
    "code": "1517",
    "id": "FEM-62"
  },
  {
    "name": "Casaco - 7539",
    "cat": "FEM",
    "sub": "Casacos & Jaquetas",
    "price": 204.99,
    "sizes": [
      "P",
      "M",
      "G",
      "GG"
    ],
    "code": "2322",
    "id": "FEM-63"
  },
  {
    "name": "Con Top+leg Glow Power Liso",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 229.99,
    "sizes": [
      "Único"
    ],
    "code": "1766",
    "id": "FEM-64"
  },
  {
    "name": "Conj Top+bermuda Fitmax Plus",
    "cat": "FEM",
    "sub": "Bermudas & Shorts",
    "price": 224.99,
    "sizes": [
      "Único"
    ],
    "code": "1770",
    "id": "FEM-65"
  },
  {
    "name": "Conj Top+leg Fitmax",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 189.99,
    "sizes": [
      "Único"
    ],
    "code": "1767",
    "id": "FEM-66"
  },
  {
    "name": "Conj Top+leg Fitmax C/bolso",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 229.99,
    "sizes": [
      "Único"
    ],
    "code": "1768",
    "id": "FEM-67"
  },
  {
    "name": "Conj Top+leg Fitmax Plus",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 269.99,
    "sizes": [
      "Único"
    ],
    "code": "1769",
    "id": "FEM-68"
  },
  {
    "name": "Conj Top+leg Fitmax Plus Size",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 269.99,
    "sizes": [
      "Único"
    ],
    "code": "1771",
    "id": "FEM-69"
  },
  {
    "name": "Conj Top+short Duplo",
    "cat": "FEM",
    "sub": "Bermudas & Shorts",
    "price": 169.99,
    "sizes": [
      "Único"
    ],
    "code": "1772",
    "id": "FEM-70"
  },
  {
    "name": "Conj Top+short Hyper C/bolso",
    "cat": "FEM",
    "sub": "Bermudas & Shorts",
    "price": 149.99,
    "sizes": [
      "Único"
    ],
    "code": "1765",
    "id": "FEM-71"
  },
  {
    "name": "Conj. Fem. Casaco Moletom Canelado Cotele / Short Saia Moletom Canelado Cotele",
    "cat": "FEM",
    "sub": "Saias",
    "price": 144.99,
    "sizes": [
      "Único"
    ],
    "code": "1876",
    "id": "FEM-72"
  },
  {
    "name": "Conjunto Inf Moletom 6",
    "cat": "FEM",
    "sub": "Conjuntos",
    "price": 189.99,
    "sizes": [
      "Único"
    ],
    "code": "1831",
    "id": "FEM-73"
  },
  {
    "name": "Jaqueta - 5021a",
    "cat": "FEM",
    "sub": "Casacos & Jaquetas",
    "price": 154.99,
    "sizes": [
      "P",
      "M",
      "G",
      "GG"
    ],
    "code": "1984",
    "id": "FEM-74"
  },
  {
    "name": "Jaqueta Feminina",
    "cat": "FEM",
    "sub": "Casacos & Jaquetas",
    "price": 229.99,
    "sizes": [
      "Único"
    ],
    "code": "1365",
    "id": "FEM-75"
  },
  {
    "name": "Macaquinho Fitmax Liso",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 169.99,
    "sizes": [
      "Único"
    ],
    "code": "1762",
    "id": "FEM-76"
  },
  {
    "name": "Macaquinho Glow Power",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 169.99,
    "sizes": [
      "Único"
    ],
    "code": "1763",
    "id": "FEM-77"
  },
  {
    "name": "Macaquinho Hyper Liso",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 169.99,
    "sizes": [
      "Único"
    ],
    "code": "1764",
    "id": "FEM-78"
  },
  {
    "name": "Premier Alfaiata Hi Tech Supe Str Black",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 189.99,
    "sizes": [
      "Único"
    ],
    "code": "1360",
    "id": "FEM-79"
  },
  {
    "name": "Premier Bata Boho Lanai Maquinetado Bran",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 135.0,
    "sizes": [
      "Único"
    ],
    "code": "1348",
    "id": "FEM-80"
  },
  {
    "name": "Premier Camisa Cropped M/c Lisa Lanai Ma",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 135.0,
    "sizes": [
      "Único"
    ],
    "code": "1349",
    "id": "FEM-81"
  },
  {
    "name": "Premier Je Ly Ski Push Up Cetim Trentin",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 165.0,
    "sizes": [
      "Único"
    ],
    "code": "1359",
    "id": "FEM-82"
  },
  {
    "name": "Premier Jeans Ly Cigarrete New Push Up a",
    "cat": "FEM",
    "sub": "Calças Jeans",
    "price": 185.0,
    "sizes": [
      "Único"
    ],
    "code": "1350",
    "id": "FEM-83"
  },
  {
    "name": "Premier Jeans Ly Reta New Push Up Ayunni",
    "cat": "FEM",
    "sub": "Calças Jeans",
    "price": 179.99,
    "sizes": [
      "Único"
    ],
    "code": "1362",
    "id": "FEM-84"
  },
  {
    "name": "Premier Jeans Ly Wide Leg Trace Destroye",
    "cat": "FEM",
    "sub": "Calças Jeans",
    "price": 184.99,
    "sizes": [
      "Único"
    ],
    "code": "1682",
    "id": "FEM-85"
  },
  {
    "name": "Premier Sar Ly Wide Leg New Balance Mous",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 179.99,
    "sizes": [
      "Único"
    ],
    "code": "1363",
    "id": "FEM-86"
  },
  {
    "name": "Premier Sar Ly Wide Leg New Balance Pret",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 179.99,
    "sizes": [
      "Único"
    ],
    "code": "1681",
    "id": "FEM-87"
  },
  {
    "name": "Premier Sarj Ly Semi Sk Cetim Lito Preto",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 159.99,
    "sizes": [
      "Único"
    ],
    "code": "1684",
    "id": "FEM-88"
  },
  {
    "name": "Premier Sarja Ly New Wide Mousse",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 209.99,
    "sizes": [
      "Único"
    ],
    "code": "1683",
    "id": "FEM-89"
  },
  {
    "name": "Premier Sarja Ly Sport Fino Cetim Avela",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 179.99,
    "sizes": [
      "Único"
    ],
    "code": "1364",
    "id": "FEM-90"
  },
  {
    "name": "Premier Sarja Ly Wide Leg Mousse Bordado",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 180.0,
    "sizes": [
      "Único"
    ],
    "code": "1351",
    "id": "FEM-91"
  },
  {
    "name": "Premier Veludo Jaqueta Cropped Musgo",
    "cat": "FEM",
    "sub": "Casacos & Jaquetas",
    "price": 219.99,
    "sizes": [
      "Único"
    ],
    "code": "1685",
    "id": "FEM-92"
  },
  {
    "name": "Premier Veludo Jaqueta Cropped Preto",
    "cat": "FEM",
    "sub": "Casacos & Jaquetas",
    "price": 229.99,
    "sizes": [
      "Único"
    ],
    "code": "1361",
    "id": "FEM-93"
  },
  {
    "name": "Regata - 022",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 124.99,
    "sizes": [
      "P",
      "M",
      "G",
      "GG"
    ],
    "code": "2252",
    "id": "FEM-94"
  },
  {
    "name": "Regata - 040",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 49.99,
    "sizes": [
      "P",
      "M",
      "G",
      "GG"
    ],
    "code": "2058",
    "id": "FEM-95"
  },
  {
    "name": "Regata - 1072",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 89.99,
    "sizes": [
      "G",
      "GG"
    ],
    "code": "2126",
    "id": "FEM-96"
  },
  {
    "name": "Regata - 1276",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 74.99,
    "sizes": [
      "M",
      "G2",
      "G3",
      "GG"
    ],
    "code": "2215",
    "id": "FEM-97"
  },
  {
    "name": "Regata - 1385",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 94.99,
    "sizes": [
      "M",
      "G",
      "GG"
    ],
    "code": "1940",
    "id": "FEM-98"
  },
  {
    "name": "Regata - 1432",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 94.99,
    "sizes": [
      "P",
      "G",
      "GG"
    ],
    "code": "1943",
    "id": "FEM-99"
  },
  {
    "name": "Regata - 1499",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 74.99,
    "sizes": [
      "G4"
    ],
    "code": "1967",
    "id": "FEM-100"
  },
  {
    "name": "Regata - 1535",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 124.99,
    "sizes": [
      "M",
      "G2"
    ],
    "code": "1968",
    "id": "FEM-101"
  },
  {
    "name": "Regata - 1553",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 84.99,
    "sizes": [
      "P",
      "G",
      "G2",
      "G3",
      "G4"
    ],
    "code": "2063",
    "id": "FEM-102"
  },
  {
    "name": "Regata - 1614",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 89.99,
    "sizes": [
      "P",
      "M",
      "G",
      "G2",
      "G3",
      "G4",
      "GG"
    ],
    "code": "2022",
    "id": "FEM-103"
  },
  {
    "name": "Regata - 1625",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 69.99,
    "sizes": [
      "G4"
    ],
    "code": "2116",
    "id": "FEM-104"
  },
  {
    "name": "Regata - 1715",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 124.99,
    "sizes": [
      "M",
      "G",
      "GG"
    ],
    "code": "2255",
    "id": "FEM-105"
  },
  {
    "name": "Regata - 1887",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 74.99,
    "sizes": [
      "G3"
    ],
    "code": "1969",
    "id": "FEM-106"
  },
  {
    "name": "Regata - 1896",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 45.0,
    "sizes": [
      "P",
      "M",
      "G",
      "GG"
    ],
    "code": "1929",
    "id": "FEM-107"
  },
  {
    "name": "Regata - 1953",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 74.99,
    "sizes": [
      "G3"
    ],
    "code": "1970",
    "id": "FEM-108"
  },
  {
    "name": "Regata - 239",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 74.99,
    "sizes": [
      "G3"
    ],
    "code": "2216",
    "id": "FEM-109"
  },
  {
    "name": "Regata - 256",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 74.99,
    "sizes": [
      "G2",
      "G3",
      "G4"
    ],
    "code": "2117",
    "id": "FEM-110"
  },
  {
    "name": "Regata - 5054",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 74.99,
    "sizes": [
      "G2"
    ],
    "code": "1971",
    "id": "FEM-111"
  },
  {
    "name": "Regata - 6032",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 45.0,
    "sizes": [
      "P",
      "M",
      "G",
      "GG"
    ],
    "code": "1933",
    "id": "FEM-112"
  },
  {
    "name": "Regata - 7042",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 74.99,
    "sizes": [
      "P",
      "M",
      "G",
      "G2",
      "G3",
      "GG"
    ],
    "code": "2038",
    "id": "FEM-113"
  },
  {
    "name": "Regata - 7539",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 89.99,
    "sizes": [
      "P",
      "M",
      "G",
      "G2",
      "G3",
      "G4",
      "GG"
    ],
    "code": "1958",
    "id": "FEM-114"
  },
  {
    "name": "Regata - 795",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 74.99,
    "sizes": [
      "G4"
    ],
    "code": "1972",
    "id": "FEM-115"
  },
  {
    "name": "Regata - 883",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 89.99,
    "sizes": [
      "P",
      "M",
      "GG"
    ],
    "code": "2131",
    "id": "FEM-116"
  },
  {
    "name": "Regata - 945",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 84.99,
    "sizes": [
      "G2",
      "G3",
      "G4"
    ],
    "code": "2093",
    "id": "FEM-117"
  },
  {
    "name": "Saia",
    "cat": "FEM",
    "sub": "Saias",
    "price": 22.0,
    "sizes": [
      "P",
      "M"
    ],
    "code": "931",
    "id": "FEM-118"
  },
  {
    "name": "Saia - 1887",
    "cat": "FEM",
    "sub": "Saias",
    "price": 144.99,
    "sizes": [
      "G2",
      "G4"
    ],
    "code": "2275",
    "id": "FEM-119"
  },
  {
    "name": "Saia - 7029",
    "cat": "FEM",
    "sub": "Saias",
    "price": 144.99,
    "sizes": [
      "G3"
    ],
    "code": "2277",
    "id": "FEM-120"
  },
  {
    "name": "Saia - 7539",
    "cat": "FEM",
    "sub": "Saias",
    "price": 144.99,
    "sizes": [
      "G4"
    ],
    "code": "2278",
    "id": "FEM-121"
  },
  {
    "name": "Saia Jeans",
    "cat": "FEM",
    "sub": "Calças Jeans",
    "price": 104.99,
    "sizes": [
      "38",
      "42",
      "44",
      "46",
      "48"
    ],
    "code": "918",
    "id": "FEM-122"
  },
  {
    "name": "Saia Midi - 1004",
    "cat": "FEM",
    "sub": "Saias",
    "price": 94.99,
    "sizes": [
      "P",
      "M",
      "G"
    ],
    "code": "1917",
    "id": "FEM-123"
  },
  {
    "name": "Saia Midi - 7042",
    "cat": "FEM",
    "sub": "Saias",
    "price": 94.99,
    "sizes": [
      "M",
      "G",
      "GG"
    ],
    "code": "2024",
    "id": "FEM-124"
  },
  {
    "name": "Saia Midi - 7539",
    "cat": "FEM",
    "sub": "Saias",
    "price": 94.99,
    "sizes": [
      "M",
      "G",
      "GG"
    ],
    "code": "2028",
    "id": "FEM-125"
  },
  {
    "name": "Saia Midi - 954",
    "cat": "FEM",
    "sub": "Saias",
    "price": 94.99,
    "sizes": [
      "M",
      "G",
      "GG"
    ],
    "code": "1919",
    "id": "FEM-126"
  },
  {
    "name": "Saia Para Cama Box 0,50x190-38cm Solteiro (un)",
    "cat": "FEM",
    "sub": "Saias",
    "price": 35.0,
    "sizes": [
      "Único"
    ],
    "code": "934",
    "id": "FEM-127"
  },
  {
    "name": "Short Saia",
    "cat": "FEM",
    "sub": "Saias",
    "price": 95.0,
    "sizes": [
      "36",
      "44"
    ],
    "code": "1115",
    "id": "FEM-128"
  },
  {
    "name": "Tanga Fio Duplo Microfibra Plus Size - Ref.: 117 Plus",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 22.0,
    "sizes": [
      "Único"
    ],
    "code": "1830",
    "id": "FEM-129"
  },
  {
    "name": "Tanga Fio Duplo Poliamida com Lateral de Renda",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 15.0,
    "sizes": [
      "GG"
    ],
    "code": "1829",
    "id": "FEM-130"
  },
  {
    "name": "Tangao 91% Poliamida, 09% Elastano.",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 15.0,
    "sizes": [
      "Único"
    ],
    "code": "1824",
    "id": "FEM-131"
  },
  {
    "name": "Tangao 91% Poliamida, 09% Elastano. Estampado",
    "cat": "FEM",
    "sub": "Blusas & Camisetas",
    "price": 15.0,
    "sizes": [
      "Único"
    ],
    "code": "1825",
    "id": "FEM-132"
  },
  {
    "name": "Trij. Fem. Casaco Dupla Face / Blusa Cotton / Legguin Molicotton",
    "cat": "FEM",
    "sub": "Casacos & Jaquetas",
    "price": 164.99,
    "sizes": [
      "Único"
    ],
    "code": "1874",
    "id": "FEM-133"
  },
  {
    "name": "Vestido",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 144.99,
    "sizes": [
      "M",
      "01",
      "02",
      "03",
      "04",
      "08",
      "10",
      "12",
      "14",
      "16"
    ],
    "code": "1182",
    "id": "FEM-134"
  },
  {
    "name": "Vestido - 1072",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 79.99,
    "sizes": [
      "M"
    ],
    "code": "2030",
    "id": "FEM-135"
  },
  {
    "name": "Vestido - 1170",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 109.99,
    "sizes": [
      "G3"
    ],
    "code": "2205",
    "id": "FEM-136"
  },
  {
    "name": "Vestido - 1276",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 109.99,
    "sizes": [
      "G3"
    ],
    "code": "2305",
    "id": "FEM-137"
  },
  {
    "name": "Vestido - 1535",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 69.99,
    "sizes": [
      "GG"
    ],
    "code": "2146",
    "id": "FEM-138"
  },
  {
    "name": "Vestido - 1547",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 69.99,
    "sizes": [
      "M"
    ],
    "code": "2147",
    "id": "FEM-139"
  },
  {
    "name": "Vestido - 1953",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 69.99,
    "sizes": [
      "M"
    ],
    "code": "2148",
    "id": "FEM-140"
  },
  {
    "name": "Vestido - 2047",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 109.99,
    "sizes": [
      "G3"
    ],
    "code": "2206",
    "id": "FEM-141"
  },
  {
    "name": "Vestido - 239",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 144.99,
    "sizes": [
      "M",
      "G2",
      "G4"
    ],
    "code": "2285",
    "id": "FEM-142"
  },
  {
    "name": "Vestido - 256",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 109.99,
    "sizes": [
      "G2"
    ],
    "code": "2306",
    "id": "FEM-143"
  },
  {
    "name": "Vestido - 394",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 79.99,
    "sizes": [
      "GG"
    ],
    "code": "2152",
    "id": "FEM-144"
  },
  {
    "name": "Vestido - 4017",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 109.99,
    "sizes": [
      "M",
      "G4"
    ],
    "code": "2207",
    "id": "FEM-145"
  },
  {
    "name": "Vestido - 5054",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 69.99,
    "sizes": [
      "G"
    ],
    "code": "2149",
    "id": "FEM-146"
  },
  {
    "name": "Vestido - 558",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 79.99,
    "sizes": [
      "G"
    ],
    "code": "2154",
    "id": "FEM-147"
  },
  {
    "name": "Vestido - 5600",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 79.99,
    "sizes": [
      "G"
    ],
    "code": "2155",
    "id": "FEM-148"
  },
  {
    "name": "Vestido - 7029",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 79.99,
    "sizes": [
      "P",
      "G"
    ],
    "code": "2033",
    "id": "FEM-149"
  },
  {
    "name": "Vestido - 7036",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 79.99,
    "sizes": [
      "G"
    ],
    "code": "2034",
    "id": "FEM-150"
  },
  {
    "name": "Vestido - 7042",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 144.99,
    "sizes": [
      "G2",
      "G3",
      "G4"
    ],
    "code": "2307",
    "id": "FEM-151"
  },
  {
    "name": "Vestido - 7539",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 144.99,
    "sizes": [
      "P",
      "M",
      "G",
      "G3",
      "G4",
      "GG"
    ],
    "code": "2241",
    "id": "FEM-152"
  },
  {
    "name": "Vestido - 795",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 109.99,
    "sizes": [
      "G4",
      "GG"
    ],
    "code": "2208",
    "id": "FEM-153"
  },
  {
    "name": "Vestido - 883",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 94.99,
    "sizes": [
      "M",
      "G"
    ],
    "code": "2244",
    "id": "FEM-154"
  },
  {
    "name": "Vestido 1 Ano (un)",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 74.99,
    "sizes": [
      "Único"
    ],
    "code": "1189",
    "id": "FEM-155"
  },
  {
    "name": "Vestido 2 Anos (un)",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 144.99,
    "sizes": [
      "Único"
    ],
    "code": "1206",
    "id": "FEM-156"
  },
  {
    "name": "Vestido 4 Anos (un)",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 144.99,
    "sizes": [
      "Único"
    ],
    "code": "1215",
    "id": "FEM-157"
  },
  {
    "name": "Vestido 6 Anos (un)",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 144.99,
    "sizes": [
      "Único"
    ],
    "code": "1221",
    "id": "FEM-158"
  },
  {
    "name": "Vestido 8 Anos (un)",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 134.99,
    "sizes": [
      "Único"
    ],
    "code": "1228",
    "id": "FEM-159"
  },
  {
    "name": "Vestido Curto - 7042",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 119.99,
    "sizes": [
      "M",
      "G",
      "GG"
    ],
    "code": "1906",
    "id": "FEM-160"
  },
  {
    "name": "Vestido Curto - 7539",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 119.99,
    "sizes": [
      "M",
      "G",
      "GG"
    ],
    "code": "1909",
    "id": "FEM-161"
  },
  {
    "name": "Vestido Fem. Jacquard Provence",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 104.99,
    "sizes": [
      "Único"
    ],
    "code": "1869",
    "id": "FEM-162"
  },
  {
    "name": "Vestido Manga Longa - 391",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 109.99,
    "sizes": [
      "P",
      "M",
      "G"
    ],
    "code": "1994",
    "id": "FEM-163"
  },
  {
    "name": "Vestido Manga Longa - 7539",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 109.99,
    "sizes": [
      "M",
      "G",
      "GG"
    ],
    "code": "1996",
    "id": "FEM-164"
  },
  {
    "name": "Vestido Midi - 1170",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 109.99,
    "sizes": [
      "M"
    ],
    "code": "2233",
    "id": "FEM-165"
  },
  {
    "name": "Vestido Midi - 1276",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 119.99,
    "sizes": [
      "M"
    ],
    "code": "2245",
    "id": "FEM-166"
  },
  {
    "name": "Vestido Midi - 1535",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 109.99,
    "sizes": [
      "M"
    ],
    "code": "2234",
    "id": "FEM-167"
  },
  {
    "name": "Vestido Midi - 1547",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 109.99,
    "sizes": [
      "G"
    ],
    "code": "2235",
    "id": "FEM-168"
  },
  {
    "name": "Vestido Midi - 1553",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 179.99,
    "sizes": [
      "G3",
      "G4"
    ],
    "code": "2008",
    "id": "FEM-169"
  },
  {
    "name": "Vestido Midi - 1887",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 109.99,
    "sizes": [
      "G"
    ],
    "code": "2236",
    "id": "FEM-170"
  },
  {
    "name": "Vestido Midi - 1953",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 109.99,
    "sizes": [
      "GG"
    ],
    "code": "2237",
    "id": "FEM-171"
  },
  {
    "name": "Vestido Midi - 239",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 119.99,
    "sizes": [
      "M"
    ],
    "code": "2246",
    "id": "FEM-172"
  },
  {
    "name": "Vestido Midi - 256",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 119.99,
    "sizes": [
      "G"
    ],
    "code": "2247",
    "id": "FEM-173"
  },
  {
    "name": "Vestido Midi - 394",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 209.99,
    "sizes": [
      "M",
      "G"
    ],
    "code": "2184",
    "id": "FEM-174"
  },
  {
    "name": "Vestido Midi - 5054",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 109.99,
    "sizes": [
      "GG"
    ],
    "code": "2238",
    "id": "FEM-175"
  },
  {
    "name": "Vestido Midi - 5600",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 119.99,
    "sizes": [
      "M",
      "G",
      "GG"
    ],
    "code": "1901",
    "id": "FEM-176"
  },
  {
    "name": "Vestido Midi - 7029",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 209.99,
    "sizes": [
      "P"
    ],
    "code": "2185",
    "id": "FEM-177"
  },
  {
    "name": "Vestido Midi - 7042",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 119.99,
    "sizes": [
      "M",
      "G",
      "GG"
    ],
    "code": "2248",
    "id": "FEM-178"
  },
  {
    "name": "Vestido Midi - 7539",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 209.99,
    "sizes": [
      "M",
      "G",
      "G4",
      "GG"
    ],
    "code": "2187",
    "id": "FEM-179"
  },
  {
    "name": "Vestido Midi - 945",
    "cat": "FEM",
    "sub": "Vestidos",
    "price": 179.99,
    "sizes": [
      "G4"
    ],
    "code": "2011",
    "id": "FEM-180"
  },
  {
    "name": "Bermuda",
    "cat": "MASC",
    "sub": "Bermudas & Shorts",
    "price": 90.0,
    "sizes": [
      "44",
      "46",
      "48",
      "50",
      "52"
    ],
    "code": "1354",
    "id": "MASC-181"
  },
  {
    "name": "Bermuda Ciclista com Bolso e Aplique",
    "cat": "MASC",
    "sub": "Bermudas & Shorts",
    "price": 75.0,
    "sizes": [
      "Único"
    ],
    "code": "1312",
    "id": "MASC-182"
  },
  {
    "name": "Bermuda Je Basic Black Black Plus Size",
    "cat": "MASC",
    "sub": "Bermudas & Shorts",
    "price": 119.99,
    "sizes": [
      "Único"
    ],
    "code": "1732",
    "id": "MASC-183"
  },
  {
    "name": "Bermuda Jeans Basic Black Black",
    "cat": "MASC",
    "sub": "Calças Jeans",
    "price": 104.99,
    "sizes": [
      "Único"
    ],
    "code": "1731",
    "id": "MASC-184"
  },
  {
    "name": "Bermuda Jeans Basic Carbono Black Blue",
    "cat": "MASC",
    "sub": "Calças Jeans",
    "price": 104.99,
    "sizes": [
      "Único"
    ],
    "code": "1730",
    "id": "MASC-185"
  },
  {
    "name": "Bermuda Moletom",
    "cat": "MASC",
    "sub": "Bermudas & Shorts",
    "price": 74.99,
    "sizes": [
      "Único"
    ],
    "code": "1638",
    "id": "MASC-186"
  },
  {
    "name": "Bermuda Sarja Ly Basic Avela",
    "cat": "MASC",
    "sub": "Bermudas & Shorts",
    "price": 104.99,
    "sizes": [
      "Único"
    ],
    "code": "1733",
    "id": "MASC-187"
  },
  {
    "name": "Bermuda Sarja Ly Basic Preta",
    "cat": "MASC",
    "sub": "Bermudas & Shorts",
    "price": 109.99,
    "sizes": [
      "Único"
    ],
    "code": "1734",
    "id": "MASC-188"
  },
  {
    "name": "Bermuda Young",
    "cat": "MASC",
    "sub": "Bermudas & Shorts",
    "price": 109.99,
    "sizes": [
      "Único"
    ],
    "code": "1725",
    "id": "MASC-189"
  },
  {
    "name": "Bermuda com Bolsos, Estampa e Aplique",
    "cat": "MASC",
    "sub": "Bermudas & Shorts",
    "price": 60.0,
    "sizes": [
      "Único"
    ],
    "code": "1309",
    "id": "MASC-190"
  },
  {
    "name": "Box",
    "cat": "MASC",
    "sub": "Cuecas",
    "price": 13.0,
    "sizes": [
      "GG"
    ],
    "code": "1384",
    "id": "MASC-191"
  },
  {
    "name": "Calca Bebe 79%alg.19%pol.2,0%el.",
    "cat": "MASC",
    "sub": "Calças",
    "price": 94.99,
    "sizes": [
      "Único"
    ],
    "code": "1289",
    "id": "MASC-192"
  },
  {
    "name": "Calca Bebe 97%alg.3,0%el.",
    "cat": "MASC",
    "sub": "Calças",
    "price": 94.99,
    "sizes": [
      "Único"
    ],
    "code": "1288",
    "id": "MASC-193"
  },
  {
    "name": "Calca Fem Boot Cut Chapa Barriga N. Push",
    "cat": "MASC",
    "sub": "Calças",
    "price": 189.99,
    "sizes": [
      "Único"
    ],
    "code": "1728",
    "id": "MASC-194"
  },
  {
    "name": "Calca Fem.100% Alg.",
    "cat": "MASC",
    "sub": "Calças",
    "price": 109.99,
    "sizes": [
      "Único"
    ],
    "code": "1284",
    "id": "MASC-195"
  },
  {
    "name": "Calca Fem.78,5%alg.20%pol1,5%el.",
    "cat": "MASC",
    "sub": "Calças",
    "price": 109.99,
    "sizes": [
      "Único"
    ],
    "code": "1283",
    "id": "MASC-196"
  },
  {
    "name": "Calca Fem.79%alg.19%pol.2,0%el.",
    "cat": "MASC",
    "sub": "Calças",
    "price": 109.99,
    "sizes": [
      "Único"
    ],
    "code": "1280",
    "id": "MASC-197"
  },
  {
    "name": "Calca Fem.97%alg.3,0%el.",
    "cat": "MASC",
    "sub": "Calças",
    "price": 109.99,
    "sizes": [
      "Único"
    ],
    "code": "1278",
    "id": "MASC-198"
  },
  {
    "name": "Calca Inf.79%alg.19%pol.2%el.",
    "cat": "MASC",
    "sub": "Calças",
    "price": 104.99,
    "sizes": [
      "Único"
    ],
    "code": "1291",
    "id": "MASC-199"
  },
  {
    "name": "Calca Inf.97%alg.3%el.",
    "cat": "MASC",
    "sub": "Calças",
    "price": 104.99,
    "sizes": [
      "Único"
    ],
    "code": "1293",
    "id": "MASC-200"
  },
  {
    "name": "Calca Juv.78,5%alg.20%pol.1,5%el.",
    "cat": "MASC",
    "sub": "Calças",
    "price": 104.99,
    "sizes": [
      "Único"
    ],
    "code": "1298",
    "id": "MASC-201"
  },
  {
    "name": "Calca Juv.81%alg.17%pol.2,0%el.",
    "cat": "MASC",
    "sub": "Calças",
    "price": 104.99,
    "sizes": [
      "Único"
    ],
    "code": "1297",
    "id": "MASC-202"
  },
  {
    "name": "Calca Sarja Juv.97%alg.3,0%el.",
    "cat": "MASC",
    "sub": "Calças",
    "price": 104.99,
    "sizes": [
      "Único"
    ],
    "code": "1296",
    "id": "MASC-203"
  },
  {
    "name": "Calca.fem.79%alg.19%pol.2,0%el.",
    "cat": "MASC",
    "sub": "Calças",
    "price": 104.99,
    "sizes": [
      "Único"
    ],
    "code": "1277",
    "id": "MASC-204"
  },
  {
    "name": "Calça Jeans",
    "cat": "MASC",
    "sub": "Calças Jeans",
    "price": 194.0,
    "sizes": [
      "50",
      "52",
      "54",
      "56",
      "58",
      "60",
      "62",
      "64"
    ],
    "code": "7",
    "id": "MASC-205"
  },
  {
    "name": "Calça Jeans 6 Anos (un)",
    "cat": "MASC",
    "sub": "Calças Jeans",
    "price": 109.99,
    "sizes": [
      "Único"
    ],
    "code": "32",
    "id": "MASC-206"
  },
  {
    "name": "Calça Jeans 8 Anos (un)",
    "cat": "MASC",
    "sub": "Calças Jeans",
    "price": 119.99,
    "sizes": [
      "Único"
    ],
    "code": "43",
    "id": "MASC-207"
  },
  {
    "name": "Calça Masculina",
    "cat": "MASC",
    "sub": "Calças",
    "price": 124.99,
    "sizes": [
      "44"
    ],
    "code": "1892",
    "id": "MASC-208"
  },
  {
    "name": "Calça Moletom",
    "cat": "MASC",
    "sub": "Calças",
    "price": 164.99,
    "sizes": [
      "P",
      "M",
      "G2",
      "G3",
      "G4",
      "16"
    ],
    "code": "1639",
    "id": "MASC-209"
  },
  {
    "name": "Calça Past",
    "cat": "MASC",
    "sub": "Calças",
    "price": 124.99,
    "sizes": [
      "40"
    ],
    "code": "70",
    "id": "MASC-210"
  },
  {
    "name": "Calça Social",
    "cat": "MASC",
    "sub": "Calças",
    "price": 149.99,
    "sizes": [
      "36",
      "38",
      "40",
      "42",
      "44",
      "46",
      "48",
      "50",
      "52",
      "16",
      "54",
      "56",
      "58",
      "60",
      "62"
    ],
    "code": "1636",
    "id": "MASC-211"
  },
  {
    "name": "Calça Tactel",
    "cat": "MASC",
    "sub": "Calças",
    "price": 69.99,
    "sizes": [
      "P",
      "M",
      "G",
      "G4",
      "GG"
    ],
    "code": "1637",
    "id": "MASC-212"
  },
  {
    "name": "Calçatactel",
    "cat": "MASC",
    "sub": "Calças",
    "price": 30.0,
    "sizes": [
      "08",
      "10",
      "12",
      "14"
    ],
    "code": "114",
    "id": "MASC-213"
  },
  {
    "name": "Camisa",
    "cat": "MASC",
    "sub": "Camisas",
    "price": 159.99,
    "sizes": [
      "P",
      "M",
      "G",
      "G2",
      "G3",
      "G4",
      "GG",
      "01",
      "02",
      "03",
      "04",
      "06",
      "08",
      "10",
      "16"
    ],
    "code": "128",
    "id": "MASC-214"
  },
  {
    "name": "Camisa 6 Anos (un)",
    "cat": "MASC",
    "sub": "Camisas",
    "price": 39.99,
    "sizes": [
      "Único"
    ],
    "code": "148",
    "id": "MASC-215"
  },
  {
    "name": "Camisa 7gg (un)",
    "cat": "MASC",
    "sub": "Camisas",
    "price": 60.0,
    "sizes": [
      "Único"
    ],
    "code": "149",
    "id": "MASC-216"
  },
  {
    "name": "Camisa Social",
    "cat": "MASC",
    "sub": "Camisas",
    "price": 159.99,
    "sizes": [
      "P",
      "M",
      "06",
      "14"
    ],
    "code": "240",
    "id": "MASC-217"
  },
  {
    "name": "Camisa Social Manga Longa",
    "cat": "MASC",
    "sub": "Camisas",
    "price": 104.9,
    "sizes": [
      "Único"
    ],
    "code": "1448",
    "id": "MASC-218"
  },
  {
    "name": "Camisa Urb",
    "cat": "MASC",
    "sub": "Camisas",
    "price": 49.99,
    "sizes": [
      "M",
      "G"
    ],
    "code": "1530",
    "id": "MASC-219"
  },
  {
    "name": "Camisa Xadrez",
    "cat": "MASC",
    "sub": "Camisas",
    "price": 129.99,
    "sizes": [
      "P",
      "M",
      "G",
      "GG",
      "XG",
      "02",
      "04"
    ],
    "code": "243",
    "id": "MASC-220"
  },
  {
    "name": "Camiseta com Aplique",
    "cat": "MASC",
    "sub": "Camisetas",
    "price": 60.0,
    "sizes": [
      "Único"
    ],
    "code": "1307",
    "id": "MASC-221"
  },
  {
    "name": "Camiseta com Estampa",
    "cat": "MASC",
    "sub": "Camisetas",
    "price": 60.0,
    "sizes": [
      "Único"
    ],
    "code": "1302",
    "id": "MASC-222"
  },
  {
    "name": "Camiseta com Estampa e Aplique",
    "cat": "MASC",
    "sub": "Camisetas",
    "price": 60.0,
    "sizes": [
      "Único"
    ],
    "code": "1308",
    "id": "MASC-223"
  },
  {
    "name": "Camiseta com Estampa e Embossing",
    "cat": "MASC",
    "sub": "Camisetas",
    "price": 60.0,
    "sizes": [
      "Único"
    ],
    "code": "1300",
    "id": "MASC-224"
  },
  {
    "name": "Casaco",
    "cat": "MASC",
    "sub": "Casacos & Jaquetas",
    "price": 174.99,
    "sizes": [
      "P",
      "M"
    ],
    "code": "1583",
    "id": "MASC-225"
  },
  {
    "name": "Casaco Capuz C/zíper Moletom Gorgurão / Areia /",
    "cat": "MASC",
    "sub": "Casacos & Jaquetas",
    "price": 170.0,
    "sizes": [
      "G"
    ],
    "code": "1326",
    "id": "MASC-226"
  },
  {
    "name": "Casaco Capuz C/zíper Moletom Gorgurão / Avela /",
    "cat": "MASC",
    "sub": "Casacos & Jaquetas",
    "price": 170.0,
    "sizes": [
      "G",
      "GG"
    ],
    "code": "1327",
    "id": "MASC-227"
  },
  {
    "name": "Casaco Capuz C/zíper Moletom Gorgurão / Preto /",
    "cat": "MASC",
    "sub": "Casacos & Jaquetas",
    "price": 170.0,
    "sizes": [
      "G"
    ],
    "code": "1329",
    "id": "MASC-228"
  },
  {
    "name": "Casaco Capuz C/zíper Moletom Peluciado / Cabernet /",
    "cat": "MASC",
    "sub": "Casacos & Jaquetas",
    "price": 170.0,
    "sizes": [
      "G2",
      "G3",
      "G4"
    ],
    "code": "1434",
    "id": "MASC-229"
  },
  {
    "name": "Casaco Capuz C/zíper Moletom Peluciado / Curry /",
    "cat": "MASC",
    "sub": "Casacos & Jaquetas",
    "price": 170.0,
    "sizes": [
      "G",
      "GG"
    ],
    "code": "1336",
    "id": "MASC-230"
  },
  {
    "name": "Casaco Capuz C/zíper Moletom Peluciado / Marinho /",
    "cat": "MASC",
    "sub": "Casacos & Jaquetas",
    "price": 169.99,
    "sizes": [
      "G3"
    ],
    "code": "1432",
    "id": "MASC-231"
  },
  {
    "name": "Casaco Capuz C/zíper Moletom Peluciado / Oliva /",
    "cat": "MASC",
    "sub": "Casacos & Jaquetas",
    "price": 170.0,
    "sizes": [
      "G",
      "GG"
    ],
    "code": "1334",
    "id": "MASC-232"
  },
  {
    "name": "Casaco Capuz C/zíper Moletom Peluciado / Preto /",
    "cat": "MASC",
    "sub": "Casacos & Jaquetas",
    "price": 170.0,
    "sizes": [
      "G",
      "G3",
      "GG"
    ],
    "code": "1332",
    "id": "MASC-233"
  },
  {
    "name": "Casaco Capuz C/zíper Moletom Peluciado / Terracota /",
    "cat": "MASC",
    "sub": "Casacos & Jaquetas",
    "price": 170.0,
    "sizes": [
      "G",
      "GG"
    ],
    "code": "1330",
    "id": "MASC-234"
  },
  {
    "name": "Casaco Capuz Moletom Peluciado / Curry /",
    "cat": "MASC",
    "sub": "Casacos & Jaquetas",
    "price": 149.99,
    "sizes": [
      "G2",
      "G3",
      "G4"
    ],
    "code": "1444",
    "id": "MASC-235"
  },
  {
    "name": "Casaco Capuz Moletom Peluciado / Marinho /",
    "cat": "MASC",
    "sub": "Casacos & Jaquetas",
    "price": 149.99,
    "sizes": [
      "G2",
      "G3"
    ],
    "code": "1438",
    "id": "MASC-236"
  },
  {
    "name": "Casaco Capuz Moletom Peluciado / Neblina /",
    "cat": "MASC",
    "sub": "Casacos & Jaquetas",
    "price": 149.99,
    "sizes": [
      "G2",
      "G3",
      "G4"
    ],
    "code": "1440",
    "id": "MASC-237"
  },
  {
    "name": "Casaco Recortado Moletom Piquet / Curry /",
    "cat": "MASC",
    "sub": "Casacos & Jaquetas",
    "price": 109.99,
    "sizes": [
      "G",
      "GG"
    ],
    "code": "1760",
    "id": "MASC-238"
  },
  {
    "name": "Casaco Recortado Moletom Piquet / Marinho /",
    "cat": "MASC",
    "sub": "Casacos & Jaquetas",
    "price": 109.99,
    "sizes": [
      "G",
      "GG"
    ],
    "code": "1758",
    "id": "MASC-239"
  },
  {
    "name": "Casaco com Capuz, Bolso, Estampa e Apliq",
    "cat": "MASC",
    "sub": "Casacos & Jaquetas",
    "price": 105.0,
    "sizes": [
      "Único"
    ],
    "code": "1322",
    "id": "MASC-240"
  },
  {
    "name": "Casaco com Capuz, Bolsos e Estampa",
    "cat": "MASC",
    "sub": "Casacos & Jaquetas",
    "price": 105.0,
    "sizes": [
      "Único"
    ],
    "code": "1321",
    "id": "MASC-241"
  },
  {
    "name": "Casaco com Retilinea, Ziper e Estampa",
    "cat": "MASC",
    "sub": "Casacos & Jaquetas",
    "price": 105.0,
    "sizes": [
      "Único"
    ],
    "code": "1320",
    "id": "MASC-242"
  },
  {
    "name": "Casaco com Retilineas e Estampa",
    "cat": "MASC",
    "sub": "Casacos & Jaquetas",
    "price": 105.0,
    "sizes": [
      "Único"
    ],
    "code": "1319",
    "id": "MASC-243"
  },
  {
    "name": "Conj. Fem. Casaco Dupla Face / Legguing Molecotton",
    "cat": "MASC",
    "sub": "Casacos & Jaquetas",
    "price": 164.99,
    "sizes": [
      "Único"
    ],
    "code": "1878",
    "id": "MASC-244"
  },
  {
    "name": "Conj. Fem. Casaco Jacquard Provence / Legguing Molicotton",
    "cat": "MASC",
    "sub": "Casacos & Jaquetas",
    "price": 124.99,
    "sizes": [
      "Único"
    ],
    "code": "1866",
    "id": "MASC-245"
  },
  {
    "name": "Conj. Fem. Casaco Jacquard Provence / Legguing Tricot Brusch",
    "cat": "MASC",
    "sub": "Casacos & Jaquetas",
    "price": 124.99,
    "sizes": [
      "Único"
    ],
    "code": "1865",
    "id": "MASC-246"
  },
  {
    "name": "Conj. Fem. Casaco Malha Dupla Face / Legguing Tricot Jetty",
    "cat": "MASC",
    "sub": "Casacos & Jaquetas",
    "price": 119.99,
    "sizes": [
      "Único"
    ],
    "code": "1862",
    "id": "MASC-247"
  },
  {
    "name": "Conj. Fem. Casaco Molecottom / Calca Moletom Diagonal",
    "cat": "MASC",
    "sub": "Casacos & Jaquetas",
    "price": 164.99,
    "sizes": [
      "Único"
    ],
    "code": "1880",
    "id": "MASC-248"
  },
  {
    "name": "Conj. Fem. Casaco Molecotton / Calca Molecotton",
    "cat": "MASC",
    "sub": "Casacos & Jaquetas",
    "price": 194.99,
    "sizes": [
      "Único"
    ],
    "code": "1886",
    "id": "MASC-249"
  },
  {
    "name": "Conj. Fem. Casaco Molecotton / Calca Molicotton",
    "cat": "MASC",
    "sub": "Casacos & Jaquetas",
    "price": 104.99,
    "sizes": [
      "Único"
    ],
    "code": "1863",
    "id": "MASC-250"
  },
  {
    "name": "Conj. Fem. Casaco Moletom Diagonal / Calca Moletom Diagonal",
    "cat": "MASC",
    "sub": "Casacos & Jaquetas",
    "price": 204.99,
    "sizes": [
      "Único"
    ],
    "code": "1887",
    "id": "MASC-251"
  },
  {
    "name": "Conj. Fem. Casaco Pelo Coracao 3d / Calca Molecotton",
    "cat": "MASC",
    "sub": "Casacos & Jaquetas",
    "price": 204.99,
    "sizes": [
      "Único"
    ],
    "code": "1885",
    "id": "MASC-252"
  },
  {
    "name": "Conj. Fem. Casaco Pelo Coracao 3d/ Calca Molecotton",
    "cat": "MASC",
    "sub": "Casacos & Jaquetas",
    "price": 164.99,
    "sizes": [
      "Único"
    ],
    "code": "1879",
    "id": "MASC-253"
  },
  {
    "name": "Conj. Fem. Casaco Suica / Legguing Molecotton",
    "cat": "MASC",
    "sub": "Casacos & Jaquetas",
    "price": 134.99,
    "sizes": [
      "Único"
    ],
    "code": "1875",
    "id": "MASC-254"
  },
  {
    "name": "Conj. Masc. Casaco Dupla Face / Calca Moletom",
    "cat": "MASC",
    "sub": "Casacos & Jaquetas",
    "price": 109.99,
    "sizes": [
      "Único"
    ],
    "code": "1871",
    "id": "MASC-255"
  },
  {
    "name": "Conj. Masc. Casaco Flanela Soho / Calca Moletom",
    "cat": "MASC",
    "sub": "Casacos & Jaquetas",
    "price": 104.99,
    "sizes": [
      "Único"
    ],
    "code": "1870",
    "id": "MASC-256"
  },
  {
    "name": "Conj. Masc. Casaco Matalasse Horizontal / Calca Moletom Pa",
    "cat": "MASC",
    "sub": "Casacos & Jaquetas",
    "price": 89.99,
    "sizes": [
      "Único"
    ],
    "code": "1873",
    "id": "MASC-257"
  },
  {
    "name": "Conj. Masc. Casaco Moletom / Calca Moletom",
    "cat": "MASC",
    "sub": "Casacos & Jaquetas",
    "price": 189.99,
    "sizes": [
      "Único"
    ],
    "code": "1884",
    "id": "MASC-258"
  },
  {
    "name": "Conj. Masc. Casaco New Sherpa / Calca Moletom",
    "cat": "MASC",
    "sub": "Casacos & Jaquetas",
    "price": 109.99,
    "sizes": [
      "Único"
    ],
    "code": "1872",
    "id": "MASC-259"
  },
  {
    "name": "Conjunto Inf Moeton",
    "cat": "MASC",
    "sub": "Conjuntos",
    "price": 209.99,
    "sizes": [
      "P",
      "M",
      "01",
      "02",
      "03",
      "04"
    ],
    "code": "1802",
    "id": "MASC-260"
  },
  {
    "name": "Conjunto Inf Moletom",
    "cat": "MASC",
    "sub": "Conjuntos",
    "price": 164.99,
    "sizes": [
      "Único"
    ],
    "code": "1841",
    "id": "MASC-261"
  },
  {
    "name": "Conjunto Inf Moletom 6",
    "cat": "MASC",
    "sub": "Conjuntos",
    "price": 209.99,
    "sizes": [
      "Único"
    ],
    "code": "1838",
    "id": "MASC-262"
  },
  {
    "name": "Conjunto Inf Moleton",
    "cat": "MASC",
    "sub": "Conjuntos",
    "price": 194.99,
    "sizes": [
      "10"
    ],
    "code": "1850",
    "id": "MASC-263"
  },
  {
    "name": "Conjunto Inf Moleton 8",
    "cat": "MASC",
    "sub": "Conjuntos",
    "price": 209.99,
    "sizes": [
      "Único"
    ],
    "code": "1848",
    "id": "MASC-264"
  },
  {
    "name": "Conjunto Inox Queijo (un)",
    "cat": "MASC",
    "sub": "Conjuntos",
    "price": 55.0,
    "sizes": [
      "Único"
    ],
    "code": "556",
    "id": "MASC-265"
  },
  {
    "name": "Conjunto Talheres Fratelli",
    "cat": "MASC",
    "sub": "Conjuntos",
    "price": 140.0,
    "sizes": [
      "Único"
    ],
    "code": "1720",
    "id": "MASC-266"
  },
  {
    "name": "Conjunto Talheres Inox",
    "cat": "MASC",
    "sub": "Conjuntos",
    "price": 190.0,
    "sizes": [
      "Único"
    ],
    "code": "1721",
    "id": "MASC-267"
  },
  {
    "name": "Cortina P/ Box Rio Rome",
    "cat": "MASC",
    "sub": "Cuecas",
    "price": 30.0,
    "sizes": [
      "Único"
    ],
    "code": "1704",
    "id": "MASC-268"
  },
  {
    "name": "Cortina P/box",
    "cat": "MASC",
    "sub": "Cuecas",
    "price": 55.0,
    "sizes": [
      "Único"
    ],
    "code": "1376",
    "id": "MASC-269"
  },
  {
    "name": "Cortina Para Box Banheiro (un)",
    "cat": "MASC",
    "sub": "Cuecas",
    "price": 55.0,
    "sizes": [
      "Único"
    ],
    "code": "579",
    "id": "MASC-270"
  },
  {
    "name": "Cueca Box",
    "cat": "MASC",
    "sub": "Cuecas",
    "price": 25.0,
    "sizes": [
      "M",
      "G3"
    ],
    "code": "1657",
    "id": "MASC-271"
  },
  {
    "name": "Cuecas Box Masc. (un)",
    "cat": "MASC",
    "sub": "Cuecas",
    "price": 13.0,
    "sizes": [
      "Único"
    ],
    "code": "582",
    "id": "MASC-272"
  },
  {
    "name": "Gola Polo",
    "cat": "MASC",
    "sub": "Camisetas",
    "price": 139.99,
    "sizes": [
      "P",
      "M",
      "G",
      "G2",
      "G3",
      "G4",
      "GG",
      "XG",
      "01",
      "04",
      "06",
      "08",
      "12",
      "16"
    ],
    "code": "1632",
    "id": "MASC-273"
  },
  {
    "name": "Gola Polo (un)",
    "cat": "MASC",
    "sub": "Camisetas",
    "price": 89.99,
    "sizes": [
      "Único"
    ],
    "code": "596",
    "id": "MASC-274"
  },
  {
    "name": "Gola Polo 4",
    "cat": "MASC",
    "sub": "Camisetas",
    "price": 35.0,
    "sizes": [
      "Único"
    ],
    "code": "1656",
    "id": "MASC-275"
  },
  {
    "name": "Gola Polo Ex3 (un)",
    "cat": "MASC",
    "sub": "Camisetas",
    "price": 104.99,
    "sizes": [
      "Único"
    ],
    "code": "608",
    "id": "MASC-276"
  },
  {
    "name": "Gola Polo Ex4 (un)",
    "cat": "MASC",
    "sub": "Camisetas",
    "price": 104.99,
    "sizes": [
      "Único"
    ],
    "code": "609",
    "id": "MASC-277"
  },
  {
    "name": "Jaqueta",
    "cat": "MASC",
    "sub": "Casacos & Jaquetas",
    "price": 239.99,
    "sizes": [
      "Único"
    ],
    "code": "1580",
    "id": "MASC-278"
  },
  {
    "name": "Jaqueta com Bolsos e Plaquinha",
    "cat": "MASC",
    "sub": "Casacos & Jaquetas",
    "price": 170.0,
    "sizes": [
      "Único"
    ],
    "code": "1315",
    "id": "MASC-279"
  },
  {
    "name": "Jaqueta com Capuz",
    "cat": "MASC",
    "sub": "Casacos & Jaquetas",
    "price": 194.99,
    "sizes": [
      "Único"
    ],
    "code": "1628",
    "id": "MASC-280"
  },
  {
    "name": "Jaqueta com Capuz, Bolso e Estampa",
    "cat": "MASC",
    "sub": "Casacos & Jaquetas",
    "price": 170.0,
    "sizes": [
      "Único"
    ],
    "code": "1318",
    "id": "MASC-281"
  },
  {
    "name": "Jaqueta com Capuz, Bolsos e Bordado",
    "cat": "MASC",
    "sub": "Casacos & Jaquetas",
    "price": 170.0,
    "sizes": [
      "Único"
    ],
    "code": "1317",
    "id": "MASC-282"
  },
  {
    "name": "Jaqueta com Capuz, Bolsos e Estampa",
    "cat": "MASC",
    "sub": "Casacos & Jaquetas",
    "price": 170.0,
    "sizes": [
      "Único"
    ],
    "code": "1316",
    "id": "MASC-283"
  },
  {
    "name": "Jaqueta com Retilinea, Bolsos e Estampas",
    "cat": "MASC",
    "sub": "Casacos & Jaquetas",
    "price": 170.0,
    "sizes": [
      "Único"
    ],
    "code": "1323",
    "id": "MASC-284"
  },
  {
    "name": "Legging com Bolso e Aplique",
    "cat": "MASC",
    "sub": "Camisetas",
    "price": 75.0,
    "sizes": [
      "Único"
    ],
    "code": "1314",
    "id": "MASC-285"
  },
  {
    "name": "Legging com Bolso e Estampa",
    "cat": "MASC",
    "sub": "Camisetas",
    "price": 75.0,
    "sizes": [
      "Único"
    ],
    "code": "1313",
    "id": "MASC-286"
  },
  {
    "name": "Macacão Jeans",
    "cat": "MASC",
    "sub": "Calças Jeans",
    "price": 174.0,
    "sizes": [
      "46"
    ],
    "code": "797",
    "id": "MASC-287"
  },
  {
    "name": "Premier Berm Jeans Ly Cetim Lucy Cinto",
    "cat": "MASC",
    "sub": "Calças Jeans",
    "price": 144.99,
    "sizes": [
      "Único"
    ],
    "code": "1743",
    "id": "MASC-288"
  },
  {
    "name": "Premier Bermuda Alfaiat Ly Bol em Camel",
    "cat": "MASC",
    "sub": "Bermudas & Shorts",
    "price": 144.99,
    "sizes": [
      "Único"
    ],
    "code": "1738",
    "id": "MASC-289"
  },
  {
    "name": "Premier Bermuda Je Ly",
    "cat": "MASC",
    "sub": "Bermudas & Shorts",
    "price": 179.99,
    "sizes": [
      "GG"
    ],
    "code": "1746",
    "id": "MASC-290"
  },
  {
    "name": "Premier Bermuda Jeans Ly Indra C/cinto",
    "cat": "MASC",
    "sub": "Calças Jeans",
    "price": 164.99,
    "sizes": [
      "Único"
    ],
    "code": "1747",
    "id": "MASC-291"
  },
  {
    "name": "Premier Bermuda Jes Ly",
    "cat": "MASC",
    "sub": "Bermudas & Shorts",
    "price": 179.99,
    "sizes": [
      "GG"
    ],
    "code": "1748",
    "id": "MASC-292"
  },
  {
    "name": "Premier Bermuda Ly Bol Emb Cetim Caqui",
    "cat": "MASC",
    "sub": "Bermudas & Shorts",
    "price": 149.99,
    "sizes": [
      "Único"
    ],
    "code": "1737",
    "id": "MASC-293"
  },
  {
    "name": "Premier Bermuda Sarj Ly Cargo Util.came",
    "cat": "MASC",
    "sub": "Bermudas & Shorts",
    "price": 159.99,
    "sizes": [
      "Único"
    ],
    "code": "1739",
    "id": "MASC-294"
  },
  {
    "name": "Premier Bermuda Sarja Ly Bol Embutido Av",
    "cat": "MASC",
    "sub": "Bermudas & Shorts",
    "price": 159.99,
    "sizes": [
      "Único"
    ],
    "code": "1750",
    "id": "MASC-295"
  },
  {
    "name": "Premier Jeans Ly Sport Fino Cetim Shine",
    "cat": "MASC",
    "sub": "Calças Jeans",
    "price": 160.0,
    "sizes": [
      "Único"
    ],
    "code": "1352",
    "id": "MASC-296"
  },
  {
    "name": "Premier Jeans Ly Wide Leg Phelps Cinto",
    "cat": "MASC",
    "sub": "Calças Jeans",
    "price": 189.99,
    "sizes": [
      "Único"
    ],
    "code": "1727",
    "id": "MASC-297"
  },
  {
    "name": "Premier Masc Sarj Ly Spor Fino Conf Pret",
    "cat": "MASC",
    "sub": "Camisetas",
    "price": 165.0,
    "sizes": [
      "Único"
    ],
    "code": "1345",
    "id": "MASC-298"
  },
  {
    "name": "Premier Masc Sarj Ly Spr Fino Conf Areia",
    "cat": "MASC",
    "sub": "Camisetas",
    "price": 165.0,
    "sizes": [
      "Único"
    ],
    "code": "1346",
    "id": "MASC-299"
  },
  {
    "name": "Premier Sarja Ly Spor Fino New Conf Caqu",
    "cat": "MASC",
    "sub": "Camisetas",
    "price": 165.0,
    "sizes": [
      "Único"
    ],
    "code": "1347",
    "id": "MASC-300"
  },
  {
    "name": "Premier Sarja Ly Sport Fino Cetim Preto",
    "cat": "MASC",
    "sub": "Camisetas",
    "price": 180.0,
    "sizes": [
      "Único"
    ],
    "code": "1353",
    "id": "MASC-301"
  },
  {
    "name": "Premier Short Jeans Alfaiataria Liz C/ci",
    "cat": "MASC",
    "sub": "Calças Jeans",
    "price": 134.99,
    "sizes": [
      "Único"
    ],
    "code": "1754",
    "id": "MASC-302"
  },
  {
    "name": "Premier Short Mom Sarja Ly White Denimo",
    "cat": "MASC",
    "sub": "Calças Jeans",
    "price": 144.99,
    "sizes": [
      "Único"
    ],
    "code": "1753",
    "id": "MASC-303"
  },
  {
    "name": "Premier Short Sport Fino Cetim Lito Coff",
    "cat": "MASC",
    "sub": "Bermudas & Shorts",
    "price": 129.99,
    "sizes": [
      "Único"
    ],
    "code": "1897",
    "id": "MASC-304"
  },
  {
    "name": "Premier Short Sport Fino Cetim Lito Pret",
    "cat": "MASC",
    "sub": "Bermudas & Shorts",
    "price": 134.99,
    "sizes": [
      "Único"
    ],
    "code": "1729",
    "id": "MASC-305"
  },
  {
    "name": "Regata",
    "cat": "MASC",
    "sub": "Camisetas",
    "price": 104.99,
    "sizes": [
      "M",
      "G",
      "G2",
      "G3",
      "G4",
      "GG",
      "03",
      "04",
      "06",
      "08",
      "10",
      "12",
      "14"
    ],
    "code": "1644",
    "id": "MASC-306"
  },
  {
    "name": "Regata 10anos (un)",
    "cat": "MASC",
    "sub": "Camisetas",
    "price": 12.0,
    "sizes": [
      "Único"
    ],
    "code": "849",
    "id": "MASC-307"
  },
  {
    "name": "Regata 16anos (un)",
    "cat": "MASC",
    "sub": "Camisetas",
    "price": 54.99,
    "sizes": [
      "Único"
    ],
    "code": "856",
    "id": "MASC-308"
  },
  {
    "name": "Regata Ex1 (un)",
    "cat": "MASC",
    "sub": "Camisetas",
    "price": 54.99,
    "sizes": [
      "Único"
    ],
    "code": "857",
    "id": "MASC-309"
  },
  {
    "name": "Regata Ex2 (un)",
    "cat": "MASC",
    "sub": "Camisetas",
    "price": 54.99,
    "sizes": [
      "Único"
    ],
    "code": "858",
    "id": "MASC-310"
  },
  {
    "name": "Regata Ex3 (un)",
    "cat": "MASC",
    "sub": "Camisetas",
    "price": 59.99,
    "sizes": [
      "Único"
    ],
    "code": "859",
    "id": "MASC-311"
  },
  {
    "name": "Regata Ex4 (un)",
    "cat": "MASC",
    "sub": "Camisetas",
    "price": 59.99,
    "sizes": [
      "Único"
    ],
    "code": "860",
    "id": "MASC-312"
  },
  {
    "name": "Regata Machao",
    "cat": "MASC",
    "sub": "Camisetas",
    "price": 1.0,
    "sizes": [
      "08",
      "10",
      "14"
    ],
    "code": "901",
    "id": "MASC-313"
  },
  {
    "name": "Regata com Estampa",
    "cat": "MASC",
    "sub": "Camisetas",
    "price": 60.0,
    "sizes": [
      "Único"
    ],
    "code": "1305",
    "id": "MASC-314"
  },
  {
    "name": "Remier Berm Short Elastico Sarja Bege",
    "cat": "MASC",
    "sub": "Bermudas & Shorts",
    "price": 139.99,
    "sizes": [
      "Único"
    ],
    "code": "1740",
    "id": "MASC-315"
  },
  {
    "name": "Remier Berm Short Elastico Sarja Camel",
    "cat": "MASC",
    "sub": "Bermudas & Shorts",
    "price": 139.99,
    "sizes": [
      "Único"
    ],
    "code": "1741",
    "id": "MASC-316"
  },
  {
    "name": "Remier Berm Short Elastico Sarja Preto",
    "cat": "MASC",
    "sub": "Bermudas & Shorts",
    "price": 139.99,
    "sizes": [
      "Único"
    ],
    "code": "1742",
    "id": "MASC-317"
  },
  {
    "name": "Short",
    "cat": "MASC",
    "sub": "Bermudas & Shorts",
    "price": 94.99,
    "sizes": [
      "P",
      "M",
      "G",
      "GG",
      "04",
      "06",
      "08",
      "10",
      "12",
      "14",
      "16"
    ],
    "code": "938",
    "id": "MASC-318"
  },
  {
    "name": "Short Alfaiataria Barbarella 017 Plus",
    "cat": "MASC",
    "sub": "Bermudas & Shorts",
    "price": 85.0,
    "sizes": [
      "Único"
    ],
    "code": "1341",
    "id": "MASC-319"
  },
  {
    "name": "Short Brim",
    "cat": "MASC",
    "sub": "Bermudas & Shorts",
    "price": 22.0,
    "sizes": [
      "GG"
    ],
    "code": "962",
    "id": "MASC-320"
  },
  {
    "name": "Short Casual Alfaiataria Plus",
    "cat": "MASC",
    "sub": "Bermudas & Shorts",
    "price": 85.0,
    "sizes": [
      "Único"
    ],
    "code": "1340",
    "id": "MASC-321"
  },
  {
    "name": "Short Elastano Mesclado Plus",
    "cat": "MASC",
    "sub": "Bermudas & Shorts",
    "price": 85.0,
    "sizes": [
      "Único"
    ],
    "code": "1344",
    "id": "MASC-322"
  },
  {
    "name": "Short Jeans",
    "cat": "MASC",
    "sub": "Calças Jeans",
    "price": 169.99,
    "sizes": [
      "P",
      "G",
      "GG",
      "36",
      "38",
      "40",
      "42",
      "44",
      "46",
      "04",
      "06",
      "10",
      "12",
      "14",
      "16",
      "54"
    ],
    "code": "968",
    "id": "MASC-323"
  },
  {
    "name": "Short Jeans 1 Ano (un)",
    "cat": "MASC",
    "sub": "Calças Jeans",
    "price": 74.99,
    "sizes": [
      "Único"
    ],
    "code": "973",
    "id": "MASC-324"
  },
  {
    "name": "Short Jeans 2 Anos (un)",
    "cat": "MASC",
    "sub": "Calças Jeans",
    "price": 74.99,
    "sizes": [
      "Único"
    ],
    "code": "989",
    "id": "MASC-325"
  },
  {
    "name": "Short Jeans 3 Anos (un)",
    "cat": "MASC",
    "sub": "Calças Jeans",
    "price": 39.99,
    "sizes": [
      "Único"
    ],
    "code": "994",
    "id": "MASC-326"
  },
  {
    "name": "Short Jeans 4 Anos (un)",
    "cat": "MASC",
    "sub": "Calças Jeans",
    "price": 84.99,
    "sizes": [
      "Único"
    ],
    "code": "1002",
    "id": "MASC-327"
  },
  {
    "name": "Short Jeans 6 Anos (un)",
    "cat": "MASC",
    "sub": "Calças Jeans",
    "price": 104.0,
    "sizes": [
      "Único"
    ],
    "code": "1027",
    "id": "MASC-328"
  },
  {
    "name": "Short Jeans 8 Anos (un)",
    "cat": "MASC",
    "sub": "Calças Jeans",
    "price": 104.0,
    "sizes": [
      "Único"
    ],
    "code": "1035",
    "id": "MASC-329"
  },
  {
    "name": "Short Jeans M/c",
    "cat": "MASC",
    "sub": "Calças Jeans",
    "price": 140.0,
    "sizes": [
      "36",
      "38",
      "40",
      "42",
      "44",
      "46"
    ],
    "code": "1045",
    "id": "MASC-330"
  },
  {
    "name": "Short Liso No Elastano Plus Ref Sort",
    "cat": "MASC",
    "sub": "Bermudas & Shorts",
    "price": 85.0,
    "sizes": [
      "Único"
    ],
    "code": "1343",
    "id": "MASC-331"
  },
  {
    "name": "Short Liso Rip Stop Plus",
    "cat": "MASC",
    "sub": "Bermudas & Shorts",
    "price": 85.0,
    "sizes": [
      "Único"
    ],
    "code": "1342",
    "id": "MASC-332"
  },
  {
    "name": "Short Mauricinho",
    "cat": "MASC",
    "sub": "Bermudas & Shorts",
    "price": 109.99,
    "sizes": [
      "P",
      "M",
      "G",
      "G4",
      "GG",
      "XG"
    ],
    "code": "1087",
    "id": "MASC-333"
  },
  {
    "name": "Short Mauricinho G7 (un)",
    "cat": "MASC",
    "sub": "Bermudas & Shorts",
    "price": 89.99,
    "sizes": [
      "Único"
    ],
    "code": "1092",
    "id": "MASC-334"
  },
  {
    "name": "Short Mauricinho Gg (un) 13)",
    "cat": "MASC",
    "sub": "Bermudas & Shorts",
    "price": 49.99,
    "sizes": [
      "Único"
    ],
    "code": "1095",
    "id": "MASC-335"
  },
  {
    "name": "Short Mauricinho Xgg (un)",
    "cat": "MASC",
    "sub": "Bermudas & Shorts",
    "price": 25.0,
    "sizes": [
      "Único"
    ],
    "code": "1111",
    "id": "MASC-336"
  },
  {
    "name": "Short Promoção",
    "cat": "MASC",
    "sub": "Bermudas & Shorts",
    "price": 15.0,
    "sizes": [
      "G",
      "GG"
    ],
    "code": "1114",
    "id": "MASC-337"
  },
  {
    "name": "Short Sarja",
    "cat": "MASC",
    "sub": "Bermudas & Shorts",
    "price": 104.99,
    "sizes": [
      "Único"
    ],
    "code": "1633",
    "id": "MASC-338"
  },
  {
    "name": "Short Tactel",
    "cat": "MASC",
    "sub": "Bermudas & Shorts",
    "price": 22.0,
    "sizes": [
      "P",
      "M",
      "G",
      "12",
      "14"
    ],
    "code": "1117",
    "id": "MASC-339"
  },
  {
    "name": "Short Tactel 6 Anos (un)",
    "cat": "MASC",
    "sub": "Bermudas & Shorts",
    "price": 15.0,
    "sizes": [
      "Único"
    ],
    "code": "1119",
    "id": "MASC-340"
  },
  {
    "name": "Short Tactel 8 Anos (un)",
    "cat": "MASC",
    "sub": "Bermudas & Shorts",
    "price": 8.0,
    "sizes": [
      "Único"
    ],
    "code": "1120",
    "id": "MASC-341"
  },
  {
    "name": "Bermuda Infantil",
    "cat": "INF",
    "sub": "Bermudas & Shorts",
    "price": 104.99,
    "sizes": [
      "Único"
    ],
    "code": "1625",
    "id": "INF-342"
  },
  {
    "name": "Calça Infantil",
    "cat": "INF",
    "sub": "Calças",
    "price": 64.99,
    "sizes": [
      "Único"
    ],
    "code": "1624",
    "id": "INF-343"
  },
  {
    "name": "Calça Legue Infantil",
    "cat": "INF",
    "sub": "Calças",
    "price": 18.0,
    "sizes": [
      "14"
    ],
    "code": "44",
    "id": "INF-344"
  },
  {
    "name": "Calçatactel Infantil",
    "cat": "INF",
    "sub": "Calças",
    "price": 40.0,
    "sizes": [
      "10"
    ],
    "code": "122",
    "id": "INF-345"
  },
  {
    "name": "Conjunto Infantil 1ano (un)",
    "cat": "INF",
    "sub": "Conjuntos",
    "price": 45.0,
    "sizes": [
      "Único"
    ],
    "code": "555",
    "id": "INF-346"
  },
  {
    "name": "Vestido Infantil",
    "cat": "INF",
    "sub": "Vestidos",
    "price": 59.99,
    "sizes": [
      "16"
    ],
    "code": "1236",
    "id": "INF-347"
  },
  {
    "name": "Afiador Facas Pt 19cm",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 24.0,
    "sizes": [
      "Único"
    ],
    "code": "1700",
    "id": "SAC-348"
  },
  {
    "name": "Aparelho de Jantar",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 320.0,
    "sizes": [
      "Único"
    ],
    "code": "1377",
    "id": "SAC-349"
  },
  {
    "name": "Aparelho de Jantar 16pcs",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 160.0,
    "sizes": [
      "Único"
    ],
    "code": "1705",
    "id": "SAC-350"
  },
  {
    "name": "Aparelho de Jantar 20pcs",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 350.0,
    "sizes": [
      "Único"
    ],
    "code": "1686",
    "id": "SAC-351"
  },
  {
    "name": "Batedeira Agratto",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 780.0,
    "sizes": [
      "Único"
    ],
    "code": "1677",
    "id": "SAC-352"
  },
  {
    "name": "Bau Grande",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 320.0,
    "sizes": [
      "Único"
    ],
    "code": "1706",
    "id": "SAC-353"
  },
  {
    "name": "Cadeira Infantil Metal 25kg",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 65.0,
    "sizes": [
      "Único"
    ],
    "code": "1618",
    "id": "SAC-354"
  },
  {
    "name": "Caneca de Time (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 64.99,
    "sizes": [
      "Único"
    ],
    "code": "254",
    "id": "SAC-355"
  },
  {
    "name": "Canetinha Bob Good 36pçs (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 140.0,
    "sizes": [
      "Único"
    ],
    "code": "255",
    "id": "SAC-356"
  },
  {
    "name": "Capa Colcháo 1pç Solteiro (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 49.99,
    "sizes": [
      "Único"
    ],
    "code": "256",
    "id": "SAC-357"
  },
  {
    "name": "Capa Colcháo 2pç Solteiro (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 74.99,
    "sizes": [
      "Único"
    ],
    "code": "257",
    "id": "SAC-358"
  },
  {
    "name": "Capa Colchão Malha com Zíper 0,88x1,88-20cm Solteiro (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 45.0,
    "sizes": [
      "Único"
    ],
    "code": "261",
    "id": "SAC-359"
  },
  {
    "name": "Capa Colchão Microfibra 2pç Solteiro (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 39.99,
    "sizes": [
      "Único"
    ],
    "code": "262",
    "id": "SAC-360"
  },
  {
    "name": "Capa Colchão com Zíper 1pç Solteiro (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 59.99,
    "sizes": [
      "Único"
    ],
    "code": "258",
    "id": "SAC-361"
  },
  {
    "name": "Capa Colchão com Zíper 50x1,90 - 18cm Solteiro (un) (7897061",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 59.99,
    "sizes": [
      "Único"
    ],
    "code": "259",
    "id": "SAC-362"
  },
  {
    "name": "Capa Colchão com Zíper Solteiro (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 29.99,
    "sizes": [
      "Único"
    ],
    "code": "260",
    "id": "SAC-363"
  },
  {
    "name": "Capa P/ Sofa 3, 2 Lug. Malha Azul",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 250.0,
    "sizes": [
      "Único"
    ],
    "code": "1409",
    "id": "SAC-364"
  },
  {
    "name": "Capa P/ Sofa 3, 2 Lug. Malha Bege",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 250.0,
    "sizes": [
      "Único"
    ],
    "code": "1408",
    "id": "SAC-365"
  },
  {
    "name": "Capa P/ Sofa 3, 2 Lug. Malha Cinza",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 250.0,
    "sizes": [
      "Único"
    ],
    "code": "1412",
    "id": "SAC-366"
  },
  {
    "name": "Capa P/ Sofa 3, 2 Lug. Malha Vermelho",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 250.0,
    "sizes": [
      "Único"
    ],
    "code": "1410",
    "id": "SAC-367"
  },
  {
    "name": "Capa P/ Sofa Bem Estar 2 e 3 Lugares Azul",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 190.0,
    "sizes": [
      "Único"
    ],
    "code": "1414",
    "id": "SAC-368"
  },
  {
    "name": "Capa P/ Sofa Bem Estar 2 e 3 Lugares Bege",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 190.0,
    "sizes": [
      "Único"
    ],
    "code": "1413",
    "id": "SAC-369"
  },
  {
    "name": "Capa P/ Sofa Bem Estar 2 e 3 Lugares Cinza",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 190.0,
    "sizes": [
      "Único"
    ],
    "code": "1418",
    "id": "SAC-370"
  },
  {
    "name": "Capa P/ Sofa Bem Estar 2 e 3 Lugares Marrom",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 190.0,
    "sizes": [
      "Único"
    ],
    "code": "1417",
    "id": "SAC-371"
  },
  {
    "name": "Capa P/ Sofa Bem Estar 2 e 3 Lugares Vermelho",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 190.0,
    "sizes": [
      "Único"
    ],
    "code": "1416",
    "id": "SAC-372"
  },
  {
    "name": "Capa P/ Sofa Bem Estar 2 e 3 Lugares Vinho",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 190.0,
    "sizes": [
      "Único"
    ],
    "code": "1415",
    "id": "SAC-373"
  },
  {
    "name": "Capa P/ Sofa Bem Estar Hidro-repelente 2 e 3 Lugares Bege",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 210.0,
    "sizes": [
      "Único"
    ],
    "code": "1405",
    "id": "SAC-374"
  },
  {
    "name": "Capa P/ Sofa Bem Estar Hidro-repelente 2 e 3 Lugares Marrom",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 210.0,
    "sizes": [
      "Único"
    ],
    "code": "1407",
    "id": "SAC-375"
  },
  {
    "name": "Capa P/ Sofa Bem Estar Hidro-repelente 2 e 3 Lugares Vinho",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 210.0,
    "sizes": [
      "Único"
    ],
    "code": "1406",
    "id": "SAC-376"
  },
  {
    "name": "Capa Protetora Colchão com Elastico Solteiro (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 100.0,
    "sizes": [
      "Único"
    ],
    "code": "268",
    "id": "SAC-377"
  },
  {
    "name": "Capa Protetora de Casal 1pç (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 49.99,
    "sizes": [
      "Único"
    ],
    "code": "269",
    "id": "SAC-378"
  },
  {
    "name": "Capa Protetora de Colchão King 1,98x2,03cm (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 175.0,
    "sizes": [
      "Único"
    ],
    "code": "272",
    "id": "SAC-379"
  },
  {
    "name": "Capa Protetora de Colchão Malha Queem 1,98x1,58cm (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 75.0,
    "sizes": [
      "Único"
    ],
    "code": "273",
    "id": "SAC-380"
  },
  {
    "name": "Capa Protetora de Colchão Malha Queem 3pçs (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 104.99,
    "sizes": [
      "Único"
    ],
    "code": "270",
    "id": "SAC-381"
  },
  {
    "name": "Capa Protetora de Colchão Queem1,60x2,oocm (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 115.0,
    "sizes": [
      "Único"
    ],
    "code": "271",
    "id": "SAC-382"
  },
  {
    "name": "Capa Protetora de Malha Casal (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 60.0,
    "sizes": [
      "Único"
    ],
    "code": "275",
    "id": "SAC-383"
  },
  {
    "name": "Capa Protetora de Tavesseiro (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 15.0,
    "sizes": [
      "Único"
    ],
    "code": "276",
    "id": "SAC-384"
  },
  {
    "name": "Capa Protetora de Tavesseiro 50x70cm (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 39.99,
    "sizes": [
      "Único"
    ],
    "code": "277",
    "id": "SAC-385"
  },
  {
    "name": "Capa de Almofada (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 35.0,
    "sizes": [
      "Único"
    ],
    "code": "263",
    "id": "SAC-386"
  },
  {
    "name": "Capa de Maquina",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 74.99,
    "sizes": [
      "12"
    ],
    "code": "267",
    "id": "SAC-387"
  },
  {
    "name": "Capa de Maquina 12 a 16kg (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 79.99,
    "sizes": [
      "Único"
    ],
    "code": "266",
    "id": "SAC-388"
  },
  {
    "name": "Chaleira Eletrica Polak 2,0l",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 105.0,
    "sizes": [
      "Único"
    ],
    "code": "1676",
    "id": "SAC-389"
  },
  {
    "name": "Churrasqueira Portatil (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 250.0,
    "sizes": [
      "Único"
    ],
    "code": "279",
    "id": "SAC-390"
  },
  {
    "name": "Churrasqueira Portatil Hai Brasil",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 220.0,
    "sizes": [
      "Único"
    ],
    "code": "1673",
    "id": "SAC-391"
  },
  {
    "name": "Claleira Eletrica 2,0l (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 110.0,
    "sizes": [
      "Único"
    ],
    "code": "280",
    "id": "SAC-392"
  },
  {
    "name": "Cobre Leito+protetor Trav 100%pes Estampado",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 149.99,
    "sizes": [
      "02",
      "03"
    ],
    "code": "1271",
    "id": "SAC-393"
  },
  {
    "name": "Cobre Leito+protetor Trav 100%pes Tinto",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 95.0,
    "sizes": [
      "02"
    ],
    "code": "1273",
    "id": "SAC-394"
  },
  {
    "name": "Cobreleito Dupla Face Casal (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 119.99,
    "sizes": [
      "Único"
    ],
    "code": "282",
    "id": "SAC-395"
  },
  {
    "name": "Cobreleito Dupla Face King (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 149.99,
    "sizes": [
      "Único"
    ],
    "code": "284",
    "id": "SAC-396"
  },
  {
    "name": "Cobreleito Piquet Solteiro (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 119.99,
    "sizes": [
      "Único"
    ],
    "code": "285",
    "id": "SAC-397"
  },
  {
    "name": "Cobreleito Queen (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 129.99,
    "sizes": [
      "Único"
    ],
    "code": "286",
    "id": "SAC-398"
  },
  {
    "name": "Cobreleito Solteiro (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 105.0,
    "sizes": [
      "Único"
    ],
    "code": "289",
    "id": "SAC-399"
  },
  {
    "name": "Colcha Casal 2,20x2,40 (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 184.99,
    "sizes": [
      "Único"
    ],
    "code": "292",
    "id": "SAC-400"
  },
  {
    "name": "Colcha João Solteiro (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 95.0,
    "sizes": [
      "Único"
    ],
    "code": "293",
    "id": "SAC-401"
  },
  {
    "name": "Colcha King 2,40x2,80cm (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 209.99,
    "sizes": [
      "Único"
    ],
    "code": "294",
    "id": "SAC-402"
  },
  {
    "name": "Colcha Linhao Casal (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 49.99,
    "sizes": [
      "Único"
    ],
    "code": "295",
    "id": "SAC-403"
  },
  {
    "name": "Colcha Linhão Solteiro (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 49.99,
    "sizes": [
      "Único"
    ],
    "code": "296",
    "id": "SAC-404"
  },
  {
    "name": "Colcha Patchwordk Boult (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 89.99,
    "sizes": [
      "Único"
    ],
    "code": "297",
    "id": "SAC-405"
  },
  {
    "name": "Colcha Preta Casal (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 129.99,
    "sizes": [
      "Único"
    ],
    "code": "298",
    "id": "SAC-406"
  },
  {
    "name": "Colcha Solteiro (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 79.99,
    "sizes": [
      "Único"
    ],
    "code": "299",
    "id": "SAC-407"
  },
  {
    "name": "Conj. Academia",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 209.99,
    "sizes": [
      "M",
      "G",
      "GG"
    ],
    "code": "303",
    "id": "SAC-408"
  },
  {
    "name": "Conj. Academia Unico M/g (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 65.0,
    "sizes": [
      "Único"
    ],
    "code": "309",
    "id": "SAC-409"
  },
  {
    "name": "Conj. Baby",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 139.99,
    "sizes": [
      "P",
      "M",
      "G",
      "GG"
    ],
    "code": "329",
    "id": "SAC-410"
  },
  {
    "name": "Conj. Fem. Body Cotton / Jardineira Moletom Cotele",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 104.99,
    "sizes": [
      "Único"
    ],
    "code": "1868",
    "id": "SAC-411"
  },
  {
    "name": "Conj. Fem. Body Tricot Brush / Salopete Tweed Drika",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 94.99,
    "sizes": [
      "Único"
    ],
    "code": "1867",
    "id": "SAC-412"
  },
  {
    "name": "Conj. Infantil",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 259.99,
    "sizes": [
      "P",
      "M",
      "G",
      "01",
      "02",
      "04",
      "06",
      "10",
      "12",
      "14",
      "16"
    ],
    "code": "355",
    "id": "SAC-413"
  },
  {
    "name": "Conj. Infantil 1 Ano (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 144.99,
    "sizes": [
      "Único"
    ],
    "code": "380",
    "id": "SAC-414"
  },
  {
    "name": "Conj. Infantil 16anos (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 134.99,
    "sizes": [
      "Único"
    ],
    "code": "412",
    "id": "SAC-415"
  },
  {
    "name": "Conj. Infantil 1ano (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 79.99,
    "sizes": [
      "Único"
    ],
    "code": "415",
    "id": "SAC-416"
  },
  {
    "name": "Conj. Infantil 2 Ano (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 94.99,
    "sizes": [
      "Único"
    ],
    "code": "416",
    "id": "SAC-417"
  },
  {
    "name": "Conj. Infantil 2 Anos (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 189.99,
    "sizes": [
      "Único"
    ],
    "code": "419",
    "id": "SAC-418"
  },
  {
    "name": "Conj. Infantil 3 Anos (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 234.99,
    "sizes": [
      "Único"
    ],
    "code": "424",
    "id": "SAC-419"
  },
  {
    "name": "Conj. Infantil 4 Anos (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 144.99,
    "sizes": [
      "Único"
    ],
    "code": "427",
    "id": "SAC-420"
  },
  {
    "name": "Conj. Infantil 6 (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 29.99,
    "sizes": [
      "Único"
    ],
    "code": "436",
    "id": "SAC-421"
  },
  {
    "name": "Conj. Infantil 6 Anos (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 259.99,
    "sizes": [
      "Único"
    ],
    "code": "447",
    "id": "SAC-422"
  },
  {
    "name": "Conj. Infantil 8 Anos (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 179.99,
    "sizes": [
      "Único"
    ],
    "code": "455",
    "id": "SAC-423"
  },
  {
    "name": "Conj. Infantil 8anos (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 259.99,
    "sizes": [
      "Único"
    ],
    "code": "466",
    "id": "SAC-424"
  },
  {
    "name": "Conj. Infantil Ex2 (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 79.99,
    "sizes": [
      "Único"
    ],
    "code": "468",
    "id": "SAC-425"
  },
  {
    "name": "Conj. Jardineira de Frio",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 70.0,
    "sizes": [
      "01",
      "02",
      "03",
      "04",
      "06",
      "08",
      "10"
    ],
    "code": "477",
    "id": "SAC-426"
  },
  {
    "name": "Conj. Jardineira de Frio 1 Ano (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 70.0,
    "sizes": [
      "Único"
    ],
    "code": "485",
    "id": "SAC-427"
  },
  {
    "name": "Conj. Moleton",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 204.99,
    "sizes": [
      "01",
      "02",
      "03",
      "04",
      "06",
      "08",
      "10"
    ],
    "code": "494",
    "id": "SAC-428"
  },
  {
    "name": "Conj. Pijama 1 Ano (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 18.0,
    "sizes": [
      "Único"
    ],
    "code": "554",
    "id": "SAC-429"
  },
  {
    "name": "Conj. de Talheres Inox Asda Fratelli 24pcs",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 95.0,
    "sizes": [
      "Único"
    ],
    "code": "1713",
    "id": "SAC-430"
  },
  {
    "name": "Conj. de Talheres Inox Asda Fratelli 24pçs (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 75.0,
    "sizes": [
      "Único"
    ],
    "code": "354",
    "id": "SAC-431"
  },
  {
    "name": "Copo Termico",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 105.0,
    "sizes": [
      "Único"
    ],
    "code": "1369",
    "id": "SAC-432"
  },
  {
    "name": "Copo Termico 1000ml",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 105.0,
    "sizes": [
      "Único"
    ],
    "code": "1723",
    "id": "SAC-433"
  },
  {
    "name": "Copo Termico 900ml",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 85.0,
    "sizes": [
      "Único"
    ],
    "code": "1722",
    "id": "SAC-434"
  },
  {
    "name": "Copo Termico C/alca Flamengo 1200ml",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 190.0,
    "sizes": [
      "Único"
    ],
    "code": "1698",
    "id": "SAC-435"
  },
  {
    "name": "Copo Termico C/tampa Flamengo 360ml",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 105.0,
    "sizes": [
      "Único"
    ],
    "code": "1697",
    "id": "SAC-436"
  },
  {
    "name": "Copo Termico C/tampa Flamengo 550ml",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 105.0,
    "sizes": [
      "Único"
    ],
    "code": "1674",
    "id": "SAC-437"
  },
  {
    "name": "Copo Termico Inox 1000ml",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 105.0,
    "sizes": [
      "Único"
    ],
    "code": "1696",
    "id": "SAC-438"
  },
  {
    "name": "Copo Térmico C/tampa Flamengo 1200ml (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 190.0,
    "sizes": [
      "Único"
    ],
    "code": "558",
    "id": "SAC-439"
  },
  {
    "name": "Copo Térmico C/tampa Flamengo 360ml (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 105.0,
    "sizes": [
      "Único"
    ],
    "code": "559",
    "id": "SAC-440"
  },
  {
    "name": "Copo Térmico C/tampa Flamengo Ssoml (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 150.0,
    "sizes": [
      "Único"
    ],
    "code": "560",
    "id": "SAC-441"
  },
  {
    "name": "Copo Térmico Capivara 890ml (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 85.0,
    "sizes": [
      "Único"
    ],
    "code": "561",
    "id": "SAC-442"
  },
  {
    "name": "Copo Térmico Inox 1000 Ml (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 105.0,
    "sizes": [
      "Único"
    ],
    "code": "562",
    "id": "SAC-443"
  },
  {
    "name": "Cortador de Unha (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 8.0,
    "sizes": [
      "Único"
    ],
    "code": "563",
    "id": "SAC-444"
  },
  {
    "name": "Cortina",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 280.0,
    "sizes": [
      "Único"
    ],
    "code": "1757",
    "id": "SAC-445"
  },
  {
    "name": "Cortina Blackout 1,70x2,0m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 220.0,
    "sizes": [
      "Único"
    ],
    "code": "567",
    "id": "SAC-446"
  },
  {
    "name": "Cortina Blackout 1,80x2,oom (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 160.0,
    "sizes": [
      "Único"
    ],
    "code": "568",
    "id": "SAC-447"
  },
  {
    "name": "Cortina Blackout 2,60x1,70m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 219.99,
    "sizes": [
      "Único"
    ],
    "code": "572",
    "id": "SAC-448"
  },
  {
    "name": "Cortina Blackout 2,60x2,30m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 284.99,
    "sizes": [
      "Único"
    ],
    "code": "573",
    "id": "SAC-449"
  },
  {
    "name": "Cortina Blackout 2,60x3,oom (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 300.0,
    "sizes": [
      "Único"
    ],
    "code": "574",
    "id": "SAC-450"
  },
  {
    "name": "Cortina Cozinha 1,80x1,45 (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 105.0,
    "sizes": [
      "Único"
    ],
    "code": "575",
    "id": "SAC-451"
  },
  {
    "name": "Cortina Infantil 1,80x2,oom (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 129.99,
    "sizes": [
      "Único"
    ],
    "code": "576",
    "id": "SAC-452"
  },
  {
    "name": "Cortina Infantil Kit 1,50x2,oom (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 185.0,
    "sizes": [
      "Único"
    ],
    "code": "577",
    "id": "SAC-453"
  },
  {
    "name": "Cortina Linhão 2,60x3,oom (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 509.99,
    "sizes": [
      "Único"
    ],
    "code": "578",
    "id": "SAC-454"
  },
  {
    "name": "Cortina Semi Blackout 1,70x2,0m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 115.0,
    "sizes": [
      "Único"
    ],
    "code": "580",
    "id": "SAC-455"
  },
  {
    "name": "Cortina Tafetá (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 159.99,
    "sizes": [
      "Único"
    ],
    "code": "581",
    "id": "SAC-456"
  },
  {
    "name": "Cutelo (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 60.0,
    "sizes": [
      "Único"
    ],
    "code": "584",
    "id": "SAC-457"
  },
  {
    "name": "Frigideira C/tampa de Vidro Wok 24cm",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 120.0,
    "sizes": [
      "Único"
    ],
    "code": "1710",
    "id": "SAC-458"
  },
  {
    "name": "Frigideira C/tampa de Vidro Wok 24cm (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 130.0,
    "sizes": [
      "Único"
    ],
    "code": "585",
    "id": "SAC-459"
  },
  {
    "name": "Frigideira Ceramica",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 210.0,
    "sizes": [
      "Único"
    ],
    "code": "1719",
    "id": "SAC-460"
  },
  {
    "name": "Frigideira Ceramica Max Chefe Fratelli 26cm",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 150.0,
    "sizes": [
      "Único"
    ],
    "code": "1715",
    "id": "SAC-461"
  },
  {
    "name": "Frigideira Ceramica Max Chefe Fratelli 26cm (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 180.0,
    "sizes": [
      "Único"
    ],
    "code": "586",
    "id": "SAC-462"
  },
  {
    "name": "Frigideira Profissional Wok",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 210.0,
    "sizes": [
      "34"
    ],
    "code": "1664",
    "id": "SAC-463"
  },
  {
    "name": "Frigideira Profissional Wok 34cm (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 85.0,
    "sizes": [
      "Único"
    ],
    "code": "587",
    "id": "SAC-464"
  },
  {
    "name": "Fritadeira Eletrica Sumay 127v 3,5l",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 490.0,
    "sizes": [
      "Único"
    ],
    "code": "1694",
    "id": "SAC-465"
  },
  {
    "name": "Fronha Liso 100%co 050 X 070 Cm Crystal",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 18.0,
    "sizes": [
      "Único"
    ],
    "code": "1260",
    "id": "SAC-466"
  },
  {
    "name": "Fronha com Zíper 70x50cm (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 15.0,
    "sizes": [
      "Único"
    ],
    "code": "588",
    "id": "SAC-467"
  },
  {
    "name": "Fronha de Almofada (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 39.99,
    "sizes": [
      "Único"
    ],
    "code": "589",
    "id": "SAC-468"
  },
  {
    "name": "Garrafa Termica Inox C/ Alca 480ml/ 500ml",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 36.0,
    "sizes": [
      "Único"
    ],
    "code": "1711",
    "id": "SAC-469"
  },
  {
    "name": "Garrafa Termica Siena 750ml",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 75.0,
    "sizes": [
      "Único"
    ],
    "code": "1699",
    "id": "SAC-470"
  },
  {
    "name": "Garrafa Termica Verona 1lt",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 95.0,
    "sizes": [
      "Único"
    ],
    "code": "1680",
    "id": "SAC-471"
  },
  {
    "name": "Garrafa Térmica (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 140.0,
    "sizes": [
      "Único"
    ],
    "code": "591",
    "id": "SAC-472"
  },
  {
    "name": "Garrafa Térmica 1lt (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 95.0,
    "sizes": [
      "Único"
    ],
    "code": "592",
    "id": "SAC-473"
  },
  {
    "name": "Garrafa Térmica Esportiva 580ml (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 45.0,
    "sizes": [
      "Único"
    ],
    "code": "593",
    "id": "SAC-474"
  },
  {
    "name": "Garrafa Térmica Inox C/alça 480ml/500ml (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 65.0,
    "sizes": [
      "Único"
    ],
    "code": "594",
    "id": "SAC-475"
  },
  {
    "name": "Garrafa Térmica Inox Ecos 1lt (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 95.0,
    "sizes": [
      "Único"
    ],
    "code": "595",
    "id": "SAC-476"
  },
  {
    "name": "Gp-218 Caixa de Som Portatil Cx C/",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 180.0,
    "sizes": [
      "40"
    ],
    "code": "1621",
    "id": "SAC-477"
  },
  {
    "name": "Gp-4456 Caixa de Som Portatil C/ C/",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 1700.0,
    "sizes": [
      "02"
    ],
    "code": "1620",
    "id": "SAC-478"
  },
  {
    "name": "Guarda Chuva Grande",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 55.0,
    "sizes": [
      "Único"
    ],
    "code": "1665",
    "id": "SAC-479"
  },
  {
    "name": "Guarda Chuva Grande (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 55.0,
    "sizes": [
      "Único"
    ],
    "code": "726",
    "id": "SAC-480"
  },
  {
    "name": "Jaq.inf.79%alg.19%pol.2,0%el.",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 129.99,
    "sizes": [
      "Único"
    ],
    "code": "1286",
    "id": "SAC-481"
  },
  {
    "name": "Jaq.juv.97%alg.3,0%el.",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 134.99,
    "sizes": [
      "Único"
    ],
    "code": "1287",
    "id": "SAC-482"
  },
  {
    "name": "Jogo Americano 33x43cm, 6 Peças (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 18.0,
    "sizes": [
      "Único"
    ],
    "code": "727",
    "id": "SAC-483"
  },
  {
    "name": "Jogo Americano 6 Peças (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 25.0,
    "sizes": [
      "Único"
    ],
    "code": "728",
    "id": "SAC-484"
  },
  {
    "name": "Jogo Cozinha (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 129.99,
    "sizes": [
      "Único"
    ],
    "code": "730",
    "id": "SAC-485"
  },
  {
    "name": "Jogo Lençol 3pçs (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 89.99,
    "sizes": [
      "Único"
    ],
    "code": "753",
    "id": "SAC-486"
  },
  {
    "name": "Jogo Lençol Casal 2,20x2,40m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 169.99,
    "sizes": [
      "Único"
    ],
    "code": "755",
    "id": "SAC-487"
  },
  {
    "name": "Jogo Lençol Casal 2,20x2,som (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 209.99,
    "sizes": [
      "Único"
    ],
    "code": "756",
    "id": "SAC-488"
  },
  {
    "name": "Jogo Lençol Casal 4pçs (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 169.99,
    "sizes": [
      "Único"
    ],
    "code": "757",
    "id": "SAC-489"
  },
  {
    "name": "Jogo Lençol Estamp. Casal 2,20x2,som (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 209.99,
    "sizes": [
      "Único"
    ],
    "code": "758",
    "id": "SAC-490"
  },
  {
    "name": "Jogo Lençol King 1,93x2,03m 3pçs (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 179.99,
    "sizes": [
      "Único"
    ],
    "code": "760",
    "id": "SAC-491"
  },
  {
    "name": "Jogo Lençol King 2,60x2,80m 4pçs (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 295.0,
    "sizes": [
      "Único"
    ],
    "code": "761",
    "id": "SAC-492"
  },
  {
    "name": "Jogo Lençol King 2,60x2,80m 6pçs (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 190.0,
    "sizes": [
      "Único"
    ],
    "code": "762",
    "id": "SAC-493"
  },
  {
    "name": "Jogo Lençol Malha C/elastico (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 80.0,
    "sizes": [
      "Único"
    ],
    "code": "765",
    "id": "SAC-494"
  },
  {
    "name": "Jogo Lençol Queem 1,58x1,98m 3pçs (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 120.0,
    "sizes": [
      "Único"
    ],
    "code": "766",
    "id": "SAC-495"
  },
  {
    "name": "Jogo Lençol Queem 2,40x2,60m 4pçs (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 189.99,
    "sizes": [
      "Único"
    ],
    "code": "767",
    "id": "SAC-496"
  },
  {
    "name": "Jogo Lençol Queen 1,58x1,98",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 89.99,
    "sizes": [
      "M"
    ],
    "code": "768",
    "id": "SAC-497"
  },
  {
    "name": "Jogo Lençol Queen 2,40x2,som (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 254.99,
    "sizes": [
      "Único"
    ],
    "code": "769",
    "id": "SAC-498"
  },
  {
    "name": "Jogo Lençol Super King 2,50x2,90m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 209.99,
    "sizes": [
      "Único"
    ],
    "code": "770",
    "id": "SAC-499"
  },
  {
    "name": "Jogo Roupa de Cama Liso 100%co",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 234.99,
    "sizes": [
      "02",
      "03",
      "04"
    ],
    "code": "1254",
    "id": "SAC-500"
  },
  {
    "name": "Jogo Toalha Banho 0,70x1,35m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 59.99,
    "sizes": [
      "Único"
    ],
    "code": "771",
    "id": "SAC-501"
  },
  {
    "name": "Jogo Toalha Banho 0,77x1,som (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 160.0,
    "sizes": [
      "Único"
    ],
    "code": "772",
    "id": "SAC-502"
  },
  {
    "name": "Jogo Xícaras Cerâmica 6pçs (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 140.0,
    "sizes": [
      "Único"
    ],
    "code": "773",
    "id": "SAC-503"
  },
  {
    "name": "Jogo com Facas com Cepo (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 190.0,
    "sizes": [
      "Único"
    ],
    "code": "729",
    "id": "SAC-504"
  },
  {
    "name": "Jogo de Assadeira (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 130.0,
    "sizes": [
      "Único"
    ],
    "code": "731",
    "id": "SAC-505"
  },
  {
    "name": "Jogo de Banheiro (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 55.0,
    "sizes": [
      "Único"
    ],
    "code": "732",
    "id": "SAC-506"
  },
  {
    "name": "Jogo de Banheiro 3pçs (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 105.0,
    "sizes": [
      "Único"
    ],
    "code": "733",
    "id": "SAC-507"
  },
  {
    "name": "Jogo de Banheiro Liso 3pçs (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 55.0,
    "sizes": [
      "Único"
    ],
    "code": "734",
    "id": "SAC-508"
  },
  {
    "name": "Jogo de Banheiro Top Max 3pcs",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 110.0,
    "sizes": [
      "Único"
    ],
    "code": "1675",
    "id": "SAC-509"
  },
  {
    "name": "Jogo de Banheiro Top Max 3pçs (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 105.0,
    "sizes": [
      "Único"
    ],
    "code": "736",
    "id": "SAC-510"
  },
  {
    "name": "Jogo de Cama Bamboo Queen 4 Pecas Areia",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 330.0,
    "sizes": [
      "Único"
    ],
    "code": "1404",
    "id": "SAC-511"
  },
  {
    "name": "Jogo de Cama Bamboo Queen 4 Pecas Branco",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 330.0,
    "sizes": [
      "Único"
    ],
    "code": "1401",
    "id": "SAC-512"
  },
  {
    "name": "Jogo de Cama Bamboo Queen 4 Pecas Cinza",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 330.0,
    "sizes": [
      "Único"
    ],
    "code": "1403",
    "id": "SAC-513"
  },
  {
    "name": "Jogo de Cama Bamboo Queen 4 Pecas Rosa",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 330.0,
    "sizes": [
      "Único"
    ],
    "code": "1402",
    "id": "SAC-514"
  },
  {
    "name": "Jogo de Cama Queem",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 189.99,
    "sizes": [
      "Único"
    ],
    "code": "1756",
    "id": "SAC-515"
  },
  {
    "name": "Jogo de Caneco 3 Peças (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 75.0,
    "sizes": [
      "Único"
    ],
    "code": "737",
    "id": "SAC-516"
  },
  {
    "name": "Jogo de Caneco 3pçs (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 95.0,
    "sizes": [
      "Único"
    ],
    "code": "738",
    "id": "SAC-517"
  },
  {
    "name": "Jogo de Frigideira 3 Pçs (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 380.0,
    "sizes": [
      "Único"
    ],
    "code": "739",
    "id": "SAC-518"
  },
  {
    "name": "Jogo de Lençol Duplo Solteiro 3 Pçs (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 130.0,
    "sizes": [
      "Único"
    ],
    "code": "740",
    "id": "SAC-519"
  },
  {
    "name": "Jogo de Panela (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 520.0,
    "sizes": [
      "Único"
    ],
    "code": "741",
    "id": "SAC-520"
  },
  {
    "name": "Jogo de Panela Alum. T/vdr Colorida Spçs (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 330.0,
    "sizes": [
      "Único"
    ],
    "code": "745",
    "id": "SAC-521"
  },
  {
    "name": "Jogo de Panela Alumínio Batido (cópia) (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 470.0,
    "sizes": [
      "Único"
    ],
    "code": "744",
    "id": "SAC-522"
  },
  {
    "name": "Jogo de Panela Alumínio Batido (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 420.0,
    "sizes": [
      "Único"
    ],
    "code": "743",
    "id": "SAC-523"
  },
  {
    "name": "Jogo de Passadeira 3pçs (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 95.0,
    "sizes": [
      "Único"
    ],
    "code": "746",
    "id": "SAC-524"
  },
  {
    "name": "Jogo de Passadeira Cozinha 3pçs (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 140.0,
    "sizes": [
      "Único"
    ],
    "code": "747",
    "id": "SAC-525"
  },
  {
    "name": "Jogo de Porta Travesseiros Maia 2 Pecas Cinza",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 70.0,
    "sizes": [
      "Único"
    ],
    "code": "1394",
    "id": "SAC-526"
  },
  {
    "name": "Jogo de Porta Travesseiros Maia 2 Pecas Rosa",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 70.0,
    "sizes": [
      "Único"
    ],
    "code": "1393",
    "id": "SAC-527"
  },
  {
    "name": "Jogo de Porta Travesseiros Maia 2 Pecas Taupe",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 70.0,
    "sizes": [
      "Único"
    ],
    "code": "1395",
    "id": "SAC-528"
  },
  {
    "name": "Jogo de Tacas Vdr Montevideo 6pcs 410ml",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 32.0,
    "sizes": [
      "Único"
    ],
    "code": "1702",
    "id": "SAC-529"
  },
  {
    "name": "Jogo de Xicaras Ceramica Viana 6pcs 160ml",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 140.0,
    "sizes": [
      "Único"
    ],
    "code": "1663",
    "id": "SAC-530"
  },
  {
    "name": "Jogo de Xícara Acrílico (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 70.0,
    "sizes": [
      "Único"
    ],
    "code": "748",
    "id": "SAC-531"
  },
  {
    "name": "Jogo de Xícaras Ceramica Viana 6pçs",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 140.0,
    "sizes": [
      "Único"
    ],
    "code": "752",
    "id": "SAC-532"
  },
  {
    "name": "Kit Banheiro",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 65.0,
    "sizes": [
      "Único"
    ],
    "code": "1366",
    "id": "SAC-533"
  },
  {
    "name": "Kit Colcha Boutti Casal (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 129.99,
    "sizes": [
      "Único"
    ],
    "code": "774",
    "id": "SAC-534"
  },
  {
    "name": "Kit Colcha Casal 2,20x2,40 (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 229.99,
    "sizes": [
      "Único"
    ],
    "code": "775",
    "id": "SAC-535"
  },
  {
    "name": "Kit Colcha Flanel Lavinia Casal 3 Pecas Areia",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 270.0,
    "sizes": [
      "Único"
    ],
    "code": "1396",
    "id": "SAC-536"
  },
  {
    "name": "Kit Colcha Flanel Lavinia Casal 3 Pecas Taupe",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 270.0,
    "sizes": [
      "Único"
    ],
    "code": "1397",
    "id": "SAC-537"
  },
  {
    "name": "Kit Colcha Flanel Lavinia Queen 3 Pecas Areia",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 300.0,
    "sizes": [
      "Único"
    ],
    "code": "1399",
    "id": "SAC-538"
  },
  {
    "name": "Kit Colcha Flanel Lavinia Queen 3 Pecas Cinza",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 300.0,
    "sizes": [
      "Único"
    ],
    "code": "1398",
    "id": "SAC-539"
  },
  {
    "name": "Kit Colcha Flanel Lavinia Queen 3 Pecas Taupe",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 300.0,
    "sizes": [
      "Único"
    ],
    "code": "1400",
    "id": "SAC-540"
  },
  {
    "name": "Kit Colcha Queem 2,40x2,60m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 259.99,
    "sizes": [
      "Único"
    ],
    "code": "776",
    "id": "SAC-541"
  },
  {
    "name": "Kit Coqueteleira 550ml 5pcs",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 60.0,
    "sizes": [
      "Único"
    ],
    "code": "1695",
    "id": "SAC-542"
  },
  {
    "name": "Kit Cozinha Kairos (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 110.0,
    "sizes": [
      "Único"
    ],
    "code": "777",
    "id": "SAC-543"
  },
  {
    "name": "Kit Jarra Caribe 5pcs",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 126.0,
    "sizes": [
      "Único"
    ],
    "code": "1701",
    "id": "SAC-544"
  },
  {
    "name": "Kit Jarra Plastico",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 55.0,
    "sizes": [
      "Único"
    ],
    "code": "1718",
    "id": "SAC-545"
  },
  {
    "name": "Kit Pia C/caixa Smile 3pcs",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 105.0,
    "sizes": [
      "Único"
    ],
    "code": "1709",
    "id": "SAC-546"
  },
  {
    "name": "Kit Pia C/caixa Smile 3pcs (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 105.0,
    "sizes": [
      "Único"
    ],
    "code": "778",
    "id": "SAC-547"
  },
  {
    "name": "Kit Tapete Comfort Para Banheiro 3 Pecas Bege",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 110.0,
    "sizes": [
      "Único"
    ],
    "code": "1423",
    "id": "SAC-548"
  },
  {
    "name": "Kit Tapete Comfort Para Banheiro 3 Pecas Cinza",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 110.0,
    "sizes": [
      "Único"
    ],
    "code": "1426",
    "id": "SAC-549"
  },
  {
    "name": "Kit Tapete Comfort Para Banheiro 3 Pecas Marrom",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 110.0,
    "sizes": [
      "Único"
    ],
    "code": "1425",
    "id": "SAC-550"
  },
  {
    "name": "Kit Tapete Comfort Para Banheiro 3 Pecas Vermelho",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 110.0,
    "sizes": [
      "Único"
    ],
    "code": "1424",
    "id": "SAC-551"
  },
  {
    "name": "Kit Tapete Estilo P/ Cozinha 3 Pecas Bege",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 110.0,
    "sizes": [
      "Único"
    ],
    "code": "1428",
    "id": "SAC-552"
  },
  {
    "name": "Kit Tapete Estilo P/ Cozinha 3 Pecas Preto",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 110.0,
    "sizes": [
      "Único"
    ],
    "code": "1427",
    "id": "SAC-553"
  },
  {
    "name": "Kit Tapete Print P/ Cozinha 3 Pecas Home",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 150.0,
    "sizes": [
      "Único"
    ],
    "code": "1430",
    "id": "SAC-554"
  },
  {
    "name": "Kit Tapete Print P/ Cozinha 3 Pecas Loucas",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 150.0,
    "sizes": [
      "Único"
    ],
    "code": "1429",
    "id": "SAC-555"
  },
  {
    "name": "Kit Utensílios",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 220.0,
    "sizes": [
      "19"
    ],
    "code": "781",
    "id": "SAC-556"
  },
  {
    "name": "Kit Utensílios (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 94.99,
    "sizes": [
      "Único"
    ],
    "code": "779",
    "id": "SAC-557"
  },
  {
    "name": "Kit Varao 2mts Fino Branco _",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 35.0,
    "sizes": [
      "Único"
    ],
    "code": "1388",
    "id": "SAC-558"
  },
  {
    "name": "Kit Varao 2mts Fino Cromado _",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 60.0,
    "sizes": [
      "Único"
    ],
    "code": "1390",
    "id": "SAC-559"
  },
  {
    "name": "Kit Varao 2mts Fino Palha _",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 35.0,
    "sizes": [
      "Único"
    ],
    "code": "1386",
    "id": "SAC-560"
  },
  {
    "name": "Kit Varao 3mts Fino Branco _",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 60.0,
    "sizes": [
      "Único"
    ],
    "code": "1389",
    "id": "SAC-561"
  },
  {
    "name": "Kit Varao 3mts Fino Cromado _",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 80.0,
    "sizes": [
      "Único"
    ],
    "code": "1391",
    "id": "SAC-562"
  },
  {
    "name": "Kit Varao 3mts Fino Palha _",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 60.0,
    "sizes": [
      "Único"
    ],
    "code": "1387",
    "id": "SAC-563"
  },
  {
    "name": "Lampiao Querosene 300ml 27cm",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 105.0,
    "sizes": [
      "Único"
    ],
    "code": "1714",
    "id": "SAC-564"
  },
  {
    "name": "Lampião Querosene 300ml 27cm (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 105.0,
    "sizes": [
      "Único"
    ],
    "code": "782",
    "id": "SAC-565"
  },
  {
    "name": "Lencol C/elast.liso 100%co 088 X 188 +",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 69.99,
    "sizes": [
      "30"
    ],
    "code": "1262",
    "id": "SAC-566"
  },
  {
    "name": "Lencol C/elast.liso 100%co 138 X 188 +",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 89.99,
    "sizes": [
      "30"
    ],
    "code": "1263",
    "id": "SAC-567"
  },
  {
    "name": "Lencol C/elast.liso 100%co 158 X 198 +",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 114.99,
    "sizes": [
      "40",
      "30"
    ],
    "code": "1258",
    "id": "SAC-568"
  },
  {
    "name": "Lencol C/elast.liso 100%co 193 X 203 +",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 115.0,
    "sizes": [
      "40"
    ],
    "code": "1259",
    "id": "SAC-569"
  },
  {
    "name": "Lençol Avulsosolteiro Malha 1pçs (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 65.0,
    "sizes": [
      "Único"
    ],
    "code": "783",
    "id": "SAC-570"
  },
  {
    "name": "Lençol Sem Elastico Solteiro (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 49.99,
    "sizes": [
      "Único"
    ],
    "code": "790",
    "id": "SAC-571"
  },
  {
    "name": "Lençol Super King com Elastico (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 94.99,
    "sizes": [
      "Único"
    ],
    "code": "792",
    "id": "SAC-572"
  },
  {
    "name": "Lençol com Elastico 1pç Solteiro (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 39.99,
    "sizes": [
      "Único"
    ],
    "code": "784",
    "id": "SAC-573"
  },
  {
    "name": "Lençol com Elastico Casal 1pçs (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 29.99,
    "sizes": [
      "Único"
    ],
    "code": "785",
    "id": "SAC-574"
  },
  {
    "name": "Lençol com Elastico Casal 3pçs (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 110.0,
    "sizes": [
      "Único"
    ],
    "code": "786",
    "id": "SAC-575"
  },
  {
    "name": "Lençol com Elastico Solteiro (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 39.99,
    "sizes": [
      "Único"
    ],
    "code": "788",
    "id": "SAC-576"
  },
  {
    "name": "Lençol com Elastico Solteiro 1,88x0,30m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 64.99,
    "sizes": [
      "Único"
    ],
    "code": "789",
    "id": "SAC-577"
  },
  {
    "name": "Liquidificador Turbo Forza 127v (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 340.0,
    "sizes": [
      "Único"
    ],
    "code": "793",
    "id": "SAC-578"
  },
  {
    "name": "Liquidificador Turbo Forza 127v Agratto",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 350.0,
    "sizes": [
      "Único"
    ],
    "code": "1692",
    "id": "SAC-579"
  },
  {
    "name": "Livro Bob Good 36pçs (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 35.0,
    "sizes": [
      "Único"
    ],
    "code": "794",
    "id": "SAC-580"
  },
  {
    "name": "Lixeira 8l",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 35.0,
    "sizes": [
      "Único"
    ],
    "code": "1660",
    "id": "SAC-581"
  },
  {
    "name": "Lixeira 8l (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 35.0,
    "sizes": [
      "Único"
    ],
    "code": "795",
    "id": "SAC-582"
  },
  {
    "name": "Lixeira C/pedal Plast. Plastex 50lt",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 170.0,
    "sizes": [
      "Único"
    ],
    "code": "1659",
    "id": "SAC-583"
  },
  {
    "name": "Lixeira C/pedal Plast. Solt (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 170.0,
    "sizes": [
      "Único"
    ],
    "code": "796",
    "id": "SAC-584"
  },
  {
    "name": "Manta Almofada (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 170.0,
    "sizes": [
      "Único"
    ],
    "code": "798",
    "id": "SAC-585"
  },
  {
    "name": "Manta Borda Mata",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 130.0,
    "sizes": [
      "Único"
    ],
    "code": "1716",
    "id": "SAC-586"
  },
  {
    "name": "Manta Casal Lán Carneiro 1,90mx2,10m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 140.0,
    "sizes": [
      "Único"
    ],
    "code": "799",
    "id": "SAC-587"
  },
  {
    "name": "Manta Casal Queem (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 110.0,
    "sizes": [
      "Único"
    ],
    "code": "800",
    "id": "SAC-588"
  },
  {
    "name": "Manta P/ Sofa Essencia 2,60m X 1,80m Areia",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 150.0,
    "sizes": [
      "Único"
    ],
    "code": "1422",
    "id": "SAC-589"
  },
  {
    "name": "Manta P/ Sofa Essencia 2,60m X 1,80m Bege",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 150.0,
    "sizes": [
      "Único"
    ],
    "code": "1419",
    "id": "SAC-590"
  },
  {
    "name": "Manta P/ Sofa Essencia 2,60m X 1,80m Castor",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 150.0,
    "sizes": [
      "Único"
    ],
    "code": "1421",
    "id": "SAC-591"
  },
  {
    "name": "Manta P/ Sofa Essencia 2,60m X 1,80m Cinza",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 150.0,
    "sizes": [
      "Único"
    ],
    "code": "1420",
    "id": "SAC-592"
  },
  {
    "name": "Manta de Sofá (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 130.0,
    "sizes": [
      "Único"
    ],
    "code": "801",
    "id": "SAC-593"
  },
  {
    "name": "Manta de Sofá 2,00x2,25m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 65.0,
    "sizes": [
      "Único"
    ],
    "code": "803",
    "id": "SAC-594"
  },
  {
    "name": "Manta de Sofá 2,40x1,70 (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 104.99,
    "sizes": [
      "Único"
    ],
    "code": "804",
    "id": "SAC-595"
  },
  {
    "name": "Marmita Tekcor 1,5l (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 29.99,
    "sizes": [
      "Único"
    ],
    "code": "805",
    "id": "SAC-596"
  },
  {
    "name": "Mesa Infantil (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 105.0,
    "sizes": [
      "Único"
    ],
    "code": "806",
    "id": "SAC-597"
  },
  {
    "name": "Micro-ondas",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 1700.0,
    "sizes": [
      "32"
    ],
    "code": "1693",
    "id": "SAC-598"
  },
  {
    "name": "Panela Eletrica",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 350.0,
    "sizes": [
      "Único"
    ],
    "code": "1373",
    "id": "SAC-599"
  },
  {
    "name": "Panela Eletrica de Arroz Riso",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 340.0,
    "sizes": [
      "Único"
    ],
    "code": "1703",
    "id": "SAC-600"
  },
  {
    "name": "Panela Pressao Nacional F. Externo",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 980.0,
    "sizes": [
      "24"
    ],
    "code": "1658",
    "id": "SAC-601"
  },
  {
    "name": "Panela de Pressao 2,5 Lt",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 105.0,
    "sizes": [
      "Único"
    ],
    "code": "1687",
    "id": "SAC-602"
  },
  {
    "name": "Panela de Pressao 4,5 Lt",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 130.0,
    "sizes": [
      "Único"
    ],
    "code": "1690",
    "id": "SAC-603"
  },
  {
    "name": "Panela de Pressao 7 Lt",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 160.0,
    "sizes": [
      "Único"
    ],
    "code": "1689",
    "id": "SAC-604"
  },
  {
    "name": "Panela de Pressao F. Exter Real 10l",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 420.0,
    "sizes": [
      "Único"
    ],
    "code": "1691",
    "id": "SAC-605"
  },
  {
    "name": "Panela de Pressao F. Externo 4,5 Lt",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 250.0,
    "sizes": [
      "Único"
    ],
    "code": "1688",
    "id": "SAC-606"
  },
  {
    "name": "Panela de Pressão",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 220.0,
    "sizes": [
      "10"
    ],
    "code": "808",
    "id": "SAC-607"
  },
  {
    "name": "Panela de Pressão 2,5lt (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 110.0,
    "sizes": [
      "Único"
    ],
    "code": "809",
    "id": "SAC-608"
  },
  {
    "name": "Panela de Pressão 4,5lt (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 130.0,
    "sizes": [
      "Único"
    ],
    "code": "810",
    "id": "SAC-609"
  },
  {
    "name": "Panela de Pressão 7 Lt (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 160.0,
    "sizes": [
      "Único"
    ],
    "code": "812",
    "id": "SAC-610"
  },
  {
    "name": "Panela de Pressão F. Externo",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 420.0,
    "sizes": [
      "10"
    ],
    "code": "813",
    "id": "SAC-611"
  },
  {
    "name": "Panela de Pressão Fechamento Externo 24lt (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 950.0,
    "sizes": [
      "Único"
    ],
    "code": "814",
    "id": "SAC-612"
  },
  {
    "name": "Panela de Pressão Fechamento Externo 4,5lt (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 250.0,
    "sizes": [
      "Único"
    ],
    "code": "815",
    "id": "SAC-613"
  },
  {
    "name": "Pano de Chão (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 9.0,
    "sizes": [
      "Único"
    ],
    "code": "817",
    "id": "SAC-614"
  },
  {
    "name": "Pano de Copa 0,43x0,64cm (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 7.0,
    "sizes": [
      "Único"
    ],
    "code": "818",
    "id": "SAC-615"
  },
  {
    "name": "Pano de Copa 70x95cm (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 15.0,
    "sizes": [
      "Único"
    ],
    "code": "819",
    "id": "SAC-616"
  },
  {
    "name": "Pano de Copa Cor 70x95cm (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 13.0,
    "sizes": [
      "Único"
    ],
    "code": "820",
    "id": "SAC-617"
  },
  {
    "name": "Pano de Copa Felpudo 40x69cm (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 12.0,
    "sizes": [
      "Único"
    ],
    "code": "821",
    "id": "SAC-618"
  },
  {
    "name": "Pano de Prato 41x69cm Kit (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 210.0,
    "sizes": [
      "Único"
    ],
    "code": "822",
    "id": "SAC-619"
  },
  {
    "name": "Passadeira 3d 60cmx2m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 110.0,
    "sizes": [
      "Único"
    ],
    "code": "823",
    "id": "SAC-620"
  },
  {
    "name": "Passadeira Peluda 60x200 (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 95.0,
    "sizes": [
      "Único"
    ],
    "code": "1246",
    "id": "SAC-621"
  },
  {
    "name": "Pijama",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 74.99,
    "sizes": [
      "10"
    ],
    "code": "825",
    "id": "SAC-622"
  },
  {
    "name": "Pijama Infantil",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 74.99,
    "sizes": [
      "12"
    ],
    "code": "826",
    "id": "SAC-623"
  },
  {
    "name": "Porta Mantimento (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 75.0,
    "sizes": [
      "Único"
    ],
    "code": "827",
    "id": "SAC-624"
  },
  {
    "name": "Pote Vdr Liso 1200ml (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 35.0,
    "sizes": [
      "Único"
    ],
    "code": "828",
    "id": "SAC-625"
  },
  {
    "name": "Pratos Comum (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 13.0,
    "sizes": [
      "Único"
    ],
    "code": "830",
    "id": "SAC-626"
  },
  {
    "name": "Premeir Veludo Ly Boot Cut Musgo",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 194.99,
    "sizes": [
      "Único"
    ],
    "code": "1894",
    "id": "SAC-627"
  },
  {
    "name": "Premier Ber Bo Emb Cetim Lito Preto S/ci",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 149.99,
    "sizes": [
      "Único"
    ],
    "code": "1736",
    "id": "SAC-628"
  },
  {
    "name": "Premier Ber Je Ly Lucy Dark Plus Size",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 169.99,
    "sizes": [
      "Único"
    ],
    "code": "1744",
    "id": "SAC-629"
  },
  {
    "name": "Premier Berm Sar Ly Bol Emb Castanho Cin",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 159.99,
    "sizes": [
      "Único"
    ],
    "code": "1745",
    "id": "SAC-630"
  },
  {
    "name": "Premier Berm Sarj Ly Bol Emb Marinho Cin",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 159.99,
    "sizes": [
      "Único"
    ],
    "code": "1749",
    "id": "SAC-631"
  },
  {
    "name": "Premier Berm Sarj Ly Bolso Emb Preta Ci",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 149.99,
    "sizes": [
      "Único"
    ],
    "code": "1735",
    "id": "SAC-632"
  },
  {
    "name": "Premier Ciclista Cetim Ly Lito Marrom",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 134.99,
    "sizes": [
      "Único"
    ],
    "code": "1752",
    "id": "SAC-633"
  },
  {
    "name": "Premier Ciclista Je Ly Cetim Lito Preto",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 134.99,
    "sizes": [
      "Único"
    ],
    "code": "2318",
    "id": "SAC-634"
  },
  {
    "name": "Premier Ciclista Je Ly Push Up Cetim Tre",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 124.99,
    "sizes": [
      "Único"
    ],
    "code": "1751",
    "id": "SAC-635"
  },
  {
    "name": "Premier Linho Alfaiataria com Cinto Alba",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 144.99,
    "sizes": [
      "Único"
    ],
    "code": "1898",
    "id": "SAC-636"
  },
  {
    "name": "Premier Ly Sk Extreme Push Up Cetim Blac",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 164.99,
    "sizes": [
      "Único"
    ],
    "code": "2317",
    "id": "SAC-637"
  },
  {
    "name": "Premier Ly Sport Fino Cetim Lito Chumbo",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 179.99,
    "sizes": [
      "Único"
    ],
    "code": "1895",
    "id": "SAC-638"
  },
  {
    "name": "Premier Sarja Ly Sport Fino Cetim Lito",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 179.99,
    "sizes": [
      "Único"
    ],
    "code": "1896",
    "id": "SAC-639"
  },
  {
    "name": "Processador de Alimentos Util 1l (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 85.0,
    "sizes": [
      "Único"
    ],
    "code": "831",
    "id": "SAC-640"
  },
  {
    "name": "Protetor Sofá 2,00m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 194.99,
    "sizes": [
      "Único"
    ],
    "code": "832",
    "id": "SAC-641"
  },
  {
    "name": "Protetor Sofá 2,20m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 204.99,
    "sizes": [
      "Único"
    ],
    "code": "833",
    "id": "SAC-642"
  },
  {
    "name": "Rede Grande (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 180.0,
    "sizes": [
      "Único"
    ],
    "code": "834",
    "id": "SAC-643"
  },
  {
    "name": "Rede Pequena (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 120.0,
    "sizes": [
      "Único"
    ],
    "code": "835",
    "id": "SAC-644"
  },
  {
    "name": "Sapateira",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 220.0,
    "sizes": [
      "Único"
    ],
    "code": "1707",
    "id": "SAC-645"
  },
  {
    "name": "Sapateira (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 220.0,
    "sizes": [
      "Único"
    ],
    "code": "1249",
    "id": "SAC-646"
  },
  {
    "name": "Sapateira Organizadora Cores Sortidas",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 95.0,
    "sizes": [
      "Único"
    ],
    "code": "1619",
    "id": "SAC-647"
  },
  {
    "name": "Suporte Botijão C/rodas (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 65.0,
    "sizes": [
      "Único"
    ],
    "code": "1127",
    "id": "SAC-648"
  },
  {
    "name": "Tapete Athenas 0,50x0,70m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 64.99,
    "sizes": [
      "Único"
    ],
    "code": "1128",
    "id": "SAC-649"
  },
  {
    "name": "Tapete Bem Vindo Emborrachado (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 40.0,
    "sizes": [
      "Único"
    ],
    "code": "1129",
    "id": "SAC-650"
  },
  {
    "name": "Tapete Chichila 0,40x0,60m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 45.0,
    "sizes": [
      "Único"
    ],
    "code": "1130",
    "id": "SAC-651"
  },
  {
    "name": "Tapete Chichila 0,50x0,70m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 59.99,
    "sizes": [
      "Único"
    ],
    "code": "1131",
    "id": "SAC-652"
  },
  {
    "name": "Tapete Chichila 0,50x100m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 89.99,
    "sizes": [
      "Único"
    ],
    "code": "1132",
    "id": "SAC-653"
  },
  {
    "name": "Tapete Geometrico 1,40m X 2m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 200.0,
    "sizes": [
      "Único"
    ],
    "code": "1133",
    "id": "SAC-654"
  },
  {
    "name": "Tapete Geometrico 1m X 1,5m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 150.0,
    "sizes": [
      "Único"
    ],
    "code": "1134",
    "id": "SAC-655"
  },
  {
    "name": "Tapete Geometrico 2m X 2,5m",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 260.0,
    "sizes": [
      "Único"
    ],
    "code": "1708",
    "id": "SAC-656"
  },
  {
    "name": "Tapete Geometrico 2m X 2,5m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 300.0,
    "sizes": [
      "Único"
    ],
    "code": "1135",
    "id": "SAC-657"
  },
  {
    "name": "Tapete Infantil",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 110.0,
    "sizes": [
      "Único"
    ],
    "code": "1372",
    "id": "SAC-658"
  },
  {
    "name": "Tapete Macarrão (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 30.0,
    "sizes": [
      "Único"
    ],
    "code": "1136",
    "id": "SAC-659"
  },
  {
    "name": "Tapete Microfibra 0,45x0,65m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 49.99,
    "sizes": [
      "Único"
    ],
    "code": "1137",
    "id": "SAC-660"
  },
  {
    "name": "Tapete Passadeira 50cmx1,80m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 95.0,
    "sizes": [
      "Único"
    ],
    "code": "1138",
    "id": "SAC-661"
  },
  {
    "name": "Tapete Passadeira Flannel 50cm X 1,80m",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 150.0,
    "sizes": [
      "Único"
    ],
    "code": "1679",
    "id": "SAC-662"
  },
  {
    "name": "Tapete Peludo 1,5m X 2m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 150.0,
    "sizes": [
      "Único"
    ],
    "code": "1139",
    "id": "SAC-663"
  },
  {
    "name": "Tapete Peludo 1,5mx2m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 150.0,
    "sizes": [
      "Único"
    ],
    "code": "1140",
    "id": "SAC-664"
  },
  {
    "name": "Tapete Piso 0,50x0,80m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 18.0,
    "sizes": [
      "Único"
    ],
    "code": "1141",
    "id": "SAC-665"
  },
  {
    "name": "Tapete Piso 0,53x0,85m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 22.0,
    "sizes": [
      "Único"
    ],
    "code": "1142",
    "id": "SAC-666"
  },
  {
    "name": "Tapete Sala (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 589.99,
    "sizes": [
      "Único"
    ],
    "code": "1143",
    "id": "SAC-667"
  },
  {
    "name": "Tapete Sala 1,40x2,oom (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 200.0,
    "sizes": [
      "Único"
    ],
    "code": "1145",
    "id": "SAC-668"
  },
  {
    "name": "Taças",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 14.0,
    "sizes": [
      "Único"
    ],
    "code": "1370",
    "id": "SAC-669"
  },
  {
    "name": "Toalaha de Mao",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 5.0,
    "sizes": [
      "Único"
    ],
    "code": "1755",
    "id": "SAC-670"
  },
  {
    "name": "Toalha Banho 0,70x1,40m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 54.99,
    "sizes": [
      "Único"
    ],
    "code": "1149",
    "id": "SAC-671"
  },
  {
    "name": "Toalha Banho 0,75x1,som (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 64.99,
    "sizes": [
      "Único"
    ],
    "code": "1150",
    "id": "SAC-672"
  },
  {
    "name": "Toalha Banho 0,76x1,60m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 45.0,
    "sizes": [
      "Único"
    ],
    "code": "1151",
    "id": "SAC-673"
  },
  {
    "name": "Toalha Banho 0,80x1,60m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 39.99,
    "sizes": [
      "Único"
    ],
    "code": "1152",
    "id": "SAC-674"
  },
  {
    "name": "Toalha Banho 0,80x1,80m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 45.0,
    "sizes": [
      "Único"
    ],
    "code": "1153",
    "id": "SAC-675"
  },
  {
    "name": "Toalha Infantil 60x1,10m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 39.99,
    "sizes": [
      "Único"
    ],
    "code": "1161",
    "id": "SAC-676"
  },
  {
    "name": "Toalha Infantil 60x1,15m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 25.0,
    "sizes": [
      "Único"
    ],
    "code": "1162",
    "id": "SAC-677"
  },
  {
    "name": "Toalha Infantil 60x1,20m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 25.0,
    "sizes": [
      "Único"
    ],
    "code": "1163",
    "id": "SAC-678"
  },
  {
    "name": "Toalha Mão 0,23x0,38m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 5.0,
    "sizes": [
      "Único"
    ],
    "code": "1164",
    "id": "SAC-679"
  },
  {
    "name": "Toalha P/mesa Termica 4 Cadeira 1,40x1,40m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 55.0,
    "sizes": [
      "Único"
    ],
    "code": "1165",
    "id": "SAC-680"
  },
  {
    "name": "Toalha P/mesa Termica Redonda 4 Cadeira Top Max (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 55.0,
    "sizes": [
      "Único"
    ],
    "code": "1166",
    "id": "SAC-681"
  },
  {
    "name": "Toalha Pers. Time (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 69.99,
    "sizes": [
      "Único"
    ],
    "code": "1167",
    "id": "SAC-682"
  },
  {
    "name": "Toalha Praia 0,70x1,40m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 29.99,
    "sizes": [
      "Único"
    ],
    "code": "1168",
    "id": "SAC-683"
  },
  {
    "name": "Toalha Praia 0,75x1,som (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 65.0,
    "sizes": [
      "Único"
    ],
    "code": "1170",
    "id": "SAC-684"
  },
  {
    "name": "Toalha Rosto 0,40x0,65m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 18.0,
    "sizes": [
      "Único"
    ],
    "code": "1171",
    "id": "SAC-685"
  },
  {
    "name": "Toalha Rosto 0,45x0,70m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 15.0,
    "sizes": [
      "Único"
    ],
    "code": "1172",
    "id": "SAC-686"
  },
  {
    "name": "Toalha Rosto 0,50x0,70m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 13.0,
    "sizes": [
      "Único"
    ],
    "code": "1173",
    "id": "SAC-687"
  },
  {
    "name": "Toalha Rosto 0,50x0,80m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 18.0,
    "sizes": [
      "Único"
    ],
    "code": "1174",
    "id": "SAC-688"
  },
  {
    "name": "Toalha de Mesa Quadrada 1,40x1,40 (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 45.0,
    "sizes": [
      "Único"
    ],
    "code": "1155",
    "id": "SAC-689"
  },
  {
    "name": "Toalha de Mesa Quadrada 1,40x2,10m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 60.0,
    "sizes": [
      "Único"
    ],
    "code": "1156",
    "id": "SAC-690"
  },
  {
    "name": "Toalha de Mesa Redonda 1,40 (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 55.0,
    "sizes": [
      "Único"
    ],
    "code": "1158",
    "id": "SAC-691"
  },
  {
    "name": "Toalha de Mesa Redonda 1,40x2,00 (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 60.0,
    "sizes": [
      "Único"
    ],
    "code": "1159",
    "id": "SAC-692"
  },
  {
    "name": "Toalha de Mesa Térmica (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 65.0,
    "sizes": [
      "Único"
    ],
    "code": "1160",
    "id": "SAC-693"
  },
  {
    "name": "Toalha de Mão 0,28x0,40m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 15.0,
    "sizes": [
      "Único"
    ],
    "code": "1154",
    "id": "SAC-694"
  },
  {
    "name": "Top com Estampa",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 75.0,
    "sizes": [
      "Único"
    ],
    "code": "1311",
    "id": "SAC-695"
  },
  {
    "name": "Travesseiro 70cmx50m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 60.0,
    "sizes": [
      "Único"
    ],
    "code": "1175",
    "id": "SAC-696"
  },
  {
    "name": "Travesseiro Sonhare Sultan 70cm X 50cm",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 60.0,
    "sizes": [
      "Único"
    ],
    "code": "1666",
    "id": "SAC-697"
  },
  {
    "name": "Varal de Chao Aluminio Thika 105x60cm",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 250.0,
    "sizes": [
      "Único"
    ],
    "code": "1712",
    "id": "SAC-698"
  },
  {
    "name": "Varal de Chão Aluminio Thika 105x60cm (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 160.0,
    "sizes": [
      "Único"
    ],
    "code": "1176",
    "id": "SAC-699"
  },
  {
    "name": "Varao Janela Fino 2m",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 65.0,
    "sizes": [
      "Único"
    ],
    "code": "1662",
    "id": "SAC-700"
  },
  {
    "name": "Varão Cromado 19mmx3m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 65.0,
    "sizes": [
      "Único"
    ],
    "code": "1177",
    "id": "SAC-701"
  },
  {
    "name": "Varão Imbuia 19mmx3m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 50.0,
    "sizes": [
      "Único"
    ],
    "code": "1178",
    "id": "SAC-702"
  },
  {
    "name": "Varão Janela Fino 2m (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 45.0,
    "sizes": [
      "Único"
    ],
    "code": "1179",
    "id": "SAC-703"
  },
  {
    "name": "Xícara Personalizada (un)",
    "cat": "SAC",
    "sub": "Ofertas",
    "price": 30.0,
    "sizes": [
      "Único"
    ],
    "code": "1238",
    "id": "SAC-704"
  }
];

  window.YAGO = {
    CATS, SUBS, SIZES, NUMS, ITEMS,
    WHATSAPP: "5527996683886",
  };
})();
