import { Facebook, Google } from '@mui/icons-material'
import { Box, Button, FormControl, Input, InputLabel, Stack, Typography } from '@mui/material'
const style = {
    '.MuiFormControl-root': {
        mt: 2
    },
    '& .MuiInputBase-root .MuiInput-root': {
        mt: 1
    },
    '& .Mui-focused': {
        fontSize: '1.1rem'
    } 
}
export default function Login() {
    const handleLogin = () => {
        console.log('register success')
    }
    return (
        <Box>
            <Stack spacing={3}>
                <FormControl 
                    sx={style}
                >
                    <InputLabel htmlFor="username">Tài khoản</InputLabel>
                    <Input id="username" aria-describedby="my-helper-text" />
                </FormControl> 

                <FormControl sx={style}>
                    <InputLabel htmlFor="password">Mật khẩu</InputLabel>
                    <Input id="password" aria-describedby="my-helper-text" />
                </FormControl>

                <Button variant='outlined' onClick={handleLogin}>Đăng nhập</Button>
                <Typography sx={{ textAlign: 'center' }} variant='body1'> Hoặc </Typography>
                <Button variant='outlined'>Đăng nhập bằng Facebook <Facebook /></Button>
                <Button variant='outlined'>Đăng nhập bằng Google <Google/></Button>
            </Stack>
        </Box>
    )
} 