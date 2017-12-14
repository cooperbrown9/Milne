import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, Image, StyleSheet, Dimensions } from 'react-native';

import { connect } from 'react-redux';

const DilutionTab = (props) => (
  <View style={styles.container} >
    <View style={styles.inputView} >
      <Text style={styles.inputLabel}>Starting Brix Value</Text>
      <TextInput value={props.brix.toString()} onChangeText={(val) => props.setBrix(val) } keyboardType={'numeric'} style={styles.input} />
    </View>

    <View style={styles.bottomContainer} >
      <View style={styles.topStatContainer} >

        <View style={styles.leftStat} >
          <Text style={styles.topStatText}>1.0011</Text>
          <Text style={styles.bottomStatText}>LBS Solid/Gallon</Text>
        </View>

        <View style={styles.rightStat} >
          <Text style={styles.topStatText}>8.707</Text>
          <Text style={styles.bottomStatText}>Total LBS/Gallon</Text>
        </View>
      </View>

      <View style={styles.midStatContainer} >
        <View style={styles.midStat} >
          <Text style={styles.topStatText}>7.063</Text>
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
  setBrix: PropTypes.func
}

const FRAME = Dimensions.get('window');

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
  console.log(state.calc.brix);
  return {
    brix: state.calc.brix
  }
}

export default connect(mapStateToProps)(DilutionTab);
