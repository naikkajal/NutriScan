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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    marginTop: 15,
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
  radioTextSelected: {
    color: '#fff',
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
});

export default TrackerScreen;
