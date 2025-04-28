import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import Close from '@mui/icons-material/Close'
import { toast } from 'react-toastify'

import NoteAdd from '@mui/icons-material/NoteAdd'

import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import { TextField } from '@mui/material'

export default function ListColomn({ columns, createNewColumn, createNewCard, deleteColumnDetails }) {
    const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
    const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)

    const [newColumnTitle, setNewColumnTitle] = useState('')

    const addNewColumn = () => {
        if (!newColumnTitle) {
            toast.error('Please provide a new title')
            return
        }

        const newColumnData = {
            title: newColumnTitle
        }

        createNewColumn(newColumnData)

        toggleOpenNewColumnForm()
        setNewColumnTitle('')
    }
    return (
        <SortableContext items={columns?.map((column) => column._id)} strategy={horizontalListSortingStrategy}>
            <Box sx={{
                width: '100%',
                display: 'flex',
                overflowX: 'auto',
                overflowY: 'hidden',
                '*::webkit-scrollbar-track': { m: 2 }
            }}>
                {columns?.map(column => <Column 
                    deleteColumnDetails={deleteColumnDetails} 
                    createNewCard={createNewCard} 
                    key={column._id} 
                    column={column}/>)}
                { !openNewColumnForm ? 
                    <Box onClick={toggleOpenNewColumnForm} sx={{
                        minWidth: '250px',
                        maxWidth: '250px',
                        ml: 2,
                        borderRadius: '6px',
                        height: 'fit-content',
                        bgcolor: '#ffffff3d'
                    }}>
                        <Button 
                            startIcon={<NoteAdd/>}
                            sx={{ 
                                backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#333643' : '#ffffffc4',
                                color: '#ff9a9cc4',
                                width: '100%',
                                justifyContent: 'flex-start',
                                pl: 2.5,
                                py: 1,
                                '&:hover': {
                                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#333643' : '#ffffffc4',
                                    border: '1px solid',
                                    borderColor: theme => theme.trelloCustom.myColor
                                }
                            }}
                        > 
                            Thêm danh sách khác
                        </Button>
                    </Box> 
                    :
                    <Box sx={{
                        minWidth: '250px',
                        maxWidth: '250px',
                        mx: 2,
                        p: 1,
                        borderRadius: '6px',
                        height: 'fit-content',
                        bgcolor: '#ffffff3d',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1
                    }}>
                        <TextField 
                            type='text' 
                            label='Enter title column...' 
                            size='small'
                            variant='outlined'
                            autoFocus
                            value={newColumnTitle}
                            onChange={(e) => setNewColumnTitle(e.target.value)}
                            sx={{ 
                                minWidth: '120px',
                                maxWidth: '250px',
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

                        <Box 
                            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                        >
                            <Button 
                                variant='contained' 
                                color='success' 
                                size='small'
                                onClick={addNewColumn}
                                sx={{
                                    boxShadow: 'none',
                                    borderColor: (theme) => theme.palette.success.main,
                                    '&:hover': {
                                        bgcolor: (theme) => theme.palette.success.light, boxShadow: 'none'
                                    }
                                }}
                            >Add Column</Button>
                            <Close 
                                onClick = {toggleOpenNewColumnForm}
                                fontSize="small"
                                sx={{ 
                                    color: 'white',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        color: (theme) => theme.palette.warning.light
                                    }
                                }}
                            />
                        </Box>
                    </Box>    
                }               
            </Box>
        </SortableContext>
    )
}