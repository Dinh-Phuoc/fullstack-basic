import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getInforUserApi, loginApi, logoutApi, uploadAvatarApi, uploadImageHeaderApi } from '~/apis'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        loginPending: false,
        pending: true,
        data: null
    },
    reducers: {
       
    },
    extraReducers: builder => {
        builder
            //Set User
            .addCase(setUserInfoThunk.pending, (state) => {
                state.pending = true
            })
            .addCase(setUserInfoThunk.fulfilled, (state, action) => {
                state.pending = false
                state.data = action.payload
            })

            //Login
            .addCase(loginThunk.pending, (state) => {
                state.loginPending = true
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loginPending = false
                state.data = action.payload
            }).addCase(loginThunk.rejected, (state, action) => {
                state.loginPending = false
                state.data = action.null
            })
            
            //Logout
            .addCase(logoutThunk.fulfilled, (state) => {
                state.data = null
                state.online = false
            })

            //uploadImageHeader
            .addCase(uploadImageHeaderThunk.fulfilled, (state, action) => {
                state.data = action.payload
            })

            //uploadAvatar
            .addCase(uploadAvatarThunk.fulfilled, (state, action) => {
                state.data = action.payload
            })
    }
})

export const setUserInfoThunk = createAsyncThunk('user/setUser', async () => {
    const user = await getInforUserApi()
    return user
})

export const loginThunk = createAsyncThunk('user/login', async (data) => {
    await loginApi(data)
    const user = await getInforUserApi()
    return user
})

export const logoutThunk = createAsyncThunk('user/logout', async () => {
    await logoutApi()
    return
})

export const uploadImageHeaderThunk = createAsyncThunk('user/uploadImageHeaderThunk', async (formData) => {
    await uploadImageHeaderApi(formData)
    const user = await getInforUserApi()
    return user
})

export const uploadAvatarThunk = createAsyncThunk('user/uploadAvatarThunk', async (formData) => {
    await uploadAvatarApi(formData)
    const user = await getInforUserApi()
    return user
})
