import React, { Component } from 'react';
import { View, ScrollView, ListView, Text, Image, TouchableOpacity, StyleSheet, Modal, Alert, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import Prompt from 'react-native-prompt';
import NavBar from '../ui-elements/nav-bar';
import CreateTradeshowForm from './CreateTradeshowForm';
import TradeshowCard from '../ui-elements/tradeshow-card';

import * as Colors from '../theme/colors';
import * as MenuActions from '../redux/action-types/menu-action-types';
import * as API from '../api/api';

class TradeshowScreen extends Component {

  constructor() {
    super();

    this.state = {
      createModalPresented: false,
      promptOpen: false,
      tradeshows: [
        { name: 'Dope Conference', location: 'Mississippi', date: 'January 1, 2017', description: 'Its dummy lit bro' },
        { name: 'Dope Conference', location: 'Mississippi', date: 'January 1, 2017', description: 'Its dummy lit bro' },
        { name: 'Dope Conference', location: 'Mississippi', date: 'January 1, 2017', description: 'Its dummy lit bro' }
      ]
    }
  }

  componentDidMount() {
    this.getTradeshows();
  }

  getTradeshows() {
    API.getTradeshows((err, shows) => {
      if(err) {
        console.log(err);
        Alert.alert(err.message);
      } else {
        this.setState({ tradeshows: shows });
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
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.LIGHT_GREY
  },
  cardContainer: {
    height: 160,
    marginLeft: 32, marginRight: 32, marginBottom: 32,
    backgroundColor: 'white', overflow: 'hidden'
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
