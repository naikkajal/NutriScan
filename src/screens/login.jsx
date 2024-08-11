// src/screens/Login.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import Entypo from '@expo/vector-icons/Entypo';
import { Fontisto } from '@expo/vector-icons';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const loginData = { email, password };

    axios.post('http://192.168.1.103:5011/login', loginData)
      .then(res => {
        if (res.data.status === 'ok') {
          if (res.data.profileCompleted) {
            navigation.navigate('Main');
          } else {
            navigation.navigate('Main', { screen: 'Track' });
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
              style={styles.inputText}
              placeholder='Email'
              placeholderTextColor={"#888"}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Entypo name="lock" size={20} color="black" style={styles.icon} />
            <TextInput
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
  image: {
    width: "100%",
    height: 200,
    marginTop: 0,
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
  },
  formContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
  },
  signup: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  getstarted: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: "#f1f1f1",
    flexDirection: "row",
    borderRadius: 50,
    marginVertical: 10,
    elevation: 10,
    height: 50,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    height: "100%",
    borderRadius: 50,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginVertical: 10,
    marginRight: 20,
  },
  forgotPassword: {
    fontSize: 14,
    color: 'mediumblue',
  },
  buttonContainer: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "530",
    marginBottom: 20,
    marginTop: 7,
  },
  gradientButton: {
    borderRadius: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupRedirect: {
    alignSelf: 'center',
    marginTop: 100,
  },
  signupRedirectText: {
    fontSize: 16,
    fontWeight: "300",
    textAlign: "center",
  },
  signupText: {
    fontWeight: "bold",
    color: '#007BFF',
  },
});

export default Login;
