import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import Login from './Login';
import Signup from './Signup';
import Logout from './Logout';

const App = () => {
  const [user, setUser] = useState(null); // Track authenticated user

  // Fetch current user on app load
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const response = await fetch('/auth/user', {
        credentials: 'include', // Include cookies for session management
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleSignup = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <>
          <h1>Welcome, {user.userName}!</h1>
          <Todo />
          <Logout onLogout={handleLogout} />
        </>
      ) : (
        <>
          <Login onLogin={handleLogin} />
          <Signup onSignup={handleSignup} />
        </>
      )}
    </div>
  );
};

export default App;
