import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import SpoonacularService from './SpoonacularService';

const AddMeals = ({ route, navigation }) => {
  const { addMealCalories, mealTitle } = route.params;
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async () => {
    try {
      const data = await SpoonacularService.searchRecipes(query);
      const detailedRecipes = await Promise.all(
        data.results.map(async (recipe) => {
          try {
            const details = await SpoonacularService.getRecipeDetails(recipe.id);
            return { ...recipe, details };
          } catch (error) {
            console.error(`Error fetching details for recipe ID ${recipe.id}:`, error);
            return { ...recipe, details: null };
          }
        })
      );
      setRecipes(detailedRecipes);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddMeal = (calories) => {
    addMealCalories(mealTitle, calories);
    navigation.goBack();  // Navigate back to FoodItems screen
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.foodinput}
        placeholder='Add food'
        value={query}
        onChangeText={setQuery}
      />
      <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.recipeItem}>
            <Text>{item.title}</Text>
            {item.details ? (
              <>
                <Text>Calories: {item.details.calories}</Text>
                <Text>Carbs: {item.details.carbs}</Text>
                <Text>Fat: {item.details.fat}</Text>
                <Text>Protein: {item.details.protein}</Text>
                <TouchableOpacity
                  onPress={() => handleAddMeal(item.details.calories)}
                  style={styles.addButton}
                >
                  <MaterialIcons name="add" size={24} color="purple" />
                </TouchableOpacity>
              </>
            ) : (
              <Text>No nutritional information available</Text>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default AddMeals;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  foodinput: {
    marginTop: 50,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  searchButton: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  recipeItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  addButton: {
    marginTop: 10,
    alignItems: 'center',
  },
});

