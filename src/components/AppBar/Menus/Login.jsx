import { Facebook, Google } from '@mui/icons-material'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
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
        <Box>
            <Stack spacing={2}>
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
                    onKeyDown={(e) => {
                        if (e.key.toLowerCase() === 'l') {
                            e.stopPropagation()
                        }
                    }}
                    label='Tài khoản' id="usernamelogin" aria-describedby="my-helper-text" 
                />

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
                    onKeyDown={(e) => {
                        if (e.key.toLowerCase() === 'l') {
                            e.stopPropagation()
                        }
                    }}
                    label='Mật khẩu' type='password' id="passwordlogin" aria-describedby="my-helper-text" 
                />


                <Button variant='outlined' onClick={passProps.onClick}>Đăng nhập</Button>
                <Typography sx={{ textAlign: 'center' }} variant='body1'> Hoặc </Typography>
                <Button variant='outlined'>Đăng nhập bằng Facebook <Facebook /></Button>
                <Button variant='outlined'>Đăng nhập bằng Google <Google/></Button>
            </Stack>
        </Box>
    )
}) 

export default Login