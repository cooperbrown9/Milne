import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

import CalcButton from '../../ui-elements/calc-button';

import { connect } from 'react-redux';

let buttonOn = false;

const FRAME = Dimensions.get('window');

const DilutionTab = (props) => (
  <View style={styles.container} >
    <View style={styles.inputView} >
      <Text style={styles.inputLabel}>Starting Brix Value</Text>
      <TextInput value={props.brix.toString()} onChangeText={(val) => { buttonOn = true; props.setBrix(val) }} keyboardType={'numeric'} style={styles.input} />
      <View style={(buttonOn) ? {marginLeft: FRAME.width / 2 - 32, marginRight: 32, marginTop: 16} : {position: 'absolute', top: -1000} } >
        <CalcButton title={'Confirm'} onPress={() => {buttonOn = false; props.setBrixAndMeta()}} />
      </View>
    </View>

    <View style={styles.bottomContainer} >
      <View style={styles.topStatContainer} >

        <View style={styles.leftStat} >
          <Text style={styles.topStatText}>{props.metrics.solidLbsPerGal}</Text>
          <Text style={styles.bottomStatText}>LBS Solid/Gallon</Text>
        </View>

        <View style={styles.rightStat} >
          <Text style={styles.topStatText}>{props.metrics.lbsPerGal}</Text>
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
        <Text style={styles.bottomStatText}>Dilution Rate, rollin up a spleeeeefer</Text>
      </View>

    </View>
  </View>
)

DilutionTab.propTypes = {
  brix: PropTypes.number,
  setBrixAndMeta: PropTypes.func,
  setBrix: PropTypes.func
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    justifyContent: 'center'
  },
  leftStat: {
    flexDirection: 'column',
    marginRight: 16
  },
  rightStat: {
    flexDirection: 'column',
    marginLeft: 16
  },
  inputView: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 32,
    marginRight: 32
  },
  inputLabel: {
    marginBottom: 16,
    fontSize: 18
  },
  input: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 32,
    borderBottomColor: 'black',
    borderBottomWidth: 2
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: 'orange',
    justifyContent: 'flex-start'
  },
  topStatText: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  bottomStatText: {
    fontSize: 14,
    textAlign: 'center'
  },
})

var mapStateToProps = state => {
  return {
    brix: state.calc.brix,
    metrics: state.calc.meta
  }
}

export default connect(mapStateToProps)(DilutionTab);
