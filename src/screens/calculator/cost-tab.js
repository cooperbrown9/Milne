import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet, Dimensions, Linking, ActionSheetIOS } from 'react-native';

import { SMS, MailComposer } from 'expo';
import { connect } from 'react-redux';

import CalcButton from '../../ui-elements/calc-button';
import OptionView from '../../ui-elements/option-view';
import Communications from 'react-native-communications';

import * as ConversionActions from '../../redux/action-types/conversion-action-types';
import * as CalcActions from '../../redux/action-types/calc-action-types';
import * as Colors from '../../theme/colors';

// show brix converting under price input
// share with a text
// TODO include KG measurement
// COMBAK remove current conversion, replace with one it isnt
// TODO option to text cost calculation

const STATS_OG = [
  { label: 'Price per Gallon', property: 'perGal',index: 0, isOn: false },
  { label: 'Price per LB', property: 'perLB', index: 1, isOn: true },
  { label: 'Price per Ton', property: 'perMetricTon', index: 2, isOn: true },
  { label: 'Price per KG', property: 'perKG', index: 3, isOn: true },
  { label: 'Price per Solid LB', property: 'perLBSolid', index: 4, isOn: true }
]
const RESERVE_STAT_OG = { label: 'Price per Solid LB', property: 'perLBSolid', index: 4, isOn: true }

class CostTab extends Component {

  constructor() {
    super();

    this.state = {
      price: 0.00,
      // prices: [
      //   { value: 'Cost/LB', path: ConversionActions.COST_BY_POUND, selected: false, index: 0 },
      //   { value: 'Cost/Gal', path: ConversionActions.COST_BY_GALLON, selected: false, index: 1 },
      //   { value: 'Cost/Kg', path: ConversionActions.COST_BY_KG, selected: false, index: 2 },
      //   { value: 'Cost/Ton', path: ConversionActions.COST_BY_TON, selected: false, index: 3 },
      //   { value: 'Cost/SolidLBs', path: ConversionActions.COST_BY_KG, selected: false, index: 4 }
      // ],
      priceOptions: [
        { value: 'Cost/Gal', path: ConversionActions.COST_BY_GALLON, selected: false, index: 0 },
        { value: 'Cost/LB', path: ConversionActions.COST_BY_POUND, selected: false, index: 1 },
        { value: 'Cost/Ton', path: ConversionActions.COST_BY_TON, selected: false, index: 2 },
        { value: 'Cost/Kg', path: ConversionActions.COST_BY_KG, selected: false, index: 3 },
        { value: 'Cost/SolidLBs', path: ConversionActions.COST_BY_SOLID_POUNDS, selected: false, index: 4 },
        { value: 'Reset', path: ConversionActions.CLEAR_COST, selected: false, index: 5 }
      ],
      stats: [
        { label: 'Price per Gallon', property: 'perGal',index: 0, isOn: false },
        { label: 'Price per LB', property: 'perLB', index: 1, isOn: true },
        { label: 'Price per Ton', property: 'perMetricTon', index: 2, isOn: true },
        { label: 'Price per KG', property: 'perKG', index: 3, isOn: true },
        { label: 'Price per Solid LB', property: 'perLBSolid', index: 4, isOn: true }
      ],
      reserveStat: { label: 'Price per Solid LB', property: 'perLBSolid', index: 4, isOn: false },
      // unitType: ConversionActions.COST_BY_POUND,
      sharePresented: false
    }
  }

  componentDidMount() {
    this.setState({ price: 0.00 }, () => {
      // this.props.dispatch({ type: ConversionActions.COST_BY_POUND, price: this.state.price });
      this.props.onShare(this.showActionSheet.bind(this))
    });
  }

  onSendSMS = async(message) => {
    const isAvailable = await SMS.isAvailableAsync();

    if(isAvailable) {
      await SMS.sendSMSAsync([], message)
    } else {
      console.log('nah')
    }
    console.log('send sms')
  }

  optionSelected = (index) => {
    // if(index !== 5) {
    //     // finds stat whose index is the same as the one selected
    //     let temp = this.state.stats.find((s) => s.index === index);
    //     // this gets the index of temp
    //     let indexOfStatToMove = this.state.stats.findIndex((s) => s.index === index);
    //     //
    //     this.state.stats[indexOfStatToMove] = this.state.reserveStat;
    //     this.state.reserveStat = temp;
    // }

    if(index === 5) {
      this.setState({ stats: STATS_OG, price: 0.00 })
      return;
    }

    for(let i = 0; i < this.state.stats.length; i++) {
      this.state.stats[i].isOn = true;
    }
    this.state.stats[index].isOn = false;

    OptionView.selectedExclusive(this.state.priceOptions, index, (arr) => {
      this.setState({ priceOptions: arr, selectedOptionIndex: index, unitType: arr[index].path }, () => {
        this.props.dispatch({ type: arr[index].path, price: this.state.price, stats: this.state.stats, reserveStat: this.state.reserveStat });

        // reset price as well
        // if(arr[index].path === ConversionActions.CLEAR_COST) {
        //   this.setState({ price: 0.00, stats: STATS_OG, reserveStat: RESERVE_STAT_OG });
        // }
      });
    })
  }

  sendBrixTab = () => {
    this.props.dispatch({ type: CalcActions.GOTO_BRIX });
  }

  showActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions({
      title: 'Select Media',
      options: ['Cancel', 'Email', 'Text Message'],
      cancelButtonIndex: 0
    }, (index) => {
      this.selectShareOption(index);
    })
  }

  share(callback) {
    let message = 'Here\'s my calculation from Milne!\n\n';

    if(this.props.costData.price != NaN) {
      message += 'Price: ' + parseFloat(this.props.costData.price).toFixed(2) + '\n';
      let selected = this.state.priceOptions.find(p => p.selected);
      message += ' ' + selected.value + ' @ ' + this.props.startingBrix + ' Brix\n';
    }
    if(this.props.costData.perGal != NaN) {
      message += 'Per Gallon: $' + parseFloat(this.props.costData.perGal).toFixed(2) + '\n';
    }
    if(this.props.costData.perLB != NaN) {
      message += 'Per LB: $' + parseFloat(this.props.costData.perLB).toFixed(2) + '\n';
    }
    if(this.props.costData.perKG != NaN) {
      message += 'Per KG: $' + parseFloat(this.props.costData.perKG).toFixed(2) + '\n';
    }
    if(this.props.costData.perMetricTon != NaN) {
      message += 'Per Metric Ton: $' + parseFloat(this.props.costData.perMetricTon).toFixed(2) + '\n';
    }
    if(this.props.costData.perLBSolid != NaN) {
      message += 'Per LB Solid: $' + parseFloat(this.props.costData.perLBSolid).toFixed(2) + '\n';
    }
    // console.log(message);

    callback(message);

    // Linking.openURL('mailto:tjones@milnefruit.com?body=' + email);
  }

  selectShareOption(index) {
    // debugger
    this.share(async(message) => {
      switch(index) {
        case 1:
          // email
          Communications.email([], null, null, 'Milne Cost Estimate', message)
          break;

        case 2:
        // text
          // Communications.text('', message);
          await this.onSendSMS(message)
          break;

        case 3:
          break;
        default:
          break;
      }
    });
  }

  initialTextInput() {
    // this.props.dispatch({ type: ConversionActions.COST_BY_POUND, price: this.state.price });
    if(this.state.price == '') {
      this.state.price = '0.00';
    }
    if(!this.state.price.includes('.')) {
      this.state.price += '.00';
    }

    this.setState({ price: this.state.price }, () => {
      this.optionSelected(0);
    })
  }

  statFactory() {
    let stats = [];
    for(let i = 0; i < this.state.stats.length; i++) {
      if(!this.state.stats[i].isOn || this.state.stats[i] == null) {
        console.log(this.state.stats)
        continue;
      }
      stats.push(
        <View style={styles.stat} >
          <Text style={styles.topStatText}>$ {parseFloat(this.props.costData[this.state.stats[i].property]).toFixed(2)}</Text>
          <Text style={styles.bottomStatText}>{this.state.stats[i].label}</Text>
        </View>
      );
    }

    return (
      <View style={{flex:1}}>
        <View style={styles.statContainer} >
          {stats[0]}
          {stats[1]}
        </View>

        <View style={styles.statContainer} >
          {stats[2]}
          {stats[3]}
        </View>
      </View>
    )
  }

  render() {

    return(
      <View style={styles.container} >
        <View style={[styles.inputView, { justifyContent:'flex-start'}]} >
          <Text style={styles.inputLabel}>Price</Text>

          <View style={{ flexDirection: 'row', height:64, justifyContent: 'flex-start', backgroundColor:'transparent', marginLeft: 16, marginRight: 16}}>
            <Text style={{width: 24, marginTop: 8, fontSize: 22, fontFamily: 'roboto-bold', color: Colors.PURPLE, backgroundColor: 'transparent'}}>$</Text>
            <View style={{ flex: 1, marginRight: 32 }}>
              <TextInput
                defaultValue={'0.00'}
                keyboardType={'numeric'}
                returnKeyType={'done'}
                value={this.state.price}
                onChangeText={(text) => this.setState({ price: text })}
                style={styles.input}
                onEndEditing={() => this.initialTextInput()}
                onFocus={() => this.setState({ price: '' })}
              />
            </View>
            <TouchableOpacity onPress={() => this.sendBrixTab()} style={styles.changeUnitButton} >
              <Text style={styles.inputCostLabel}>@ {this.props.startingBrix} Brix</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex:1, marginLeft: 16, marginRight: 16}}>
            <OptionView options={this.state.priceOptions} selectOption={(index) => this.optionSelected(index)} />
          </View>

          <View style={styles.bottomContainer} >
            <Text style={{marginTop: 8, marginBottom: 8, fontSize: 14, fontFamily: 'roboto-regular',textAlign: 'center'}}></Text>
            {this.statFactory()}
            {/*
              <View style={styles.statContainer} >
              <View style={styles.leftStat} >
              <Text ref={ref =>{this.ppVol = ref}} style={styles.topStatText}>$ {parseFloat(this.props.costData.perGal).toFixed(2)}</Text>
              <Text ref={ref =>{this.ppVolText = ref}} style={styles.bottomStatText}>Price Per Gallon</Text>
              </View>
              <View style={styles.rightStat} >
              <Text style={styles.topStatText}>$ {parseFloat(this.props.costData.perLB).toFixed(2)}</Text>
              <Text style={styles.bottomStatText}>Price Per LBS</Text>
              </View>
              </View>

              <View style={styles.statContainer} >
              <View style={styles.leftStat} >
              <Text style={styles.topStatText}>$ {parseFloat(this.props.costData.perMetricTon).toFixed(2)}</Text>
              <Text style={styles.bottomStatText}>Price Per Metric Ton</Text>
              </View>
              <View style={styles.rightStat} >
              <Text style={styles.topStatText}>$ {parseFloat(this.props.costData.perLBSolid).toFixed(2)}</Text>
              <Text style={styles.bottomStatText}>Price Per LBS Solid</Text>
              </View>

              </View>*/}
              {/*<View style={styles.shareButton} >
                <CalcButton title={'Share Calculation'} onPress={() => this.showActionSheet()} />
              </View>*/}
            </View>
        </View>


      </View>
    )
  }
}

CostTab.propTypes = {
  brix: PropTypes.number,

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.LIGHT
  },
  changeUnitButton: {
    position: 'absolute',
    right: 32, top: 0,
    borderRadius: 12, height: 32, width: 100,
    backgroundColor: Colors.PURPLE,
    justifyContent: 'center', alignItems: 'center'
  },
  shareButton: {
    // marginLeft: 32, marginRight: 32, marginBottom: 16
  },
  statContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  stat: {
    flexDirection: 'column'
  },
  leftStat: {
    flexDirection: 'column',
    marginRight: 16
  },
  rightStat: {
    flexDirection: 'column',
    marginLeft: 16
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: Colors.MID_GREY,
    justifyContent: 'flex-start',
  },
  topStatText: {
    fontSize: 28, marginBottom: 4,
    textAlign: 'center',
    fontWeight: 'bold', fontFamily: 'roboto-bold'
  },
  bottomStatText: {
    fontSize: 14,
    textAlign: 'center', fontFamily: 'roboto-bold',
    color: Colors.GREEN
  },
  inputView: {
    flex: 1,
    justifyContent: 'center',
    // marginLeft: 16,
    // marginRight: 16
  },
  inputLabel: {
    marginBottom: 16, marginTop: 16,
    marginLeft: 16, marginRight: 16,
    fontSize: 18, fontFamily: 'roboto-bold'
  },
  input: {
    color: 'black',
    fontFamily: 'roboto-bold',
    fontSize: 32,
    borderBottomColor: 'black',
    borderBottomWidth: 2
  },
  inputCostLabel: {
    color: 'white',
    textAlign: 'center', fontFamily: 'roboto-bold',
    fontSize: 14, backgroundColor: 'transparent'
  },
  optionContainer: {
    justifyContent: 'center',
    alignItems: 'stretch',
    flex: 1,
    marginLeft: 16,
    marginRight: 16
  },
  navButton: {
    position: 'absolute', right: 20, top: 12,
    height: 22, width: 22, tintColor: 'black'
  }
});

var mapStateToProps = state => {
  return {
    brix: state.picker.brix,
    startingBrix: state.calc.startingBrix,
    costData: state.conversion.cost
  }
}

export default connect(mapStateToProps)(CostTab);
