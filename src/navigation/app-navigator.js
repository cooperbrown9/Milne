import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';

export const AppNavigator = StackNavigator({
  Home: { screen: HomeScreen },
  Product: { screen: ProductScreen }
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
