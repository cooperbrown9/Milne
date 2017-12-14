import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, Image, StyleSheet, Dimensions } from 'react-native';

import { connect } from 'react-redux';

const CostTab = (props) => (
  <View style={styles.container} >
    <View style={styles.inputView} >
      <Text style={styles.inputLabel}>Price</Text>

      <View style={{ flexDirection: 'row', height:64, justifyContent: 'flex-start', backgroundColor:'transparent'}}>
        <Text style={{width: 24, marginTop: 8, fontSize: 22,color: 'rgb(200,200,200)', backgroundColor: 'transparent'}}>$</Text>
        <View style={{ flex: 1, marginRight: 32}}>
          <TextInput value={props.brix} style={styles.input} />
        </View>
      </View>

    </View>

    <View style={styles.bottomContainer} >
      <Text style={{marginTop: 24, marginBottom: 16, fontSize: 14, textAlign: 'center'}}>Based on $1000 per KG blah blah</Text>

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
    flex: 1,
    backgroundColor: 'rgb(220,220,220)',
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
});

var mapStateToProps = state => {
  return {
    brix: state.calc.brix
  }
}

export default connect(mapStateToProps)(CostTab);
