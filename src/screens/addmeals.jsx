import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const AddMeals = () => {
  return (
    <View>
      <View >
          <TextInput 
            style={styles.foodinput}
            placeholder='Add food'
          />
      </View>
    </View>
  )
}

export default AddMeals

const styles = StyleSheet.create({
    foodinput:{
        marginTop:50
    }
})