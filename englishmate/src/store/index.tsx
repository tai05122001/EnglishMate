// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Import reducer từ authSlice

const store = configureStore({
  reducer: {
    auth: authReducer, // Đăng ký authReducer dưới key 'auth'
  },
});

// Định nghĩa RootState và AppDispatch types để dùng trong hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;