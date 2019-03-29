import React from 'react';

class Login extends React.Component{
constructor(props){
  super(props);
};
  userInput = React.createRef();

  handleSubmit = (e) => {
    e.preventDefault();
    const name = this.userInput.current.value;
    this.props.updateUserName(name);
  }


render(){
  return (
    <form onSubmit={(e) => this.handleSubmit(e)}>
      <input
        type="text"
        placeHolder="Enter a Username"
        ref={this.userInput}
      />
      <input
        type="submit"
      />
    </form>
  );
}
}

export default Login;