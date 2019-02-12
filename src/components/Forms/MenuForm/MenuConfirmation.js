import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';

export class MenuConfirmation extends Component {
  continue = e => {
    e.preventDefault();
    // PROCESS FORM //
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const {
      values: { menu_name, categories, category_name, menu_item, image, price, description, customization }
    } = this.props;
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Confirm Menu Data" />
          <List>
            <ListItem primaryText="Menu Name" secondaryText={menu_name} />
            <ListItem primaryText="Categories" secondaryText={categories} />
            <ListItem primaryText="Category Name" secondaryText={category_name} />
            <ListItem primaryText="Menu Item" secondaryText={menu_item} />
            <ListItem primaryText="Image" secondaryText={image} />
            <ListItem primaryText="Price" secondaryText={price} />
            <ListItem primaryText="Description" secondaryText={description} />
            <ListItem primaryText="Customization" secondaryText={customization} />
          </List>
          <br />
          <RaisedButton
            label="Back"
            primary={false}
            style={styles.button}
            onClick={this.back}
          />
          <RaisedButton
            label="Confirm & Continue"
            primary={true}
            style={styles.button}
            onClick={this.continue}
          />
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

const styles = {
  button: {
    margin: 15
  }
};

export default MenuConfirmation;