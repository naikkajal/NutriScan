import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

const TrackerScreen = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [dailyCalorieIntake, setDailyCalorieIntake] = useState(null);

  const calculateCalorieIntake = async () => {
    try {
      const response = await axios.post('http://192.168.1.103:5011/calculate', {
        height: Number(height),
        weight: Number(weight),
        age: Number(age),
        gender,
        activityLevel,
      });
      setDailyCalorieIntake(response.data.dailyCalorieIntake);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tracker Screen</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Height (cm):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight (kg):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gender:</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity
            style={[styles.radioButton, gender === 'male' && styles.radioButtonSelected]}
            onPress={() => setGender('male')}
          >
            <Text style={styles.radioText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radioButton, gender === 'female' && styles.radioButtonSelected]}
            onPress={() => setGender('female')}
          >
            <Text style={styles.radioText}>Female</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Activity Level:</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity
            style={[styles.radioButton, activityLevel === 'sedentary' && styles.radioButtonSelected]}
            onPress={() => setActivityLevel('sedentary')}
          >
            <Text style={styles.radioText}>Sedentary</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radioButton, activityLevel === 'active' && styles.radioButtonSelected]}
            onPress={() => setActivityLevel('active')}
          >
            <Text style={styles.radioText}>Active</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={calculateCalorieIntake}>
        <LinearGradient
          colors={['#8A2BE2', '#FF1493']}
          style={styles.buttonGradient}
          start={[0, 0]}
          end={[1, 1]}
        >
          <Text style={styles.buttonText}>Calculate Calorie Intake</Text>
        </LinearGradient>
      </TouchableOpacity>
      {dailyCalorieIntake !== null && (
        <Text style={styles.result}>Daily Calorie Intake: {dailyCalorieIntake} kcal</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  radioButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  radioButtonSelected: {
    backgroundColor: '#8A2BE2',
  },
  radioText: {
    color: '#000',
  },
  button: {
    width: '100%',
    marginTop: 16,
  },
  buttonGradient: {
    paddingVertical: 15,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  result: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TrackerScreen;
