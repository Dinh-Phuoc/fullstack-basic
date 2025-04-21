import { CameraAltOutlined, Check, Close, Image, InfoOutlined, Public } from '@mui/icons-material'

import { Box, Typography, Link, Tooltip, Avatar, Menu, MenuItem, Input, Paper, TextField, Button, InputLabel, FormControl } from '@mui/material'
import { useRef, useState } from 'react'
import { uploadAvatarApi, uploadImageHeaderApi } from '~/apis'
import { API_ROOT } from '~/utils/constant'

const DocumentPage = () => {
    const data = {
        _id:  '67ec88f63bb057c82de3e0f7',
        password: '123456',
        gmail: 'rookie@gmail.com',
        fullName: 'Rookie',
        phone: '0000110101',
        imageHeader: '',
        avatar: 'https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/481672559_1890220561782995_8376855731310234495_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGQnHVCqT8BaZbG28o0IHU-ruDQw8iioI-u4NDDyKKgj_AQzr-33zBwiSgHbvNRTV_ettm4D6Qtz3tSfUQ9OiSx&_nc_ohc=BpANafhv5W4Q7kNvwG_VRcq&_nc_oc=AdmRqfs13imavm_l0Om407de1WxhARPjSbK2vwxfUpaCW5qlmZSKrsrGjQsSQ69q1Eg&_nc_zt=23&_nc_ht=scontent.fsgn2-6.fna&_nc_gid=v_aT3DdfuMPbib8uCNBkXw&oh=00_AfFdaMs3hBWEmV-KW2XutYWEl9vcRoGAReg6KMlEoY7JMA&oe=67FAC251',
        role: 'admin',
        userName: 'rookie'
    }
    const [anchorEl, setAnchorEl] = useState(null)
    const uploadHeaderImageRef = useRef()
    const imageRef = useRef()
    const open = Boolean(anchorEl)

    const uploadAvatarRef = useRef()
    const cameraIconRef = useRef()

    const [prevValue, setPreValue] = useState(null)
    const [fullNameFocus, setFullNameFocus] = useState(false)
    const [fullName, setFullName] = useState(data.fullName)

    //Handle Image Header Change group
    const handleImageHeaderChange = async (e) => {
        const imageHeader = e.target.files[0]
        if (!imageHeader) {
            return
        }

        const formData = new FormData()
        formData.append('image-header', imageHeader)

        const imageHeaderPath = await uploadImageHeaderApi(formData, data._id)
        if (imageHeaderPath) data.imageHeader = imageHeaderPath.file
    }

    const handleClickUploadHeaderImage = () => {
        setAnchorEl(uploadHeaderImageRef.current.click())
    }

    const handleMenuThroughImageIcon = () => {
        setAnchorEl(imageRef.current)
    }

    //Hande Image Header Change group
    const handleAvatarChange = async (e) => {
        const avatar = e.target.files[0]
        if (!avatar) {
            return
        }

        const formData = new FormData()
        formData.append('avatar', avatar)

        const avatarPath = await uploadAvatarApi(formData, data._id)
        if (avatarPath) data.avatar = <avatarPath className="file"></avatarPath>
    }

    const handleUploadAvatarThroughCameraIcon = () => {
        uploadAvatarRef.current.click()
    }

    //Handle Edit information group
    const handleFocus = (e, textFieldName) => {
        setPreValue(e.target.value)
        switch (textFieldName) {
        case 'fullName':
            setFullNameFocus(true)
            e.target.select()
            return
        default:
            return
        }
    }

    const handleChangeValue = (e, textFieldName) => {
        switch (textFieldName) {
        case 'fullName':
            setFullName(e.target.value)
            return
        default:
            return
        }
    }

    const handleEditTextField = (e, textFieldName) => {
        switch (textFieldName) {
        case 'fullName':
            if (e.target.value !== prevValue) {
                console.log('confirm-confirm')
                setFullNameFocus(false)
                return
            }
            console.log('confirm-cancel')
            setFullNameFocus(false)
            return
        default:
            return
        }
    }

    const handleCancelEditTextField = (textFieldName) => {
        switch (textFieldName) {
        case 'fullName':
            console.log('cancel')
            setFullNameFocus(false)
            return
        default:
            return
        }
    }

    //Handle Menu
    const handleClick= (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }
    return (
        <Box 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                minHeight: '100%',
                maxWidth: '780px',
                margin: '0px auto',
                paddingTop: '0px',
                paddingRight: '20px',
                paddingLeft: '20px',
                paddingBottom: '32px'
            }}
        >
            {/* Header Document section */}
            <Box>
                <Typography variant='h6' sx={{ m: '18px 0' }}>Hồ sơ và chế độ hiển thị</Typography>
                <Typography sx={{ m: '12px 0' }}>Quản lý thông tin cá nhân của bạn, đồng thời kiểm soát thông tin nào người khác xem được và ứng dụng nào có thể truy cập.</Typography>
                <Link sx={{ 
                    textDecoration: 'none',
                    color: theme => theme.palette.mode === 'dark' ? `${theme.palette.primary.light}` : theme.palette.primary.main,
                    '&:hover': { textDecoration: 'underline', cursor: 'pointer' } 
                }}>Tìm hiểu thêm về hồ sơ và chế độ hiển thị của bạn </Link> 
                    hoặc 
                <Link sx={{ 
                    textDecoration: 'none',
                    color: theme => theme.palette.mode === 'dark' ? `${theme.palette.primary.light}` : theme.palette.primary.main,
                    '&:hover': { textDecoration: 'underline', cursor: 'pointer' }
                }}> xem chính sách quyền riêng tư của chúng tôi.</Link>
            </Box>

            {/* Avatar & Image header section */}
            <Typography sx={{ m: '32px 0 12px' }} variant='subtitle2'>Ảnh hồ sơ và ảnh tiêu đề</Typography>

            <Box sx={{ 
                borderRadius: '4px', 
                boxShadow: theme => theme.palette.mode === 'dark' ? `0px 1px 1px ${theme.palette.primary.light}` : '0px 1px 1px  #091E4240',
                display: 'flex',
                justifyContent: 'space-between', 
                position: 'relative' }}
            >
                {/* Image header */}
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '112px', 
                    borderRadius: '4px',
                    userSelect: 'none', 
                    '&:hover .uploadButton': {
                        opacity: '1'
                    }
                }}>
                    <Box sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '112px'
                    }}>
                        <Box 
                            sx={{ 
                                appearance: 'none',
                                height: '100%'
                            }}
                        >
                            { data.imageHeader !== '' ? 
                                <Box>
                                    <img style={{ 
                                        width: '100%',
                                        height: '112px',
                                        border: '2px solid white',
                                        objectFit: 'cover',
                                        verticalAlign: 'top'
                                    }}
                                    src={`${API_ROOT}${data.imageHeader}`}
                                    ></img>
                                </Box> 
                                : 
                                <Box sx={{
                                    boxSizing: 'border-box',
                                    appearance: 'none',
                                    borderRadius: '4px', 
                                    border: 'none',
                                    width: '100%',
                                    height: '112px', 
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center center',
                                    overflow: 'hidden',
                                    backgroundImage: 'linear-gradient(270deg, rgb(255, 179, 201) 0%, rgb(244, 110, 139) 100%)'
                                }}>
                                </Box>
                            }

                            <Box 
                                className='uploadButton'
                                sx={{ 
                                    opacity:  open ? 1 : 0,
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                    height: '112px',
                                    background: 'gray',
                                    cursor: 'pointer'
                                }}
                            >
                                <Box 
                                    role="button"
                                    tabIndex={0} 
                                    sx={{ 
                                        width: '100%', 
                                        height: '100%', 
                                        display: 'flex', 
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center', 
                                        color: theme => theme.palette.primary.main
                                    }} 
                                    onClick={handleMenuThroughImageIcon}
                                >
                                    <Typography ref={imageRef} onClick={handleClick}><Image/></Typography>
                                    <Typography sx={{ marginTop: '12px' }}>Thay đổi ảnh tiêu đề</Typography>
                                </Box>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    sx={{ marginTop: '12px', marginLeft: '10px' }}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button'
                                    }}
                                    transformOrigin={{ horizontal: 'center', vertical: 'top' }}
                                >
                                    <MenuItem onClick={handleClickUploadHeaderImage}>Tải ảnh lên</MenuItem>
                                    <MenuItem disabled={ data.imageHeader ? false : true }>Xóa ảnh</MenuItem>
                                </Menu>
                            </Box>
                        </Box>
                        <Input inputRef={uploadHeaderImageRef} onChange={handleImageHeaderChange} sx={{ display: 'none' }} type='file'/>
                    </Box>
                </Box>
                
                {/* Avatar */}
                <Box sx={{
                    ml: '48px',
                    mt: '38px'
                }}>
                    <Box sx={{
                        position: 'relative',
                        height: '96px',
                        width: '96px'
                    }}>
                        <Box 
                            sx={{ 
                                appearance: 'none',
                                height: '100%',
                                '&:hover .uploadAvatarIcon': {
                                    opacity: 0.6,
                                    cursor: 'pointer'
                                }
                            }}
                        >
                            { data.avatar === '' ? 
                                <Box>
                                    <img style={{ 
                                        height: '96px',
                                        width: '96px',
                                        position: 'absolute',
                                        objectFit: 'cover',
                                        verticalAlign: 'top'
                                    }}
                                    src={`${API_ROOT}${data.imageHeader}`}
                                    ></img>
                                </Box> 
                                : 
                                <Box>
                                    <Avatar sx={{
                                        color: theme => theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
                                        height: '96px',
                                        width: '96px',
                                        position: 'absolute'
                                    }}>
                                    </Avatar>
                                </Box>
                            }

                            <Box 
                                className='uploadAvatarIcon'
                                sx={{ 
                                    opacity: 0,
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)'
                                }}
                            >
                                <CameraAltOutlined 
                                    role="button"
                                    tabIndex={0}
                                    onClick={handleUploadAvatarThroughCameraIcon} ref={cameraIconRef}
                                />
                            </Box>
                        </Box>
                        <Input inputRef={uploadAvatarRef} onChange={handleAvatarChange} sx={{ display: 'none' }} type='file'/>
                    </Box>
                </Box>

                {/* Who? */}
                <Box sx={{     
                    marginTop: '38px',
                    marginLeft: '48px',
                    height: '66px',
                    width: '240px',
                    p: '0 16px 16px',
                    mt: '112px'
                }}>
                    <Box sx={{ display: 'flex', width: '100%', gap: 1, alignItems: 'center' }}>
                        <Typography sx={{ ml: '3px', '&.MuiTypography-body1': { fontSize: '0.7rem' } }}>Ai có thể xem ảnh hồ sơ của bạn?</Typography>
                        <Tooltip title='Mục cài đặt chế độ hiển thị chỉ áp dụng cho ảnh hồ sơ của bạn. Mọi người luôn có thể xem hình ảnh tiêu đề của bạn.'>
                            <InfoOutlined fontSize='small'/>
                        </Tooltip>
                    </Box>
                    <Tooltip title='Nếu bạn tải lên một ảnh hồ sơ, bạn sẽ có thể chọn người xem ảnh hồ sơ đó.'>
                        <Box sx={{ display: 'flex', width: '100%', height: '40px', gap: 1, alignItems: 'center' }}>
                            <Public/><Typography sx={{ cursor: 'not-allowed' }}>Bất kỳ ai</Typography>
                        </Box>
                    </Tooltip>
                </Box>
            </Box>

            {/* Introduction */}
            <Typography sx={{ m: '32px 0 12px' }} variant='subtitle2'>Giới thiệu về bạn</Typography>

            <Paper sx={{ padding: '12px' }}>
                <Box sx={{ m: '12px', float: 'right' }}><Typography>Ai có thể thấy được nội dung này?</Typography></Box>
                <Box 
                    sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignContent: 'center',
                        width: '100%',
                        height: '70px', 
                        m: '0 0 12px' 
                    }}
                >
                    <Box sx={{ position: 'relative', height: '70px' }}>
                        <TextField
                            label='Họ tên'
                            value={fullName}
                            onFocus={e => handleFocus(e, 'fullName')}
                            onChange={e => handleChangeValue(e, 'fullName')}
                            onBlur={(e) => {
                                const focusedElement = e.relatedTarget
                                focusedElement?.dataset?.action === 'confirm' ? 
                                    handleEditTextField(e, 'fullName') :
                                    handleCancelEditTextField('fullName')
                            }}
                            sx={{ 
                                '& .MuiOutlinedInput-root': {
                                    height: '100%',
                                    
                                    '& .MuiOutlinedInput-input':{
                                        width: '180px',
                                        p: '23.5px 0 23.5px 12px'
                                    },
                                    '& .MuiOutlinedInput-input:not(:focus) + .MuiOutlinedInput-notchedOutline':{
                                        border: 'none'
                                    }
                                }
                            }}
                        >
                        </TextField>

                        <Box
                            sx={{ 
                                display: fullNameFocus ? 'flex' : 'none',
                                position: 'absolute',
                                top: '50%',
                                left: '200px',
                                transform: 'translateY(-50%)' 
                            }}>
                            <Paper sx={{ height: '32px', width: '32px', mr: '4px' }}>
                                <Button
                                    data-action='confirm'
                                    onClick={() => handleEditTextField('fullName')} 
                                    sx={{ height: '32px', width: '32px', p: 0, minWidth: '32px' }}
                                >
                                    <Check/>
                                </Button>
                            </Paper>
                            <Paper sx={{ height: '32px', width: '32px' }}>
                                <Button
                                    onClick={() => handleCancelEditTextField('fullName')} 
                                    sx={{ height: '32px', width: '32px', p: 0, minWidth: '32px' }}
                                >
                                    <Close/>
                                </Button>
                            </Paper>
                        </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignContent: 'center', width: '200px' }}>
                        <Tooltip title='Nếu bạn tải lên một ảnh hồ sơ, bạn sẽ có thể chọn người xem ảnh hồ sơ đó.'>
                            <Box sx={{ display: 'flex', width: '100%', gap: 1, alignItems: 'center' }}>
                                <Public/><Typography sx={{ cursor: 'not-allowed' }}>Bất kỳ ai</Typography>
                            </Box>
                        </Tooltip>
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}

export default DocumentPage