import { Box, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

import { useContext } from 'react'
import Context from './store/Context'

const MyTabItem = ({ myStyle, myStyleChild, active, value, children, onClick, ...props }) => {
    const [, dispatch] = useContext(Context)
    const myTabItemRef = useRef()
    const handleSwithTab = () => {
        dispatch({ type: 'SET_ACTIVE_TAB', payload: myTabItemRef.current })
    }

    const passProps = {
        onClick,
        ...props
    }

    useEffect(() => {
        active === 'true' && handleSwithTab()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const setActive = () => {
        handleSwithTab()
        passProps?.onClick?.()
    }

    return (
        <Box
            data-value={value}
            ref={myTabItemRef}
            sx={{
                minWidth: '80px',
                padding: '6px 20px 6px',
                fontSize: '1.6rem',
                textAlign: 'center',
                borderBottom: '5px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.7s ease',
                '&:hover': {
                    backgroundColor: theme => theme.palette.mode === 'dark' ? '#302c2c' : 'rgba(194, 53, 100, 0.05)',
                    borderColor: 'rgba(194, 53, 100, 0.1)'
                },
                ...myStyle
            }}
            onClick={setActive}
        >
            <Typography sx={{
                width: '100%',
                ...myStyleChild 
            }}>{ children }</Typography>
        </Box>
    )
}

export default MyTabItem