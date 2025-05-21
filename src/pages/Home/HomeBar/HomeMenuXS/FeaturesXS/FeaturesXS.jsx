import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import BoltOutlined from '@mui/icons-material/BoltOutlined'
import IntegrationInstructionsOutlined from '@mui/icons-material/IntegrationInstructionsOutlined'
import LibraryBooksOutlined from '@mui/icons-material/LibraryBooksOutlined'
import Mail from '@mui/icons-material/Mail'
import PowerOutlined from '@mui/icons-material/PowerOutlined'
import ScheduleOutlined from '@mui/icons-material/ScheduleOutlined'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, Divider, ListSubheader, Typography } from '@mui/material'
import { ArrowForwardIosOutlined } from '@mui/icons-material'

export default function FeaturesXS() {
    const [open, setOpen] = useState(false)
    const handleClick = () => {
        setOpen(!open)
    }

    const menuListItem = [
        {
            icon: <Mail/>,
            title: 'Inbox',
            path: '/features/inbox',
            desc: 'Capture every vital detail from emails, Slack, and more directly into your Trello Inbox.'
        },
        {
            icon: <ScheduleOutlined/>,
            title: 'Planner',
            path: '/features/planner',
            desc: 'Sync your calendar and allocate focused time slots to boost productivity.'
        },
        {
            icon: <BoltOutlined/>,
            title: 'Automation',
            path: '/features/automation',
            desc: 'Automate tasks and workflows with Butler automation.'
        },
        {
            icon: <PowerOutlined/>,
            title: 'Power-Ups',
            path: '/features/powerups',
            desc: 'Power up your teams by linking their favorite tools with Trello plugins.'
        },
        {
            icon: <LibraryBooksOutlined/>,
            title: 'Templates',
            path: '/features/templates',
            desc: 'Give your team a blueprint for success with easy-to-use templates from industry leaders and the Trello community.'
        },
        {
            icon: <IntegrationInstructionsOutlined/>,
            title: 'Integrations',
            path: '/features/integrations',
            desc: 'Find the apps your team is already using or discover new ways to get work done in Trello.'
        }
    ]

    return (
        <>
            <ListItemButton onClick={handleClick}>
                <ListItemText primary="Features" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Divider/>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List 
                    component="div" 
                    disablePadding
                    subheader={
                        <ListSubheader sx={{ pl: '32px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxHeight: '48px', fontWeight: 500 }} component="div" id="nested-list-subheader">
                            Explore the features that help your team succeed
                        </ListSubheader>
                    }
                >
                    <Divider/>

                    {menuListItem.map((item, index) => (
                        <React.Fragment key={index}>
                            <ListItemButton component={Link} to={`${item.path}`} sx={{ display: 'flex', pl: 4 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', pr: '12px' }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <ListItemIcon sx={{ minWidth: '35px' }}>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={`${item.title}`} />
                                    </Box>
                                    <Typography
                                        sx={{
                                            width: '100%',
                                            '&.MuiTypography-root.MuiTypography-body1': {
                                                fontSize: '0.75rem'
                                            }
                                        }}
                                    >
                                        {item.desc}
                                    </Typography>
                                </Box>
                                <ArrowForwardIosOutlined sx={{ ml: 'auto', color: '#757575' }} />
                            </ListItemButton>
                            <Divider />
                        </React.Fragment>
                    ))}
                    <Box
                        sx={{
                            padding: '12px',
                            m: '12px',
                            borderRadius: '10px',
                            backgroundColor: '#ffe0e02b'
                        }}
                    >
                        <Typography 
                            variant='h6' 
                            sx={{ 
                                fontSize: '1.2rem', 
                                color: 'rgb(80, 95, 121)',
                                mb: '6px'
                            }}
                        >
                            Meet Trello
                        </Typography>
                        <Divider sx={{ borderColor: theme => theme.trelloCustom.myColor }}/>
                        <Typography
                            sx={{ 
                                fontSize: '1rem', 
                                display: 'flex', 
                                alignItems: 'center',
                                textAlign: 'justify',
                                color: 'rgb(80, 95, 121)',
                                marginY: '12px'
                            }}
                        >
                            Trello makes it easy for your team to get work done. No matter the project, workflow, or type of team, Trello can help keep things organized. It&apos;s simple - sign-up, create a board, and you&apos;re off! Productivity awaits.
                        </Typography>

                        <Button variant='outlined'>Check-out Trello</Button>
                    </Box>
                </List>
            </Collapse>
        </>
    )
}