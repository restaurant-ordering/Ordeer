require('dotenv').config()
const express = require('express')
const { json } = require('body-parser')
const { login, register, logout } = require('./controller/userController')
const { getAllRestaurants, getMenu, addMenu, deleteRestaurant, deleteMenu } = require('./controller/restaurantController')
const { SERVER_PORT } = process.env

const app = express()

app.use(json())


app.post('/api/login', login)
app.post('/api/register', register)
app.get('/api/logout', logout)
//restaurant endpoints
app.get('/api/restaurants', getAllRestaurants)
app.post('/api/menus', getMenu)
app.post('/api/add-menus', addMenu)
app.delete('/api/restaurants', deleteRestaurant)
app.delete('/api/menus', deleteMenu)
//admin endpoints
// app.get('/api/all-users', getAllUsers)
// app.get('/api/all-orders', getAllOrders)


app.listen(SERVER_PORT, () => {
  console.log(`Listening on ${SERVER_PORT}`)
})
