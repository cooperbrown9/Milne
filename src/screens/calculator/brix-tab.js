import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

const BrixTab = props => (
  <View style={styles.container} >
    <Text>Bruuuuuh</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const mapStateToProps = state => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(BrixTab);
