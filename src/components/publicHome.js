import React, { Component } from 'react';
import CreateLogin from './createLogin';
import LoginMain from './loginMain';

class PublicHome extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="main-content">
        <LoginMain handleLogin={this.props.handleLogin}/>
        <CreateLogin handleSubmit={this.props.handleSubmit}/>
      </div>
    )
  }
}

export default PublicHome;
