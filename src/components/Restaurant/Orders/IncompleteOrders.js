import React, { useEffect, useState } from 'react'
import { withStyles } from '@material-ui//styles';
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button'
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
  tablerow: {
    order: {
      backgroundColor: 'primary'
    },
    items: {
      color: 'secondary'
    }
  },
  button: {
    color: 'secondary'
  }
}
const IncompleteOrders = props => {
  const { classes, orders, completeOrder } = props
  const [display, updateDisplay] = useState([])

  useEffect(() => {
    updateDisplay(getRows())
  }, [orders])



  const getRows = () => {
    // console.log(orders)
    const filteredOrders = orders.length && orders.filter(order => {
      return (!order.hasOwnProperty('complete'))
    })
    console.log(filteredOrders)
    let ordersMap = filteredOrders && filteredOrders.length && filteredOrders.map((order, i) => {
      return (
        [order, ...order.cart]
      )
    })

    const flatOrders = ordersMap.length && ordersMap.flat()

    return flatOrders && flatOrders.map((item, i) => {
      if (item.cart) {
        return (
          <TableRow key={i} className={classes.tablerow.order} selected>
            <TableCell component="th" scope="row">{item.orderId}</TableCell>
            <TableCell align="center">Name: {item.user.displayName}</TableCell>
            <TableCell align="center">Email: {item.user.email}</TableCell>
            <TableCell align="center">Total: ${item.price}</TableCell>
            <TableCell >
              <Button onClick={() => { completeOrder(item.orderId) }} variant="contained" color="primary" >Complete</Button>
            </TableCell>
          </TableRow >
        )
      } else if (item.name) {
        return (
          <TableRow className={classes.tablerow.items} key={i}>
            <TableCell component="th" scope="row" />
            <TableCell align="center">{item.name}</TableCell>
            <TableCell align="center">{item.customize || 'No customization'}</TableCell>
            <TableCell align="center">{item.price}</TableCell>
          </TableRow>
        )
      }
    })
  }

  return (

    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow component="th" scope="row">
            <TableCell >Orders</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {display}
        </TableBody>
      </Table>
    </Paper>

  )
}
IncompleteOrders.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(IncompleteOrders)
