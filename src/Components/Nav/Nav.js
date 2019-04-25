import React,{Component} from 'react';
import './Nav.css'

class Nav extends Component{
  constructor(props){
    super(props);
  };

  searchField = React.createRef();

  handleSubmit = (e)=>{
    e.preventDefault();
    const search = this.searchField.current.value;
    this.props.handleSearch(search);
  }

  render(){
    return (
      <div className = "Nav">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Search for Album"
            ref={this.searchField}
          />
          <input 
            type="submit"
            value="Search"
          />
        </form>
        <button onClick={()=>this.props.handleLogout()}>Logout</button>
      </div>
    );
  }
}
export default Nav;

