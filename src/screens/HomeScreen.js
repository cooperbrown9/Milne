import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as NavActions from '../redux/action-types/nav-action-types';

class HomeScreen extends Component {

  static navigationOptions = {
    header: null
  }

  state = {

  }

  sendProductScreen() {
    this.props.navigation.dispatch({ type: NavActions.PRODUCT, model: { yoBihOnMyDih: true }});
  }

  render() {
    return(
      <View style={styles.container} >
        <Text>Wubba lubba dub dub</Text>
        <Button onPress={() => {this.sendProductScreen()}} title={'PRESS FOR NEW CHOPPA'} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(0,100,200)'
  }
});

export default HomeScreen;
