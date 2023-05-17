/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import { createContext, ReactNode, useEffect, useState } from 'react';
import * as React from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext('');

export default AuthContext;

export function AuthProvider({ children }) {
  const [authTokens, setAuthTokens] = React.useState(() =>
    localStorage.getItem('authTokens')
      ? JSON.parse(localStorage.getItem('authTokens'))
      : null,
  );
  const [user, setUser] = React.useState(() =>
    localStorage.getItem('authTokens')
      ? jwtDecode(JSON.parse(localStorage.getItem('authTokens')).access)
      : null,
  );
  let [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const RegisterUser = async (e) => {
    e.preventDefault();
    console.log('register form submimtted');

    const responce = await fetch('http://127.0.0.1:8000/auth/api/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
        first_name: e.target.fname.value,
        last_name: e.target.lname.value,
        phone: e.target.phone.value,
      }),
    });
    const data = await responce.json();
    console.log('data:', data);
    if (responce.status === 200) {
      navigate('/login');
    } else {
      console.log('something went wrong');
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    console.log('form submimtted');

    const responce = await fetch('http://127.0.0.1:8000/auth/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });
    const data = await responce.json();
    console.log('data:', data);
    if (responce.status === 200) {
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem('authTokens', JSON.stringify(data));
      navigate('/');
    } else {
      console.log('something went wrong');
    }
  };

  const logoutUser = () => {
    console.log('clicked logout');
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
    localStorage.clear();
    navigate('/');
  };

  const refreshToken = async () => {
    console.log('token refreshed');

    const responce = await fetch('http://127.0.0.1:8000/auth/api/token/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh: authTokens?.refresh,
      }),
    });
    const data = await responce.json();
    console.log('data:', data);
    if (responce.status === 200) {
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem('authTokens', JSON.stringify(data));
    }
    setLoading(false);
  };

  useEffect(() => {
    if (loading) {
      refreshToken();
    }
    const refrestInterval = 1000 * 60 * 998;
    const interval = setInterval(() => {
      if (authTokens) {
        refreshToken();
      }
    }, refrestInterval);
    return () => clearInterval(interval);
  }, [authTokens, loading]);

  const contextData = {
    user,
    loginUser,
    logoutUser,
    RegisterUser,
  };

  console.log(user)
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
}
