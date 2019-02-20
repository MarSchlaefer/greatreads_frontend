import React, { Component } from 'react';
import PublicMain from './publicMain';
import LoginMain from './loginMain';
import AwardsMain from './awardsMain';



class PublicHome extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="main-content">
        <div className="public-left-container">
          <PublicMain books={this.props.books}/>
        </div>
        <div className="public-right-container">
          <LoginMain handleLogin={this.props.handleLogin}/>
          <AwardsMain />
        </div>
      </div>
    )
  }
}

export default PublicHome;
