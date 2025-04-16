import { Box } from '@mui/material'
import { useContext } from 'react'
import Context from './store/Context'

export default function MyTabList ({ myStyle, children }) {
    const [state] = useContext(Context)
    const { activeStore, elementActive } = state
    
    return (
        <Box sx={{
            display: 'flex',
            position: 'relative',
            marginBottom: '16px',
            ...myStyle
        }}>
            { children }
            <Box 
                sx={{ 
                    position: 'absolute',
                    left: !activeStore ? elementActive.offsetLeft + 'px' : 0,
                    bottom: 0,
                    width: !activeStore ? elementActive.offsetWidth + 'px' : 0,
                    height: '5px',
                    borderRadius: '5px',
                    backgroundColor: '#ff9a9cc4',
                    transition: 'all 0.4s ease'
                }}
            ></Box>
        </Box>
    )
}