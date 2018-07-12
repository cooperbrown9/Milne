import React, { Component } from 'react';
import {
  View, ScrollView, ListView, Text, Image, TouchableOpacity, Animated, Dimensions,
  StyleSheet, Modal, Alert, AsyncStorage, ActivityIndicator, LayoutAnimation, Linking
} from 'react-native';


import { connect } from 'react-redux';

import { styleDate } from '../util/util';

import Prompt from 'react-native-prompt';
import NavBar from '../ui-elements/nav-bar';
import CreateTradeshowForm from './CreateTradeshowForm';
import TradeshowCard from '../ui-elements/tradeshow-card';
import WebScreen from './WebScreen';

import * as Colors from '../theme/colors';
import * as MenuActions from '../redux/action-types/menu-action-types';
import * as API from '../api/api';
import Menu from '../ui-elements/menu';


// TODO edit tradeshow
// TODO fix passwords, one for requesting sample and one for creating tradeshow

// TODO click tradeshow opens a link
// TODO tradeshow -- start and end date
// TODO location -- zipcode, lookup city and state

const FRAME = Dimensions.get('window');
const PASSWORD = 'M1ln3';

class TradeshowScreen extends Component {

  constructor() {
    super();

    this.styleDate = styleDate.bind(this);

    this.state = {
      createModalPresented: false,
      promptOpen: false,
      isLoading: false,
      webOpen: false,
      url: '',
      tradeshows: [
        { name: '', location: '', date: '', description: '' },
      ],
      menuTop: -FRAME.height
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true }, () => {
      this.getTradeshows();
    });
  }

  getTradeshows() {
    API.getTradeshows((err, shows) => {
      if(err) {
        console.log(err);
        this.setState({ isLoading: false });
        Alert.alert(err.message);
      } else {
        shows.forEach((show) => {
          this.styleDate(show.date, (date) => {
            show.cleanDate = date;
          });
          this.styleDate(show.delete_date, (date) => {
            show.cleanEndDate = date;
          })
        });
        this.setState({ tradeshows: shows, isLoading: false });
      }
    })
  }

  openMenu() {
    this.animate();
    if(this.props.menuOpen) {
      this.props.dispatch({ type: MenuActions.CLOSE });
    } else {
      this.props.dispatch({ type: MenuActions.OPEN_FROM_TRADESHOW });
    }
  }

  async presentModal() {
    const pw = await AsyncStorage.getItem('TS_PASSWORD');

    if(pw != PASSWORD) {
      this.setState({ promptOpen: true });
    } else {
      this.setState({ createModalPresented: true });
    }
  }

  getAddy() {
    // //https://maps.googleapis.com/maps/api/js/GeocodeService.Search?4s1008%20E%20Windemere%20Ct&7sUS&9sen-US&callback=_xdc_._go01am&key=AIzaSyALrSTy6NpqdhIOUs3IQMfvjh71td2suzY&token=64979
    // let url = 'https://maps.googleapis.com/maps/api/js/GeocodeService.Search?4s1008%20E%20Windemere%20Ct&7sUS&9sen-US&callback=_xdc_._go01am&key=AIzaSyALrSTy6NpqdhIOUs3IQMfvjh71td2suzY&token=64979';
    // let creds = '&7sUS&9sen-US&callback=_xdc_._go01am&key=AIzaSyALrSTy6NpqdhIOUs3IQMfvjh71td2suzY&token=64979';
    // url = url + encodeURI(this.state.address)
  }

  enterPassword(text) {
    if(text === PASSWORD) {
      AsyncStorage.setItem('TS_PASSWORD', text, () => {
        this.setState({ createModalPresented: true, promptOpen: false });
      })
    } else {
      this.setState({ promptOpen: false }, () => {
        setTimeout(() => {
          Alert.alert('Incorrect Password');
        }, 1000);
      })
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
      this.setState({ menuTop: -FRAME.height });
    } else {
      this.setState({ menuTop: 32 });
    }
  }

  _tradeshowSelected(show) {
    let addyChunks = show.location.split(' ');
    let addyString = '';
    addyChunks.forEach((c) => {
      addyString += c + '+';
    });
    addyString = addyString.substr(0, addyString.length - 1);
    Linking.openURL('https://www.google.com/maps/search/?api=1&query=' + addyString);
  }

  _headerSelected(show) {
    this.setState({ url: show.website, webOpen: true });
  }

  _dismissCreateForm = () => {
    this.setState({ createModalPresented: false }, () => {
      this.getTradeshows();
    });
  }

  render() {
    return(
      <View style={styles.container} >
        <NavBar leftButton={<Image source={require('../../assets/icons/bars.png')} style={styles.navButton}/>}
          rightButton={<Image source={require('../../assets/icons/add.png')} style={styles.navButton}/>}
          leftOnPress={this.openMenu.bind(this)}
          rightOnPress={() => this.presentModal()}
          title={<Text style={{color:'black', fontSize: 20, fontFamily: 'roboto-bold'}}>Tradeshows</Text>}
          />

        <ScrollView style={styles.container} >

        <Modal animationType={'slide'} transparent={false} visible={this.state.createModalPresented} >
          <CreateTradeshowForm dismiss={() => this._dismissCreateForm()} />
        </Modal>

        <Modal animationType={'slide'} transparent={false} visible={this.state.webOpen} >
          <WebScreen dismiss={() => this.setState({ webOpen: false })} url={this.state.url} />
        </Modal>

        <View style={{height:64, overflow:'hidden'}}></View>
        {(this.state.tradeshows.map(tradeshow => (
          <View style={styles.cardContainer} >
            <TradeshowCard tradeshow={tradeshow} onPressCard={(ts) => this._tradeshowSelected(ts)} onPressHeader={(ts) => this._headerSelected(ts)} />
          </View>
        )))}

      </ScrollView>

      <Animated.View style={{position:'absolute', left:0,right:0,top:this.state.menuTop,height:FRAME.height/2,backgroundColor:'white'}} >
        <Menu toggle={this.openMenu.bind(this)} dispatch={this.props.dispatch} />
      </Animated.View>

      <Prompt
        title="Enter Password"
        defaultValue=""
        placeholder="Add a Tradeshow"
        visible={this.state.promptOpen}
        onCancel={() => this.setState({ promptOpen: false })}
        onSubmit={(value) => this.setState({promptOpen: false},() => this.enterPassword(value))}
      />

    {(this.state.isLoading)
      ? <View style={styles.loadContainer}><ActivityIndicator color={'white'} size={'large'}/></View>
      : null
    }

    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.MID_GREY
  },
  cardContainer: {
    height: 200,
    marginLeft: 16, marginRight: 16, marginBottom: 32,
    backgroundColor: 'white', overflow: 'hidden',
    borderRadius: 8
  },
  loadContainer: {
    position: 'absolute',
    left:0,right:0,top:0,bottom:0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center', alignItems: 'center'
  },
  navButton: {
    height: 22,
    width: 22,
    tintColor: 'black'
  }
})

var mapStateToProps = state => {
  return {
    menuOpen: state.menu.isOpen
  }
}

export default connect(mapStateToProps)(TradeshowScreen);
