import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, Image, StyleSheet, Dimensions } from 'react-native';

import { connect } from 'react-redux';
import CalcButton from '../../ui-elements/calc-button';
import { PURPLE } from '../../theme/colors';


const CostTab = (props) => (
  <View style={styles.container} >
    <View style={styles.inputView} >
      <Text style={styles.inputLabel}>Price</Text>

      <View style={{ flexDirection: 'row', height:64, justifyContent: 'flex-start', backgroundColor:'transparent'}}>
        <Text style={{width: 24, marginTop: 8, fontSize: 22, fontFamily: 'roboto-regular', color: 'rgb(200,200,200)', backgroundColor: 'transparent'}}>$</Text>
        <View style={{ flex: 1, marginRight: 32}}>
          <TextInput value={props.brix.toString()} style={styles.input} />
        </View>
        <Text style={styles.inputCostLabel}>Cost/KG</Text>
      </View>

    </View>

    <View style={styles.bottomContainer} >
      <Text style={{marginTop: 24, marginBottom: 16, fontSize: 14, fontFamily: 'roboto-regular',textAlign: 'center'}}>Based on $1000 per KG blah blah</Text>

      <View style={styles.statContainer} >
        <View style={styles.leftStat} >
          <Text style={styles.topStatText}>$5,128</Text>
          <Text style={styles.bottomStatText}>Price Per Gallon</Text>
        </View>
        <View style={styles.rightStat} >
          <Text style={styles.topStatText}>$453</Text>
          <Text style={styles.bottomStatText}>Price Per LBS</Text>
        </View>

      </View>
      <View style={styles.statContainer} >
        <View style={styles.leftStat} >
          <Text style={styles.topStatText}>$1,000,000</Text>
          <Text style={styles.bottomStatText}>Price Per Metric Ton</Text>
        </View>
        <View style={styles.rightStat} >
          <Text style={styles.topStatText}>$635</Text>
          <Text style={styles.bottomStatText}>Price Per LBS Solid</Text>
        </View>

      </View>
      <View style={styles.shareButton} >
        <CalcButton title={'SHARE CALCULATION'} onPress={() => console.log('bruuuuh')} />
      </View>
    </View>

  </View>
)

CostTab.propTypes = {
  brix: PropTypes.number,

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shareButton: {
    marginLeft: 64, marginRight: 64, marginBottom: 32, marginTop: 8
  },
  statContainer: {
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
  bottomContainer: {
    flex: 2,
    backgroundColor: 'rgb(220,220,220)',
    justifyContent: 'flex-start'
  },
  topStatText: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold', fontFamily: 'roboto-bold'
  },
  bottomStatText: {
    fontSize: 14,
    textAlign: 'center', fontFamily: 'roboto-regular'
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
    fontFamily: 'roboto-bold',
    fontSize: 32,
    borderBottomColor: 'black',
    borderBottomWidth: 2
  },
  inputCostLabel: {
    position: 'absolute',
    right: 32, top: 8,
    width: 64, height: 32,
    color: PURPLE,
    textAlign: 'right', fontFamily: 'roboto-regular',
    fontSize: 14
  }
});

var mapStateToProps = state => {
  return {
    brix: state.calc.brix
  }
}

export default connect(mapStateToProps)(CostTab);
