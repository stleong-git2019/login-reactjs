import React, { Component } from 'react';
import { FormErrors } from './FormErrors';
import './Form.css';

class Form extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
	  fullname: '',
      formErrors: {email: '', password: '',fullname: ''},
      emailValid: false,
      passwordValid: false,
	  fullnameValid:false,
      formValid: false
    }
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
	let fullnameValid = this.state.fullnameValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid.';
        break;
      case 'password':
        passwordValid = value.match(/^[a-zA-Z0-9]+$/);
        fieldValidationErrors.password = passwordValid ? '': ' is invalid';
        break;
	  case 'fullname':
        fullnameValid = value.match(/^[a-zA-Z]+$/);
        fieldValidationErrors.fullname = fullnameValid ? '' : ' is invalid.';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid,
					fullnameValid: fullnameValid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid && this.state.fullnameValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

	handleFormSubmit( event ) {
	  event.preventDefault();
	  
	  // call to server to get cards
	  fetch("http://localhost:3001/user",{
		method: 'POST',
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify({name: this.state.fullname, email: this.state.email,  password: this.state.password })
	  });
	  
	  
	};
	
  render () {
    return (
      <form className="demoForm">
        <h2>Sign up</h2>
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.fullname)}`}>
          <label htmlFor="fullname">Name</label>
          <input type="text" required className="form-control" name="fullname"
            placeholder="Name"
            value={this.state.fullname}
            onChange={this.handleUserInput}  />
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
          <label htmlFor="email">Email address</label>
          <input type="email" required className="form-control" name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleUserInput}  />
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleUserInput}  />
        </div>
        <button type="submit" className="btn btn-primary" disabled={!this.state.formValid} onClick={e => this.handleFormSubmit(e)} >Sign up</button>
      </form>
    )
  }
}

export default Form;