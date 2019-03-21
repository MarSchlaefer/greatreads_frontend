import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class NavHead extends Component {
  render() {
    return (
      <nav>
        {this.renderContent()}
      </nav>
    )
  }

  renderContent = () => {
    if (this.props.auth) {
      return (
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/my-books">My Books</Link></li>
          <li><Link to="/profile">My Profile</Link></li>
          <li><Link to="/browse">Browse</Link></li>
          <li onClick={this.props.handleLogout}><a href="">Logout</a></li>
        </ul>
      )
    }
  }
}

export default NavHead;
