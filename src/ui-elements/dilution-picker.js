import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet, ListView } from 'react-native';
import { connect } from 'react-redux';

import * as Colors from '../theme/colors';
import * as CalcActions from '../redux/action-types/calc-action-types';
import * as ConversionActions from '../redux/action-types/conversion-action-types';
import * as PickerActions from '../redux/action-types/picker-action-types';

class DilutionPicker extends Component {

  static propTypes = {
    wholeBrixSelectedBase: PropTypes.func,
    decimalBrixSelectedBase: PropTypes.func,
    brixSelectedBase: PropTypes.func
  }

  constructor() {
    super();

    this.state = {
      currentWholeBrix: 0,
      currentDecimalBrix: 0,
      isDilutionBrixChanged: false,
      onWeightToVol: true,
      wholeDataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.selected !== r2.selected }),
      decimalDataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.selected !== r2.selected }),
    }
  }

  componentDidMount() {
    let wholeNumbers = [];
    for(let i = 0; i < 77; i++) {
      wholeNumbers.push({ value: i, selected: false });
    }
    let decimals = [];
    for(let i = 0; i <= 9; i++) {
      decimals.push({ value: '.' + i, selected: false });
    }

    this.setState({
      wholeNumbers: wholeNumbers,
      decimals: decimals,
      wholeDataSource: this.state.wholeDataSource.cloneWithRows(wholeNumbers),
      decimalDataSource: this.state.decimalDataSource.cloneWithRows(decimals)
    });
  }


  wholeBrixSelected = (rowID, rowData) => {
    let wholeNumbers = this.props.wholeNumbers;
    for(let i = 0; i < wholeNumbers.length; i++) {
      if(wholeNumbers[i].selected) {
        wholeNumbers[i].selected = false;
        break;
      }
    }

    rowData.selected = !rowData.selected;
    var dataClone = wholeNumbers;
    dataClone[rowID] = rowData;

    this.props.dispatch({
      type: PickerActions.SET_WHOLE_DILUTION_DS,
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => { r1.selected !== r2.selected }}).cloneWithRows(dataClone),
      numbers: dataClone
    });

    this.setState({
      currentWholeBrix: rowData.value,
      wholeNumbers: dataClone,
      wholeDataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => { r1.selected !== r2.selected }}).cloneWithRows(dataClone)
    }, () => {
      this.dilutionBrixChanged(rowData.value);

      this.props.dispatch({ type: CalcActions.SET_DILUTION_BRIX, wholeBrix: this.state.currentWholeBrix, decimalBrix: this.state.currentDecimalBrix });
      this.props.dispatch({ type: ConversionActions.DILUTION_METRICS, toBrix: this.state.currentWholeBrix + '.' + this.state.currentDecimalBrix });
      this.props.brixSelectedBase(rowData.value);
    })
  }

  decimalBrixSelected = (rowID, rowData) => {
    let decimals = this.props.decimals;
    for(let i = 0; i < decimals.length; i++) {
      if(decimals[i].selected) {
        decimals[i].selected = false;
        break;
      }
    }

    rowData.selected = !rowData.selected;
    var dataClone = decimals;
    dataClone[rowID] = rowData;

    let brix = parseFloat(rowData.value);
    brix *= 10;

    this.props.dispatch({
      type: PickerActions.SET_DECIMAL_DILUTION_DS,
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => { r1.selected !== r2.selected }}).cloneWithRows(dataClone),
      numbers: dataClone
    });

    this.setState({
      currentDecimalBrix: brix,
      decimals: dataClone,
      decimalDataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => { r1.selected !== r2.selected }}).cloneWithRows(dataClone)
    }, () => {
      this.dilutionBrixChanged(rowData.value);
      this.props.dispatch({ type: CalcActions.SET_DILUTION_BRIX, wholeBrix: this.state.currentWholeBrix, decimalBrix: this.state.currentDecimalBrix });
      this.props.dispatch({ type: ConversionActions.DILUTION_METRICS, toBrix: this.state.currentWholeBrix + '.' + this.state.currentDecimalBrix });
      this.props.brixSelectedBase(rowData.value);
    })
  }

  dilutionBrixChanged = (brix) => {
    if(!this.state.isDilutionBrixChanged) {
      this.setState({ isDilutionBrixChanged: true });
    }

    brix = parseFloat(brix);

    if(brix < 1) {
      brix = parseFloat(brix);
      brix *= 10;
      this.setState({ currentDecimalBrix: brix }, () => {
        this.props.dispatch({ type: CalcActions.SET_DILUTION_BRIX, wholeBrix: this.state.currentWholeBrix, decimalBrix: this.state.currentDecimalBrix });
        this.props.decimalBrixSelectedBase(brix);
        // this.props.dispatch({ type: ConversionActions.DILUTION_METRICS, toBrix: this.state.wholeBrixForDilution + '.' + this.state.decimalBrixForDilution });
      });
    } else {
      this.setState({ currentWholeBrix: brix }, () => {
        this.props.dispatch({ type: CalcActions.SET_DILUTION_BRIX, wholeBrix: this.state.currentWholeBrix, decimalBrix: this.state.currentDecimalBrix });
        this.props.wholeBrixSelectedBase(brix);
        // this.props.dispatch({ type: ConversionActions.DILUTION_METRICS, toBrix: this.state.wholeBrixForDilution + '.' + this.state.decimalBrixForDilution });
      });
    }
  }

  renderRowWhole(rowData, sectionID, rowID) {
    return (
      <TouchableOpacity
        style={(!rowData.selected) ? styles.textContainerOff : styles.textContainerOn}
        onPress={() => this.wholeBrixSelected(rowID, rowData)}
      >
        <Text style={(!rowData.selected) ? styles.listTextOff : styles.listTextOn}>{rowData.value}</Text>
      </TouchableOpacity>
    )
  }

  renderRowDecimal(rowData, sectionID, rowID) {
    return (
      <TouchableOpacity
        style={(!rowData.selected) ? styles.textContainerOff : styles.textContainerOn}
        onPress={() => this.decimalBrixSelected(rowID, rowData)}
      >
        <Text style={(!rowData.selected) ? styles.listTextOff : styles.listTextOn}>{rowData.value}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return(
      <View style={styles.inputView} >

        {/*
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.inputLabel}>Dilute to: </Text>
          <Text style={styles.inputLabel}>{this.props.dilutionBrix}</Text>
        </View>
        */}

        <View style={styles.listContainer} >
          <ListView style={{backgroundColor: 'white', borderRadius: 8, marginRight: 8}}
            dataSource={this.props.wholeDataSource}
            renderRow={this.renderRowWhole.bind(this)}
          />
          <ListView style={{backgroundColor: 'white', borderRadius: 8, marginLeft: 8}}
            dataSource={this.props.decimalDataSource}
            renderRow={this.renderRowDecimal.bind(this)}
          />
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  listText: {
    fontSize: 32, fontFamily: 'roboto-bold',
    marginTop: 8, marginBottom: 8,
    textAlign: 'center'
  },
  textContainerOn: {
    backgroundColor: Colors.PURPLE
  },
  textContainerOff: {
    backgroundColor: 'transparent'
  },
  listTextOn: {
    fontSize: 32, fontFamily: 'roboto-bold',
    marginTop: 8, marginBottom: 8,
    textAlign: 'center',
    backgroundColor: Colors.PURPLE, color: 'white'
  },
  listTextOff: {
    fontSize: 32, fontFamily: 'roboto-bold',
    marginTop: 8, marginBottom: 8,
    textAlign: 'center'
  },
  inputView: {
    flex: 2,
    marginLeft: 32, marginRight: 32, marginTop: 16, marginBottom: 16
  },
  inputLabel: {
    marginBottom: 16,
    fontSize: 24, fontFamily: 'roboto-bold'
  },
  input: {
    color: 'black',
    fontWeight: 'bold', fontFamily: 'roboto-bold',
    fontSize: 32,
    borderBottomColor: 'black',
    borderBottomWidth: 2
  },
})

var mapStateToProps = state => {
  return {
    startingBrix: state.calc.startingBrix,
    dilutionBrix: state.calc.dilutionBrix,
    wholeDataSource: state.picker.wholeDilutionDS,
    decimalDataSource: state.picker.decimalDilutionDS,
    wholeNumbers: state.picker.wholeDilutionNumbers,
    decimals: state.picker.decimalDilutionNumbers,
    wholeBrix: state.calc.dilutionBrixWhole,
    decimalBrix: state.calc.dilutionBrixDecimal
  }
}

export default connect(mapStateToProps)(DilutionPicker);
