import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as NavActions from '../redux/action-types/nav-action-types';

class HomeScreen extends Component {

  static navigationOptions = {
    header: null
  }

  state = {

  }

  sendScreen(path) {
    this.props.navigation.dispatch({ type: path });
  }

  render() {
    return(
      <View style={styles.container} >
        <TouchableOpacity style={{height:64}} onPress={() => this.sendScreen(NavActions.PRODUCT) } ><Text>Products</Text></TouchableOpacity>
        <TouchableOpacity style={{height:64}} onPress={() => this.sendScreen(NavActions.TRADESHOW) }><Text>Tradeshows</Text></TouchableOpacity>
        <TouchableOpacity style={{height:64}} onPress={() => this.sendScreen(NavActions.MAIN_CALC) }><Text>Calculator</Text></TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(0,100,200)',
    justifyContent:'center', alignItems:'center'
  }
});

export default HomeScreen;
