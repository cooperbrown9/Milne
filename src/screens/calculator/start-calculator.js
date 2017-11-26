import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import NavBar from '../../ui-elements/nav-bar';

class StartCalculator extends Component {
  static navigationOptions = {
    header: null
  }


  render() {
    return(
      <View style={styles.container} >
        <NavBar />
        <Text>Its lit</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default StartCalculator;
