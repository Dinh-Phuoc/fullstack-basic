import { Facebook, Google } from '@mui/icons-material'
import { Button, FormControl, Input, InputLabel, Stack, TextField, Typography } from '@mui/material'

export default function Login() {
    const handleLogin = () => {
        console.log('Login success')
    }
    return (
        <form>
            <Stack spacing={2}>
                <FormControl>
                    <TextField 
                        sx={{ 
                            '& input': {
                                p: '8px'
                            },
                            '& .MuiInputLabel-root': {
                                top: '-6px'
                            } 
                        }} 
                        label='Tài khoản' id="usernamelogin" aria-describedby="my-helper-text" />
                </FormControl> 

                <FormControl>
                    <TextField 
                        sx={{ 
                            '& input': {
                                p: '8px'
                            },
                            '& .MuiInputLabel-root': {
                                top: '-6px'
                            } 
                        }} 
                        label='Mật khẩu' id="passwordlogin" aria-describedby="my-helper-text" />
                </FormControl>

                <Button variant='outlined' onClick={handleLogin}>Đăng nhập</Button>
                <Typography sx={{ textAlign: 'center' }} variant='body1'> Hoặc </Typography>
                <Button variant='outlined'>Đăng nhập bằng Facebook <Facebook /></Button>
                <Button variant='outlined'>Đăng nhập bằng Google <Google/></Button>
            </Stack>
        </form>
    )
} 