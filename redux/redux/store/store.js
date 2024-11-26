import { configureStore } from '@reduxjs/toolkit';
import countSlice from '../slices/countSlice';
import authSlice from '../slices/authSlice';

const store = configureStore({
    reducer: {
        countStore: countSlice,
        authStore: authSlice
    },
});

export default store