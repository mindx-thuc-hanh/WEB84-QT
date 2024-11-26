import axios from "axios"
import { useEffect, useState } from "react"
import Private from "./layout/Private"
import Public from "./layout/Public"
import { useDispatch, useSelector } from "react-redux"
import { login, logout } from "./store/authSlice"

// fetch vs axios
function App() {

  const authStore = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    try {
      const accessToken = localStorage.getItem("accessToken")
      const refreshToken = localStorage.getItem("refreshToken")
      const user = JSON.parse(localStorage.getItem("user"))
      
      if (!user || !refreshToken || !accessToken) {
        dispatch(logout())
        return;
      }

      dispatch(login({
        user,
        refreshToken,
        accessToken
      }))

    } catch (err) {
      dispatch(logout())
    }
  }, [])

  if (authStore.isLoading) {
    return <div>Loading...</div>
  }

  return (
    authStore.isAuth ? <Private /> : <Public />
  )
}

export default App
