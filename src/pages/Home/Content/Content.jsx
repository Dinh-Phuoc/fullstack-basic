// MUI Component
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'

// MUI Icon
import { Tooltip } from '@mui/material'
const Content = () => {
    return (
        <Box 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                minHeight: '100vh',
                maxWidth: '780px',
                marginX: 'auto',
                mt: (theme) => theme.trelloCustom.appBarHeight,
                mb: 0,
                paddingTop: '0px',
                paddingRight: '20px',
                paddingLeft: '20px',
                paddingBottom: '32px'
            }}
        >
            {/* Header Document section */}
            <Box>
                <Typography variant='h6' sx={{ m: '12px 0' }}>Quyền riêng tư</Typography>
                <Typography sx={{ m: '12px 0' }}>
                    Vì quyền riêng tư của bạn rất quan trọng đối với chúng tôi nên chúng tôi minh bạch trong việc thu thập, sử dụng và chia sẻ thông tin về bạn.
                </Typography>
            </Box>

            <Typography sx={{ m: '12px 0 12px' }} variant='subtitle2'>Tùy chọn cookie</Typography>
            {/* Introduction */}

            <Paper sx={{ padding: '12px' }}>
                {/* Full Name */}
                <Box 
                    sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignContent: 'center',
                        width: '100%',
                        m: '0 0 12px' 
                    }}
                >
                    <Box sx={{ position: 'relative' }}>
                        <Typography sx={{ m: '12px 0' }}>
                            Khi bạn truy cập sản phẩm của Sariii nè!, sản phẩm đó có thể lưu trữ hoặc truy xuất thông tin từ trình duyệt của bạn, 
                            chủ yếu dưới dạng cookie. Thông tin này có thể là về bạn, tùy chọn hoặc thiết bị của bạn và chủ yếu dùng để giúp cho 
                            trang web hoạt động như bạn mong đợi. Thông tin này thường không chỉ đích danh bạn, nhưng sẽ cung cấp cho bạn trải 
                            nghiệm web phù hợp hơn. Chúng tôi tôn trọng quyền riêng tư của bạn. Vì vậy, bạn có thể chọn loại cookie mà bạn cho phép. 
                            Thông báo Cookie và Theo dõi của Sariii nè!                        
                        </Typography>
                        <Tooltip title='Chức năng đang trong quá trình phát triền :(((('>
                            <Button 
                                variant='outlined' 
                                sx={{ 
                                    color: theme => theme.palette.mode === 'dark' ? 
                                        theme.palette.primary.light : theme.palette.primary.main,
                                    borderColor: theme => theme.palette.mode === 'dark' ? 
                                        theme.palette.primary.light : theme.palette.primary.main
                                }}>
                                Mở tùy chọn cookie
                            </Button>
                        </Tooltip>
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}

export default Content