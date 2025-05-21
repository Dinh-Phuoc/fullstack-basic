// MUI Component
import { PlayCircleFilledOutlined } from '@mui/icons-material'
import { Button, Modal, OutlinedInput, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
export default function Introduction() {
    const [open, setOpen] = useState(false)
    const videoRef = useRef()
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

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
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
                    <Box component={Link} to='/learnmore' 
                        sx={styleLink}>
                        Learn more.
                    </Box>
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', width: '100%', flexWrap: 'wrap' }}>
                <Box 
                    sx={{ 
                        width: { xs: '100%', md: '50%' }, 
                        bgcolor: '#f3f3f5', 
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        p: '128px 18px 18px'
                    }}
                >
                    <Typography variant='h4' sx={{ mb: '12px' }}>
                        Capture, organize, and tackle your to-dos from anywhere.
                    </Typography>
                    <Typography sx={{ mb: '12px' }}>
                        Escape the clutter and chaos—unleash your productivity with Trello.
                    </Typography>
                    <OutlinedInput 
                        sx={{ 
                            mb: '12px',
                            '& .MuiOutlinedInput-input': {
                                p: '10px 14px'
                            }
                        }} 
                        type='email' 
                        placeholder='Email'
                    />

                    <Button 
                        sx={{ mb: '12px', bgcolor: '#ffb1b3', color: 'white' }}
                        variant='outlined'
                    >
                            Sign up - it&apos;s free!
                    </Button>
                    <Box 
                        sx={{ 
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: { xs: 'center', md: 'flex-start' }
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

                <Box sx={{ width: { xs: '100%', md: '50%' }, bgcolor: '#f3f3f5' }}>
                    <video ref={videoRef} width={'100%'} height={'100%'} muted>
                        <source 
                            type='video/mp4' 
                            src='https://videos.ctfassets.net/rz1oowkt5gyp/4AJBdHGUKUIDo7Po3f2kWJ/3923727607407f50f70ccf34ab3e9d90/updatedhero-mobile-final.mp4'
                        />
                    </video>
                </Box>
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