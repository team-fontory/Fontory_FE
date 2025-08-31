import { createRoot } from 'react-dom/client'

import { QueryProvider } from './app/providers/QueryProvider'
import { ToastifyProvider } from './app/providers/ToastifyProvider'
import App from './App'

import './app/styles/index.css'

createRoot(document.getElementById('root')!).render(
  <QueryProvider>
    <ToastifyProvider>
      <App />
    </ToastifyProvider>
  </QueryProvider>,
)
