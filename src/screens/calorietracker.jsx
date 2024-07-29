import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { auth } from '../../firebase'; 

const TrackerScreen = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [dailyCalorieIntake, setDailyCalorieIntake] = useState(null);
  const [mealType, setMealType] = useState('');
  const [foodItem, setFoodItem] = useState('');
  const [foodEntries, setFoodEntries] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        // Handle the case where the user is not authenticated
        console.log('No user is signed in');
      }
    });

    return () => unsubscribe();
  }, []);

  const calculateCalorieIntake = async () => {
    try {
      const response = await axios.post('http://192.168.1.104:3000/calculate', {
        height: Number(height),
        weight: Number(weight),
        activityLevel,
      });
      setDailyCalorieIntake(response.data.dailyCalorieIntake);
    } catch (error) {
      console.error(error);
    }
  };
  
  const addFoodEntry = async () => {
    try {
      if (userId) {
        const response = await axios.post('http://192.168.1.104:3000/addFood', {
          userId,
          mealType,
          foodItem,
        });
        setFoodEntries(response.data.foodEntries);
      } else {
        console.error('User ID is not available');
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tracker Screen</Text>
      <View style={styles.inputContainer}>
        <Text>Height (cm):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Weight (kg):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Activity Level:</Text>
        <TextInput
          style={styles.input}
          value={activityLevel}
          onChangeText={setActivityLevel}
        />
      </View>
      <Button title="Calculate Calorie Intake" onPress={calculateCalorieIntake} />
      {dailyCalorieIntake && (
        <Text style={styles.result}>Daily Calorie Intake: {dailyCalorieIntake} kcal</Text>
      )}
      <View style={styles.inputContainer}>
        <Text>Meal Type:</Text>
        <TextInput
          style={styles.input}
          value={mealType}
          onChangeText={setMealType}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Food Item:</Text>
        <TextInput
          style={styles.input}
          value={foodItem}
          onChangeText={setFoodItem}
        />
      </View>
      <Button title="Add Food Entry" onPress={addFoodEntry} />
      {foodEntries.length > 0 && (
        <View style={styles.entriesContainer}>
          <Text style={styles.entriesTitle}>Food Entries:</Text>
          {foodEntries.map((entry, index) => (
            <Text key={index}>
              {entry.mealType}: {entry.foodItem} - {entry.calories} kcal
            </Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
  },
  result: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
  entriesContainer: {
    marginTop: 24,
    width: '100%',
  },
  entriesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default TrackerScreen;