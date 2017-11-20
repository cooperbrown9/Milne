import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as Colors from '../theme/colors';

const Menu = (props) => (
    <View style={styles.container} >
        <View style={styles.buttonContainer} >

          <TouchableOpacity style={styles.close} >
            <Image style={styles.closeImage} source={require('../../assets/icons/bars.png')} />
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={(props.indexOn === 0) ? styles.buttonOn : styles.buttonOff}>Products</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={(props.indexOn === 1) ? styles.buttonOn : styles.buttonOff}>Calculator</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={(props.indexOn === 2) ? styles.buttonOn : styles.buttonOff}>Tradeshows</Text>
          </TouchableOpacity>
        </View>
    </View>
);

Menu.propTypes = {
  indexOn: PropTypes.number,
  isOpen: PropTypes.bool
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: 'white',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    marginTop: 40,
    marginLeft: 32,
    marginRight: 16
  },
  buttonOn: {
    color: Colors.PURPLE,
    paddingTop: 24,
    fontSize: 32,
    fontWeight: 'bold'
  },
  buttonOff: {
    color: 'grey',
    paddingTop: 24,
    fontSize: 32,
    fontWeight: 'bold'
  },
  close: {
    position: 'absolute',
    right: 72, top: 32, left: 0
    height: 32,
    width: 32
  },
  closeImage: {
    height: 32,
    width: 32,
    tintColor: 'red'
  }
});

var mapStateToProps = state => {
  // console.log(state);
  return {
    indexOn: state.menu.indexOn,
    isOpen: state.menu.isOpen
  }
}

export default connect(mapStateToProps)(Menu);
