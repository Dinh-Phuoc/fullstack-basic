import { useState } from 'react'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Check from '@mui/icons-material/Check'
import ExpandMore from '@mui/icons-material/ExpandMore'

export default function Templates() {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <Box>
            <Button
                sx={{ p: '8px 0', color: (theme) => theme.palette.mode === 'dark' ? '#ff9a9cc4' : 'white' }}
                id="basic-button-templates"
                aria-controls={open ? 'basic-menu-templates' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                endIcon={<ExpandMore />}
            >
            Templates
            </Button>

            <Menu
                id="basic-menu-templates"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button-templates'
                }}
            >
                <MenuItem>
                    <ListItemText inset>Single</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemText inset>1.15</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemText inset>Double</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Check />
                    </ListItemIcon>
                Custom: 1.2
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemText>Add space before paragraph</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemText>Add space after paragraph</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemText>Custom spacing...</ListItemText>
                </MenuItem>
            </Menu>
        </Box>
    )
}