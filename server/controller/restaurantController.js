import firebase from 'firebase'
import { resultKeyNameFromField } from 'apollo-utilities';
const getAllRestaurants = async (req, res) => {
  const restaurantsRef = await firebase.database().ref('restaurants')
  if (restaurantsRef) {
    try {
      res.status(200).send(restaurantsRef)
    } catch{
      res.status(200).send(['There are no restuarants to show!'])
    }
  } else {
    res.status(400).send('could not get restaurants')
  }
}
const getMenu = async (req, res) => {
  const restaurantsRef = await firebase.database().ref('restaurants')
  if (restaurantsRef) {
    try {
      let menuRef
      for (let i = 1; i < restaurantsRef.length; i++) {
        if (restaurantsRef[i].id == req.body.id && restaurantsRef[i].menu) {
          restaurantsRef[i].menu = menuRef
        }
      }
      res.status(200).send(menuRef)
    } catch {
      res.status(400).send('could not find menu for that restaurant')
    }
  } else {
    res.status(400).send('could not find menu for that restuarant')
  }
}
module.exports = {
  getAllRestaurants,
  getMenu
}
