import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form.js';
import Search from './Search.js';
import Login from './Login.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Form Validation</h2>
        </div>
        <Form />
		<br/>
		<br/>
        <Login />
		<br/>
		<br/>
        <Search />
		
      </div>
    );
  }
}

export default App;