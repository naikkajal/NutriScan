import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CaptureScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Capture Screen</Text>
    </View>
  );
};

export default CaptureScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
