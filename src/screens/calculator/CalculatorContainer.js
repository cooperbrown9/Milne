import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ListView, StyleSheet, Dimensions } from 'react-native';

import { connect } from 'react-redux';
import { getAllJuices } from '../../api/api';

import TabBar from '../../ui-elements/tab-bar';
import DilutionTab from './dilution-tab';
import JuiceTab from './juice-tab';
import CostTab from './cost-tab';

import * as CalcActions from '../../redux/action-types/calc-action-types';


class CalculatorContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    }
  }

  static propTypes = {
    brix: PropTypes.number,
    penis: PropTypes.string
  }



  componentDidMount() {
    getAllJuices((data) => {
      console.log(data);
      this._juiceListData(data.data);
    });
  }

  // sets initial datasource, so it isnt null on initialization in JuiceTab
  _juiceListData = (juices) => {
    let fruits = [
      {name: 'Acerola', brix: 6.0, selected: false },
      {name: 'Apple', brix: 11.5, selected: false},
      {name: 'Blackberry', brix: 10.0, selected: false},
      {name: 'Cabbage', brix: 3.0, selected: false},
      {name: 'Banana', brix: 22.0, selected: false},
      {name: 'Berry', brix: 8.0, selected: false},
      {name: 'Berry0', brix: 8.0, selected: false },
      {name: 'Berry9', brix: 8.0, selected: false },
      {name: 'Berry8', brix: 8.0, selected: false },
      {name: 'Berry88', brix: 8.0, selected: false },
      {name: 'Berry7', brix: 8.0, selected: false }
    ];
    // this.props.dispatch({ type: CalcActions.SET_DATA, data: fruits });
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2});
    var data = juices.map(fruit => fruit);
    this.props.dispatch({ type: CalcActions.SET_DATASOURCE, dataSource: ds.cloneWithRows(data) });
  }

  _selectJuice = (data) => {
    this.props.dispatch({ type: CalcActions.SET_DATASOURCE, dataSource: this.state.dataSource.cloneWithRows(data) });
  }


  render() {
    return(
      <View style={styles.container} >
        <View style={styles.tabContainer} >
          <TabBar />

        </View>
        <View style={styles.screenContainer} >
          {(this.props.indexOn === 0)
            ? <DilutionTab setBrix={(value) => { this.props.dispatch({type: CalcActions.SET_BRIX, brix: value }) }} />
            : (this.props.indexOn === 1)
              ? <JuiceTab onSelect={this._selectJuice.bind(this)}/>
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
  }
});

var mapStateToProps = state => {
  return {
    brix: state.nav.brix,
    indexOn: state.calc.indexOn
  }
}

export default connect(mapStateToProps)(CalculatorContainer);
