const { firebase } = require('../../src/firebase/firebase')

const getUserOrders = async (req, res, next) => {
  try {
    const ordersRef = await firebase.database().ref('orders')
    const ordersValue = []
    let result = await ordersRef.once('value')
    console.log('this is the result', result)
    for (let i = 1; i < result.length; i++) {
      if (result[i].user == req.body.user) {
        ordersValue.push(ordersRef[i])
      }
    }
    res.status(200).send(ordersValue)
  }
  catch{
    res.status(400).send('Could not get orders')
  }
}
const getOrder = async (req, res, next) => {
  try {
    const orderRef = await firebase.database().ref(`orders/${req.params.orderId}`)
    let result = await orderRef.once('value')
    let orderValue = await result.val()
    res.status(200).send(orderValue)
  } catch {
    res.status(400).send('Cant get order details')
  }
}
const getCart = async (req, res, next) => {
  try {
    const cartRef = await firebase.database().ref(`orders/${req.params.orderId}/cart}`)
    const cartValue = await cartRef.once('value')
    res.status(200).send(cartValue)
  } catch{
    res.status(400).send('Cant get cart details')
  }
}
const editCart = async (req, res, next) => {
  try {
    const cartRef = await firebase.database().ref(`orders/${req.params.orderId}/cart}`)
    const newCart = await cartRef.update(req.body)
    res.status(200).send(newCart)
  } catch{
    res.status(400).send('Could not update cart details')
  }
}
const checkout = async (req, res, next) => {
  //do something with stripe or nodemailer here.
  //Add this before project end, even if it's just a
  //nodemailer command to send a confirmation email
}
const deleteCart = async (req, res, next) => {
  try {
    const cartRef = await firebase.database().ref(`orders/${req.params.orderId}/cart`)
    cartRef.remove()
    res.status(200).send('Removed cart')
  } catch{
    res.status(400).send('Could not delete cart')
  }
}
const deleteItem = async (req, res, next) => {
  try {
    const itemRef = await firebase.database.ref(`/orders/${req.params.orderId}/cart/${req.params.itemId}`)
    itemRef.remove()
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
  deleteCart,
  editCart,
  deleteItem
}
