import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CalorieResult = ({ route }) => {
  const { dailyCalorieIntake } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Daily Calorie Intake</Text>
      <Text style={styles.result}>{dailyCalorieIntake} kcal</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  result: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default CalorieResult;
