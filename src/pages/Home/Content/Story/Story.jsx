import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useEffect, useRef, useState } from 'react'
import { Button, Container, Divider, Paper } from '@mui/material'
import { Link } from 'react-router-dom'
import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined } from '@mui/icons-material'

export default function Story() {
    const [cardActive, setCardActive] = useState({ 1: true, 2: false, 3: false })
    const scrollElRef = useRef()
    const [isDragging, setIsDragging] = useState(false)
    const [prevPosition, setPrevPosition] = useState(null)
    const [isNegative, setIsNegative] = useState(null)

    useEffect(() => {
        const el = scrollElRef.current
        if (!el) return

        const handleTouchStart = (e) => {
            handleDown(e)
        }
        const handleTouchMove = (e) => {
            handleMove(e)
        }

        const handleTouchEnd = (e) => {
            handleUp(e)
        }

        el.addEventListener('touchstart', handleTouchStart, { passive: false })
        el.addEventListener('touchmove', handleTouchMove, { passive: false })
        el.addEventListener('touchend', handleTouchEnd, { passive: false })

        return () => {
            el.removeEventListener('touchstart', handleTouchStart)
            el.removeEventListener('touchmove', handleTouchMove)
            el.removeEventListener('touchend', handleTouchEnd)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prevPosition])

    const card = [
        {
            id: 1,
            title: '75% of organizations report that Trello delivers value to their business within 30 days.',
            name: 'Joey Rosenberg',
            jobTitle: 'Global Leadership Director at Women Who Code',
            feedback: '[Trello is] great for simplifying complex processes. As a manager, I can chunk [processes] down into bite-sized pieces for my team and then delegate that out, but still keep a bird\'s-eye view.',
            img: 'https://images.ctfassets.net/rz1oowkt5gyp/2f3keSvy7vtldV4YDFKkE2/5ed788fb5257c342995d25ba8e8e313d/WomenWhoCode_logo.svg'
        },
        {
            id: 2,
            title: '81% of customers chose Trello for its ease of use.',
            name: 'Joey Rosenberg',
            jobTitle: 'Global Leadership Director at Women Who Code',
            feedback: 'Whether someone is in the office, working from home, or working on-site with a client, everyone can share context and information through Trello.',
            img: 'https://images.ctfassets.net/rz1oowkt5gyp/2kIh1cWqsxjtHwWHWJJPsJ/d8436f3979be6cab7931f4d276c2d5ce/thoughtworks.svg'
        },
        {
            id: 3,
            title: '74% of customers say Trello has improved communication with their co-workers and teams.',
            name: 'Jefferson Scomacao',
            jobTitle: 'Development Manager at IKEA/PTC',
            feedback: 'We used Trello to provide clarity on steps, requirements, and procedures. This was exceptional when communicating with teams that had deep cultural and language differences.',
            img: 'https://images.ctfassets.net/rz1oowkt5gyp/3X64fxSs4ek9A0ex45BUNI/911daed79127cb2f8a021da93fb68b9f/ptc-logo.svg'
        }
    ]

    const styleText = { 
        height: '40%',
        '&.MuiTypography-root.MuiTypography-body1': {
            fontSize: '1.6rem'
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

    const styleButton = {
        borderRadius: '50%',
        minWidth: '30px',
        width: '30px',
        height: '30px',
        bgcolor: 'rgba(239, 183, 184, 0.08)'
    }

    const hanldeActiveCard = (id) => () => {
        const scrollEl = scrollElRef.current

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
            handleScrollTo({ el: scrollEl, distance: 0 })
        } else if (id === 2) {
            handleScrollTo({ el: scrollEl, distance: scrollEl.clientWidth })
        } else {
            handleScrollTo({ el: scrollEl, distance: scrollEl.scrollWidth - scrollEl.clientWidth })
        }
    }

    const handleSetScrollLeft = (e) => {
        const condition = e.touches ? 60 : 300
        
        const getNextCardId = () => {
            if (prevPosition.scroll < condition) return prevPosition.id
            if (prevPosition.id === 1) return 2
            if (prevPosition.id === 3) return 2
            return isNegative ? 1 : 3
        }

        hanldeActiveCard(getNextCardId())()
    }

    const handleDown = (e) => {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX
        const clientY = e.touches ? e.touches[0].clientY : e.clientY

        let target = e.target

        // Dò ngược lên cha để tìm phần tử có data-id
        while (target && !target.dataset?.id) {
            target = target.parentElement
        }

        setIsDragging(true)
        setPrevPosition({
            id: Number(target.getAttribute('data-id')),
            left: Math.floor(e.currentTarget.scrollLeft),
            top: Math.floor(e.currentTarget.scrollTop),
            x: clientX,
            y: clientY,
            scroll: 0
        })
    }

    const handleMove = (e) => {
        if (!isDragging || !prevPosition) return
        const scrollEl = scrollElRef.current

        const clientX = e.touches ? e.touches[0].clientX : e.clientX
        const clientY = e.touches ? e.touches[0].clientY : e.clientY

        const prevScrollLeft = prevPosition.left
        const prevScrollTop = prevPosition.top
        
        const dx = prevPosition.x - clientX
        const dy = prevPosition.y - clientY

        if (Math.abs(dy) > Math.abs(dx)) {
            setIsDragging(false)
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

        scrollEl.scrollLeft = scrollLeft
        scrollEl.scrollTop = scrollTop
        
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

    const handleArrowForward = () => {
        if (cardActive['3']) return
        const elActive = Object.entries(cardActive).filter(([, value]) => value === true)
        hanldeActiveCard(Number(elActive[0][0]) + 1)()
    }

    const handleArrowBack = () => {
        if (cardActive['1']) return
        const elActive = Object.entries(cardActive).filter(([, value]) => value === true)
        hanldeActiveCard(Number(elActive[0][0]) -1)()
    }

    return (
        <Container>
            <Box sx={{ mt: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box 
                    sx={{ 
                        display: { xs: 'none', md: 'flex' },
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        textAlign: 'end',
                        flexDirection: 'row',
                        ml: 'auto',
                        mr: '48px'
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
    
                    <Box 
                        sx={{ 
                            display: { xs: 'none', md: 'flex' },
                            justifyContent: 'flex-end',
                            textAlign: 'end',
                            flexDirection: 'row',
                            ml: '12px',
                            gap: 2
                        }}>
                        <Button sx={styleButton} onClick={handleArrowBack}><ArrowBackIosNewOutlined/></Button>
                        <Button sx={styleButton} onClick={handleArrowForward}><ArrowForwardIosOutlined/></Button>
                    </Box>
                </Box>
    
                <Paper 
                    sx={{ 
                        overflow: 'hidden',
                        mt: '24px',
                        cursor:  isDragging ? 'grabbing' : 'grab',
                        width: '90%',
                        height: '100%',
                        borderRadius: '10px'
                    }}
                    elevation={4}>
                    <Box 
                        // style={{ touchAction: 'none', WebkitOverflowScrolling: 'auto' }}
                        sx={{ 
                            overflow: 'auto',
                            display: 'flex',
                            height: '100%',
                            flexDirection: 'row',
                            width: '100%',
                            gap: 2,
                            '&::-webkit-scrollbar': {
                                display: 'none'
                            }
                        }}
                        ref={scrollElRef}
                        onMouseMove={handleMove}
                        onMouseDown={handleDown}
                        onMouseUp={handleUp}
                        onMouseLeave={handleUp}
                    >
                        { card.map(card => (
                            <Box 
                                key={card.id} 
                                sx={{ width: '100%', flexShrink: 0, userSelect: 'none' }} 
                                data-id={card.id}
                            >
                                <Box 
                                    sx={{ 
                                        display: 'flex', 
                                        flexDirection: { xs: 'column', md: 'row' },
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        alignContent: 'space-around',
                                        height: { xs: '100%', sm: '100%', md: '450px' }
                                    }}>
                                    <Box 
                                        sx={{ 
                                            height: { xs: '70%', sm: '450px', md: '100%' }, 
                                            width: { xs: '100%', md: '70%' }, 
                                            p: { xs: '12px', sm: '28px' },
                                            justifyContent: 'space-between',
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}>
                                        <Typography 
                                            sx={{ ...styleText }}>
                                            {card.feedback}
                                        </Typography>
    
                                        <Box >
                                            <Divider sx={{ width: '40%', borderBottom: '2px solid', borderColor: 'black', mb: '32px', mt: { xs: '32px' } }}/>
    
                                            <Typography>
                                                {card.name}
                                            </Typography>
    
                                            <Typography>
                                                {card.jobTitle}
                                            </Typography>
    
                                            <Box 
                                                sx={{ 
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    alignItems: 'end',
                                                    justifyContent: 'space-between',
                                                    mt: { xs: '32px', sm: '0' }
                                                }}>
    
                                                <Box 
                                                    component={'img'} 
                                                    src={card.img} 
                                                    sx={{
                                                        width: '30%',
                                                        aspectRatio: '16 / 9'
                                                    }}>
                                                </Box>
    
                                                <Box 
                                                    component={Link} 
                                                    to={`/story/${card.id}`}
                                                    sx={{ color: theme => theme.trelloCustom.myColor }}
                                                >
                                                    Read the story
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
    
                                    <Box 
                                        sx={{ 
                                            width: { xs: '100%', md: '30%' },
                                            height: { xs: '30%', sm: '230px', md: '100%' },
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            flexWrap: 'wrap',
                                            p: { xs: '12px', sm: '28px' },
                                            borderBottomLeftRadius: { xs: '10px', md: 0 },
                                            borderBottomRightRadius: { xs: '10px', md: 0 },
                                            bgcolor: theme => theme.trelloCustom.myColor
                                        }}>
                                        <Typography 
                                            sx={{ ...styleText, color: 'white', mb: '30px' }}
                                        >
                                            {card.title}
                                        </Typography>
                                        
                                        <Box 
                                            component={Link} 
                                            to='/trello-techvalidate-survey' 
                                            sx={{ color: 'white' }}>
                                                Trello TechValidate Survey
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Paper>
    
                <Box 
                    sx={{ 
                        display: { xs: 'flex', md: 'none' },
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'end',
                        flexDirection: 'row'
                    }}
                >
                    <Box 
                        sx={{ 
                            display: { xs: 'flex', md: 'none' },
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'end',
                            flexDirection: 'row',
                            mt: '24px',
                            gap: 2
                        }}>
                        <Button sx={styleButton} onClick={handleArrowBack}><ArrowBackIosNewOutlined/></Button>
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
                        <Button sx={styleButton} onClick={handleArrowForward}><ArrowForwardIosOutlined/></Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}