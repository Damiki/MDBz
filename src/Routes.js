import React from 'react';
import {BrowserRouter as Router,Redirect,Route, Switch} from 'react-router-dom';
import Login from './Components/Login/Login';
import User from './Components/Users/User';
// import Results from './Components/Result/results';
// import Album from './Components/Album/Album';

const Routes = (props) =>{
    return(
        <Router>
            <Switch>
                <Route exact path ="/" render = {()=>
                    props.isLoggedIn? (
                        <Redirect to={{pathname:'/user'}}/>
                    ):(
                        <Redirect to={{pathname:'/login'}} />
                    )
                } />
                <Route exact path ="/login"
                render= {()=>
                    props.isLoggedIn? (
                    <Redirect to={{pathname:'/user'}} /> )
                    :
                    ( <Login 
                        updateUserName={props.updateUserName}
                        checkLogin={props.checkLogin}
                    />)
                    }/>
                <Route path="/user"
                render= {()=>
                    props.isLoggedIn?
                        ( <User checkLogin={props.checkLogin} />
                        ):(
                            <Redirect to={{pathname:'login'}}/>
                        ) 
                        }
                />
            </Switch>
        </Router>
    );
}

export default Routes;