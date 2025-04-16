import { Box } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import Context from './store/Context'

export default function MyTabList ({ myStyle, children }) {
    const [state] = useContext(Context)
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
    const { activeStore, elementActive } = state
    useEffect(() => {
        const el = elementActive.length > 0 || elementActive instanceof Node ? elementActive : null
        if (!el) return
        
        const updatePosition = () => {
            const { offsetLeft, offsetWidth } = el
            setIndicatorStyle({
                left: offsetLeft,
                width: offsetWidth
            })
        }
        
        updatePosition()
    
        const resizeObserver = new ResizeObserver(() => {
            updatePosition()
        })
    
        resizeObserver.observe(el)
    
        return () => resizeObserver.disconnect()
    }, [elementActive]) 
    
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
                    left: `${indicatorStyle.left}px`,
                    bottom: 0,
                    width: `${indicatorStyle.width}px`,
                    height: '5px',
                    borderRadius: '5px',
                    backgroundColor: '#ff9a9cc4',
                    transition: 'all 0.5s ease',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: '5px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: 0,
                        borderLeft: '10px solid transparent',
                        borderRight: '10px solid transparent',
                        borderBottom: '10px solid #ff9a9cc4'
                    }
                }}
            ></Box>
        </Box>
    )
}