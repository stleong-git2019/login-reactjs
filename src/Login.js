import React, { Component } from 'react';


class Login extends Component{
	
	constructor(props) {
	  super(props);
	  this.state = {
		searchEmail: '',
		password: '',
		error: null,
		isLoaded: false,
		items: []
	  }
	};
	
	handleFormSubmit( event ) {
	  event.preventDefault();
	  
	  
	  // call to server to get cards
	  fetch("http://35.198.193.108:3000/login/"+this.state.searchEmail+"/"+this.state.password)
      .then(res => res.json())
      .then(
        (result) => {
			console.log(result);
          this.setState({
            isLoaded: true,
			error: null,
            items: result.message
          });
				  
        },
		
        (error) => {
          this.setState({
            isLoaded: false,
			items: [],
            error: "Irregularity occurred"
          });
        }
      )
	  
	  
	};
	
	render() {
	  const { searchEmail, password, error, isLoaded, items } = this.state;
	  return (
		<div className="Login">
		<h2>Login</h2>
		<div>
		<label>Login</label>
		<input id="searchEmail" name="searchEmail" placeholder="Login Email" 
			value={this.state.searchEmail}
			onChange={e => this.setState({ searchEmail: e.target.value })}
		/>
        </div>
		<div>
		<label>Password</label>
		<input id="password" name="password" type='password' placeholder="Password" 
			value={this.state.password}
			onChange={e => this.setState({ password: e.target.value })}
		/>
        </div>
		<div>
		<input type="submit" onClick={e => this.handleFormSubmit(e)}  value="Submit" />
		</div>
		<div id="error">
			{error}
		</div>
		<div id="result">
				{items}
		</div>
		</div>
	  );
	};
	
}

export default Login;
