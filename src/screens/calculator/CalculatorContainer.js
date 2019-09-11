import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Image, Dimensions, LayoutAnimation, Animated } from 'react-native';

import { connect } from 'react-redux';
// import { getAllJuices } from '../../api/api';

// import data from '../../../assets/charts/brix-data-2019.json';
// import juices from '../../../assets/charts/juice-list.json';

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
import * as PickerActions from '../../redux/action-types/picker-action-types';

const FRAME = Dimensions.get('window');

var animationProps = {
  type: 'spring',
  property: 'opacity'
}

var animationConfig = {
  duration: 250,
  create: animationProps,
  update: animationProps
}

class CalculatorContainer extends Component {

  constructor(props) {
    super(props);

    // this.getAllJuices = getAllJuices.bind(this);

    this.state = {
      onWeightToVol: true,
      onImperial: true,
      wholeBrix: 0.0,
      decimalBrix: 0.0,
      wholeDataSource: [],//new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2}),
      decimalDataSource: [],//new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2}),
      // dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      coverOpacity: 0,
      zIndex: -1,
      menuTop: -FRAME.height
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

  componentDidMount() {
    // this.props.dispatch({ type: MenuActions.CLOSE })
    let wholeNumbers = [];
    for(let i = 0; i < 77; i++) {
      wholeNumbers.push({ value: i, selected: false });
    }
    let decimals = [];
    for(let i = 0; i <= 9; i++) {
      decimals.push({ value: '.' + i, selected: false });
    }

    this.props.dispatch({
      type: PickerActions.SET_WHOLE_BRIX_DS,
      dataSource: wholeNumbers,
      numbers: wholeNumbers
    })

    this.props.dispatch({
      type: PickerActions.SET_DECIMAL_BRIX_DS,
      dataSource: decimals,
      numbers: decimals
    })

    this.setState({
      wholeDataSource: wholeNumbers,
      decimalDataSource: decimals
    });
  }

  // shouldComponentUpdate()

  openMenu = () => {
    this.animate();
    if(this.props.menuOpen) {
      this.props.dispatch({ type: MenuActions.CLOSE });
    } else {
      this.props.dispatch({ type: MenuActions.OPEN_FROM_CALC });
    }
  }

  goBack = () => {
    this.props.dispatch({ type: NavActions.BACK });
  }

  _decimalBrixSelected = (_brix) => {
    _brix = parseFloat(_brix);
    _brix *= 10;
    this.setState({ decimalBrix: _brix }, () => {
      this.props.dispatch({ type: CalcActions.SET_STARTING_BRIX, wholeBrix: this.state.wholeBrix, decimalBrix: this.state.decimalBrix });
      this.props.dispatch({ type: ConversionActions.STARTING_METRICS, fromBrix: this.state.wholeBrix + '.' + this.state.decimalBrix });
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
      // this.props.dispatch({ type: CalcActions.SET_DILUTION_BRIX, wholeBrix: this.props.dilutionWholeBrix, decimalBrix: this.props.dilutionDecimalBrix });
      this.props.dispatch({ type: ConversionActions.DILUTION_METRICS, toBrix: this.props.dilutionWholeBrix + '.' + this.props.dilutionDecimalBrix });
      if(this.state.onWeightToVol) {
        this.props.dispatch({ type: ConversionActions.DILUTE_WEIGHT_TO_VOLUME, fromBrix: this.props.startingBrix, toBrix: this.props.dilutionBrix });
      } else {
        this.props.dispatch({ type: ConversionActions.DILUTE_VOLUME_TO_WEIGHT, fromBrix: this.props.startingBrix, toBrix: this.props.dilutionBrix });
      }
    });
  }

  animate = () => {
    var animationProps = {
      type: 'spring',
      springDamping: 0.9,
      property: 'opacity'
    }

    var animationConfig = {
      duration: 500,
      create: animationProps,
      update: animationProps
    }
    LayoutAnimation.configureNext(animationConfig);

    if(this.props.menuOpen) {
      this.setState({ menuTop: -FRAME.height });
    } else {
      this.setState({ menuTop: 32 });
    }
  }

  renderRightOnPress = () => {
    if(this.props.indexOn === 3) {
      return(
        <Image source={require('../../../assets/icons/share.png')} style={styles.navButton}/>
      )
    }
    return null;
  }

  onShareWrapper = (onShare) => {
    onShare()
  }

  render() {
    return(
      <View style={styles.container} >

        <NavBar leftButton={<Image source={require('../../../assets/icons/bars.png')} style={styles.navButton}/>}
                leftOnPress={() => this.openMenu()}
                title={<Text style={{color:'black',fontSize: 20, fontFamily:'roboto-black'}}>{this.props.startingBrix} Brix</Text>}
                rightButton={this.renderRightOnPress()}
                rightOnPress={(this.props.indexOn === 3) ? () => this.state.onShare() : null}
        />

      {/*this.props.menuOpen
          ?  <Menu dispatch={this.props.dispatch} />
        : null
      */}
        <View style={styles.tabContainer} >
          <TabBar />

        </View>
        <View style={styles.screenContainer} >
          {
            (this.props.indexOn === 0)
              ? <BrixTab
                  switchConversion={this._switchBrixConversion}
                  onImperial={this.state.onImperial}
                />
              : (this.props.indexOn === 1)
                ? <DilutionTab
                  brixSelected={this._dilutionBrixChanged}
                  switchConversion={this._switchDilutionConversion}
                  confirmBrixChanged={this._confirmDilutionBrixChange}
                  isBrixChanged={this.state.isDilutionBrixChanged}
                  onWeightToVol={this.state.onWeightToVol}
                />
                : (this.props.indexOn === 2)
                  ? <JuiceTab updateBrix={() => {} }/>
                  : (this.props.indexOn === 3)
                    ? <CostTab onShare={(onShare) => this.setState({ onShare: onShare })} />
                    : null
          }
        </View>

        {/*<Animated.View style={[styles.menuCover, { backgroundColor:'rgba(0,0,0,0.5)', opacity: this.state.opacity, zIndex: this.state.zIndex }]} pointerEvents={'none'} >
            <Animated.View style={[styles.menuContainer, { top: this.state.menuTop, zIndex: this.state.zIndex }]} >
              <Menu dispatch={this.props.dispatch} />
            </Animated.View>
          </Animated.View> */}
        <Animated.View style={{position:'absolute', left:0,right:0,top:this.state.menuTop,height:FRAME.height/2,backgroundColor:'white'}} >
          <Menu toggle={this.openMenu.bind(this)} dispatch={this.props.dispatch} navigate={this.props.navigation.navigate} closeParent={this.animate} />
        </Animated.View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  menuContainer: {
    height: FRAME.height / 2,
    left:0, right:0
  },
  menuCover: {
    position: 'absolute',
    left:0,right:0,top:0,bottom:0
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
  console.log(state.conversion.startingMetrics)
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
