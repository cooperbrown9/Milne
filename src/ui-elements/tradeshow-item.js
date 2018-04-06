import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TradeshowItem = props => (
  <View style={styles.container} >
     <Text style={styles.name}>Name</Text>
     <Text style={styles.location}>Location</Text>
     <Text style={styles.date}>Date</Text>
  </View>
)

const stlyes = StyleSheet.create({
  container: {
    height: 84,
  },
  name: {
    fontSize: 24
  },
  location: {
    fontSize: 18
  },
  date: {
    fontSize: 16
  }
})

export default TradeshowItem;
