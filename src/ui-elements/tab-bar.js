import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

import { connect } from 'react-redux';

import * as CalcActions from '../redux/action-types/calc-action-types.js'
import * as ConversionActions from '../redux/action-types/conversion-action-types';

class TabBar extends Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    indexOn: PropTypes.number
  }


  componentDidMount() {

  }

  bottomBar() {
    return(
      <View style={styles.bottomBar} />
    )
  }

  tabButton = (title, onOff, action) => {
    return(
      <TouchableOpacity onPress={() => { this.props.dispatch({type: CalcActions.GOTO_DILUTION}) } } style={styles.button} >
        <Text color={'yellow'} style={onOff === true ? styles.buttonTextOn : styles.buttonTextOff}>{title}</Text>
      </TouchableOpacity>

    )
  }

  render() {
    return(
      <View style={styles.container} >

        <TouchableOpacity
          onPress={() => {this.props.dispatch({ type: CalcActions.GOTO_BRIX}) }}
          style={(this.props.indexOn === 0) ? styles.buttonOn : styles.buttonOff}
        >
          <Text color={'yellow'} style={(this.props.indexOn === 0) ? styles.buttonTextOn : styles.buttonTextOff}>Brix</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this.props.dispatch({ type: ConversionActions.DILUTE_WEIGHT_TO_VOLUME, fromBrix: this.props.startingBrix, toBrix: this.props.dilutionBrix });
            this.props.dispatch({type: CalcActions.GOTO_DILUTION});
          }}
          style={(this.props.indexOn === 1) ? styles.buttonOn : styles.buttonOff}
        >
          <Text color={'yellow'} style={(this.props.indexOn === 1) ? styles.buttonTextOn : styles.buttonTextOff}>Dilution</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { this.props.dispatch({type: CalcActions.GOTO_JUICE}) }} style={(this.props.indexOn === 2) ? styles.buttonOn : styles.buttonOff} >
          <Text color={'yellow'} style={(this.props.indexOn === 2) ? styles.buttonTextOn : styles.buttonTextOff}>Juice Lookup</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { this.props.dispatch({type: CalcActions.GOTO_COST}) }} style={(this.props.indexOn === 3) ? styles.buttonOn : styles.buttonOff} >
          <Text color={'yellow'} style={(this.props.indexOn === 3) ? styles.buttonTextOn : styles.buttonTextOff}>Cost</Text>
        </TouchableOpacity>


      </View>
    );
  }
}

const FRAME = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    borderColor: 'rgb(220,220,220)',
    borderBottomWidth: 1
  },
  buttonOff: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonOn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 2
  },
  buttonTextOn: {
    textAlign: 'center',
    fontSize: 20, fontWeight: 'bold', fontFamily: 'roboto-bold',
    color: 'black'
  },
  buttonTextOff: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold', fontFamily: 'roboto-bold',
    color: 'rgb(200, 200, 200)'
  },
  bottomBarContainer: {

  },
  bottomBar: {
    width: FRAME.width/3,
    height: 2,
    backgroundColor: 'black'
  }
});

var mapStateToProps = state => {
  console.log(state.calc.indexOn);
  return {
    indexOn: state.calc.indexOn,
    startingBrix: state.calc.startingBrix,
    dilutionBrix: state.calc.dilutionBrix
  }
}

export default connect(mapStateToProps)(TabBar);
