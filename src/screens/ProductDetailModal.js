import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, ScrollView, ListView, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import NavBar from '../ui-elements/nav-bar.js';
import Menu from '../ui-elements/menu';

const ProductDetailModal = (props) => (


  <View style={styles.container}>
    <NavBar leftButton={<Image source={require('../../assets/icons/back-arrow.png')} style={styles.navButton}/>}
            leftOnPress={props.dismissModal}
            title={<Text style={{color:'black', fontSize: 20, fontFamily:'roboto-bold'}}>{props.product.name}</Text>}
    />
    <View style={styles.imageContainer}>
      <Image source={props.product.image} style={styles.productImage} />
    </View>
    <View style={styles.productInfo}>
      <View style={styles.description}>
        <Text style={styles.itemHeader}>DESCRIPTION</Text>
        <Text style={styles.itemText}>{props.product.description}</Text>
      </View>
      <View style={styles.juicePureeContainer}>
        <View style={styles.juice}>
          <Text style={styles.itemHeader}>JUICE</Text>
          <Text style={styles.itemText}>{props.product.description}</Text>
        </View>


        <View style={styles.puree}>
          <Text style={styles.itemHeader}>PUREE</Text>
          <Text style={styles.itemText}>{props.product.description}</Text>
        </View>
      </View>
    </View>

  </View>
)

ProductDetailModal.propTypes = {
  product: PropTypes.object,
  dismissModal: PropTypes.func,
};





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  itemHeader: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold', fontFamily: 'roboto-regular'
  },
  itemText: {
    color: 'white', fontFamily: 'roboto-regular',
    fontSize: 14,
    paddingTop: 14
  },
  imageContainer:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  productImage: {
    flex: 1,
    height: 84,
    resizeMode: 'contain'
  },
  productInfo: {
    flex: 2,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    marginTop: 20,
    backgroundColor: 'purple'
  },
  description: {
    marginTop: 28,
    marginLeft: 28,
    flex: 1

  },
  juicePureeContainer: {
    flex:2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 28
  },
  puree: {
    flex: 1,
  },
  juice: {
    flex: 1,
  },
  navButton: {
    height: 18,
    width: 18,
    marginTop: 2,
    tintColor: 'black'
  }
});

export default ProductDetailModal;
