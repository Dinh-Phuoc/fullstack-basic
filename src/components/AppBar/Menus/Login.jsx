import { Facebook, Google } from '@mui/icons-material'
import { Button, FormControl, Stack, TextField, Typography } from '@mui/material'
import { forwardRef, useImperativeHandle, useRef } from 'react'

const Login = forwardRef(({ onClick, ...props }, ref ) => {
    const userNameRef = useRef()
    const passwordRef = useRef()

    const passProps = {
        onClick,
        ...props
    }

    useImperativeHandle(ref, () => ({
        getChildrenRef: () => ({
            userName: userNameRef.current?.value,
            password: passwordRef.current?.value
        })
    }))
    
    return (
        <form>
            <Stack spacing={2}>
                <FormControl>
                    <TextField
                        inputRef={userNameRef} 
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
                        inputRef={passwordRef} 
                        sx={{ 
                            '& input': {
                                p: '8px'
                            },
                            '& .MuiInputLabel-root': {
                                top: '-6px'
                            } 
                        }} 
                        label='Mật khẩu' type='password' id="passwordlogin" aria-describedby="my-helper-text" />
                </FormControl>

                <Button variant='outlined' onClick={passProps.onClick}>Đăng nhập</Button>
                <Typography sx={{ textAlign: 'center' }} variant='body1'> Hoặc </Typography>
                <Button variant='outlined'>Đăng nhập bằng Facebook <Facebook /></Button>
                <Button variant='outlined'>Đăng nhập bằng Google <Google/></Button>
            </Stack>
        </form>
    )
}) 

export default Login