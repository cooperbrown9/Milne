import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import CalcButton from '../../ui-elements/calc-button';

import * as Colors from '../../theme/colors';
import * as ConversionActions from '../../redux/action-types/conversion-action-types';

import DilutionPicker from '../../ui-elements/dilution-picker';
import juices from '../../../assets/charts/juice-list.json';
// import data from '../../../assets/charts/brix-data.json';


let onWeightToVol = true;

const FRAME = Dimensions.get('window');

// DILUTE VOLUME_TO_WEIGHT ISNT WORKNG.

// make the dilution brixPicker max out at startingBrix - 0.1
const DilutionTab = (props) => (
  <View style={styles.container} >
    <View style={{ flex: 1, backgroundColor: Colors.LIGHT_GREY }}>
      <DilutionPicker
        wholeBrixSelectedBase={(brix) => props.brixSelected(brix)}
        decimalBrixSelectedBase={(brix) => props.brixSelected(brix)}
        brixSelectedBase={(brix) => props.brixSelected(brix)}
      />
    </View>

    <View style={styles.bottomContainer} >
      <View style={styles.topStatContainer} >
        <Text style={styles1.topText}>Dilute From</Text>
      </View>

      <View style={styles.midStatContainer} >
        <View style={styles1.fromToBrix} >
          <View style={{ flexDirection:'column', justifyContent: 'flex-start'}}>
            <Text style={styles1.brixText}>{props.startingBrix}</Text>
            <Text style={{textAlign: 'center', fontFamily:'roboto-regular', color: 'grey'}}>BRIX</Text>
          </View>
          {/*<Text style={styles1.toText}>to</Text>*/}
          <Image style={{height:32,width:32}} source={require('../../../assets/icons/right-arrow.png')}/>
          <View style={{flexDirection:'column', justifyContent: 'space-around'}}>
            <Text style={styles1.brixText}>{props.toBrix}</Text>
              <Text style={{textAlign: 'center', fontFamily:'roboto-regular', color: 'grey'}}>BRIX</Text>
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
        <View style={styles.leftStat} >
          <Text style={styles.topStatText}>{props.waterPercentage.toFixed(2)}%</Text>
          <Text style={styles.bottomStatText}>Water</Text>
        </View>
        <View style={{ justifyContent:'center'}}>
          <Text style={{textAlign:'center', color: 'white', fontFamily:'roboto-bold'}}>{(props.onWeightToVol) ? 'By Volume' : 'By Weight'}</Text>
        </View>
        <View style={styles.rightStat}>
          <Text style={styles.topStatText}>{props.productPercentage.toFixed(2)}%</Text>
          <Text style={styles.bottomStatText}>Concentrate</Text>
        </View>
      </View>

      <View style={{ flex: 1, backgroundColor: 'transparent', marginLeft: 32, marginRight: 32 }} >

        {(props.isBrixChanged)
          ? <CalcButton title={'Confirm'} onPress={props.confirmBrixChanged}/>
          : <CalcButton
              title={(props.onWeightToVol) ? 'Volume to Weight' : 'Weight to Volume' }
              backgroundColor={Colors.GREEN}
              onPress={() => {
                props.switchConversion((props.onWeightToVol) ? ConversionActions.DILUTE_VOLUME_TO_WEIGHT : ConversionActions.DILUTE_WEIGHT_TO_VOLUME)
              }}
            />
        }
      </View>

    </View>
  </View>
)

DilutionTab.propTypes = {
  brix: PropTypes.number,
  metrics: PropTypes.object,
  wholeDataSource: PropTypes.object,
  decimalDataSource: PropTypes.object,
  brixSelected: PropTypes.func,
  switchConversion: PropTypes.func,
  isBrixChanged: PropTypes.bool,
  confirmBrixChanged: PropTypes.func,
  onWeightToVol: PropTypes.bool
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
    alignItems: 'center',
    backgroundColor: 'transparent'
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
    justifyContent: 'space-around', alignItems: 'center',
    marginBottom: 16, marginTop: 16,
    backgroundColor: Colors.PURPLE
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
  abc: {
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
    backgroundColor: 'transparent'
  },
  midStat: {
    flexDirection: 'column',
    marginRight: 16, marginLeft: 16
  },
  topStatContainer: {
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
    fontWeight: 'bold', fontFamily: 'roboto-bold',
    color: 'white'
  },
  bottomStatText: {
    fontSize: 14,
    textAlign: 'center', fontFamily: 'roboto-bold',
    color: 'white'
  },
})

var mapStateToProps = state => {
  return {
    brix: state.calc.brix,
    dilutionBrix: state.calc.dilutionBrix,
    startingBrix: state.calc.startingBrix,
    // metrics: state.calc.meta,
    metrics: state.conversion.dilutedMetrics,
    // fromBrix: state.conversion.startingMetrics.brix,
    fromBrix: state.picker.brix,
    toBrix: state.conversion.dilutedMetrics.brix,
    waterPercentage: state.conversion.waterPerc,
    productPercentage: state.conversion.productPerc
  }
}

export default connect(mapStateToProps)(DilutionTab);
