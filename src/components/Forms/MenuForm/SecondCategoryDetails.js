continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Enter Second Category Details" />
          <TextField
            hintText="Enter the Number of Items"
            floatingLabelText="Items"
            onChange={handleChange('category_name')}
            defaultValue={values.category_name}
          />
          <br />
          <TextField
            hintText="Enter the Item's Name"
            floatingLabelText="Name"
            onChange={handleChange('menu_item')}
            defaultValue={values.menu_item}
          />
          <br />
          <RaisedButton
            label="Back"
            primary={false}
            style={styles.button}
            onClick={this.back}
          />
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

export default SecondCategoryDetails;