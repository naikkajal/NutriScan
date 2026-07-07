import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, TextInput, Alert, Modal, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../api/config';

const Profilescreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editHeight, setEditHeight] = useState('');
  const [editWeight, setEditWeight] = useState('');
  const [editActivityLevel, setEditActivityLevel] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      loadUserData();
    }, [])
  );

  const loadUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        const parsedData = JSON.parse(userDataString);
        setUserData(parsedData);
        setEditHeight(parsedData.height?.toString() || '');
        setEditWeight(parsedData.weight?.toString() || '');
        setEditActivityLevel(parsedData.activityLevel || '');
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateAge = (dob) => {
    if (!dob) return 'N/A';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getActivityLevelLabel = (level) => {
    const labels = {
      'sedentary': 'Sedentary',
      'lightly_active': 'Lightly Active',
      'moderately_active': 'Moderately Active',
      'very_active': 'Very Active',
      'extra_active': 'Extra Active'
    };
    return labels[level] || level;
  };

  const handleSaveChanges = async () => {
    try {
      const updateData = {
        userId: userData.userId,
        height: Number(editHeight),
        weight: Number(editWeight),
        activityLevel: editActivityLevel
      };

      const res = await axios.post(`${BASE_URL}/update-profile`, updateData, {
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (res.data.status === 'ok') {
        await AsyncStorage.setItem('userData', JSON.stringify(res.data.user));
        setUserData(res.data.user);
        setEditModalVisible(false);
        Alert.alert('Success', 'Profile updated successfully!');
      } else {
        Alert.alert('Error', res.data.data || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Update error:', error);
      Alert.alert('Error', error.message || 'Failed to update profile');
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('userToken');
              await AsyncStorage.removeItem('userData');
              navigation.replace('Login');
            } catch (error) {
              console.error('Error logging out:', error);
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <LinearGradient
        colors={['#8A2BE2', '#FF1493']}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.container}
      >
        <ActivityIndicator size="large" color="white" />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#8A2BE2', '#FF1493']}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.container}
    >
      <View style={styles.profileHeader}>
        <Ionicons name="person-circle" size={50} color="white" />
        <Text style={styles.headerText}>Profile</Text>
      </View>

      <View style={styles.avatarContainer}>
        <Ionicons name="person-circle" size={100} color="white" />
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Name:</Text>
            <Text style={styles.infoText}>{userData?.name || 'N/A'}</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoText}>{userData?.email || 'N/A'}</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Mobile:</Text>
            <Text style={styles.infoText}>{userData?.mobile || 'N/A'}</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Age:</Text>
            <Text style={styles.infoText}>{calculateAge(userData?.dob)} years</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Gender:</Text>
            <Text style={styles.infoText}>{userData?.gender ? userData.gender.charAt(0).toUpperCase() + userData.gender.slice(1) : 'N/A'}</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Height:</Text>
            <Text style={styles.infoText}>{userData?.height ? `${userData.height} cm` : 'N/A'}</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Weight:</Text>
            <Text style={styles.infoText}>{userData?.weight ? `${userData.weight} kg` : 'N/A'}</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Activity Level:</Text>
            <Text style={styles.infoText}>{getActivityLevelLabel(userData?.activityLevel)}</Text>
          </View>

          <View style={[styles.infoItem, styles.calorieItem]}>
            <Text style={styles.infoLabel}>Daily Calories:</Text>
            <Text style={styles.calorieText}>{userData?.dailyCalorieIntake || 'N/A'} cal</Text>
          </View>
        </View>

        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionButton} onPress={() => setEditModalVisible(true)}>
            <Ionicons name="create-outline" size={20} color="white" style={{ marginRight: 10 }} />
            <Text style={styles.optionText}>Edit Health Data</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.optionButton, styles.logoutButton]} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="white" style={{ marginRight: 10 }} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Edit Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Health Data</Text>

            <Text style={styles.modalLabel}>Height (cm)</Text>
            <TextInput
              style={styles.modalInput}
              value={editHeight}
              onChangeText={setEditHeight}
              keyboardType="numeric"
              placeholder="Enter height"
            />

            <Text style={styles.modalLabel}>Weight (kg)</Text>
            <TextInput
              style={styles.modalInput}
              value={editWeight}
              onChangeText={setEditWeight}
              keyboardType="numeric"
              placeholder="Enter weight"
            />

            <Text style={styles.modalLabel}>Activity Level</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={editActivityLevel}
                onValueChange={(itemValue) => setEditActivityLevel(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Sedentary" value="sedentary" />
                <Picker.Item label="Lightly Active" value="lightly_active" />
                <Picker.Item label="Moderately Active" value="moderately_active" />
                <Picker.Item label="Very Active" value="very_active" />
                <Picker.Item label="Extra Active" value="extra_active" />
              </Picker>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButtonCancel} onPress={() => setEditModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButtonSave} onPress={handleSaveChanges}>
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  scrollContainer: {
    flex: 1,
  },
  infoContainer: {
    marginVertical: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
  },
  calorieItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  infoLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  infoText: {
    fontSize: 15,
    color: 'white',
  },
  calorieText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  optionsContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  optionButton: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#9400d3',
    marginTop: 20,
  },
  logoutText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalLabel: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  modalButtonCancel: {
    flex: 1,
    backgroundColor: '#999',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  modalButtonSave: {
    flex: 1,
    backgroundColor: '#8A2BE2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profilescreen;
