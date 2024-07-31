import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import Entypo from '@expo/vector-icons/Entypo';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { Fontisto } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


const Signup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');


  const handleRegister = async () => {
    try {
      const response = await axios.post('http://192.168.1.102:5011/register', { name, email, mobile, password });
      if (response.data.status === "ok") {
        Alert.alert('Success', 'User Created');
        navigation.navigate("Login");
      } else {
        Alert.alert('Error', response.data.data);
      }
    } catch (error) {
      console.error(error.message);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.innerContainer}>
        <View style={styles.content}>
          <View style={styles.hellocontainer}>
            <Text style={styles.hellotext}>Create Account</Text>
          </View>
          <View style={styles.inputContainer}>
            <Entypo name="user" size={20} color="black" style={styles.usericon} />
            <TextInput
              style={styles.inputText}
              placeholder="Name"
              placeholderTextColor="#888"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.inputContainer}>
            <Entypo name="email" size={20} color="black" style={styles.usericon} />
            <TextInput
              style={styles.inputText}
              placeholder="Email"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputContainer}>
            <Entypo name="phone" size={20} color="black" style={styles.usericon} />
            <TextInput
              style={styles.inputText}
              placeholder="Mobile"
              placeholderTextColor="#888"
              value={mobile}
              onChangeText={setMobile}
            />
          </View>
          <View style={styles.inputContainer}>
            <Entypo name="lock" size={20} color="black" style={styles.usericon} />
            <TextInput
              style={styles.inputText}
              placeholder="Password"
              placeholderTextColor="#888"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
        </View>
        <View style={styles.signcontainer}>
          <TouchableOpacity onPress={handleRegister}>
            <LinearGradient
              colors={['#8A2BE2', '#FF1493']}
              style={styles.gradientIconContainer}
              start={[0, 0]}
              end={[1, 1]}
            >
              <Text style={styles.signtext}>Create Account</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.haveaccountcontainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.haveaccounttext}>
              Already have an account? <Text style={{ textDecorationLine: "underline", color: "darkblue", fontWeight: "bold" }}>Sign in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  const [userType, setUserType] = useState('');
  const [secretText, setSecretText] = useState('');
  const navigation = useNavigation();

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

    axios.post('http://192.168.1.30:5001/register', userData)
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
