import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import StartCalculator from '../screens/calculator/start-calculator';
import CalculatorContainer from '../screens/calculator/CalculatorContainer';
import RequestSampleScreen from '../screens/RequestSampleScreen';
import TabBar from '../ui-elements/tab-bar';

export const AppNavigator = StackNavigator({
  Home: { screen: HomeScreen },
  Product: { screen: ProductScreen },
  StartCalc: { screen : StartCalculator },
  MainCalc: { screen: CalculatorContainer },
  RequestSample: { screen: RequestSampleScreen },
  TabBar: { screen: TabBar }
});

const AppNavigatorWithState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav}) } />
);

AppNavigatorWithState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps)(AppNavigatorWithState)
