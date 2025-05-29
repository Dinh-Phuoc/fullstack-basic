import { useState } from 'react'
import MenuRounded from '@mui/icons-material/MenuRounded'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import SvgIcon from '@mui/material/SvgIcon'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'


import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import Typography from '@mui/material/Typography'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'
import InputAdornment from '@mui/material/InputAdornment'

import { ModeSelect } from '~/components/ModeSelect'
import { ReactComponent as TrelloIcon } from '~/assets/trelloIcon.svg'
import Workspaces from './Menus/Workpages'
import Recent from './Menus/Recent'
import Profiles from './Menus/ProfilesMenu'


export default function AppBar() {
    const [searchValue, setSearchValue] = useState('')

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
            height: (theme) => theme.trelloCustom.appBarHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            paddingX: 2,
            overflowX: 'auto',
            bgcolor: (theme) => (theme.palette.primary.main) 
        }}>
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
                            Workspace
                        </Typography>
                    </MenuItem>
    
                    <MenuItem>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Gần đây
                        </Typography>
                    </MenuItem>
                </Menu>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <SvgIcon component={TrelloIcon} fontSize='large' inheritViewBox sx={{ color: (theme) => theme.palette.mode === 'dark' ? '#ff9a9cc4' : 'white' }}/>
                    <Typography variant='span' sx={{ display: { xs: 'none', sm: 'block' }, fontSize: '1.1rem', fontWeight: 'bold', minWidth: '80px', color: (theme) => theme.palette.mode === 'dark' ? '#ff9a9cc4' : 'white' }}>Sariii nè!</Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, height: '100%', alignContent:'center' }}>
                    <Workspaces />
                    <Recent />
                    <Button 
                        variant='outlined' 
                        startIcon={<LibraryAddIcon/>} 
                        sx={{ 
                            dislay: 'flex', 
                            alignContent: 'center',
                            color: (theme) => theme.palette.mode === 'dark' ? '#ff9a9cc4' : 'white',
                            border: '1px solid',
                            borderColor: (theme) => theme.palette.mode === 'dark' ? '#ff9a9cc4' : 'white',
                            p: '6px 0 6px 3px',
                            height: '100%',
                            '& .MuiButton-startIcon': {
                                ml: 0,
                                mr: '3px'
                            }
                        }}
                    >
                        <Typography sx={{ mr: '4px', height: '100%' }}>Tạo mới</Typography>
                    </Button>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField 
                    id='outlined-search' 
                    type='text' 
                    label='Tìm kiếm' 
                    size='small'
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: (theme) => theme.palette.mode === 'dark' ? '#ff9a9cc4' : 'white' }}/>
                            </InputAdornment>
                        ),
                        endAdornment: searchValue ? (
                            <CloseIcon 
                                onClick = {() => setSearchValue('')}
                                fontSize="small"
                                sx={{ 
                                    color: (theme) => theme.palette.mode === 'dark' ? '#ff9a9cc4' : 'white',
                                    cursor: 'pointer'
                                }}
                            />
                        ) : null
                    }} 
                    sx={{ 
                        display: { xs: 'none', md: 'flex' },
                        minWidth: '120px',
                        maxWidth: '180px',
                        '& label': { color: (theme) => theme.palette.mode === 'dark' ? '#ff9a9cc4' : 'white' }, 
                        '& input': { color: (theme) => theme.palette.mode === 'dark' ? '#ff9a9cc4' : 'white' },
                        '& label.Mui-focused': { color: (theme) => theme.palette.mode === 'dark' ? '#ff9a9cc4' : 'white' },
                        '.MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: (theme) => theme.palette.mode === 'dark' ? '#ff9a9cc4' : 'white' },
                            '&:hover fieldset': { borderColor: (theme) => theme.palette.mode === 'dark' ? '#ff9a9cc4' : 'white' },
                            '&.Mui-focused fieldset': { borderColor: (theme) => theme.palette.mode === 'dark' ? '#ff9a9cc4' : 'white' }
                        } 
                    }}
                />

                <SearchIcon 
                    sx={{ 
                        display: { xs: 'block', md: 'none' }, 
                        color: theme => theme.palette.mode === 'dark' ? theme.trelloCustom.myColor : 'white' 
                    }}/>

                <ModeSelect /> 

                <Tooltip title='Thông báo' sx={{ cursor: 'pointer', display: { xs: 'none', sm: 'block', md: 'block' } }}>
                    <Badge color="error" variant="dot">
                        <NotificationsNoneIcon sx={{ color: (theme) => theme.palette.mode === 'dark' ? '#ff9a9cc4' : 'white' }}/>
                    </Badge>
                </Tooltip>

                <Tooltip title='Trợ giúp' sx={{ cursor: 'pointer' }}>
                    <HelpOutlineIcon sx={{ display: { xs: 'none', sm: 'block', md: 'block' }, color: (theme) => theme.palette.mode === 'dark' ? '#ff9a9cc4' : 'white' }}/>
                </Tooltip>

                <Profiles sx={{
                    border: '1px solid white'
                }}/>
            </Box>
        </Box>
    )
}
