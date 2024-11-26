import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

// fetch vs axios
function UserList() {

  const authStore = useSelector(state => state.auth)
  const { accessToken } = authStore

  const [userList, setUserList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchValue, setSearchValue] = useState('')
  const [query, setQuery] = useState({
    page: 1, // current page
    limit: 10, // Hien bao nhieu thang
  })
  useEffect(() => {
    document.title = 'MindX | User management'
    axios.get('http://localhost:3000/users/get-users', {
      params: { ...query, searchValue },
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(res => {
      console.log(res)
      setUserList(res.data)

    }).catch(err => {
      console.log(err)
    }).finally(() => {
      setIsLoading(false)
    })
  }, [query, searchValue])

  const moveToRightEventHandler = () => {
    setQuery(prev => ({
      ...prev,
      page: prev.page + 1
    }))
  }
  const moveToLeftEventHandler = () => {
    if (query.page === 1) return;
    setQuery(prev => ({
      ...prev,
      page: prev.page - 1
    }))
  }

  const deleteButtonHandler = async (email) => {
    if (!email) return;
    axios.delete(`http://localhost:3000/users/delete-user/${email}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(res => alert(res.data.message))
  }

  return (
    <>
      <div style={{
        flex: 'row',
        justifyContent: 'space-between',
        width: '100%',
      }}>
        <button
          onClick={moveToLeftEventHandler}
          style={{
            border: '1px solid black',
            padding: '10px',
            cursor: 'pointer'
          }}>left</button>
        <span>trang hien tai la: {query.page}</span>
        <button
          onClick={moveToRightEventHandler}
          style={{
            border: '1px solid black',
            padding: '10px',
            cursor: 'pointer'

          }}>right</button>
      </div>
      <div>
        <input type="text" name="" id="" value={searchValue} onChange={e => setSearchValue(e.target.value)} />
      </div>
      {isLoading ? <div id="loading">Loading...</div> : userList.map(user => <div
        style={{
          border: '1px solid black',
          padding: '10px',
          margin: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color:user.isActive ==='daan' ?'red' :'black'
        }}
      >
        <h1>{user.email}</h1>
        <h2>{user.index}</h2>
        <button onClick={() => deleteButtonHandler(user.email)}>Xoa</button>

      </div>)}
      {/* <button onClick={createUser}>add user</button> */}

    </>
  )
}

export default UserList
