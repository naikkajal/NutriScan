import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const TrackerScreen = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [email, setEmail] = useState('');
  const [dailyCalorieIntake, setDailyCalorieIntake] = useState(null);

  const navigation = useNavigation();

  const calculateCalorieIntake = async () => {
    try {
      const response = await axios.post('http://192.168.1.104:5011/calculate', {
        height: Number(height),
        weight: Number(weight),
        age: Number(age),
        gender,
        activityLevel,
        email, // Add email to the request payload
      });
      setDailyCalorieIntake(response.data.dailyCalorieIntake);
      navigation.navigate('CalorieResult', { dailyCalorieIntake: response.data.dailyCalorieIntake });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Calculate Your Daily Calorie Intake</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
      </View>
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
            <Text style={[styles.radioText, gender === 'male' && styles.radioTextSelected]}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radioButton, gender === 'female' && styles.radioButtonSelected]}
            onPress={() => setGender('female')}
          >
            <Text style={[styles.radioText, gender === 'female' && styles.radioTextSelected]}>Female</Text>
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
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f5d']} style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={calculateCalorieIntake}>
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>
      </LinearGradient>
      {dailyCalorieIntake && (
        <Text style={styles.result}>Your daily calorie intake should be around {dailyCalorieIntake} calories.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop:40
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  radioGroup: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  radioButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    backgroundColor: '#4c669f',
    borderColor: '#4c669f',
  },
  radioText: {
    color: '#333',
  },
  radioTextSelected: {
    color: '#fff',
  },
  buttonContainer: {
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 20,
  },
  button: {
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  result: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});

export default TrackerScreen;
