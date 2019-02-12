import React, { Component } from 'react';
import MenuDetails from './MenuDetails';
import FirstCategoryDetails from './FirstCategoryDetails';
import SecondCategoryDetails from './SecondCategoryDetails';
import ThirdCategoryDetails from './ThirdCategoryDetails';
import FirstItemDetails from './FirstItemDetails';
import SecondItemDetails from './SecondItemDetails';
import ThirdItemDetails from './ThirdItemDetails';
import MenuConfirmation from './MenuConfirmation';
import MenuSuccess from './MenuSuccess';

export class MenuForm extends Component {
  state = {
    step: 1,
    menu_name: '',
    categories: '',
    category_name: '',
    menu_item: '',
    image: '',
    price: '',
    description: '',
    customization: ''

  }

  // Go to the Next Step Function
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Handle the Input Field Change Function
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  // Go to the Previous Step Function
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  render() {
    const { step } = this.state;
    const { menu_name, categories, menu_item, image, price, description, customization} = this.state;
    const values = { menu_name, categories, menu_item, image, price, description, customization};

    // Instead of a return statement we are going to use a switch statement
    switch (step) {
        case 1:
        // Directs user to the MenuDetails Page
        return (
          <MenuDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        )
        case 2:
        // Directs user to the FirstCategoryDetails Page      
        return (
          <FirstCategoryDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
        case 3:
        // Directs user to the FirstItemDetails Page
        return (
          <FirstItemDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
        case 4:
        // Directs user to the SecondCategoryDetails Page
        return (
          <SecondCategoryDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
        case 5:
        // Directs user to the SecondItemDetails Page
        return (
          <SecondItemDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
        case 6:
        // Directs user to the ThirdCategoryDetails Page
        return (
          <ThirdCategoryDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
        case 7:
        // Directs user to the ThirdItemDetails Page
        return (
          <ThirdItemDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
        case 8:
        // Directs user to the MenuConfirmation Page
        return (
          <MenuConfirmation
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
          />
        )
        case 9:
        // Directs user to the MenuSuccess Page
        return <MenuSuccess />;
    }
  }
}

export default MenuForm