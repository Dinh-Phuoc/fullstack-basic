import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { useEffect, useRef, useState } from 'react'

import capitalizeFirstLetter from '~/utils/formatter'

export default function Review() {
    const [cardActive, setCardActive] = useState(1)
    const scrollImageRef = useRef()
    const scrollCardRef = useRef()
    const [isDragging, setIsDragging] = useState(false)
    const [prevPosition, setPrevPosition] = useState(null)
    const [isNegative, setIsNegative] = useState(null)

    useEffect(() => {
        const el = scrollImageRef.current
        const elCard = scrollCardRef.current
        if (!el || !elCard) return

        const prevHandleStart = (e) => {
            if (e.touches) {
                handleDown(e)
                return
            }
        }
        const prevHandleMove = (e) => {
            if (e.touches) {
                handleMove(e)
                return
            }
        }

        const prevHandleUp = (e) => {
            if (e.touches) {
                handleUp(e)
                return
            }
        }

        el.addEventListener('touchstart', prevHandleStart, { passive: false })
        el.addEventListener('touchmove', prevHandleMove, { passive: false })
        el.addEventListener('touchend', prevHandleUp, { passive: false })

        elCard.addEventListener('touchstart', prevHandleStart, { passive: false })
        elCard.addEventListener('touchmove', prevHandleMove, { passive: false })
        elCard.addEventListener('touchend', prevHandleUp, { passive: false })

        return () => {
            el.removeEventListener('touchstart', prevHandleStart)
            el.removeEventListener('touchmove', prevHandleMove)
            el.removeEventListener('touchend', prevHandleUp)

            elCard.removeEventListener('touchstart', prevHandleStart)
            elCard.removeEventListener('touchmove', prevHandleMove)
            elCard.removeEventListener('touchend', prevHandleUp)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prevPosition])

    const card = [
        {
            id: 1,
            title: 'inbox',
            desc: 'When it\'s on your mind, it goes in your Inbox. Capture your to-dos from anywhere, anytime.',
            img: 'https://images.ctfassets.net/rz1oowkt5gyp/76s8l9DR2ZxNhjevNpluXZ/cfb2b7555f019f09045ff08b05cf5a4d/inbox-subheader-updated.png'
        },
        {
            id: 2,
            title: 'boards',
            desc: 'When it\'s on your mind, it goes in your Inbox. Capture your to-dos from anywhere, anytime.',
            img: 'https://images.ctfassets.net/rz1oowkt5gyp/60f6L1YQ03iAyOWYJe9ZQP/40da9e6e29cecda15bb92a8ced28a346/TrelloBoard_ProcessTracking_Onboarding_2x.png?w=1936&fm=webp'
        },
        {
            id: 3,
            title: 'planner',
            desc: 'When it\'s on your mind, it goes in your Inbox. Capture your to-dos from anywhere, anytime.',
            img: 'https://images.ctfassets.net/rz1oowkt5gyp/5jLvxYsqWehh4tkm3FqMYj/eec08095626ec26259144e7055dd7d08/planner-hero.png?w=2280&fm=webp'
        }
    ]

    const styleCard = {
        p: '12px 12px 12px 32px',
        mb: '12px',
        position: 'relative',
        cursor: 'pointer',
        '&:after': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            visibility: 'hidden',
            borderTopLeftRadius: '4px',
            borderBottomLeftRadius: '4px',
            height: '100%',
            color: theme => theme.trelloCustom.myColor,
            border: '3px solid'
        },
        transition: 'transform 0.3s',
        '@media (hover: hover) and (pointer: fine)': {
            '&:hover': {
                transform: 'translate(-5px, -5px)',
                '&:after': {
                    visibility: 'visible',
                    color: '#ff9a9c40'
                }
            }
        }
    }

    const dotStyle = {
        width: '8px', 
        height: '8px',
        borderBottomLeftRadius: '4px',
        borderBottomRightRadius: '4px',
        borderTopLeftRadius: '4px',
        borderTopRightRadius: '4px',
        bgcolor: '#091e42',
        opacity: 1,
        ml: '4px',
        transition: 'width 0.3s'
    }

    const handleActiveCard = (id) => () => {
        const elImage = scrollImageRef.current
        const elCard = scrollCardRef.current

        setCardActive(id)

        const handleScrollTo = (...elements) => {
            elements.forEach(({ el, distance }) => {
                if (!el) return
                el.scrollTo({ left: distance, behavior: 'smooth' })
            })
        }

        if (id === 1) {
            handleScrollTo(
                { el: elImage, distance: 0 }, 
                { el: elCard, distance: 0 }
            )
        } else if (id === 2) {
            handleScrollTo(
                { el: elImage, distance: elImage.clientWidth },
                { el: elCard, distance: elCard.clientWidth }
            )
        } else if (id === 3) {
            handleScrollTo(
                { el: elImage, distance: elImage.scrollWidth - elImage.clientWidth },
                { el: elCard, distance: elCard.scrollWidth - elCard.clientWidth }
            )
        }
    }

    const handleSetScrollLeft = (e) => {
        const condition = e.touches ? 30 : 300
        
        const getNextCardId = () => {
            if (prevPosition.scroll < condition) return prevPosition.id
            if (prevPosition.id === 1) return 2
            if (prevPosition.id === 3) return 2
            return isNegative ? 1 : 3
        }

        handleActiveCard(getNextCardId())()
    }

    const handleDown = (e) => {
        setIsDragging(true)
        const clientX = e.touches ? e.touches[0].clientX : e.clientX
        const clientY = e.touches ? e.touches[0].clientY : e.clientY
        setPrevPosition({
            id: Number(e.target.getAttribute('data-id')),
            left: Math.floor(e.currentTarget.scrollLeft),
            top: Math.floor(e.currentTarget.scrollTop),
            x: clientX,
            y: clientY,
            scroll: 0
        })
    }

    const handleMove = (e, elementToScroll) => {
        if (!isDragging || !prevPosition) return

        const clientX = e.touches ? e.touches[0].clientX : e.clientX
        const clientY = e.touches ? e.touches[0].clientY : e.clientY

        const prevScrollLeft = prevPosition.left
        const prevScrollTop = prevPosition.top
        
        const dx = prevPosition.x - clientX
        const dy = prevPosition.y - clientY

        if (Math.abs(dy) > Math.abs(dx)) {
            return
        }
        
        if (dx < 0 && prevPosition.id === 1) {
            return 
        }
        if (dx > 0 && prevPosition.id === 3) {
            return 
        }
        setIsNegative(Math.sign(dx) === -1)
        
        const scrollLeft = prevScrollLeft + dx
        const scrollTop = prevScrollTop + dy

        if (!e.touches) {
            elementToScroll.scrollLeft = scrollLeft
            elementToScroll.scrollTop = scrollTop
        }
        
        setPrevPosition((prev) => ({
            ...prev,
            scroll: Math.abs(dx)
        }))
    }
    
   
    const handleUp = (e) => {
        if (!isDragging) return 
        setIsDragging(false)
        handleSetScrollLeft(e)
        setIsNegative(null)
        setPrevPosition(null)
    }

    return (
        <Container>
            <Box sx={{ m: '24px 50px 24px' }}>
                <Box sx={{ mb: '24px', width: '100%', p: '18px' }}>
                    <Typography sx={{ mb: '12px' }}>TRELLO 101</Typography>
                    <Typography variant='h4' sx={{ mb: '12px', fontWeight: 500 }}>Your productivity powerhouse</Typography>
                    <Typography 
                        sx={{ '&.MuiTypography-root.MuiTypography-body1': { fontSize: '1.2rem' } }}>
                        Stay organized and efficient with Inbox, Boards, and Planner. Every to-do, idea, or responsibility—no matter how small—finds its place, keeping you at the top of your game.
                    </Typography>
                </Box>
    
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignContent: 'center' }}>
                    <Box 
                        sx={{ 
                            width: '35%',
                            display: { xs: 'none', md: 'flex' },
                            flexDirection: { md: 'column' },
                            p: '8px'
                        }}
                    >
                        { card.map(card => (
                            <Paper 
                                key={card.id} 
                                onClick={handleActiveCard(card.id)}
                                sx={{
                                    ...styleCard,
                                    '&:after': {
                                        ...styleCard['&:after'],
                                        visibility: cardActive === card.id ? 'visible' : 'hidden'
                                    }
                                }} 
                                elevation={ cardActive === card.id ? 4 : 0 }
                            >
                                <Typography 
                                    sx={{ 
                                        fontWeight: 600,
                                        '&.MuiTypography-root.MuiTypography-body1': {
                                            fontSize: '1.2rem'
                                        }
                                    }}>
                                    {capitalizeFirstLetter(card.title)}
                                </Typography>
                                <Typography 
                                    sx={{ 
                                        '&.MuiTypography-root.MuiTypography-body1': {
                                            fontSize: '1rem'
                                        }
                                    }}>{card.desc}</Typography>
                            </Paper>
                        ))}
                    </Box>
    
                    <Box sx={{ width: { xs: '100%', md: '70%' } }}>
                        <Box 
                            sx={{ 
                                display: { xs: 'none', md: 'flex' },
                                justifyContent: 'flex-end',
                                flexDirection: 'row'
                            }}
                        >
                            { card.map(card => (
                                <Typography 
                                    key={card.id}
                                    sx={{ 
                                        ...dotStyle,
                                        width: cardActive === card.id ? '6rem' : dotStyle.width,
                                        opacity: cardActive === card.id ? 0.5 : 1
                                    }}
                                />
                            ))}
                        </Box>
    
                        <Box 
                            sx={{ 
                                overflow: 'hidden',
                                mt: '24px',
                                cursor:  isDragging ? 'grabbing' : 'grab',
                                width: '100%'
                            }}>
                            <Box 
                                sx={{ 
                                    overflow: 'auto',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    width: '100%',
                                    gap: 1,
                                    '&::-webkit-scrollbar': {
                                        display: 'none'
                                    }
                                }}
                                ref={scrollImageRef}
                                onMouseDown={(e) => { 
                                    e.preventDefault()
                                    handleDown(e)
                                }}
                                onMouseMove={(e) => handleMove(e, scrollImageRef.current)}
                                onMouseUp={(e) => { 
                                    e.preventDefault()
                                    handleUp(e)
                                }}
                                onMouseLeave={(e) => { 
                                    e.preventDefault()
                                    handleUp(e)
                                }}
                            >
                                { card.map(card => (
                                    <Box key={card.id} sx={{ width: '100%', flexShrink: 0 }} data-id={card.id}>
                                        <img 
                                            data-id={card.id}
                                            style={{ 
                                                userSelect: 'none',
                                                width: '100%', 
                                                objectFit: 'contain'
                                            }} 
                                            src={card.img} 
                                            alt={card.title} 
                                        />
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>
    
                    <Box 
                        sx={{ 
                            display: { xs: 'block', md: 'none' },
                            overflow: 'hidden',
                            mt: '24px',
                            width: '100%',
                            cursor:  isDragging ? 'grabbing' : 'grab'
    
                        }}>
                        <Box 
                            sx={{ 
                                overflow: 'auto',
                                display: 'flex',
                                flexDirection: 'row',
                                width: '100%',
                                gap: 1,
                                '&::-webkit-scrollbar': {
                                    display: 'none'
                                }
                            }}
                            ref={scrollCardRef}
                            onMouseDown={(e) => { 
                                e.preventDefault()
                                handleDown(e)
                            }}
                            onMouseMove={(e) => handleMove(e, scrollCardRef.current)}
                            onMouseUp={(e) => { 
                                e.preventDefault()
                                handleUp(e)
                            }}
                            onMouseLeave={(e) => { 
                                e.preventDefault()
                                handleUp(e)
                            }}
                        >
                            { card.map(card => (
                                <Paper 
                                    data-id={card.id}
                                    key={card.id}
                                    sx={{
                                        width: '100%',
                                        p: '12px',
                                        position: 'relative',
                                        flexShrink: 0,
                                        '&:after': {
                                            content: '""',
                                            position: 'absolute',
                                            left: 0,
                                            top: 0,
                                            borderTopLeftRadius: '4px',
                                            borderBottomLeftRadius: '4px',
                                            height: '100%',
                                            color: theme => theme.trelloCustom.myColor,
                                            border: '3px solid'
                                        }
                                    }} 
                                    elevation={cardActive === card.id ? 4 : 0 }
                                >
                                    <Typography 
                                        data-id={card.id}
                                        sx={{ 
                                            userSelect: 'none',
                                            fontWeight: 600,
                                            '&.MuiTypography-root.MuiTypography-body1': {
                                                fontSize: '1.2rem'
                                            }
                                        }}>
                                        {capitalizeFirstLetter(card.title)}
                                    </Typography>
                                    <Typography 
                                        data-id={card.id}
                                        sx={{ 
                                            userSelect: 'none',
                                            '&.MuiTypography-root.MuiTypography-body1': {
                                                fontSize: '1rem'
                                            }
                                        }}>{card.desc}
                                    </Typography>
                                </Paper>
                            ))}
                        </Box>
                    </Box>                   
    
                    <Box 
                        sx={{ 
                            display: { xs: 'flex', md: 'none' },
                            justifyContent: 'center',
                            flexDirection: 'row',
                            mt: '24px'
                        }}
                    >
                        { card.map(card => (
                            <Typography 
                                key={card.id}
                                sx={{ 
                                    ...dotStyle,
                                    width: cardActive === card.id ? '6rem' : dotStyle.width,
                                    opacity: cardActive === card.id ? 0.5 : 1
                                }}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}