import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* ThemeProvider must wrap the router so every route sees the theme. */}
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
