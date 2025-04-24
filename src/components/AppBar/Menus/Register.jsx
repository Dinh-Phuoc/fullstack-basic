import { Facebook, Google } from '@mui/icons-material'
import { Button, FormControl, Stack, TextField, Typography } from '@mui/material'
import { forwardRef, useImperativeHandle, useState } from 'react'

const Register = forwardRef(( { onClick, ...props }, ref ) => { 
    const [userNameValue, setUserNameValue] = useState('')
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [retypePasswordValue, setRetypePasswordValue] = useState('')
    const [messageError, setMessageError] = useState({ user: '', password: '', retype: '', email: '' })
    const [required, setRequired] = useState({ user: true, password: true, retype: true, email: true })

    const passProps = {
        onClick,
        ...props
    }
    useImperativeHandle(ref, () => ({
        getChildrenValue: () => ({
            userName: userNameValue,
            password: passwordValue,
            email: emailValue
        })
    }))
    const validate = {
        minLength: (length) => {
            return length < 6 && length >=1
        },
        isEmail: (email) => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(email)
        },
        isEmptyValue: (value) => {
            return value === ''
        },
        isSamePassword: (password, retypePassword) => {
            return password === retypePassword
        }
    }

    const handleEmailValidator = () => {
        if (validate.minLength(emailValue.length)) {
            setRequired(prev => ({ ...prev, email: true }))
            return setMessageError(prev => ({ ...prev, email: 'Tối thiểu 6 kí tự' }))
        }
        if (validate.isEmptyValue(emailValue)) {
            setRequired(prev => ({ ...prev, email: true }))
            return setMessageError(prev => ({ ...prev, email: 'Không để trống' }))
        }
        if (!validate.isEmail(emailValue)) {
            return setMessageError(prev => ({ ...prev, email: 'Vui lòng nhập đúng email' }))
        }
        if (validate.isEmptyValue(emailValue)) {
            setRequired(prev => ({ ...prev, email: true }))
            return setMessageError(prev => ({ ...prev, email: 'Không để trống' }))
        }
        setRequired(prev => ({ ...prev, email: false }))
        setMessageError(prev => ({ ...prev, email: '' }))
        return true
    }

    const handleUserValidator = () => {
        if (validate.minLength(userNameValue.length)) {
            setRequired(prev => ({ ...prev, user: true }))
            return setMessageError(prev => ({ ...prev, user: 'Tối thiểu 6 kí tự' }))
        }
        if (validate.isEmptyValue(userNameValue)) {
            setRequired(prev => ({ ...prev, user: true }))
            return setMessageError(prev => ({ ...prev, user: 'Không để trống' }))
        }
        setRequired(prev => ({ ...prev, user: false }))
        setMessageError(prev => ({ ...prev, user: '' }))
        return true
    }

    const handlePassWordValidator = () => {
        if (validate.minLength(passwordValue.length)) {
            setRequired(prev => ({ ...prev, password: true }))
            return setMessageError(prev => ({ ...prev, password: 'Tối thiểu 6 kí tự' }))
        }
        if (validate.isEmptyValue(passwordValue)) {
            setRequired(prev => ({ ...prev, password: true }))
            return setMessageError(prev => ({ ...prev, password: 'Không để trống' }))
        }
        setRequired(prev => ({ ...prev, password: false }))
        setMessageError(prev => ({ ...prev, password: '' }))
        return true
    }

    const handleReTypePassWordValidator = () => {
        if (validate.isEmptyValue(retypePasswordValue)) {
            setRequired(prev => ({ ...prev, retype: true }))
            return setMessageError(prev => ({ ...prev, retype: 'Không để trống' }))
        }

        if (!validate.isSamePassword(passwordValue, retypePasswordValue)) {
            setRequired(prev => ({ ...prev, retype: true }))
            return setMessageError(prev => ({ ...prev, retype: 'Mật khẩu không trùng khớp' }))
        }

        setRequired(prev => ({ ...prev, retype: false }))
        setMessageError(prev => ({ ...prev, retype: '' }))
        return true
    }

    const handleUserNameValue = (e) => {
        setUserNameValue(e.target.value)
    }

    const handleEmailValue = (e) => {
        setEmailValue(e.target.value)
    }

    const handlePasswordValue = (e) => {
        setPasswordValue(e.target.value)
    }
    const handleRetypePasswordValue = (e) => {
        setRetypePasswordValue(e.target.value)
    }

    const handleValidator = () => {
        const isValidUser = handleUserValidator()
        const isValidPassword = handlePassWordValidator()
        const isValidRetype = handleReTypePassWordValidator()
        const isEmail = handleEmailValidator()
      
        if (isValidUser && isValidPassword && isValidRetype && isEmail) {
            setPasswordValue('')
            setEmailValue('')
            setUserNameValue('')
            setRetypePasswordValue('')
            passProps.onClick?.()
        }
    }
    return (
        <form>
            <Stack spacing={2}>
                <FormControl>
                    <TextField
                        value={userNameValue}
                        onChange={handleUserNameValue}
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
                        id="username" 
                        aria-describedby="my-helper-text" 
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        value={emailValue}
                        helperText={messageError.email}
                        onChange={handleEmailValue}
                        onBlur={handleEmailValidator}
                        required={required.email} 
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
                        label='Email'
                         
                        id="email" 
                        aria-describedby="my-helper-text" 
                    />
                </FormControl>  

                <FormControl>
                    <TextField
                        value={passwordValue}
                        onChange={handlePasswordValue}
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
                        spellCheck="false"
                        label='Mật khẩu'
                        type='password' 
                        id="password" 
                        aria-describedby="my-helper-text" />
                </FormControl>

                <FormControl>
                    <TextField
                        value={retypePasswordValue}
                        onChange={handleRetypePasswordValue}
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
}) 

export default Register