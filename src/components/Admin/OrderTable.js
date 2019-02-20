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
const OrderTable = props => {
  const { classes } = props
  const [orders, updateOrders] = useState([])

  const getOrders = async () => {
    const response = await axios.get('/api/admin/orders')
    //convert response to array of restaurant objects
    let ordersArray = []
    for (let i in response.data) {
      response.data[i].name = i
      ordersArray.push(response.data[i])
    }
    // console.log(ordersArray)
    updateOrders(ordersArray)
  }
  //creating our createData function to populate the table later
  let id = 0;
  function createData(name, date, restaurant, price, user, email) {
    id += 1;
    return { id, name, date, restaurant, price, user, email };
  }
  //creating our empty array to hold the restaurants
  const rows = []
  //looping over all restaurants and returning a createData function for each restaurant
  for (let i in orders) {
    if (orders[i].checkedOut) {
      const name = orders[i].name
      const email = Object.values(orders[i].user)[1]
      const date = orders[i].date
      const dateResult = Date.parse(date)
      let newDate = new Date(dateResult)
      let format = newDate.toLocaleString("en-US")
      const price = orders[i].price
      const restaurant = orders[i].restaurant
      const user = Object.values(orders[i].user)[0]
      rows.push(createData(name, format, restaurant, price, user, email))
    }
  }

  // console.log(rows)
  useEffect(() => { getOrders() }, [])
  // useEffect(() => { console.log(orders) }, [orders])

  return (

    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Order Name</TableCell>
            <TableCell align="right">Date / Time</TableCell>
            <TableCell align="right">Restaurant</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">User</TableCell>
            <TableCell align="right">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.restaurant}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.user}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>

  )
}
OrderTable.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(OrderTable)
