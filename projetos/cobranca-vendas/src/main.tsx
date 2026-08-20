import React from 'react'
import ReactDOM from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import App from './App'
import ErroFatal from './components/ErroFatal'
import './index.css'

// registerType 'autoUpdate' + immediate: true faz a nova versão assumir e recarregar
// a aba sozinha assim que detectada — sem isso quem já estava com o app aberto ficava
// preso na versão antiga (com bug já corrigido) até fechar e abrir tudo de novo.
registerSW({ immediate: true })

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErroFatal>
      <App />
    </ErroFatal>
  </React.StrictMode>
)
