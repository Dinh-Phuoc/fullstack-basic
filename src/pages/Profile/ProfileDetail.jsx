import { Avatar, Box, Button, Divider, FormControlLabel, IconButton, ListItemIcon, Menu, MenuItem, SvgIcon, Switch, Tooltip, Typography, useColorScheme } from '@mui/material'
import MyTabItem from '~/components/Tabs/MyTabItem'
import MyTabList from '~/components/Tabs/MyTabList'
import MyTabPanel from '~/components/Tabs/MyTabPanel'
import MyTabs from '~/components/Tabs/store/MyTabs'
import MenuIcon from '@mui/icons-material/Menu'

import { ReactComponent as TrelloIcon } from '~/assets/trelloIcon.svg'
import { HelpOutline, KeyboardArrowDown, Logout } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { getInforUserApi } from '~/apis'
import { Link } from 'react-router-dom'
import DocumentPage from './DocumentPage'

export function Profile() {
    const data = {
        _id:  '67ec88f63bb057c82de3e0f7',
        password: '123456',
        gmail: 'rookie@gmail.com',
        fullName: 'Rookie',
        phone: '0000110101',
        avatar: 'https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/481672559_1890220561782995_8376855731310234495_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGQnHVCqT8BaZbG28o0IHU-ruDQw8iioI-u4NDDyKKgj_AQzr-33zBwiSgHbvNRTV_ettm4D6Qtz3tSfUQ9OiSx&_nc_ohc=BpANafhv5W4Q7kNvwG_VRcq&_nc_oc=AdmRqfs13imavm_l0Om407de1WxhARPjSbK2vwxfUpaCW5qlmZSKrsrGjQsSQ69q1Eg&_nc_zt=23&_nc_ht=scontent.fsgn2-6.fna&_nc_gid=v_aT3DdfuMPbib8uCNBkXw&oh=00_AfFdaMs3hBWEmV-KW2XutYWEl9vcRoGAReg6KMlEoY7JMA&oe=67FAC251',
        role: 'admin',
        userName: 'rookie'
    }
    const isDarkMode = localStorage.getItem('mui-mode') === 'dark' ? true : false
    const [anchorEl, setAnchorEl] = useState(null)
    const [anchorElSeemore, setAnchorElSeemore] = useState(null)

    const [user, setUser] = useState(data)
    const [checked, setChecked] = useState(isDarkMode)
    const { setMode } = useColorScheme()

    // useEffect(() => {
    //     localStorage.getItem('token') && getInforUserApi().then((data) => setUser(data))
    // }, [localStorage.getItem('token')])

    const handleLogOut = () => {
        localStorage.removeItem('token')
        setUser(null)
    }
    
    const open = Boolean(anchorEl)
    const openSeemore = Boolean(anchorElSeemore)

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

    const handleSeeMore = (event) => {
        setAnchorElSeemore(event.currentTarget)
    }
    const handleSeeMoreClose = () => {
        setAnchorElSeemore(null)
    }
    return (
        <MyTabs>
            <Box 
                sx={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignContent: 'center',
                    height: '56px',
                    p: '0 12px',
                    borderBlockEnd: theme => theme.palette.mode === 'dark' ? `1px solid ${theme.palette.primary.light}` : '1px solid #091E4240', 
                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#121212' : 'white' 
                }}>
                <Link style={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer', textDecoration: 'none' }} to='/'>
                    <SvgIcon component={TrelloIcon} fontSize='small' inheritViewBox sx={{ color:  '#ff9a9cc4' }}/>
                    <Typography variant='span' 
                        sx={{ ml: '4px', 
                            fontSize: '1rem', 
                            fontWeight: 'bold', 
                            color:  '#ff9a9cc4',
                            display: { xs: 'none', sm: 'block' } 
                        }}>Sariii nè!</Typography>
                </Link>
                <MyTabList 
                    myStyle={{
                        mb: 0
                    }}>
                    <MyTabItem 
                        myStyle={{ 
                            display: { xs: 'none', sm: 'flex' },
                            alignItems: 'center',
                            p: '6px'
                        }}  
                        myStyleChild={{
                            color: '#ff9a9cc4'
                            
                        }}
                        value={0} active='true'>Thông tin tài khoản</MyTabItem>
                    <MyTabItem 
                        myStyle={{
                            display: { xs: 'none', sm: 'flex' },
                            alignItems: 'center',
                            p: '6px'
                        }}  
                        myStyleChild={{ 
                            color: '#ff9a9cc4'
                            
                        }}
                        value={1}>Email</MyTabItem>
                    <MyTabItem 
                        myStyle={{ 
                            display: { xs: 'none', sm: 'flex' },
                            alignItems: 'center',
                            p: '6px'
                        }}  
                        myStyleChild={{ 
                            color: '#ff9a9cc4'
                            
                        }}value={2}>Bảo mật</MyTabItem>
                    <MyTabItem 
                        myStyle={{ 
                            display: { xs: 'none', md: 'flex' },
                            alignItems: 'center',
                            p: '6px'
                        }}  
                        myStyleChild={{ 
                            color: '#ff9a9cc4'
                            
                        }}value={3}>Quyền riêng tư</MyTabItem>
                    <MyTabItem 
                        myStyle={{ 
                            display: { xs: 'none', md: 'flex' },
                            alignItems: 'center',
                            p: '6px'
                        }}  
                        myStyleChild={{ 
                            color: '#ff9a9cc4'
                            
                        }}value={4}>Tùy chọn tài khoản</MyTabItem>
                    <MyTabItem 
                        myStyle={{ 
                            display: { xs: 'none', lg: 'flex' },
                            alignItems: 'center',
                            p: '6px'
                        }}  
                        myStyleChild={{ 
                            color: '#ff9a9cc4'
                        }}value={5}>Các ứng dụng được kết nối</MyTabItem>
                    <MyTabItem 
                        myStyle={{ 
                            display: { xs: 'none', lg: 'flex' },
                            alignItems: 'center',
                            p: '6px'
                        }}  
                        myStyleChild={{ 
                            color: '#ff9a9cc4'
                        }}value={6}>Tùy chọn liên kết</MyTabItem>
                    <Button
                        sx={{ p: '6px' }}
                        onClick={handleSeeMore}>
                        <Typography 
                            sx={{ display: { xs: 'none', sm: 'flex' }, alignContent: 'center', 
                                '& MuiTypography-body1': { fontSize: '0.875rem' } 
                            }}> Xem thêm <KeyboardArrowDown/> 
                        </Typography>
                        <MenuIcon
                            sx={{ display: { xs: 'flex', sm: 'none', float: 'left' }, alignContent: 'center', 
                                '& MuiTypography-body1': { fontSize: '0.875rem' } 
                            }}> Xem thêm <KeyboardArrowDown/> 
                        </MenuIcon>
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorElSeemore}
                        open={openSeemore}
                        onClose={handleSeeMoreClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button'
                        }}
                    >
                        <MenuItem sx={{ display: { xs: 'block', sm: 'none' } }}>Thông tin tài khoản</MenuItem>
                        <MenuItem sx={{ display: { xs: 'block', sm: 'none' } }}>Email</MenuItem>
                        <MenuItem sx={{ display: { xs: 'block', sm: 'none' } }}>Bảo mật</MenuItem>
                        <MenuItem sx={{ display: { sm: 'flex', md: 'none' } }}>Quyền riêng tư</MenuItem>
                        <MenuItem sx={{ display: { sm: 'flex', md: 'none' } }}>Tùy chọn tài khoản</MenuItem>
                        <MenuItem sx={{ display: { lg: 'none' } }}>Các ứng dụng được kết nối</MenuItem>
                        <MenuItem sx={{ display: { lg: 'none' } }}>Tùy chọn liên kết</MenuItem>
                    </Menu>
                </MyTabList>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, float: 'right' }}>
                    <Tooltip title='Help' sx={{ cursor: 'pointer' }}>
                        <HelpOutline sx={{ display: { xs: 'none', sm: 'block', md: 'block' }, color: '#ff9a9cc4' }}/>
                    </Tooltip>

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
                                    sx={{ width: 24, height: 24 }} 
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
                            <Typography 
                                sx={{ 
                                    ml: '8px',
                                    mb: '12px',
                                    fontSize: '1.1rem'  
                                }}
                                variant='h6'
                            >Tài khoản</Typography>
                            <Box 
                                sx={{
                                    display: 'flex', 
                                    height: '32px',
                                    p: '0 16px 0 16px',
                                    mb: '8px',
                                    width: '100%'
                                }}
                            >
                                <Avatar 
                                    sx={{ '&.MuiAvatar-root': { width: 30, height: 30 } }} 
                                    alt='Your Avatar'
                                    src= {user ? user.avatar : 'https://scontent.fsgn2-9.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s200x200&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_eui2=AeHqQE3on298CPVk3u69jaEuWt9TLzuBU1Ba31MvO4FTUFhDxoZtUH-dRPf7El8qQgUnbjMfmSOGfSnmHksnLgLR&_nc_ohc=a1K6_KaoqeEQ7kNvgHzC7kp&_nc_oc=AdkRjhHLU9H8YlcRXa6xwjBM8CUNK6C-uOq5hG1trLniobaNddY6zwK2q6FAq9NVt2U&_nc_zt=24&_nc_ht=scontent.fsgn2-9.fna&oh=00_AYHnf59jjfC5rvYvsSxoQ4dsw_gKEFwd7KaeglaIswcncw&oe=6813DF7A'}
                                />
                                <Box 
                                    sx={{ 
                                        display: 'flex', 
                                        flexDirection: 'column',
                                        height: '32px'
                                    }}
                                >
                                    <Typography 
                                        sx={{
                                            lineHeight: 1,
                                            color: theme => theme.palette.primary.contrastText
                                        }}
                                    >{user.fullName}</Typography>

                                    <Typography 
                                        sx={{
                                            lineHeight: 1,
                                            color: theme => theme.palette.primary.contrastText,
                                            '&.MuiTypography-body1': { fontSize: '0.8rem' }  
                                        }}
                                    >@{user.userName}</Typography>
                                </Box>
                            </Box >
                            
                            <Divider/>

                            <MenuItem sx={{ height: '32px' }}
                            >
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
                                                },
                                                '& .MuiFormControlLabel-label': {
                                                    padding: '12px 70px 12px 0px'
                                                }
                                            }}
                                            checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }}/>
                                    }
                                    label="Dark Mode"
                                /> 
                            </MenuItem>

                            <Divider />
                            
                            <Link style={{ textDecoration: 'none' }} onClick={handleLogOut} to='/'>
                                <MenuItem >
                                    <ListItemIcon>
                                        <Logout fontSize="medium" />
                                    </ListItemIcon>
                                    <Typography sx={{ color: theme => theme.palette.text.primary }}>Logout</Typography>
                                </MenuItem>
                            </Link>
                        </Menu>
                    </Box>
                </Box>
            </Box>
            <Box 
                sx={{ 
                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#121212' : 'white'
                }}>
                <MyTabPanel value={0}><DocumentPage/></MyTabPanel>
                <MyTabPanel value={1}>Email</MyTabPanel>
                <MyTabPanel value={2}>Bảo mật</MyTabPanel>
                <MyTabPanel value={3}>Quyền riêng tư</MyTabPanel>
                <MyTabPanel value={4}>Tùy chọn tài khoản</MyTabPanel>
                <MyTabPanel value={5}>Các ứng dụng được kết nối</MyTabPanel>
                <MyTabPanel value={6}>Tùy chọn liên kết</MyTabPanel>
                <MyTabPanel value={7}>Xem thêm</MyTabPanel>
            </Box>
        </MyTabs>
    )
}