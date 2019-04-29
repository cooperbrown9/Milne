import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage, ActivityIndicator } from 'react-native';

import { Font, Asset } from 'expo';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';

import MainReducer from './src/redux/reducers/main-reducer';
import AppNavigatorWithState from './src/navigation/app-navigator';




// TODO
/*
Fix Android entirely
Fix menu, just make it way cleaner
Make easier to share brochure, maybe share button on the brochure that links to it on their website
Share both Android and iOS
Make address clickable on Contact
Fix calculator so it doesnt reset
*/

function cacheImages(images) {
  return images.map(img => {
    return Asset.fromModule(img.path).downloadAsync();
  });
}


export default class App extends Component {

  store = createStore(MainReducer, applyMiddleware(thunk));

  constructor() {
    super();

    this.state = {
      fontLoaded: false
    }
  }

  cacheImages(images) {
    return images.map(image => {
      return Asset.fromModule(image).downloadAsync()
    })
  }


  async componentDidMount() {
    console.disableYellowBox = true;

    await Font.loadAsync({
      'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
      'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
      'roboto-black': require('./assets/fonts/Roboto-Black.ttf')
    });

    const images = this.cacheImages([
      require('./assets/images/blueberries.jpg'),
      require('./assets/images/brochure.jpg'),
      require('./assets/images/cherry-bg.jpg'),
      require('./assets/images/farmer.jpg'),
      require('./assets/images/grapes.jpg'),
      require('./assets/images/milne-logo-white-purple.png'),
      require('./assets/images/night.jpg'),
      require('./assets/fruits/apple.png'),
      require('./assets/fruits/apricot.png'),
      require('./assets/fruits/blackberry.png'),
      require('./assets/fruits/blueberry.png'),
      require('./assets/fruits/cherry.png'),
      require('./assets/fruits/cranberry.png'),
      require('./assets/fruits/cucumber.png'),
      require('./assets/fruits/currant.png'),
      require('./assets/fruits/grape.png'),
      require('./assets/fruits/kiwi.png'),
      require('./assets/fruits/peach.png'),
      require('./assets/fruits/plum.png'),
      require('./assets/fruits/pomegranate.png'),
      require('./assets/fruits/pumpkin.png'),
      require('./assets/fruits/purple-cabbage.png'),
      require('./assets/fruits/raspberry.png'),
      require('./assets/fruits/red-beet.png'),
      require('./assets/fruits/strawberry.png'),
      require('./assets/fruits/watermelon.png'),
      require('./assets/icons/add.png'),
      require('./assets/icons/arrow-pointing-to-right.png'),
      require('./assets/icons/back-arrow.png'),
      require('./assets/icons/bars.png'),
      require('./assets/icons/check-mark.png'),
      require('./assets/icons/down-arrow.png'),
      require('./assets/icons/forward-arrow.png'),
      require('./assets/icons/milne-2019-updated.png'),
      require('./assets/icons/plus.png'),
      require('./assets/icons/right-arrow.png'),
      require('./assets/icons/share.png')
    ])
    await Promise.all([...images])

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
