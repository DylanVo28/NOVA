import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {}
  },
  reducers: {
   
    loginAction:(state,action)=>{
        state.user=action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { loginAction } = userSlice.actions

export default userSlice.reducer