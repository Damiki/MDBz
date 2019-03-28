import React, { Component } from 'react';
import './App.css';
import Login from './Components/Login/Login'
class App extends Component {
  state = {
    isLoggedIn: false,
    username: ''
  }  

  updateUserName = (username)=>{
    this.setState(username)
  }

  render() {
    if(this.state.isLoggedIn) 
    return (
      <div className="">
        <Login 
          updateUserName = {this.updateUserName()}
        />
      </div>
    );
    else
      return(
        <div className="">
          <Dave />
        </div>
      );
  }
}

export default App;
