import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';

import * as Colors from '../theme/colors';
import * as CalcActions from '../redux/action-types/calc-action-types';
import * as ConversionActions from '../redux/action-types/conversion-action-types';
import * as PickerActions from '../redux/action-types/picker-action-types';

class BrixPicker extends Component {
  constructor() {
    super();

    this.state = {
      currentWholeBrix: 0,
      currentDecimalBrix: 0,
      // wholeDataSource: new abc.DataSource({ rowHasChanged: (r1, r2) => r1.selected !== r2.selected }),
      // decimalDataSource: new abc.DataSource({ rowHasChanged: (r1, r2) => r1.selected !== r2.selected }),
    }
  }
  //
  static propTypes = {
    brixSelected: PropTypes.func,
    wholeDataSource: PropTypes.array,
    decimalDataSource: PropTypes.array,
    // wholeBrixSelected: PropTypes.func,
    // decimalBrixSelected: PropTypes.func
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
      wholeDataSource: wholeNumbers,//this.state.wholeDataSource.cloneWithRows(wholeNumbers),
      decimalDataSource: decimals//this.state.decimalDataSource.cloneWithRows(decimals)
    });
  }


  wholeBrixSelected = (index, rowData) => {
    let wholeNumbers = this.props.wholeNumbers;
    for(let i = 0; i < wholeNumbers.length; i++) {
      if(wholeNumbers[i].selected) {
        wholeNumbers[i].selected = false;
        break;
      }
    }

    rowData.selected = !rowData.selected;
    var dataClone = wholeNumbers;
    dataClone[index] = rowData;

    this.setState({
      currentWholeBrix: rowData.value
    }, () => {
      this.props.dispatch({
        type: PickerActions.SET_WHOLE_BRIX_DS,
        numbers: dataClone,
        value: rowData.value,
        dataSource: dataClone //new abc.DataSource({ rowHasChanged: (r1, r2) => { r1.selected !== r2.selected }}).cloneWithRows(dataClone)
      });
      this.props.dispatch({ type: CalcActions.SET_STARTING_BRIX, wholeBrix: rowData.value, decimalBrix: this.props.decimalBrix });
      this.props.dispatch({ type: ConversionActions.STARTING_METRICS, fromBrix: rowData.value + '.' + this.props.decimalBrix });
    })
  }

  decimalBrixSelected = (index, rowData) => {
    // unselect previously selected brix
    let decimals = this.props.decimals;
    for(let i = 0; i < decimals.length; i++) {
      if(decimals[i].selected) {
        decimals[i].selected = false;
        break;
      }
    }

    rowData.selected = !rowData.selected;
    var dataClone = decimals;
    dataClone[index] = rowData;

    let brix = parseFloat(rowData.value);
    brix *= 10;

    this.setState({
      currentDecimalBrix: brix
    }, () => {
      this.props.dispatch({
        type: PickerActions.SET_DECIMAL_BRIX_DS,
        numbers: dataClone,
        value: brix,
        dataSource: dataClone//new abc.DataSource({ rowHasChanged: (r1, r2) => { r1.selected !== r2.selected }}).cloneWithRows(dataClone)
      });
      this.props.dispatch({ type: CalcActions.SET_STARTING_BRIX, wholeBrix: this.state.currentWholeBrix, decimalBrix: brix });
      this.props.dispatch({ type: ConversionActions.STARTING_METRICS, fromBrix: this.state.currentWholeBrix + '.' + brix });
    })
  }

  renderRowWhole(rowData, sectionID, index) {
    return (
      <TouchableOpacity
        key={index}
        style={(!rowData.selected) ? styles.textContainerOff : styles.textContainerOn}
        onPress={() => this.wholeBrixSelected(index, rowData)}
      >
        <Text style={(!rowData.selected) ? styles.listTextOff : styles.listTextOn}>{rowData.value}</Text>
      </TouchableOpacity>
    )
  }

  renderRowDecimal(rowData, sectionID, index) {
    return (
      <TouchableOpacity
        key={index}
        style={(!rowData.selected) ? styles.textContainerOff : styles.textContainerOn}
        onPress={() => this.decimalBrixSelected(index, rowData)}
      >
        <Text style={(!rowData.selected) ? styles.listTextOff : styles.listTextOn}>{rowData.value}</Text>
      </TouchableOpacity>
    )
  }

  renderWholeNumber = ({ item, index }) => (
    <TouchableOpacity
      key={index}
      style={(!item.selected) ? styles.textContainerOff : styles.textContainerOn}
      onPress={() => this.wholeBrixSelected(index, item)}
    >
      <Text style={(!item.selected) ? styles.listTextOff : styles.listTextOn}>{item.value}</Text>
    </TouchableOpacity>
  )


  renderDecimalNumber = ({ item, index }) => (
    <TouchableOpacity
      key={index}
      style={(!item.selected) ? styles.textContainerOff : styles.textContainerOn}
      onPress={() => this.decimalBrixSelected(index, item)}
    >
      <Text style={(!item.selected) ? styles.listTextOff : styles.listTextOn}>{item.value}</Text>
    </TouchableOpacity>
  )

  render() {
    return(
      <View style={styles.inputView} >
        {/*
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.inputLabel}>Brix Value</Text>
          <Text style={styles.inputLabel}>{this.props.startingBrix}</Text>
        </View>
        */}

        <View style={styles.listContainer} >
          <FlatList style={{backgroundColor: 'white', borderRadius: 8, marginRight: 8}}
            data={this.props.wholeDataSource}
            renderItem={this.renderWholeNumber}
          />
          <FlatList style={{backgroundColor: 'white', borderRadius: 8, marginLeft: 8}}
            data={this.props.decimalDataSource}
            renderItem={this.renderDecimalNumber}
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
    wholeDataSource: state.picker.wholeBrixDS,
    decimalDataSource: state.picker.decimalBrixDS,
    wholeNumbers: state.picker.wholeBrixNumbers,
    decimals: state.picker.decimalBrixNumbers,
    wholeBrix: state.calc.startingBrixWhole,
    decimalBrix: state.calc.startingBrixDecimal
  }
}

export default connect(mapStateToProps)(BrixPicker);
