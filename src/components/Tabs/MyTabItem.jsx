import { Box, Typography } from '@mui/material'
import { useEffect, useRef } from 'react'

import { useContext } from 'react'
import Context from './store/Context'

const MyTabItem = ({ active, value, children, handleTitleLoginForm, handleTitleRegisterForm }) => {
    const [, dispatch] = useContext(Context)
    
    const myTabItemRef = useRef()

    const handleSwithTab = () => {
        dispatch({ type: 'SET_ACTIVE_TAB', payload: myTabItemRef.current })
    }

    useEffect(() => {
        active === 'true' && handleSwithTab()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const setActive = () => {
        handleSwithTab()
        handleTitleLoginForm ? handleTitleLoginForm() : handleTitleRegisterForm()
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
                color: theme => theme.palette.primary.main,
                borderTopLeftRadius: '5px',
                borderTopRightRadius: '5px',
                borderBottom: '5px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.5s ease',
                '&:hover': {
                    opacity: 1,
                    backgroundColor: 'rgba(194, 53, 100, 0.05)',
                    borderColor: 'rgba(194, 53, 100, 0.1)'
                }
            }}
            onClick={setActive}
        >
            <Typography sx={{ textTransform: 'upperCase' }}>{ children }</Typography>
        </Box>
    )
}

export default MyTabItem