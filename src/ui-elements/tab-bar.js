import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

import { connect } from 'react-redux';

import * as CalcActions from '../redux/action-types/calc-action-types.js'

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


        <TouchableOpacity onPress={() => {  this.props.dispatch({type: CalcActions.GOTO_DILUTION}) } } style={styles.button} >
          <Text color={'yellow'} style={(this.props.indexOn === 0) ? styles.buttonTextOn : styles.buttonTextOff}>Dilution</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { this.props.dispatch({type: CalcActions.GOTO_JUICE})  } } style={styles.button} >
          <Text color={'yellow'} style={(this.props.indexOn === 1) ? styles.buttonTextOn : styles.buttonTextOff}>Juice Lookup</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { this.props.dispatch({type: CalcActions.GOTO_COST}) } } style={styles.button} >
          <Text color={'yellow'} style={(this.props.indexOn === 2) ? styles.buttonTextOn : styles.buttonTextOff}>Cost</Text>
        </TouchableOpacity>

        {/*(this.props.indexOn === 0)
          ? this.tabButton('Dilution', true, CalcActions.GOTO_DILUTION)
          : this.tabButton('Dilution', false, CalcActions.GOTO_DILUTION)
        }

        {(this.props.indexOn === 1)
          ? this.tabButton('Juice Lookup', true, CalcActions.GOTO_JUICE)
          : this.tabButton('Juice Lookup', false, CalcActions.GOTO_JUICE)
        }

        {(this.props.indexOn === 2)
          ? this.tabButton('Cost', true, CalcActions.GOTO_COST)
          : this.tabButton('Cost', false, CalcActions.GOTO_COST)
        */}


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
    borderColor: 'rgb(180,180,180)',
    borderBottomWidth: 2
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonTextOn: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black'
  },
  buttonTextOff: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
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
    indexOn: state.calc.indexOn

  }
}

export default connect(mapStateToProps)(TabBar);
