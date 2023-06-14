'user client'

import { createSlice } from '@reduxjs/toolkit' 

export interface AuthState {
  authenticated: string
}

const initialState: AuthState = {
  authenticated: 'none'
}

export const authSlice = createSlice({
  name: 'auth',   
  initialState, 
  reducers: {
    loginAuthRedux: (state, newUser) => { state.authenticated = newUser.payload},
    logoutAuthRedux: (state) => { state.authenticated = 'none' }
  }
})

export const { loginAuthRedux, logoutAuthRedux } = authSlice.actions;
export default authSlice.reducer