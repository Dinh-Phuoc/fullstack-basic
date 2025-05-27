import { Paper, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useEffect, useRef, useState } from 'react'
import capitalizeFirstLetter from '~/utils/formatter'

export default function Review() {
    const [cardActive, setCardActive] = useState({ 1: true, 2: false, 3: false })
    const scrollImageRef = useRef()
    const scrollCardRef = useRef()
    const [isDragging, setIsDragging] = useState(false)
    const [prevPosition, setPrevPosition] = useState(null)
    const [isNegative, setIsNegative] = useState(null)

    useEffect(() => {
        const el = scrollImageRef.current
        const elCard = scrollCardRef.current
        if (!el) return

        const handleTouchStart = (e) => {
            if (e.cancelable) e.preventDefault()
            handleDown(e)
        }
        const handleTouchMove = (e) => {
            if (e.cancelable) e.preventDefault()
            handleMove(e)
        }

        const handleTouchEnd = (e) => {
            if (e.cancelable) e.preventDefault()
            handleUp(e)
        }

        el.addEventListener('touchstart', handleTouchStart, { passive: false })
        el.addEventListener('touchmove', handleTouchMove, { passive: false })
        el.addEventListener('touchend', handleTouchEnd, { passive: false })

        elCard.addEventListener('touchstart', handleTouchStart, { passive: false })
        elCard.addEventListener('touchmove', handleTouchMove, { passive: false })
        elCard.addEventListener('touchend', handleTouchEnd, { passive: false })

        return () => {
            el.removeEventListener('touchstart', handleTouchStart)
            el.removeEventListener('touchmove', handleTouchMove)
            el.removeEventListener('touchend', handleTouchEnd)

            elCard.removeEventListener('touchstart', handleTouchStart)
            elCard.removeEventListener('touchmove', handleTouchMove)
            elCard.removeEventListener('touchend', handleTouchEnd)
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

    const hanldeActiveCard = (id) => () => {
        const elImage = scrollImageRef.current
        const elCard = scrollCardRef.current

        setCardActive({
            1: false, 2: false, 3: false,
            [id]: true
        })

        const handleScrollTo = (...els) => {
            els.forEach(element => {
                element?.el?.scrollTo({
                    left: element.distance,
                    behavior: 'smooth'
                })
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
        const condition = e.touches ? 100 : 300
        
        const getNextCardId = () => {
            if (prevPosition.scroll < condition) return prevPosition.id
            if (prevPosition.id === 1) return 2
            if (prevPosition.id === 3) return 2
            return isNegative ? 1 : 3
        }

        hanldeActiveCard(getNextCardId())()
    }

    const handleDown = (e) => {
        e.preventDefault()
        const clientX = e.touches ? e.touches[0].clientX : e.clientX
        const clientY = e.touches ? e.touches[0].clientY : e.clientY

        setIsDragging(true)
        setPrevPosition({
            id: Number(e.target.getAttribute('data-id')),
            left: Math.floor(e.currentTarget.scrollLeft),
            top: Math.floor(e.currentTarget.scrollTop),
            x: clientX,
            y: clientY,
            scroll: 0
        })
    }

    const handleMove = (e) => {
        e.preventDefault()
        if (!isDragging || !prevPosition) return
        const elImage = scrollImageRef.current
        const elTitle = scrollCardRef.current

        const clientX = e.touches ? e.touches[0].clientX : e.clientX
        const clientY = e.touches ? e.touches[0].clientY : e.clientY

        const prevScrollLeft = prevPosition.left
        const prevScrollTop = prevPosition.top
        
        const dx = prevPosition.x - clientX
        const dy = prevPosition.y - clientY

        if (dx < 0 && prevPosition.id === 1) {
            return 
        }
        if (dx > 0 && prevPosition.id === 3) {
            return 
        }
        setIsNegative(Math.sign(dx) === -1)
        
        const scrollLeft = prevScrollLeft + dx
        const scrollTop = prevScrollTop + dy

        elImage.scrollLeft = scrollLeft
        elImage.scrollTop = scrollTop

        elTitle.scrollLeft = scrollLeft
        elTitle.scrollTop = scrollTop
        
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
                            onClick={hanldeActiveCard(card.id)}
                            sx={{
                                ...styleCard,
                                '&:after': {
                                    ...styleCard['&:after'],
                                    visibility: cardActive[card.id] ? 'visible' : 'hidden'
                                }
                            }} 
                            elevation={cardActive[card.id] ? 4 : 0 }
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
                                    width: cardActive[card.id] ? '6rem' : dotStyle.width,
                                    opacity: cardActive[card.id] ? 0.5 : 1
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
                            style={{ touchAction: 'none', WebkitOverflowScrolling: 'auto' }}
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
                            onMouseMove={handleMove}
                            onMouseDown={handleDown}
                            onMouseUp={handleUp}
                            onMouseLeave={handleUp}
                        >
                            { card.map(card => (
                                <Box key={card.id} sx={{ width: '100%', flexShrink: 0 }} >
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
                        style={{ touchAction: 'none', WebkitOverflowScrolling: 'auto' }}
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
                        onMouseMove={handleMove}
                        onMouseDown={handleDown}
                        onMouseUp={handleUp}
                        onMouseLeave={handleUp}
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
                                elevation={cardActive[card.id] ? 4 : 0 }
                            >
                                <Typography 
                                    data-id={card.id}
                                    sx={{ 
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
                                width: cardActive[card.id] ? '6rem' : dotStyle.width,
                                opacity: cardActive[card.id] ? 0.5 : 1
                            }}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    )
}