import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import NavBar from '../../ui-elements/nav-bar';

class StartCalculator extends Component {
  static navigationOptions = {
    header: null
  }


  render() {
    return(
      <View style={styles.container} >
        
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

var mapStateToProps = state => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(StartCalculator);
