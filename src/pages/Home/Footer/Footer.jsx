import { Email, ErrorOutline, FacebookOutlined, Instagram } from '@mui/icons-material'
import { Box, Button, Container, SvgIcon, TextField, Tooltip, Typography } from '@mui/material'
import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TrelloWebIcon } from '~/assets/icon'

import { ReactComponent as ZaloIcon } from '~/assets/zaloIcon.svg'
export default function Footer({ display='flex' }) {
    const [emailValue, setEmailValue] = useState('')
    const [open, setOpen] = useState(false)
    const emailInputRef = useRef()
    const navigate = useNavigate()

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

    const styleIcon = {
        textDecoration: 'none',
        color: 'white',
        width: '32px',
        height: '32px',
        transition: 'all 0.3s',
        '&:hover': {
            transform: 'scale(1.2)'
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

    const handleTooltipClose = () => {
        setOpen(false)
    }

    const handleTooltipOpen = () => {
        setOpen(true)
    }
    return (
        <Box sx={{ width: { md: '100%' }, mt: '32px' }}>
            <Box 
                sx={{ 
                    display: { display }, 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    gap: 3,
                    p: '48px',
                    textAlign: 'center',
                    bgcolor: '#efb7b814'
                }}>
                <Typography variant='h4' sx={{ fontWeight: 600 }}>Get started with Trello today</Typography>
                <Box 
                    sx={{ 
                        display: 'flex', 
                        justifyContent: { xs: 'center', md: 'flex-start' } 
                    }}
                >
                    <Tooltip
                        onClose={handleTooltipClose}
                        open={open}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        arrow
                        title={<Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <ErrorOutline fontSize='small' /> The email address is invalid
                        </Typography>} 
                        slotProps={{
                            popper: {
                                disablePortal: true
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
                <Typography>
                    By entering my email, I acknowledge the
                    <Box component={Link} to='#' sx={styleLink}> Atlassian Privacy Policy </Box>
                </Typography>
            </Box>

            <Box 
                sx={{ 
                    bgcolor: theme => theme.trelloCustom.myColor
                }}>
                <Container
                    sx={{ 
                        display: 'flex', 
                        flexDirection: { xs: 'column', sm: 'row' }, 
                        alignItems: 'center', 
                        justifyContent: display === 'none' ? 'center' : 'space-between',
                        gap: 2,
                        textAlign: 'center',
                        color: 'white'
                    }}
                >
                    <Box 
                        sx={{ 
                            p: '16px', 
                            gap: 2, 
                            textAlign: 'center', 
                            display: { display },
                            flexDirection: 'column'
                        }}>
                        <Typography variant='h6' sx={{ mb: '12px', fontSize: '1.4rem' }}>
                            Trang web được tạo nên dựa trên giao diện của 
                        </Typography>
                        <Box component={Link} to='https://trello.com/' sx={{ cursor: 'pointer' }}>
                            <TrelloWebIcon/>
                        </Box>
                    </Box>
                    <Box sx={{ p: '28px' }}>
                        <Typography variant='h6' sx={{ fontWeight: 600, mb: '12px', fontSize: '1.4rem' }}>Liên hệ với tôi qua:</Typography>
                        <Box
                            sx={{ 
                                display: 'flex', 
                                flexDirection: 'row', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                gap: 2
                            }}
                        >
                            <Box component={'a'} href='https://www.facebook.com/saru.an.169/' target="_blank" rel="noopener noreferrer">
                                <FacebookOutlined sx={styleIcon}/>
                            </Box>
        
                            <Box component={'a'} href='https://www.instagram.com/pdphuoc_ordinary/' target="_blank" rel="noopener noreferrer">
                                <Instagram sx={styleIcon}/>
                            </Box>
        
                            <Box component={'a'} href='mailto:phandinhphuoc02@gmail.com'>
                                <Email sx={styleIcon}/>
                            </Box>
        
                            <Box component={'a'} href="https://zalo.me/0366159200" target="_blank" rel="noopener noreferrer">
                                <SvgIcon component={ZaloIcon} fontSize='large' inheritViewBox sx={styleIcon}/>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Box>
    )
}