import React from 'react';
import { PropTypes } from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import * as Colors from '../style/colors.js'

const NavBar = (props) => (
  <View style={styles.navBar} backgroundColor={'#55BBDD'}>

    <View style={styles.navBarButtonContainer}>
      <TouchableOpacity style={styles.leftButton} onPress={props.leftOnPress}>
        {props.leftButton}
      </TouchableOpacity>
    </View>

    <View style={styles.navBarTitleContainer}>
      <View style={styles.title}>{props.title}</View>
    </View>

    <View style={styles.navBarButtonContainer}>
      <TouchableOpacity style={styles.rightButton} onPress={props.rightOnPress}>
        {props.rightButton}
      </TouchableOpacity>
    </View>

  </View>
);


NavBar.propTypes = {
  title: React.PropTypes.element,
  leftOnPress: React.PropTypes.func,
  leftButton: React.PropTypes.element,
  rightOnPress: React.PropTypes.func,
  rightButton: React.PropTypes.element,

};

NavBar.defaultProps = {
  leftButton: <View/>,
  rightButton: <View/>,
};

const styles = StyleSheet.create({
  navBar: {
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 4
  },
  leftButton: {
    height: 40,
    width: 64,
    marginTop: 12,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',

  },

  defaultButton: {
    height: 16,
    width: 16,
  },
  navBarTitleContainer: {
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightButton: {
    height: 40,
    marginTop: 12,
    marginRight: 20,
    width: 64,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  navBarButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  optionsView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 20,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 24
  },
  checkbox: {
    backgroundColor: 'blue',
    height: 24,
    width: 24,
    borderRadius: 16,
  },
  text: {
    fontSize: 18,
  },
  underline: {
    backgroundColor: Colors.LIGHT_GREY,
    height: 2,
    marginLeft: 16,
    marginTop: 16,
    marginRight: 16
  },
  buttonStyle: {
    marginRight: 64,
    marginLeft: 64,
    marginTop: 128
  }
})


export default NavBar;
