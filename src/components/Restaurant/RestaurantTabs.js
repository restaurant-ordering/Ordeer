import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import CompletedOrders from './Orders/CompletedOrders'
import IncompleteOrders from './Orders/IncompleteOrders'

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
    // width: 100,
    width: '100vw',
    flexGrow: 1,
    // backgroundColor: primary,
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
      <AppBar position="static" >
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Incomplete Orders" />
          <Tab label="Completed Orders" />
        </Tabs>
      </AppBar>
      {value === 0 && <TabContainer><IncompleteOrders /></TabContainer>}
      {value === 1 && <TabContainer><CompletedOrders /></TabContainer>}
    </div>
  );
}

export default withStyles(styles)(SimpleTabs);
