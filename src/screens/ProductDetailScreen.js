import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, ScrollView, ListView, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import NavBar from '../ui-elements/nav-bar.js';
import Menu from '../ui-elements/menu';

function ProductDetailScreen (props) {
  ProductDetailScreen.propTypes = {
    productImage = PropTypes.string.isRequired,
    productDescription = PropTypes.string.isRequired,
    juiceDescription = PropTypes.string.isRequired,
    pureeDescription = PropTypes.string.isRequired
  }

  ProductDescription.defaultProps = {
    productImage = '../../assets/fruits/apple.png',
    productDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
                          + 'Donec vehicula nisl ac nisi maximus, non pharetra nibh faucibus.'
                          + 'Proin iaculis maximus ante id dapibus.'
                          + 'Vestibulum volutpat nibh sem. Nunc neque eli.',
    juiceDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
                          + 'Donec vehicula nisl ac nisi maximus, non pharetra nibh faucibus.'
                          + 'Proin iaculis maximus ante id dapibus.'
                          + 'Vestibulum volutpat nibh sem. Nunc neque eli.',
    pureeDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
                          + 'Donec vehicula nisl ac nisi maximus, non pharetra nibh faucibus.'
                          + 'Proin iaculis maximus ante id dapibus.'
                          + 'Vestibulum volutpat nibh sem. Nunc neque eli.',


  }

  return(
    <View style={styles.container}>
      <Image source={require(props.productImage)} style={styles.productImage}/>

      <View style={styles.productInfo}>
        <View style={styles.description}>
          <Text>DESCRIPTION</Text>
          <Text>{props.productDescription}</Text>
        </View>

        <View style={styles.juice}>
          <Text>JUICE</Text>
          <Text>{props.juiceDescription}</Text>
        </View>

        <View style={styles.puree}>
          <Text>PUREE</Text>
          <Text>{props.pureeDescription}</Text>
        </View>
      </View>

    </View>
  )
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  productImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

  },
  productInfo: {
    flex: 2,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    marginTop: 20,
    backgroundColor: 'purple'
  }
});

export default ProductDetailScreen; 
