import ReactDOM from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { ToastContainer } from 'react-toastify'
import { ConfirmProvider } from 'material-ui-confirm'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from '~/redux/store.js'
import App from './App.jsx'
import './index.css'
import theme from './assets/theme.js'

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    <BrowserRouter>
        <CssVarsProvider theme={theme}>
            <ConfirmProvider>
                <CssBaseline enableColorScheme />
                <Provider store={store}>
                    <App />
                </Provider>
                <ToastContainer autoClose={2000}/>
            </ConfirmProvider>
        </CssVarsProvider>
    </BrowserRouter>
    // </React.StrictMode>
)
