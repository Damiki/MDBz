import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Redirect } from
  "react-router-dom";
import Login from './Components/Login/Login';
import User from './Components/Users/User';
import Nav from './Components/Nav/Nav';
// import Results from './Components/Result/results';
// import Album from './Components/Album/Album';

class App extends Component {
  state = {
    isLoggedIn: false,
    username: ''
  }

  updateUserName = (username) => {
    fetch('/user/'+username)
    .then(res => res.json())
    .then(()=> this.setState({
      username,
      isLoggedIn: true
    }));
  }

  render() {
    return (
      <Router>
        
        <div>
          <div className = {this.state.isLoggedIn ? "show" : "no-show"}><Nav /></div>
          <ul>
            <li className={this.state.isLoggedIn ? "no-show" : "show"}>
              <Link to="/login">Login</Link>
            </li>
          </ul>
          <Route 
            className ={this.state.isLoggedIn ? "no-show" : "show"}
            exact path="/login"
            render={() => <Login 
            updateUserName={this.updateUserName} />}
          />
          <Route
            exact path="/user"
            render={()=> <User 
              username  = {this.state.username}
            />}
          />
          {/* <Route 
            exact path="/results"
            component={Results}
          /> */}
          {/* <Route
            exact path="/album"
            component={Album}
          /> */}
          
        </div>
      </Router>
    );
  }
}
/*if(this.state.isLoggedIn)
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
}*/

export default App
