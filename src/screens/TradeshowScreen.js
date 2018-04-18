import React, { Component } from 'react';
import { View, ScrollView, ListView, Text, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { connect } from 'react-redux';

import NavBar from '../ui-elements/nav-bar';
import CreateTradeshowForm from './CreateTradeshowForm';
import TradeshowCard from '../ui-elements/tradeshow-card';

import * as Colors from '../theme/colors';
import * as MenuActions from '../redux/action-types/menu-action-types';

class TradeshowScreen extends Component {

  constructor() {
    super();

    this.state = {
      createModalPresented: false,
      tradeshows: [
        { title: 'Dope Conference', location: 'Mississippi', date: 'January 1, 2017', description: 'Its dummy lit bro' },
        { title: 'Dope Conference', location: 'Mississippi', date: 'January 1, 2017', description: 'Its dummy lit bro' },
        { title: 'Dope Conference', location: 'Mississippi', date: 'January 1, 2017', description: 'Its dummy lit bro' }
      ]
    }
  }

  openMenu() {
    this.props.dispatch({ type: MenuActions.OPEN_FROM_TRADESHOW });
  }

  render() {
    return(
      <View style={styles.container} >
        <ScrollView style={styles.container} >
          <NavBar leftButton={<Image source={require('../../assets/icons/bars.png')} style={styles.navButton}/>}
                  rightButton={<Image source={require('../../assets/icons/plus.png')} style={styles.navButton}/>}
                  leftOnPress={this.openMenu.bind(this)}
                  rightOnPress={() => this.setState({ createModalPresented: true })}
                  title={<Text style={{color:'black', fontSize: 20, fontFamily: 'roboto-regular'}}>Tradeshows</Text>}
          />

        <Modal animationType={'slide'} transparent={false} visible={this.state.createModalPresented} >
          <CreateTradeshowForm dismiss={() => this.setState({ createModalPresented: false })} />
        </Modal>

        <View style={{height:64}}></View>
        {(this.state.tradeshows.map(tradeshow => (
          <View style={styles.cardContainer} >
            <TradeshowCard tradeshow={tradeshow} />
          </View>
        )))}

      </ScrollView>
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
    marginLeft: 32, marginRight: 32, marginBottom: 32
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
