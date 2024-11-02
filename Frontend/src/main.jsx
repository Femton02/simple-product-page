import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from './components/ui/provider.jsx'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ColorModeProvider } from './components/ui/color-mode.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ColorModeProvider>
        <Provider>
          <App />
        </Provider>
      </ColorModeProvider>
    </BrowserRouter>
  </StrictMode>,
)
