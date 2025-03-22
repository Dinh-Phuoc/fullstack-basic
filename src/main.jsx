import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from './assets/theme.js'

ReactDOM.createRoot(document.getElementById('root')).render(
    <CssVarsProvider theme={theme}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </CssVarsProvider>
)
