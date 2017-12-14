import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, ScrollView, ListView, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import NavBar from '../ui-elements/nav-bar.js';
import Menu from '../ui-elements/menu';
import Product from '../model/product.js';
import * as MenuActions from '../redux/action-types/menu-action-types';

import * as NavActions from '../redux/action-types/nav-action-types';
// import * as FRUITS from '../../assets/'

class ProductScreen extends Component {

  static navigationOptions = {
    header: null
  };

  initListData() {
    // let fruits = [require('../../assets/fruits/apple.png'), require('../../assets/fruits/apricot.png'), require('../../assets/fruits/blackberry.png'),
    //   require('../../assets/fruits/blueberry.png'), require('../../assets/fruits/cherry.png'), require('../../assets/fruits/cranberry.png'), require('../../assets/fruits/cucumber.png'),
    //   require('../../assets/fruits/currant.png'), require('../../assets/fruits/grape.png'), require('../../assets/fruits/kiwi.png'), require('../../assets/fruits/peach.png') , require('../../assets/fruits/plum.png'),
    //   require('../../assets/fruits/pomegranate.png'), require('../../assets/fruits/pumpkin.png'), require('../../assets/fruits/purple-cabbage.png'), require('../../assets/fruits/raspberry.png'),
    //   require('../../assets/fruits/red-beet.png'), require('../../assets/fruits/strawberry.png'), require('../../assets/fruits/watermelon.png')
    // ];
    let fruits = ['../../assets/fruits/apple.png', '../../assets/fruits/apricot.png', '../../assets/fruits/blackberry.png',
      '../../assets/fruits/blueberry.png', '../../assets/fruits/cherry.png', '../../assets/fruits/cranberry.png', '../../assets/fruits/cucumber.png',
      '../../assets/fruits/currant.png', '../../assets/fruits/grape.png', '../../assets/fruits/kiwi.png', '../../assets/fruits/peach.png' , '../../assets/fruits/plum.png',
      '../../assets/fruits/pomegranate.png', '../../assets/fruits/pumpkin.png', '../../assets/fruits/purple-cabbage.png', '../../assets/fruits/raspberry.png',
      '../../assets/fruits/red-beet.png', '../../assets/fruits/strawberry.png', '../../assets/fruits/watermelon.png'
     ];
    let products = [];

    for(let i = 0; i < fruits.length; i++) {
      var dummyData = new Product({name: 'fruit', description: 'yummy', image: fruits[i]});
      products.push(dummyData);
    }
    debugger;
    this.setState({ fruitImages: products });
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2});
    var data = products.map(fruit => fruit);
    debugger;
    this.setState({ dataSource: ds.cloneWithRows(data) });
    // this.setState({ fruitImages: fruits });
    // var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2});
    // var data = fruits.map(fruit => fruit);
    // this.setState({ dataSource: ds.cloneWithRows(data) });}
  }

  componentWillMount() {
    this.initListData();
<<<<<<< HEAD
    var apple = new Product({name:'Apple', description:'yummy'});
=======
    this.props.dispatch({ type: NavActions.START_CALC });
>>>>>>> master
  }



  openMenu() {
    this.props.dispatch({ type: MenuActions.OPEN_FROM_PRODUCT });
  }

  render() {

    const { height, width } = Dimensions.get('window');
    let bruh = 'sdfgsdfg';
    return(
      <View style={styles.container} >

        <NavBar leftButton={<Image source={'../../assets/icons/search.png')} style={styles.navButton}/>}
                rightButton={<Image source={require('../../assets/icons/bars.png')} style={styles.navButton}/>}
                leftOnPress={() => {this.openMenu()}}
                rightOnPress={this.openMenu.bind(this)}
                title={<Text style={{color:'black', fontSize: 20}}>Products</Text>}
        />

      {this.props.menuOpen ?
          <Menu dispatch={this.props.dispatch} />
            : null
          }

        <ListView dataSource={this.state.dataSource} renderRow={(rowData) => <TouchableOpacity onPress={() => {this.itemPressed(rowData)}}><Image source={require(rowData.image)} style={styles.item} /></TouchableOpacity>}  contentContainerStyle={styles.list}>

        </ListView>

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
