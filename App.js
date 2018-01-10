import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import { Font } from 'expo';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';

import MainReducer from './src/redux/reducers/main-reducer';
import AppNavigatorWithState from './src/navigation/app-navigator';

export default class App extends React.Component {

  store = createStore(MainReducer, applyMiddleware(thunk));

  state = {
    fontLoaded: false
  }

  async componentDidMount() {
    await Font.loadAsync({
      'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf')
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <Provider store={this.store} >
        {(this.state.fontLoaded) ? <AppNavigatorWithState /> : <View><ActivityIndicator/></View> }
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
