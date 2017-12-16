import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, ScrollView, ListView, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import NavBar from '../ui-elements/nav-bar.js';
import Menu from '../ui-elements/menu';

const ProductDetailModal = (props) => (


    <View style={styles.container}>
      <NavBar leftButton={<Image source={require('../../assets/icons/back-arrow.png')} style={styles.navButton}/>}
              title={<Text style={{color:'black', fontSize: 20}}>{props.product.name}</Text>}
      />
      <View style={styles.imageContainer}>
        <Image source={props.product.image} style={styles.productImage}/>
      </View>
      <View style={styles.productInfo}>
        <View style={styles.description}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold',}}>DESCRIPTION</Text>
          <Text style={{color: 'white', fontSize: 14, paddingTop: 14}}>{props.product.description}</Text>
        </View>
        <View style={styles.juicePureeContainer}>
          <View style={styles.juice}>
            <Text>JUICE</Text>
            <Text>{props.product.description}</Text>
          </View>


          <View style={styles.puree}>
            <Text>PUREE</Text>
            <Text>{props.product.description}</Text>
          </View>
        </View>
      </View>

    </View>
)

ProductDetailModal.propTypes = {
  product: PropTypes.object.isRequired,
  dismissModal: PropTypes.func,
};





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  imageContainer:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  productImage: {
    flex: 1,
    width: 160,
    height: 74

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
    marginLeft: 28

  },
  juicePureeContainer: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  navButton: {
    height: 18,
    width: 18,
    marginTop: 2,
    tintColor: 'black'
  }
});

export default ProductDetailModal;
