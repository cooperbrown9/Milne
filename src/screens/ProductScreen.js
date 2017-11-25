import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, ScrollView, ListView, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import NavBar from '../ui-elements/nav-bar.js';
import Menu from '../ui-elements/menu';
import * as MenuActions from '../redux/action-types/menu-action-types';

class ProductScreen extends Component {

  static navigationOptions = {
    header: null
  };

  initListData() {
    let fruits = [require('../../assets/fruits/apple.png'), require('../../assets/fruits/apricot.png'), require('../../assets/fruits/blackberry.png'),
      require('../../assets/fruits/blueberry.png'), require('../../assets/fruits/cherry.png'), require('../../assets/fruits/cranberry.png'), require('../../assets/fruits/cucumber.png'),
      require('../../assets/fruits/currant.png'), require('../../assets/fruits/grape.png'), require('../../assets/fruits/kiwi.png'), require('../../assets/fruits/peach.png') , require('../../assets/fruits/plum.png'),
      require('../../assets/fruits/pomegranate.png'), require('../../assets/fruits/pumpkin.png'), require('../../assets/fruits/purple-cabbage.png'), require('../../assets/fruits/raspberry.png'),
      require('../../assets/fruits/red-beet.png'), require('../../assets/fruits/strawberry.png'), require('../../assets/fruits/watermelon.png')
    ];
    this.setState({ fruitImages: fruits });
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2});
    var data = fruits.map(fruit => fruit);
    this.setState({ dataSource: ds.cloneWithRows(data) });
  }

  componentWillMount() {
    this.initListData();
  }

  openMenu(){
    this.props.dispatch({ type: MenuActions.OPEN_FROM_PRODUCT });
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
          <Menu />
            : null
          }

        <ListView dataSource={this.state.dataSource} renderRow={(rowData) => <TouchableOpacity onPress={() => {this.itemPressed(rowData)}}><Image source={rowData} style={styles.item} /></TouchableOpacity>}  contentContainerStyle={styles.list}>

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
    user: state.user
  }
}

export default connect(mapStateToProps)(ProductScreen);
