import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Expo, Asset } from 'expo';
import { connect } from 'react-redux';
import {
  View, ScrollView, ListView,
  Text, StyleSheet, Image, TouchableOpacity,
  Modal, AsyncStorage, Dimensions
} from 'react-native';

import NavBar from '../ui-elements/nav-bar.js';
import Menu from '../ui-elements/menu';
import ProductDetailModal from './ProductDetailModal.js';

import { getAllJuices } from './../api/api';
import juices from '../../assets/charts/juice-list.json';


import * as Colors from '../theme/colors';
import * as MenuActions from '../redux/action-types/menu-action-types';
import * as NavActions from '../redux/action-types/nav-action-types';
import _ from 'lodash';
// import * as FRUITS from '../../assets/'

const JUICE_IMAGES = [
  require('../../assets/fruits/apple.png'),
  require('../../assets/fruits/apricot.png'),
  require('../../assets/fruits/blackberry.png')

]

// let blueberry = require('../../assets/fruits/blueberry.png');
// let cherry = require('../../assets/fruits/cherry.png');
// let cranberry = require('../../assets/fruits/cranberry.png');
// cucumber = require('../../assets/fruits/cucumber.png');
// currant = require('../../assets/fruits/currant.png');
// grape = require('../../assets/fruits/grape.png');
// kiwi = require('../../assets/fruits/kiwi.png');
// peach = require('../../assets/fruits/peach.png');
// 'plum': require('../../assets/fruits/plum.png');
// open juice specfication web page
class ProductScreen extends Component {

  static navigationOptions = {
    header: null
  };



  constructor(props) {
    super(props);
    this.getAllJuices = getAllJuices.bind(this);

    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      pressedProduct: null,
      productDetailModalPresented: false,
      fruits: [
        {'name': 'Acerola', 'brix': 6.0, 'image': require('../../assets/fruits/blackberry.png')},
        {'name': 'Apricot', 'brix': 11.7, 'image': require('../../assets/fruits/apricot.png')},
        {'name': 'Blueberry', 'brix': 10.0, 'image': require('../../assets/fruits/blueberry.png')},
        {'name': 'Cherry', 'brix': 20, 'image': require('../../assets/fruits/cherry.png')},
        {'name': 'Cranberry', 'brix': 7.4,'image': require('../../assets/fruits/cranberry.png')},
        {'name': 'Cucumber', 'brix': 3.0, 'image': require('../../assets/fruits/cucumber.png')},
        {'name': 'Currant', 'brix': 11.0, 'image': require('../../assets/fruits/currant.png')},
        {'name': 'Grape', 'brix': 16.0, 'image': require('../../assets/fruits/grape.png')},
        {'name': 'Kiwi', 'brix': 15.4, 'image': require('../../assets/fruits/kiwi.png')},
        {'name': 'Peach', 'brix': 10.5, 'image': require('../../assets/fruits/peach.png')},
        {'name': 'Plum', 'brix': 14.3, 'image': require('../../assets/fruits/plum.png')},
        {'name': 'Pomegranate', 'brix': 16.0, 'image': require('../../assets/fruits/pomegranate.png')},
        {'name': 'Pumpkin', 'brix': 8.0, 'image': require('../../assets/fruits/pumpkin.png')},
        {'name': 'Purple Cabbage', 'brix': 3.0, 'image': require('../../assets/fruits/purple-cabbage.png')},
        {'name': 'Raspberry (Red)', 'brix': 9.2, 'image': require('../../assets/fruits/raspberry.png')},
        {'name': 'Beet (Red)', 'brix': 8.0, 'image': require('../../assets/fruits/red-beet.png')},
        {'name': 'Strawberry', 'brix': 8.0, 'image': require('../../assets/fruits/strawberry.png')},
        {'name': 'Watermelon', 'brix': 7.8, 'image': require('../../assets/fruits/watermelon.png')}
      ]
    }
  }

  componentWillMount() {
    // this.props.dispatch({ type: NavActions.START_CALC });
    // for(let i = 0; i < this.state.fruits.length; i++) {
    //   this.state.fruits[i].description = 'Lorem ipsum dolor sit amet, homero animal et eos, at mel sumo phaedrum. Ad eos viderer labitur euismod, eros cetero te usu, mea debitis tibique sapientem ea. Sea ne velit dictas invidunt. Et sumo inciderint neglegentur eum. Eos dicat albucius dignissim cu.';
    //
    // }
  }

  componentDidMount() {
    this.loadJuices();
  }

  loadJuices = () => {
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2});

    this.setState({ dataSource: ds.cloneWithRows(this.state.fruits) });
  }

  setJuiceImage = (juice, callback) => {

  }

  openMenu() {
    this.props.dispatch({ type: MenuActions.OPEN_FROM_PRODUCT });
  }

  itemPressed(rowData){
    this.setState({ pressedProduct: rowData});
    this.setState({ productDetailModalPresented: true });
  }

  dismissModal = () =>{
    this.setState({ productDetailModalPresented: false });
  }

  _navigateSampleRequest() {
    this.props.dispatch({ type: NavActions.REQUEST_SAMPLE });
  }

  render() {

    const { height, width } = Dimensions.get('window');
    let bruh = 'sdfgsdfg';
    return(
      <View style={styles.container} >

        <NavBar leftButton={<Image source={require('../../assets/icons/bars.png')} style={styles.navButton}/>}
                rightButton={<Image source={require('../../assets/icons/plus.png')} style={styles.navButton}/>}
                leftOnPress={this.openMenu.bind(this)}
                rightOnPress={() => this._navigateSampleRequest()}
                title={<Text style={{color:'black', fontSize: 20, fontFamily: 'roboto-regular'}}>Products</Text>}
        />

        {this.props.menuOpen
          ? <Menu dispatch={this.props.dispatch} />
          : null
        }

        <ListView
          dataSource={this.state.dataSource}
          contentContainerStyle={styles.list}
          renderRow={(rowData) =>
            <TouchableOpacity onPress={() => {this.itemPressed(rowData)}}>
              <Image source={rowData.image} style={styles.item} />
            </TouchableOpacity>}
        >

        </ListView>

        <Modal animationType={'slide'} transparent={false} visible={this.state.productDetailModalPresented} styles={{marginTop: 0}}>
          <ProductDetailModal product={this.state.pressedProduct} dismissModal={this.dismissModal}/>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection:'column',
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
  fruitItem: {
    flexDirection: 'row',
    height: 80,
    justifyContent: 'center'
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap'
    },
  item: {
    backgroundColor: 'transparent',
    margin: 24,
    height: Dimensions.get('window').width / 2 - 48,
    width: Dimensions.get('window').width / 2 - 48
  },
  navButton: {
    height: 22,
    width: 22,
    tintColor: 'black'
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
