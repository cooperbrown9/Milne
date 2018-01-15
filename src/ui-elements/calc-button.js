import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import { PURPLE } from '../theme/colors';

const CalcButton = (props) => (
  <TouchableOpacity onPress={props.onPress} style={styles.container} >
    <Text style={styles.title} >{props.title}</Text>
  </TouchableOpacity>
);

CalcButton.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func
}


const styles = StyleSheet.create({
  container: {
    height: 64,
    borderRadius: 32,
    backgroundColor: PURPLE,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'roboto-bold'
  }
});

export default CalcButton;
