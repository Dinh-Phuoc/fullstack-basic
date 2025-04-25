
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import Attachment from '@mui/icons-material/Attachment'
import Comment from '@mui/icons-material/Comment'
import Group from '@mui/icons-material/Group'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { CircularProgress, Input, Modal, TextField } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import { Box } from '@mui/joy'
import { useEffect, useRef, useState } from 'react'
import { getInforUserApi, uploadImageHeaderApi } from '~/apis'
import { API_ROOT } from '~/utils/constant'
import { AttachmentOutlined, Camera, CommentOutlined, DomainVerificationOutlined, Image, Person2Outlined, PersonAddAlt1Outlined, RemoveRedEyeOutlined, Subject } from '@mui/icons-material'


export default function CardItem({ card }) {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const uploadHeaderImageRef = useRef()
    const [user, setUser] = useState(null)
    const [token] = useState(localStorage.getItem('token'))

    const [setImageHeaderURL] = useState(null)
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
    } = useSortable({ id: card?._id, data: { ...card } })

    useEffect(() => {
        token && getInforUserApi().then((userInfo) => {
            if (userInfo.imageHeader !== '') setImageHeaderURL(`${API_ROOT}/v1/manage/users/profile/get-image/image-header/${userInfo._id}/?t=${Date.now()}`)
            setUser(userInfo)
        })
    }, [token])


    // if (!user) {
    //     return (<Box sx={{ 
    //         display: 'flex',
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //         height: '100vh',
    //         width: '100vw',
    //         gap: 2
    //     }}>
    //         <CircularProgress/>
    //     </Box>)
    // }

    const handleImageHeaderChange = async (e) => {
        const imageHeader = e.target.files[0]
        if (!imageHeader) {
            return
        }

        const formData = new FormData()
        formData.append('image-header', imageHeader)

        const isUploadImageHeaderSuccess = await uploadImageHeaderApi(formData, user._id)
        if (isUploadImageHeaderSuccess) setImageHeaderURL(`${API_ROOT}/v1/manage/users/profile/get-image/image-header/${user._id}/?t=${Date.now()}`)
    }

    const handleClickUploadHeaderImage = () => {
        setAnchorEl(uploadHeaderImageRef.current.click())
    }

    const style = {
        zIndex: 10,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '90%', sm: '700px' },
        border: '2px solid #ffb1b3',
        boxShadow: 24,
        minHeight: '600px',
        borderRadius: '12px',
        backgroundColor:  'white',
        mt: 2
    }

    const dndKitCardStyle = {
        transform: CSS.Translate.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : undefined,
        border: isDragging ? '1px solid #ff9a9cc4' : undefined
    }
    return (
        <>
            <Card
                onClick={handleOpen} 
                ref={setNodeRef} style={dndKitCardStyle} {...attributes} {...listeners}
                sx={{ 
                    cursor: 'pointer',
                    boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                    overflow: 'unset',
                    display: card?.FE_PlaceholderCard ? 'none' : 'block',
                    border: '1px solid transparent',
                    '&:hover': { borderColor: theme => theme.palette.primary.main }
                }}
            >
                {card?.cover && <CardMedia sx={{ height: 140, borderTopLeftRadius: '3px', borderTopRightRadius: '3px' }} image={card?.cover} />}
                <CardContent sx={{ p: '8px', mt: '8px', display: 'inline-flex' }}>
                    <Typography 
                        sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: '2',
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
                                                backgroundImage: `url(${card?.cover})`
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
                                            backgroundImage: 'linear-gradient(270deg, rgb(255, 179, 201) 0%, rgb(244, 110, 139) 100%)'
                                        }}>
                                        </Box>
                                    }
                                </Box>
                                <Box variant='outlined' onClick={handleClickUploadHeaderImage} sx={{ color: theme => theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main, pl: '12px', position: 'absolute', bottom: '12px', right: '24px' }}>
                                    <Image />
                                    <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>Tải ảnh lên</Typography>
                                </Box>
                                <Input inputRef={uploadHeaderImageRef} onChange={handleImageHeaderChange} sx={{ display: 'none' }} type='file'/>
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ display:'flex', mt: '12px' }}>
                        <Checkbox></Checkbox>
                        <Box sx={{ display:'flex', flexDirection: 'column' }}>
                            <Typography sx={{ display: 'inline-block', '&.MuiTypography-body1': { color: '#172b4d', fontSize: '1rem', fontWeight: 700 } }}>{card.title}</Typography>
                            <Typography sx={{ display: 'inline-block', '&.MuiTypography-body1': { color: '#44546f' } }}>trong danh sách {card.columnId}</Typography>
                        </Box>
                    </Box>

                    <Box sx={{ width: { xs: '90%', sm: '100%' }, display: 'flex', justifyContent:'space-between', flexDirection: { xs: 'column', sm: 'row' } }}>
                        <Box sx={{ mt: '24px', width: { xs: '100%', sm: '70%' } }}>
                            <Box sx={{ ml: '42px', display: 'flex' }}>
                                <Box>
                                    <Typography>Thông báo</Typography>
                                    <Button variant='outlined' sx={{ p: '4px' }} ><RemoveRedEyeOutlined/>Theo dõi</Button>
                                </Box>
                                <Box sx={{ ml: '12px' }}>
                                    <Typography>Ngày hết hạn</Typography>
                                    <Box>Chưa hoàn thành</Box>
                                </Box>
                            </Box>
    
                            {/* Description */}
                            <Box sx={{ width: '100%' }}>
                                <Box sx={{ mt: '12px', ml: '8px', display: 'flex', width: '100%'}}>
                                    <Subject fontSize='medium' ></Subject>
                                    <Box sx={{ ml: '8px', width: '100%' }}>
                                        <Typography sx={{ mb: '12px' }}>Mô tả</Typography>
                                        <TextField sx={{ width: '90%' }} label='Thêm mô tả'></TextField>
                                    </Box>
                                </Box>
        
                                <Box sx={{ mt: '12px', ml: '2px', display: 'flex', flexDirection: 'column' }}>
                                    <Box sx={{ mb: '12px', ml: '8px', display: 'flex', justifyContent: 'space-between', alignItems:'center' }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
                                            <CommentOutlined fontSize='medium' ></CommentOutlined>
                                            <Typography variant='outlined' sx={{ ml: '8px' }}>Hoạt động</Typography>
                                        </Box>
                                        <Button variant='outlined' sx={{ mr: '8px' }}>Hiện chi tiết</Button>
                                    </Box>
                                    <TextField sx={{ width: '90%', ml: '42px' }} label='Viết bình luận'></TextField>
                                </Box>
                            </Box>
                        </Box>
                        
                        <Box sx={{ width:{ xs: '100%', md: '30%' }, display: 'flex', flexDirection: 'column', alignItems: 'center', mt: '24px', alignContent: 'center' }}>
                            <Button variant='outlined' sx={{ width:'170px', mb: '12px', ml: '12px' }}>
                                <PersonAddAlt1Outlined/>
                                <Typography>Thêm thành viên</Typography>
                            </Button>
                            <Button variant='outlined' sx={{ width:'170px', mb: '12px', ml: '12px' }}>
                                <Person2Outlined/>
                                <Typography>Thành viên</Typography>
                            </Button>
                            <Button variant='outlined' sx={{ width:'170px', mb: '12px', ml: '12px' }}>
                                <DomainVerificationOutlined/>
                                <Typography>Việc cần làm</Typography>
                            </Button>
                            <Button variant='outlined' sx={{ width:'170px', mb: '12px', ml: '12px' }}>
                                <AttachmentOutlined/>
                                <Typography>Đính kèm</Typography>
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal> 
        </>          

    )
}