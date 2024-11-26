import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
// import { exportedAction } from '../slices/countSlice'
import { exportedAction } from '../slices/authSlice'
import { loginApi, loginUser } from './fake-api'

function App() {
  // const countStore = useSelector(state => state.countStore)
  // const dispatch = useDispatch()
  // console.log(countStore)

  const [inputValue, setInputValue] = useState('')


  const authStore = useSelector(state => state.authStore)
  const dispatch = useDispatch()

  console.log(authStore)

  const loginBtHandler = async () => {
    dispatch(loginUser())
    dispatch(exportedAction.login())
  }
  const logoutBtHandler = () => {
    dispatch(exportedAction.logout())
  }
  return (
    <>
      {
        authStore.isLoading ? <p>Loading</p> : <>
          {
            !authStore.isAuth && <>
              Name:
              <input value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder='Nhap ten' /></>
          }
          <p>{
            authStore.isAuth ? `User info: ${JSON.stringify(authStore.userInfo)}` : "Hay dang nhap"
          }</p>
          <button onClick={authStore.isAuth ? logoutBtHandler : loginBtHandler}>
            {
              authStore.isAuth ? 'Dang xuat' : 'Dang nhap'
            }
          </button>
        </>
      }
    </>
  )
}

export default App
