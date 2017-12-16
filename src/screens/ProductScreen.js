import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, ScrollView, ListView, Text, StyleSheet, Image, TouchableOpacity, Modal, Dimensions } from 'react-native';
import NavBar from '../ui-elements/nav-bar.js';
import Menu from '../ui-elements/menu';
import ProductDetailModal from './ProductDetailModal.js';
import { getAllJuices } from './../api/api';
import * as MenuActions from '../redux/action-types/menu-action-types';

import * as NavActions from '../redux/action-types/nav-action-types';
// import * as FRUITS from '../../assets/'

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
    }

  }

  loadJuices = () => {
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

  componentWillMount() {
    this.loadJuices();
    // this.props.dispatch({ type: NavActions.START_CALC });
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

        <ListView dataSource={this.state.dataSource} renderRow={(rowData) => <TouchableOpacity onPress={() => {this.itemPressed(rowData)}}><Image source={rowData.image} style={styles.item} /></TouchableOpacity>}  contentContainerStyle={styles.list}>

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
