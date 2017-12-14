import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import { connect } from 'react-redux';

import TabBar from '../../ui-elements/tab-bar';

class CalculatorContainer extends Component {

  static propTypes = {
    brix: PropTypes.number
  }

  render() {
    return(
      <View style={styles.container} >
        <View style={styles.tabContainer} >
          <TabBar />  
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabContainer: {
    height: 64
  }
});

var mapStateToProps = state => {
  return {
    brix: state.nav.brix
  }
}

export default connect(mapStateToProps)(CalculatorContainer);
