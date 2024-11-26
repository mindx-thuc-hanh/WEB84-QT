import { createAsyncThunk } from "@reduxjs/toolkit";

const loginApi = async () => {
    console.log('Send request to server')
    await new Promise(r => setTimeout(r, 3000));
    return ({
        name: 'user 1',
        email: 'user1@gmail.om'
    })

}

const loginUser = createAsyncThunk('auth/login', async (userInfo) => {
    const user = await loginApi()
    return user
});


export {
    loginApi,
    loginUser
}