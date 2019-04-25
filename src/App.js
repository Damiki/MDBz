import React, { Component } from 'react';
import './App.css';

import Routes from './Routes';
import Nav from './Components/Nav/Nav';


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoggedIn: false,
      isSearching:false,
      isLoading:true,
      search: ""
  }
    this.checkLogin();
  }

  updateUserName = (username) => {
    fetch('/user/'+username)
    .then(res => res.json())
    .then(()=> this.setState({
      username,
      isLoggedIn:true
  }));
  }

  checkLogin = ()=>{
    
    fetch('/check')
    .then(res => res.json())
    .then((res)=> {
      if(res === 1)
        this.setState(()=>{
          return{
              isLoggedIn : true,
              isLoading : false
            }
          })
        else
          this.setState({isLoading:false});
          })
  }


  handleLogout = ()=>{
    console.log("\nLogging out");
    fetch('/logout')
    .then(()=> this.setState({isLoggedIn:false}));
  }

  handleSearch = (search)=>{
    this.setState({
      search,
      isSearching:true});
  }

  handleCardClick = ()=>{
    console.log("\nCLICKED :D");
  }

  render() {
    if(this.state.isLoading)
      return <div>Loading...</div>
    else
    return (
      <div className = "total-wrap">
        {this.state.isLoggedIn && <Nav 
          handleSearch = {this.handleSearch} 
          handleLogout = {this.handleLogout}
           />}
        <Routes
          checkLogin = {this.checkLogin}
          isLoggedIn = {this.state.isLoggedIn}
          isSearching = {this.state.isSearching}
          updateUserName = {this.updateUserName}
          search = {this.state.search}
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