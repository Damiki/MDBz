import React from 'react';
import {BrowserRouter as Router,Redirect,Route, Switch} from 'react-router-dom';
import Login from './Components/Login/Login';
import User from './Components/Users/User';
import Results from './Components/Result/results';
import Album from './Components/Album/Album';

class Routes extends React.Component{

    constructor(props){
        super(props);
        this.props.checkLogin();
    }
    render(){
        console.log("ISLOGGEDINBOI: "+this.props.isLoggedIn);
    return(
        <Router>
            <Switch>
                <Route exact path ="/" render = {()=>
                    this.props.isLoggedIn? (
                        <Redirect to={{pathname:'/user'}}/>
                    ):(
                        <Redirect to={{pathname:'/login'}} />
                    )
                } />

                <Route 
                    exact path ="/results"
                    render = {()=>
                    this.props.isSearching?<Results />:<div>Not Logged In</div>} 
                />

                <Route exact path="/album"
                render= {()=>
                    this.props.isLoggedIn?
                        ( <Album checkLogin={this.props.checkLogin} />
                        ):(
                            <Redirect to={{pathname:'/login'}}/>
                        ) 
                        }/>
                <Route exact path ="/login"
                render= {()=>
                    this.props.isLoggedIn? (
                    <Redirect to={{pathname:'/user'}} /> )
                    :
                    ( <Login 
                        updateUserName={this.props.updateUserName}
                        checkLogin={this.props.checkLogin}
                    />)
                    }/>
                <Route path="/user"
                render= {()=>
                    this.props.isLoggedIn?
                        ( <User checkLogin={this.props.checkLogin} />
                        ):(
                            <Redirect to={{pathname:'/login'}}/>
                        ) 
                        }
                />
            </Switch>
        </Router>
    );
}
}

export default Routes;