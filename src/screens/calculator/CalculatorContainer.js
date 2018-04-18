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
import * as ConversionActions from '../../redux/action-types/conversion-action-types';

class CalculatorContainer extends Component {

  constructor(props) {
    super(props);

    // this.getAllJuices = getAllJuices.bind(this);

    this.state = {
      onWeightToVol: true,
      onImperial: true,
      dilutionBrixClean: true,
      startingBrixClean: true,
      wholeBrix: 0.0,
      decimalBrix: 0.0,
      wholeBrixForDilution: 0.0,
      decimalBrixForDilution: 0.0,
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

  updateDaRows = (r1, r2) => {
    debugger;
  }

  componentWillMount() {
    let wholeNumbers = [];
    for(let i = 0; i < 77; i++) {
      wholeNumbers.push({ value: i, selected: false });
    }
    let decimals = [];
    for(let i = 0; i <= 9; i++) {
      decimals.push({ value: '.' + i, selected: false });
    }

    this.props.dispatch({
      type: CalcActions.SET_WHOLE_DATASOURCE,
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => { r1.selected !== r2.selected }}).cloneWithRows(wholeNumbers),
      numbers: wholeNumbers
    });

    this.props.dispatch({
      type: CalcActions.SET_DECIMAL_DATASOURCE,
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => { r1.selected !== r2.selected }}).cloneWithRows(decimals),
      numbers: decimals
    });

    this.setState({
      wholeDataSource: this.state.wholeDataSource.cloneWithRows(wholeNumbers),
      decimalDataSource: this.state.decimalDataSource.cloneWithRows(decimals)
    });
  }

  // move dataSources to calcReducer
  // make the dilution brixPicker max out at startingBrix - 0.1
  componentDidMount() {
    // this.loadJuices();
  }

  openMenu = () => {
    this.props.dispatch({ type: MenuActions.OPEN_FROM_CALC });
  }

  goBack = () => {
    this.props.dispatch({ type: NavActions.BACK });
  }

  // deprecated for dilution
  _setBrix = (brix) => {
    this.props.dispatch({ type: CalcActions.SET_BRIX, brix: brix });
  }

  // deprecated for dilution
  _setBrixAndMeta = () => {
    for(let i = 0; i < data.length; i++) {
      if(data[i].brix == this.props.brix) {
        this.props.dispatch({ type: CalcActions.SET_BRIX_AND_META, brix: data[i].brix, meta: data[i] });
      }
    }
  }

  _wholeBrixSelected = (brix, index) => {
    debugger;
    this.setState({ wholeBrix: brix.value }, () => {
      this.props.dispatch({ type: CalcActions.SET_STARTING_BRIX, wholeBrix: this.state.wholeBrix, decimalBrix: this.state.decimalBrix });
      this.props.dispatch({ type: ConversionActions.STARTING_METRICS, fromBrix: this.state.wholeBrix + '.' + this.state.decimalBrix });
    });
  }

  _decimalBrixSelected = (_brix) => {
    _brix = parseFloat(_brix);
    _brix *= 10;
    this.setState({ decimalBrix: _brix }, () => {
      // this.setState({ startBrixHero: this.state.wholeBrix + '.' + this.state.decimalBrix });
      this.props.dispatch({ type: CalcActions.SET_STARTING_BRIX, wholeBrix: this.state.wholeBrix, decimalBrix: this.state.decimalBrix });
      this.props.dispatch({ type: ConversionActions.STARTING_METRICS, fromBrix: this.state.wholeBrix + '.' + this.state.decimalBrix });
    });
  }

  brixSelectedHelper = (rowID, rowData, isWholeNumber) => {
    debugger;
  }

  // deprecated
  _wholeBrixSelectedForDilution = (_brix) => {
    return;
    this.setState({ wholeBrixForDilution: _brix }, () => {
      // this.setState({ startBrixHero: this.state.wholeBrix + '.' + this.state.decimalBrix });
      this.props.dispatch({ type: CalcActions.SET_DILUTION_BRIX, wholeBrix: this.state.wholeBrixForDilution, decimalBrix: this.state.decimalBrixForDilution });
      this.props.dispatch({ type: ConversionActions.DILUTION_METRICS, toBrix: this.state.wholeBrixForDilution + '.' + this.state.decimalBrixForDilution });
    });
  }

  // deprecated
  _decimalBrixSelectedForDilution = (_brix) => {
    return;
    _brix = parseFloat(_brix);
    _brix *= 10;
    this.setState({ decimalBrixForDilution: _brix }, () => {
      this.props.dispatch({ type: CalcActions.SET_DILUTION_BRIX, wholeBrix: this.state.wholeBrixForDilution, decimalBrix: this.state.decimalBrixForDilution });
      this.props.dispatch({ type: ConversionActions.DILUTION_METRICS, toBrix: this.state.wholeBrixForDilution + '.' + this.state.decimalBrixForDilution });
    });
  }

  _switchBrixConversion = () => {
    this.setState({ onImperial: !this.state.onImperial });
  }

  _switchDilutionConversion = (path) => {
    this.props.dispatch({ type: path, fromBrix: this.props.startingBrix, toBrix: this.props.dilutionBrix });
    this.setState({ onWeightToVol: !this.state.onWeightToVol }, () => {
    });
  }

  // just set state
  _dilutionBrixChanged = (brix) => {
    if(!this.state.isDilutionBrixChanged) {
      this.setState({ isDilutionBrixChanged: true });
    }
  }

  _confirmDilutionBrixChange = () => {
    this.setState({ isDilutionBrixChanged: false }, () => {
      this.props.dispatch({ type: CalcActions.SET_DILUTION_BRIX, wholeBrix: this.props.dilutionWholeBrix, decimalBrix: this.props.dilutionDecimalBrix });
      this.props.dispatch({ type: ConversionActions.DILUTION_METRICS, toBrix: this.props.dilutionWholeBrix + '.' + this.props.dilutionDecimalBrix });
      if(this.state.onWeightToVol) {
        this.props.dispatch({ type: ConversionActions.DILUTE_WEIGHT_TO_VOLUME, fromBrix: this.props.startingBrix, toBrix: this.props.dilutionBrix });
      } else {
        this.props.dispatch({ type: ConversionActions.DILUTE_VOLUME_TO_WEIGHT, fromBrix: this.props.startingBrix, toBrix: this.props.dilutionBrix });
      }
    });
  }


  render() {
    return(
      <View style={styles.container} >

        <NavBar leftButton={<Image source={require('../../../assets/icons/back-arrow.png')} style={styles.navButton}/>}
                rightButton={<Image source={require('../../../assets/icons/bars.png')} style={styles.navButton}/>}
                leftOnPress={() => this.goBack()}
                rightOnPress={() => this.openMenu()}
                title={<Text style={{color:'black',fontSize: 20, fontFamily:'roboto-black'}}>{this.props.startingBrix} Brix</Text>}
        />

        {this.props.menuOpen ?
            <Menu dispatch={this.props.dispatch} />
              : null
            }

        <View style={styles.tabContainer} >
          <TabBar />

        </View>
        <View style={styles.screenContainer} >
          {
            (this.props.indexOn === 0)
              ? <BrixTab
                  wholeDataSource={this.state.wholeDataSource}
                  decimalDataSource={this.state.decimalDataSource}
                  wholeBrixSelected={(rowID, rowData, isWholeNum) => this.brixSelectedHelper(rowID, rowData, isWholeNum)}
                  decimalBrixSelected={this._decimalBrixSelected}
                  switchConversion={this._switchBrixConversion}
                  onImperial={this.state.onImperial}
                />
              : (this.props.indexOn === 1)
                ? <DilutionTab
                  wholeDataSource={this.state.wholeDataSource}
                  decimalDataSource={this.state.decimalDataSource}
                  // wholeBrixSelected={this._dilutionBrixChanged}
                  // decimalBrixSelected={this._dilutionBrixChanged}
                  brixSelected={this._dilutionBrixChanged}
                  switchConversion={this._switchDilutionConversion}
                  confirmBrixChanged={this._confirmDilutionBrixChange}
                  isBrixChanged={this.state.isDilutionBrixChanged}
                  onWeightToVol={this.state.onWeightToVol}
                />
                : (this.props.indexOn === 2)
                  ? <JuiceTab updateBrix={() => console.log('') }/>
                  : (this.props.indexOn === 3)
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
    brix: state.calc.brix,
    indexOn: state.calc.indexOn,
    menuOpen: state.menu.isOpen,
    startingBrix: state.calc.startingBrix,
    dilutionBrix: state.calc.dilutionBrix,
    dilutionWholeBrix: state.calc.dilutionBrixWhole,
    dilutionDecimalBrix: state.calc.dilutionBrixDecimal
  }
}

export default connect(mapStateToProps)(CalculatorContainer);
