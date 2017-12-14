import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import { connect } from 'react-redux';

import TabBar from '../../ui-elements/tab-bar';
import DilutionTab from './dilution-tab';
import JuiceTab from './juice-tab';
import CostTab from './cost-tab';
import * as CalcActions from '../../redux/action-types/calc-action-types';

class CalculatorContainer extends Component {

  static propTypes = {
    brix: PropTypes.number,
    penis: PropTypes.string
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
  }
});

var mapStateToProps = state => {
  return {
    brix: state.nav.brix,
    indexOn: state.calc.indexOn
  }
}

export default connect(mapStateToProps)(CalculatorContainer);
