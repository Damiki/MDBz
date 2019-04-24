import React from 'react';
import './Nav.css'

const Nav = () => {

  return (
    <div className = "Nav">
      <form>
        <input
          type="text"
          placeholder="Search for Album"
        />
      </form>
      <button onClick={()=>fetch('/logout')}>Logout</button>
    </div>
  );
}

export default Nav;

