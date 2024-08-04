import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { View, StyleSheet } from 'react-native';
import Signup from './src/screens/signup';
import Login from './src/screens/login';
import CaptureScreen from './src/screens/capture';
import TrackerScreen from './src/screens/calorietracker';
import SplashScreen from './src/screens/splashscreen'; 
import CalorieResult from './src/screens/CalorieResult'; 
import UserDetails from './src/screens/UserDetails';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Tracker') {
            return <Ionicons name="fast-food" size={size} color="white" />;
          } else if (route.name === 'Capture') {
            return <Entypo name="camera" size={size} color={color} />;
          }
        },
        tabBarBackground: () => (
          <LinearGradient
            colors={['#8A2BE2', '#FF1493']}
            style={styles.gradientBackground}
            start={[0, 0]}
            end={[1, 1]}
          />
        ),
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Capture" component={CaptureScreen} />
      <Tab.Screen name="Tracker" component={TrackerScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="UserDetails" component={UserDetails} />
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="CalorieResult" component={CalorieResult} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
