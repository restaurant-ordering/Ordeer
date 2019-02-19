const { firebase } = require('../../src/firebase/firebase')

const getUserOrders = async (req, res, next) => {
  try {
    const ordersRef = await firebase.database().ref('orders')
    const result = await ordersRef.once('value')
    const ordersValue = result.val()
    let values = Object.values(ordersValue)
    let orders = []
    for (let i = 0; i < values.length; i++) {
      if (values[i].user == req.query.user) {
        orders.push(values[i])
      }
    }
    if (!orders.length) { orders = 'No orders under that name' }
    res.status(200).send(orders)
  }
  catch{
    res.status(400).send('Could not get orders')
  }
}
const getOrder = async (req, res, next) => {
  try {
    const orderRef = await firebase.database().ref(`orders/${req.query.orderId}`)
    const result = await orderRef.once('value')
    const orderValue = await result.val()
    res.status(200).send(orderValue)
  } catch {
    res.status(400).send('Cant get order details')
  }
}
const addOrder = async (req, res, next) => {
  try {
    /*req.body = {
      cart=[],
      date:'',
      price:num,
      restaurant:'',
      user:''
    }
    */
    const ordersRef = await firebase.database().ref(`orders`)
    const order = await ordersRef.push(req.body)
    console.log('order', order)
    const orderKey = order.key
    console.log('orderKey', orderKey)
    req.session.orderId = orderKey
    res.status(200).send(orderKey)
  } catch{
    res.status(400).send('Could not add order')
  }
}

const getCart = async (req, res, next) => {
  try {
    const cartRef = await firebase.database().ref(`orders/${req.query.orderId}`).child('cart')
    const result = await cartRef.once('value')
    const cartValue = await result.val()
    console.log(cartValue)
    res.status(200).send(cartValue)
  } catch{
    res.status(400).send('Cant get cart details')
  }
}
const editCart = async (req, res, next) => {
  try {
    const cartRef = await firebase.database().ref(`orders/${req.body.orderId}`).child('cart')
	  cartRef.set(req.body.cart)
    res.status(200).send('Cart has been updated')
  } catch{
    res.status(400).send('Could not update cart details')
  }
}
const checkout = async (req, res, next) => {
  res.status(200).send('You checked out. This will do something later!')
}
const deleteOrder = async (req, res, next) => {
  try {
    const orderRef = await firebase.database().ref(`orders/${req.query.orderId}`)
    orderRef.remove()
    res.status(200).send('Removed order')
  } catch{
    res.status(400).send('Could not delete cart')
  }
}
const deleteItem = async (req, res, next) => {
  try {
    const cartRef = await firebase.database().ref(`/orders/${req.query.orderId}/cart/${req.query.itemId}`)
    cartRef.remove()
    res.status(200).send('Removed item')
  } catch{
    res.status(400).send('Could not delete item')
  }
}
module.exports = {
  getUserOrders,
  getOrder,
  checkout,
  getCart,
  addOrder,
  deleteOrder,
  editCart,
  deleteItem
}
