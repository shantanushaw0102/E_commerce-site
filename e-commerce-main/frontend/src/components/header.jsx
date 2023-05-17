import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../context/authContext';

function Header() {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <div>
      <Link to="/">Home</Link>
      <span> | </span>
      {user ? (
        <button onClick={logoutUser} type="submit">
          Logout
        </button>
      ) : (
        <Link to="/login">Login</Link>
      )}
      {user && <p>Hello {user.first_name}</p>}
    </div>
  );
}

export default Header;
