import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FoodItems = ({ route, navigation }) => {
  const { dailyCalorieIntake } = route.params;
  const [selectedMeals, setSelectedMeals] = useState({
    Breakfast: [],
    "Morning Snack": [],
    Lunch: [],
    "Evening Snack": [],
    Dinner: []
  });

  const addMealCalories = (mealTitle, calories) => {
    const calorieValue = parseFloat(calories);
    setSelectedMeals((prevMeals) => ({
      ...prevMeals,
      [mealTitle]: [...prevMeals[mealTitle], calorieValue]
    }));
  };

  const formatCalories = (calories) => {
    return calories > 0 ? calories.toString().replace(/^0+/, '') : '0';
  };

  const renderSelectedMeals = (mealTitle) => {
    const totalCalories = selectedMeals[mealTitle].reduce((acc, curr) => acc + parseFloat(curr), 0);
    return (
      <Text style={styles.caloriesText}>{formatCalories(totalCalories)} Cal</Text>
    );
  };

  const getTotalCalories = () => {
    const total = Object.values(selectedMeals).flat().reduce((acc, curr) => acc + parseFloat(curr), 0);
    return formatCalories(total);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons name="silverware-fork-knife" size={26} color="black" />
        <Text style={styles.header}>Eat up to {dailyCalorieIntake} Cal</Text>
      </View>
      <View style={styles.totalCaloriesContainer}>
        <Text style={styles.totalCaloriesText}>Total Calories: {getTotalCalories()} / {dailyCalorieIntake}</Text>
      </View>
      {[
        { title: 'Breakfast', subtitle: 'All you need is some breakfast 🌞🔍' },
        { title: 'Morning Snack', subtitle: 'Get energized by grabbing a morning snack 🥜' },
        { title: 'Lunch', subtitle: "Don't miss lunch 🥗 It's time to get a tasty meal" },
        { title: 'Evening Snack', subtitle: 'Refuel your body with a delicious evening snack' },
        { title: 'Dinner', subtitle: 'Enjoy a hearty dinner 🍽️' },
      ].map((meal, index) => (
        <View key={index} style={styles.section}>
          <View style={styles.mealHeader}>
            <Text style={styles.title}>{meal.title}</Text>
            {renderSelectedMeals(meal.title)}
          </View>
          <Text style={styles.subtitle}>{meal.subtitle}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddMeals', { addMealCalories, mealTitle: meal.title })}
            style={styles.plusIcon}
          >
            <MaterialIcons name="add" size={24} color="purple" />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 18,
    backgroundColor: '#f7f7f7',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 60,
    marginBottom: 40,
    marginLeft: 20,
  },
  header: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 30,
  },
  totalCaloriesContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalCaloriesText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'purple',
  },
  section: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 8,
    elevation: 2,
    marginVertical: 15,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginTop: 15,
  },
  plusIcon: {
    marginRight: 10,
    position: 'absolute',
    right: 0,
    marginTop:16
  },
  caloriesText: {
    fontSize: 16,
    color: 'green',
    marginRight:50
  },
});

export default FoodItems;
