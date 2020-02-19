import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>This is a test to link</h1>
      <Link to="/recipes" className="btn btn-lg custom-button" role="button">
        View Recipes
      </Link>
    </div>
  );
}
export default Home;
