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
      isLoadingResults:false,
      search: "",
      albums:[]
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
    console.log('handleSearch')
    this.setState({
      search,
    isLoadingResults:true});
    this.getResults(search);
  }

  handleUser = ()=>{
    this.setState({isSearching:false});
  }
  
  getResults = (search) => {
    // fetch('/search'+this.props.keyword)
    // const search = this.state.search;
    fetch('/search/'+search)
    .then(res => res.json())
    .then((res) =>
      this.setState({ albums: res, isLoadingResults:false, 
        isSearching:true}));
}

  render() {
    if(this.state.isLoading)
      return <div>Loading...</div>
    else if(this.state.isLoadingResults)
        return <div>Loading Results...</div>
    else
    return (
      <div className = "total-wrap">
        {this.state.isLoggedIn && <Nav 
          handleSearch = {this.handleSearch} 
          handleLogout = {this.handleLogout}
          handleUser = {this.handleUser}
           />}
        <Routes
          handleUser = {this.handleUser}
          albums = {this.state.albums}
          checkLogin = {this.checkLogin}
          isLoggedIn = {this.state.isLoggedIn}
          isSearching = {this.state.isSearching}
          updateUserName = {this.updateUserName}
        />
      </div>
    );
  }
}

export default App;