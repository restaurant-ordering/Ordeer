import React, { useEffect, useState } from 'react'
import axios from 'axios'
const UsersTable = props => {
  const [users, updateUsers] = useState([])

  const getUsers = async () => {
    const response = await axios.get('/api/admin/users')
    //convert response to array of restaurant objects
    let usersArray = []
    for (let i in response.data) {
      response.data[i].name = i
      usersArray.push(response.data[i])
    }
    updateUsers(usersArray)
  }
  useEffect(() => { getUsers() }, [])
  // useEffect(() => { console.log(users) }, [users])
  const map = users.map((user, i) => { return <p key={i}>{user.name}</p> })
  return (
    <div>
      hello
      {map}
    </div>

  )
}
export default UsersTable
