import { useState } from 'react'
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
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'

import bgImageFormLogin from '~/assets/loginform2.jpg'
import Login from './Login'
import Register from './Register'


export default function Profiles() {
    const [anchorEl, setAnchorEl] = useState(null)
    const [anchorModal, setAnchorModal] = useState(null)
    const [user, setUser] = useState(false)
    const [contentFormLogin, setContentFormLogin] = useState('login')

    const open = Boolean(anchorEl)
    const openModal = Boolean(anchorModal)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    //Handle Modal
    const handleModalOpen = (e) => {
        setAnchorModal(e.currentTarget)
    }
    const handleModalClose = () => {
        setAnchorModal(null)
    }
    // Handle Form Login/Register
    const handleSetContentFormLogin = () => {
        setContentFormLogin('login')
    }

    const handleSetContentFormRegister= () => {
        setContentFormLogin('register')
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
                        src='https://scontent.fsgn2-9.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s200x200&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_eui2=AeHqQE3on298CPVk3u69jaEuWt9TLzuBU1Ba31MvO4FTUFhDxoZtUH-dRPf7El8qQgUnbjMfmSOGfSnmHksnLgLR&_nc_ohc=a1K6_KaoqeEQ7kNvgHzC7kp&_nc_oc=AdkRjhHLU9H8YlcRXa6xwjBM8CUNK6C-uOq5hG1trLniobaNddY6zwK2q6FAq9NVt2U&_nc_zt=24&_nc_ht=scontent.fsgn2-9.fna&oh=00_AYHnf59jjfC5rvYvsSxoQ4dsw_gKEFwd7KaeglaIswcncw&oe=6813DF7A'
                    />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                // onClick={handleClose}
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
                            <Avatar /> Profile
                        </MenuItem>
                        <MenuItem>
                            <Avatar /> My account
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
                        <MenuItem>
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
                        <MenuItem onClick={handleModalOpen}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Login
                        </MenuItem>
                    </>}
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
                            width: { md: '844px' },
                            height: { md: '475px' },
                            backgroundImage: `url(${bgImageFormLogin})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }}
                    >
                        <Box 
                            sx={{ 
                                position: 'absolute',
                                bgcolor: 'white', 
                                width: '424px', 
                                height: '430px',
                                borderRadius: '6px',
                                ml: 5,
                                mt: 3,
                                p: 3
                            }}
                        >
                            <form>
                                <Box sx={{ mb: 2 }}>
                                    <Button onClick={handleSetContentFormLogin}>Đăng nhập</Button>
                                    <Button onClick={handleSetContentFormRegister}>Đăng ký</Button>
                                </Box>
                                { contentFormLogin === 'login' ? 
                                    <Login/>
                                    : 
                                    <Register/>
                                }
                            </form>
                        </Box>
                        <Box 
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'absolute',
                                top: '40px',
                                right: '52px',
                                width: '230px',
                                height: '142px',
                                background: 'white',
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
                                    bottom: '-18px', /* Điều chỉnh vị trí của đuôi */
                                    left: '45%', /* Thay đổi vị trí trái/phải */
                                    width: 0,
                                    height: 0,
                                    borderLeft: '10px solid transparent',
                                    borderRight: '10px solid transparent',
                                    borderTop: '15px solid #ff9a9cc4'
                                }
                            }}
                        ><span style={{ 
                                fontFamily: 'El Messiri', 
                                fontSize: '2.2rem', 
                                fontWeight: 600, 
                                color: '#ff9a9cc4'
                            }}>
                                { contentFormLogin === 'login' ? 'Đăng nhập' : 'Đăng ký'}
                            </span></Box>
                    </Box>
                </Modal>
            </Menu>
        </Box>
    )
}