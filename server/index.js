require('dotenv').config()
const express = require('express')
const { json } = require('body-parser')
const { getUser, addUser, login, register, logout, deleteUser } = require('./controller/userController')
const { getAllRestaurants, getMenu, addMenu, deleteRestaurant, deleteMenu } = require('./controller/restaurantController')
const { SERVER_PORT } = process.env

const app = express()

app.use(json())

//user endpoints
// app.get('/api/users', getUser)
// app.post('/api/users', addUser)
app.post('/api/login', login)
app.post('/api/register', register)
// app.get('/api/logout', logout)
// app.delete('/api/users', deleteUser)
//restaurant endpoints
app.get('/api/restaurants', getAllRestaurants)
app.get('/api/menus', getMenu)
app.post('/api/menus', addMenu)
app.delete('/api/restaurants', deleteRestaurant)
app.delete('/api/menus', deleteMenu)
//admin endpoints
// app.get('/api/all-users', getAllUsers)
// app.get('/api/all-orders', getAllOrders)


app.listen(SERVER_PORT, () => {
  console.log(`Listening on ${SERVER_PORT}`)
})
