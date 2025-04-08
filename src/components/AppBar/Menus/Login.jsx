import { Facebook, Google } from '@mui/icons-material'
import { Box, Button, FormControl, Input, InputLabel, Stack, Typography } from '@mui/material'

export default function Login() {
    const handleLogin = () => {
        console.log('Login success')
    }
    return (
        <Box>
            <Stack spacing={2}>
                <FormControl>
                    <InputLabel htmlFor="username">Tài khoản</InputLabel>
                    <Input id="usernamelogin" aria-describedby="my-helper-text" />
                </FormControl> 

                <FormControl>
                    <InputLabel htmlFor="password">Mật khẩu</InputLabel>
                    <Input id="passwordlogin" aria-describedby="my-helper-text" />
                </FormControl>

                <Button variant='outlined' onClick={handleLogin}>Đăng nhập</Button>
                <Typography sx={{ textAlign: 'center' }} variant='body1'> Hoặc </Typography>
                <Button variant='outlined'>Đăng nhập bằng Facebook <Facebook /></Button>
                <Button variant='outlined'>Đăng nhập bằng Google <Google/></Button>
            </Stack>
        </Box>
    )
} 