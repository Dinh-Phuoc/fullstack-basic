import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { CalendarIcon, FairyIcon } from '~/assets/icon'

export default function Convenience() {
    const styleBox = { 
        width: { xs: '90%', md: '90%' }, 
        display: 'flex', 
        flexWrap: 'wrap',
        padding: { xs: '12px', md: '32px' },
        bgcolor: 'white',
        borderRadius: '10px',
        mb: '24px'
    }

    const styleBoxDiscription = {
        container: { 
            width: { xs: '100%', md: '50%' }, 
            p: { xs: '16px', sm: '32px', md: '0 0 0 32px' },
            mt: { xs: '32px', md: 0 }
        },
        title: { 
            display: 'flex',
            alignItems: 'center',
            fontWeight: 600,
            '&.MuiTypography-body1': {
                fontSize: '1.3rem' 
            }
        },
        desc: {
            '&.MuiTypography-body1': {
                fontSize: '1.5rem'
            } 
        }
    }

    const styleImage = {
        width: { xs: '100%', md: '50%' },
        aspectRatio: '16 / 9'
    }

    const styleIcon = { width: '1.6rem', height: '1.6rem', color: '#ff9a9cc4', marginRight: '8px' }
    return (
        <Box 
            sx={{ 
                width: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                bgcolor: theme => theme.trelloCustom.myColor

            }}>
            <Box 
                sx={{ 
                    width: { xs: '80%', md: '70%' }, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    padding: { xs: '24px 0', md: '32px 48px 32px 48px' },
                    color: 'white',
                    textAlign: 'center'
                }}>
                <Typography variant='h6' sx={{ fontWeight: '600', fontSize: '2rem' }}>From message to action</Typography>
                <Typography 
                    sx={{ 
                        textAlign: 'center', 
                        '&.MuiTypography-body1': {
                            fontSize: '1.5rem'
                        }
                    }}>
                    Quickly turn communication from your favorite apps into to-dos, keeping all your discussions and tasks organized in one place.
                </Typography>
            </Box>
            
            {/* Email Box */}
            <Box 
                sx={styleBox}>
                <Box 
                    component='img'
                    sx={styleImage} 
                    src="https://images.ctfassets.net/rz1oowkt5gyp/2QvggeQ9nzUdaDnhJCSUwA/3ef97067e1aa3d0a5e6a04b5780fd751/email-todos.png?w=1110&fm=webp" alt="" 
                />
                <Box 
                    sx={styleBoxDiscription.container}>
                    <Typography 
                        sx={styleBoxDiscription.title}>
                        <FairyIcon style={styleIcon}/>
                        EMAIL MAGIC
                    </Typography>

                    <Typography
                        sx={styleBoxDiscription.desc}>
                        Easily turn your emails into to-dos! Just forward them to your Trello Inbox, and they&apos;ll be transformed by Atlassian Intelligence (AI) into organized to-dos with all the links you need.                  
                    </Typography>
                </Box>
            </Box>
            
            {/* Message Box */}
            <Box 
                sx={{ 
                    ...styleBox,
                    mb: '-128px',
                    boxShadow: 'rgba(9, 30, 66, 0.15) 0px 0.5rem 1rem 0px'
                }}>
                <Box 
                    component={'img'} 
                    sx={{ ...styleImage, display: { xs: 'block', md: 'none' } }} 
                    src="https://images.ctfassets.net/rz1oowkt5gyp/3r1BvsfEsj4THe6YwpBOVy/2b1befa1e5e3522a2b0daae0dd3f3de0/slackteams-to-inbox.png?w=1110&fm=webp" alt="" />
                <Box 
                    sx={{ ...styleBoxDiscription.container, pl: 0, pr:'32px' }}>
                    <Typography sx={styleBoxDiscription.title}>
                        <CalendarIcon style={{ ...styleIcon, width: '3.6rem', height: '3.6rem' }}/>
                        MESSAGE APP SORCERY
                    </Typography>
                    
                    <Typography sx={styleBoxDiscription.desc}>
                        Need to follow up on a message from Slack or Microsoft Teams? Send it directly to your Trello board! Your favorite app interface lets you save messages that appear in your Trello Inbox with AI-generated summaries and links.
                    </Typography>
                </Box>
                <Box 
                    component={'img'} 
                    sx={{ ...styleImage, display: { xs: 'none', md: 'block' } }} 
                    src="https://images.ctfassets.net/rz1oowkt5gyp/3r1BvsfEsj4THe6YwpBOVy/2b1befa1e5e3522a2b0daae0dd3f3de0/slackteams-to-inbox.png?w=1110&fm=webp" alt="" />
            </Box>
        </Box>
    )
}