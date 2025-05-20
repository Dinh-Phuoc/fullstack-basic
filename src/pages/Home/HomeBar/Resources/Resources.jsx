import { BoltOutlined, IntegrationInstructionsOutlined, LibraryBooksOutlined, Mail, PowerOutlined, ScheduleOutlined } from '@mui/icons-material'
import { Box, Button, Divider, keyframes, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Resources({ handleClose, openResourcesMenu }) {
    const fadeIn = keyframes`
        from {
            opacity: 0;
            transform: scaleY(0);
            visibility: hidden,
        } 
        to {
            opacity: 1;
            transform: scaleY(1);
            visibility: visible
        }
    `

    const fadeOut = keyframes`
        from {
            opacity: 1;
            transform: scaleY(1);
            visibility: visible
        } 
        to {
            opacity: 0;
            transform: scaleY(0);
            visibility: hidden,
        }
    `

    return (
        <Box sx={{
            backgroundColor: '#9d9d9d38',
            zIndex: 1,
            position: 'fixed',
            left: 0,
            right: 0,
            top: '58px',
            visibility: openResourcesMenu ? 'visible' : 'hidden',
            animation: 'visibility 0.2s ease forwards',
            transformOrigin: 'top',
            bottom: 0
        }}
        onClick={handleClose}
        >
            <Box 
                sx={{ 
                    width: '100%', 
                    zIndex: 1,
                    position: 'fixed',
                    left: 0,
                    right: 0,
                    top: '58px',
                    backgroundColor: 'white',
                    display: 'flex',
                    animation: openResourcesMenu ? `${fadeIn} 0.2s ease forwards` : `${fadeOut} 0.2s ease forwards`,
                    transformOrigin: 'top'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <Box 
                    sx={{
                        width: '80%',
                        padding: '24px'
                    }}
                >
                    <Typography 
                        variant='h6' 
                        sx={{ 
                            fontSize: '1.2rem', 
                            color: 'rgb(80, 95, 121)',
                            mb: '12px'
                        }}
                    >
                        Take a page out of these pre-built Trello playbooks designed for all teams
                    </Typography>

                    <Divider/>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        {/* Inbox  */}
                        <Box 
                            component={Link}
                            className='inboxLink'
                            to='/features/inbox'
                            sx={{
                                textDecoration: 'none',
                                color: 'rgb(80, 95, 121)',
                                width: '210px',
                                padding: '16px',
                                display: 'block',
                                marginTop: '12px',
                                '&:hover': {
                                    backgroundColor: '#ff9a9c1a',
                                    transition: 'background-color 0.3s'
                                }
                            }}
                        >
                            <Typography 
                                variant='h6'
                                sx={{ fontSize: '1rem', display: 'flex', alignItems: 'center', mb: '8px' }}
                            >
                                <Mail sx={{ mr: '12px' }}/> Inbox 
                            </Typography>
                            <Typography
                                sx={{ 
                                    fontSize: '1rem', 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    textAlign: 'justify',
                                    mb: '8px' 
                                }}
                            >
                                Capture every vital detail from emails, Slack, and more directly into your Trello Inbox.
                            </Typography>
                        </Box>

                        {/* Planner  */}
                        <Box 
                            component={Link}
                            to='/features/planner'
                            sx={{
                                textDecoration: 'none',
                                color: 'rgb(80, 95, 121)',
                                width: '210px',
                                padding: '16px',
                                display: 'block',
                                marginTop: '12px',
                                '&:hover': {
                                    backgroundColor: '#ff9a9c1a',
                                    transition: 'background-color 0.3s'
                                }
                            }}
                        >
                            <Typography 
                                variant='h6'
                                sx={{ fontSize: '1rem', display: 'flex', alignItems: 'center', mb: '8px' }}
                            >
                                <ScheduleOutlined sx={{ mr: '12px' }}/> Planner 
                            </Typography>
                            <Typography
                                sx={{ 
                                    fontSize: '1rem', 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    textAlign: 'justify',
                                    mb: '8px' 
                                }}
                            >
                                Sync your calendar and allocate focused time slots to boost productivity.
                            </Typography>
                        </Box>

                        {/* Automation */}
                        <Box 
                            component={Link}
                            to='/features/automation'
                            sx={{
                                textDecoration: 'none',
                                color: 'rgb(80, 95, 121)',
                                width: '210px',
                                padding: '16px',
                                display: 'block',
                                marginTop: '12px',
                                '&:hover': {
                                    backgroundColor: '#ff9a9c1a',
                                    transition: 'background-color 0.3s'
                                }
                            }}
                        >
                            <Typography 
                                variant='h6'
                                sx={{ fontSize: '1rem', display: 'flex', alignItems: 'center', mb: '8px' }}
                            >
                                <BoltOutlined sx={{ mr: '12px' }}/> Automation 
                            </Typography>
                            <Typography
                                sx={{ 
                                    fontSize: '1rem', 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    textAlign: 'justify',
                                    mb: '8px' 
                                }}
                            >
                                Automate tasks and workflows with Butler automation.
                            </Typography>
                        </Box>

                        {/* Power-Ups */}
                        <Box 
                            component={Link}
                            to='/features/powerups'
                            sx={{
                                textDecoration: 'none',
                                color: 'rgb(80, 95, 121)',
                                width: '210px',
                                padding: '16px',
                                display: 'block',
                                marginTop: '12px',
                                '&:hover': {
                                    backgroundColor: '#ff9a9c1a',
                                    transition: 'background-color 0.3s'
                                }
                            }}
                        >
                            <Typography 
                                variant='h6'
                                sx={{ fontSize: '1rem', display: 'flex', alignItems: 'center', mb: '8px' }}
                            >
                                <PowerOutlined sx={{ mr: '12px' }}/> Power-Ups 
                            </Typography>
                            <Typography
                                sx={{ 
                                    fontSize: '1rem', 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    textAlign: 'justify',
                                    mb: '8px' 
                                }}
                            >
                                Power up your teams by linking their favorite tools with Trello plugins.
                            </Typography>
                        </Box>

                        {/* Templates */}
                        <Box 
                            component={Link}
                            to='/features/templates'
                            sx={{
                                textDecoration: 'none',
                                color: 'rgb(80, 95, 121)',
                                width: '210px',
                                padding: '16px',
                                display: 'block',
                                marginTop: '12px',
                                '&:hover': {
                                    backgroundColor: '#ff9a9c1a',
                                    transition: 'background-color 0.3s'
                                }
                            }}
                        >
                            <Typography 
                                variant='h6'
                                sx={{ fontSize: '1rem', display: 'flex', alignItems: 'center', mb: '8px' }}
                            >
                                <LibraryBooksOutlined sx={{ mr: '12px' }}/> Templates 
                            </Typography>
                            <Typography
                                sx={{ 
                                    fontSize: '1rem', 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    textAlign: 'justify',
                                    mb: '8px' 
                                }}
                            >
                                Give your team a blueprint for success with easy-to-use templates from industry leaders and the Trello community.
                            </Typography>
                        </Box>

                        {/* Integrations */}
                        <Box 
                            component={Link}
                            to='/features/integrations'
                            sx={{
                                textDecoration: 'none',
                                color: 'rgb(80, 95, 121)',
                                width: '210px',
                                padding: '16px',
                                display: 'block',
                                marginTop: '12px',
                                '&:hover': {
                                    backgroundColor: '#ff9a9c1a',
                                    transition: 'background-color 0.3s'
                                }
                            }}
                        >
                            <Typography 
                                variant='h6'
                                sx={{ fontSize: '1rem', display: 'flex', alignItems: 'center', mb: '8px' }}
                            >
                                <IntegrationInstructionsOutlined sx={{ mr: '12px' }}/> Integrations 
                            </Typography>
                            <Typography
                                sx={{ 
                                    fontSize: '1rem', 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    textAlign: 'justify',
                                    mb: '8px' 
                                }}
                            >
                                Find the apps your team is already using or discover new ways to get work done in Trello.
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Box
                    sx={{
                        width: '30%',
                        padding: '24px',
                        backgroundColor: '#ffe0e02b'
                    }}
                >
                    <Typography 
                        variant='h6' 
                        sx={{ 
                            fontSize: '1.2rem', 
                            color: 'rgb(80, 95, 121)',
                            mb: '12px'
                        }}
                    >
                        Our product in action
                    </Typography>
                    <Divider sx={{ borderColor: theme => theme.trelloCustom.myColor }}/>
                    <Typography
                        sx={{ 
                            fontSize: '1rem', 
                            display: 'flex', 
                            alignItems: 'center',
                            textAlign: 'justify',
                            color: 'rgb(80, 95, 121)',
                            marginY: '28px'
                        }}
                    >
                        Trello makes it easy for your team to get work done. No matter the project, workflow, or type of team, Trello can help keep things organized. It&apos;s simple - sign-up, create a board, and you&apos;re off! Productivity awaits.
                    </Typography>

                    <Button variant='outlined'>Check-out Trello</Button>
                </Box>
            </Box>
        </Box>
    )
}