import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Dimensions,
  Animated,
  LayoutAnimation,
  Alert,
} from 'react-native';
import _ from 'lodash';

import NavBar from '../ui-elements/nav-bar.js';
import Menu from '../ui-elements/menu';

import { getAllJuices } from './../api/api';
import { JUICES } from '../util/initial-data';

import * as Colors from '../theme/colors';
import * as MenuActions from '../redux/action-types/menu-action-types';
import WebScreen from './WebScreen.js';

const FRAME = Dimensions.get('window');
class ProductScreen extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.getAllJuices = getAllJuices.bind(this);
    this.state = {
      pressedProduct: null,
      productDetailModalPresented: false,
      promptOpen: false,
      fruits: JUICES,
      webOpen: false,
      url: '',
      cover: 0,
      menuTop: -FRAME.height
    }
  }

  openMenu() {
    this.animate();
    if (this.props.menuOpen) {
      this.props.dispatch({ type: MenuActions.CLOSE });
    } else {
      this.props.dispatch({ type: MenuActions.OPEN_FROM_PRODUCT });
    }
  }

  itemPressed(rowData) {
    this.setState({ pressedProduct: rowData }, () => {
      this.props.navigation.navigate('ProductDetail', { product: rowData })
    });
  }

  dismissModal = () => {
    this.setState({ productDetailModalPresented: false });
  }

  async navigateSampleRequest() {
    const pw = await AsyncStorage.getItem('PASSWORD');

    if (pw != '1956') {
      this.setState({ promptOpen: true });
    } else {
      this.props.navigation.navigate("RequestSample");
    }
  }

  enterPassword(text) {
    if (text === 'test') {
      AsyncStorage.setItem('PASSWORD', text, () => {
        this.props.navigation.navigate("RequestSample");
      })
    } else {
      Alert.alert('Incorrect Password');
    }
  }

  _onSuccessPassword = () => {
    AsyncStorage.setItem('PASSWORD', '1956', () => {
      this.setState({ promptOpen: false })
      this.props.navigation.navigate('RequestSample')
    })
  }

  _onDismissPassword = () => {
    this.setState({ promptOpen: false })
  }

  animate = () => {
    var animationProps = {
      type: 'spring',
      springDamping: 0.9,
      property: 'opacity'
    }

    var animationConfig = {
      duration: 500,
      create: animationProps,
      update: animationProps
    }
    LayoutAnimation.configureNext(animationConfig);

    if (this.props.menuOpen) {
      this.setState({ menuTop: -FRAME.height });
    } else {
      this.setState({ menuTop: 32 });
    }
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => { this.itemPressed(item) }} >
        <Image source={item.image} style={styles.item} />
        <Text style={styles.fruitText}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container} >

        <NavBar leftButton={<Image source={require('../../assets/icons/bars.png')} style={styles.navButton} />}
          leftOnPress={this.openMenu.bind(this)}
          title={<Text style={{ color: 'black', fontSize: 20, fontFamily: 'roboto-bold' }}>Products</Text>}
        />

        <WebScreen url={'https://milnefruit.com/fruits-and-vegetables'} />

        <Animated.View style={{ position: 'absolute', left: 0, right: 0, top: this.state.menuTop, height: FRAME.height / 2, backgroundColor: 'white' }} >
          <Menu toggle={this.openMenu.bind(this)} dispatch={this.props.dispatch} navigate={this.props.navigation.navigate} closeParent={this.animate} />
        </Animated.View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  menuContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    left: 0, top: 0, bottom: 0, right: 0,
    height: Dimensions.get('window').height,
    zIndex: 10
  },
  scrollContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  fruitContainer: {
    flex: 1, flexDirection: 'column',
    justifyContent: 'center', alignItems: 'center'
  },
  fruitItem: {
    flexDirection: 'row',
    height: 80,
    justifyContent: 'center'
  },
  fruitText: {
    textAlign: 'center', fontFamily: 'roboto-bold',
    fontSize: 16, marginBottom: 16, marginTop: 4, color: Colors.MID_GREY
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  item: {
    backgroundColor: 'transparent',
    marginLeft: 24, marginRight: 24,
    height: Dimensions.get('window').width / 2 - 48,
    width: Dimensions.get('window').width / 2 - 48
  },
  navButton: {
    height: 24,
    width: 24,
    tintColor: 'black'
  },
  requestSampleButton: {
    height: 24, width: 24
  }
});

var mapStateToProps = state => {
  return {
    menuOpen: state.menu.isOpen,
    menuIndexOn: state.menu.indexOn,
    user: state.user
  }
}

export default connect(mapStateToProps)(ProductScreen);
