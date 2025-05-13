import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getInforUserApi, loginApi, logoutApi } from '~/apis'

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
                state.user = action.payload
            })

            //Login
            .addCase(loginThunk.pending, (state) => {
                state.loginPending = true
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loginPending = false
                state.user = action.payload
            }).addCase(loginThunk.rejected, (state, action) => {
                state.loginPending = false
                state.user = action.null
            })
            
            //Logout
            .addCase(logoutThunk.fulfilled, (state) => {
                state.user = null
                state.online = false
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
