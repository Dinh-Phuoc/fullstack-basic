import { Box } from '@mui/material'
import { useContext } from 'react'
import Context from './store/Context'

export default function MyTabList ({ children }) {
    const [state] = useContext(Context)
    const { activeStore, elementActive } = state
    
    return (
        <Box sx={{ 
            display: 'flex',
            justifyContent: 'space-around',
            position: 'relative',
            marginBottom: '16px' 
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
                    backgroundColor: (theme) => theme.palette.primary.main,
                    transition: 'all 0.4s ease'
                }}
            ></Box>
        </Box>
    )
}