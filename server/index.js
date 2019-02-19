require('dotenv').config()
const express = require('express')
const { json } = require('body-parser')
const { register } = require('./controller/userController')
const { getAllRestaurants, getMenu, addMenu, deleteRestaurant, deleteMenu } = require('./controller/restaurantController')
const { getUserOrders, getOrder, checkout, addOrder, getCart, deleteOrder, editCart, deleteItem } = require('./controller/orderController')
const { getAllOrders, getAllUsers } = require('./controller/adminController')
const { SERVER_PORT, SESSION_SECRET } = process.env

const app = express()

app.use(json())
//add session to store current OrderId
app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 * 2
    }
  })
)
//sessionId endpoint
app.get('/api/orderId', (req, res, next) => {
  if (req.session.orderId) {
    res.status(200).send(req.session.orderId)
  } else {
    res.sendStatus(400)
  }
})
//user endpoint
app.post('/api/register', register)
//restaurant endpoints
app.get('/api/restaurants', getAllRestaurants)
app.post('/api/menus', getMenu)
app.post('/api/add-menus', addMenu)
app.delete('/api/restaurants', deleteRestaurant)
app.delete('/api/menus', deleteMenu)
//order endpoints
app.get('/api/cart', getCart)
app.put('/api/cart', editCart)
app.delete('/api/cart', deleteItem)
app.get('/api/orders', getOrder)
app.get('/api/orders/user', getUserOrders)
app.post('/api/orders', addOrder)
app.delete('/api/orders', deleteOrder)
app.post('/api/checkout', checkout)
//admin endpoints
app.get('/api/admin/users', getAllUsers)
app.get('/api/admin/orders', getAllOrders)


app.listen(SERVER_PORT, () => {
  console.log(`Listening on ${SERVER_PORT}`)
})
