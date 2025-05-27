import { Box, Button, Typography } from '@mui/material'

export default function MoreInfo() {
    const cards = [
        {
            id: 1,
            img: 'https://images.ctfassets.net/rz1oowkt5gyp/gMfkjoA3yWYG3kat3qjpW/1935c0e535bc27c820c13c1a1e02b4ed/Integration.svg',
            title: 'Integrations',
            desc: 'Connect the apps you are already using into your Trello workflow or add a Power-Up to fine-tune your specific needs.',
            button: 'Browse Integrations'
        },
        {
            id: 2,
            img: 'https://images.ctfassets.net/rz1oowkt5gyp/7wxRW93hvb7858bMsK4LSs/336a6acc2c9a7a515a37bd895b98d4f6/Autodev.svg',
            title: 'Butler Automation',
            desc: 'No-code automation is built into every Trello board. Focus on the work that matters most and let the robots do the rest.',
            button: 'Get to know Automation'
        },
        {
            id: 3,
            img: 'https://images.ctfassets.net/rz1oowkt5gyp/2QHMr8zhoP0jlvvXC8k2am/0f2a100621210cc76e0298bd07bbc0ca/Project_management.svg',
            title: 'Card mirroring',
            desc: 'View all your to-dos from multiple boards in one place. Mirror a card to keep track of work wherever you need it!',
            button: 'Compare plans'
        }
    ]

    const styleImage = {
        width: '30%',
        aspectRatio: '16 / 9'
    }
    return (
        <Box sx={{ textAlign: 'center', marginX: { xs: '12px', md: '48px' } }}>
            <Box sx={{ height: '228px' }}></Box>
            <Box sx={{ mb: '24px', width: '100%', p: '18px', textAlign: 'start' }}>
                <Typography sx={{ mb: '12px' }}>WORK SMARTER</Typography>
                <Typography variant='h4' sx={{ mb: '12px', fontWeight: 500 }}>Do more with Trello</Typography>
                <Typography 
                    sx={{
                        '&.MuiTypography-root.MuiTypography-body1': {
                            fontSize: '1.2rem'
                        }
                    }}
                >
                    Customize the way you organize with easy integrations, automation, and mirroring of your to-dos across multiple locations.
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'space-between' }}>
                {cards.map(card => (
                    <Box 
                        key={card.id}
                        sx={{ 
                            p: '24px',
                            display: 'flex',
                            width: { xs: '100%', sm: '30%' },
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            bgcolor: '#efb7b814',
                            borderRadius: '10px',
                            justifyContent: 'space-between',
                            textAlign: 'start',
                            gap: 2
                        }}
                    >
                        <Box
                            component={'img'}
                            src={card.img}
                            sx={styleImage}
                        >
                        </Box>

                        <Typography variant='h6'>{card.title}</Typography>
                        <Typography>{card.desc}</Typography>
                        <Button variant='outlined' sx={{ }}>{card.button}</Button>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}