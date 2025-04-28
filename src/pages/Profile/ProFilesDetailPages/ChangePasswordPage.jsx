// MUI Component
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

// Another
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

// My import
import { getInforUserApi, updatePasswordApi } from '~/apis'
const ChangePasswordPage = () => {
    const [user, setUser] = useState(null)
    const [token] = useState(localStorage.getItem('token'))

    const [presentPassword, setPresentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [retypeNewPassword, setRetypeNewPassword] = useState('')
    
    const [messageError, setMessageError] = useState({ presentPassword: '', newPassword: '', retype: '' })
    const [required, setRequired] = useState({ presentPassword: true, newPassword: true, retype: true })
    
    const styleInput = { 
        width: { xs: '280px', sm: '350px' },
        mb: '12px',
        '& .MuiOutlinedInput-root': {
            height: '100%',
            '& .MuiOutlinedInput-input':{
                width: '100%',
                p: '9.5px 12px',
                textOverflow: 'ellipsis'
            },
            '& .MuiOutlinedInput-input:focus + .MuiOutlinedInput-notchedOutline':{
                borderColor: theme => theme.palette.mode === 'dark' ?
                    theme.palette.primary.light :
                    theme.palette.primary.main
            }
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: theme => theme.palette.mode === 'dark' ?
                theme.palette.primary.light :
                theme.palette.primary.main
        },
        
        '& .MuiFormLabel-asterisk': {
            color: 'red'
        },
        '& .MuiFormHelperText-root': {
            color: 'red'
        } 
    }

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

    const validate = {
        minLength: (length) => {
            return length < 6 && length >=1
        },
        isEmptyValue: (value) => {
            return value === ''
        },
        isSamePassword: (password, retypePassword) => {
            return password === retypePassword
        }
    }

    const handlePresentPasswordValidator = () => {
        if (validate.minLength(presentPassword.length)) {
            setRequired(prev => ({ ...prev, presentPassword: true }))
            return setMessageError(prev => ({ ...prev, presentPassword: 'Tối thiểu 6 kí tự' }))
        }
        if (validate.isEmptyValue(presentPassword)) {
            setRequired(prev => ({ ...prev, presentPassword: true }))
            return setMessageError(prev => ({ ...prev, presentPassword: 'Không để trống' }))
        }
        setRequired(prev => ({ ...prev, presentPassword: false }))
        setMessageError(prev => ({ ...prev, presentPassword: '' }))
        return true
    }

    const handleNewPassWordValidator = () => {
        if (validate.minLength(newPassword.length)) {
            setRequired(prev => ({ ...prev, newPassword: true }))
            return setMessageError(prev => ({ ...prev, newPassword: 'Tối thiểu 6 kí tự' }))
        }
        if (validate.isEmptyValue(newPassword)) {
            setRequired(prev => ({ ...prev, newPassword: true }))
            return setMessageError(prev => ({ ...prev, newPassword: 'Không để trống' }))
        }
        if (validate.isSamePassword(newPassword, presentPassword)) {
            setRequired(prev => ({ ...prev, newPassword: true }))
            return setMessageError(prev => ({ ...prev, newPassword: 'Mật khẩu mới không được trùng với mật khẩu cũ' }))
        }
        setRequired(prev => ({ ...prev, newPassword: false }))
        setMessageError(prev => ({ ...prev, newPassword: '' }))
        return true
    }

    const handleReTypePassWordValidator = () => {
        if (validate.isEmptyValue(retypeNewPassword)) {
            setRequired(prev => ({ ...prev, retype: true }))
            return setMessageError(prev => ({ ...prev, retype: 'Không để trống' }))
        }

        if (!validate.isSamePassword(newPassword, retypeNewPassword)) {
            setRequired(prev => ({ ...prev, retype: true }))
            return setMessageError(prev => ({ ...prev, retype: 'Mật khẩu không trùng khớp' }))
        }

        setRequired(prev => ({ ...prev, retype: false }))
        setMessageError(prev => ({ ...prev, retype: '' }))
        return true
    }

    const handleValidator = async() => {
        const isValidPresentPassword = handlePresentPasswordValidator()
        const isValidNewPassword = handleNewPassWordValidator()
        const isValidRetype = handleReTypePassWordValidator()
      
        if (isValidPresentPassword && isValidNewPassword && isValidRetype) {
            setPresentPassword('')
            setNewPassword('')
            setRetypeNewPassword('')
            const resultUpdate = await updatePasswordApi(user._id, 'password', { presentPassword, newPassword })
            resultUpdate.change ? toast.success(resultUpdate.message) : toast.error(resultUpdate.message)
        }
    }
    const handleChangeValue = (e, textFieldName) => {
        switch (textFieldName) {
            
        case 'presentPassword':
            setPresentPassword(e.target.value)
            return
        case 'newPassword':
            setNewPassword(e.target.value)
            return
        case 'retypeNewPassword':
            setRetypeNewPassword(e.target.value)
            return
        default:
            return
        }
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
                <Typography variant='h6' sx={{ m: '12px 0' }}>Bảo mật</Typography>
            </Box>

            <Typography sx={{ m: '12px 0 12px' }} variant='subtitle2'>Thay đổi mật khẩu của bạn</Typography>

            <Paper sx={{ padding: '12px' }}>
                <Box 
                    sx={{ 
                        display: 'flex', 
                        flexDirection: 'column',
                        alignContent: 'center',
                        width: '100%'
                    }}
                >
                    <TextField
                        autoComplete="new-password"
                        helperText={messageError.presentPassword}
                        onBlur={handlePresentPasswordValidator}
                        onChange={e => handleChangeValue(e, 'presentPassword')}
                        required={required.presentPassword} 
                        type='password'
                        label='Mật khẩu hiện tại'
                        value={ presentPassword }
                        sx={styleInput}
                    >
                    </TextField>

                    <TextField
                        onBlur={handleNewPassWordValidator}
                        onChange={e => handleChangeValue(e, 'newPassword')}
                        required={required.newPassword}
                        helperText={messageError.newPassword}  
                        type='password'
                        label='Mật khẩu mới'
                        value={ newPassword }
                        sx={styleInput}
                    >
                    </TextField>

                    <TextField
                        onBlur={handleReTypePassWordValidator}
                        onChange={e => handleChangeValue(e, 'retypeNewPassword')}
                        required={required.retype}
                        helperText={messageError.retype}  
                        type='password'
                        label='Nhập lại mật khẩu mới'
                        value={ retypeNewPassword }
                        sx={styleInput}
                    >
                    </TextField>

                    <Button 
                        onClick={handleValidator}
                        sx={{ 
                            color: theme => theme.palette.mode === 'dark' ? 
                                theme.palette.primary.light : 
                                theme.palette.primary.main,
                            width: { xs: '280px', sm: '350px' },
                            borderColor: theme => theme.palette.mode === 'dark' ? 
                                theme.palette.primary.light : 
                                theme.palette.primary.main
                        }} 
                        variant='outlined' 
                    >Xác nhận đổi mật khẩu
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}

export default ChangePasswordPage