## Axios Calls

### GET MENU BY RESTAURANT

Get an individual menus
```javascript
let menuReqBody = {
  //the name of the restaurant
  id: "Waffle Haus",
  //the name of the menu you want to grab. Restaurants can have multiple menus. Use default if none given
  menuName: "what's up buddy" || "default"
}
let first = await axios.post('/api/menus', menuReqBody)
//you can set the value of the categories you want to map over with the result of the call
first && this.setState({ menu: first })
```
### ADD MENU

add menu for individual restaurant.
req.body should look like:
let addMenuReqBody = {
  //currently selected restaurant
  restaurantName: "Waffle Haus",
  //the name for the menu you are entering
  menuName: "default",
  categories: {
    //store item objects in here. each item should have price, desc, name, etc
  },
}
let second = await axios.post('/api/add-menus', addMenuReqBody)

### ADD ORDER

after adding all the items you want to your cart (held in local state on the front end)
you can add an order to the database with all the information attached
```js
let addOrderReqBody = {
  cart=[
    //put each item in here when you click on them!
    //pull this value from local state
  ],
  date: 'use Date.Now()',
  price:/* store this number in local state.
      Add the item.price value to this onClick*/ 2,
  restaurant: 'Waffle Haus',
  user: /* Get this value using auth.currentUser().email */ 'bradenrshipley@gmail.com'
}
let third = await axios.post('/api/orders', addOrderReqBody)
```
### GET ORDER

After you add an order you can view it, but getting it requires the orderKey created in firebase, passed in as a query
you can do this if you pass in the key onClick (for example when rendering all orders in the admin page)
```js
let query = "-LYhbGF1MJVAbKSZHnfc"
let resultAfterQuery = await axios.get('/api/orders?orderId=' + query)
```

### GET CART

if you are looking for just the cart of an order you can access it by hitting a slightly different
 endpoint and passing in the order key as a query
 ```js
let query = "-LYhbGF1MJVAbKSZHnfc"
let resultAfterQuery = await axios.get('/api/cart?orderId=' + query)
```
the result will look like this
```js
let result = {
  "Four": {
    "customization": "new",
    "price": 2
  },
  "Three": {
    "customization": "guy",
    "price": 12
  },
  "Two": {
    "customization": "stuff",
    "price": 1
  }
}
```
### GET ALL ORDERS BY USER

If you are signed in as a user you can get all orders you've made by passing in your user email as a query
```js
let query = "bradenrshipley@gmail.com"
let resultAfterQuery = await axios.get('/api/orders?user=' + query)
```
the return from this will be something along the lines of this
```js
let result = [
  {
    "cart": {
      "One": {
        "customization": "new",
        "price": 2
      },
      "Three": {
        "customization": "guy",
        "price": 12
      },
      "Two": {
        "customization": "stuff",
        "price": 1
      }
    },
    "date": "02/14/2018",
    "price": 15,
    "restaurant": "Whataburger",
    "user": "bradenrshipley@gmail.com"
  },
  {
    "cart": {
      "Four": {
        "customization": "new",
        "price": 2
      },
      "Three": {
        "customization": "guy",
        "price": 12
      },
      "Two": {
        "customization": "stuff",
        "price": 1
      }
    },
    "date": "02/15/2018",
    "price": 12,
    "restaurant": "Taco Bell",
    "user": "bradenrshipley@gmail.com"
  }
]
```
### EDIT CART

If you want to edit a cart, you can do so by passing in the orderId you want to adjust and the new cart in the req.body. The new cart will replace the entire cart in the order you accessed.

```js
let query = "-LYhbGF1MJVAbKSZHnfc"
let cart = {
  "The": {
    "customization": "new",
    "price": 22
  },
  "New": {
    "customization": "new",
    "price": 122
  },
  "Cart": {
    "customization": "new",
    "price": 12
  }
}
axios.put('/api/cart?orderId=' + query, cart)
```
### DELETE ORDER

If you want to delete an order, reference the order, and the endpoint will delete that order and send back status(200) and "Removed order"
```js
let query = "-LYhbGF1MJVAbKSZHnfc"
axios.delete('/api/orders/?orderId=' + query)
```

### DELETE ITEM

If you want to delete an item on an order, pass in the orderId and the itemName you want deleted. The response will be status(200) and "Removed item"
```js
let query = "-LYhbGF1MJVAbKSZHnfc"
let item = "New"
axios.delete(`/api/cart?orderId=${query}?itemId=${item}`)
```

### DELETE RESTAURANT

Pass in the restaurant name you want to delete as a query. The response will be status(200) and "Restaurant deleted".

```js
let restuarant = "Subway"
axios.delete(`/api/restaurants?id=${restaurant}`)

```

### DELETE MENU

Pass in the restaurant name and the menu name you want to delete as queries. The response will be status(200) and "Menu deleted"

```js
let restaurant = "Subway"
let menu = "Default"
axios.delete(`/api/menus?id=${restaurant}?menuName=${menu}`)
```

### GET ALL RESTAURANTS

Get all restaurants currently on the DB.

```js
axios.get('/api/restaurants')
```
the response will be along the lines of...
```js
{"TacoTown": {
        "addresses": [
            null,
            {
                "city": "1",
                "state": "1",
                "zip": "1"
            }
        ],
        "email": "1",
        "image": "1",
        "menus": {
            "Default": [
                {
                    "items": 2,
                    "menu_items": [
                        {
                            "category": 1,
                            "description": "good",
                            "image": "url",
                            "name": "Good Taco",
                            "price": "2"
                        },
                        {
                            "category": 1,
                            "description": "bad",
                            "image": "url",
                            "name": "Bad Taco",
                            "price": "3"
                        }
                    ],
                    "name": "Tacos"
                },
                {
                    "items": 2,
                    "menu_items": [
                        {
                            "category": 2,
                            "description": "123",
                            "image": "2",
                            "name": "Good burrito",
                            "price": "2"
                        },
                        {
                            "category": 2,
                            "description": "bad",
                            "image": "url",
                            "name": "Bad Burrito",
                            "price": "1"
                        }
                    ],
                    "name": "Burritos"
                }
            ]
        },
        "owner": "1"
    },
    "Tamale House East": {
        "addresses": {
            "1707 E 6th St": {
                "city": "Austin",
                "state": "TX",
                "zip": 78702
            }
        },
        "email": "Tamale@gmail.com",
        "image ": "https://assets3.thrillist.com/v1/image/1361850/size/tmg-article_default_mobile;jpeg_quality=20.jpg",
        "owner": "Laura Jimenez"
    }
    // and so on
}
```

### GET ALL ORDERS

To get all orders any user has made, simply make a get request to the url

```js
axios.get('/api/admin/orders)
```

### GET ALL USERS

To get all users, simply make a get request to the url

```js
axios.get('/api/admin/users')
```
