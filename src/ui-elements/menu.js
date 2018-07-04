import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Animated, Easing, LayoutAnimation, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';

import * as Colors from '../theme/colors';
import * as MenuActions from '../redux/action-types/menu-action-types';
import * as NavActions from '../redux/action-types/nav-action-types';
import * as SCREEN_INDEX from '../constants/screen-index';

const Menu = (props) => (
  <Animated.View style={styles.menuContainer} >
    <View style={{flex: 1}} >

    <View style={styles.container} >


        <View style={styles.buttonContainer} >

          <TouchableOpacity onPress={() => { Menu.navigateCalc(props) }} >
            <Text style={(props.indexOn === 0) ? styles.buttonOn : styles.buttonOff}>Calculator</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {  Menu.navigateProduct(props) }} >
            <Text style={(props.indexOn === 1) ? styles.buttonOn : styles.buttonOff}>Products</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { Menu.navigateTradeshow(props) }} >
            <Text style={(props.indexOn === 2) ? styles.buttonOn : styles.buttonOff}>Tradeshows</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { Menu.navigateContact(props) }} >
            <Text style={(props.indexOn === 4) ? styles.buttonOn : styles.buttonOff}>Contact</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => { Menu.navigateVideo(props) }} style={styles.videoContainer} >
          <Text style={(props.indexOn === 5) ? [styles.videoText, {color:Colors.PURPLE}] : styles.videoText} >Video</Text>
        </TouchableOpacity>

        {/*
        <TouchableOpacity onPress={() => { Menu.closeMenu(props) }} style={styles.close} >
          <Image style={styles.closeImage} source={require('../../assets/icons/bars.png')} />
        </TouchableOpacity>
        */}
    </View>
    <TouchableOpacity onPress={() => props.toggle()} style={{flex: 1, backgroundColor: 'transparent'}} />
    </View>
  </Animated.View>
);

Menu.closeMenu = (props) => {
  props.dispatch({ type: MenuActions.CLOSE });
}

Menu.navigateProduct = function(props) {
  Menu.closeMenu(props);
  if(props.indexOn !== SCREEN_INDEX.PRODUCT_INDEX) {
    props.dispatch({ type: NavActions.PRODUCT });
    props.dispatch({ type: MenuActions.CLOSE });
  }
}

Menu.navigateCalc = (props) => {
  Menu.closeMenu(props);
  if(props.indexOn !== SCREEN_INDEX.CALC_INDEX) {
    props.dispatch({ type: NavActions.MAIN_CALC });
    props.dispatch({ type: MenuActions.CLOSE });
  }
}

Menu.navigateTradeshow = function(props) {
  Menu.closeMenu(props);
  if(props.indexOn !== SCREEN_INDEX.TRADESHOW_INDEX) {
    props.dispatch({ type: NavActions.TRADESHOW });
    props.dispatch({ type: MenuActions.CLOSE });
  }
}


Menu.navigateContact = function(props) {
  Menu.closeMenu(props);
  if(props.indexOn !== SCREEN_INDEX.CONTACT_INDEX) {
    props.dispatch({ type: NavActions.CONTACT });
    props.dispatch({ type: MenuActions.CLOSE });
  }
}

Menu.navigateVideo = function(props) {
  Menu.closeMenu(props);
  if(props.indexOn !== SCREEN_INDEX.VIDEO_INDEX) {
    props.dispatch({ type: NavActions.VIDEO });
    props.dispatch({ type: MenuActions.CLOSE });
  }
}

Menu.propTypes = {
  indexOn: PropTypes.number,
  isOpen: PropTypes.bool,
  dispatch: PropTypes.func,
  toggle: PropTypes.func
}

const FRAME = Dimensions.get('window');
Menu.defaultProps = {
  bounceY: new Animated.Value(100),
  startX: 0,
  endX: FRAME.height * 0.75
}


const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: 'white',
    zIndex: 3
  },
  videoContainer: {
    position: 'absolute',
    left: 32, bottom: 32, right: 32,
    height: 32
  },
  videoText: {
    fontSize: 28,
    fontFamily: 'roboto-bold',
    color: Colors.MID_GREY
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
    marginTop: 32,
    marginLeft: 32,
    marginRight: 48
  },
  buttonOn: {
    color: Colors.PURPLE,
    paddingTop: 32,
    fontSize: 40,
    fontWeight: 'bold', fontFamily: 'roboto-bold'
  },
  buttonOff: {
    color: 'grey',
    paddingTop: 40,
    fontSize: 40,
    fontWeight: 'bold', fontFamily: 'roboto-bold'
  },
  close: {
    position: 'absolute',
    right: 32, top: 48
  },
  closeImage: {
    height: 32,
    width: 32,
    tintColor: 'black',
    zIndex: 100001
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
