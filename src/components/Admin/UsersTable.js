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
const UsersTable = props => {
  const { classes } = props
  const [users, updateUsers] = useState([])
  //creating our createData function to populate the table later
  let id = 0;
  function createData(name, dateCreated, lastLogin, email) {
    id += 1;
    return { id, name, dateCreated, lastLogin, email };
  }
  const getUsers = async () => {
    const response = await axios.get('/api/admin/users')
    //convert response to array of restaurant objects
    let usersArray = []
    for (let i in response.data) {
      response.data[i].name = i
      usersArray.push(response.data[i])
    }
    updateUsers(usersArray)
  }
  //creating our empty array to hold the restaurants
  const rows = []
  //looping over all restaurants and returning a createData function for each restaurant
  for (let i in users) {
    const name = users[i].name
    const email = users[i].email
    const firstDate = users[i].createdAt
    let formattedFirst = new Date(+firstDate).toLocaleDateString("en-US")
    const secondDate = users[i].lastLoginAt
    let formattedSecond = new Date(+secondDate).toLocaleDateString("en-US")
    rows.push(createData(name, formattedFirst, formattedSecond, email))

  }
  useEffect(() => { getUsers() }, [])
  useEffect(() => { console.log(users) }, [users])

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>User Name</TableCell>
            <TableCell align="right">Date Created</TableCell>
            <TableCell align="right">Last Login</TableCell>
            <TableCell align="right">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.dateCreated}</TableCell>
              <TableCell align="right">{row.lastLogin}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>

  )
}
UsersTable.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(UsersTable)
