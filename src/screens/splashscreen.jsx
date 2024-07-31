import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
      const timer = setTimeout(() => {
        navigation.replace('Login'); 
      }, 1000);
  
      return () => clearTimeout(timer); 
    }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../images/nsan.webp')} style={styles.logo} />
      <View style={styles.footer}>
        <Text style={styles.subtitle}>Capture and Track</Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#151615', 
  },
  subtitle: {
    fontSize: 15,
    color: '#E6F7FF', // Dark blue text color
    textAlign: 'center',
   
  },
  footer:{
    position:"absolute",
    bottom:80
  },
  logo:{
    width:180,
    height:180
  }
});

