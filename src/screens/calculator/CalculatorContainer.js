import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import { connect } from 'react-redux';

class CalculatorContainer extends Component {

  static propTypes = {
    brix: PropTypes.number
  }

  render() {
    return(
      <View style={styles.container} >
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

var mapStateToProps = state => {
  return {
    brix: state.nav.brix
  }
}

export default connect(mapStateToProps)(CalculatorContainer);
