import { Box } from '@mui/material'
import { useContext, useEffect } from 'react'
import Context from './store/Context'

export default function MyTabPanel({ value, children }) {
    const [state] = useContext(Context)
    const { elementActive } = state

    useEffect(() => {
    }, [elementActive])
    
    return (
        <Box sx={{ display: (elementActive.length > 0 || elementActive instanceof Node) && value === Number(elementActive.getAttribute('data-value')) ? 'block' : 'none' }}>
            {children}
        </Box>
    )
}