import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import SvgIcon from '@mui/material/SvgIcon'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import Email from '@mui/icons-material/Email'
import FacebookOutlined from '@mui/icons-material/FacebookOutlined'
import Instagram from '@mui/icons-material/Instagram'
import Tooltip from '@mui/material/Tooltip'

import HomeMenu from './HomeMenu/HomeMenu'
import HomeMenuXS from './HomeMenuXS/HomeMenuXS'

import { ReactComponent as TrelloIcon } from '~/assets/trelloIcon.svg'
import { ReactComponent as ZaloIcon } from '~/assets/zaloIcon.svg'
import ZaloQRCode from '~/assets/qrZalo.jpg'
import { Divider } from '@mui/material'

export default function HomeBar() {
    const [scrolled, setScrolled] = useState(false)
    const [anchorElXS, setAnchorElXS] = useState(null)
    const [anchorQRZalo, setAnchorQRZalo] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const openXS = Boolean(anchorElXS)
    const openQRZalo = Boolean(anchorQRZalo)
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
        height: '3rem',
        width: '3rem',
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

    const handleClickQRZalo = (event) => {
        setAnchorQRZalo(event.currentTarget)
    }
    const handleCloseQRZalo = () => {
        setAnchorQRZalo(null)
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
                m: 'auto',
                height: (theme) => theme.trelloCustom.appBarHeight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: { xs: 'space-between', lg: 'center' },
                gap: 2,
                pl: 2,
                overflowX: 'auto',
                bgcolor: theme => theme.palette.mode === 'dark' ? 'black' : 'white',
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
                            gap: 1
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


                    <Box component={Button} onClick={handleClickQRZalo} sx={{ p: 0, minWidth: 0 }}>
                        <SvgIcon component={ZaloIcon} fontSize='large' inheritViewBox sx={styleIcon}/>
                    </Box>
                    <Menu
                        anchorEl={anchorQRZalo}
                        open={openQRZalo}
                        onClose={handleCloseQRZalo}
                    >
                        <Box className='qrZaloCode'
                            component={'img'} 
                            src={ZaloQRCode}
                            sx={{ 
                                width: '200px', 
                                height: '200px'
                            }}>
                        </Box>
                    </Menu>
                    <Divider orientation='vertical' flexItem sx={{ borderColor: theme => theme.trelloCustom.myColor }}/>
                    <Box
                        component={'a'} href='https://cv.fullstack.edu.vn/view/50a59a03-d012-4aa7-9f7d-c3581e906d03?token=rMzDCgAkeAS4CcwOG4G0WCgoSCwOgCW'
                        sx={{ 
                            ...styleIcon,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid',
                            borderColor: theme => theme.trelloCustom.myColor,
                            borderRadius: '50%'
                        }}>CV
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
                        <Tooltip title={(
                            <Box component={'img'} src={ZaloQRCode} sx={{ width: '200px', height: '200px' }}></Box>
                        )}>
                            <Box >
                                <SvgIcon component={ZaloIcon} fontSize='large' inheritViewBox sx={styleIcon}/>
                            </Box>
                        </Tooltip>
                        <Divider orientation='vertical' flexItem sx={{ borderColor: theme => theme.trelloCustom.myColor }}/>
                        <Box
                            component={'a'} href='https://cv.fullstack.edu.vn/view/50a59a03-d012-4aa7-9f7d-c3581e906d03?token=rMzDCgAkeAS4CcwOG4G0WCgoSCwOgCW'
                            sx={{ 
                                ...styleIcon,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid',
                                borderColor: theme => theme.trelloCustom.myColor,
                                borderRadius: '50%'
                            }}>CV
                        </Box>
                    </Menu>
                </Box>
            </Box>
        </Box>

    )
}
