import React from 'react';
import './Nav.css'

const Nav = (props) => {

  return (
    <div className = "Nav">
      <form>
        <input
          type="text"
          placeholder="Search for Album"
        />
      </form>
      <button onClick={()=>props.handleLogout()}>Logout</button>
    </div>
  );
}

export default Nav;

