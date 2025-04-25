// MUI Component
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

// Another
import { useEffect, useState } from 'react'

// My import
import { getInforUserApi } from '~/apis'
import { Tooltip } from '@mui/material'
const AccountOptionPage = () => {
    const [user, setUser] = useState(null)
    const [token] = useState(localStorage.getItem('token'))

    useEffect(() => {
        token && getInforUserApi().then((userInfo) => {
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
            <Box>
                <Typography variant='h6' sx={{ m: '12px 0' }}>Tùy chọn tài khoản</Typography>
                <Typography sx={{ m: '12px 0' }}>
                    Kiểm soát cài đặt liên quan đến tài khoản của bạn.
                </Typography>
            </Box>

            <Typography sx={{ m: '12px 0 12px' }} variant='subtitle2'>Xóa tài khoản</Typography>

            <Paper sx={{ padding: '12px' }}>
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
                        Khi xóa tài khoản, bạn sẽ mất quyền truy cập vào các dịch vụ trên tài khoản Sariii nè! và chúng tôi sẽ xóa vĩnh viễn dữ liệu cá nhân của bạn. Bạn có thể hủy hành động xóa trong vòng 14 ngày.                     
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
                                Xóa tài khoản
                            </Button>
                        </Tooltip>
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}

export default AccountOptionPage