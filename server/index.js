require('dotenv') = config()
const express = require('express')
const { json } = require('bodyparser')
const { getUser, addUser, login, register, logout, deleteUser } = require('./controller/userController')
const { getAllRestaurants, getMenu, addMenu, deleteRestaurant, deleteMenu } = require('./controller/restaurantController')
const { SERVER_PORT } = process.env

const app = express()

app.use(json())
//user endpoints
app.get('/api/getuser', getUser)
app.post('/api/addUser', addUser)
app.post('/api/login', login)
app.post('/api/register', register)
app.get('/api/logout', logout)
app.delete('/api/deleteUser', deleteUser)
//restaurant endpoints
app.get('/api/restaurants', getAllRestaurants)
app.get('/api/getMenu', getMenu)
app.post('/api/addMenu', addMenu)
app.delete('/api/deleteRestaurant', deleteRestaurant)
app.delete('/api/deleteMenu', deleteMenu)
//admin endpoints
app.get('/api/getAllUsers', getAllUsers)
app.get('/api/getAllOrders', getAllOrders)


app.listen(SERVER_PORT, () => {
  console.log(`Listening on ${SERVER_PORT}`)
})
