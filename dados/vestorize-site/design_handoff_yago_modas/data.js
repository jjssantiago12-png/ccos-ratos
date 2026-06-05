/* Yago Modas — dados de exemplo do catálogo (mock) */
(function () {
  // categorias principais (tiles)
  const CATS = [
    { id: "FEM",  label: "Feminino",  ico: "dress" },
    { id: "MASC", label: "Masculino", ico: "shirt" },
    { id: "INF",  label: "Infantil",  ico: "baby" },
    { id: "SAC",  label: "Utensílios", ico: "bag", sub: "Achadinhos & ofertas" },
  ];

  // subcategorias por categoria
  const SUBS = {
    FEM:  ["Todos","Blusas & Camisetas","Vestidos","Calças Jeans","Calças","Saias","Bermudas & Shorts","Conjuntos","Casacos & Jaquetas","Roupas Íntimas"],
    MASC: ["Todos","Camisas","Camisetas","Calças Jeans","Bermudas & Shorts","Calças","Casacos & Jaquetas","Cuecas"],
    INF:  ["Todos","Conjuntos","Camisetas","Vestidos","Bermudas & Shorts","Calças"],
    SAC:  ["Todos","Acessórios","Meias & Íntimas","Ofertas"],
  };

  // tamanhos disponíveis para filtro
  const SIZES = ["P","M","G","G2","G3","G4","GG","XG"];
  const NUMS  = ["36","38","40","42","44","46","48"];

  // helper
  let n = 10400;
  const code = () => String(n++);
  const P = (cat, sub, name, price, sizes, parcel) => ({
    id: cat + "-" + name.replace(/\s/g,"").slice(0,6) + "-" + code(),
    code: code(),
    cat, sub, name, price, sizes,
    parcel: parcel || Math.min(4, Math.max(1, Math.round(price / 35))),
  });

  // produtos
  const ITEMS = [
    // FEMININO
    P("FEM","Vestidos","Vestido Midi Floral Manga Curta", 119.90, ["P","M","G","G2"]),
    P("FEM","Vestidos","Vestido Longo Canelado Alça", 139.90, ["M","G","G2","G3"]),
    P("FEM","Blusas & Camisetas","Blusa Cropped Canelada Básica", 49.90, ["P","M","G"]),
    P("FEM","Blusas & Camisetas","T-shirt Estampada Algodão", 39.90, ["P","M","G","GG"]),
    P("FEM","Calças Jeans","Calça Jeans Skinny Cintura Alta", 129.90, ["36","38","40","42","44","46"]),
    P("FEM","Calças Jeans","Calça Jeans Wide Leg Destroyed", 149.90, ["38","40","42","44"]),
    P("FEM","Calças","Calça Pantalona Alfaiataria", 109.90, ["P","M","G","G2"]),
    P("FEM","Saias","Saia Midi Plissada", 89.90, ["P","M","G"]),
    P("FEM","Conjuntos","Conjunto Cropped + Short Moletinho", 99.90, ["P","M","G","GG"]),
    P("FEM","Casacos & Jaquetas","Jaqueta Jeans Oversized", 169.90, ["P","M","G","G2"]),
    P("FEM","Bermudas & Shorts","Short Jeans Cintura Alta", 79.90, ["36","38","40","42","44"]),
    P("FEM","Blusas & Camisetas","Camisa Linho Manga Bufante", 89.90, ["P","M","G","G2","G3"]),

    // MASCULINO
    P("MASC","Camisetas","Camiseta Básica Premium Pima", 54.90, ["P","M","G","GG","XG"]),
    P("MASC","Camisetas","Camiseta Oversized Estampa Costas", 64.90, ["M","G","GG","XG"]),
    P("MASC","Camisas","Camisa Social Slim Manga Longa", 119.90, ["P","M","G","GG","XG"]),
    P("MASC","Camisas","Camisa Xadrez Flanela", 99.90, ["M","G","GG"]),
    P("MASC","Calças Jeans","Calça Jeans Reta Tradicional", 139.90, ["38","40","42","44","46","48"]),
    P("MASC","Bermudas & Shorts","Bermuda Sarja Slim", 79.90, ["38","40","42","44","46"]),
    P("MASC","Calças","Calça Moletom Jogger", 99.90, ["P","M","G","GG","XG"]),
    P("MASC","Casacos & Jaquetas","Jaqueta Corta-Vento Impermeável", 189.90, ["M","G","GG","XG"]),
    P("MASC","Camisetas","Polo Piquet Gola Trabalhada", 74.90, ["P","M","G","GG","XG"]),

    // INFANTIL
    P("INF","Conjuntos","Conjunto Infantil Verão Algodão", 59.90, ["P","M","G"]),
    P("INF","Camisetas","Camiseta Infantil Estampa Divertida", 34.90, ["P","M","G"]),
    P("INF","Vestidos","Vestido Infantil Festa Tule", 89.90, ["P","M","G"]),
    P("INF","Bermudas & Shorts","Bermuda Infantil Moletom", 39.90, ["P","M","G"]),
    P("INF","Calças","Calça Legging Infantil Cotton", 44.90, ["P","M","G"]),

    // SACOLINHA / OFERTAS
    P("SAC","Acessórios","Cinto Couro Sintético Fivela", 29.90, ["Único"]),
    P("SAC","Acessórios","Boné Aba Curva Bordado", 39.90, ["Único"]),
    P("SAC","Meias & Íntimas","Kit 3 Meias Cano Médio", 24.90, ["Único"]),
    P("SAC","Ofertas","Cueca Boxer Microfibra (un.)", 19.90, ["P","M","G","GG"]),
    P("SAC","Acessórios","Carteira Slim Porta-Cartões", 34.90, ["Único"]),
  ];

  window.YAGO = { CATS, SUBS, SIZES, NUMS, ITEMS,
    WHATSAPP: "5527999998888", // número da loja (placeholder)
  };
})();
