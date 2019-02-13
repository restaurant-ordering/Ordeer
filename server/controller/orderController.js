const { firebase } = require('../../src/firebase/firebase')

const getUserOrders = async (req, res, next) => {
  const ordersRef = await firebase.database().ref('orders')

  const ordersValue = []
  let result = await ordersRef.once('value')
  console.log('this is the result', result)
  if (result) {
    try {
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
}
const getOrder = async (req, res, next) => {
  const orderRef = await firebase.database().ref(`orders/${req.params.id}`)
  let result = orderRef.once('value')
  let orderValue
  if (result) {
    orderValue = result.val()
  }
  if (orderValue) {
    try {
      res.status(200).send(orderValue)
    } catch {
      res.status(400).send('Cant get order details')
    }
  }
}
module.exports = {
  getOrder,
  getUserOrders
}
