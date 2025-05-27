import { configureStore } from '@reduxjs/toolkit'
import { boardSilce } from './slice/boardSlice'
import { userSlice } from './slice/userSlice'
import { firstAuthSlice } from './slice/firstAuthSlice'

export const store = configureStore({
    reducer:{
        board: boardSilce.reducer,
        user: userSlice.reducer,
        firstAuth: firstAuthSlice.reducer
    }
})