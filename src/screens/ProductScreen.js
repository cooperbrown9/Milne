import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';import NavBar from '../ui-elements/nav-bar.js';

class ProductScreen extends Component {

  dropDownMenu(){
    console.log('its lit fam');
  }

  render() {
    return(
      <View style={{backgroundColor:'transparent',
                    flex: 1,
                    backgroundColor: 'white',
                    flexDirection:'column',
                    justifyContent: 'flex-start',

                    }} >
        <NavBar leftButton={<Image source={require('../../assets/icons/search.png')} style={{height:22, width:22, tintColor: 'black'}}/>}
                      rightButton={<Image source={require('../../assets/icons/bars.png')} style={{height:22, width:22, tintColor: 'black'}}/>}
                      title={<TouchableOpacity onPress={this.dropDownMenu.bind(this)}>
                        <Text style={{color:'white', fontSize: 16}}>Products</Text>
                       </TouchableOpacity>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

export default ProductScreen;
