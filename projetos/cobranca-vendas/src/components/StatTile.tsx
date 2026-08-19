export default function StatTile({
  label,
  valor,
  detalhe,
  corIndicador,
}: {
  label: string
  valor: string
  detalhe?: string
  corIndicador?: string
}) {
  return (
    <div className="cartao">
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {corIndicador && (
          <span style={{ width: 8, height: 8, borderRadius: 999, background: corIndicador, flexShrink: 0 }} />
        )}
        <div className="valor-detalhe">{label}</div>
      </div>
      <div className="valor-restante" style={{ marginTop: 6 }}>
        {valor}
      </div>
      {detalhe && <div className="valor-detalhe">{detalhe}</div>}
    </div>
  )
}
