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
const CompletedOrders = props => {
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
  function createData(name, date, items, price, user, email) {
    id += 1;
    return { id, name, date, items, price, user, email };
  }
  //creating our empty array to hold the restaurants
  const rows = []
  //looping over all restaurants and returning a createData function for each restaurant
  for (let i in orders) {
    console.log(orders[i])
    if (orders[i].checkedOut && orders[i].complete) {
      const name = orders[i].name
      const email = !Object.keys(orders[i].user).includes('apiKey') ? Object.values(orders[i].user)[1] : orders[i].user['email']
      const date = orders[i].date
      const dateResult = Date.parse(date)
      const newDate = new Date(dateResult)
      const format = newDate.toLocaleString("en-US")
      const price = orders[i].price
      const items = Object.keys(orders[i].cart).length
      const user = !Object.keys(orders[i].user).includes('apiKey') ? Object.values(orders[i].user)[0] : orders[i].user['displayName']
      rows.push(createData(name, format, items, price, user, email))
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
            <TableCell align="right"># Of Items</TableCell>
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
              <TableCell align="right">{row.items}</TableCell>
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
CompletedOrders.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(CompletedOrders)
