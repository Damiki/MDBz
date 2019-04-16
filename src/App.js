import React, { Component } from 'react';
import './App.css';

import Routes from './Routes';
import Nav from './Components/Nav/Nav';


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
      <div className = "total-wrap">
        {this.state.isLoggedIn && <Nav />}
        <Routes 
          isLoggedIn = {this.state.isLoggedIn}
          updateUserName = {this.updateUserName}
          username = {this.state.username}
        />
      </div>
    );
  }
}

export default App;


// <Router>
        
      //   <div>
      //     <div className = {this.state.isLoggedIn ? "show" : "no-show"}><Nav /></div>
      //     <ul>
      //       <li className={this.state.isLoggedIn ? "no-show" : "show"}>
      //         <Link to="/login">Login</Link>
      //       </li>
      //     </ul>
      //     <Route 
      //       className ={this.state.isLoggedIn ? "no-show" : "show"}
      //       exact path="/login"
      //       render={() => <Login 
      //       updateUserName={this.updateUserName} />}
      //     />
      //     <Route
      //       exact path="/user"
      //       render={()=> <User 
      //         username  = {this.state.username}
      //       />}
      //     />
      //     {/* <Route 
      //       exact path="/results"
      //       component={Results}
      //     /> */}
      //     {/* <Route
      //       exact path="/album"
      //       component={Album}
      //     /> */}
          
      //   </div>
      // </Router>