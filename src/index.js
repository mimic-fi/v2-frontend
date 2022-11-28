import React from 'react'
import { HashRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { AppProvider } from './context/appContext'
import './index.css'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <HashRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </HashRouter>
  </React.StrictMode>
)
