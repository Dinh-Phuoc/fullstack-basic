import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import BoltOutlined from '@mui/icons-material/BoltOutlined'
import IntegrationInstructionsOutlined from '@mui/icons-material/IntegrationInstructionsOutlined'
import LibraryBooksOutlined from '@mui/icons-material/LibraryBooksOutlined'
import Mail from '@mui/icons-material/Mail'
import PowerOutlined from '@mui/icons-material/PowerOutlined'
import ScheduleOutlined from '@mui/icons-material/ScheduleOutlined'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import StarBorder from '@mui/icons-material/StarBorder'
import MenuRounded from '@mui/icons-material/MenuRounded'
import Drawer from '@mui/material/Drawer'
import { useState } from 'react'
import { Button } from '@mui/material'
export default function HomeBarXS() {
    const [openDrawerMenu, setOpenDrawerMenu] = useState(false)
    const [open, setOpen] = useState(false)
    const handleClick = () => {
        setOpen(!open)
    }

    const toggleDrawer = (newOpen) => () => {
        setOpenDrawerMenu(newOpen)
    }
    return (
        <>
            <Button
                onClick={toggleDrawer(true)} 
                fontSize='large' 
                sx={{ 
                    color: theme => theme.trelloCustom.myColor, 
                    display: { xs: 'block', md: 'none' },
                    cursor: 'pointer',
                    minWidth: '35px',
                    padding: '0',
                    height: '35px',
                    '&:hover': {
                        bgcolor: 'white'
                    }
                }}
            > 
                <MenuRounded fontSize='large'/>
            </Button>
            <Drawer
                open={openDrawerMenu}
                onClose={toggleDrawer(false)}
                sx={{
                    pr: 0,
                    '& .MuiBackdrop-root.MuiModal-backdrop': {
                        top: '58px'
                    },
                    '& .MuiPaper-root.MuiDrawer-paper': {
                        top: '58px',
                        boxShadow: 'none'
                    }
                }}
            >
                <List
                    sx={{ width: '400px', bgcolor: 'background.paper' }}
                    component="nav"
                >
                    <ListItemButton onClick={handleClick}>
                        <ListItemText primary="Features" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Starred" />
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <ListItemButton onClick={handleClick}>
                        <ListItemText primary="Solutions" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Starred" />
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <ListItemButton onClick={handleClick}>
                        <ListItemText primary="Plans" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Starred" />
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <ListItemButton onClick={handleClick}>
                        <ListItemText primary="Resources" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Starred" />
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <ListItemButton onClick={handleClick}>
                        <ListItemText primary="Pricing" />
                    </ListItemButton>
                </List>
            </Drawer>
        </>
       
    )
}