import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getInforUserApi, updateProfileApi, uploadAvatarApi, uploadImageHeaderApi } from '~/apis'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        loginPending: false,
        isUpdating: false,
        isUploadImageHeader: false,
        isUploadAvatar: false,
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
            .addCase(setUserInfoThunk.rejected, (state) => {
                state.pending = false
                state.data = null
            })

            //uploadImageHeader
            .addCase(uploadImageHeaderThunk.pending, (state) => {
                state.isUploadImageHeader = true
            })
            .addCase(uploadImageHeaderThunk.fulfilled, (state, action) => {
                state.data = action.payload
                state.isUploadImageHeader = false
            })

            //uploadAvatar
            .addCase(uploadAvatarThunk.pending, (state) => {
                state.isUploadAvatar = true
            })
            .addCase(uploadAvatarThunk.fulfilled, (state, action) => {
                state.data = action.payload
                state.isUploadAvatar = false
            })

            //updateProfile
            .addCase(updateProfileThunk.pending, state => {
                state.isUpdating = true
            })
            .addCase(updateProfileThunk.fulfilled, (state, action) => {
                state.isUpdating = false
                state.data[action.payload.fieldName] = action.payload.dataToUpdate
            })
    }
})

export const setUserInfoThunk = createAsyncThunk('user/setUser', async () => {
    const user = await getInforUserApi()
    return user
})

export const updateProfileThunk = createAsyncThunk('user/updateProfile', async(data) => {
    await updateProfileApi(data.fieldName, data.dataToUpdate)
    return { fieldName: data.fieldName, dataToUpdate: data.dataToUpdate }
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
