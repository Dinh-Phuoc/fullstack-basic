import { Box, CircularProgress } from '@mui/material'
import { Suspense, useContext } from 'react'
import Context from './store/Context'

export default function MyTabPanel({ value, myStyle, children }) {
    const [state] = useContext(Context)
    const { elementActive } = state
    
    return (
        <Box 
            sx={{ 
                display: (elementActive.length > 0 || elementActive instanceof Node) && 
                value === Number(elementActive.getAttribute('data-value')) ? 'block' : 'none',
                ...myStyle
            }}>
            <Suspense fallback={
                <Box sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    width: '100vw',
                    gap: 2
                }}>
                    <CircularProgress/>
                </Box>}>{ (elementActive.length > 0 || elementActive instanceof Node) && 
                value === Number(elementActive.getAttribute('data-value')) && children} </Suspense>
        </Box>
    )
}