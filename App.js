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
import FoodItems from './src/screens/FoodItems'; 
import AddMeals from './src/screens/addmeals';
import Profilescreen from './src/screens/profilescreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Track') {
            return <Ionicons name="fast-food" size={size} color={color} />;
          } else if (route.name === 'Profile') {
            return <Ionicons name="person" size={size} color={color} />;
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
      <Tab.Screen name="Track" component={TrackerScreen} />
      <Tab.Screen name="Profile" component={Profilescreen} />
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
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="FoodItems" component={FoodItems} /> 
        <Stack.Screen name="AddMeals" component={AddMeals} /> 
        <Stack.Screen name="CaptureScreen" component={CaptureScreen} />
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
