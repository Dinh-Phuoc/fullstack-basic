import { Image, InfoOutlined, Public } from '@mui/icons-material'

import { Box, Typography, Link, Tooltip, Avatar, Button, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'

const DocumentPage = () => {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
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
            <Box>
                <Typography variant='h6' sx={{ m: '18px 0' }}>Hồ sơ và chế độ hiển thị</Typography>
                <Typography sx={{ m: '12px 0' }}>Quản lý thông tin cá nhân của bạn, đồng thời kiểm soát thông tin nào người khác xem được và ứng dụng nào có thể truy cập.</Typography>
                <Link sx={{ 
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline', cursor: 'pointer' } 
                }}>Tìm hiểu thêm về hồ sơ và chế độ hiển thị của bạn </Link> 
                    hoặc 
                <Link sx={{ textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline', cursor: 'pointer' }
                }}> xem chính sách quyền riêng tư của chúng tôi.</Link>
            </Box>

            <Typography sx={{ m: '32px 0 12px' }} variant='subtitle2'>Ảnh hồ sơ và ảnh tiêu đề</Typography>
            <Box sx={{ 
                borderRadius: '4px', 
                boxShadow: '0px 1px 1px  #091E4240',
                display: 'flex',
                justifyContent: 'space-between', 
                position: 'relative' }}>
                <Box sx={{
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '112px', 
                    borderRadius: '4px', 
                    position: 'absolute'
                }}>
                    <Box
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: '112px',
                            userSelect: 'none'
                        }}
                    >
                        <Image/>
                        <Typography>Thay đổi ảnh tiêu đề</Typography>
                    </Box>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button'
                        }}
                        sx={{
                            top: '0',
                            left: '0'
                        }}
                    >
                        <MenuItem onClick={handleClose}>Tải ảnh lên</MenuItem>
                        <MenuItem onClick={handleClose}>Xóa ảnh</MenuItem>
                    </Menu>
                    <Box sx={{ display: 'none' }}>
                        <img style={{ 
                            width: '100%',
                            height: '112px',
                            border: '2px solid white',
                            objectFit: 'cover',
                            verticalAlign: 'top'
                        }}
                        src='https://scontent.fsgn2-6.fna.fbcdn.net/v/t1.6435-9/182679323_979517696186624_5109801929113586998_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeGCgXgOtlVfm6hTG_koc9FldiyHSakka6Z2LIdJqSRrpgZxpGpI0EgFAvlWUTCjyi-EizzHpMFgmjpGONz_wm26&_nc_ohc=cH53pvMz5L8Q7kNvwGkJCup&_nc_oc=AdmUiUxCDInp0JYoEh_aKPWgvizNigm48FXeGjud50c0dWYvNici5jsck-P5AvPWyWA&_nc_zt=23&_nc_ht=scontent.fsgn2-6.fna&_nc_gid=-XHlIAyq8zGmJZLzrWgPXg&oh=00_AfFHNXdMgyxdwXrvWsn4aSSe7tBTUwqBvULd0vzbmxB95w&oe=68284EF7'
                        ></img>
                    </Box>
                </Box>

                <Box sx={{     
                    marginTop: '38px',
                    marginLeft: '48px',
                    height: '100px'
                }}>
                    <Avatar sx={{
                        height: '96px',
                        width: '96px',
                        position: 'absolute'
                    }}>
                    </Avatar>
                </Box>

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
        </Box>
    )
}

export default DocumentPage