import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';

import Communications from 'react-native-communications';
import WebScreen from './WebScreen';
// import Pdf from 'react-native-pdf';

const BROCHURE_URL = 'https://www.dropbox.com/s/z3zjjzhoci78csw/Milne_CatalogCore1806_8.5x11_hr.pdf?dl=0';

import * as NavActions from '../redux/action-types/nav-action-types';
import * as Colors from '../theme/colors';

class HomeScreen extends Component {

  static navigationOptions = {
    header: null
  }

  constructor() {
    super();

    this.state = {
      image: require('../../assets/images/cherry-bg.jpg'),
      brochurePresent: false
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

  selectShareOption(index) {
    this.share((message) => {
      switch(index) {
        case 1:
          // email
          Communications.email([''], null, null, 'Milne App', message)
          break;

        case 2:
        // text
          Communications.text('', message);
          break;

        case 3:
          break;
        default:
          break;
      }
    });
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
        <TouchableOpacity style={styles.button} onPress={() => this.sendScreen(NavActions.MAIN_CALC) }>
          <Text style={styles.text}>Calculator</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.sendScreen(NavActions.PRODUCT) } >
          <Text style={styles.text}>Products</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.sendScreen(NavActions.TRADESHOW) }>
          <Text style={styles.text}>Tradeshows</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.sendScreen(NavActions.VIDEO) }>
          <Text style={styles.text}>Videos</Text>
        </TouchableOpacity>

        <View style={styles.bottomContainer} >
          <TouchableOpacity style={styles.bottomButton} onPress={() => this.sendScreen(NavActions.VIDEO)} >
            <Text style={styles.bottomText} >Share</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottomButton} onPress={() => this.setState({ brochurePresent: true })} >
            <Text style={styles.bottomText} >Brochure</Text>
          </TouchableOpacity>
        </View>

        <Modal animationType={'slide'} visible={this.state.brochurePresent} >
          <WebScreen
            url={'https://www.dropbox.com/s/z3zjjzhoci78csw/Milne_CatalogCore1806_8.5x11_hr.pdf?dl=0'}
            dismiss={() => this.setState({ brochurePresent: false })}
          />
        </Modal>

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
  bottomContainer: {
    position: 'absolute', left: 0, right: 0, bottom: 64, height: 48,
    flexDirection: 'row',
    justifyContent: 'space-around', alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: 1
  },
  bottomButton: {

  },
  bottomText: {
    textAlign: 'center', fontSize: 24, fontFamily: 'roboto-bold', color:'rgba(255,255,255,0.5)'
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
