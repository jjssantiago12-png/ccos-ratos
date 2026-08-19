import type { VendaCalculada } from '../types'

// Mesma ordem de colunas da planilha original CONTROLE_INADIMPLENCIA_1.xlsx (aba CONTROLE),
// pra quem abrir reconhecer o layout e, se precisar, dar reimport nela depois.
// "Localizacao" (endereço) fica em branco — esse dado não existe no app, só na planilha
// original; nunca foi capturado na importação (ver importarPlanilha.ts).
const CABECALHO = [
  'Nº',
  'Nome do Cliente',
  'Celular',
  'Região/Cidade',
  'Bairro',
  'Localizacao',
  'Código Cliente',
  'Data da Venda/Cobrança',
  'Data de Vencimento',
  'Valor Devido (R$)',
  'Valor Pago (R$)',
  'Data do Último Pagamento',
  'Dias em Atraso',
  'Meses em Atraso',
  'Acréscimo 10% a.m. comp. (R$)',
  'Restante (R$)',
  'Status',
  'Observações',
  'Origem (LIDER/Campo)',
]

// `new Date(iso)` interpreta "YYYY-MM-DD" como meia-noite UTC — a lib de planilha (SheetJS)
// depois converte esse instante pro fuso local da máquina que está exportando, o que pode
// jogar a data um dia pra trás (ex: meia-noite UTC vira 21h do dia anterior em UTC-3).
// Construindo a Date com ano/mês/dia LOCAIS, ela já nasce no fuso certo pro round-trip.
function paraData(iso: string | null): Date | null {
  if (!iso) return null
  const [ano, mes, dia] = iso.split('-').map(Number)
  if (!ano || !mes || !dia) return null
  const d = new Date(ano, mes - 1, dia)
  return isNaN(d.getTime()) ? null : d
}

function hojeParaNomeArquivo(): string {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

/** Gera e baixa um .xlsx com o estado atual de todas as vendas, no mesmo layout da
 * planilha de campo original — reflete qualquer baixa/edição feita no app até agora. */
export async function exportarPlanilhaControle(vendas: VendaCalculada[]): Promise<void> {
  const XLSX = await import('xlsx')

  const ordenadas = [...vendas].sort((a, b) => a.cliente_nome.localeCompare(b.cliente_nome, 'pt-BR'))

  const linhas: unknown[][] = ordenadas.map((v, i) => [
    i + 1,
    v.cliente_nome,
    v.cliente_celular,
    v.regiao,
    v.bairro,
    '',
    v.codigo_cliente,
    paraData(v.data_venda),
    paraData(v.data_vencimento),
    v.valor_devido,
    v.valor_pago,
    paraData(v.data_ultimo_pagamento),
    v.dias_atraso,
    v.meses_atraso,
    v.acrescimo,
    v.restante,
    v.status,
    v.observacoes,
    v.origem,
  ])

  const aoa = [
    ['Controle de Inadimplência — exportado do app Cobrança Vendas'],
    [],
    [],
    CABECALHO,
    ...linhas,
  ]

  const planilha = XLSX.utils.aoa_to_sheet(aoa)
  planilha['!cols'] = CABECALHO.map(() => ({ wch: 16 }))

  const livro = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(livro, planilha, 'CONTROLE')
  XLSX.writeFile(livro, `controle-inadimplencia-${hojeParaNomeArquivo()}.xlsx`)
}
