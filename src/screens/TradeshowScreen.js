import React, { Component } from 'react';
import {
  View, ScrollView, ListView, Text, Image, TouchableOpacity,
  StyleSheet, Modal, Alert, AsyncStorage, ActivityIndicator
} from 'react-native';

import { connect } from 'react-redux';

import { styleDate } from '../util/util';

import Prompt from 'react-native-prompt';
import NavBar from '../ui-elements/nav-bar';
import CreateTradeshowForm from './CreateTradeshowForm';
import TradeshowCard from '../ui-elements/tradeshow-card';

import * as Colors from '../theme/colors';
import * as MenuActions from '../redux/action-types/menu-action-types';
import * as API from '../api/api';


// TODO edit tradeshow
// TODO click tradeshow opens a link
// TODO fix passwords, one for requesting sample and one for creating tradeshow



class TradeshowScreen extends Component {

  constructor() {
    super();

    this.styleDate = styleDate.bind(this);

    this.state = {
      createModalPresented: false,
      promptOpen: false,
      isLoading: false,
      tradeshows: [
        { name: '', location: '', date: '', description: '' },
        { name: '', location: '', date: '', description: '' },
        { name: '', location: '', date: '', description: '' }
      ]
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
        });
        this.setState({ tradeshows: shows, isLoading: false });
      }
    })
  }

  openMenu() {
    this.props.dispatch({ type: MenuActions.OPEN_FROM_TRADESHOW });
  }

  async presentModal() {
    const pw = await AsyncStorage.getItem('TS_PASSWORD');

    if(pw != '1957') {
      this.setState({ promptOpen: true });
    } else {
      this.setState({ createModalPresented: true });
    }
  }

  enterPassword(text) {
    if(text === '1957') {
      AsyncStorage.setItem('TS_PASSWORD', text, () => {
        this.setState({ createModalPresented: true });
      })
    } else {
      Alert.alert('Incorrect Password');
    }
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
          <CreateTradeshowForm dismiss={() => this.setState({ createModalPresented: false })} />
        </Modal>

        <View style={{height:64, overflow:'hidden'}}></View>
        {(this.state.tradeshows.map(tradeshow => (
          <View style={styles.cardContainer} >
            <TradeshowCard tradeshow={tradeshow} />
          </View>
        )))}

      </ScrollView>
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
    marginLeft: 32, marginRight: 32, marginBottom: 32,
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
    width: 22
  }
})

var mapStateToProps = state => {
  return {

  }
}

export default connect(mapStateToProps)(TradeshowScreen);
