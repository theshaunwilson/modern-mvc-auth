import React from 'react';

const Logout = ({ onLogout }) => {
  const handleLogout = async () => {
    const response = await fetch('/auth/logout', {
      method: 'GET',
      credentials: 'include', // Include cookies for session management
    });

    if (response.ok) {
      onLogout(); // Notify parent component of successful logout
    } else {
      alert('Logout failed');
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
