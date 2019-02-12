// import firebase from 'firebase'
const { firebase } = require('../../src/firebase/firebase')

const getAllRestaurants = async (req, res) => {
  const restaurantsRef = await firebase.database().ref('restaurants')
  let restaurantsValue = await restaurantsRef.once('value').then(res => res.val()).catch(err => console.log(err))
  console.log('this is restaurantsValue', restaurantsValue)
  if (restaurantsRef) {
    try {
      res.status(200).json(restaurantsValue)
    } catch{
      res.status(400).send(['There are no restuarants to show!'])
    }
  } else {
    res.status(400).send('could not get restaurants')
  }
}
const getMenu = async (req, res) => {
  const restaurantRef = await firebase.database().ref('restaurants' + `/${req.body.id}`)
  let restaurantValue = await restaurantRef.once('value').then(res => res.val()).catch(err => console.log(err))
  console.log(restaurantValue)
  if (restaurantValue.menus) {
    try {
      let menuRef = restaurantV.menus.child(req.body.menuName)
      res.status(200).send(menuRef)
    } catch {
      res.status(400).send('could not find menu for that restaurant')
    }
  } else {
    res.status(400).send('could not find that restaurant')
  }
}
const addMenu = async (req, res) => {
  const { menuName, categories, restaurantName } = req.body
  const restaurantRef = await firebase.database().ref('restaurants' + `/${restaurantName}`)
  const restaurantValue = await restaurantRef.once('value').then(res => res.val()).catch(err => console.log(err))
  if (!restaurantValue.menus[menuName]) {
    try {
      let objectToPush = {
        [menuName]: categories
      }
      restaurantRef.child("menus").update(objectToPush)
      res.status(200).send('added menu')
    } catch {
      res.status(400).send('could not add menu')
    }
  } else {
    res.status(401).send('could not access restaurant')
  }
}
const deleteRestaurant = async (req, res) => {
  const restaurantRef = await firebase.database().ref('restaurants' + `/${req.body.id}`)
  // let restaurantValue = await restaurantRef.once('value').then(res => res.val()).catch(err => console.log(err))
  if (restaurantRef) {
    try {
      restaurantRef.remove()
      res.status(200).send(restaurantsRef)
    } catch{
      res.status(400).send('could not remove restaurant')
    }
  } else {
    res.status(400).send('could not access restaurant')
  }
}
const deleteMenu = async (req, res) => {
  const restaurantRef = await firebase.database().ref('restaurants' + `/${req.body.id}` + `/menus/${req.body.menuName}`)
  if (restaurantRef) {
    restaurantRef.remove()
    res.status(200)
  } else {
    res.status(400).send('could not remove menu')
  }

  //to put delete function here
}
module.exports = {
  getAllRestaurants,
  getMenu,
  addMenu,
  deleteRestaurant,
  deleteMenu
}
