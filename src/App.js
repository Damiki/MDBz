import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Redirect } from
  "react-router-dom";
import Login from './Components/Login/Login';
import User from './Components/Users/User';

class App extends Component {
  state = {
    isLoggedIn: false,
    username: ''
  }

  updateUserName = (username) => {
    this.setState({
      username,
      isLoggedIn: true
    });
  }

  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/user">User</Link>
            </li>
          </ul>
          <Route
            exact path="/login"
            render={() => <Login updateUserName={this.updateUserName} />}
          />
          <Route exact path="/user" component={User} />
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
