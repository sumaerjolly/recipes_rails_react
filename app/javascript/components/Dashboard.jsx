import React from 'react';

function Dashboard(props) {
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Status: {props.userGet}</h2>
    </div>
  );
}

export default Dashboard;
