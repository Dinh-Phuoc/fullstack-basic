import { Facebook, Google } from '@mui/icons-material'
import { Button, FormControl, Stack, TextField, Typography } from '@mui/material'
import { useRef, useState } from 'react'

export default function Register() { 
    const userRef = useRef()
    const [messageError, setMessageError] = useState({ user: '', password: '', retype: '' })
    const [required, setRequired] = useState({ user: true, password: true, retype: true })
    const passwordRef = useRef()
    const retypePasswordRef = useRef()
    const validate = {
        minLength: (length) => {
            return length <= 6 && length >=1
        },
        isEmptyValue: (value) => {
            return value === ''
        },
        isSamePassword: (password, retypePassword) => {
            return password === retypePassword
        }
    }

    const handleUserValidator = (e) => {
        if (validate.minLength(e.target.value.length)) {
            setRequired(prev => ({ ...prev, user: true }))
            return setMessageError(prev => ({ ...prev, user: 'Tối thiểu 6 kí tự' }))
        }
        if (validate.isEmptyValue(e.target.value)) {
            setRequired(prev => ({ ...prev, user: true }))
            return setMessageError(prev => ({ ...prev, user: 'Không để trống' }))
        }
        setRequired(prev => ({ ...prev, user: false }))
        return setMessageError(prev => ({ ...prev, user: '' }))
    }

    const handlePassWordValidator = (e) => {
        if (validate.minLength(e.target.value.length)) {
            setRequired(prev => ({ ...prev, password: true }))
            return setMessageError(prev => ({ ...prev, password: 'Tối thiểu 6 kí tự' }))
        }
        if (validate.isEmptyValue(e.target.value)) {
            setRequired(prev => ({ ...prev, password: true }))
            return setMessageError(prev => ({ ...prev, password: 'Không để trống' }))
        }
        setRequired(prev => ({ ...prev, password: false }))
        return setMessageError(prev => ({ ...prev, password: '' }))
    }

    const handleReTypePassWordValidator = (e) => {
        if (validate.isEmptyValue(e.target.value)) {
            setRequired(prev => ({ ...prev, retype: true }))
            return setMessageError(prev => ({ ...prev, retype: 'Không để trống' }))
        }

        if (!validate.isSamePassword(passwordRef.current.value, e.target.value)) {
            setRequired(prev => ({ ...prev, retype: true }))
            return setMessageError(prev => ({ ...prev, retype: 'Mật khẩu không trùng khớp' }))
        }

        setRequired(prev => ({ ...prev, retype: false }))
        return setMessageError(prev => ({ ...prev, retype: '' }))
    }

    const handleValidator = () => {
        handleUserValidator()
        handlePassWordValidator()
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
                            },
                            '& .MuiFormLabel-asterisk': {
                                color: 'red'
                            },
                            '& .MuiFormHelperText-root': {
                                color: 'red'
                            } 
                        }}
                        spellCheck="false"
                        label='Tài khoản'
                        helperText={messageError.user}
                        onBlur={handleUserValidator}
                        required={required.user} 
                        inputRef={userRef} 
                        id="username" 
                        aria-describedby="my-helper-text" 
                    />
                </FormControl> 
                <FormControl>
                    <TextField
                        helperText={messageError.password}
                        required={required.password}
                        onBlur={handlePassWordValidator}
                        sx={{ 
                            '& input': {
                                p: '8px'
                            },
                            '& .MuiInputLabel-root': {
                                top: '-6px'
                                
                            },
                            '& .MuiFormLabel-asterisk': {
                                color: 'red'
                            },
                            '& .MuiFormHelperText-root': {
                                color: 'red'
                            } 
                        }}
                        inputRef={passwordRef} 
                        spellCheck="false"
                        label='Mật khẩu'
                        type='password' 
                        id="password" 
                        aria-describedby="my-helper-text" />
                </FormControl>
                <FormControl>
                    <TextField
                        required={required.retype} 
                        helperText={messageError.retype}
                        onBlur={handleReTypePassWordValidator}
                        sx={{ 
                            '& input': {
                                p: '8px'
                            },
                            '& .MuiInputLabel-root': {
                                top: '-6px'

                            },
                            '& .MuiFormLabel-asterisk': {
                                color: 'red'
                            },
                            '& .MuiFormHelperText-root': {
                                color: 'red'
                            } 
                        }}
                        spellCheck="false"
                        label='Nhập lại mật khẩu' 
                        inputRef={retypePasswordRef} 
                        id="repassword" 
                        type='password' 
                        aria-describedby="my-helper-text" />
                </FormControl>
                <Button variant='outlined' onClick={handleValidator}>Đăng ký</Button>
                <Typography sx={{ textAlign: 'center' }} variant='body1'> Hoặc </Typography>
                <Button variant='outlined'>Đăng nhập bằng Facebook <Facebook /></Button>
                <Button variant='outlined'>Đăng nhập bằng Google <Google/></Button>
            </Stack>
        </form>
    )
} 