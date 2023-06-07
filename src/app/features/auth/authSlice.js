import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    auth: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        getUser: (state, action) => {
            return {
                ...state,
                auth: action.payload
            }
        }
    }
});

export const { getUser } = authSlice.actions
export default authSlice.reducer