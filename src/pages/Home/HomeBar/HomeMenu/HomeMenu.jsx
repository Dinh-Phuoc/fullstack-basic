import { KeyboardArrowDownOutlined } from '@mui/icons-material'
import { Box, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import Features from './Features/Features'
import Solutions from './Solutions/Solutions'
import Plans from './Plans/Plans'
import Resources from './Resources/Resources'
import { Link } from 'react-router-dom'

export default function HomeMenu() {
    const [activetab, setActivetab] = useState(null)
    const [open, setOpen] = useState({ 
        features: false, 
        plans: false, 
        resources: false, 
        solutions: false
    })
    useEffect(() => {

    }, [])
    const toggleOpenMenu = (e) => {
        const name = e.currentTarget.name
        setOpen(prev => ({
            features: false,
            plans: false,
            resources: false,
            solutions: false,
            [name]: !prev[name]
        }))
        setActivetab(name || null)
    }
    const handleClose = () => {
        setOpen({
            features: false,
            plans: false,
            resources: false,
            solutions: false,
            [activetab]: false
        })
        setTimeout(() => {
            setActivetab(null)
        }, 200)
    }

    const styleNavBar = {
        color: theme => theme.trelloCustom.myColor,
        '&:after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            transition: 'width 0.3s',
            borderBottom: '2px solid #ffb1b3',
            left: '50%',
            transform: 'translateX(-50%)'
        },
        '&:hover:after': {
            width: '100%'
        }
    }

    return (
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box sx={{ display: 'flex', alignContent: 'center' }}>
                <Button 
                    sx={{ 
                        ...styleNavBar,
                        '&:after': { ...styleNavBar['&:after'], width: open.features ? '100%' : '0' }
                    }} 
                    name={'features'} 
                    onClick={toggleOpenMenu}
                > 
                    Features
                    <KeyboardArrowDownOutlined/>
                </Button>
                <Button 
                    sx={{ 
                        ...styleNavBar,
                        '&:after': { ...styleNavBar['&:after'], width: open.solutions ? '100%' : '0' }
                    }} 
                    name={'solutions'} 
                    onClick={toggleOpenMenu}
                > 
                    Solutions
                    <KeyboardArrowDownOutlined/>
                </Button>
                <Button 
                    sx={{ 
                        ...styleNavBar,
                        '&:after': { ...styleNavBar['&:after'], width: open.plans ? '100%' : '0' }
                    }} 
                    name={'plans'} 
                    onClick={toggleOpenMenu}
                > 
                    Plans
                    <KeyboardArrowDownOutlined/>
                </Button>
                <Button 
                    sx={{ 
                        ...styleNavBar,
                        '&:after': { ...styleNavBar['&:after'], width: open.resources ? '100%' : '0' }
                    }} 
                    name={'resources'} 
                    onClick={toggleOpenMenu}
                > 
                    Resources
                    <KeyboardArrowDownOutlined/>
                </Button>
                <Box 
                    component={Link} 
                    to='#' 
                    sx={{ 
                        textDecoration: 'none', 
                        position: 'relative',
                        ml: '8px',
                        color: theme => theme.trelloCustom.myColor, 
                        alignContent: 'center',
                        '&:after': {
                            content: '""',
                            position: 'absolute',
                            bottom: 0,
                            width: '0',
                            transition: 'width 0.3s',
                            borderBottom: '2px solid #ffb1b3',
                            left: '50%',
                            transform: 'translateX(-50%)'
                        },
                        '&:hover:after': {
                            width: '100%'
                        }
                    }}
                >
                    Pricing
                </Box>
            </Box>
            <Box>
                {(activetab === 'features' || open.features) && 
                <Features 
                    handleClose={handleClose}
                    openFeaturesMenu={open.features}
                />}

                {(activetab === 'solutions' || open.solutions) && 
                <Solutions 
                    handleClose={handleClose}
                    openSolutionsMenu={open.solutions}
                />}

                {(activetab === 'plans' || open.plans) && 
                <Plans 
                    handleClose={handleClose}
                    openPlansMenu={open.plans}
                />}

                {(activetab === 'resources' || open.resources) && 
                <Resources 
                    handleClose={handleClose}
                    openResourcesMenu={open.resources}
                />}

            </Box>
        </Box>
    )
}