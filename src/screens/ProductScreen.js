import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Expo, Asset } from 'expo';
import { connect } from 'react-redux';
import {
  View, ScrollView, ListView,
  Text, StyleSheet, Image, TouchableOpacity,
  Modal, AsyncStorage, Dimensions, WebView, Animated, LayoutAnimation,
} from 'react-native';

import NavBar from '../ui-elements/nav-bar.js';
import Menu from '../ui-elements/menu';
import ProductDetailModal from './ProductDetailModal.js';

import { getAllJuices } from './../api/api';
import juices from '../../assets/charts/juice-list.json';
import { JUICES } from '../util/initial-data';

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

// TODO put fruit name under the fruit on each item

// open juice specfication web page
const FRAME = Dimensions.get('window');
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
      fruits: JUICES,
      webOpen: false,
      url: '',
      cover: 0,
      menuTop: -FRAME.height
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
    this.animate();
    if(this.props.menuOpen) {
      this.props.dispatch({ type: MenuActions.CLOSE });
    } else {
      this.props.dispatch({ type: MenuActions.OPEN_FROM_PRODUCT });
    }
  }

  itemPressed(rowData){
    this.setState({ pressedProduct: rowData}, () => {
      this.props.dispatch({ type: NavActions.PRODUCT_DETAIL, product: rowData });
    });
    // this.setState({ productDetailModalPresented: true });
  }

  dismissModal = () =>{
    this.setState({ productDetailModalPresented: false });
  }

  async navigateSampleRequest() {
    const pw = await AsyncStorage.getItem('PASSWORD');

    if(pw != '1956') {
      this.setState({ promptOpen: true });
    } else {
      this.props.dispatch({ type: NavActions.REQUEST_SAMPLE });
    }
  }

  enterPassword(text) {
    if(text === '1956') {
      AsyncStorage.setItem('PASSWORD', text, () => {
        this.props.dispatch({ type: NavActions.REQUEST_SAMPLE });
      })
    } else {
      Alert.alert('Incorrect Password');
    }
  }

  animate() {
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

    if(this.props.menuOpen) {
      this.setState({ cover: 0, menuTop: -FRAME.height });
    } else {
      this.setState({ cover: 0.4, menuTop: 32 });
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

      {/*this.props.menuOpen
          ? <Menu dispatch={this.props.dispatch} />
          : null
        */}

        <ListView
          dataSource={this.state.dataSource}
          contentContainerStyle={styles.list}
          renderRow={(rowData) =>
            <TouchableOpacity onPress={() => {this.itemPressed(rowData)}} >
              <Image source={rowData.image} style={styles.item} />
              <Text style={styles.fruitText}>{rowData.name}</Text>
            </TouchableOpacity>}
        >

        </ListView>

        <Prompt
          title="Hello!"
          defaultValue=""
          placeholder="Enter the password to request a sample"
          visible={this.state.promptOpen}
          onCancel={() => this.setState({ promptOpen: false })}
          onSubmit={(value) => this.setState({promptOpen: false},() => this.enterPassword(value))}
        />

        <Animated.View style={{position:'absolute', left:0,right:0,top:this.state.menuTop,height:FRAME.height/2,backgroundColor:'white'}} >
          <Menu toggle={this.openMenu.bind(this)} dispatch={this.props.dispatch} />
        </Animated.View>

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
  fruitContainer: {
    flex: 1, flexDirection: 'column',
    justifyContent:'center', alignItems:'center'
  },
  fruitItem: {
    flexDirection: 'row',
    height: 80,
    justifyContent: 'center'
  },
  fruitText: {
    textAlign: 'center', fontFamily:'roboto-bold',
    fontSize:16, marginBottom: 16,marginTop: 4,color: Colors.MID_GREY
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap'
    },
  item: {
    backgroundColor: 'transparent',
    // margin: 24,
    marginLeft:24,marginRight:24,
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
