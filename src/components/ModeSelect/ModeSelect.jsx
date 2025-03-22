import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useColorScheme } from '@mui/material'

export default function ModeSelect() {
    const { mode, setMode } = useColorScheme()

    const handleChange = (event) => {
        setMode(event.target.value)
    }

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Mode</InputLabel>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={mode}
                label="Mode"
                onChange={handleChange}
            >
                <MenuItem value="light">Light</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
            </Select>
        </FormControl>
    ) 
}
