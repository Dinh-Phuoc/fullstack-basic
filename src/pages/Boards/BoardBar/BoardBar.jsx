import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock' 
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import { ListItemIcon, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import Button from '@mui/material/Button'

import capitalizeFirstLetter from '~/utils/formatter.js'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { userSelector } from '~/redux/selector'

const MENU_STYLES = { 
    color: (theme) => theme.palette.mode === 'dark' ? '#ff9a9cc4' : 'white', 
    bgcolor: 'transparent', 
    border: 'none',
    width: '85px',
    borderRadius: '4px',
    '.MuiSvgIcon-root': {
        color: (theme) => theme.palette.mode === 'dark' ? '#ff9a9cc4' : 'white'
    },
    '&.MuiChip-label': {
        textOverflow: 'ellipsis'
    }
}

export default function BoardBar({ board }) {
    const { user } = useSelector(userSelector)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    return (
        <Box sx={{
            width: '100%',
            height: (theme) => theme.trelloCustom.boardBarHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
            paddingX: 1,
            overflowX: 'auto',
            bgcolor: (theme) => (theme.palette.primary.main),
            overflow: 'overlay'
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip 
                    onClick={handleClick}
                    sx={MENU_STYLES}
                    icon={<DashboardIcon />} 
                    label={board?.title}
                    clickable
                />
                <Menu
                    anchorEl={anchorEl}
                    id="boardbarmenu"
                    open={open}
                    onClose={handleClose}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    sx={{ display: { md: 'none' } }}
                >
                    <MenuItem>
                        <ListItemIcon>
                            <VpnLockIcon fontSize='small'/>
                        </ListItemIcon>
                        Công khai
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <AddToDriveIcon fontSize='small'/>      
                        </ListItemIcon>
                        Tải lên Google Drive
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <BoltIcon fontSize='small'/> 
                        </ListItemIcon>
                        Tự động
                    </MenuItem>
                </Menu>

                <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
                    <Chip 
                        sx={MENU_STYLES}
                        icon={<VpnLockIcon />} 
                        label={capitalizeFirstLetter(board?.type)}
                        clickable
                    />
                    <Chip 
                        sx={MENU_STYLES}
                        icon={<AddToDriveIcon />} 
                        label='Tải lên Google Drive'
                        clickable
                    />
                    <Chip 
                        sx={MENU_STYLES}
                        icon={<BoltIcon />} 
                        label='Tự động'
                        clickable
                    />
                </Box>
                <Chip 
                    sx={MENU_STYLES}
                    icon={<FilterListIcon />} 
                    label='Lọc thẻ'
                    clickable
                />
            </Box>

            <Box sx={{ display: user ? 'flex' : 'none', alignItems: 'center', gap: 1 }}>
                <Button 
                    variant='outlined' 
                    startIcon={<PersonAddIcon/>}
                    sx={{ 
                        display: { xs: 'none', sm: 'flex', md: 'flex' },
                        color:(theme) => theme.palette.mode === 'dark' ? '#ff9a9cc4' : 'white', 
                        borderColor:(theme) => theme.palette.mode === 'dark' ? '#ff9a9cc4' : 'white',
                        '&:hover': {
                            borderColor:(theme) => theme.palette.mode === 'dark' ? '#ff9a9cc4' : 'white'
                        } 
                    }}
                >
                    <Typography variant='body1' >Mời bạn</Typography>
                </Button>
                <Box 
                    sx={{ 
                        display: { xs: 'block', sm: 'none', md: 'none' },
                        position: 'relative',
                        width:  '28px',
                        height:  '28px',
                        padding:  '0',
                        border: '1px solid',
                        borderColor:(theme) => theme.palette.mode === 'dark' ? '#ff9a9cc4' : 'white',
                        borderRadius: '50%'
                    }}>
                    <PersonAddIcon sx={{ 
                        position: 'absolute',
                        top: '50%',
                        left: '45%',
                        color:(theme) => theme.palette.mode === 'dark' ? '#ff9a9cc4' : 'white',
                        transform: 'translate(-50%, -50%)' }}
                    />
                </Box>
                <AvatarGroup 
                    max={3} 
                    sx={{
                        '& .MuiAvatar-root': {
                            width: '28px', 
                            height: '28px',
                            fontSize: 16,
                            border: '1px solid white',
                            color: 'white',
                            cursor: 'pointer',
                            display: user ? 'flex' : 'none',
                            '&:first-of-type': {
                                bgcolor: '#a4b0be'
                            }
                        }
                    }}
                >
                    <Tooltip title='Non sông Việt Nam' >
                        <Avatar 
                            alt="Non sông Việt Nam"
                            src='https://images.unsplash.com/photo-1603269414002-7f3d2acd0409?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmlldG5hbSUyMG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D' 
                        /> 
                    </Tooltip>
                    <Tooltip title='Non sông Việt Nam' >
                        <Avatar 
                            alt="Non sông Việt Nam"
                            src='https://images.unsplash.com/photo-1603269414002-7f3d2acd0409?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmlldG5hbSUyMG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D' 
                        /> 
                    </Tooltip>
                    <Tooltip title='Non sông Việt Nam' >
                        <Avatar 
                            alt="Non sông Việt Nam" 
                            src='https://images.unsplash.com/photo-1603269414002-7f3d2acd0409?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmlldG5hbSUyMG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D'
                        /> 
                    </Tooltip>
                    <Tooltip title='Non sông Việt Nam' >
                        <Avatar 
                            alt="Non sông Việt Nam" 
                            src='https://images.unsplash.com/photo-1603269414002-7f3d2acd0409?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmlldG5hbSUyMG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D'
                        /> 
                    </Tooltip>
                    <Tooltip title='Non sông Việt Nam' >
                        <Avatar 
                            alt="Non sông Việt Nam" 
                            src='https://images.unsplash.com/photo-1603269414002-7f3d2acd0409?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmlldG5hbSUyMG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D'
                        /> 
                    </Tooltip>
                </AvatarGroup>
            </Box>
        </Box>
    )
}