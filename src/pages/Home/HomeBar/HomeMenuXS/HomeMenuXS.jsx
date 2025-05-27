import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import FeaturesXS from './FeaturesXS/FeaturesXS'
import SolutionsXS from './SolutionsXS/SolutionsXS'
import PlansXS from './PlansXS/PlansXS'
import ResourcesXS from './ResourcesXS/ResourcesXS'
import { Divider } from '@mui/material'
export default function HomeMenuXS() {
    const [openDrawerMenu, setOpenDrawerMenu] = useState(false)

    const toggleDrawer = () => {
        setOpenDrawerMenu(!openDrawerMenu)
    }

    const barStyle = {
        width: '35px',
        height: '4px',
        backgroundColor: theme => theme.trelloCustom.myColor,
        margin: '6px 0',
        transition: '0.4s'
    }
    return (
        <>
            <Button
                onClick={toggleDrawer} 
                fontSize='large' 
                sx={{ 
                    color: theme => theme.trelloCustom.myColor, 
                    display: { xs: 'block', md: 'none' },
                    cursor: 'pointer',
                    ml: 'auto',
                    mr: '12px',
                    minWidth: '35px',
                    padding: '0',
                    height: '35px',
                    '&:hover': {
                        bgcolor: 'white'
                    },
                    '& .bar1': {
                        transform: openDrawerMenu ? 'translate(0, 11px) rotate(-45deg)' : 'none'
                    },
                    '& .bar2': {
                        opacity: openDrawerMenu ? 0 : 1
                    },
                    '& .bar3': {
                        transform: openDrawerMenu ? 'translate(0, -11px) rotate(45deg)' : 'none'
                    }
                }}
            >
                <Box sx={barStyle} className={'bar1'}></Box>
                <Box sx={barStyle} className={'bar2'}></Box>
                <Box sx={barStyle} className={'bar3'}></Box>
            </Button>

            <Drawer
                anchor='right'
                open={openDrawerMenu}
                onClose={toggleDrawer}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    top: '58px',
                    width: { xs: '100%', sm: '400px' },
                    '& .MuiBackdrop-root.MuiModal-backdrop': {
                        top: '58px'
                    },
                    '& .MuiPaper-root.MuiDrawer-paper': {
                        top: '58px',
                        width: { xs: '100%', sm: '400px' },
                        boxShadow: 'none'
                    }
                }}
            >
                <List
                    sx={{ width: { xs: '100%', sm: '400px' }, bgcolor: 'background.paper' }}
                    component="nav"
                >
                    <FeaturesXS/>
                    <SolutionsXS/>
                    <PlansXS/>
                    <ResourcesXS/>

                    <ListItemButton 
                        component={Link} 
                        to='/pricing'
                        sx={{ 
                            color: '#f0777acc', 
                            '& .MuiListItemText-root .MuiTypography-root.MuiTypography-body1': { 
                                fontWeight: 600,
                                fontSize: '1rem'
                            } 
                        }}
                    >
                        <ListItemText 
                            primary="Pricing" 
                        />
                    </ListItemButton>
                    <Divider/>
                    <Box
                        component={Link} 
                        to='/auth' 
                        sx={{ 
                            textDecoration: 'none', 
                            width: '90%',
                            m: '12px auto 0',
                            fontWeight: 600,
                            height: '50px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignContent: 'center',
                            color: 'white',
                            bgcolor: (theme) => theme.trelloCustom.myColor,
                            '&:hover': {
                                bgcolor: '#f0777acc'
                            } 
                        }}  
                    >
                        <Typography 
                            sx={{ 
                                height: '50px', 
                                lineHeight: '50px', 
                                fontWeight: 600,
                                '&.MuiTypography-root.MuiTypography-body1': {
                                    fontSize: '1.1rem'
                                }
                            }}
                        >Login</Typography>
                    </Box>
                </List>
            </Drawer>
        </>
       
    )
}