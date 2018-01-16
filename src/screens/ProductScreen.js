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
        {name: 'Apple', image: require('../../assets/fruits/apple.png')},
        {name: 'Apricot', image: require('../../assets/fruits/apricot.png')}
      ]
    }

  }

  componentWillMount() {


    // this.props.dispatch({ type: NavActions.START_CALC });



    // this.props.dispatch({ type: NavActions.START_CALC });
  }

  componentDidMount() {
    this.loadJuices();
  }

  loadJuices = async() => {
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2});

    // console.log(apple);

    // let j = JUICE_IMAGES['apple'];
    // debugger;

    for(let i = 0; i < juices.length; i++) {
      debugger;
      let name = juices[i].name;
      juices[i].image = this.state.fruits[_.findIndex(this.state.fruits, [ 'name': name ])].image || require('../../assets/fruits/apple.png');
      debugger;
      juices[i].description = 'Bruuuuh its lit its lit its lit';
    }

    this.setState({ dataSource: ds.cloneWithRows(juices) });
  }

  setJuiceImage = (juice, callback) => {

  }

  dep_loadJuices = () => {
    this.getAllJuices((success, data) => {
      if(success) {
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2});

        for(let i = 0; i < data.data.length; i++){
          data.data[i].image = require('../../assets/fruits/apple.png');
          data.data[i].description = 'Cheif keef aint bout this Cheif Keef aint bout that';
        }

        var mappedData = data.data.map(fruit => fruit);
        this.setState({ dataSource: ds.cloneWithRows(mappedData) });

      } else {
        console.log('COULDNT GET JUICES', data);
      }
    });
  }


  openMenu() {
    this.props.dispatch({ type: MenuActions.OPEN_FROM_PRODUCT });
  }

  itemPressed(rowData){
    this.setState({ pressedProduct: rowData});
    this.setState({productDetailModalPresented: true});
  }

  dismissModal = () =>{
    this.setState({productDetailModalPresented: false});
  }

  render() {

    const { height, width } = Dimensions.get('window');
    let bruh = 'sdfgsdfg';
    return(
      <View style={styles.container} >

        <NavBar leftButton={<Image source={require('../../assets/icons/search.png')} style={styles.navButton}/>}
                rightButton={<Image source={require('../../assets/icons/bars.png')} style={styles.navButton}/>}
                leftOnPress={() => {this.openMenu()}}
                rightOnPress={this.openMenu.bind(this)}
                title={<Text style={{color:'black', fontSize: 20}}>Products</Text>}
        />

      {this.props.menuOpen ?
          <Menu dispatch={this.props.dispatch} />
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
    backgroundColor:'transparent',
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
