import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import Attachment from '@mui/icons-material/Attachment'
import Comment from '@mui/icons-material/Comment'
import Group from '@mui/icons-material/Group'
import AttachmentOutlined from '@mui/icons-material/AttachmentOutlined'
import CommentOutlined from '@mui/icons-material/CommentOutlined'
import DomainVerificationOutlined from '@mui/icons-material/DomainVerificationOutlined'
import Image from '@mui/icons-material/Image'
import Person2Outlined from '@mui/icons-material/Person2Outlined'
import PersonAddAlt1Outlined from '@mui/icons-material/PersonAddAlt1Outlined'
import RemoveRedEyeOutlined from '@mui/icons-material/RemoveRedEyeOutlined'
import Subject from '@mui/icons-material/Subject'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Input from '@mui/material/Input'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'

import { useRef, useState } from 'react'

import { API_ROOT } from '~/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { updateCardThunk, uploadCardCoverThunk } from '~/redux/slice/boardSlice'
import { boardSelector } from '~/redux/selector'
import { CircularProgress } from '@mui/material'


export default function CardItem({ card }) {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const uploadCardCoverRef = useRef()
    const { isCardCoverUploading, data } = useSelector(boardSelector)
    const dispatch = useDispatch()

    // const [cardCoverURL, setCardCoverURL] = useState(null)
    const shouldShowCardAction = () => {
        return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
    }
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: card?.uuid, data: { ...card } })

    const handleCardCoverChange = async (e) => {
        const cardCover = e.target.files[0]
        if (!cardCover) {
            return
        }

        const formData = new FormData()
        formData.append('card-cover', cardCover)

        dispatch(uploadCardCoverThunk({ file: formData, cardUuid: card.uuid }))
    }
    const thisCardBelongToColumn = data[0].columns.filter( column => column.uuid === card.columnUuid)

    const handleClickUploadHeaderImageCard = () => {
        uploadCardCoverRef.current.click()
    }

    const handleUpdateCard = (e) => {
        const updateData = {
            fieldName: 'expired',
            expired: new Date(e.target.value),
            cardUuid: card.uuid
        }
        dispatch(updateCardThunk(updateData))
    }
    const style = {
        zIndex: 10,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '90%', sm: '580px', md: '700px' },
        border: '2px solid #ffb1b3',
        boxShadow: 24,
        minHeight: '600px',
        borderRadius: '12px',
        backgroundColor:  theme => theme.palette.mode === 'dark' ? '#333643' : 'white',
        mt: { xs: '90px', sm: '10px' }
    }

    const dndKitCardStyle = {
        transform: CSS.Translate.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : undefined,
        border: isDragging ? '1px solid #ff9a9cc4' : undefined
    }
    return (
        <div ref={setNodeRef} style={dndKitCardStyle} {...attributes} {...listeners}>
            <Card
                onClick={handleOpen} 
                sx={{ 
                    cursor: 'pointer',
                    boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                    overflow: 'unset',
                    display: card?.FE_PlaceholderCard ? 'none' : 'block',
                    border: '1px solid transparent',
                    '&:hover': { borderColor: theme => theme.palette.primary.main }
                }}
            >
                {card?.cover && 
                    <CardMedia 
                        sx={{ 
                            height: 140, 
                            borderTopLeftRadius: '3px', 
                            borderTopRightRadius: '3px' }} 
                        image={`${API_ROOT}/v1/cards/get-image/card-cover/${card.uuid}/?t=${Date.now()}`}
                    />
                }
                <CardContent sx={{ p: '8px', mt: '8px', display: 'inline-flex' }}>
                    <Typography 
                        sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: '1',
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}> 
                        <Checkbox sx={{ p: 0, mr: '8px', color: '#ff9a9cc4', '&.Mui-checked': { color: '#ff9a9cc4' } }}/> 
                        { card?.title }
                    </Typography>
                </CardContent>
                { shouldShowCardAction() && 
                <CardActions sx={{ p: '0 4px 8px 4px' }}>
                    {!!card?.memberIds?.length &&
                    <Button sx={{ color: '#ff9a9cc4' }} size="small" startIcon={<Group/>}>
                        <Typography variant='body1'>{card.memberIds.length}</Typography>
                    </Button>}
    
                    {!!card?.comments?.length &&
                    <Button sx={{ color: '#ff9a9cc4' }} size="small" startIcon={<Comment/>}>
                        <Typography variant='body1'>{card.comments.length}</Typography>
                    </Button>}
    
                    {!!card?.attachments?.length &&
                    <Button sx={{ color: '#ff9a9cc4' }} size="small" startIcon={<Attachment/>}>
                        <Typography variant='body1'>{card.attachments.length}</Typography>
                    </Button>}      
                </CardActions>}
            </Card>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ overflow: 'auto' }}
            >
                <Box sx={style}>
                    <Box sx={{ 
                        height: '180px',
                        borderRadius: '4px', 
                        display: 'flex',
                        justifyContent: 'space-between', 
                        position: 'relative' }}
                    >
                        <Box 
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '180px',
                                borderRadius: '4px',
                                userSelect: 'none', 
                                '&:hover .uploadButton': {
                                    opacity: '1'
                                }
                            }}
                        >
                            <Box 
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '180px'
                                }}
                            >
                                <Box 
                                    sx={{ 
                                        appearance: 'none',
                                        height: '100%'
                                    }}
                                >
                                    { card?.cover ? 
                                        <Box
                                            sx={{ 
                                                width: '100%',
                                                height: '180px',
                                                borderTopLeftRadius: '12px', 
                                                borderTopRightRadius: '12px', 
                                                backgroundColor: '#ffe2e2',
                                                backgroundSize: 'contain',
                                                backgroundPosition: 'center',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundImage: `url(${API_ROOT}/v1/cards/get-image/card-cover/${card.uuid}/?t=${Date.now()})`
                                            }}
                                        >
                                        </Box> 
                                        : 
                                        <Box sx={{
                                            boxSizing: 'border-box',
                                            appearance: 'none',
                                            borderRadius: '4px', 
                                            border: 'none',
                                            width: '100%',
                                            height: '180px', 
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center center',
                                            overflow: 'hidden',
                                            backgroundColor: '#ffe2e2'
                                        }}>
                                        </Box>
                                    }
                                    { isCardCoverUploading && 
                                        <Box 
                                            className='uploadAvatarIcon'
                                            sx={{ 
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)'
                                            }}
                                        >
                                            <Box sx={{ 
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <CircularProgress sx={{ color: 'white' }}/>
                                            </Box>
                                        </Box>
                                    }
                                </Box>
                                <Box onClick={handleClickUploadHeaderImageCard} 
                                    sx={{ 
                                        color: theme => theme.palette.mode === 'dark' ? 
                                            theme.palette.primary.light : theme.palette.primary.main, 
                                        position: 'absolute', 
                                        bottom: '10px', 
                                        right: { xs: '18px', sm: '22px' },
                                        display: 'flex',
                                        width: { xs: '33px', sm: '110px' },
                                        height: '32px',
                                        alignContent: 'center',
                                        cursor: 'pointer',
                                        p: '4px 4px 12px',
                                        '&:hover': {
                                            border: '1px solid',
                                            borderColor: theme => theme.trelloCustom.myColor,
                                            borderRadius: '4px',
                                            color: '#bc696bc4'
                                        }
                                    }}>
                                    <Image />
                                    <Typography sx={{ display: { xs: 'none', sm: 'block' }, alignContent: 'center', ml: '4px' }}>Tải ảnh lên</Typography>
                                </Box>
                                <Input inputRef={uploadCardCoverRef} onChange={handleCardCoverChange} sx={{ display: 'none' }} type='file'/>
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ display:'flex', mt: '12px' }}>
                        <Checkbox sx={{ color: theme => theme.trelloCustom.myColor, '&.Mui-checked': { color: theme => theme.trelloCustom.myColor } }}></Checkbox>
                        <Box sx={{ display:'flex', flexDirection: 'column' }}>
                            <Typography sx={{ display: 'inline-block', '&.MuiTypography-body1': { color: theme => theme.palette.mode === 'dark' ? 'white' : '#172b4d', fontSize: '1rem', fontWeight: 700 } }}>{card.title}</Typography>
                            <Typography sx={{ display: 'inline-block', '&.MuiTypography-body1': { color: theme => theme.palette.mode === 'dark' ? 'white' : '#44546f' } }}>trong danh sách {thisCardBelongToColumn[0].title}</Typography>
                        </Box>
                    </Box>

                    <Box sx={{ width: { xs: '100%', sm: '100%' }, display: 'flex', justifyContent:'space-between', flexDirection: { xs: 'column', sm: 'row' } }}>
                        <Box sx={{ mt: '24px', width: { xs: '100%', sm: '70%' } }}>
                            <Box sx={{ ml: '42px', display: 'flex' }}>
                                <Box>
                                    <Button 
                                        variant='outlined' 
                                        sx={{ 
                                            color: theme => theme.trelloCustom.myColor, 
                                            borderColor: theme => theme.trelloCustom.myColor,
                                            p: '14px',
                                            height: '51px'
                                        }}>
                                        <RemoveRedEyeOutlined/>Theo dõi</Button>
                                </Box>
                                <Box sx={{ ml: '12px' }}>
                                    <TextField
                                        id="date"
                                        label="Ngày hết hạn"
                                        type="date"
                                        value="2025-06-10"
                                        onChange={handleUpdateCard}
                                        sx={{ 
                                            width: 220,
                                            '& .MuiInputBase-root .MuiOutlinedInput-input': {
                                                p: '14px'
                                            },
                                            '& .MuiFormLabel-root.MuiInputLabel-root': {
                                                color: theme => theme.trelloCustom.myColor
                                            },
                                            '& .MuiInputBase-root .MuiOutlinedInput-notchedOutline':{
                                                borderColor: theme => theme.trelloCustom.myColor
                                            },
                                            '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                                color: theme => theme.trelloCustom.myColor
                                            },
                                            '& input[type="date"]::-webkit-calendar-picker-indicator': {
                                                filter: 'invert(0.5)',
                                                cursor: 'pointer'
                                            }
                                        }}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                    />
                                </Box>
                            </Box>
    
                            {/* Description */}
                            <Box sx={{ width: '100%' }}>
                                <Box sx={{ mt: '12px', ml: '8px', display: 'flex', width: '100%' }}>
                                    <Subject fontSize='medium' ></Subject>
                                    <Box sx={{ ml: '8px', width: '100%' }}>
                                        <Typography sx={{ mb: '12px' }}>Mô tả</Typography>
                                        <TextField sx={{ width: '96%', '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: theme => theme.trelloCustom.myColor },
                                            '& .MuiInputLabel-root.Mui-focused': { color: theme => theme.trelloCustom.myColor } }} label='Thêm mô tả'></TextField>
                                    </Box>
                                </Box>
        
                                <Box sx={{ mt: '12px', ml: '2px', display: 'flex', flexDirection: 'column' }}>
                                    <Box sx={{ mb: '12px', ml: '8px', display: 'flex', justifyContent: 'space-between', alignItems:'center' }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
                                            <CommentOutlined fontSize='medium' ></CommentOutlined>
                                            <Typography variant='outlined' sx={{ ml: '8px' }}>Hoạt động</Typography>
                                        </Box>
                                        <Button variant='outlined' sx={{ mr: '8px', color: theme => theme.trelloCustom.myColor, borderColor: theme => theme.trelloCustom.myColor }}>Hiện chi tiết</Button>
                                    </Box>
                                    <TextField 
                                        sx={{ 
                                            width: { sm: '87%', md: '90%' }, 
                                            ml: '42px', 
                                            mr: '10px', 
                                            '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: theme => theme.trelloCustom.myColor },
                                            '& .MuiInputLabel-root.Mui-focused': { color: theme => theme.trelloCustom.myColor } 
                                        }} 
                                        label='Viết bình luận'>
                                        
                                    </TextField>
                                </Box>
                            </Box>
                        </Box>
                        
                        <Box 
                            sx={{ 
                                width:{ xs: '100%', sm: '30%' }, 
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center', 
                                mt: '24px', 
                                alignContent: 'center',
                                flexWrap: 'wrap'
                            }}>
                            <Button variant='outlined' sx={{ color: theme => theme.trelloCustom.myColor, borderColor: theme => theme.trelloCustom.myColor, width:{ xs: '50%', sm: '150px', md: '170px' }, mb: '12px', ml: '10px' }}>
                                <PersonAddAlt1Outlined/>
                                <Typography sx={{ ml: '6px' }}>Thêm thành viên</Typography>
                            </Button>
                            <Button variant='outlined' sx={{ color: theme => theme.trelloCustom.myColor, borderColor: theme => theme.trelloCustom.myColor, width:{ xs: '50%', sm: '150px', md: '170px' }, mb: '12px', ml: '10px' }}>
                                <Person2Outlined/>
                                <Typography sx={{ ml: '6px' }}>Thành viên</Typography>
                            </Button>
                            <Button variant='outlined' sx={{ color: theme => theme.trelloCustom.myColor, borderColor: theme => theme.trelloCustom.myColor, width:{ xs: '50%', sm: '150px', md: '170px' }, mb: '12px', ml: '10px' }}>
                                <DomainVerificationOutlined/>
                                <Typography sx={{ ml: '6px' }}>Việc cần làm</Typography>
                            </Button>
                            <Button variant='outlined' sx={{ color: theme => theme.trelloCustom.myColor, borderColor: theme => theme.trelloCustom.myColor, width:{ xs: '50%', sm: '150px', md: '170px' }, mb: '12px', ml: '10px' }}>
                                <AttachmentOutlined/>
                                <Typography sx={{ ml: '6px' }}>Đính kèm</Typography>
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal> 
        </div>      
    )
}