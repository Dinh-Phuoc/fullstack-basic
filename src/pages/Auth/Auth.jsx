import { Box, CircularProgress, Modal, SvgIcon, Typography } from '@mui/material'
import { ReactComponent as TrelloIcon } from '~/assets/trelloIcon.svg'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useRef, useState } from 'react'
import { loginThunk } from '~/redux/slice/userSlice'
import { registerApi } from '~/apis'
import MyTabs from '~/components/Tabs/store/MyTabs'
import MyTabList from '~/components/Tabs/MyTabList'
import MyTabItem from '~/components/Tabs/MyTabItem'
import MyTabPanel from '~/components/Tabs/MyTabPanel'
import Login from '~/components/AppBar/Menus/Login'
import Register from '~/components/AppBar/Menus/Register'
import { Face2Outlined, SentimentDissatisfied } from '@mui/icons-material'

import bgImageFormLoginLightMD from '~/assets/loginformlight.jpg'
import bgImageFormLoginDarkMD from '~/assets/loginformdark.jpg'
export default function Auth() {
    const dispatch = useDispatch()
    const [openChildModal, setOpenChildModal] = useState(false)
    const [childModalLoginProcessing, setChildModalLoginProcessing] = useState(false)
    const [messageRigister, setMessageRegister] = useState('')
    const [openChildModalRegistering, setOpenChildModalRegistering] = useState(false)
    const [childModalRegisterProcessing, setChildModalRegisterProcessing] = useState(false)
    const [titleForm, setTitleForm] = useState('login')
    const childrenLoginRef = useRef()
    const childrenRegisterRef = useRef()

    const handleLogin = async() => {
        const data = childrenLoginRef.current?.getChildrenRef()
        handleChildModalLoginProcessingOpen()
        dispatch(loginThunk(data))
            .unwrap()
            .then(() => {
                handleChildModalLoginProcessingClose()
            })
            .catch(() => {
                handleChildModalOpen()
                handleChildModalLoginProcessingClose()
            })
    }

    const handleRegister = async() => {
        const data = childrenRegisterRef.current?.getChildrenValue()
        handleChildModalRegisterProcessingOpen()
        const message = await registerApi(data)
        handleChildModalRegisterProcessingClose()
        handleChildModalRegisteringOpen()
        setMessageRegister(message)
    }
    

    const handleSetTitle = () => {
        titleForm === 'register' ? handleTitleLoginForm() : handleTitleRegisterForm()
    }

    const handleTitleLoginForm = () => {
        setTitleForm('login')
    }

    const handleTitleRegisterForm = () => {
        setTitleForm('register')
    }

    // Modal Child Login
    const handleChildModalOpen = () => setOpenChildModal(true)
    const handleChildModalClose = () => setOpenChildModal(false)

    // ChildModalLoginProcessing
    const handleChildModalLoginProcessingOpen = () => setChildModalLoginProcessing(true)
    const handleChildModalLoginProcessingClose = () => setChildModalLoginProcessing(false)

    // Modal Child Register
    const handleChildModalRegisteringOpen = () => setOpenChildModalRegistering(true)
    const handleChildModalRegisteringClose = () => setOpenChildModalRegistering(false)

    // ChildModalLoginProcessing
    const handleChildModalRegisterProcessingOpen = () => setChildModalRegisterProcessing(true)
    const handleChildModalRegisterProcessingClose = () => setChildModalRegisterProcessing(false)

    return (
        <Box sx={{ height: '100vh' }}>
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
            </Box>
            <Box sx={{ 
                backgroundColor: '#ffeef8',
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <MyTabs>
                    <Box 
                        sx={{
                            position: 'relative',
                            minWidth: { xs: '300px', sm: '580px', md: '844px' },
                            maxWidth: { xs: '300px', sm: '890px', md: '844px' },
                            width: { xs: '95%', sm: '80%' },
                            height: '610px',
                            maxHeight: '610px',
                            mt: '12px',
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
                                bgcolor: (theme) => theme.palette.mode === 'dark' ? theme.palette.background.default : 'white',
                                width: { xs:'100%', sm: '324px', md: '424px' }, 
                                height: { xs:'100%', sm: '96%', md: '96%' },
                                maxHeight: '610px',
                                borderRadius: '6px',
                                m: { xs:'0', sm: '12px' },
                                p: '16px 24px 24px'
                            }}
                        >
                            <MyTabs>
                                <MyTabList>
                                    <MyTabItem
                                        onClick={handleSetTitle}
                                        myStyleChild={{ textTransform: 'upperCase' }} 
                                        handleTitleLoginForm={handleTitleLoginForm} 
                                        value={0} 
                                        active='true'>
                                            Đăng nhập
                                    </MyTabItem>

                                    <MyTabItem
                                        onClick={handleSetTitle}
                                        myStyleChild={{ textTransform: 'upperCase' }} 
                                        handleTitleRegisterForm={handleTitleRegisterForm} 
                                        value={1}>
                                        Đăng ký
                                    </MyTabItem>
                                </MyTabList>

                                <MyTabPanel value={0}><Login ref={childrenLoginRef} onClick={handleLogin}/></MyTabPanel>                    

                                <MyTabPanel value={1}><Register ref={childrenRegisterRef} onClick={handleRegister}/></MyTabPanel>
                                
                            </MyTabs>
                        </Box>
                        <Box 
                            sx={{
                                display: { xs: 'none', sm: 'flex', md: 'flex' },
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'absolute',
                                top: { sm: '12px', md: '12px' },
                                right: { sm: '22px', md: '22px' },
                                width: { sm: '210px', md: '255px' },
                                height: '240px',
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
                                    fontWeight: 800, 
                                    color: (theme) => theme.palette.mode === 'dark' ? 'black' : '#ff9a9cc4',
                                    textAlign: 'center',
                                    lineHeight: { sm: '2.8rem', md: '2.6rem' },
                                    '&.MuiTypography-body1': { fontSize: { sm: '2.5rem', md: '2.4rem' } }
                                }}
                                variant='body1'
                            >
                                { titleForm === 'login' ? 'Đăng nhập thôi nàooooo!' : 'Tạo mới tài khoản ngay thôiiiii!'}
                            </Typography>
                        </Box>
                    </Box>

                    <Modal 
                        open={openChildModal}
                        onClose={handleChildModalClose}
                        aria-labelledby="child-modal-title"
                        aria-describedby="child-modal-description">
                        <Box 
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 400,
                                bgcolor: (theme) => theme.palette.mode === 'dark' ? '#080808' : 'white',
                                border: '2px solid',
                                borderRadius: '20px',
                                borderColor: '#ff9a9cc4',
                                boxShadow: 12,
                                p: 1,
                                textAlign: 'center'
                            }}
                        >
                            <SentimentDissatisfied fontSize='large' sx={{ color: '#ff9a9cc4' }}/>
                            <Typography 
                                id="modal-modal-description" 
                                sx={{
                                    textAlign: 'center', 
                                    m: '0 12px 12px', 
                                    fontFamily: 'El Messiri', 
                                    fontSize: '1.8rem', 
                                    color: '#ff9a9cc4',
                                    fontWeight: { sm: 700, md: 800 },
                                    '&.MuiTypography-body1': { fontSize: { sm: '1.8rem', md: '2.4rem' } }
                                }}>
                                Tài khoản hoặc mật khẩu không chính xác nhé bae 
                            </Typography>
                        </Box>
                    </Modal>

                    <Modal 
                        open={childModalLoginProcessing}
                        onClose={handleChildModalLoginProcessingClose}
                        aria-labelledby="child-modal-title"
                        aria-describedby="child-modal-description">
                        <Box 
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 400,
                                bgcolor: (theme) => theme.palette.mode === 'dark' ? '#080808' : 'white',
                                border: '2px solid',
                                borderRadius: '20px',
                                borderColor: '#ff9a9cc4',
                                boxShadow: 12,
                                p: 1, 
                                textAlign:'center'
                            }}
                        >   
                            <Typography 
                                sx={{ 
                                    m: '0 12px 12px', 
                                    fontFamily: 'El Messiri', 
                                    fontSize: '1.8rem', 
                                    color: '#ff9a9cc4',
                                    fontWeight: { sm: 700, md: 800 },
                                    '&.MuiTypography-body1': { fontSize: { sm: '1.8rem', md: '2.4rem' } }
                                }}
                            >Đang đăng nhập</Typography>
                            <CircularProgress sx={{ color: '#ff9a9cc4' }}/>
                        </Box>
                    </Modal>

                    <Modal 
                        open={childModalRegisterProcessing}
                        onClose={handleChildModalRegisterProcessingClose}
                        aria-labelledby="child-modal-title"
                        aria-describedby="child-modal-description">
                        <Box 
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 400,
                                bgcolor: (theme) => theme.palette.mode === 'dark' ? '#080808' : 'white',
                                border: '2px solid',
                                borderRadius: '20px',
                                borderColor: '#ff9a9cc4',
                                boxShadow: 12,
                                p: 1, 
                                textAlign:'center'
                            }}
                        >   
                            <Typography 
                                sx={{ 
                                    m: '0 12px 12px', 
                                    fontFamily: 'El Messiri', 
                                    fontSize: '1.8rem', 
                                    color: '#ff9a9cc4',
                                    fontWeight: { sm: 700, md: 800 },
                                    '&.MuiTypography-body1': { fontSize: { sm: '1.8rem', md: '2.4rem' } }
                                }}
                            >Đang đăng ký tài khoản</Typography>
                            <CircularProgress sx={{ color: '#ff9a9cc4' }}/>
                        </Box>
                    </Modal>
    
                    <Modal 
                        open={openChildModalRegistering}
                        onClose={handleChildModalRegisteringClose}
                        aria-labelledby="child-modal-title"
                        aria-describedby="child-modal-description">
                        <Box 
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 400,
                                bgcolor: (theme) => theme.palette.mode === 'dark' ? '#080808' : 'white',
                                border: '2px solid',
                                borderRadius: '20px',
                                borderColor: '#ff9a9cc4',
                                boxShadow: 12,
                                p: 1,
                                textAlign: 'center'
                            }}
                        >
                            <Face2Outlined fontSize='large' sx={{ color: '#ff9a9cc4' }}/>
                            <Typography 
                                id="modal-modal-description" 
                                sx={{
                                    textAlign: 'center', 
                                    m: '0 12px 12px', 
                                    fontFamily: 'El Messiri', 
                                    fontSize: '1.8rem', 
                                    color: '#ff9a9cc4',
                                    fontWeight: { sm: 700, md: 800 },
                                    '&.MuiTypography-body1': { fontSize: { sm: '1.8rem', md: '2.4rem' } }
                                }}>
                                { messageRigister } 
                            </Typography>
                        </Box>
                    </Modal>
                </MyTabs>
            </Box>
        </Box>
    )
}