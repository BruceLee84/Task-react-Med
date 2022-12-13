import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState:{value: {Name:'', Email:'', Number:''}},
    reducers:{
        login:(state, action)=>{
            state.value = action.payload;
        },
        logout: (state, action) => {
            state.value = action.payload;
        }
    }

})
export const {login, logout} = userSlice.actions

export default userSlice.reducer;