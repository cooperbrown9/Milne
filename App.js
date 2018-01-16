import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage, ActivityIndicator } from 'react-native';

import { Font, Asset, AppLoading } from 'expo';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';

import MainReducer from './src/redux/reducers/main-reducer';
import AppNavigatorWithState from './src/navigation/app-navigator';



function cacheImages(images) {
  return images.map(img => {
    return Asset.fromModule(img.path).downloadAsync();
  });

  // return;
  // return images.map(img => {
  //   if(typeof img === 'string') {
  //     return Image.prefetch(img);
  //   } else {
  //     return Asset.fromModule(img).downloadAsync();
  //   }
  // });
}


export default class App extends Component {

  store = createStore(MainReducer, applyMiddleware(thunk));

  state = {
    fontLoaded: false
  }

  async componentDidMount() {
    await Font.loadAsync({
      'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
      'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
      'roboto-black': require('./assets/fonts/Roboto-Black.ttf')
    });

    // await this.loadAssetsAsync();
    // await AsyncStorage.setItem('key:@apple', require('./assets/fruits/apple.png'));
    // await AsyncStorage.setItem('key:@apricot', require('./assets/fruits/apricot.png'));
    this.setState({ fontLoaded: true });
  }

  async loadAssetsAsync() {
    // const imageAssets = cacheImages([
    //   'apple': require('./assets/fruits/apple.png'),
    //   'apricot': require('./assets/fruits/apricot.png')
    // ]);
    let apple = await Asset.fromModule(require('./assets/fruits/apple.png')).downloadAsync();

    await Promise.all([apple]);
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
