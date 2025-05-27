import { useEffect, useRef, useState } from 'react'

import SvgIcon from '@mui/material/SvgIcon'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { ReactComponent as TrelloIcon } from '~/assets/trelloIcon.svg'
import HomeMenu from './HomeMenu/HomeMenu'
import { Link } from 'react-router-dom'
import HomeMenuXS from './HomeMenuXS/HomeMenuXS'
import { Button, Menu } from '@mui/material'
import { Email, FacebookOutlined, Instagram } from '@mui/icons-material'
import { ReactComponent as ZaloIcon } from '~/assets/zaloIcon.svg'

export default function HomeBar() {
    const [scrolled, setScrolled] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const [anchorElXS, setAnchorElXS] = useState(null)
    const openXS = Boolean(anchorElXS)
    const navbarRef = useRef()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
  
    const styleIcon = {
        textDecoration: 'none',
        height: '3.4rem',
        width: '3.4rem',
        display: 'flex',
        color: theme => theme.trelloCustom.myColor,
        transition: 'all 0.3s',
        '&:hover': {
            transform: 'scale(1.2)'
        }
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleClickXS = (event) => {
        setAnchorElXS(event.currentTarget)
    }

    const handleCloseXS = () => {
        setAnchorElXS(null)
    }

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
                justifyContent: 'space-between',
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
            <Box sx={{ display: 'flex' }}>
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
            </Box>

            <Box sx={{ display: { xs: 'flex', md: 'none' }, height: '100%', alignItems: 'center' }}>
                <Button 
                    sx={{ height: '100%', mr: '24px' }}
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClickXS}>
                        Contact
                </Button>
                
                <Menu
                    id="basic-menu"
                    anchorEl={anchorElXS}
                    open={openXS}
                    onClose={handleCloseXS}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button'
                    }}
                    sx={{
                        '& .MuiList-root.MuiMenu-list': {
                            p: '12px',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 2
                        }
                    }}
                >
                    <Box component={'a'} href='https://www.facebook.com/saru.an.169/' target="_blank" rel="noopener noreferrer">
                        <FacebookOutlined fontSize='large' sx={styleIcon}/>
                    </Box>

                    <Box component={'a'} href='https://www.instagram.com/pdphuoc_ordinary/' target="_blank" rel="noopener noreferrer">
                        <Instagram fontSize='large' sx={styleIcon}/>
                    </Box>

                    <Box component={'a'} href='mailto:phandinhphuoc02@gmail.com'>
                        <Email fontSize='large' sx={styleIcon}/>
                    </Box>

                    <Box component={'a'} href="https://zalo.me/0366159200" target="_blank" rel="noopener noreferrer">
                        <SvgIcon component={ZaloIcon} sx={styleIcon} fontSize='large' inheritViewBox />
                    </Box>
                </Menu>
    
                <HomeMenuXS/>
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', height: '100%' }}>
                <Box
                    component={Link}
                    to='/auth' 
                    sx={{ 
                        display: { xs: 'none', md: 'block' },
                        textDecoration: 'none', 
                        alignContent: 'center',
                        fontWeight: 600,
                        height: '100%',
                        width: '180px',
                        textAlign: 'center',
                        color: (theme) => theme.trelloCustom.myColor,
                        '&:hover': {
                            color: '#f0777acc'
                        } 
                    }}
                > 
                    Login 
                </Box>

                <Box sx={{ display: 'flex', height: '100%', alignItems: 'center' }}>
                    <Box id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        sx={{
                            alignContent: 'center',
                            cursor: 'pointer',
                            fontWeight: 600,
                            ml: 'auto',
                            height: '100%',
                            width: '180px',
                            textAlign: 'center',
                            color: 'white',
                            bgcolor: (theme) => theme.trelloCustom.myColor,
                            borderRadius: 'none',
                            '&:hover': {
                                bgcolor: '#f0777acc'
                            } 
                        }}    
                    >
                            Contact
                    </Box>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button'
                        }}
                        sx={{
                            '& .MuiList-root.MuiMenu-list': {
                                p: '12px',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 2
                            }
                        }}
                    >
                        <Box component='a' href='https://www.facebook.com/saru.an.169/' target="_blank" rel="noopener noreferrer">
                            <FacebookOutlined sx={styleIcon} />
                        </Box>
                        <Box component='a' href='https://www.instagram.com/pdphuoc_ordinary/' target="_blank" rel="noopener noreferrer">
                            <Instagram sx={styleIcon} />
                        </Box>
                        <Box component='a' href='mailto:phandinhphuoc02@gmail.com'>
                            <Email sx={styleIcon} />
                        </Box>
                        <Box component='a' href='https://zalo.me/0366159200' target='_blank' rel='noopener noreferrer'>
                            <SvgIcon component={ZaloIcon} sx={styleIcon} inheritViewBox/>
                        </Box>
                    </Menu>
                </Box>
            </Box>
        </Box>

    )
}
