import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { login, setLoading } from '../store/authSlice'

const LoginForm = () => {
    const authStore = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [formValue, setFormValue] = useState({
        email: "",
        password: ""
    })
    const formSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            dispatch(setLoading(true))
            await axios.post('http://localhost:3000/users/login', formValue).then(res => {
                const { accessToken, refreshToken, user } = res.data
                dispatch(login({
                    accessToken,
                    refreshToken,
                    user
                }))
                console.log(accessToken)
                console.log(refreshToken)
                console.log(user)
                localStorage.setItem('accessToken', accessToken)
                localStorage.setItem('refreshToken', refreshToken)
                localStorage.setItem('user', JSON.stringify(user))
                alert(res.data.message)
            }).catch(err => {
                throw new Error(err.response.data.err)
            })
        }
        catch (err) {
            console.log(err.message)
            alert(err.message)
        } finally {
            dispatch(setLoading(false))
        }
    }
    return (
        <form onSubmit={formSubmitHandler}>
            <input placeholder='Nhap tai khoan' value={formValue.email} onChange={e => setFormValue(prev => ({ ...prev, email: e.target.value }))} />
            <input placeholder='Nhap mat khau' value={formValue.password} onChange={e => setFormValue(prev => ({ ...prev, password: e.target.value }))} />
            <button type='submit'>
                Dang nhap
            </button>
        </form>
    )
}

export default LoginForm
