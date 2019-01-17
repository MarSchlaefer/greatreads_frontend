import React, { Component } from 'react';
import PublicMain from './publicMain';
import LoginMain from './loginMain';
import AwardsMain from './awardsMain';



class PublicHome extends Component {
  render() {
    return (
      <div className="main-content">
        <div className="public-left-container">
          <PublicMain />
        </div>
        <div className="public-right-container">
          <LoginMain handlleLogin={this.props.handlleLogin}/>
          <AwardsMain />
        </div>
      </div>
    )
  }
}

export default PublicHome;
