import React from 'react';
import { PropTypes } from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';

const NavBar = (props) => (
  <View style={styles.navBar} backgroundColor={'white'}>

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
  title: PropTypes.element,
  leftOnPress: PropTypes.func,
  leftButton: PropTypes.element,
  rightOnPress: PropTypes.func,
  rightButton: PropTypes.element,

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
    zIndex: 2,
  },
  leftButton: {
    height: 40, width: 64,
    marginTop: 12, marginLeft: 20,
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
    height: 40, width: 64,
    marginTop: 12, marginRight: 20,
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
  text: {
    fontSize: 18,
  },
  buttonStyle: {
    marginRight: 64,
    marginLeft: 64,
  }
})


export default NavBar;
