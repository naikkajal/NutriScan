import axios from 'axios';

const API_KEY = 'a4399f4af6ce40a29e5f7e2e0c27567a';
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