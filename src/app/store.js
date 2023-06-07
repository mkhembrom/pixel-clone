import { configureStore } from '@reduxjs/toolkit'

import imageReducer from './features/image/imageSlice'
import authReducer from './features/auth/authSlice'

export const store = configureStore({
    reducer: {
        images: imageReducer,
        auth: authReducer
    }
})
