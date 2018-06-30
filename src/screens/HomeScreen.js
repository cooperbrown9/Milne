import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import * as NavActions from '../redux/action-types/nav-action-types';
import * as Colors from '../theme/colors';

class HomeScreen extends Component {

  static navigationOptions = {
    header: null
  }

  constructor() {
    super();

    this.state = {
      image: require('../../assets/images/cherry-bg.jpg')
    }
  }

  componentWillMount() {
    let randVal = Math.floor(Math.random() * 5);

    switch(randVal) {
      case 0:
        this.setState({ image: require('../../assets/images/blueberries.jpg') });
        break;
      case 1:
        this.setState({ image: require('../../assets/images/cherry-bg.jpg') });
        break;
      case 2:
        this.setState({ image: require('../../assets/images/farmer.jpg') });
        break;
      case 3:
        this.setState({ image: require('../../assets/images/grapes.jpg') });
        break;
      case 4:
        this.setState({ image: require('../../assets/images/night.jpg') });
        break;
      default:
        this.setState({ image: require('../../assets/images/cherry-bg.jpg') });
    }
  }

  sendScreen(path) {
    this.props.navigation.dispatch({ type: path });
  }

  render() {
    return(
      <View style={styles.container} >
        <Image style={styles.bgImage} source={this.state.image} resizeMode={'contain'} resizeMethod={'resize'} />

        <View style={styles.logoContainer} >
          <Image style={styles.logo} resizeMode={'contain'} source={require('../../assets/images/milne-logo-white-purple.png')} />
        </View>

        <View style={{height: 100}} />
        <TouchableOpacity style={styles.button} onPress={() => this.sendScreen(NavActions.PRODUCT) } >
          <Text style={styles.text}>Products</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.sendScreen(NavActions.TRADESHOW) }>
          <Text style={styles.text}>Tradeshows</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.sendScreen(NavActions.MAIN_CALC) }>
          <Text style={styles.text}>Calculator</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(0,100,200)',
    flexDirection: 'column',
    justifyContent:'center', alignItems:'stretch'
  },
  logoContainer: {
    position: 'absolute', left: 0, right: 0, top: 64,
    height: 120,
    justifyContent: 'center', alignItems: 'center',
    zIndex: 10000,
  },
  logo: {
    flex: 1
  },
  text: {
    textAlign: 'center',
    fontSize: 32, color: Colors.PURPLE, backgroundColor: 'transparent',
    fontFamily: 'roboto-bold'
  },
  button: {
    height: 64, justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 32, marginLeft: 32, marginRight: 32,
    zIndex: 10000
  },
  bgImage: {
    position: 'absolute',
    left: 0, right: 0, top: 0, bottom: 0,
    zIndex: 1
  }
});

export default HomeScreen;
