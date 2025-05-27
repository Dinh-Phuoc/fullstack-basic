// eslint-disable-next-line no-unused-vars
import { Box, Button, Typography } from '@mui/material'
import { useEffect, useRef } from 'react'

import { useContext } from 'react'
import Context from './store/Context'

const MyTabItem = ({ notLine = false, myStyle, myStyleChild, typeWrapper = 'Box', active, value, children, onClick, ...props }) => {
    const [, dispatch] = useContext(Context)
    const myTabItemRef = useRef()
    const handleSwithTab = () => {
        dispatch({ type: 'SET_ACTIVE_TAB', payload: {
            elementActive: myTabItemRef.current,
            notLine: notLine
        } })
    }

    const passProps = {
        onClick,
        ...props
    }
    let TypeWrapper
    if (typeWrapper === 'Box') TypeWrapper = Box
    if (typeWrapper === 'Button') TypeWrapper = Button

    useEffect(() => {
        active && handleSwithTab()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active])

    const setActive = () => {
        handleSwithTab()
        passProps?.onClick?.()
    }

    return (
        <TypeWrapper
            data-value={value}
            ref={myTabItemRef}
            sx={{
                minWidth: '80px',
                padding: '6px 20px 6px',
                fontSize: '1.6rem',
                textAlign: 'center',
                borderBottom: notLine ? '' : '5px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.7s ease',
                '&:hover': {
                    backgroundColor: notLine ? '' : theme => theme.palette.mode === 'dark' ? '#302c2c' : 'rgba(194, 53, 100, 0.05)',
                    borderColor:  notLine ? '' : 'rgba(194, 53, 100, 0.1)' 
                },
                ...myStyle
            }}
            onClick={ setActive }
        >
            <Typography sx={{
                width: '100%',
                ...myStyleChild 
            }}>{ children }</Typography>
        </TypeWrapper>
    )
}

export default MyTabItem