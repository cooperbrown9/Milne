import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import * as Colors from '../theme/colors';
import * as MenuActions from '../redux/action-types/menu-action-types';
import * as NavActions from '../redux/action-types/nav-action-types';
import * as SCREEN_INDEX from '../constants/screen-index';

const Menu = (props) => (
  <View style={styles.menuContainer} >

    <View style={styles.container} >

        <TouchableOpacity onPress={() => { Menu.closeMenu(props) }} style={styles.close} >
          <Image style={styles.closeImage} source={require('../../assets/icons/bars.png')} />
        </TouchableOpacity>

        <View style={styles.buttonContainer} >

          <TouchableOpacity onPress={() => { Menu.navigateProduct(props) }} >
            <Text style={(props.indexOn === 0) ? styles.buttonOn : styles.buttonOff}>Products</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {  Menu.navigateCalc(props) }} >
            <Text style={(props.indexOn === 1) ? styles.buttonOn : styles.buttonOff}>Calculator</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { Menu.navigateTradeshow(props) }} >
            <Text style={(props.indexOn === 2) ? styles.buttonOn : styles.buttonOff}>Tradeshows</Text>
          </TouchableOpacity>
        </View>
    </View>
    <View style={{flex: 1, backgroundColor: 'transparent'}} />
  </View>
);

Menu.closeMenu = (props) => {
  props.dispatch({ type: MenuActions.CLOSE });
}

Menu.navigateProduct = function(props) {
  Menu.closeMenu(props);
  if(props.indexOn !== SCREEN_INDEX.PRODUCT_INDEX) {
    props.dispatch({ type: NavActions.PRODUCT });
  }
}

Menu.navigateCalc = (props) => {
  Menu.closeMenu(props);
  if(props.indexOn !== SCREEN_INDEX.CALC_INDEX) {
    props.dispatch({ type: NavActions.START_CALC });
  }
}

Menu.navigateTradeshow = function(props) {
  Menu.closeMenu(props);
  if(props.indexOn !== SCREEN_INDEX.TRADESHOW_INDEX) {
    props.dispatch({ type: NavActions.TRADESHOW });
  }
}

Menu.propTypes = {
  indexOn: PropTypes.number,
  isOpen: PropTypes.bool,
  dispatch: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: 'white',
    zIndex: 3
  },
  menuContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    left: 0, top: 0, bottom: 0, right: 0,
    height: Dimensions.get('window').height,
    zIndex: 10
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    marginTop: 64,
    marginLeft: 32,
    marginRight: 48
  },
  buttonOn: {
    color: Colors.PURPLE,
    paddingTop: 32,
    fontSize: 32,
    fontWeight: 'bold'
  },
  buttonOff: {
    color: 'grey',
    paddingTop: 40,
    fontSize: 32,
    fontWeight: 'bold'
  },
  close: {
    position: 'absolute',
    right: 40, top: 32
  },
  closeImage: {
    height: 32,
    width: 32,
    tintColor: 'black',
    zIndex: 10
  }
});

var mapStateToProps = state => {
  console.log(state);
  return {
    indexOn: state.menu.indexOn,
    isOpen: state.menu.isOpen
  }
}

export default connect(mapStateToProps)(Menu);
