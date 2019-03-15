import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

class NavHead extends Component {
  render() {
    return (
      <div className="navigation">
        <h1>greatreads</h1>
        {this.renderContent()}
      </div>
    )
  }

  renderContent = () => {
    if (this.props.auth) {
      return (
        <div>
          <NavLink exact to="/home">Home</NavLink>
          <NavLink exact to="/my-books">My Books</NavLink>
          <NavLink exact to="/profile">My Profile</NavLink>
          <NavLink exact to="/browse">Browse</NavLink>
          <span onClick={this.props.handleLogout}>Logout</span>
        </div>
      )
    }
  }
}

export default NavHead;
