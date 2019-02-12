import firebase from 'firebase'
import { resultKeyNameFromField } from 'apollo-utilities';
const getAllRestaurants = async (req, res) => {
  const restaurantsRef = await firebase.database().ref('restaurants')
  if (restaurantsRef) {
    try {
      res.status(200).send(restaurantsRef)
    } catch{
      res.status(400).send(['There are no restuarants to show!'])
    }
  } else {
    res.status(400).send('could not get restaurants')
  }
}
const getMenu = async (req, res) => {
  const restaurantRef = await firebase.database().ref('restaurants' + `/${req.body.id}`)
  if (restaurantRef.menus) {
    try {
      // let menuRef
      // for (let i = 1; i < restaurantRef.length; i++) {
      //   if (restaurantsRef[i].menus.length) {
      menuRef = restaurantRef.menus
      // }
      res.status(200).send(menuRef)
      // }
    } catch {
      res.status(400).send('could not find menu for that restaurant')
    }
  } else {
    res.status(400).send('could not find that restaurant')
  }
}
const addMenu = async (req, res) => {
  const restaurantRef = await firebase.database().ref('restaurants' + `/${req.body.id}`)
  if (restaurantRef) {
    try {
      let newMenuList = restaurantRef.menus.push(req.body)
      res.status(200)
        .send(newMenuList)
    } catch {
      res.status(400).send('could not add menu')
    }
  } else {
    res.status(401).send('could not access restaurant')
  }
}
const deleteRestaurant = async (req, res) => {
  const restaurantsRef = await firebase.database().ref('restaurants')
  const restaurantRef = await firebase.database().ref('restaurants' + `/${req.body.id}`)
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
const deleteMenu = async (res, res) => {
  const restaurantRef = await firebase.database().ref('restaurants' + `/${req.body.id}`)
  //to put delete function here
}
module.exports = {
  getAllRestaurants,
  getMenu,
  addMenu,
  deleteRestaurant,
  deleteMenu
}
