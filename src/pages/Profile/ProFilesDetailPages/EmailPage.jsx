// MUI Component
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

// MUI Icon
import Check from '@mui/icons-material/Check'
import Close from '@mui/icons-material/Close'

// React
import { useEffect, useState } from 'react'

// My import
import { getInforUserApi, updateProfileApi } from '~/apis'
import { toast } from 'react-toastify'
const EmailPage = () => {
    const [user, setUser] = useState(null)
    const [token] = useState(localStorage.getItem('token'))

    // States of personal information
    const [email, setEmail] = useState(null)
    const [prevValue, setPreValue] = useState('Prev')
    const [emailFocus, setEmailFocus] = useState(false)
    const [invalidMessage, setInvalidMessage] = useState('')

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

    useEffect(() => {
        token && getInforUserApi().then((userInfo) => {
            setEmail(userInfo.email)
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
        switch (textFieldName) {
        case 'email':
            if (e.target.value !== prevValue) {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                const isValid = pattern.test(e.target.value)
                if (isValid) {
                    setInvalidMessage('')
                    const result = await updateProfileApi(user._id, textFieldName, e.target.value)
                    setEmail(e.target.value)
                    setEmailFocus(false)
                    result.change ? toast.success('Cập nhật thành công') : toast.error('Cập nhật thất bại')
                    return
                }
                setInvalidMessage('Vui lòng nhập đúng Email!!!')
                setEmailFocus(false)
            }
            setEmailFocus(false)
            return
        default:
            return
        }
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