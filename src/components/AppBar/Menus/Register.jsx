import { Facebook, Google } from '@mui/icons-material'
import { Box, Button, FormControl, Input, InputLabel, Stack, Typography } from '@mui/material'

export default function Register() {
    const handleRegister = () => {
        console.log('register success')
    }
    return (
        <Box>
            <Stack spacing={2}>
                <FormControl>
                    <InputLabel htmlFor="username">Tài khoản</InputLabel>
                    <Input id="username" aria-describedby="my-helper-text" />
                </FormControl> 
                <FormControl>
                    <InputLabel htmlFor="password">Mật khẩu</InputLabel>
                    <Input id="password" aria-describedby="my-helper-text" />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="repassword">Nhập lại mật khẩu</InputLabel>
                    <Input id="repassword" aria-describedby="my-helper-text" />
                </FormControl>
                <Button variant='outlined' onClick={handleRegister}>Đăng ký</Button>
                <Typography sx={{ textAlign: 'center' }} variant='body1'> Hoặc </Typography>
                <Button variant='outlined'>Đăng nhập bằng Facebook <Facebook /></Button>
                <Button variant='outlined'>Đăng nhập bằng Google <Google/></Button>
            </Stack>
        </Box>
    )
} 