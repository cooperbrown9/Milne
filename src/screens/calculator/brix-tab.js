import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import BrixPicker from '../../ui-elements/brix-picker';
import CalcButton from '../../ui-elements/calc-button';

import * as Colors from '../../theme/colors';


const TO_KILOGRAMS_RATE = 0.453592;

// implement universal brixSelected like in dilutionTab
const BrixTab = props => (
  <View style={styles.container} >
    <BrixPicker
      wholeDataSource={props.wholeDataSource}
      decimalDataSource={props.decimalDataSource}
      brixSelected={props.decimalBrixSelected}
      wholeBrixSelected={props.wholeBrixSelected}
      decimalBrixSelected={props.decimalBrixSelected}
    />

    <View style={styles.bottomContainer} >
      <View style={styles.topStatContainer} >

        <View style={styles.leftStat} >
          <Text style={styles.topStatText}>{(props.onImperial) ? props.metrics.solidLbsPerGal : (props.metrics.solidLbsPerGal * TO_KILOGRAMS_RATE).toFixed(4)}</Text>
          <Text style={styles.bottomStatText}>{(props.onImperial) ? 'LBs' : 'KGs'} Solid/Gallon</Text>
        </View>

        <View style={styles.rightStat} >
          <Text style={styles.topStatText}>{(props.onImperial) ? props.metrics.lbsPerGal : (props.metrics.lbsPerGal * TO_KILOGRAMS_RATE).toFixed(4) }</Text>
          <Text style={styles.bottomStatText}>Total {(props.onImperial) ? 'LBs' : 'KGs'}/Gallon</Text>
        </View>
      </View>

      <View style={styles.midStatContainer} >
        <View style={styles.leftStat} >
          <Text style={styles.topStatText}>{(props.onImperial) ? props.metrics.solidLbsPerMetricTon : (props.metrics.solidLbsPerMetricTon * TO_KILOGRAMS_RATE).toFixed(4)}</Text>
          <Text style={styles.bottomStatText}>Solid {(props.onImperial) ? 'LBs' : 'KGs'}/Metric Ton</Text>
        </View>
        <View style={styles.rightStat} >
          <Text style={styles.topStatText}>{props.metrics.totalGallonspermetricTon}</Text>
          <Text style={styles.bottomStatText}>Gallons/Metric Ton</Text>
          </View>

          {/*
          <View style={styles.midStat} >
            <Text style={styles.topStatText}>{(props.onImperial) ? props.metrics.totalGallonspermetricTon}</Text>
            <Text style={styles.bottomStatText}>Gallons/Metric Ton</Text>
          </View>
          */}
      </View>

      <View style={styles.bottomTextContainer} >
        <CalcButton
          title={(props.onImperial ? 'Convert to Metric' : 'Convert to Imperial')}
          onPress={props.switchConversion}
        />
      </View>
    </View>

  </View>
)

BrixTab.propTypes = {
  wholeDataSource: PropTypes.object,
  decimalDataSource: PropTypes.object,
  wholeBrixSelected: PropTypes.func,
  decimalBrixSelected: PropTypes.func,
  switchConversion: PropTypes.func,
  onImperial: PropTypes.bool
}

BrixTab.defaultProps = {
  onImperial: true
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
    flex: 1, flexDirection: 'row',
    justifyContent: 'center'
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
  console.log(state.conversion.metrics);
  return {
    ...state,
    metrics: state.conversion.startingMetrics
  }
}

export default connect(mapStateToProps)(BrixTab);
