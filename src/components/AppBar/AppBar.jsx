import { useState } from 'react'

import SvgIcon from '@mui/material/SvgIcon'
import TextField from '@mui/material/TextField'
import AppsIcon from '@mui/icons-material/Apps'
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
import Started from './Menus/Started'
import Templates from './Menus/Templates'
import Profiles from './Menus/Profiles'

export default function AppBar() {
    const [searchValue, setSearchValue] = useState('')

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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AppsIcon sx={{ color: 'white' }}/>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <SvgIcon component={TrelloIcon} fontSize='small' inheritViewBox sx={{ color: 'white' }}/>
                    <Typography variant='span' sx={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'white' }}>Trello</Typography>
                </Box>

                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                    <Workspaces />
                    <Recent />
                    <Started />
                    <Templates />
                    <Button 
                        variant='outlined' 
                        startIcon={<LibraryAddIcon/>} 
                        sx={{ 
                            color: 'white',
                            border: 'none',
                            '&:hover': {
                                border: 'none'
                            }
                        }}
                    >
                        Create
                    </Button>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField 
                    id='outlined-search' 
                    type='text' 
                    label='Search...' 
                    size='small'
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: 'white' }}/>
                            </InputAdornment>
                        ),
                        endAdornment: searchValue ? (
                            <CloseIcon 
                                onClick = {() => setSearchValue('')}
                                fontSize="small"
                                sx={{ 
                                    color: 'white',
                                    cursor: 'pointer'
                                }}
                            />
                        ) : null
                    }} 
                    sx={{ 
                        minWidth: '120px',
                        maxWidth: '180px',
                        '& label': { color: 'white' }, 
                        '& input': { color: 'white' },
                        '& label.Mui-focused': { color: 'white' },
                        '.MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'white' },
                            '&:hover fieldset': { borderColor: 'white' },
                            '&.Mui-focused fieldset': { borderColor: 'white' }
                        } 
                    }}
                />
                <ModeSelect /> 
                <Tooltip title='Notification' sx={{ cursor: 'pointer' }}>
                    <Badge color="error" variant="dot">
                        <NotificationsNoneIcon sx={{ color: 'white' }}/>
                    </Badge>
                </Tooltip>

                <Tooltip title='Help' sx={{ cursor: 'pointer' }}>
                    <HelpOutlineIcon sx={{ color: 'white' }}/>
                </Tooltip>

                <Profiles sx={{
                    border: '1px solid white'
                }}/>
            </Box>
        </Box>
    )
}

7