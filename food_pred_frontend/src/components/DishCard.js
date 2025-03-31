import React from 'react';
import '../styles/DishCard.css';

function DishCard({ dish }) {
  return (
    <div className="dish-card">
      <div className="dish-header">
        <h3 className="dish-name">{dish.name}</h3>
        <span className="dish-count">{dish.count} orders</span>
      </div>
      <div className="dish-details">
        <div className="detail-item">
          <span className="detail-label">Type:</span>
          <span className="detail-value">{dish.type}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Popularity:</span>
          <div className="popularity-bar">
            <div 
              className="popularity-fill" 
              style={{ width: `${dish.popularity}%` }}
            ></div>
          </div>
          <span className="popularity-value">{dish.popularity}%</span>
        </div>
        {dish.dayBreakdown && (
          <div className="day-breakdown">
            <h4>Daily Breakdown:</h4>
            <ul className="day-list">
              {Object.entries(dish.dayBreakdown).map(([day, count]) => (
                <li key={day} className="day-item">
                  <span className="day-name">{day}:</span>
                  <span className="day-count">{count} orders</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default DishCard;