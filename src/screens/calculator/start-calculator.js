import React, { Component } from 'react';
import { View, ListView, Text, TextInput, Image, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { connect } from 'react-redux';

import NavBar from '../../ui-elements/nav-bar';
import CalcButton from '../../ui-elements/calc-button';
import Menu from '../../ui-elements/menu';

import BrixPicker from '../../ui-elements/brix-picker';

// import Papa from 'papaparse';
import data from '../../../assets/charts/brix-data.json';

import * as NavActions from '../../redux/action-types/nav-action-types';
import * as MenuActions from '../../redux/action-types/menu-action-types';
import * as CalcActions from '../../redux/action-types/calc-action-types';
import * as ConversionActions from '../../redux/action-types/conversion-action-types';

// start from tabbed page
// juicelookup - if startingbrix is selected, push to dilution and pass chosen brix for dilution brix
class StartCalculator extends Component {

  constructor(props) {
    super(props);

    this.state = {
      wholeDataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      decimalDataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      brix: 0.0,
      wholeBrix: 0,
      decimalBrix: 0,
      meta: {}
    }
  }

  static navigationOptions = {
    header: null
  }

  componentDidMount() {
    console.log('height' + FRAME.height);
    // let _data = data.map(d => d);
    let wholeNumbers = [];
    for(let i = 0; i < 77; i++) {
      wholeNumbers.push(i);
    }
    let decimals = [];
    for(let i = 0; i <= 9; i++) {
      decimals.push('.' + i);
    }

    this.setState({
      wholeDataSource: this.state.wholeDataSource.cloneWithRows(wholeNumbers),
      decimalDataSource: this.state.decimalDataSource.cloneWithRows(decimals)
    });
    // this.props.dispatch({ type: NavActions.REQUEST_SAMPLE });
  }

  wholeBrixSelected = (_brix) => {
    this.setState({ wholeBrix: _brix }, () => {
      this.props.dispatch({ type: CalcActions.SET_STARTING_BRIX, wholeBrix: this.state.wholeBrix, decimalBrix: this.state.decimalBrix });
    });
  }

  decimalBrixSelected = (_brix) => {
    _brix = parseFloat(_brix);
    _brix *= 10;
    this.setState({ decimalBrix: _brix }, () => {
      this.props.dispatch({ type: CalcActions.SET_STARTING_BRIX, wholeBrix: this.state.wholeBrix, decimalBrix: this.state.decimalBrix });
    });
  }

  openMenu() {
    this.props.dispatch({ type: MenuActions.OPEN_FROM_CALC });
  }

  goBack = () => {
    this.props.dispatch({ type: NavActions.BACK });
  }

  // dont let user go unless they enter a brix
  _navigateCalc = () => {
    if(this.props.startingBrix < 1) {
      Alert.alert('Choose a starting brix value first!');
      return;
      // this.props.dispatch({ type: CalcActions.SET_STARTING_BRIX, wholeBrix: 10, decimalBrix: 1 });
    }
    this.props.dispatch({ type: CalcActions.SET_DILUTION_BRIX, wholeBrix: 1, decimalBrix: 1})
    this.props.dispatch({ type: ConversionActions.STARTING_METRICS, fromBrix: this.props.startingBrix });
    this.props.dispatch({ type: ConversionActions.DILUTION_METRICS, toBrix: 1.1 });
    // this.props.dispatch({ type: CalcActions.SET_BRIX_AND_META, brix: this.state.brix, meta: this.state.meta });
    this.props.dispatch({ type: NavActions.MAIN_CALC });
  }

  render() {
    return(
      <View style={styles.container} >
        <NavBar rightButton={<Image style={styles.navButton}/>}
                rightOnPress={() => this.goBack()}
                title={<Text style={{color:'black', fontSize: 20}}>Starting Value</Text>}
        />


        {this.props.menuOpen
          ? <Menu dispatch={this.props.dispatch} />
          : null
        }

        <BrixPicker
          wholeDataSource={this.state.wholeDataSource}
          decimalDataSource={this.state.decimalDataSource}
          wholeBrixSelected={this.wholeBrixSelected.bind(this)}
          decimalBrixSelected={this.decimalBrixSelected.bind(this)}
        />

        <View style={styles.nextButton} >
          <CalcButton onPress={() => this._navigateCalc()} title={'NEXT'}/>
        </View>

      </View>
    );
  }
}

const FRAME = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  listText: {
    fontSize: 32, fontFamily: 'roboto-bold',
    marginTop: 8, marginBottom: 8,
    textAlign: 'center'
  },
  inputView: {
    flex: 2,
    marginLeft: 32, marginRight: 32, marginTop: 84, marginBottom: 32
  },
  inputLabel: {
    marginBottom: 16,
    fontSize: 18, fontFamily: 'roboto-regular'
  },
  input: {
    color: 'black',
    fontWeight: 'bold', fontFamily: 'roboto-bold',
    fontSize: 32,
    borderBottomColor: 'black',
    borderBottomWidth: 2
  },
  nextButton: {
    flex: 1,
    marginLeft: 64, marginRight: 64, marginTop: 32
  },
  navButton: {
    height: 22,
    width: 22,
    tintColor: 'black'
  }
});


var mapStateToProps = state => {
  return {
    menuOpen: state.menu.isOpen,
    startingBrix: state.calc.startingBrix
  }
}

export default connect(mapStateToProps)(StartCalculator);
