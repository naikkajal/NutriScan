import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import Entypo from '@expo/vector-icons/Entypo';
import { Fontisto } from '@expo/vector-icons';

const Signup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [secretText, setSecretText] = useState('');

  const handleRegister = () => {
    const userData = {
      name,
      email,
      mobile,
      password,
      userType
    };

    if (userType === 'Admin' && secretText !== 'Text1243') {
      return Alert.alert('Invalid Admin');
    }

    axios.post('http://192.168.249.199:5011/register', userData)
      .then(res => {
        if (res.data.status === 'ok') {
          Alert.alert('Success', 'Registered Successfully!');
          navigation.navigate('Main', { screen: 'Track' }, { userId: res.data.userId });
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
          <Text style={styles.signup}>Create Account</Text>
          <Text style={styles.getstarted}>Just a few quick things to get started</Text>
          
          <View style={styles.inputContainer}>
            <Entypo name="user" size={20} color="black" style={styles.icon} />
            <TextInput
              style={styles.inputText}
              placeholder='Username'
              placeholderTextColor={"#888"}
              value={name}
              onChangeText={setName}
            />
          </View>
          
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
            <Entypo name="mobile" size={20} color="black" style={styles.icon} />
            <TextInput
              style={styles.inputText}
              placeholder='Mobile No.'
              placeholderTextColor={"#888"}
              value={mobile}
              onChangeText={setMobile}
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
          
          <TouchableOpacity onPress={handleRegister} style={styles.buttonContainer}>
            <LinearGradient
              colors={['#8A2BE2', '#FF1493']}
              style={styles.gradientButton}
              start={[0, 0]}
              end={[1, 1]}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginRedirect}>
            <Text style={styles.loginRedirectText}>
              Already have an account? <Text style={{textDecorationLine: "underline", color: "darkblue", fontWeight: "bold" }}>Sign In</Text>
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
  loginRedirect: {
    alignSelf: 'center',
    marginTop: 100,
  },
  loginRedirectText: {
    fontSize: 16,
    fontWeight: "300",
    textAlign: "center",
  },
  loginText: {
    fontWeight: "bold",
    color: '#007BFF',
  },
});

export default Signup;
