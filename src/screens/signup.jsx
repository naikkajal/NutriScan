import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import { Fontisto } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const Signup = () => {
  const navigation = useNavigation();
  const handleRegister = () => {
    navigation.navigate("Login");
  }

  return (
    <View style={styles.content}>
      <Image source={require("../src/images/topimg.png")} style={styles.image} />
      <Text style={styles.signup}>Create Account</Text>
      <Text style={styles.getstarted}>Just a few quick things to get started</Text>
      <View style={styles.usernamecontainer}>
        <Entypo name="user" size={20} color="black" style={styles.usericon} />
        <TextInput
          style={styles.usernametext}
          placeholder='Username'
          placeholderTextColor={"#888"}
        />
      </View>
      <View style={styles.emailcontainer}>
        <Fontisto name="email" size={24} color="black" style={styles.emailicon} />
        <TextInput
          style={styles.emailtext}
          placeholder='Email'
          placeholderTextColor={"#888"}
        />
      </View>
      <View style={styles.mobilecontainer}>
        <Entypo name="mobile" size={24} color="black" style={styles.usericon} />
        <TextInput
          style={styles.mobiletext}
          placeholder='Mobile No.'
          placeholderTextColor={"#888"}
        />
      </View>
      <View style={styles.passwordcontainer}>
        <Entypo name="lock" size={20} color="black" style={styles.usericon} />
        <TextInput
          style={styles.passwordtext}
          placeholder='Password'
          placeholderTextColor={"#888"}
        />
      </View>
      <View>
        <Text style={styles.forgotcontainer}>Forgot your password?</Text>
      </View>
      <View style={styles.createcontainer}>
        <TouchableOpacity onPress={handleRegister} style={styles.signinButton}>
          <LinearGradient
            colors={['#8A2BE2', '#FF1493']}
            style={styles.gradientButton}
            start={[0, 0]}
            end={[1, 1]}
          >
            <Text style={styles.signinText}>Sign In</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={styles.alhaveacccountainer}>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.alhaveacctext}>
            Already have an account? <Text style={{ textDecorationLine: "underline", color: "darkblue", fontWeight: "bold" }}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Signup

const styles = StyleSheet.create({
  content: {
    backgroundColor: "white",
    flex: 1
  },
  image: {
    width: "120%",
    height: "20%"
  },
  signup: {
    fontSize: 31,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 40
  },
  getstarted: {
    textAlign: "center",
    marginTop: 15,
    fontWeight: "500",
    fontSize: 17
  },
  usernamecontainer: {
    backgroundColor: "#f1f1f1",
    flexDirection: "row",
    borderRadius: 50,
    marginHorizontal: 50,
    marginTop: 30,
    elevation: 10,
    height: 50,
    alignItems: "center",
  },
  usernametext: { textAlign: "center" },
  emailcontainer: {
    backgroundColor: "#f1f1f1",
    flexDirection: "row",
    borderRadius: 50,
    marginHorizontal: 50,
    marginTop: 30,
    elevation: 10,
    height: 51,
    alignItems: "center",
  },
  usericon: {
    marginHorizontal: 20
  },
  emailicon: { marginHorizontal: 20 },
  mobileicon: {},
  emailtext: {
    textAlign: "center"
  },
  mobilecontainer: {
    backgroundColor: "#f1f1f1",
    flexDirection: "row",
    borderRadius: 50,
    marginHorizontal: 50,
    marginTop: 30,
    elevation: 10,
    height: 50,
    alignItems: "center",
  },
  mobiletext: { textAlign: "center" },
  passwordcontainer: {
    backgroundColor: "#f1f1f1",
    flexDirection: "row",
    borderRadius: 50,
    marginHorizontal: 50,
    marginTop: 32,
    elevation: 10,
    height: 50,
    alignItems: "center",
  },
  passwordtext: { textAlign: "center" },
  forgotcontainer: {
    textAlign: "right",
    marginRight: 55,
    marginVertical: 5,
    color: "mediumblue",
    fontWeight: "400",
    fontSize: 15,
    marginTop: 15
  },
  createcontainer: {
    backgroundColor: "#f1f1f1",
    flexDirection: "row",
    borderRadius: 50,
    marginHorizontal: 50,
    marginTop: 30,
    elevation: 10,
    height: 50,
    alignItems: "center",
  },
  signinButton: {
    flex: 1,
    borderRadius: 50,
  },
  gradientButton: {
    flex: 1,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  signinText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  alhaveacccountainer: {
    marginTop: 75,
    alignSelf: 'center',
  },
  alhaveacctext: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "300",
    alignSelf: 'center',
  },
});

