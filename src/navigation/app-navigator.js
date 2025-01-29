import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { addNavigationHelpers, createStackNavigator, createAppContainer } from 'react-navigation';
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

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false // This replaces the old header: null
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Product" component={ProductScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailModal} />
        <Stack.Screen name="StartCalc" component={StartCalculator} />
        <Stack.Screen name="MainCalc" component={CalculatorContainer} />
        <Stack.Screen name="RequestSample" component={RequestSampleScreen} />
        <Stack.Screen name="Tradeshow" component={TradeshowScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
        <Stack.Screen name="Video" component={VideoScreen} />
        <Stack.Screen name="Brochure" component={BrochureScreen} />
        <Stack.Screen name="TabBar" component={TabBar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;

// Commented this out 28 Jan 2025
// export const Navigator = createStackNavigator({
//   Home: { screen: HomeScreen },
//   Product: { screen: ProductScreen },
//   ProductDetail: { screen: ProductDetailModal },
//   StartCalc: { screen : StartCalculator },
//   MainCalc: { screen: CalculatorContainer },
//   RequestSample: { screen: RequestSampleScreen },
//   Tradeshow: { screen: TradeshowScreen },
//   Contact: { screen: ContactScreen },
//   Video: { screen: VideoScreen },
//   Brochure: { screen: BrochureScreen },
//   TabBar: { screen: TabBar }
// }, {
//   navigationOptions: {
//     header: null
// }});


// const AppNavigator = createAppContainer(Navigator);
// export default AppNavigator;



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
