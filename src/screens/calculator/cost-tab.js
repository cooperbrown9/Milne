import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet, Dimensions } from 'react-native';

import { connect } from 'react-redux';

import CalcButton from '../../ui-elements/calc-button';

import * as ConversionActions from '../../redux/action-types/conversion-action-types';
import * as Colors from '../../theme/colors';


class CostTab extends Component {

  constructor() {
    super();

    this.state = {
      price: 10.00,
      unitIndex: 0,
      units: [
        { value: 'Cost/LB', path: ConversionActions.COST_BY_POUND },
        { value: 'Cost/Gal', path: ConversionActions.COST_BY_GALLON }
      ]
    }
  }

  componentDidMount() {
    this.setState({ price: 10.00 }, () => {
      this.props.dispatch({ type: ConversionActions.COST_BY_POUND, price: this.state.price });
    });
  }

  changeUnit = () => {
    this.setState({ unitIndex: (this.state.unitIndex === 1) ? 0 : ++this.state.unitIndex }, () => {
      this.props.dispatch({ type: this.state.units[this.state.unitIndex].path, price: this.state.price });
    });
  }

  render() {
    return(
      <View style={styles.container} >
        <View style={styles.inputView} >
          <Text style={styles.inputLabel}>Price</Text>

          <View style={{ flexDirection: 'row', height:64, justifyContent: 'flex-start', backgroundColor:'transparent'}}>
            <Text style={{width: 24, marginTop: 8, fontSize: 22, fontFamily: 'roboto-bold', color: Colors.PURPLE, backgroundColor: 'transparent'}}>$</Text>
            <View style={{ flex: 1, marginRight: 32}}>
              <TextInput
                defaultValue={'10.00'}
                value={this.state.price}
                onChangeText={(text) => this.setState({ price: text })}
                style={styles.input}
              />
            </View>
            <TouchableOpacity onPress={() => this.changeUnit()} style={styles.changeUnitButton} >
              <Text style={styles.inputCostLabel}>{this.state.units[this.state.unitIndex].value}</Text>
            </TouchableOpacity>
          </View>

        </View>

        <View style={styles.bottomContainer} >
          <Text style={{marginTop: 24, marginBottom: 16, fontSize: 14, fontFamily: 'roboto-regular',textAlign: 'center'}}></Text>

          <View style={styles.statContainer} >
            <View style={styles.leftStat} >
              <Text style={styles.topStatText}>$ {parseFloat(this.props.costData.perGal).toFixed(2)}</Text>
              <Text style={styles.bottomStatText}>Price Per Gallon</Text>
            </View>
            <View style={styles.rightStat} >
              <Text style={styles.topStatText}>$ {parseFloat(this.props.costData.perLB).toFixed(2)}</Text>
              <Text style={styles.bottomStatText}>Price Per LBS</Text>
            </View>

          </View>
          <View style={styles.statContainer} >
            <View style={styles.leftStat} >
              <Text style={styles.topStatText}>$ {parseFloat(this.props.costData.perMetricTon).toFixed(2)}</Text>
              <Text style={styles.bottomStatText}>Price Per Metric Ton</Text>
            </View>
            <View style={styles.rightStat} >
              <Text style={styles.topStatText}>$ {parseFloat(this.props.costData.perLBSolid).toFixed(2)}</Text>
              <Text style={styles.bottomStatText}>Price Per LBS Solid</Text>
            </View>

          </View>
          <View style={styles.shareButton} >
            <CalcButton title={'Share Calculation'} onPress={() => console.log('bruuuuh')} />
          </View>
        </View>

      </View>
    )
  }
}

CostTab.propTypes = {
  brix: PropTypes.number,

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  changeUnitButton: {
    position: 'absolute',
    right: 32, top: 0,
    borderRadius: 12, height: 32, width: 72,
    backgroundColor: Colors.PURPLE,
    justifyContent: 'center', alignItems: 'center'
  },
  shareButton: {
    marginLeft: 32, marginRight: 32, marginBottom: 32, marginTop: 8
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
    backgroundColor: Colors.LIGHT_GREY,
    justifyContent: 'flex-start'
  },
  topStatText: {
    fontSize: 28, marginBottom: 4,
    textAlign: 'center',
    fontWeight: 'bold', fontFamily: 'roboto-bold'
  },
  bottomStatText: {
    fontSize: 14,
    textAlign: 'center', fontFamily: 'roboto-bold',
    color: Colors.GREEN
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
    color: 'white',
    textAlign: 'center', fontFamily: 'roboto-bold',
    fontSize: 14, backgroundColor: 'transparent'
  }
});

var mapStateToProps = state => {
  return {
    brix: state.calc.brix,
    costData: state.conversion.cost
  }
}

export default connect(mapStateToProps)(CostTab);
