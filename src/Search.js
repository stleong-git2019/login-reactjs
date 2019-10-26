import React, { Component } from 'react';


class Search extends Component{
	
	constructor(props) {
	  super(props);
	  this.state = {
		searchName: '',
		error: null,
		isLoaded: false,
		items: []
	  }
	};
	
	handleFormSubmit( event ) {
	  event.preventDefault();
	  
	  
	  // call to server to get cards
	  fetch("http://localhost:3001/user/"+this.state.searchName)
      .then(res => res.json())
      .then(
        (result) => {
			console.log(result);
          this.setState({
            isLoaded: true,
			error: null,
            items: result.data
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
	  const { searchName, error, isLoaded, items } = this.state;
	  return (
		<div className="Search">
		<div>
		<label>Search Name</label>
		<input id="searchName" name="searchName" placeholder="Search Name.." 
			value={this.state.searchName}
			onChange={e => this.setState({ searchName: e.target.value })}
		/>
		<input type="submit" onClick={e => this.handleFormSubmit(e)}  value="Submit" />
		</div>
		<div id="error">
			{error}
		</div>
		<div id="result">
			{items.map((item) => (
			<div>
				{item.name}
			</div>
			))}
		</div>
		</div>
	  );
	};
	
}

export default Search;
