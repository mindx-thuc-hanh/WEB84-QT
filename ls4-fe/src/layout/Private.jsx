import React from 'react'
import UserList from '../components/UserList'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/authSlice'
import { Route, Routes } from 'react-router-dom'
import UserInfo from '../components/UserInfo'

const Private = () => {
    const authStore = useSelector(state => state.auth)
    const dispatch = useDispatch()
    return (
        <div>
            <button onClick={() => dispatch(logout())}>logout </button>
            <div>
                email:{authStore.user.email} {authStore.user.isActive === 'daan' ? "(Dinh chi)" : "(Hoat dong)"}
            </div>
            <Routes>
                <Route path='/user-list' element={<UserList />} />
                <Route path='/user-info/:userEmail' element={<UserInfo />} />
            </Routes>
        </div>
    )
}

export default Private