import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'
import { useColorScheme } from '@mui/material/styles'
import SettingsBrightness from '@mui/icons-material/SettingsBrightness'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'


export default function ModeSelect() {
    const { mode, setMode } = useColorScheme()

    const handleChange = (event) => {
        setMode(event.target.value)
    }

    return (
        <FormControl sx={{ minWidth: '120px', display: { xs: 'none', sm: 'block', md: 'block' } }} size="small">
            <Select
                id="select-dark-light-mode"
                value={mode}
                onChange={handleChange}
                sx={{
                    color: (theme) => theme.palette.mode === 'dark' ? '#ff9a9cc4' : 'white',
                    '.MuiOutlinedInput-notchedOutline': {
                        borderColor: (theme) => theme.palette.mode === 'dark' ? '#ff9a9cc4' : 'white'
                    },
                    '&:hover': {
                        '.MuiOutlinedInput-notchedOutline': {
                            borderColor: (theme) => theme.palette.mode === 'dark' ? '#ff9a9cc4' : 'white'
                        }
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: (theme) => theme.palette.mode === 'dark' ? '#ff9a9cc4' : 'white'
                    },
                    '.MuiSvgIcon-root': {
                        color: (theme) => theme.palette.mode === 'dark' ? '#ff9a9cc4' : 'white'
                    }
                }}
            >
                <MenuItem value="light">
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                    }}>
                        <LightModeOutlinedIcon fontSize='small'/>Sáng
                    </Box>
                </MenuItem>

                <MenuItem value="dark">
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                    }}>
                        <DarkModeOutlinedIcon fontSize='small'/>Tối
                    </Box>
                </MenuItem>

                <MenuItem value="system">
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                    }}>                   
                        <SettingsBrightness fontSize='small'/>Hệ thống
                    </Box>
                </MenuItem>
            </Select>
        </FormControl>
    ) 
}
