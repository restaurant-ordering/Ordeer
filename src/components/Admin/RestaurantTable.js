import React, { useEffect, useState } from 'react'
import { withStyles } from '@material-ui//styles';
import PropTypes from 'prop-types'
import axios from 'axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { CommunicationEmail } from 'material-ui/svg-icons';
const styles = {
  root: {
    width: '100%',
    marginTop: 9,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
}
const RestaurantTable = props => {
  const { classes } = props
  const [restaurants, updateRestaurants] = useState([])

  const getRestaurants = async () => {
    const response = await axios.get('/api/restaurants')
    //convert response to array of restaurant objects
    let restaurantArray = []
    for (let i in response.data) {
      response.data[i].name = i
      restaurantArray.push(response.data[i])
    }
    console.log(restaurantArray)
    updateRestaurants(restaurantArray)
    // updateDisplayedRestaurants(restaurantArray)
  }
  useEffect(() => { getRestaurants() }, [])
  //making our CreateData function
  let id = 0;
  function createData(name, address, city, state, zip, email) {
    id += 1;
    return { id, name, address, city, state, zip, email };
  }
  //creating our empty array to hold the restaurants
  const rows = []
  //looping over all restaurants and returning a createData function for each restaurant
  for (let i in restaurants) {
    console.log(restaurants[i])
    const name = restaurants[i].name
    const email = restaurants[i].email
    const address = Object.keys(restaurants[i].addresses)[0]
    const city = Object.values(restaurants[i].addresses)[0].city
    const state = Object.values(restaurants[i].addresses)[0].state
    const zip = Object.values(restaurants[i].addresses)[0].zip

    rows.push(createData(name, address, city, state, zip, CommunicationEmail))
    // let state = restaurant.addresses[0].state
    // let zip = restaurant.addresses[0].zip
  }
  console.log('rows : ', rows)
  return (

    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Restaurant Name</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">State</TableCell>
            <TableCell align="right">Zip</TableCell>
            <TableCell align="right">Owner Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.address}</TableCell>
              <TableCell align="right">{row.city}</TableCell>
              <TableCell align="right">{row.state}</TableCell>
              <TableCell align="right">{row.zip}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>

  )
}
RestaurantTable.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(RestaurantTable)
