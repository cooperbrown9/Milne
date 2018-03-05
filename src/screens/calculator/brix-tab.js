import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import BrixPicker from '../../ui-elements/brix-picker';

import * as Colors from '../../theme/colors';

const BrixTab = props => (
  <View style={styles.container} >
    <BrixPicker
      wholeDataSource={props.wholeDataSource}
      decimalDataSource={props.decimalDataSource}
      wholeBrixSelected={props.wholeBrixSelected}
      decimalBrixSelected={props.decimalBrixSelected}
    />

    <View style={styles.bottomContainer} >
      <View style={styles.topStatContainer} >

        <View style={styles.leftStat} >
          <Text style={styles.topStatText}>{props.startingMetrics.solidLbsPerGal}</Text>
          <Text style={styles.bottomStatText}>LBS Solid/Gallon</Text>
        </View>

        <View style={styles.rightStat} >
          <Text style={styles.topStatText}>{props.startingMetrics.lbsPerGal}</Text>
          <Text style={styles.bottomStatText}>Total LBS/Gallon</Text>
        </View>
      </View>

      <View style={styles.midStatContainer} >
        <View style={styles.midStat} >
          <Text style={styles.topStatText}>0.00000</Text>
          <Text style={styles.bottomStatText}>Dilution Rate</Text>
        </View>
      </View>

      <View style={styles.bottomTextContainer} >
        <Text style={styles.bottomStatText}>Based on Brix Table</Text>
      </View>
    </View>

  </View>
)

BrixTab.propTypes = {
  wholeDataSource: PropTypes.object,
  decimalDataSource: PropTypes.object,
  wholeBrixSelected: PropTypes.func,
  decimalBrixSelected: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bottomContainer: {
    flex: 2,
    backgroundColor: Colors.LIGHT_GREY,
    justifyContent: 'flex-start'
  },
  topStatText: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold', fontFamily: 'roboto-regular'
  },
  bottomStatText: {
    fontSize: 14,
    textAlign: 'center', fontFamily: 'roboto-black',
    color: Colors.GREEN
  },
  bottomTextContainer: {
    flex: 1,
    marginLeft: 32,
    marginRight: 32
  },
  midStatContainer: {
    flex: 1,
  },
  midStat: {
    flexDirection: 'column',
    marginRight: 16, marginLeft: 16
  },
  topStatContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8
  },
  leftStat: {
    flexDirection: 'column',
    marginRight: 16
  },
  rightStat: {
    flexDirection: 'column',
    marginLeft: 16
  },
});

const mapStateToProps = state => {
  return {
    ...state,
    startingMetrics: state.conversion.startingMetrics
  }
}

export default connect(mapStateToProps)(BrixTab);
