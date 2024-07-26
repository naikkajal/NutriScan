import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../firebase';  
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    navigation.navigate("Signup");
  };

  const handleSignin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("Main");
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
          <Image source={require("../images/topimg.png")} style={styles.image} />
          <View style={styles.hellocontainer}>
            <Text style={styles.hellotext}>Welcome</Text>
          </View>
          <View>
            <Text style={styles.signintext}>Sign in to your account</Text>
          </View>
          <View style={styles.usernamecontainer}>
            <Entypo name="user" size={20} color="black" style={styles.usericon} />
            <TextInput
              style={styles.usernametext}
              placeholder="Email"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.passwordcontainer}>
            <Entypo name="lock" size={20} color="black" style={styles.usericon} />
            <TextInput
              style={styles.usernametext}
              placeholder="Password"
              placeholderTextColor="#888"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          <Text style={styles.forgotcontainer}>Forgot your password?</Text>
        </View>
        <View style={styles.signcontainer}>
          <TouchableOpacity onPress={handleSignin}>
            <LinearGradient
              colors={['#8A2BE2', '#FF1493']}
              style={styles.gradientIconContainer}
              start={[0, 0]}
              end={[1, 1]}
            >
              <Text style={styles.signtext}>Sign in</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.donthaveacccountainer}>
          <TouchableOpacity onPress={handleRegister}>
            <Text style={styles.donthaveacctext}>
              Don't have an account? <Text style={{ textDecorationLine: "underline", color: "darkblue", fontWeight: "bold" }}>Create</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

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
    marginTop: 0,
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: 0,
  },
  hellocontainer: {
    marginTop: 20,
  },
  hellotext: {
    textAlign: "center",
    fontSize: 50,
    fontWeight: "bold",
  },
  signintext: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "530",
    marginBottom: 20,
    marginTop: 7,
  },
  usernamecontainer: {
    backgroundColor: "#f1f1f1",
    flexDirection: "row",
    borderRadius: 50,
    marginHorizontal: 50,
    marginVertical: 20,
    elevation: 10,
    height: 50,
    alignItems: "center",
  },
  usernametext: {
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
  passwordcontainer: {
    backgroundColor: "#f1f1f1",
    flexDirection: "row",
    borderRadius: 50,
    marginHorizontal: 50,
    marginVertical: 20,
    elevation: 10,
    height: 50,
    alignItems: "center",
  },
  forgotcontainer: {
    textAlign: "right",
    marginRight: 55,
    marginVertical: 5,
    color: "mediumblue",
    fontWeight: "400",
    fontSize: 15,
  },
  signcontainer: {
    marginTop: 70,
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
  donthaveacccountainer: {
    marginTop: 120,
    alignSelf: 'center',
  },
  donthaveacctext: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "300",
    alignSelf: 'center',
  },
});






