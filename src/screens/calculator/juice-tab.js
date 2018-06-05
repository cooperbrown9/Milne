import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

import { connect } from 'react-redux';
import { getAllJuices } from '../../api/api';

import * as CalcActions from '../../redux/action-types/calc-action-types';
import * as PickerActions from '../../redux/action-types/picker-action-types';
import * as ConversionActions from '../../redux/action-types/conversion-action-types';
import CalcButton from '../../ui-elements/calc-button';
import juices from '../../../assets/charts/juice-list.json';

// TODO confirm transfers brix to dilution brix

class JuiceTab extends Component {

  constructor(props) {
    super(props);

    this.getAllJuices = getAllJuices.bind(this);

    this.state = {
      data: [],
      selected: false,
      selectedBrix: 0.0
    }

  }

  static navigationOptions = {
    header: null
  }

  static propTypes = {
    updateBrix: PropTypes.func
  }

  componentWillMount() {
    if(!this.props.dataLoaded) {
      this.loadJuices();
    }
  }

  loadJuices() {
    for(let i = 0; i < juices.length; i++) {
      juices[i].selected = false;

      if(i === juices.length-1) {
        this.props.dispatch({ type: CalcActions.SET_DATA, data: juices });
      }
    }
  }

  updateBrix = (row) => {
    // let data = this.state.data;
    this.setState({ selected: true });
    let brixString = row.brix.toString();
    brixString = brixString.split('.');

    if(brixString.length === 2) {
      this.props.dispatch({ type: CalcActions.SET_DILUTION_BRIX, wholeBrix: brixString[0], decimalBrix: brixString[1] });
      this.props.dispatch({ type: ConversionActions.DILUTION_METRICS, toBrix: brixString[0] + '.' + brixString[1] });
    } else {
      this.props.dispatch({ type: CalcActions.SET_DILUTION_BRIX, wholeBrix: brixString[0], decimalBrix: 0 });
      this.props.dispatch({ type: ConversionActions.DILUTION_METRICS, toBrix: brixString[0] + '.' + 0 });
    }

    let data = juices
    for(let i = 0; i < data.length; i++) {
      data[i].selected = false;
    }

    for(let j = 0; j< data.length; j++) {
      if(data[j].name === row.name) {
        this.setState({ selectedBrix: data[j].brix });
        data[j].selected = true;

        // this.props.dispatch({ type: CalcActions.SET_DATA, data: data });
        // this.props.updateBrix();
        j = juices.length;
      }
    }
  }

  render() {
    return(
      <View style={styles.container} >
        <View style={styles.topView} >
          <Text style={{fontSize: 18, marginBottom: 8, textAlign:'center',color: 'rgb(200,200,200)'}}>Single Strength Brix Values</Text>
          <Text style={{fontSize: 14, textAlign: 'center', color: 'rgb(200,200,200)'}}>Select Juice to Dilute From</Text>
        </View>

        <ScrollView style={styles.list} >
          {(this.props.data.length !== 0) ? this.props.data.map((row) =>
            <TouchableOpacity onPress={() => { this.updateBrix(row)} } style={{flexDirection:'row', flex: 1, marginBottom: 16}}>
              <Text style={(row.selected) ? styles.itemNameOn : styles.itemNameOff}>{row.name}</Text>
              <Text style={(row.selected) ? styles.itemBrixOn : styles.itemBrixOff}>{row.brix}</Text>
            </TouchableOpacity> ) : null
          }
        </ScrollView>

        {(this.state.selected)
        ? <View style={styles.buttonContaienr} >
            <CalcButton title={'TRANSFER VALUE'} onPress={() => {
                this.props.dispatch({ type: CalcActions.SET_BRIX, brix: this.state.selectedBrix })
                this.setState({ selected: false });
              }}
            />
          </View>
        : null
        }

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContaienr: {
    position: 'absolute',
    left: 64, right: 64, bottom: 32
  },
  itemBrixOff: {
    width:64,
    marginRight:32,
    fontSize: 28,
    color: 'rgb(200,200,200)',
    textAlign:'right',
    fontWeight: 'bold'
  },
  itemNameOff: {
    flex:1,
    marginLeft: 32,
    fontSize: 28,
    color: 'rgb(200,200,200)',
    fontWeight: 'bold'
  },
  itemBrixOn: {
    width:64,
    marginRight:32,
    fontSize: 28,
    color: 'black',
    textAlign:'right',
    fontWeight: 'bold'
  },
  itemNameOn: {
    flex:1,
    marginLeft: 32,
    fontSize: 28,
    color: 'black',
    fontWeight: 'bold'
  },
  topView: {
    height: 64,
    marginTop: 32
  },
  list: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 16
  }
})

var mapStateToProps = state => {
  return {
    dataLoaded: state.calc.dataLoaded,
    data: state.calc.data
  }
}

export default connect(mapStateToProps)(JuiceTab);
