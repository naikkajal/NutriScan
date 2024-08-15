import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import SpoonacularService from './SpoonacularService';

const AddMeals = ({ route, navigation }) => {
  console.log(route);
  console.log(navigation);
  const { addMealCalories, mealTitle } = route.params;
  console.log("after addMeal1r");
  const [query, setQuery] = useState('');
  console.log("after addMeal2");
  const [recipes, setRecipes] = useState([]);
  console.log("after addMeal3");
  const [error, setError] = useState('');
  console.log("after addMeal4");

  const handleSearch = async () => {
    setError('');  // Reset error message
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
      setError(error.message);
    }
  };

  const handleAddMeal = (calories) => {
    addMealCalories(mealTitle, calories);
    navigation.goBack();  // Navigate back to FoodItems screen
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.search}>Search For Food</Text>
      </View>
      <TextInput
        style={styles.foodinput}
        placeholder='Add food'
        value={query}
        onChangeText={setQuery}
      />
      <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
      <TouchableOpacity onPress={() => navigation.navigate('Capture')} style={styles.cameraButton} >
        <LinearGradient
          colors={['#8A2BE2', '#FF1493']}
          style={styles.gradientButton}
          start={[0, 0]}
          end={[1, 1]}
        >
          <MaterialIcons name="camera-alt" size={28} color="white" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  search: {
    marginTop: 60,
    fontSize: 22,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  foodinput: {
    marginTop: 30,
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
  errorText: {
    color: 'red',
    marginBottom: 20,
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
  cameraButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientButton: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    marginBottom:20,
    marginRight:20
  },
});

export default AddMeals;
