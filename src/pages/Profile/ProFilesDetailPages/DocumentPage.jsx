// MUI Component
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Tooltip from '@mui/material/Tooltip'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Input from '@mui/material/Input'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

// MUI Icon
import CameraAltOutlined from '@mui/icons-material/CameraAltOutlined'
import Check from '@mui/icons-material/Check'
import Close from '@mui/icons-material/Close'
import Image from '@mui/icons-material/Image'
import InfoOutlined from '@mui/icons-material/InfoOutlined'
import Public from '@mui/icons-material/Public'

// React
import { useEffect, useRef, useState } from 'react'

// My import
import { getInforUserApi, updateProfileApi, uploadAvatarApi, uploadImageHeaderApi } from '~/apis'
import { API_ROOT } from '~/utils/constant'
import { toast } from 'react-toastify'

const DocumentPage = ({ handleUpdate }) => {
    // const negative = useNavigate()
    // const [, dispatch] = useContext(UserContext)
    const [anchorEl, setAnchorEl] = useState(null)
    const uploadHeaderImageRef = useRef()
    const imageRef = useRef()
    const open = Boolean(anchorEl)
    const [user, setUser] = useState(null)
    const [token] = useState(localStorage.getItem('token'))

    // States of personal information
    const [fullName, setFullName] = useState(null)
    const [jobTitle, setJobTitle] = useState(null)
    const [address, setAddress] = useState(null)
    const [department, setDepartment] = useState(null)

    const uploadAvatarRef = useRef()
    const cameraIconRef = useRef()

    const [prevValue, setPreValue] = useState('Prev')
    const [fullNameFocus, setFullNameFocus] = useState(false)
    const [jobTitleFocus, setJobTitleFocus] = useState(false)
    const [departmentFocus, setDepartmentFocus] = useState(false)
    const [addressFocus, setAddressFocus] = useState(false)

    const [avatarURL, setAvatarURL] = useState(null)
    const [imageHeaderURL, setImageHeaderURL] = useState(null)
    

    const styleInput = { 
        '& .MuiOutlinedInput-root': {
            height: '100%',
            
            '& .MuiOutlinedInput-input':{
                width: '200px',
                p: '9.5px 12px',
                textOverflow: 'ellipsis'
            },
            '& .MuiOutlinedInput-input:not(:focus) + .MuiOutlinedInput-notchedOutline':{
                border: 'none'
            },
            '& .MuiOutlinedInput-input:focus + .MuiOutlinedInput-notchedOutline':{
                borderColor: theme => theme.palette.mode === 'dark' ?
                    theme.palette.primary.light :
                    theme.palette.primary.main
            }
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: theme => theme.palette.mode === 'dark' ?
                theme.palette.primary.light :
                theme.palette.primary.main
        }
    }

    useEffect(() => {
        token && getInforUserApi().then((userInfo) => {
            setFullName(userInfo.fullName)
            setJobTitle(userInfo.jobTitle)
            setDepartment(userInfo.department)
            setAddress(userInfo.address)
            if (userInfo.avatar !== '') setAvatarURL(`${API_ROOT}/v1/manage/users/profile/get-image/avatar/${userInfo._id}/?t=${Date.now()}`)
            if (userInfo.imageHeader !== '') setImageHeaderURL(`${API_ROOT}/v1/manage/users/profile/get-image/image-header/${userInfo._id}/?t=${Date.now()}`)
            setUser(userInfo)
        })
    }, [token])

    if (!user) {
        return (<Box sx={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '100vw',
            gap: 2
        }}>
            <CircularProgress/>
        </Box>)
    }

    //Handle Image Header Change group
    const handleImageHeaderChange = async (e) => {
        const imageHeader = e.target.files[0]
        if (!imageHeader) {
            return
        }

        const formData = new FormData()
        formData.append('image-header', imageHeader)

        const isUploadImageHeaderSuccess = await uploadImageHeaderApi(formData, user._id)
        if (isUploadImageHeaderSuccess) setImageHeaderURL(`${API_ROOT}/v1/manage/users/profile/get-image/image-header/${user._id}/?t=${Date.now()}`)
        handleUpdate()
    }

    const handleClickUploadHeaderImage = () => {
        setAnchorEl(uploadHeaderImageRef.current.click())
    }

    const handleMenuThroughImageIcon = () => {
        setAnchorEl(imageRef.current)
    }

    //Hande Avatar Change group
    const handleAvatarChange = async (e) => {
        const avatar = e.target.files[0]
        if (!avatar) {
            return
        }

        const formData = new FormData()
        formData.append('avatar', avatar)

        const isUploadAvatarSuccess = await uploadAvatarApi(formData, user._id)
        if (isUploadAvatarSuccess) setAvatarURL(`${API_ROOT}/v1/manage/users/profile/get-image/avatar/${user._id}/?t=${Date.now()}`)
        handleUpdate()
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
        case 'jobTitle':
            setJobTitleFocus(true)
            e.target.select()
            return
        case 'department':
            setDepartmentFocus(true)
            e.target.select()
            return
        case 'address':
            setAddressFocus(true)
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
        case 'jobTitle':
            setJobTitle(e.target.value)
            return
        case 'department':
            setDepartment(e.target.value)
            return
        case 'address':
            setAddress(e.target.value)
            return
        default:
            return
        }
    }

    const handleEditTextField = async (e, textFieldName) => {
        switch (textFieldName) {
        case 'fullName':
            if (e.target.value !== prevValue) {
                const result = await updateProfileApi(user._id, textFieldName, e.target.value)
                setFullName(e.target.value)
                setFullNameFocus(false)
                result.change ? toast.success('Cập nhật thành công') : toast.error('Cập nhật thất bại')
                return
            }
            setFullNameFocus(false)
            return

        case 'jobTitle':
            if (e.target.value !== prevValue) {
                const result = await updateProfileApi(user._id, textFieldName, e.target.value)
                setJobTitle(e.target.value)
                setJobTitleFocus(false)
                result.change ? toast.success('Cập nhật thành công') : toast.error('Cập nhật thất bại')
                return
            }
            setJobTitleFocus(false)
            return

        case 'department':
            if (e.target.value !== prevValue) {
                const result = await updateProfileApi(user._id, textFieldName, e.target.value)
                setDepartment(e.target.value)
                setDepartmentFocus(false)
                result.change ? toast.success('Cập nhật thành công') : toast.error('Cập nhật thất bại')
                return
            }
            setDepartmentFocus(false)
            return

        case 'address':
            if (e.target.value !== prevValue) {
                const result = await updateProfileApi(user._id, textFieldName, e.target.value)
                setAddress(e.target.value)
                setAddressFocus(false)
                result.change ? toast.success('Cập nhật thành công') : toast.error('Cập nhật thất bại')
                return
            }
            setAddressFocus(false)
            return

        default:
            return
        }
    }

    const handleCancelEditTextField = (textFieldName) => {
        switch (textFieldName) {
        case 'fullName':
            setFullName(prevValue)
            setFullNameFocus(false)
            return
        case 'jobTitle':
            setJobTitle(prevValue)
            setJobTitleFocus(false)
            return
        case 'department':
            setDepartment(prevValue)
            setDepartmentFocus(false)
            return
        case 'address':
            setAddress(prevValue)
            setAddressFocus(false)
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
                minHeight: '100vh',
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
                            { imageHeaderURL || user.imageHeader ? 
                                <Box>
                                    <img style={{ 
                                        width: '100%',
                                        height: '112px',
                                        border: '2px solid white',
                                        objectFit: 'cover',
                                        verticalAlign: 'top'
                                    }}
                                    src={ imageHeaderURL || user.imageHeader }
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
                                    <MenuItem disabled={ imageHeaderURL ||user.imageHeader ? false : true }>Xóa ảnh</MenuItem>
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
                            { avatarURL || user.avatar !== '' ? 
                                <Box>
                                    <img style={{ 
                                        height: '96px',
                                        width: '96px',
                                        borderRadius: '50%',
                                        position: 'absolute',
                                        objectFit: 'cover',
                                        verticalAlign: 'top'
                                    }}
                                    src={avatarURL || user.avatar}
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
                                    sx={{ color: 'white' }}
                                    aria-hidden="false"
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
                    marginLeft: { xs: 0, sm: '48px' },
                    height: '66px',
                    width: '240px',
                    p: '0 16px 16px',
                    mt: '116px'
                }}>
                    <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                        <Typography sx={{ mr: '4px', lineHeight: 1.2, '&.MuiTypography-body1': { fontSize: '0.7rem' } }}>Ai có thể xem ảnh hồ sơ của bạn?</Typography>
                        <Tooltip title='Mục cài đặt chế độ hiển thị chỉ áp dụng cho ảnh hồ sơ của bạn. Mọi người luôn có thể xem hình ảnh tiêu đề của bạn.'>
                            <InfoOutlined fontSize='small'/>
                        </Tooltip>
                    </Box>
                    <Tooltip title='Nếu bạn tải lên một ảnh hồ sơ, bạn sẽ có thể chọn người xem ảnh hồ sơ đó.'>
                        <Box sx={{ display: 'flex', width: '100%', height: '30px', gap: 1, alignItems: 'center' }}>
                            <Public sx={{ color: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : '#00000099' }} fontSize='small'/><Typography sx={{ cursor: 'not-allowed', '&.MuiTypography-body1': { fontSize: '0.7rem' }, color: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : '#00000099' }}>Bất kỳ ai</Typography>
                        </Box>
                    </Tooltip>
                </Box>
            </Box>

            {/* Introduction */}
            <Typography sx={{ m: '32px 0 12px' }} variant='subtitle2'>Giới thiệu về bạn</Typography>

            <Paper sx={{ padding: '12px' }}>
                <Box sx={{ m: '12px 0px 18px 12px', float: 'right' }}><Typography>Ai có thể thấy được nội dung này?</Typography></Box>

                {/* Full Name */}
                <Box 
                    sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignContent: 'center',
                        width: '100%',
                        height: '40px', 
                        m: '0 0 12px' 
                    }}
                >
                    <Box sx={{ position: 'relative', height: '40px' }}>
                        <TextField
                            label='Họ tên'
                            value={ fullName ? fullName : ''}
                            onFocus={e => handleFocus(e, 'fullName')}
                            onChange={e => handleChangeValue(e, 'fullName')}
                            onBlur={(e) => {
                                const focusedElement = e.relatedTarget
                                focusedElement?.dataset?.action === 'confirm' ? 
                                    handleEditTextField(e, 'fullName') :
                                    handleCancelEditTextField('fullName')
                            }}
                            sx={styleInput}
                        >
                        </TextField>

                        <Box
                            sx={{ 
                                display: fullNameFocus ? 'flex' : 'none',
                                position: 'absolute',
                                top: '50%',
                                left: '225px',
                                transform: 'translateY(-50%)' 
                            }}>
                            <Paper sx={{ height: '32px', bgcolor: theme => theme.palette.mode === 'dark' ? '#262626' : 'background.paper', width: '32px', mr: '4px' }}>
                                <Button
                                    data-action='confirm'
                                    onClick={() => handleEditTextField('fullName')} 
                                    sx={{ height: '32px', width: '32px', p: 0, color: '#ff9a9cc4', minWidth: '32px' }}
                                >
                                    <Check/>
                                </Button>
                            </Paper>
                            <Paper sx={{ height: '32px', bgcolor: theme => theme.palette.mode === 'dark' ? '#262626' : 'background.paper', width: '32px' }}>
                                <Button
                                    onClick={() => handleCancelEditTextField('fullName')} 
                                    sx={{ height: '32px', width: '32px', p: 0, color: '#ff9a9cc4', minWidth: '32px' }}
                                >
                                    <Close/>
                                </Button>
                            </Paper>
                        </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignContent: 'center', width: { xs: '24px', sm: '200px' } }}>
                        <Tooltip title='Nếu bạn tải lên một ảnh hồ sơ, bạn sẽ có thể chọn người xem ảnh hồ sơ đó.'>
                            <Box sx={{ display: 'flex', width: '100%', gap: 1, alignItems: 'center' }}>
                                <Public sx={{ color: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : '#00000099' }}/>
                                <Typography sx={{ display: { xs: 'none', sm: 'block' }, cursor: 'not-allowed', color: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : '#00000099' }}>Bất kỳ ai</Typography>
                            </Box>
                        </Tooltip>
                    </Box>
                </Box>
                
                {/* jobTitle */}
                <Box 
                    sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignContent: 'center',
                        width: '100%',
                        height: '40px', 
                        m: '0 0 12px' 
                    }}
                >
                    <Box sx={{ position: 'relative', height: '40px' }}>
                        <TextField
                            label='Chức danh'
                            value={ jobTitle ? jobTitle : ''}
                            onFocus={e => handleFocus(e, 'jobTitle')}
                            onChange={e => handleChangeValue(e, 'jobTitle')}
                            onBlur={(e) => {
                                const focusedElement = e.relatedTarget
                                focusedElement?.dataset?.action === 'confirmJobTitle' ? 
                                    handleEditTextField(e, 'jobTitle') :
                                    handleCancelEditTextField('jobTitle')
                            }}
                            sx={styleInput}
                        >
                        </TextField>

                        <Box
                            sx={{ 
                                display: jobTitleFocus ? 'flex' : 'none',
                                position: 'absolute',
                                top: '50%',
                                left: '225px',
                                transform: 'translateY(-50%)' 
                            }}>
                            <Paper sx={{ height: '32px', bgcolor: theme => theme.palette.mode === 'dark' ? '#262626' : 'background.paper', width: '32px', mr: '4px' }}>
                                <Button
                                    data-action='confirmJobTitle'
                                    onClick={() => handleEditTextField('jobTitle')} 
                                    sx={{ height: '32px', width: '32px', p: 0, color: '#ff9a9cc4', minWidth: '32px' }}
                                >
                                    <Check/>
                                </Button>
                            </Paper>
                            <Paper sx={{ height: '32px', bgcolor: theme => theme.palette.mode === 'dark' ? '#262626' : 'background.paper', width: '32px' }}>
                                <Button
                                    onClick={() => handleCancelEditTextField('jobTitle')} 
                                    sx={{ height: '32px', width: '32px', p: 0, color: '#ff9a9cc4', minWidth: '32px' }}
                                >
                                    <Close/>
                                </Button>
                            </Paper>
                        </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignContent: 'center', width: { xs: '24px', sm: '200px' } }}>
                        <Tooltip title='Nếu bạn tải lên một ảnh hồ sơ, bạn sẽ có thể chọn người xem ảnh hồ sơ đó.'>
                            <Box sx={{ display: 'flex', width: '100%', gap: 1, alignItems: 'center' }}>
                                <Public sx={{ color: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : '#00000099' }}/><Typography sx={{ display: { xs: 'none', sm: 'block' }, cursor: 'not-allowed', color: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : '#00000099' }}>Bất kỳ ai</Typography>
                            </Box>
                        </Tooltip>
                    </Box>
                </Box>

                {/* Department */}
                <Box 
                    sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignContent: 'center',
                        width: '100%',
                        height: '40px', 
                        m: '0 0 12px' 
                    }}
                >
                    <Box sx={{ position: 'relative', height: '40px' }}>
                        <TextField
                            label='Phòng ban'
                            value={ department ? department : ''}
                            onFocus={e => handleFocus(e, 'department')}
                            onChange={e => handleChangeValue(e, 'department')}
                            onBlur={(e) => {
                                const focusedElement = e.relatedTarget
                                focusedElement?.dataset?.action === 'confirmDepartment' ? 
                                    handleEditTextField(e, 'department') :
                                    handleCancelEditTextField('department')
                            }}
                            sx={styleInput}
                        >
                        </TextField>

                        <Box
                            sx={{ 
                                display: departmentFocus ? 'flex' : 'none',
                                position: 'absolute',
                                top: '50%',
                                left: '225px',
                                transform: 'translateY(-50%)' 
                            }}>
                            <Paper sx={{ height: '32px', bgcolor: theme => theme.palette.mode === 'dark' ? '#262626' : 'background.paper', width: '32px', mr: '4px' }}>
                                <Button
                                    data-action='confirmDepartment'
                                    onClick={() => handleEditTextField('department')} 
                                    sx={{ height: '32px', width: '32px', p: 0, color: '#ff9a9cc4', minWidth: '32px' }}
                                >
                                    <Check/>
                                </Button>
                            </Paper>
                            <Paper sx={{ height: '32px', bgcolor: theme => theme.palette.mode === 'dark' ? '#262626' : 'background.paper', width: '32px' }}>
                                <Button
                                    onClick={() => handleCancelEditTextField('department')} 
                                    sx={{ height: '32px', width: '32px', p: 0, color: '#ff9a9cc4', minWidth: '32px' }}
                                >
                                    <Close/>
                                </Button>
                            </Paper>
                        </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignContent: 'center', width: { xs: '24px', sm: '200px' } }}>
                        <Tooltip title='Nếu bạn tải lên một ảnh hồ sơ, bạn sẽ có thể chọn người xem ảnh hồ sơ đó.'>
                            <Box sx={{ display: 'flex', width: '100%', gap: 1, alignItems: 'center' }}>
                                <Public sx={{ color: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : '#00000099' }}/><Typography sx={{ display: { xs: 'none', sm: 'block' }, cursor: 'not-allowed', color: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : '#00000099' }}>Bất kỳ ai</Typography>
                            </Box>
                        </Tooltip>
                    </Box>
                </Box>

                {/* Adress */}
                <Box 
                    sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignContent: 'center',
                        width: '100%',
                        height: '40px', 
                        m: '0 0 12px' 
                    }}
                >
                    <Box sx={{ position: 'relative', height: '40px' }}>
                        <TextField
                            label='Địa chỉ'
                            value={ address ? address : ''}
                            onFocus={e => handleFocus(e, 'address')}
                            onChange={e => handleChangeValue(e, 'address')}
                            onBlur={(e) => {
                                const focusedElement = e.relatedTarget
                                focusedElement?.dataset?.action === 'confirmAddress' ? 
                                    handleEditTextField(e, 'address') :
                                    handleCancelEditTextField('address')
                            }}
                            sx={styleInput}
                        >
                        </TextField>

                        <Box
                            sx={{ 
                                display: addressFocus ? 'flex' : 'none',
                                position: 'absolute',
                                top: '50%',
                                left: '225px',
                                transform: 'translateY(-50%)' 
                            }}>
                            <Paper sx={{ height: '32px', bgcolor: theme => theme.palette.mode === 'dark' ? '#262626' : 'background.paper', width: '32px', mr: '4px' }}>
                                <Button
                                    data-action='confirmAddress'
                                    onClick={() => handleEditTextField('address')} 
                                    sx={{ height: '32px', width: '32px', p: 0, color: '#ff9a9cc4', minWidth: '32px' }}
                                >
                                    <Check/>
                                </Button>
                            </Paper>
                            <Paper sx={{ height: '32px', bgcolor: theme => theme.palette.mode === 'dark' ? '#262626' : 'background.paper', width: '32px' }}>
                                <Button
                                    onClick={() => handleCancelEditTextField('address')} 
                                    sx={{ height: '32px', width: '32px', p: 0, color: '#ff9a9cc4', minWidth: '32px' }}
                                >
                                    <Close/>
                                </Button>
                            </Paper>
                        </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignContent: 'center', width: { xs: '24px', sm: '200px' } }}>
                        <Tooltip title='Nếu bạn tải lên một ảnh hồ sơ, bạn sẽ có thể chọn người xem ảnh hồ sơ đó.'>
                            <Box sx={{ display: 'flex', width: '100%', gap: 1, alignItems: 'center' }}>
                                <Public sx={{ color: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : '#00000099' }}/><Typography sx={{ display: { xs: 'none', sm: 'block' }, cursor: 'not-allowed', color: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : '#00000099' }}>Bất kỳ ai</Typography>
                            </Box>
                        </Tooltip>
                    </Box>
                </Box>
            </Paper>

            <Typography sx={{ m: '32px 0 12px' }} variant='subtitle2'>Liên hệ</Typography>
            <Paper sx={{ padding: '12px' }}>
                <Box sx={{ m: '12px 0px 18px 12px', float: 'right' }}><Typography>Ai có thể thấy được nội dung này?</Typography></Box>
                <Box 
                    sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignContent: 'center',
                        width: '100%',
                        height: '40px', 
                        m: '0 0 12px' 
                    }}
                >
                    <Box sx={{ height: '40px', pl: '24px', cursor: 'not-allowed' }}>
                        <Typography sx={{ color: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : '#00000099', '& .MuiTypography-body1': { fontSize: '0.7px' } }}> Địa chỉ email</Typography>
                        <Typography>{user.email}</Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignContent: 'center', width: { xs: '24px', sm: '200px' } }}>
                        <Tooltip title='Nếu bạn tải lên một ảnh hồ sơ, bạn sẽ có thể chọn người xem ảnh hồ sơ đó.'>
                            <Box sx={{ display: 'flex', width: '100%', gap: 1, alignItems: 'center' }}>
                                <Public sx={{ color: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : '#00000099' }}/><Typography sx={{ display: { xs: 'none', sm: 'block' }, cursor: 'not-allowed', color: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : '#00000099' }}>Bất kỳ ai</Typography>
                            </Box>
                        </Tooltip>
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}

export default DocumentPage