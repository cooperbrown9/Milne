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

import Prompt from 'react-native-prompt';
import * as Colors from '../theme/colors';
import * as MenuActions from '../redux/action-types/menu-action-types';
import * as NavActions from '../redux/action-types/nav-action-types';
import _ from 'lodash';
// import * as FRUITS from '../../assets/'

const JUICE_IMAGES = [
  require('../../assets/fruits/apple.png'),
  require('../../assets/fruits/apricot.png'),
  require('../../assets/fruits/blackberry.png'),

]


// open juice specfication web page
class ProductScreen extends Component {

  static navigationOptions = {
    header: null
  };



  constructor(props) {
    super(props);
    this.getAllJuices = getAllJuices.bind(this);
    // figure out regex expression to
    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      pressedProduct: null,
      productDetailModalPresented: false,
      promptOpen: false,
      fruits: [
        {'name': 'Acerola', 'brix': 6.0, 'image': require('../../assets/fruits/blackberry.png'), description: ''},
        {'name': 'Apricot', 'brix': 11.7, 'image': require('../../assets/fruits/apricot.png'), description: ''},
        {'name': 'Blueberry', 'brix': 10.0, 'image': require('../../assets/fruits/blueberry.png'), description: ''},
        {'name': 'Cherry', 'brix': 20, 'image': require('../../assets/fruits/cherry.png'), description: ''},
        {'name': 'Cranberry', 'brix': 7.4,'image': require('../../assets/fruits/cranberry.png'), description: ''},
        {'name': 'Cucumber', 'brix': 3.0, 'image': require('../../assets/fruits/cucumber.png'), description: ''},
        {'name': 'Currant', 'brix': 11.0, 'image': require('../../assets/fruits/currant.png'), description: ''},
        {'name': 'Grape', 'brix': 16.0, 'image': require('../../assets/fruits/grape.png'), description: ''},
        {'name': 'Kiwi', 'brix': 15.4, 'image': require('../../assets/fruits/kiwi.png'), description: ''},
        {'name': 'Peach', 'brix': 10.5, 'image': require('../../assets/fruits/peach.png'), description: ''},
        {'name': 'Plum', 'brix': 14.3, 'image': require('../../assets/fruits/plum.png'), description: ''},
        {'name': 'Pomegranate', 'brix': 16.0, 'image': require('../../assets/fruits/pomegranate.png'), description: ''},
        {'name': 'Pumpkin', 'brix': 8.0, 'image': require('../../assets/fruits/pumpkin.png'), description: ''},
        {'name': 'Purple Cabbage', 'brix': 3.0, 'image': require('../../assets/fruits/purple-cabbage.png'), description: ''},
        {'name': 'Raspberry (Red)', 'brix': 9.2, 'image': require('../../assets/fruits/raspberry.png'), description: ''},
        {'name': 'Beet (Red)', 'brix': 8.0, 'image': require('../../assets/fruits/red-beet.png'), description: ''},
        {'name': 'Strawberry', 'brix': 8.0, 'image': require('../../assets/fruits/strawberry.png'), description: ''},
        {'name': 'Watermelon', 'brix': 7.8, 'image': require('../../assets/fruits/watermelon.png'), description: ''}
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

  async navigateSampleRequest() {
    const pw = await AsyncStorage.getItem('PASSWORD');

    if(pw != '1957') {
      this.setState({ promptOpen: true });
    } else {
      this.props.dispatch({ type: NavActions.REQUEST_SAMPLE });
    }
  }

  enterPassword(text) {
    if(text === '1957') {
      AsyncStorage.setItem('PASSWORD', text, () => {
        this.props.dispatch({ type: NavActions.REQUEST_SAMPLE });
      })
    } else {
      Alert.alert('Incorrect Password');
    }
  }

  render() {

    const { height, width } = Dimensions.get('window');
    return(
      <View style={styles.container} >

        <NavBar leftButton={<Image source={require('../../assets/icons/bars.png')} style={styles.navButton}/>}
                rightButton={<Image source={require('../../assets/icons/add.png')} style={styles.requestSampleButton}/>}
                leftOnPress={this.openMenu.bind(this)}
                rightOnPress={() => this.navigateSampleRequest()}
                title={<Text style={{color:'black', fontSize: 20, fontFamily: 'roboto-bold'}}>Products</Text>}
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

        <Prompt
          title="Hello!"
          defaultValue=""
          placeholder="Enter the password to request a sample"
          visible={this.state.promptOpen}
          onCancel={() => this.setState({ promptOpen: false })}
          onSubmit={(value) => this.setState({promptOpen: false},() => this.enterPassword(value))}
        />


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
