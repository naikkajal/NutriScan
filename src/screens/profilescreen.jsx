import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

const Profilescreen = () => {
  const handleEdit = (field) => {
    console.log(`Edit ${field}`);
  };

  const handleLogout = () => {
    console.log('Logout');
  };

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
        <Image
          source={{ uri: 'https://via.placeholder.com/120' }} 
          style={styles.avatar}
        />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Username:</Text>
          <Text style={styles.infoText}>sanika</Text>
          <TouchableOpacity onPress={() => handleEdit('username')}>
            <Ionicons name="pencil" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoText}>sanikayovi@gmail.com</Text>
        </View>
      </View>
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Help Center</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Manage Your Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.optionButton, styles.logoutButton]} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
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
    marginVertical: 20,
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
    marginVertical: 30, 
    position: 'relative', 
  },
  avatar: {
    width: 120, 
    height: 120, 
    borderRadius: 60, 
    borderWidth: 3,
    borderColor: 'white',
  },
  addButton: {
    position: 'absolute',
    bottom: -10, 
    right: -10, 
    backgroundColor: '#FF1493',
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  infoContainer: {
    marginVertical: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 10,
  },
  infoText: {
    fontSize: 16,
    color: 'white',
    flex: 1,
  },
  optionsContainer: {
    marginTop: 20,
  },
  optionButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 10,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: 'white',
  },
  logoutButton: {
    backgroundColor: '#9400d3',
    marginTop: 60, 
  },
  logoutText: {
    fontSize: 16,
    color: 'white',
  },
});

export default Profilescreen;
