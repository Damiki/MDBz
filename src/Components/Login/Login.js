import React from 'react';
import './Login.css';

class Login extends React.Component {
  constructor(props){
    super(props)
  this.state = {
    submitted: false
  }
    this.props.handleUser();
  }

  userInput = React.createRef();

  handleSubmit = (e) => {
    e.preventDefault();
    const name = this.userInput.current.value;
    if (name !== "") {
      this.setState({submitted : !this.state.submitted});
      this.props.updateUserName(name);
    }
  }


  render() {
    
    return (
      <form className={this.state.submitted ? "no-show" : "show"}
        onSubmit={(e) => this.handleSubmit(e)}>
        <input className="text"
          type="text"
          placeholder="Enter a Username"
          ref={this.userInput}
        />
        <input className="button"
          type="submit"
        />
      </form>
    );
  }
}

export default Login;