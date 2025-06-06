import { Box } from '@mui/material'
import { useContext } from 'react'
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
            {children}
        </Box>
    )
}