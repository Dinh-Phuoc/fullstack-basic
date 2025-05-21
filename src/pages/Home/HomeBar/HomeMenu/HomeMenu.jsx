import { KeyboardArrowDownOutlined } from '@mui/icons-material'
import { Box, Button } from '@mui/material'
import { useState } from 'react'
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
    const toggleOpenMenu = (e) => {
        const name = e.currentTarget.name
        setOpen(prev => ({
            features: false,
            plans: false,
            resources: false,
            solution: false,
            [name]: !prev[name]
        }))
        setActivetab(name ? name : null)
    }
    const handleClose = () => {
        setOpen({
            features: false,
            plans: false,
            resources: false,
            solution: false,
            [activetab]: false
        })
        const timer = setTimeout(() => {
            setActivetab(null)
        }, 200)

        clearTimeout(timer)
    }

    return (
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box sx={{ display: 'flex', alignContent: 'center' }}>
                <Button sx={{ color: theme => theme.trelloCustom.myColor }} name={'features'} onClick={toggleOpenMenu}>Features<KeyboardArrowDownOutlined/></Button>
                <Button sx={{ color: theme => theme.trelloCustom.myColor }} name={'solutions'} onClick={toggleOpenMenu}>Solutions<KeyboardArrowDownOutlined/></Button>
                <Button sx={{ color: theme => theme.trelloCustom.myColor }} name={'plans'} onClick={toggleOpenMenu}>Plans<KeyboardArrowDownOutlined/></Button>
                <Button sx={{ color: theme => theme.trelloCustom.myColor }} name={'resources'} onClick={toggleOpenMenu}>Resources<KeyboardArrowDownOutlined/></Button>
                <Box 
                    component={Link} 
                    to='/pricing' 
                    sx={{ 
                        textDecoration: 'none', 
                        color: theme => theme.trelloCustom.myColor, 
                        alignContent: 'center' 
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