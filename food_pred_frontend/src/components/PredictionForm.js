// src/components/PredictionForm.js
import React, { useState } from 'react';
import { predictFood } from '../services/api';

function PredictionForm() {
  const [formData, setFormData] = useState({
    // Add relevant fields based on your prediction model
    // For example:
    ingredient1: '',
    ingredient2: '',
    // ...
  });
  
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Use the predictFood service function
      const data = await predictFood(formData);
      setPrediction(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="prediction-form">
      <h2>Food Prediction</h2>
      <form onSubmit={handleSubmit}>
        {/* Example form fields - customize based on your needs */}
        <div className="form-group">
          <label htmlFor="ingredient1">Ingredient 1:</label>
          <input
            type="text"
            id="ingredient1"
            name="ingredient1"
            value={formData.ingredient1}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="ingredient2">Ingredient 2:</label>
          <input
            type="text"
            id="ingredient2"
            name="ingredient2"
            value={formData.ingredient2}
            onChange={handleChange}
          />
        </div>
        {/* Add more form fields as needed */}
        
        <button type="submit" disabled={loading}>
          {loading ? 'Predicting...' : 'Predict'}
        </button>
      </form>
      
      {prediction && (
        <div className="prediction-result">
          <h3>Prediction Result:</h3>
          <p>Predicted food: {prediction.prediction}</p>
          <p>Confidence: {prediction.confidence}%</p>
        </div>
      )}
    </div>
  );
}

export default PredictionForm;