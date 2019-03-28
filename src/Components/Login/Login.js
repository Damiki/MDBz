import React, {Component} from 'react';

const Login = (props)=> {

const userInput = React.createRef();

handleSubmit = (e) =>{
  e.preventDefault();
  props.updateUserName(userInput.current.value);
}

  return(
    <form onSubmit = {(e)=> this.handleSubmit()}>
      <input 
        type = "text"
        placeHolder = "Enter a Username"
        ref = {userInput}
      />
      <input 
        type = "submit"
      />
    </form>
  );
}

export default Login;