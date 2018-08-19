import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

import * as Colors from '../theme/colors';

const OptionView = props => (
  <View style={styles.container} >
    {props.options.map(
      (option) =>
      <TouchableOpacity
        onPress={() => props.selectOption(option.index)}
        style={ ((option.selected) ? styles.buttonOn : styles.buttonOff) }
        key={option.value} >
        <Text style={(option.selected) ? styles.textOn : styles.textOff} adjustFontSizeToFit={true} >
          {option.value}
        </Text>
      </TouchableOpacity>
    )}
  </View>
)

OptionView.propTypes = {
  options: PropTypes.array,
  selectOption: PropTypes.func,
  isCongruent: PropTypes.bool
}

OptionView.selected = function(arr, index, callback) {
  if(arr[index].selected) {
    arr[index].selected = false;
  } else {
    for(let i = 0; i < arr.length; i++) {
      arr[i].selected = false;
    }
    arr[index].selected = true;
  }
  callback(arr);
}

OptionView.selectedExclusive = function(arr, index, callback) {
  for(let i = 0; i < arr.length; i++) {
    arr[i].selected = false;
  }
  arr[index].selected = true;
  callback(arr);
}

const FRAME = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',

  },
  buttonOn: {
    flexGrow: 1,
    height: 56,
    borderRadius: 28,
    marginRight: 8, marginBottom: 8,
    backgroundColor: Colors.GREEN,   // 'black',
    justifyContent: 'center',
    width: FRAME.width * (1/3) - 8
  },
  buttonOff: {
    flexGrow: 1,
    height: 56,
    borderRadius: 28,
    marginRight: 8, marginBottom: 8,
    backgroundColor: 'rgb(220,220,220)', // Colors.MID_GREY,
    justifyContent: 'center',
    width: FRAME.width * (1/3) - 8
  },
  textOn: {
    fontSize: 18,
    marginLeft: 12, marginRight: 12,
    color: 'white', textAlign: 'center',
    fontFamily: 'roboto-bold',
    backgroundColor: 'transparent'
  },
  textOff: {
    fontSize: 18,
    marginLeft: 12, marginRight: 12,
    color: Colors.DARK_GREY, textAlign: 'center',
    fontFamily: 'roboto-bold', backgroundColor: 'transparent'
  }
});

var mapStateToProps = state => {
  return {
    fontLoaded: state.setup.fontLoaded
  }
}

export default OptionView;
