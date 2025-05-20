import { Avatar, Box, Button, CircularProgress, Divider, FormControlLabel, IconButton, ListItemIcon, Menu, MenuItem, SvgIcon, Switch, Tooltip, Typography, useColorScheme } from '@mui/material'
import MyTabItem from '~/components/Tabs/MyTabItem'
import MyTabList from '~/components/Tabs/MyTabList'
import MyTabPanel from '~/components/Tabs/MyTabPanel'
import MyTabs from '~/components/Tabs/store/MyTabs'
import MenuIcon from '@mui/icons-material/Menu'

import { ReactComponent as TrelloIcon } from '~/assets/trelloIcon.svg'
import { HelpOutline, KeyboardArrowDown, Logout } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DocumentPage from './ProFilesDetailPages/DocumentPage'
import EmailPage from './ProFilesDetailPages/EmailPage'
import ChangePasswordPage from './ProFilesDetailPages/ChangePasswordPage'
import PrivatePage from './ProFilesDetailPages/PrivatePage'
import AccountOptionPage from './ProFilesDetailPages/AccountOptionPage'
import { useDispatch, useSelector } from 'react-redux'
import { userSelector } from '~/redux/selector'
import { logoutThunk, setUserInfoThunk } from '~/redux/slice/userSlice'
import { API_ROOT } from '~/utils/constant'

export default function Profile() {
    const { data: user, pending } = useSelector(userSelector)
    const dispatch = useDispatch()
    const isDarkMode = localStorage.getItem('mui-mode') === 'dark' ? true : false
    const [anchorEl, setAnchorEl] = useState(null)
    const [anchorElSeemore, setAnchorElSeemore] = useState(null)
    const [checked, setChecked] = useState(isDarkMode)
    const { setMode } = useColorScheme()

    const style = {
        width: '100%', 
        height: '100%',
        textAlign: 'center',
        p: 0,
        color: theme => theme.palette.mode === 'dark' ? 
            theme.palette.primary.light : theme.palette.primary.main,
        lineHeight: '36px',
        '&:hover': {
            background: 'none'
        } 
    }

    useEffect(() => {
        dispatch(setUserInfoThunk())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleLogOut = () => {
        dispatch(logoutThunk())
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

    if (pending) {
        return (<Box sx={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '100vw',
            gap: 2
        }}>
            <CircularProgress/>
        </Box>)
    }
    return (
        <Box sx={{ height: '100%' }}>
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
                            value={0} active='true'>Hồ sơ và chế độ hiển thị</MyTabItem>
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
                        <Button
                            sx={{ p: '6px', display: { xs: 'none', sm: 'flex', md: 'none' } }}
                            onClick={handleSeeMore}>
                            <Typography 
                                sx={{ 
                                    color: theme => theme.palette.mode === 'dark' ? 
                                        theme.palette.primary.light : theme.palette.primary.main, 
                                    display: { xs: 'none', sm: 'flex', lg: 'none' }, 
                                    alignContent: 'center', 
                                    '& MuiTypography-body1': { fontSize: '0.875rem' } 
                                }}> Xem thêm <KeyboardArrowDown/> 
                            </Typography>
                        </Button>
                        <Button
                            sx={{ p: '6px', display: { xs: 'flex', sm: 'none' } }}
                            onClick={handleSeeMore}>
                            <MenuIcon
                                sx={{ 
                                    color: theme => theme.palette.mode === 'dark' ? 
                                        theme.palette.primary.light : theme.palette.primary.main,
                                    alignContent: 'center', 
                                    '& MuiTypography-body1': { fontSize: '0.875rem' } 
                                }}>
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
                            <MenuItem sx={{ alignItems: 'center', '& .MuiMenuItem-root': { p: 0 }, display: { xs: 'flex', sm: 'none' } }}>
                                <MyTabItem 
                                    notLine={true}
                                    value={0} 
                                    typeWrapper='Button'
                                    myStyle={style}
                                    onClick={handleSeeMoreClose}
                                >
                                        Hồ sơ và chế độ hiển thị
                                </MyTabItem>
                            </MenuItem>

                            <MenuItem sx={{ alignItems: 'center', '& .MuiMenuItem-root': { p: 0 }, display: { xs: 'flex', sm: 'none' } }}>
                                <MyTabItem 
                                    notLine={true}
                                    value={1} 
                                    typeWrapper='Button'
                                    myStyle={style}
                                    onClick={handleSeeMoreClose}
                                >
                                    Email
                                </MyTabItem>
                            </MenuItem>

                            <MenuItem sx={{ alignItems: 'center', '& .MuiMenuItem-root': { p: 0 }, display: { xs: 'flex', sm: 'none' } }}>
                                <MyTabItem
                                    notLine={true}
                                    value={2} 
                                    typeWrapper='Button'
                                    myStyle={style}
                                    onClick={handleSeeMoreClose}
                                >
                                    Bảo mật
                                </MyTabItem>
                            </MenuItem>
                            <MenuItem sx={{ alignItems: 'center', '& .MuiMenuItem-root': { p: 0 }, display: { sm: 'flex', md: 'none' } }}>
                                <MyTabItem 
                                    value={3} typeWrapper='Button'
                                    myStyle={style}
                                    notLine={true}
                                    onClick={handleSeeMoreClose}
                                >
                                    Quyền riêng tư
                                </MyTabItem>
                            </MenuItem>
                            <MenuItem sx={{ alignItems: 'center', '& .MuiMenuItem-root': { p: 0 }, display: { sm: 'flex', md: 'none' } }}>
                                <MyTabItem 
                                    value={4} typeWrapper='Button'
                                    myStyle={style}
                                    notLine={true}
                                    onClick={handleSeeMoreClose}
                                >
                                    Tùy chọn tài khoản
                                </MyTabItem>
                            </MenuItem>
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
                                        src= { user.avatar !== '' ?
                                            `${API_ROOT}/v1/manage/users/profile/get-image/avatar/?t=${Date.now()}` : 
                                            'https://images.unsplash.com/photo-1603269414002-7f3d2acd0409?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmlldG5hbSUyMG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D'
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
                                        elevation: 2,
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
                                                right: 8,
                                                width: 10,
                                                height: 10,
                                                bgcolor: theme => theme.palette.mode === 'dark' ? '#232323' : 'background.paper',
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
                                        src= { user.avatar !== '' ? 
                                            `${API_ROOT}/v1/manage/users/profile/get-image/avatar/?t=${Date.now()}` : 
                                            'https://images.unsplash.com/photo-1603269414002-7f3d2acd0409?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmlldG5hbSUyMG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D'}
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
                    <MyTabPanel value={1}><EmailPage/></MyTabPanel>
                    <MyTabPanel value={2}><ChangePasswordPage/></MyTabPanel>
                    <MyTabPanel value={3}><PrivatePage/></MyTabPanel>
                    <MyTabPanel value={4}><AccountOptionPage/></MyTabPanel>
                    {/* <MyTabPanel value={5}>Các ứng dụng được kết nối</MyTabPanel>
                    <MyTabPanel value={6}>Tùy chọn liên kết</MyTabPanel>
                    <MyTabPanel value={7}>Xem thêm</MyTabPanel> */}
                </Box>
            </MyTabs>
        </Box>
    )
}