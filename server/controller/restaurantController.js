// import firebase from 'firebase'
const { firebase } = require('../../src/firebase/firebase')

const getAllRestaurants = async (req, res) => {
  let restaurantsValue
  const restaurantsRef = await firebase.database().ref('restaurants')
  let result = await restaurantsRef.once('value')
  if (result) {
    restaurantsValue = result.val()
  }
  if (restaurantsValue) {
    try {
      res.status(200).json(restaurantsValue)
    } catch{
      res.status(400).send(['There are no restuarants to show!'])
    }
  } else {
    res.status(400).send('Could not get restaurants')
  }
}
const getMenu = async (req, res) => {
  const restaurantRef = await firebase.database().ref('restaurants' + `/${req.body.id}`)
  let result = await restaurantRef.once('value')
  let restaurantValue
  if (result) {
    try {
      restaurantValue = await result.val()
    } catch{
      console.log('Could not get restaurant value')
    }
  }
  if (restaurantValue.menus) {
    try {
      let menuRef = await restaurantValue.menus[req.body.menuName]
      res.status(200).send(menuRef)
    } catch {
      res.status(400).send('Could not find menu for that restaurant')
    }
  } else {
    res.status(400).send('Could not find that restaurant')
  }
}
const addMenu = async (req, res) => {
  const { menuName, categories, restaurantName } = req.body
  const restaurantRef = await firebase.database().ref('restaurants' + `/${restaurantName}`)
  const result = await restaurantRef.once('value')
  let restaurantValue
  if (result) {
    try {
      restaurantValue = result.val()
    } catch{
      console.log('Could not get value of restaurant')
    }
  }
  if (!restaurantValue.menus[menuName]) {
    try {
      let objectToPush = {
        [menuName]: categories
      }
      restaurantRef.child("menus").update(objectToPush)
      res.status(200).send('Added menu')
    } catch {
      res.status(400).send('Could not add menu')
    }
  } else {
    res.status(401).send('Could not access restaurant')
  }
}
const deleteRestaurant = async (req, res) => {
  const restaurantRef = await firebase.database().ref('restaurants' + `/${req.body.id}`)
  if (restaurantRef) {
    try {
      restaurantRef.remove()
      res.status(200).send('Restaurant deleted')
    } catch{
      res.status(400).send('Could not remove restaurant')
    }
  } else {
    res.status(400).send('Could not access restaurant')
  }
}
const deleteMenu = async (req, res) => {
  const restaurantRef = await firebase.database().ref('restaurants' + `/${req.body.id}` + `/menus/${req.body.menuName}`)
  try {
    restaurantRef.remove()
    res.status(200).send('Menu deleted')
  } catch{
    res.status(400).send('Could not remove menu')
  }

  // to put delete function here
}
module.exports = {
  getAllRestaurants,
  getMenu,
  addMenu,
  deleteRestaurant,
  deleteMenu
}
