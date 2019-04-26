import React,{Component} from 'react';
import './Nav.css'

class Nav extends Component{
  searchField = React.createRef();

  handleSubmit = (e)=>{
    e.preventDefault();
    const search = this.searchField.current.value;
    this.props.handleSearch(search);
  }

  render(){
    return (
      <div className = "Nav">
      <button onClick={()=>this.props.handleLogout()}>Logout</button>
      <button onClick={()=>this.props.handleUser()}>Profile</button>
        <form onSubmit={this.handleSubmit}>
          <input className="text"
            type="text"
            placeholder="Search for Album"
            ref={this.searchField}
          />
          <input className="button"
            type="submit"
            value="Search"
          />
        </form>
      </div>
    );
  }
}
export default Nav;

