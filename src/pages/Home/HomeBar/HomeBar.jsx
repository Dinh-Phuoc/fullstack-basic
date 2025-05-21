import { useEffect, useRef, useState } from 'react'

import SvgIcon from '@mui/material/SvgIcon'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { ReactComponent as TrelloIcon } from '~/assets/trelloIcon.svg'
import HomeMenu from './HomeMenu/HomeMenu'
import { Link } from 'react-router-dom'
import HomeMenuXS from './HomeMenuXS/HomeMenuXS'

export default function HomeBar() {
    const [scrolled, setScrolled] = useState(false)

    const navbarRef = useRef()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
  
    return ( 
        <Box 
            sx={{
                position: 'fixed',
                zIndex: 99,
                top: 0,
                width: '100%',
                height: (theme) => theme.trelloCustom.appBarHeight,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                pl: 2,
                overflowX: 'auto',
                bgcolor: 'white',
                '&:hover': {
                    boxShadow: 'rgba(9, 30, 66, 0.15) 0px 0.5rem 1rem 0px'
                },
                boxShadow: scrolled && 'rgba(9, 30, 66, 0.15) 0px 0.5rem 1rem 0px'
            }}
            ref={navbarRef}
        >
            <Box sx={{ display: 'flex', alignContent: 'center', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <SvgIcon 
                        component={TrelloIcon} 
                        fontSize='large' 
                        inheritViewBox 
                        sx={{ color: theme => theme.trelloCustom.myColor }}
                    />
                    <Typography variant='span' 
                        sx={{ 
                            fontSize: '1.1rem', 
                            fontWeight: 'bold', 
                            minWidth: '80px', 
                            color: theme => theme.trelloCustom.myColor 
                        }}
                    >
                        Sariii nè!
                    </Typography>
                </Box>
            </Box>

            <HomeMenu/>

            <HomeMenuXS/>
            
            <Box
                component={Link}
                to='/auth' 
                sx={{ 
                    display: { xs: 'none', md: 'block' },
                    textDecoration: 'none', 
                    alignContent: 'center',
                    fontWeight: 600,
                    ml: 'auto',
                    height: '100%',
                    width: '180px',
                    textAlign: 'center',
                    color: 'white',
                    bgcolor: (theme) => theme.trelloCustom.myColor,
                    '&:hover': {
                        bgcolor: '#f0777acc'
                    } 
                }}
            > 
                Login 
            </Box>
        </Box>

    )
}
