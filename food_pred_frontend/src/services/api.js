const API_URL = 'http://localhost:5000';

export const fetchTopDishes = async (params) => {
  const { foodType, day, topN } = params;
  const queryParams = new URLSearchParams({
    food_type: foodType,
    day: day,
    n: topN
  }).toString();
  
  const response = await fetch(`${API_URL}/top_dishes?${queryParams}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch top dishes');
  }
  
  return response.json();
};