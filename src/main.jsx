import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from './assets/theme.js'
import { CssBaseline } from '@mui/material'
import { BoardProvider } from './contexts/FormatterContext.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <CssVarsProvider theme={theme}>
            <CssBaseline />
            <BoardProvider>
                <App />
            </BoardProvider>
            <ToastContainer />
        </CssVarsProvider>
    </React.StrictMode>
)
