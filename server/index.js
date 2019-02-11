require('dotenv') = config()
const express = require('express')
const { json } = require('bodyparser')
const {getUser, addUser, login, register, logout,deleteUser} = require('./controller/userController')
const {getRestaurants, getMenu, addMenu, deleteRestaurant, deleteMenu} = require('./controller/restaurantController')
const {SERVER_PORT} = process.env

const app = express()

app.use(json())
//user endpoints
// app.get('/getuser', getUser)
// app.post('/addUser', addUser)
app.post('/login', login)
app.post('/register', register)
app.get('/logout', logout)
// app.delete('/deleteUser', deleteUser)
// //restaurant endpoints
// app.get('/getAllRestaurants', getRestaurants)
// app.get('/getMenu', getMenu)
// app.post('/addMenu', addMenu)
// app.delete('/deleteRestaurant', deleteRestaurant)
// app.delete('/deleteMenu', deleteMenu)
// //admin endpoints
// app.get('/getAllUsers', getAllUsers)
// app.get('/getAllOrders', getAllOrders)


app.listen(SERVER_PORT, () => {
  console.log(`Listening on ${SERVER_PORT}`)
})
