import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet, Dimensions } from 'react-native';

import { connect } from 'react-redux';

import CalcButton from '../../ui-elements/calc-button';
import OptionView from '../../ui-elements/option-view';

import * as ConversionActions from '../../redux/action-types/conversion-action-types';
import * as CalcActions from '../../redux/action-types/calc-action-types';
import * as Colors from '../../theme/colors';

import Share, { ShareSheet, Button } from 'react-native-share';


// show brix converting under price input
// share with a text
class CostTab extends Component {

  constructor() {
    super();

    this.state = {
      price: 10.00,
      priceOptions: [
        { value: 'Cost/LB', path: ConversionActions.COST_BY_POUND, selected: true, index: 0 },
        { value: 'Cost/Gal', path: ConversionActions.COST_BY_GALLON, selected: false, index: 1 },
        { value: 'Cost/Kg', path: ConversionActions.COST_BY_KG, selected: false, index: 2 },
        { value: 'Cost/Ton', path: ConversionActions.COST_BY_TON, selected: false, index: 3 },
        { value: 'Cost/SolidLBs', path: ConversionActions.COST_BY_KG, selected: false, index: 4 },
        { value: 'Reset', path: ConversionActions.COST_BY_KG, selected: false, index: 5 }
      ],
      unitType: ConversionActions.COST_BY_POUND,
      sharePresented: false
    }
  }

  componentDidMount() {
    this.setState({ price: 10.00 }, () => {
      this.props.dispatch({ type: ConversionActions.COST_BY_POUND, price: this.state.price });
    });
  }

  optionSelected = (index) => {
    OptionView.selectedExclusive(this.state.priceOptions, index, (arr) => {
      this.setState({ priceOptions: arr, selectedOptionIndex: index, unitType: arr[index].path }, () => {
        this.props.dispatch({ type: arr[index].path, price: this.state.price });
      });
    })
  }

  sendBrixTab = () => {
    this.props.dispatch({ type: CalcActions.GOTO_BRIX });
  }

  render() {
    const FACEBOOK_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAYFBMVEUAAAAAQIAAWpwAX5kAX5gAX5gAX5gAXJwAXpgAWZ8AX5gAXaIAX5gAXpkAVaoAX5gAXJsAX5gAX5gAYJkAYJkAXpoAX5gAX5gAX5kAXpcAX5kAX5gAX5gAX5YAXpoAYJijtTrqAAAAIHRSTlMABFis4vv/JL0o4QvSegbnQPx8UHWwj4OUgo7Px061qCrcMv8AAAB0SURBVEjH7dK3DoAwDEVRqum9BwL//5dIscQEEjFiCPhubziTbVkc98dsx/V8UGnbIIQjXRvFQMZJCnScAR3nxQNcIqrqRqWHW8Qd6cY94oGER8STMVioZsQLLnEXw1mMr5OqFdGGS378wxgzZvwO5jiz2wFnjxABOufdfQAAAABJRU5ErkJggg==";
    const EMAIL_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAABC1BMVEUAAAA/Pz8/Pz9AQEA/Pz8/Pz8+Pj4+Pj4/Pz8/Pz8/Pz8/Pz8+Pj4+Pj4/Pz8/Pz8/Pz9AQEA+Pj5AQEA/Pz87Ozs7Ozs/Pz8+Pj47OztAQEA/Pz89PT01NTVBQUFBQUE/Pz8/Pz8+Pj4/Pz9BQUE+Pj4/Pz8/Pz89PT0+Pj4/Pz9BQUFAQEA9PT09PT0/Pz87Ozs9PT05OTk/Pz8+Pj4/Pz9AQEA/Pz8/Pz8/Pz8/Pz+AgIA+Pj4/Pz8/Pz9AQEA/Pz8/Pz8/Pz8/Pz8+Pj4/Pz8/Pz8/Pz9AQEA+Pj4/Pz8+Pj4/Pz85OTk/Pz8/Pz8/Pz8/Pz88PDw9PT0/Pz88PDw8PDw+Pj45OTlktUJVAAAAWXRSTlMA/7N4w+lCWvSx8etGX/XlnmRO7+1" +
    "KY/fjOGj44DU7Uvn"+ "dMec/VvLbLj7YKyiJdu9O7jZ6Um1w7DnzWQJz+tpE6uY9t8D9QehAOt7PVRt5q6duEVDwSEysSPRjqHMAAAEfSURBVEjH7ZTXUgIxGEa/TwURUFyKYgMURLCvbe2gYAV7ff8nMRksgEDiKl7lXOxM5p8zO3s2CWAwGAx/CjXontzT25Y+pezxtpv2+xTygJ+BYOvh4BBDwx1lKxxhNNZqNjLK+JjVWUYsykj4+2h8gpNTUMkIBuhPNE+SKU7PQC3D62E60ziYzXIuBx0Z+XRTc9F5fgF6MhKNzWXnRejKWGJdc9GZy8AP3kyurH52Ju01XTkjvnldNN+Qi03RecthfFtPlrXz8rmzi739Ax7mUCjy6FhH/vjPonmqVD6pdT718excLX/tsItLeRAqtc7VLIsFlVy/t6+ub27v7t8XD490niy3p+rZpv3i+jy/Or+5SUrdvcNcywaDwfD/vAF2TBl+G" + "6XvQwAAAABJRU5ErkJggg==";


    return(
      <View style={styles.container} >
        <View style={styles.inputView} >
          <Text style={styles.inputLabel}>Price</Text>

          <View style={{ flexDirection: 'row', height:64, justifyContent: 'flex-start', backgroundColor:'transparent'}}>
            <Text style={{width: 24, marginTop: 8, fontSize: 22, fontFamily: 'roboto-bold', color: Colors.PURPLE, backgroundColor: 'transparent'}}>$</Text>
            <View style={{ flex: 1, marginRight: 32 }}>
              <TextInput
                defaultValue={'10.00'}
                value={this.state.price}
                onChangeText={(text) => this.setState({ price: text })}
                style={styles.input}
              />
            </View>
            <TouchableOpacity onPress={() => this.sendBrixTab()} style={styles.changeUnitButton} >
              <Text style={styles.inputCostLabel}>@ {this.props.brix} Brix</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex:1}}>
            <OptionView options={this.state.priceOptions} selectOption={(index) => this.optionSelected(index)} />
          </View>

        </View>

        <View style={styles.bottomContainer} >
          <Text style={{marginTop: 24, marginBottom: 16, fontSize: 14, fontFamily: 'roboto-regular',textAlign: 'center'}}></Text>

          <View style={styles.statContainer} >
            <View style={styles.leftStat} >
              <Text style={styles.topStatText}>$ {parseFloat(this.props.costData.perGal).toFixed(2)}</Text>
              <Text style={styles.bottomStatText}>Price Per Gallon</Text>
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

          </View>
          <View style={styles.shareButton} >
            <CalcButton title={'Share Calculation'} onPress={() => this.setState({ sharePresented: true })} />
          </View>
        </View>

        <ShareSheet visible={this.state.sharePresented} >
          <Button iconSrc={{uri:FACEBOOK_ICON}}>
            Facebook
          </Button>
          <Button iconSrc={{uri:EMAIL_ICON}}>
            Email
          </Button>
        </ShareSheet>

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
    marginLeft: 32, marginRight: 32, marginBottom: 32, marginTop: 8
  },
  statContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
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
    flex: 2,
    backgroundColor: Colors.MID_GREY,
    justifyContent: 'flex-start'
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
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 32
  },
  inputLabel: {
    marginBottom: 16, marginTop: 16,
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
    marginBottom: 16,
    flex: 1,
  },
});

var mapStateToProps = state => {
  return {
    brix: state.picker.brix,
    costData: state.conversion.cost
  }
}

export default connect(mapStateToProps)(CostTab);
