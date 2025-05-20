import { useRef, useState } from 'react'

import SvgIcon from '@mui/material/SvgIcon'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { MenuRounded } from '@mui/icons-material'
import { Menu, MenuItem } from '@mui/material'

import { ReactComponent as TrelloIcon } from '~/assets/trelloIcon.svg'
import HomeMenu from './HomeMenu/HomeMenu'
import { Link } from 'react-router-dom'

export default function HomeBar() {
    const [anchorEl, setAnchorEl] = useState(null)
    const navbarRef = useRef()
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
  
    return ( 
        <Box 
            sx={{
                position: 'relative',
                width: '100%',
                height: (theme) => theme.trelloCustom.appBarHeight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                paddingX: 2,
                overflowX: 'auto',
                bgcolor: (theme) => (theme.palette.primary.main) 
            }}
            ref={navbarRef}
        >
            <Box sx={{ display: 'flex', alignContent: 'center', gap: 1 }}>
                <MenuRounded 
                    onClick={handleClick} 
                    fontSize='large' 
                    sx={{ 
                        color: theme => theme.palette.mode === 'dark' ? theme.trelloCustom.myColor : 'white', 
                        display: { xs: 'block', md: 'none' } 
                    }}
                />
                <Menu
                    id="basic-menu-workspaces"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button-workspaces'
                    }}
                >
                    <MenuItem>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Features
                        </Typography>
                    </MenuItem>
    
                    <MenuItem>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Plans
                        </Typography>
                    </MenuItem>

                    <MenuItem>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Pricing
                        </Typography>
                    </MenuItem>

                    <MenuItem>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Resources
                        </Typography>
                    </MenuItem>
                </Menu>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <SvgIcon 
                        component={TrelloIcon} 
                        fontSize='large' 
                        inheritViewBox 
                        sx={{ color: (theme) => theme.palette.mode === 'dark' ? '#ff9a9cc4' : 'white' }}
                    />
                    <Typography variant='span' 
                        sx={{ 
                            display: { xs: 'none', sm: 'block' }, 
                            fontSize: '1.1rem', 
                            fontWeight: 'bold', 
                            minWidth: '80px', 
                            color: (theme) => theme.palette.mode === 'dark' ? '#ff9a9cc4' : 'white' 
                        }}
                    >
                        Sariii nè!
                    </Typography>
                </Box>
                
            </Box>

            <HomeMenu/>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Link 
                    to='/auth' 
                    style={{ 
                        textDecoration: 'none', 
                        color: 'white', 
                        alignContent: 'center',
                        fontWeight: 600 
                    }}
                > 
                    Login 
                </Link>
            </Box>
        </Box>

    )
}
