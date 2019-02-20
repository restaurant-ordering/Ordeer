import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import OrderTable from './OrderTable'
import RestaurantTable from './RestaurantTable';
import UsersTable from './UsersTable'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = {
  root: {
    flexGrow: 1,
    // backgroundColor: theme.primary
  },
}

function SimpleTabs(props) {
  const { classes } = props
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="View All Orders" />
          <Tab label="View All Restaurants" />
          <Tab label="View All Users" />
        </Tabs>
      </AppBar>
      {value === 0 && <TabContainer><OrderTable /></TabContainer>}
      {value === 1 && <TabContainer><RestaurantTable /></TabContainer>}
      {value === 2 && <TabContainer><UsersTable></UsersTable></TabContainer>}
    </div>
  );
}

export default withStyles(styles)(SimpleTabs);
