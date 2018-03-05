import React from 'react';
import PropTypes from 'prop-types';
import { View, ListView, Text, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

import CalcButton from '../../ui-elements/calc-button';
import * as Colors from '../../theme/colors';
import juices from '../../../assets/charts/juice-list.json';
import data from '../../../assets/charts/brix-data.json';

import { connect } from 'react-redux';

let buttonOn = false;

const FRAME = Dimensions.get('window');

const DilutionTab = (props) => (
  <View style={styles.container} >

    <View style={styles.inputView} >
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.inputLabel}>Dilute BRIX down to: </Text>
        <Text style={styles.inputLabel}>{props.dilutionBrix}</Text>
      </View>
      {(props.wholeDataSource) ?
        <View style={styles.listContainer} >
          <ListView style={{backgroundColor: 'white', borderRadius: 8, marginRight: 8}} dataSource={props.wholeDataSource} renderRow={(num) =>
              <TouchableOpacity onPress={() => props.wholeBrixSelected(num)} >
                <Text style={styles.listText}>{num}</Text>
              </TouchableOpacity>
            } />
          <ListView style={{backgroundColor: 'white', borderRadius: 8, marginLeft: 8}} dataSource={props.decimalDataSource} renderRow={(decimal) =>
              <TouchableOpacity onPress={() => props.decimalBrixSelected(decimal)} >
                <Text style={styles.listText}>{decimal}</Text>
              </TouchableOpacity>
            }
          />
        </View>
        : null }

      {/*<TextInput onChangeText={(num) => this.setState({ brix: num })} keyboardType={'numeric'} style={styles.input} />*/}
    </View>



    <View style={styles.bottomContainer} >
      <View style={styles.topStatContainer} >
        <View style={{ marginTop: 8 }}>
          <Text style={styles1.topText}>To convert from </Text>
        </View>
        {/*
        <View style={styles.leftStat} >
          <Text style={styles.topStatText}>{props.metrics.solidLbsPerGal}</Text>
          <Text style={styles.bottomStatText}>LBS Solid/Gallon</Text>
        </View>

        <View style={styles.rightStat} >
          <Text style={styles.topStatText}>{props.metrics.lbsPerGal}</Text>
          <Text style={styles.bottomStatText}>Total LBS/Gallon</Text>
        </View>
        */}
      </View>

      <View style={styles.midStatContainer} >
        <View style={styles1.fromToBrix} >
          <View style={{ flexDirection:'column'}}>
            <Text style={styles1.brixText}>{props.fromBrix}</Text>
            <Text style={{textAlign: 'center', fontFamily:'roboto-regular'}}>BRIX</Text>
          </View>
          <Text style={styles1.toText}>to</Text>
          <View style={{flexDirection:'column'}}>
            <Text style={styles1.brixText}>{props.toBrix}</Text>
              <Text style={{textAlign: 'center', fontFamily:'roboto-regular'}}>BRIX</Text>
          </View>
        </View>
        {/*
        <View style={styles.midStat} >
          <Text style={styles.topStatText}>0.00000</Text>
          <Text style={styles.bottomStatText}>Dilution Rate</Text>
        </View>
        */}
      </View>

      <View style={styles1.conversionView} >
        <View style={styles.leftStat, alignItems:'flex-end'} >
          <Text style={styles.topStatText}>50%</Text>
          <Text style={styles.bottomStatText}>Water</Text>
        </View>
        <View style={styles.rightStat}>
          <Text style={styles.topStatText}>50%</Text>
          <Text style={styles.bottomStatText}>Concentrate</Text>
        </View>
      </View>

      <View style={{ flex: 1, backgroundColor: 'yellow'}}>
      </View>

      {/*
      <View style={styles.bottomTextContainer} >
        <Text style={styles.bottomStatText}>Based on Brix Table</Text>
      </View>
      */}
    </View>

    {(buttonOn)
    ?  <View style={{position: 'absolute', left: 64, right: 64, bottom: 32}} >
        <CalcButton
          title={'CONFIRM'}
          onPress={() => {buttonOn = false; props.setBrixAndMeta() }}
        />
      </View>
    : null
    }
  </View>
)

DilutionTab.propTypes = {
  brix: PropTypes.number,
  setBrixAndMeta: PropTypes.func,
  setBrix: PropTypes.func,
  metrics: PropTypes.object,
  wholeDataSource: PropTypes.object,
  decimalDataSource: PropTypes.object,
  wholeBrixSelected: PropTypes.func,
  decimalBrixSelected: PropTypes.func
}

DilutionTab.defaultProps = {
  brix: 0.0,
  metrics: {
    lbsPerGal: 0.0,
    solidLbsPerGal: 0.0,
    kgPerGal: 0.0,
    solidLbsPerMetricTon: 0.0,
    totalGallonspermetricTon: 0.0
  }
}

const styles1 = StyleSheet.create({
  topText: {
    fontFamily: 'roboto-black',
    fontSize: 24, textAlign: 'center'
  },
  fromToBrix: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start'
  },
  brixText: {
    fontFamily: 'roboto-bold', fontSize: 48,
    textAlign: 'center'
  },
  toText: {
    fontFamily: 'roboto-regular', fontSize: 24,
    textAlign: 'center'
  },
  conversionView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16, marginLeft: 16, marginRight: 16
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 32, marginRight: 32
  },
  listView: {
    backgroundColor: 'white',
    borderRadius: 8,
    height: 40,
    marginTop:16,
    marginBottom:16
  },
  listText: {
    fontSize: 32, fontFamily: 'roboto-bold',
    marginTop: 8, marginBottom: 8,
    textAlign: 'center'
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
  inputView: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 32, marginRight: 32, marginBottom: 8
  },
  inputLabel: {
    marginBottom: 8, marginTop: 16,
    fontSize: 18, fontFamily: 'roboto-regular'
  },
  input: {
    color: 'black',
    fontFamily: 'roboto-bold',
    fontSize: 32,
    borderBottomColor: 'black',
    borderBottomWidth: 2
  },
  bottomContainer: {
    flex: 1,
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
})

var mapStateToProps = state => {
  return {
    brix: state.calc.brix,
    dilutionBrix: state.calc.dilutionBrix,
    startingBrix: state.calc.startingBrix,
    // metrics: state.calc.meta,
    metrics: state.conversion.dilutedMetrics,
    fromBrix: state.conversion.startingMetrics.brix,
    toBrix: state.conversion.dilutedMetrics.brix
  }
}

export default connect(mapStateToProps)(DilutionTab);
