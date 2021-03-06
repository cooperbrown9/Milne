import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import ProductDetailModal from '../screens/ProductDetailModal';
import StartCalculator from '../screens/calculator/start-calculator';
import CalculatorContainer from '../screens/calculator/CalculatorContainer';
import RequestSampleScreen from '../screens/RequestSampleScreen';
import TradeshowScreen from '../screens/TradeshowScreen';
import ContactScreen from '../screens/ContactScreen';
import VideoScreen from '../screens/VideoScreen';
import BrochureScreen from '../screens/BrochureScreen';
import TabBar from '../ui-elements/tab-bar';

export const Navigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Product: { screen: ProductScreen },
  ProductDetail: { screen: ProductDetailModal },
  StartCalc: { screen : StartCalculator },
  MainCalc: { screen: CalculatorContainer },
  RequestSample: { screen: RequestSampleScreen },
  Tradeshow: { screen: TradeshowScreen },
  Contact: { screen: ContactScreen },
  Video: { screen: VideoScreen },
  Brochure: { screen: BrochureScreen },
  TabBar: { screen: TabBar }
}, {
  navigationOptions: {
    header: null
}});

const AppNavigator = createAppContainer(Navigator);
export default AppNavigator;



// const AppNavigatorWithState = ({ dispatch, nav }) => (
//   <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav}) } />
// );
//
// AppNavigatorWithState.propTypes = {
//   dispatch: PropTypes.func.isRequired,
//   nav: PropTypes.object.isRequired
// };
//
// const mapStateToProps = state => ({
//   nav: state.nav
// });
//
// export default connect(mapStateToProps)(AppNavigatorWithState)
