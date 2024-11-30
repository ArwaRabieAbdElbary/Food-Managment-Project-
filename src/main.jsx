import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css'
import App from './App.jsx'
import AuthContextProvider from './assets/context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
         <App />
    </AuthContextProvider>
    
  </StrictMode>,
)
