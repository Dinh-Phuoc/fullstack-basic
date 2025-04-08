import { useState } from 'react'

import ContentCut from '@mui/icons-material/ContentCut'
import Cloud from '@mui/icons-material/Cloud'
import DeleteForever from '@mui/icons-material/DeleteForever'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import AddCard from '@mui/icons-material/AddCard'
import DragHandle from '@mui/icons-material/DragHandle'


import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import { useConfirm } from 'material-ui-confirm'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import ListCards from './ListCards/ListCards'
import { Close } from '@mui/icons-material'
import { TextField } from '@mui/material'
import { toast } from 'react-toastify'

export default function Column({ column, createNewCard, deleteColumnDetails }) {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const orderCard = column.cards

    const [openNewCardForm, setOpenNewCardForm] = useState(false)
    const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm)

    const [newCardTitle, setNewCardTitle] = useState('')

    const confirmDeleteColumn = useConfirm()
    const handleDeleteColumn = () => {
        confirmDeleteColumn({
            description: 'Are you sure you want to delete this column?',
            confirmationText: 'Delete',
            confirmationButtonProps: { color: 'error' },
            cancellationButtonProps: { color: 'inherit', variant: 'outlined' },
            buttonOrder: ['confirm', 'cancel']
        }).then(() => {
            deleteColumnDetails(column._id)
        }).catch(() => {})
    }

    const addNewCard = () => {
        if (!newCardTitle) {
            toast.error('Please provide a new title')
            return
        }

        const newCardData = {
            title: newCardTitle,
            columnId: column._id
        }

        createNewCard(newCardData)
        
        toggleOpenNewCardForm()
        setNewCardTitle('')
    }

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: column?._id, data: { ...column } })

    const dndKitColumnStyle = {
        transform: CSS.Translate.toString(transform),
        transition,
        height: '100%',
        opacity: isDragging ? 0.5 : undefined,
        border: isDragging ? '1px solid primary.main' : undefined
    }
    return (
        <div ref={setNodeRef} style={dndKitColumnStyle} {...attributes} >
            <Box {...listeners}
                sx={{
                    minWidth: '300px',
                    maxWidth: '300px',
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ffffffc4'),
                    ml : 2,
                    overflowX: 'auto',
                    overflowY: 'auto',
                    borderRadius: 2,
                    height: 'fit-content',
                    maxHeight: (theme) => `calc(${theme.trelloCustom.boardContentHeight} - ${theme.spacing(5)})`
                }}>
                {/* Box Header  */}
                <Box sx={{
                    height: (theme) => theme.trelloCustom.columnHeaderHeight,
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent:'space-between'
                }}>
                    <Typography 
                        sx={{ fontWeight: 'bold', cursor: 'pointer' }}
                    >
                        {column?.title}
                    </Typography>
                    <Box>
                        <Tooltip title='More Options'>
                            <ExpandMore  
                                sx={{ color: 'text.primary', cursor: 'pointer' }}
                                id="basic-column-dropdown"
                                aria-controls={open ? 'basic-column-dropdown' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            />
                        </Tooltip>
                        <Menu
                            id="basic-column-dropdown"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-column-dropdown'
                            }}
                        >
                            <MenuItem 
                                sx={{ 
                                    '&:hover': { 
                                        color: 'success.light', 
                                        '& .add-card': { color: 'success.light' }
                                    } 
                                }}
                                onClick={toggleOpenNewCardForm}
                            >
                                <ListItemIcon> <AddCard className='add-card' fontSize="small" /></ListItemIcon>
                                <ListItemText>Thêm thẻ</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon> <ContentCut fontSize="small" /></ListItemIcon>
                                <ListItemText>Cut</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon> <ContentCopy fontSize="small" /></ListItemIcon>
                                <ListItemText>Copy</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon> <ContentPaste fontSize="small" /></ListItemIcon>
                                <ListItemText>Paste</ListItemText>
                            </MenuItem>

                            <Divider />

                            <MenuItem>
                                <ListItemIcon> <Cloud fontSize="small" /></ListItemIcon>
                                <ListItemText>Archive this column</ListItemText>
                            </MenuItem>
    
                            <MenuItem 
                                sx={{ 
                                    '&:hover': { 
                                        color: 'warning.dark', 
                                        '& .delete-icon': { color: 'warning.dark' }
                                    } 
                                }}
                                onClick={handleDeleteColumn}
                            >
                                <ListItemIcon>
                                    <DeleteForever className='delete-icon' fontSize="small" />
                                </ListItemIcon>
                                <ListItemText >Remove this column</ListItemText>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Box>
    
                {/* Box List Of Card  */}
                <ListCards cards={orderCard}/>
    
                {/* Box Footer  */}
                <Box sx={{
                    height: (theme) => theme.trelloCustom.columnFooterHeight,
                    p: 2
                }}
                >
                    { !openNewCardForm ?
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent:'space-between',
                            color: 'white'
                        }}> 
                            <Button 
                                sx={{ 
                                    color: '#ff9a9cc4',
                                    '&:hover': {
                                        backgroundColor: theme => theme.palette.primary.main,
                                        color: (theme) => theme.palette.mode === 'dark' ? '#ff9a9cc4' : 'white'
                                    }
                                }}
                                startIcon={<AddCard/>} 
                                onClick={toggleOpenNewCardForm}
                            >Thêm thẻ</Button>
                            <Tooltip 
                                sx={{
                                    color: '#ff9a9cc4'
                                }}
                                title='Drag to move'>
                                <DragHandle/>
                            </Tooltip>
                        </Box> :
                        <Box sx={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}>
                            <TextField 
                                type='text' 
                                label='Title card...' 
                                size='small'
                                variant='outlined'
                                autoFocus
                                value={newCardTitle}
                                onChange={(e) => setNewCardTitle(e.target.value)}
                                sx={{ 
                                    '& label': { color: 'text.primary' },
                                    '&::placeholder': { color: 'text.primary' },
                                    '& input': { 
                                        color: theme => theme.palette.primary.main
                                    },
                                    '& label.Mui-focused': { color: theme => theme.palette.primary.main },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: (theme) => theme.palette.primary.main },
                                        '&:hover fieldset': { borderColor: (theme) => theme.palette.primary.main },
                                        '&.Mui-focused fieldset': { borderColor: (theme) => theme.palette.primary.main }
                                    },
                                    '&.MuiOutlinedInput-input': {
                                        borderRadius: 1
                                    }
                                }}
                            />

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Button 
                                    variant='contained' 
                                    color = 'primary'
                                    size='small'
                                    onClick={addNewCard}
                                    sx={{
                                        boxShadow: 'none',
                                        color: 'white',
                                        borderColor: (theme) => theme.palette.primary.main,
                                        '&:hover': {
                                            bgcolor: (theme) => theme.palette.primary.light, boxShadow: 'none'
                                        }
                                    }}
                                >Add</Button>
                                <Close 
                                    onClick = {toggleOpenNewCardForm}
                                    fontSize="small"
                                    sx={{ 
                                        color: (theme) => theme.palette.error.light,
                                        cursor: 'pointer'
                                    }}
                                />
                            </Box>
                        </Box>
                    }
                </Box>
            </Box>
        </div>
    )
}