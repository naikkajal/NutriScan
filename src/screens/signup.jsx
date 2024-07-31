import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { Fontisto } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'; // Adjust the path to your firebase.js file

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Email and Password fields cannot be empty');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        Alert.alert('Success', 'User account created & signed in!');
        navigation.navigate('Login');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Error', 'That email address is already in use!');
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert('Error', 'That email address is invalid!');
        } else {
          Alert.alert('Error', error.message);
        }
      });
  };

  return (
    <View style={styles.content}>
      <Image source={require("../images/topimg.png")} style={styles.image} />

      <Text style={styles.signup}>Create Account</Text>
      <Text style={styles.getstarted}>Just a few quick things to get started</Text>
      <View style={styles.inputContainer}>
        <Entypo name="user" size={20} color="black" style={styles.icon} />
        <TextInput
          style={styles.inputText}
          placeholder='Username'
          placeholderTextColor={"#888"}
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.inputContainer}>
        <Fontisto name="email" size={24} color="black" style={styles.icon} />
        <TextInput
          style={styles.inputText}
          placeholder='Email'
          placeholderTextColor={"#888"}
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <Entypo name="mobile" size={24} color="black" style={styles.icon} />
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
      <Text style={styles.forgotPassword}>Forgot your password?</Text>
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
          Already have an account? <Text style={styles.loginText}>Sign In</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Signup;

const styles = StyleSheet.create({
  content: {
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 20,
  },
  image: {
    width: "100%",
    height: "20%",
    resizeMode: 'cover',
  },
  signup: {
    fontSize: 31,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 25
  },
  getstarted: {
    textAlign: "center",
    marginTop: 15,
    fontWeight: "500",
    fontSize: 17
  },
  inputContainer: {
    backgroundColor: "#f1f1f1",
    flexDirection: "row",
    borderRadius: 50,
    marginTop: 20,
    elevation: 5,
    height: 50,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  icon: {
    marginRight: 10
  },
  inputText: { 
    flex: 1,
    textAlign: "left",
    fontSize: 16,
  },
  forgotPassword: {
    textAlign: "right",
    marginVertical: 10,
    color: "mediumblue",
    fontWeight: "400",
    fontSize: 15,
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 50,
    elevation: 5,
  },
  gradientButton: {
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginRedirect: {
    marginTop: 40,
    alignSelf: 'center',
  },
  loginRedirectText: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "300",
  },
  loginText: {
    textDecorationLine: "underline",
    color: "darkblue",
    fontWeight: "bold",
  },
});
