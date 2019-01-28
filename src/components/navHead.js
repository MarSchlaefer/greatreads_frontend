import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

class NavHead extends Component {
  render() {
    return (
      <div className="navigation">
          <NavLink exact to="/home">Home</NavLink>
          <NavLink exact to="/my-books">My Books</NavLink>
          <NavLink exact to="/browse">Browse</NavLink>
      </div>
    )
  }
}

export default NavHead;
