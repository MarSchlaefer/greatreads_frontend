import React, { Component } from 'react';
import { Link } from 'react-router-dom'

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
          <Link to="/home">Home</Link>
          <Link to="/my-books">My Books</Link>
          <Link to="/profile">My Profile</Link>
          <Link to="/browse">Browse</Link>
          <span onClick={this.props.handleLogout}>Logout</span>
        </div>
      )
    }
  }
}

export default NavHead;
