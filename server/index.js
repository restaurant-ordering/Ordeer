require('dotenv').config()
const express = require('express')
const { json } = require('body-parser')
const { register } = require('./controller/userController')
const { getAllRestaurants, getMenu, addMenu, deleteRestaurant, deleteMenu } = require('./controller/restaurantController')
const { getUserOrders, getOrder } = require('./controller/orderController')
const { SERVER_PORT } = process.env

const app = express()

app.use(json())


//user endpoint
app.post('/api/register', register)
//restaurant endpoints
app.get('/api/restaurants', getAllRestaurants)
app.post('/api/menus', getMenu)
app.post('/api/add-menus', addMenu)
app.delete('/api/restaurants', deleteRestaurant)
app.delete('/api/menus', deleteMenu)
//order endpoints
// app.post('/api/checkout', checkout)
// app.get('/api/cart',getCart)
// app.delete('/api/cart', deleteCart)
// app.put('/api/cart', editCart)
// app.delete('/api/cart:item, deleteItem)
app.post('/api/orders', getUserOrders)
app.post('/api/orders:id', getOrder)
//admin endpoints
// app.get('/api/all-users', getAllUsers)
// app.get('/api/all-orders', getAllOrders)


app.listen(SERVER_PORT, () => {
  console.log(`Listening on ${SERVER_PORT}`)
})
