import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
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
      name: username,
      email,
      mobile,
      password,
      userType
    };

    if (userType === 'Admin' && secretText !== 'Text1243') {
      return Alert.alert('Invalid Admin');
    }

    axios.post('http://192.168.1.104:5011/register', userData)
      .then(res => {
        if (res.data.status === 'ok') {
          Alert.alert('Success', 'Registered Successfully!');
          navigation.navigate('Login');
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
    </ScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  innerContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  content: {
    marginTop: 50,
  },
  hellocontainer: {
    marginTop: 20,
  },
  hellotext: {
    textAlign: "center",
    fontSize: 35,
    fontWeight: "bold",
  },
  inputContainer: {
    backgroundColor: "#f1f1f1",
    flexDirection: "row",
    borderRadius: 50,
    marginHorizontal: 50,
    marginVertical: 20,
    elevation: 10,
    height: 50,
    alignItems: "center",
  },
  inputText: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
    height: "100%",
    borderRadius: 50,
    paddingHorizontal: 10,
  },
  usericon: {
    marginLeft: 20,
  },
  signcontainer: {
    marginTop: 50,
    marginHorizontal: 50,
  },
  signtext: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  gradientIconContainer: {
    borderRadius: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,  // Added margin to separate buttons
  },
  haveaccountcontainer: {
    marginTop: 50,
    alignSelf: 'center',
  },
  haveaccounttext: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "300",
    alignSelf: 'center',
  },
});
