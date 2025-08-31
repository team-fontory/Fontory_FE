import { createRoot } from 'react-dom/client'

import { QueryProvider } from './app/providers/QueryProvider'
import App from './App'

import './app/styles/index.css'

createRoot(document.getElementById('root')!).render(
  <QueryProvider>
    <App />
  </QueryProvider>,
)
