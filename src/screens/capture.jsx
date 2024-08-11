import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';

const CaptureScreen = () => {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera is required!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!image) {
      console.error('No image selected');
      return;
    }
  
    const localUri = image;
    const filename = localUri.split('/').pop();
    const formData = new FormData();
    formData.append('file', {
      uri: localUri,
      name: filename,
      type: 'image/jpeg', 
    });
  
    console.log('Sending image:', filename);
  
    try {
      const response = await axios.post('http://192.168.1.103:5000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response from server:', response.data);
      setPrediction(response.data.predictions);
    } catch (error) {
      console.error('Error uploading image:', error);
      if (error.response) {
        console.error('Server responded with:', error.response.data);
      }
    }
  };
  

  return (
    <View style={styles.container}>
      {!image && <Text style={styles.title}>Click/Select Image</Text>}
      <View style={styles.imageContainer}>
        {!image && (
          <TouchableOpacity onPress={takePhoto} style={styles.cameraIcon}>
            <Ionicons name="camera" size={50} color="black" />
          </TouchableOpacity>
        )}
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>
      {!image && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={takePhoto} style={styles.iconButton}>
            <Ionicons name="camera" size={32} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={pickImage} style={styles.iconButton}>
            <Ionicons name="images" size={32} color="black" />
          </TouchableOpacity>
        </View>
      )}
      {image && (
        <Button title="Predict" onPress={uploadImage} />
      )}
      {prediction && (
        <View style={styles.predictionContainer}>
          <Text>Predictions: {JSON.stringify(prediction)}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#d3d3d3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
  },
  cameraIcon: {
    position: 'absolute',
    zIndex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 20,
  },
  iconButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  predictionContainer: {
    marginTop: 20,
  },
});

export default CaptureScreen;
