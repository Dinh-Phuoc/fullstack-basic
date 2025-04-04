import { Box, FormControl, Input, InputLabel } from '@mui/material'

export default function Login() {
    return (
        <Box>
            <FormControl>
                <InputLabel htmlFor="username">Tài khoản</InputLabel>
                <Input id="username" aria-describedby="my-helper-text" />
            </FormControl> 
            <FormControl>
                <InputLabel htmlFor="password">Mật khẩu</InputLabel>
                <Input id="password" aria-describedby="my-helper-text" />
            </FormControl>
        </Box>
    )
} 