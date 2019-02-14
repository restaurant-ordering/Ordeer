const { firebase } = require('../../src/firebase/firebase')

const getAllOrders = async (req, res) => {
  try {
    const ordersRef = await firebase.database().ref('orders')
    const ordersValue = await ordersRef.once('value')
    res.status(200).send(ordersValue)
  } catch {
    res.status(400).send('Could not get all orders')
  }
}
const getAllUsers = async (req, res) => {
  try {
    const usersRef = await firebase.database().ref('users')
    const usersValue = await usersRef.once('value')
    res.status(200).send(usersValue)
  } catch {
    res.status(400).send('Could not get all users')
  }
}
module.exports = {
  getAllOrders,
  getAllUsers
}
