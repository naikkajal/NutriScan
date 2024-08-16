import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SpoonacularService from './SpoonacularService';
import { LinearGradient } from 'expo-linear-gradient';

const CaptureScreen = ({ route, navigation }) => {
  const { addMealCalories, mealTitle, dailyCalorieIntake } = route.params || {};
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [nutritionInfo, setNutritionInfo] = useState(null);
  const [showPredictButton, setShowPredictButton] = useState(true); // Manage button visibility

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

  const handleAddMeal = () => {
    if (nutritionInfo && addMealCalories) {
      console.log('Adding meal calories:', mealTitle, nutritionInfo.calories);
      addMealCalories(mealTitle, nutritionInfo.calories);
      navigation.navigate('FoodItems', {
        mealTitle: mealTitle,
        calories: nutritionInfo.calories,
        dailyCalorieIntake: dailyCalorieIntake,
      });
    } else {
      console.log('No nutrition info or addMealCalories function available.');
    }
  };

  const uploadImage = async () => {
    if (!image) {
      console.error('No image selected');
      return;
    }

    try {
      const localUri = image;
      const filename = localUri.split('/').pop();
      const formData = new FormData();
      formData.append('file', {
        uri: localUri,
        name: filename,
        type: 'image/jpeg',
      });

      const response = await fetch('http://192.168.249.199:5000/predict', { 
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Response from server:', data);
      setPrediction(data.prediction);
      setShowPredictButton(false); // Hide the button after prediction

      const searchResults = await SpoonacularService.searchRecipes(data.prediction);
      console.log('Search results:', searchResults);
      if (searchResults.results.length > 0) {
        const firstRecipeId = searchResults.results[0].id;
        const nutritionDetails = await SpoonacularService.getRecipeDetails(firstRecipeId);
        console.log('Nutrition details:', nutritionDetails);
        setNutritionInfo(nutritionDetails);
      } else {
        setNutritionInfo({ error: 'No nutritional information available.' });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Capture Your Meal</Text>
      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <TouchableOpacity onPress={takePhoto} style={styles.cameraContainer}>
            <Ionicons name="camera" size={50} color="gray" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.iconRow}>
        <TouchableOpacity onPress={takePhoto} style={styles.iconButton}>
          <Ionicons name="camera" size={30} color="purple" />
        </TouchableOpacity>
        <TouchableOpacity onPress={pickImage} style={styles.iconButton}>
          <Ionicons name="image" size={30} color="purple" />
        </TouchableOpacity>
      </View>
      {image && (
        <View>
          {showPredictButton && (
            <TouchableOpacity onPress={uploadImage}>
              <LinearGradient
                colors={['#8A2BE2', '#FF1493']}
                start={[0, 0]}
                end={[1, 1]}
                style={styles.predictButton}
              >
                <Text style={styles.predictButtonText}>Predict</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
          {!showPredictButton && prediction && (
            <View>
              <Text style={styles.predictionText}>{prediction}</Text>
              {nutritionInfo && (
                <View>
                  <Text style={styles.nutritionInfo}>Calories: {nutritionInfo.calories}</Text>
                  <Text style={styles.nutritionInfo}>Carbs: {nutritionInfo.carbs}</Text>
                  <Text style={styles.nutritionInfo}>Fat: {nutritionInfo.fat}</Text>
                  <Text style={styles.nutritionInfo}>Protein: {nutritionInfo.protein}</Text>
                  {nutritionInfo.error && <Text style={styles.nutritionInfo}>{nutritionInfo.error}</Text>}
                </View>
              )}
              {nutritionInfo && !nutritionInfo.error && (
                <TouchableOpacity onPress={handleAddMeal} style={styles.addMealButton}>
                  <LinearGradient
                    colors={['#8A2BE2', '#FF1493']}
                    start={[0, 0]}
                    end={[1, 1]}
                    style={styles.addMealButtonGradient}
                  >
                    <MaterialIcons name="add" size={24} color="white" />
                    <Text style={styles.addMealButtonText}>Add Meal</Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 35, // Moved down by 15 units
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    justifyContent: 'center',
    height: 200,
  },
  cameraContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 10,
  },
  iconButton: {
    padding: 10,
  },
  predictButton: {
    padding: 15,
    borderRadius: 5,
    marginVertical: 20,
    alignItems: 'center',
  },
  predictButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  predictionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  nutritionInfo: {
    fontSize: 16,
    marginVertical: 5,
  },
  addMealButton: {
    borderRadius: 5,
    overflow: 'hidden', // Ensure the gradient does not overflow the button
    marginVertical: 20,
  },
  addMealButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    justifyContent: 'center',
  },
  addMealButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default CaptureScreen;
