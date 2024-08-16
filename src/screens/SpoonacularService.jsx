import axios from 'axios';

const API_KEY = 'f4fa8f409849405cbfe24e28525621d0';
const BASE_URL = 'https://api.spoonacular.com';

const SpoonacularService = {
  searchRecipes: async (query) => {
    try {
      const response = await axios.get(`${BASE_URL}/recipes/complexSearch`, {
        params: {
          query,
          apiKey: API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching data from Spoonacular API:', error);
      throw error;
    }
  },

  getRecipeDetails: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/recipes/${id}/nutritionWidget.json`, {
        params: {
          apiKey: API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching recipe details from Spoonacular API:', error);
      throw error;
    }
  },
};

export default SpoonacularService;