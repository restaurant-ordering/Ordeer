import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


export class MenuDetails extends Component {
  continue = () => {
    this.props.nextStep();
  };


  render() {
    const { values, handleChange } = this.props;
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Enter Menu Details" />
          <TextField
            hintText="Enter Your Menu Name"
            floatingLabelText="Menu Name"
            onChange={handleChange('menu_name')}
            defaultValue={values.menu_name}
          />
          <br />
          <TextField
            hintText="Enter the Number of Categories"
            floatingLabelText="Category"
            onChange={handleChange('categories')}
            defaultValue={values.categories}
          />
          <br />
          <RaisedButton
            label="Continue"
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

export default MenuDetails;