import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker'; // Import Picker

const UserDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params;

  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState(''); // Default to empty string
  const [activityLevel, setActivityLevel] = useState(''); // Default to empty string
  const [email, setEmail] = useState('');
  const [dailyCalorieIntake, setDailyCalorieIntake] = useState(null);

  const handleSaveDetails = () => {
    const userDetails = {
      userId,
      height,
      weight,
      age,
      gender,
      activityLevel,
    };

    axios.post('http://192.168.1.104:5011/userDetails', userDetails)
      .then(res => {
        if (res.data.status === 'ok') {
          Alert.alert('Success', 'Details Saved Successfully!');
          navigation.navigate('Login');
        } else {
          Alert.alert('Error', JSON.stringify(res.data));
        }
      })
      .catch(error => {
        Alert.alert('Error', error.message);
      });
  };

  const calculateCalories = async () => {
    try {
      const response = await axios.post('http://192.168.1.104:5011/calculate', {
        height: Number(height),
        weight: Number(weight),
        age: Number(age),
        gender,
        activityLevel,
        email,
      });
      if (response.status === 200) {
        setDailyCalorieIntake(response.data.dailyCalorieIntake);
      } else {
        Alert.alert('Error', 'Failed to calculate calories');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Enter Your Details</Text>
      
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
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={gender}
            style={styles.picker}
            onValueChange={(itemValue) => setGender(itemValue)}
          >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Activity Level:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={activityLevel}
            style={styles.picker}
            onValueChange={(itemValue) => setActivityLevel(itemValue)}
          >
            <Picker.Item label="Select Activity Level" value="" />
            <Picker.Item label="Sedentary" value="sedentary" />
            <Picker.Item label="Lightly Active" value="lightly_active" />
            <Picker.Item label="Moderately Active" value="moderately_active" />
            <Picker.Item label="Very Active" value="very_active" />
            <Picker.Item label="Extra Active" value="extra_active" />
          </Picker>
        </View>
      </View>
      
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f5d']} style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={calculateCalories}>
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>
      </LinearGradient>

      {dailyCalorieIntake && (
        <Text style={styles.result}>
          Your daily calorie intake should be around {dailyCalorieIntake} calories.
        </Text>
      )}

      <TouchableOpacity onPress={handleSaveDetails} style={styles.buttonContainer}>
        <LinearGradient
          colors={['#8A2BE2', '#FF1493']}
          style={styles.gradientButton}
          start={[0, 0]}
          end={[1, 1]}
        >
          <Text style={styles.buttonText}>Save Details</Text>
        </LinearGradient>
      </TouchableOpacity>
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
    marginTop: 40,
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
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
  gradientButton: {
    borderRadius: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  result: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginVertical: 15,
  },
});

export default UserDetails;
