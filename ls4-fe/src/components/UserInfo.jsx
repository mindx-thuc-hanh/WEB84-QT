import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'

const UserInfo = () => {
    const { userEmail } = useParams()
    console.log(userEmail)
    const authStore = useSelector(state => state.auth)
    const [user, setUser] = useState(null)
    useEffect(() => {
        axios.get(`http://localhost:3000/users/user-info/${userEmail}`, {
            headers: {
                Authorization: `Bearer ${authStore.accessToken}`
            }
        }).then(res => {
            console.log(res.data)
            setUser(res.data)
        })
    }, [])
    return (
        <div>
            <p>Email: {user?.email || user?.name}</p>
            <p>Trang thai hoat dong: {user?.isActive}</p>
        </div>
    )
}

export default UserInfo
