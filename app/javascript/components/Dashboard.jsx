import React from 'react';

function Dashboard({ currentUser }) {
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>
        Status:
        {currentUser}
      </h2>
    </div>
  );
}

export default Dashboard;
