import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: 'admin@gmail.com',
    token: '123123',
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = '';
      state.token = '';
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer; 