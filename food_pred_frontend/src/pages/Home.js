import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  const [dishCount, setDishCount] = useState('5');
  const navigate = useNavigate();

  const loadDashboard = () => {
    navigate(`/dashboard?top_n=${dishCount}`);
  };

  return (
    <div className="home-container">
      <h2>Welcome, Admin!</h2>
      <div className="selection-container">
        <label htmlFor="dishCount">Select number of top dishes per day:</label>
        <select 
          id="dishCount" 
          value={dishCount} 
          onChange={(e) => setDishCount(e.target.value)}
          className="custom-select"
        >
          <option value="5">Top 5</option>
          <option value="10">Top 10</option>
          <option value="15">Top 15</option>
          <option value="20">Top 20</option>
          <option value="25">Top 25</option>
          <option value="all">All</option>
        </select>
        <button 
          onClick={loadDashboard} 
          className="primary-button"
        >
          <span className="button-content">Show Dashboard</span>
        </button>
      </div>
    </div>
  );
}

export default Home;
