import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Signup = () => {
  const navigation = useNavigation();
  const handleRegister = () => {
    navigation.navigate("Login");
  };
  return (
    <View style={styles.createcontainer}>
      <Text style={styles.createtext}>Create Account</Text>
      <Text style={styles.startedtext}>Just a few quick things to get started</Text>
      <View style={styles.usercontainer}>
        <TextInput style={styles.usertext}
          placeholder='Username'
          placeholderTextColor={"black"}
        />

      </View>
      <View style={styles.usercontainer}>
        <TextInput style={styles.usertext}
          placeholder='Email'
          placeholderTextColor={"black"}
        />

      </View>
      <View style={styles.usercontainer}>
        <TextInput style={styles.usertext}
          placeholder='Mobile No.'
          placeholderTextColor={"black"}
        />

      </View>
      <View style={styles.passcontainer}>
      <TextInput style={styles.usertext}
          secureTextEntry
          placeholder='Password'
          placeholderTextColor={"black"}
        />  
      </View>
      <Text style={styles.forgottext}>Forgot Password?</Text>
      <View style={styles.signinbutton}>
        <Text style={styles.signintext}>SignIn</Text>
      </View>
      <View>
      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.alreadytext}>
          Don't have an Account?<Text style={{textDecorationLine:"underline"}}>Create</Text>
        </Text>
      </TouchableOpacity>
      </View>
    </View>

  )
}


export default Signup

const styles = StyleSheet.create({
  createcontainer:{alignContent:"center"},
  createtext:{textAlign:"center",
        marginTop:100,
        fontSize:35,
        fontWeight:"bold"},
        startedtext:{
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
      marginHorizontal:50,
      borderRadius:50
    },
    usertext:{
      marginLeft:30
    },passcontainer:{
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
      marginTop:15,
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
    },alreadytext:{
      textAlign:"center",
      marginTop:10
    }
})