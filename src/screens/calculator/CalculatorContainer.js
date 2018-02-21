import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ListView, StyleSheet, Image, Dimensions } from 'react-native';

import { connect } from 'react-redux';
import { getAllJuices } from '../../api/api';

import data from '../../../assets/charts/brix-data.json';
import juices from '../../../assets/charts/juice-list.json';

import Menu from '../../ui-elements/menu';
import TabBar from '../../ui-elements/tab-bar';
import NavBar from '../../ui-elements/nav-bar';
import DilutionTab from './dilution-tab';
import BrixTab from './brix-tab';
import JuiceTab from './juice-tab';
import CostTab from './cost-tab';

import * as CalcActions from '../../redux/action-types/calc-action-types';
import * as MenuActions from '../../redux/action-types/menu-action-types';
import * as NavActions from '../../redux/action-types/nav-action-types';

class CalculatorContainer extends Component {

  constructor(props) {
    super(props);

    // this.getAllJuices = getAllJuices.bind(this);

    this.state = {
      wholeBrix: 0.0,
      decimalBrix: 0.0,
      wholeDataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2}),
      decimalDataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2}),
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    }
  }

  static navigationOptions = {
    header: null,
    enableEmptySections: true
  }


  static propTypes = {
    brix: PropTypes.number,
    penis: PropTypes.string,
    menuOpen: PropTypes.bool
  }

  componentWillMount() {
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
  }

  componentDidMount() {
    // this.loadJuices();

  }

  openMenu = () => {
    this.props.dispatch({ type: MenuActions.OPEN_FROM_CALC });
  }

  goBack = () => {
    this.props.dispatch({ type: NavActions.BACK });
  }

  _setBrix = (brix) => {
    this.props.dispatch({ type: CalcActions.SET_BRIX, brix: brix });
  }

  _setBrixAndMeta = () => {
    for(let i = 0; i < data.length; i++) {
      if(data[i].brix == this.props.brix) {
        this.props.dispatch({ type: CalcActions.SET_BRIX_AND_META, brix: data[i].brix, meta: data[i] });
      }
    }
  }

  _wholeBrixSelected = (_brix) => {
    this.setState({ wholeBrix: _brix }, () => {
      this.props.dispatch({ type: CalcActions.SET_STARTING_BRIX, wholeBrix: this.state.wholeBrix, decimalBrix: this.state.decimalBrix });
    });
  }

  _decimalBrixSelected = (_brix) => {
    _brix = parseFloat(_brix);
    _brix *= 10;
    this.setState({ decimalBrix: _brix }, () => {
      this.props.dispatch({ type: CalcActions.SET_STARTING_BRIX, wholeBrix: this.state.wholeBrix, decimalBrix: this.state.decimalBrix });
    });
  }


  render() {
    return(
      <View style={styles.container} >

        <NavBar leftButton={<Image source={require('../../../assets/icons/back-arrow.png')} style={styles.navButton}/>}
                rightButton={<Image source={require('../../../assets/icons/bars.png')} style={styles.navButton}/>}
                leftOnPress={() => this.goBack()}
                rightOnPress={() => this.openMenu()}
                title={<Text style={{color:'black',fontSize: 20, fontFamily:'roboto-black'}}>{this.props.brix} Brix</Text>}
        />

        {this.props.menuOpen ?
            <Menu dispatch={this.props.dispatch} />
              : null
            }

        <View style={styles.tabContainer} >
          <TabBar />

        </View>
        <View style={styles.screenContainer} >
          {(this.props.indexOn === 0)
            ? <DilutionTab
              setBrix={(brix) => this._setBrix(brix) }
              setBrixAndMeta={() => this._setBrixAndMeta()}
              wholeDataSource={this.state.wholeDataSource}
              decimalDataSource={this.state.decimalDataSource}
              wholeBrixSelected={this._wholeBrixSelected}
              decimalBrixSelected={this._decimalBrixSelected}
            />
            : (this.props.indexOn === 1)
              ? <JuiceTab updateBrix={() => this._setBrixAndMeta() }/>
              : (this.props.indexOn === 2)
                ? <CostTab />
                : (this.props.indexOn === 3)
                  ? <BrixTab />
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
    brix: state.calc.brix,
    indexOn: state.calc.indexOn,
    menuOpen: state.menu.isOpen
  }
}

export default connect(mapStateToProps)(CalculatorContainer);
