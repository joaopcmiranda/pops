import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppSuiteProvider } from '@pops/navigation'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppSuiteProvider currentApp="recipes">
      <App />
    </AppSuiteProvider>
  </StrictMode>,
)