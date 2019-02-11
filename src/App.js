import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import routes from "./routes";
import firebase from './firebase/firebase';
import './App.css';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App_Container">
          {routes}
        </div>
      </Router>
    );
  }
}

export default App;