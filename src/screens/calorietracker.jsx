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

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both fields.');
      return;
    }
    const loginData = { email, password };
  
    axios.post('http://192.168.1.104:5011/login', loginData)
      .then(res => {
        if (res.data.status === 'ok') {
          if (res.data.profileCompleted) {
            navigation.navigate('Home');
          } else {
            navigation.navigate('Main', { screen: 'Capture' });
          }
        } else {
          Alert.alert('Error', JSON.stringify(res.data));
        }
      })
      .catch(error => {
        Alert.alert('Error', error.message);
      });
  };
  
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'} style={{ backgroundColor: 'white' }}>
      <View style={styles.content}>
        <Image source={require("../images/topimg.png")} style={styles.image} />
        
        <View style={styles.formContainer}>
          <Text style={styles.signup}>Welcome Back</Text>
          <Text style={styles.getstarted}>Log in to your account</Text>
          
          <View style={styles.inputContainer}>
            <Fontisto name="email" size={20} color="black" style={styles.icon} />
            <TextInput
              accessibilityLabel="Email Input"
              style={styles.inputText}
              placeholder='Email'
              placeholderTextColor={"#888"}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Entypo name="lock" size={20} color="black" style={styles.icon} />
            <TextInput
              accessibilityLabel="Password Input"
              style={styles.inputText}
              placeholder='Password'
              placeholderTextColor={"#888"}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          
          <View style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPassword}>Forgot your password?</Text>
          </View>
          
          <TouchableOpacity onPress={handleLogin} style={styles.buttonContainer}>
            <LinearGradient
              colors={['#8A2BE2', '#FF1493']}
              style={styles.gradientButton}
              start={[0, 0]}
              end={[1, 1]}
            >
              <Text style={styles.buttonText}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.signupRedirect}>
            <Text style={styles.signupRedirectText}>
              Don't have an account? <Text style={{textDecorationLine: "underline", color: "darkblue", fontWeight: "bold" }}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
