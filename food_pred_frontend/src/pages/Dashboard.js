import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchTopDishes } from '../services/api';
import '../styles/Dashboard.css';

function Dashboard() {
  const [searchParams] = useSearchParams();
  const [foodType, setFoodType] = useState('Lunch');
  const [day, setDay] = useState('All');
  const [topN, setTopN] = useState(searchParams.get('top_n') || '5');
  const [dishes, setDishes] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateResults = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTopDishes({
        foodType,
        day,
        topN
      });
      setDishes(data);
    } catch (error) {
      console.error('Error fetching dishes:', error);
      setError('Failed to load dishes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateResults();
  }, []);

  return (
    <div className="dashboard">
      <div className="container">
        <div className="header-card">
          <div className="header-content">
            <div className="header-icon" id="foodTypeIcon"></div>
            <div className="header-text">
              <h1>Top Dishes Dashboard</h1>
              <p className="subtitle">Analyze your most popular dishes</p>
            </div>
          </div>

          <div className="controls">
            <div className="control-group">
              <label htmlFor="foodType">Food Type</label>
              <div className="select-container">
                <select 
                  id="foodType" 
                  className="custom-select"
                  value={foodType}
                  onChange={(e) => setFoodType(e.target.value)}
                >
                  <option value="Snacks">Snacks</option>
                  <option value="Lunch">Lunch</option>
                </select>
              </div>
            </div>

            <div className="control-group">
              <label htmlFor="daySelect">Day</label>
              <div className="select-container">
                <select 
                  id="daySelect" 
                  className="custom-select"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                >
                  <option value="All">All Days</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>
            </div>

            <div className="control-group">
              <label htmlFor="topN">Display Count</label>
              <div className="select-container">
                <select 
                  id="topN" 
                  className="custom-select"
                  value={topN}
                  onChange={(e) => setTopN(e.target.value)}
                >
                  <option value="5">Top 5</option>
                  <option value="10">Top 10</option>
                  <option value="15">Top 15</option>
                  <option value="20">Top 20</option>
                  <option value="25">Top 25</option>
                  <option value="all">All Dishes</option>
                </select>
              </div>
            </div>

            <button 
              onClick={updateResults} 
              className="primary-button"
              disabled={loading}
            >
              <span className="button-content">
                {loading ? 'Loading...' : 'Update Results'}
              </span>
            </button>
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div id="result" className="results-container">
          {loading ? (
            <div className="loading">Loading dishes...</div>
          ) : Object.keys(dishes).length > 0 ? (
            <div className="dish-grid">
              {Object.entries(dishes).map(([dishName, percentage], index) => (
                <div key={index} className="dish-card">
                  <h3 className="dish-name">{dishName}</h3>
                  <div className="dish-details">
                    <div className="popularity-container">
                      <div className="popularity-bar">
                        <div 
                          className="popularity-fill" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="popularity-value">{percentage}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">No dishes found</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;