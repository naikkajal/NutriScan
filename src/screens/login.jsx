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
    welcontainer:{
        alignContent:"center"
    },
    weltext:{
        textAlign:"center",
        marginTop:100,
        fontSize:35,
        fontWeight:"bold"
    },
    logtext:{
        textAlign:"center",
        marginTop:10,
        fontSize:20,
        fontWeight:"bold"
    },
    usercontainer:{
      backgroundColor:"lightgrey",
      flexDirection:"row",
      marginTop:70,
      height:60,
      marginHorizontal:55,
      borderRadius:50
    },
    usertext:{
      marginLeft:30
    },
    passcontainer:{
      backgroundColor:"lightgrey",
      flexDirection:"row",
      marginTop:40,
      height:60,
      marginHorizontal:50,
      borderRadius:50
    },
    forgottext:{
      textAlign:"right",
      marginRight:60,
      marginTop:16,
      color:"darkblue"
    },
    signinbutton:{ 
      backgroundColor:"firebrick",
      height:50,
      marginTop:30,
      marginHorizontal:50,
      borderRadius:50,
      alignItems:"center",
    },
    signintext:{
      textAlign:"centre",
      color:"white",
      fontSize:20,
      marginVertical:10
    },
    createtext:{
      textAlign:"center",
      marginTop:200
    }
})