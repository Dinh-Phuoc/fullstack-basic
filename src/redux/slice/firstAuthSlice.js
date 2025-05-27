import { createSlice } from '@reduxjs/toolkit'

export const firstAuthSlice = createSlice({
    name: 'firtAuth',
    initialState: {
        email: null
    },
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload
        }
    }
})

export const { setEmail } = firstAuthSlice.actions