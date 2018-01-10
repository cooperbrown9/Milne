import React, { Component } from 'react';
import { View, ListView, Text, TextInput, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import NavBar from '../../ui-elements/nav-bar';
import CalcButton from '../../ui-elements/calc-button';
// var RNFS = require('react-native-fs');
import {FileSystem} from 'expo';
// var data = require('./test.txt');
import Papa from 'papaparse';
import data from '../../../assets/charts/brix-data.json';

import * as NavActions from '../../redux/action-types/nav-action-types';
import * as CalcActions from '../../redux/action-types/calc-action-types';


class StartCalculator extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      brix: 0.0,
      meta: {}
    }
  }

  static navigationOptions = {
    header: null
  }

  componentDidMount() {
    let _data = data.map(d => d);
    this.setState({ dataSource: this.state.dataSource.cloneWithRows(_data) });
    this.parseData();
  }

  brixSelected = (data) => {
    this.setState({ brix: data.brix, meta: data });
    this.props.dispatch({ type: CalcActions.SET_BRIX_AND_META, brix: data.brix, meta: data });
  }

  parseData() {
    console.log(data);

  }

  _navigateCalc = () => {
    this.props.dispatch({ type: CalcActions.SET_BRIX_AND_META, brix: this.state.brix, meta: this.state.meta });
    this.props.dispatch({ type: NavActions.MAIN_CALC });
  }

  render() {
    return(
      <View style={styles.container} >
        <NavBar leftButton={<Image source={require('../../../assets/icons/search.png')} style={styles.navButton}/>}
                rightButton={<Image source={require('../../../assets/icons/bars.png')} style={styles.navButton}/>}
                leftOnPress={() => {}}
                rightOnPress={() => {}}
                title={<Text style={{color:'black', fontSize: 20}}>Starting Value</Text>}
        />

      <View style={styles.inputView} >
          <Text style={styles.inputLabel}>Starting Brix Value</Text>
          <ListView dataSource={this.state.dataSource} renderRow={(row) =>
              <TouchableOpacity onPress={() => this.brixSelected(row)} >
                <Text style={styles.listText}>{row.brix}</Text>
              </TouchableOpacity>
            } />


        {/*<TextInput onChangeText={(num) => this.setState({ brix: num })} keyboardType={'numeric'} style={styles.input} />*/}
      </View>

      <View style={styles.nextButton} >
        <CalcButton onPress={this._navigateCalc.bind(this)} title={'NEXT ->'}/>
      </View>

      </View>
    );
  }
}

const FRAME = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listText: {
    fontSize: 24,
    marginTop: 8, marginBottom: 8

  },
  inputView: {
    flex: 1,
    marginLeft: 32, marginRight: 32, marginTop: 84, marginBottom: 120

    // position: 'absolute',
    // left: 32,
    // right: 32,
    // top: FRAME.height / 2 - 100,
    // height: 100
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
  nextButton: {
    marginBottom: 64, marginLeft: 120, marginRight: 32,

    // position: 'absolute',
    // justifyContent: 'flex-start',
    // top: FRAME.height / 2 + 16,
    // left: FRAME.width / 2,
    // right: 16
  },
  navButton: {
    height: 22,
    width: 22,
    tintColor: 'black'
  }
});


var mapStateToProps = state => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(StartCalculator);
