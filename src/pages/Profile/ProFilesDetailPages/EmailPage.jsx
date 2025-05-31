// MUI Component
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

// MUI Icon
import Check from '@mui/icons-material/Check'
import Close from '@mui/icons-material/Close'

// React
import { useState } from 'react'

// My import
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { userSelector } from '~/redux/selector'
import { updateProfileThunk } from '~/redux/slice/userSlice'
const EmailPage = () => {
    const { data: user } = useSelector(userSelector)
    // States of personal information
    const [email, setEmail] = useState(user.email)
    const [prevValue, setPreValue] = useState('Prev')
    const [emailFocus, setEmailFocus] = useState(false)
    const [invalidMessage, setInvalidMessage] = useState('')
    const dispatch = useDispatch()

    const styleInput = { 
        '& .MuiOutlinedInput-root': {
            height: '100%',
            
            '& .MuiOutlinedInput-input':{
                width: '200px',
                p: '9.5px 12px',
                textOverflow: 'ellipsis'
            },
            '& .MuiOutlinedInput-input:not(:focus) + .MuiOutlinedInput-notchedOutline':{
                border: 'none'
            },
            '& .MuiOutlinedInput-input:focus + .MuiOutlinedInput-notchedOutline':{
                borderColor: theme => theme.palette.mode === 'dark' ?
                    theme.palette.primary.light :
                    theme.palette.primary.main
            }
        },
        '& .MuiFormHelperText-root': {
            color: 'red'
        }, 
        '& .MuiInputLabel-root.Mui-focused': {
            color: theme => theme.palette.mode === 'dark' ?
                theme.palette.primary.light :
                theme.palette.primary.main
        }
    }

    //Handle Edit information group
    const handleFocus = (e, textFieldName) => {
        setPreValue(e.target.value)
        switch (textFieldName) {
        case 'email':
            setEmailFocus(true)
            e.target.select()
            return
        default:
            return
        }
    }

    const handleChangeValue = (e, textFieldName) => {
        switch (textFieldName) {
        case 'email':
            setEmail(e.target.value)
            return
        default:
            return
        }
    }

    const handleEditTextField = async (e, textFieldName) => {
        if (e.target.value !== prevValue) {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            const isValid = pattern.test(e.target.value)
            if (!isValid) {
                setInvalidMessage('Vui lòng nhập đúng Email!!!')
                setEmailFocus(false)
                return
            }

            setInvalidMessage('')
            const data = {
                fieldName: textFieldName,
                dataToUpdate: e.target.value
            }
            dispatch(updateProfileThunk(data))
                .unwrap()
                .then(() => {
                    toast.success('Cập nhật thành công')
                    setEmailFocus(false)
                    return
                })
                .catch(() => {
                    toast.error('Cập nhật thất bại')
                    setEmailFocus(false)
                    return
                })
        }
        setEmailFocus(false)
        return
    }

    const handleCancelEditTextField = (textFieldName) => {
        switch (textFieldName) {
        case 'email':
            setEmail(prevValue)
            setEmailFocus(false)
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
            {/* Header Document section */}
            <Box>
                <Typography variant='h6' sx={{ m: '12px 0' }}>Email</Typography>
            </Box>

            {/* Introduction */}
            <Typography sx={{ m: '12px 0 12px' }} variant='subtitle2'>Thay đổi email của bạn</Typography>

            <Paper sx={{ padding: '12px' }}>
                {/* Full Name */}
                <Box 
                    sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignContent: 'center',
                        width: '100%',
                        height: '40px', 
                        m: '0 0 12px' 
                    }}
                >
                    <Box sx={{ position: 'relative', height: '40px' }}>
                        <TextField
                            label='Email'
                            value={ email }
                            helperText={invalidMessage}
                            onFocus={e => handleFocus(e, 'email')}
                            onChange={e => handleChangeValue(e, 'email')}
                            onBlur={(e) => {
                                const focusedElement = e.relatedTarget
                                focusedElement?.dataset?.action === 'confirm' ? 
                                    handleEditTextField(e, 'email') :
                                    handleCancelEditTextField('email')
                            }}
                            sx={styleInput}
                        >
                        </TextField>

                        <Box
                            sx={{ 
                                display: emailFocus ? 'flex' : 'none',
                                position: 'absolute',
                                top: '60px',
                                left: '150px',
                                transform: 'translateY(-50%)' 
                            }}>
                            <Paper sx={{ height: '32px', bgcolor: theme => theme.palette.mode === 'dark' ? '#262626' : 'background.paper', width: '32px', mr: '4px' }}>
                                <Button
                                    data-action='confirm'
                                    onClick={() => handleEditTextField('email')} 
                                    sx={{ height: '32px', width: '32px', p: 0, color: '#ff9a9cc4', minWidth: '32px' }}
                                >
                                    <Check/>
                                </Button>
                            </Paper>
                            <Paper sx={{ height: '32px', bgcolor: theme => theme.palette.mode === 'dark' ? '#262626' : 'background.paper', width: '32px' }}>
                                <Button
                                    sx={{ height: '32px', width: '32px', p: 0, color: '#ff9a9cc4', minWidth: '32px' }}
                                >
                                    <Close/>
                                </Button>
                            </Paper>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}

export default EmailPage