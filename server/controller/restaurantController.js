// import firebase from 'firebase'
const { firebase } = require('../../src/firebase/firebase')

const getAllRestaurants = async (req, res) => {
  try {
    const restaurantsRef = await firebase.database().ref('restaurants')
    let result = await restaurantsRef.once('value')
    const restaurantsValue = result.val()
    res.status(200).json(restaurantsValue)
  } catch{
    res.status(400).send(['There are no restuarants to show!'])
  }
}
const getMenu = async (req, res) => {
  try {
    console.log('got here')
    const restaurantRef = await firebase.database().ref('restaurants' + `/${req.body.id}`)
    let result = await restaurantRef.once('value')
    const restaurantValue = await result.val()
    console.log(restaurantValue.menus)
    let menuRef = await restaurantValue.menus[req.body.menuName]
    res.status(200).send(menuRef)
  } catch{
    console.log('Could not get restaurant value')
    res.status(400).send('Could not find menu for that restaurant')
  }
}
const addMenu = async (req, res) => {
  const { menuName, categories, restaurantName } = req.body
  try {
    const restaurantRef = await firebase.database().ref('restaurants' + `/${restaurantName}`)
    let objectToPush = {
      [menuName]: categories
    }
    restaurantRef.child("menus").update(objectToPush)
    res.status(200).send('Added menu')
  } catch{
    console.log('Could not get value of restaurant')
  }
}

const deleteRestaurant = async (req, res) => {
  try {
    const restaurantRef = await firebase.database().ref('restaurants' + `/${req.query.id}`)
    restaurantRef.remove()
    res.status(200).send('Restaurant deleted')
  } catch{
    res.status(400).send('Could not remove restaurant')
  }
}
const deleteMenu = async (req, res) => {
  try {
    const restaurantRef = await firebase.database().ref('restaurants' + `/${req.query.id}` + `/menus/${req.query.menuName}`)
    restaurantRef.remove()
    res.status(200).send('Menu deleted')
  } catch{
    res.status(400).send('Could not remove menu')
  }
}

const getRestaurantOrders = async (req,res) => {
	try {
		const ordersRef = await firebase.database().ref('orders')
		const ordersVal = await ordersRef.once('value')
		const ordersObj = ordersVal.val()
		let ordersArray = []
		for (let i in ordersObj){
			if(ordersObj[i].restaurant===req.params.restaurant){
				ordersArray.push(ordersObj[i])
			}
		}
		res.status(200).send(ordersArray)
	} catch {
		res.sendStatus(400)
	}
}

module.exports = {
  getAllRestaurants,
  getMenu,
  addMenu,
  deleteRestaurant,
  deleteMenu,
  getRestaurantOrders
}
