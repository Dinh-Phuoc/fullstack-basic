import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Avatar from '@mui/material/Avatar'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import Modal from '@mui/material/Modal'

import bgImageFormLoginLightMD from '~/assets/loginformlight.jpg'
import bgImageFormLoginDarkMD from '~/assets/loginformdark.jpg'
import Login from './Login'
import Register from './Register'
import MyTabs from '~/components/Tabs/store/MyTabs'
import MyTabList from '~/components/Tabs/MyTabList'
import MyTabItem from '~/components/Tabs/MyTabItem'
import MyTabPanel from '~/components/Tabs/MyTabPanel'
import { FormControlLabel, Switch, Typography, useColorScheme } from '@mui/material'
import { AccountCircleOutlined, HelpOutline, NotificationsNone } from '@mui/icons-material'
import { loginApi } from '~/apis'


export default function Profiles() {
    const [anchorEl, setAnchorEl] = useState(null)
    const [anchorModal, setAnchorModal] = useState(null)
    const [user, setUser] = useState(null)
    const [titleForm, setleTitleForm] = useState('login')
    const [checked, setChecked] = useState(false)
    const { setMode } = useColorScheme()

    const handleLogin = async (data) => {
        const token = await loginApi(data)
        localStorage.setItem('token', token)
        localStorage.getItem('token') ? setUser(token) : ''
    }

    const handleLogOut = () => {
        setUser(false)
    }
    
    const open = Boolean(anchorEl)
    const openModal = Boolean(anchorModal)

    const handleChange = (event) => {
        setChecked(event.target.checked)
        const modeValue = event.target.checked ? 'dark' : 'light'
        setMode(modeValue)
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    //Handle Modal
    const handleModalOpen = () => {
        setAnchorModal(true)
    }
    
    const handleModalClose = () => {
        setAnchorModal(null)
    }

    const handleTitleLoginForm = () => {
        setleTitleForm('login')
    }

    const handleTitleRegisterForm = () => {
        setleTitleForm('register')
    }

    return (
        <Box>
            <Tooltip title="Account settings">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ padding: 0 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar 
                        sx={{ width: 32, height: 32 }} 
                        alt='Your Avatar'
                        src= {user ? user.avatar : 'https://scontent.fsgn2-9.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s200x200&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_eui2=AeHqQE3on298CPVk3u69jaEuWt9TLzuBU1Ba31MvO4FTUFhDxoZtUH-dRPf7El8qQgUnbjMfmSOGfSnmHksnLgLR&_nc_ohc=a1K6_KaoqeEQ7kNvgHzC7kp&_nc_oc=AdkRjhHLU9H8YlcRXa6xwjBM8CUNK6C-uOq5hG1trLniobaNddY6zwK2q6FAq9NVt2U&_nc_zt=24&_nc_ht=scontent.fsgn2-9.fna&oh=00_AYHnf59jjfC5rvYvsSxoQ4dsw_gKEFwd7KaeglaIswcncw&oe=6813DF7A'
                        }/>
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0
                            }
                        }
                    }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {user ? 
                    <>
                        <MenuItem>
                            <ListItemIcon>
                                <AccountCircleOutlined fontSize='small'/>
                            </ListItemIcon>
                            Tài khoản
                        </MenuItem>
                        <MenuItem sx={{ display: { sm: 'none', md: 'none' } }}>
                            <ListItemIcon>
                                <HelpOutline fontSize='small'/>      
                            </ListItemIcon>
                            Phản hồi
                        </MenuItem>
                        <MenuItem sx={{ display: { sm: 'none', md: 'none' } }}>
                            <ListItemIcon>
                                <NotificationsNone fontSize='small'/> 
                            </ListItemIcon>
                            Thông báo
                        </MenuItem>

                        <MenuItem>
                            <FormControlLabel
                                control={
                                    <Switch
                                        sx = {{
                                            '& .MuiSwitch-switchBase': {
                                                margin: 1,
                                                padding: 0,
                                                transform: 'translateX(6px)',
                                                '&.Mui-checked': {
                                                    color: '#fff',
                                                    transform: 'translateX(22px)',
                                                    '& .MuiSwitch-thumb:before': {
                                                        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                                                            '#fff'
                                                        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`
                                                    },
                                                    '& + .MuiSwitch-track': {
                                                        opacity: 1,
                                                        backgroundColor: theme => theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be'
                                                    }
                                                }
                                            },
                                            '& .MuiSwitch-thumb': {
                                                backgroundColor: theme => theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
                                                '&::before': {
                                                    content: '""',
                                                    position: 'absolute',
                                                    width: '100%',
                                                    height: '100%',
                                                    left: 0,
                                                    top: 0,
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundPosition: 'center',
                                                    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                                                        '#fff'
                                                    )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`
                                                }
                                            },
                                            '& .MuiSwitch-track': {
                                                opacity: 1,
                                                backgroundColor: theme => theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
                                                borderRadius: 20 / 2
                                            }
                                        }}
                                        checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }}/>
                                }
                                label="Dark Mode"
                            /> 
                        </MenuItem>

                        <Divider />
                        <MenuItem>
                            <ListItemIcon>
                                <PersonAdd fontSize="small" />
                            </ListItemIcon>
                                Add another account
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                        <MenuItem onClick={handleLogOut}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </> : <>
                        <MenuItem>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Settings
                        </MenuItem>

                        <MenuItem>
                            <FormControlLabel
                                control={
                                    <Switch
                                        sx = {{
                                            '& .MuiSwitch-switchBase': {
                                                margin: 1,
                                                padding: 0,
                                                transform: 'translateX(6px)',
                                                '&.Mui-checked': {
                                                    color: '#fff',
                                                    transform: 'translateX(22px)',
                                                    '& .MuiSwitch-thumb:before': {
                                                        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                                                            '#fff'
                                                        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`
                                                    },
                                                    '& + .MuiSwitch-track': {
                                                        opacity: 1,
                                                        backgroundColor: theme => theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be'
                                                    }
                                                }
                                            },
                                            '& .MuiSwitch-thumb': {
                                                backgroundColor: theme => theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
                                                '&::before': {
                                                    content: '""',
                                                    position: 'absolute',
                                                    width: '100%',
                                                    height: '100%',
                                                    left: 0,
                                                    top: 0,
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundPosition: 'center',
                                                    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                                                        '#fff'
                                                    )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`
                                                }
                                            },
                                            '& .MuiSwitch-track': {
                                                opacity: 1,
                                                backgroundColor: theme => theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
                                                borderRadius: 20 / 2
                                            }
                                        }}
                                        checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }}/>
                                }
                                label="Dark Mode"
                            /> 
                        </MenuItem>
                        <Divider/>

                        <MenuItem onClick={ handleModalOpen }>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Login
                        </MenuItem>
                        <Modal 
                            open={openModal}
                            onClose={handleModalClose}
                            aria-labelledby="child-modal-title"
                            aria-describedby="child-modal-description">
                            <Box 
                                sx={{   
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    border: '1px solid',
                                    borderColor: '#ff9a9cc4',
                                    borderRadius: '6px',
                                    minWidth: { xs: '300px', sm: '580px', md: '844px' },
                                    maxWidth: { xs: '300px', sm: '890px', md: '844px' },
                                    width: { xs: '95%', sm: '80%' },
                                    height: '520px',
                                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#111111' : '#ffeef8',
                                    backgroundImage: (theme) => 
                                        theme.palette.mode === 'dark' ? 
                                            { xs: 'none', sm: `url(${bgImageFormLoginDarkMD})` } : 
                                            { xs: 'none', sm: `url(${bgImageFormLoginLightMD})` },
                                    backgroundSize: { sm: 'cover', md: 'cover' },
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right bottom'
                                }}
                            >
                                <Box 
                                    sx={{ 
                                        position: 'absolute',
                                        bgcolor: (theme) => theme.palette.mode === 'dark' ? theme.palette.background.default : 'white',
                                        width: { xs:'100%', sm: '324px', md: '424px' }, 
                                        height: { xs:'100%', sm: '497px', md: '497px' },
                                        borderRadius: '6px',
                                        m: { xs:'0', sm: '12px' },
                                        p: '16px 24px 24px'
                                    }}
                                >
                                    <MyTabs>
                                        <MyTabList>
                                            <MyTabItem 
                                                handleTitleLoginForm={handleTitleLoginForm} 
                                                value={0} 
                                                active='true'>
                                                    Đăng nhập
                                            </MyTabItem>

                                            <MyTabItem 
                                                handleTitleRegisterForm={handleTitleRegisterForm} 
                                                value={1}>
                                                Đăng ký
                                            </MyTabItem>
                                        </MyTabList>
                                        <MyTabPanel value={0}><Login handleLogin={handleLogin}/></MyTabPanel>
                                        <MyTabPanel value={1}><Register/></MyTabPanel>
                                    </MyTabs>
                                </Box>
                                <Box 
                                    sx={{
                                        display: { xs: 'none', sm: 'flex', md: 'flex' },
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        position: 'absolute',
                                        top: { sm: '65px', md: '12px' },
                                        right: { sm: '22px', md: '22px' },
                                        width: { sm: '200px', md: '255px' },
                                        height: { sm: '135px', md: '180px' },
                                        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#ff9a9cc4' : 'white',
                                        border: '2px solid',
                                        borderColor: (theme) => theme.palette.primary.main,
                                        borderRadius: '10px',
                                        padding: '15px 20px',
                                        maxWidth: '250px',
                                        fontSize: '16px',
                                        boxShadow: '3px 3px 0px #ff9a9cc4',
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            bottom: '-18px',
                                            left: { md: '50%' }, 
                                            width: 0,
                                            height: 0,
                                            borderLeft: '10px solid transparent',
                                            borderRight: '10px solid transparent',
                                            borderTop: '15px solid #ff9a9cc4'
                                        }
                                    }}
                                >
                                    <Typography 
                                        sx={{ 
                                            fontFamily: 'El Messiri', 
                                            fontWeight: { sm: 700, md: 800 }, 
                                            color: (theme) => theme.palette.mode === 'dark' ? 'black' : '#ff9a9cc4',
                                            textAlign: 'center',
                                            lineHeight: { sm: '2rem', md: '2.6rem' },
                                            '&.MuiTypography-body1': { fontSize: { sm: '1.8rem', md: '2.4rem' } }
                                        }}
                                        variant='body1'
                                    >
                                        { titleForm === 'login' ? 'Đăng nhập thôi nàooooo!' : 'Tạo mới tài khoản ngay thôiiiii!'}
                                    </Typography>
                                </Box>
                            </Box>
                        </Modal>
                    </>}
                
            </Menu>
        </Box>
    )
}