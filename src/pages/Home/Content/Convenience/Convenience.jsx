import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { CalendarIcon, FairyIcon } from '~/assets/icon'

export default function Convenience() {
    const styleBox = { 
        width: { xs: '80%', md: '70%' }, 
        display: 'flex', 
        flexWrap: 'wrap',
        alignItems: 'center',
        padding: { xs: '12px', md: '32px' },
        bgcolor: 'white',
        borderRadius: '10px',
        mb: '24px'
    }

    const styleBoxDiscription = {
        container: { 
            width: { xs: '100%', md: '60%' }, 
            display: 'flex',
            pl: '32px',
            mt: { xs: '32px', md: 0 },
            flexWrap: 'wrap'
        },
        title: { 
            mb: '12px', 
            display: 'flex',
            alignItems: 'center',
            '&.MuiTypography-body1': {
                fontSize: '1rem' 
            }
        },
        desc: {
            display: 'flex',
            alignItems: 'center', 
            '&.MuiTypography-body1': {
                fontSize: '1.1rem'
            } 
        }
    }

    const styleImage = {
        width: '100%',
        aspectRatio: '16 / 9'
    }

    const styleIcon = { width: '1.6rem', height: '1.6rem', color: '#ff9a9cc4', marginRight: '8px' }
    return (
        <Box 
            sx={{ 
                width: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                bgcolor: theme => theme.trelloCustom.myColor

            }}>
            <Box 
                sx={{ 
                    width: { xs: '80%', md: '70%' }, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    padding: { xs: '24px 0', md: '32px 48px 32px 48px' },
                    color: 'white',
                    textAlign: 'center'
                }}>
                <Typography variant='h6' sx={{ fontWeight: '600', fontSize: '2rem' }}>Từ thư đến hành động</Typography>
                <Typography 
                    sx={{ 
                        textAlign: 'center', 
                        '&.MuiTypography-body1': {
                            fontSize: '1.2rem'
                        }
                    }}>
                    Nhanh chóng biến thông tin liên lạc từ các ứng dụng bạn yêu thích thành việc cần làm, sắp xếp tất cả các cuộc thảo luận và nhiệm vụ của bạn ở một nơi.
                </Typography>
            </Box>

            <Box 
                sx={styleBox}>
                <Box 
                    component='img'
                    style={styleImage} 
                    src="https://images.ctfassets.net/rz1oowkt5gyp/2QvggeQ9nzUdaDnhJCSUwA/3ef97067e1aa3d0a5e6a04b5780fd751/email-todos.png?w=1110&fm=webp" alt="" 
                />
                <Box 
                    sx={styleBoxDiscription.container}>
                    <Typography 
                        sx={styleBoxDiscription.title}>
                        <FairyIcon style={styleIcon}/>
                        ĐIỀU KỲ DIỆU VỚI EMAIL
                    </Typography>

                    <Typography
                        sx={styleBoxDiscription.desc}>
                        Dễ dàng biến email thành việc cần làm! Chỉ cần chuyển tiếp email tới hộp thư đến Trello
                        và Atlassian Intelligence (AI) sẽ chuyển những email này thành việc cần làm được sắp xếp
                        khoa học kèm theo mọi liên kết bạn cần.                    
                    </Typography>
                </Box>
            </Box>

            <Box 
                sx={{ 
                    ...styleBox,
                    mb: '-128px',
                    boxShadow: 'rgba(9, 30, 66, 0.15) 0px 0.5rem 1rem 0px'
                }}>
                <Box 
                    component={'img'} 
                    sx={{ ...styleImage, display: { xs: 'block', md: 'none' } }} 
                    src="https://images.ctfassets.net/rz1oowkt5gyp/3r1BvsfEsj4THe6YwpBOVy/2b1befa1e5e3522a2b0daae0dd3f3de0/slackteams-to-inbox.png?w=1110&fm=webp" alt="" />
                <Box 
                    sx={{ ...styleBoxDiscription.container, mr: '16px' }}>
                    <Typography sx={styleBoxDiscription.title}>
                        <CalendarIcon style={{ ...styleIcon, width: '3.6rem', height: '3.6rem' }}/>
                        PHÉP MÀU CỦA ỨNG DỤNG TIN NHẮN
                    </Typography>
                    
                    <Typography sx={styleBoxDiscription.desc}>
                        Bạn cần theo dõi tin nhắn từ Slack hoặc Microsoft Teams? Hãy gửi thẳng tin nhắn đến bảng Trello! Giao diện ứng dụng yêu thích, cho phép bạn lưu thư, sẽ xuất hiện trong hộp thư đến Trello nhờ các liên kết và bản tóm tắt do AI tạo.                    
                    </Typography>
                </Box>
                <Box 
                    component={'img'} 
                    sx={{ ...styleImage, display: { xs: 'none', md: 'block' } }} 
                    src="https://images.ctfassets.net/rz1oowkt5gyp/3r1BvsfEsj4THe6YwpBOVy/2b1befa1e5e3522a2b0daae0dd3f3de0/slackteams-to-inbox.png?w=1110&fm=webp" alt="" />
            </Box>
        </Box>
    )
}