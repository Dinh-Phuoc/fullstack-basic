// MUI Component
import ErrorOutline from '@mui/icons-material/ErrorOutline'
import PlayCircleFilledOutlined from '@mui/icons-material/PlayCircleFilledOutlined'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container } from '@mui/material'

export default function Introduction() {
    const [open, setOpen] = useState(false)
    const [emailValue, setEmailValue] = useState('')
    const [openTooltip, setOpenTooltip] = useState(false)
    const emailInputRef = useRef()
    const videoRef = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        const elVideo = videoRef.current

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    elVideo.play()
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.3
            }
        )

        if (elVideo) {
            observer.observe(elVideo)
        }

        return () => {
            if (elVideo) {
                observer.unobserve(elVideo)
            }
        }
    }, [])

    const styleLink = { 
        textDecoration: 'none',
        position: 'relative',
        color: '#f7878a',
        '&:after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            width: '0',
            transition: 'width 0.3s',
            borderBottom: '2px solid #f7878a',
            left: '50%',
            transform: 'translateX(-50%)'
        },
        '&:hover:after': {
            width: '100%'
        }
    }
    
    const handleSendEmailToAuthForm = () => {
        const display = emailInputRef.current.offsetParent
        if (emailValue === '' && !display) {
            localStorage.setItem('register', 'true')
            navigate('/auth')
            return
        }

        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!pattern.test(emailValue)) {
            handleTooltipOpen()
            return
        }
        localStorage.setItem('email', emailValue)
        localStorage.setItem('register', 'true')
        navigate('/auth')
    }

    const handleSetEmailValue = (e) => {
        setEmailValue(e.target.value)
        handleTooltipClose()
    }

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const handleTooltipClose = () => {
        setOpenTooltip(false)
    }

    const handleTooltipOpen = () => {
        setOpenTooltip(true)
    }

    return (
        <>
            <Box 
                sx={{ 
                    bgcolor: '#ff9a9c45', 
                    textAlign: 'center', 
                    minHeight: '48px',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    p: '6px'
                }}>
                <Typography >
                    Accelerate your teams&apos; work with Atlassian Intelligence (AI) 
                    features 🤖 now available for all Premium and Enterprise!&nbsp; 
                    <Box component={Link} to='#' 
                        sx={styleLink}>
                        Learn more.
                    </Box>
                </Typography>
            </Box>

            <Box 
                sx={{ 
                    overflow: 'hidden',
                    bgcolor: '#f3f3f5'
                }}>
                <Container>
                    <Box sx={{
                        display: 'flex', 
                        flexWrap: 'wrap',
                        margin: '0 50px'
                    }}>
                        <Box 
                            sx={{ 
                                width: { xs: '100%', md: '50%' }, 
                                display: 'flex',
                                flexDirection: 'column',
                                p: '128px 18px 18px'
                            }}
                        >
                            <Box 
                                sx={{ 
                                    display: 'block',
                                    textAlign: { xs: 'center', md: 'start' },
                                    marginX: { xs: '-55px', md: '0' }
                                }}
                            >
                                <Typography variant='h3' sx={{ mb: '12px', fontWeight: 500 }}>
                                    Capture, organize, and tackle your to-dos from anywhere.
                                </Typography>
                                <Typography sx={{ mb: '12px' }}>
                                    Escape the clutter and chaos—unleash your productivity with Trello.
                                </Typography>
                            </Box>
        
                            <Box 
                                sx={{ 
                                    display: 'flex', 
                                    justifyContent: { xs: 'center', md: 'flex-start' } 
                                }}
                            >
                                <Tooltip
                                    onClose={handleTooltipClose}
                                    open={openTooltip}
                                    disableFocusListener
                                    disableHoverListener
                                    disableTouchListener
                                    arrow
                                    title={<Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <ErrorOutline fontSize='small' /> The email address is invalid
                                    </Typography>} 
                                    slotProps={{
                                        popper: {
                                            disablePortal: true,
                                            sx: {
                                                boxShadow: ''
                                            }
                                        },
                                        tooltip: {
                                            sx: {
                                                p: '12px'
                                            }
                                        },
                                        arrow: {
                                            sx: {
                                                color: 'white'
                                            }
                                        }
                                    }}
                                >
                                    <TextField 
                                        inputRef={emailInputRef}
                                        sx={{ 
                                            mb: '12px',
                                            mr: '12px',
                                            display: { xs: 'none', md: 'block' },
                                            '& .MuiOutlinedInput-input': {
                                                p: '10px 14px'
                                            }
                                        }}
                                        type='email' 
                                        placeholder='Email'
                                        value={emailValue}
                                        aria-describedby="my-helper-text" 
                                        onChange={handleSetEmailValue}
                                        onKeyDown={(e) => {
                                            if (!(e.key === 'Enter')) return
                                            handleSendEmailToAuthForm()
                                        }}
                                    />
                                </Tooltip>
                                <Button 
                                    sx={{ 
                                        mb: '12px', 
                                        bgcolor: '#ffb1b3', 
                                        color: 'white', 
                                        height: '43px',
                                        lineHeight: '1.4',
                                        '&:hover': {
                                            bgcolor: '#f0777acc',
                                            border: '2px solid',
                                            borderColor: '#f0777acc'
                                        }
                                    }}
                                    onClick={handleSendEmailToAuthForm}
                                    variant='outlined'
                                >
                                        Sign up - it&apos;s free!
                                </Button>
                            </Box>
        
                            <Box 
                                sx={{ 
                                    display: 'block',
                                    textAlign: { xs: 'center', md: 'start' } 
                                }}>
                                
                                <Typography sx={{ mb: '12px' }}>
                                    By entering my email, I acknowledge the&nbsp; 
                                    <Box component={Link} sx={styleLink}>
                                        Atlassian Privacy Policy
                                    </Box>
                                </Typography>
        
                                <Button
                                    onClick={handleOpen} 
                                    sx={{ 
                                        ...styleLink, 
                                        p: 0,
                                        width: '130px', 
                                        ml: 0,
                                        justifyContent: { xs: 'center', md: 'flex-start' },
                                        '&:hover .watchIcon': 
                                        { transform: 'translate3d(3px, 0, 0)' } 
                                    }}>
                                    Watch video 
                                    <PlayCircleFilledOutlined 
                                        className='watchIcon'
                                        sx={{ 
                                            ml: '6px',
                                            transition: 'transform 0.3s'
                                        }}
                                    />
                                </Button>
                            </Box>
                        </Box>
        
                        <Box 
                            sx={{ 
                                position: 'relative',
                                left: '16.6666%',
                                width: { xs: '100%', md: '58.3333%' }, 
                                pt: '8rem',
                                flex: '0 0 auto',
                                marginLeft: '-16.6666%'
                            }}
                        >
                            <video 
                                style={{
                                    width: '100%',
                                    height: 'auto'
                                }} 
                                ref={videoRef} muted>
                                <source 
                                    type='video/mp4' 
                                    src='https://videos.ctfassets.net/rz1oowkt5gyp/4AJBdHGUKUIDo7Po3f2kWJ/3923727607407f50f70ccf34ab3e9d90/updatedhero-mobile-final.mp4'
                                />
                            </video>
                        </Box>
                    </Box >
                </Container>
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box 
                    sx={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        width: '80vw',
                        maxWidth: 800,
                        aspectRatio: '16 / 9',
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    <iframe
                        width="100%"
                        height="100%" 
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                        title="Rick Astley - Never Gonna Give You Up (Official Music Video)" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen>
                    </iframe>
                </Box>
            </Modal>
        </>
       
    )
}