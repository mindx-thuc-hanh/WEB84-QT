import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../src/fake-api";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
        userInfo: {
            name: '',
            email: ''
        },
        accessToken: null,
        refreshToken: null,
        isLoading: false,
        isError: false,
        isSuccess: false
    },
    reducers: {
        login: (state, action) => {

            console.log('Login success')
        },
        logout: (state) => {
            state.isAuth = false
            state.accessToken = null
            state.refreshToken = null
            state.userInfo = {
                name: '',
                email: ''
            }
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
                state.userInfo = {}
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuth = true;
                state.isSuccess = true;
                state.userInfo = {
                    name: action.payload.name,
                    email: action.payload.email
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            });
    }
})

// export action
const actions = authSlice.actions;

const exportedAction = {
    login: actions.login,
    logout: actions.logout,

};
export { exportedAction }

export default authSlice.reducer