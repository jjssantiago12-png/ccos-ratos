import type { Venda } from '../types'

export interface GrupoDuplicata {
  chave: string
  vendas: Venda[]
}

// Chave "provável" mais frouxa que a de deduplicação da importação (que usa id
// determinístico por cliente+datas+valor): mesma cliente + mesmo valor + mesmo
// vencimento já é forte indício de ser a MESMA parcela lançada duas vezes — mesmo
// que "Data da Venda" tenha vindo diferente entre duas exportações do Líder (o que
// faz a importação gerar um id novo em vez de atualizar o registro já existente).
function chaveProvavel(venda: Venda): string {
  const nome = venda.cliente_nome.trim().toLowerCase()
  const valor = venda.valor_devido.toFixed(2)
  return `${nome}|${valor}|${venda.data_vencimento}`
}

export function detectarDuplicatas(vendas: Venda[]): GrupoDuplicata[] {
  const mapa = new Map<string, Venda[]>()
  for (const venda of vendas) {
    const chave = chaveProvavel(venda)
    const lista = mapa.get(chave)
    if (lista) lista.push(venda)
    else mapa.set(chave, [venda])
  }

  return [...mapa.entries()]
    .filter(([, lista]) => lista.length > 1)
    .map(([chave, lista]) => ({
      chave,
      vendas: [...lista].sort((a, b) => a.created_at.localeCompare(b.created_at)),
    }))
    .sort((a, b) => b.vendas.length - a.vendas.length)
}
