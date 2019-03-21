import React, { Component } from 'react'

class Search extends Component {

  constructor() {
    super()
    this.state = {
      inputVal: ""
    }
  }

  render() {
    return (
      <form onSubmit={this.props.handleSearch}>
        <input onChange={this.handleChange} value={this.state.inputVal} placeholder="Search..."></input>
      </form>
    )
  }

  handleChange = (e) => {
    console.log(this.state.inputVal);
    this.setState({
      inputVal: e.target.value
    })
  }

} //end of class

export default Search;
