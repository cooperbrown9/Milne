import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ListView, StyleSheet, Image, Dimensions } from 'react-native';

import { connect } from 'react-redux';
import { getAllJuices } from '../../api/api';

import TabBar from '../../ui-elements/tab-bar';
import NavBar from '../../ui-elements/nav-bar';
import DilutionTab from './dilution-tab';
import JuiceTab from './juice-tab';
import CostTab from './cost-tab';

import * as CalcActions from '../../redux/action-types/calc-action-types';


class CalculatorContainer extends Component {

  constructor(props) {
    super(props);

    this.getAllJuices = getAllJuices.bind(this);

    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    }
  }

  static navigationOptions = {
    header: null,
    enableEmptySections: true
  }


  static propTypes = {
    brix: PropTypes.number,
    penis: PropTypes.string
  }

  componentDidMount() {
    // this.loadJuices();
  }

  // sets initial datasource, so it isnt null on initialization in JuiceTab
  loadJuices = () => {
    this.getAllJuices((success, data) => {
      if(success) {
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2});
        var mappedData = data.data.map(fruit => fruit);
        this.props.dispatch({ type: CalcActions.SET_DATA_AND_SOURCE, data: data.data, dataSource: ds.cloneWithRows(mappedData) });
      } else {
        console.log('COULDNT GET JUICES', data);
      }
    });
  }

  callB = (success, data) => {
    if(success) {
      var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2});
      var mappedData = data.map(fruit => fruit);
      debugger;
      this.props.dispatch({ type: CalcActions.SET_DATA_AND_SOURCE, data: data, dataSource: ds.cloneWithRows(mappedData) });
    } else {
      console.log('COULDNT GET JUICES');
    }
  }

  // _selectJuice = (data) => {
  //   this.props.dispatch({ type: CalcActions.SET_DATASOURCE, dataSource: this.state.dataSource.cloneWithRows(data) });
  // }


  render() {
    return(
      <View style={styles.container} >

        <NavBar leftButton={<Image source={require('../../../assets/icons/search.png')} style={styles.navButton}/>}
                rightButton={<Image source={require('../../../assets/icons/bars.png')} style={styles.navButton}/>}
                leftOnPress={() => {}}
                rightOnPress={() => {}}
                title={<Text style={{color:'black',fontSize: 20}}>69.9</Text>}
        />

        <View style={styles.tabContainer} >
          <TabBar />

        </View>
        <View style={styles.screenContainer} >
          {(this.props.indexOn === 0)
            ? <DilutionTab setBrix={(value) => { this.props.dispatch({type: CalcActions.SET_BRIX, brix: value }) }} />
            : (this.props.indexOn === 1)
              ? <JuiceTab />
              : (this.props.indexOn === 2)
                ? <CostTab />
                : null
          }
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  tabContainer: {
    height: 64
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  navButton: {
    height: 22,
    width: 22,
    tintColor: 'black'
  }
});

var mapStateToProps = state => {
  return {
    brix: state.nav.brix,
    indexOn: state.calc.indexOn
  }
}

export default connect(mapStateToProps)(CalculatorContainer);
