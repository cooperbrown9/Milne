import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, ScrollView, ListView, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Linking, WebView, Modal } from 'react-native';

import WebScreen from './WebScreen';
import NavBar from '../ui-elements/nav-bar.js';
import Menu from '../ui-elements/menu';

import * as NavActions from '../redux/action-types/nav-action-types';

class ProductDetailModal extends Component {
  constructor() {
    super();

    this.state = {
      webOpen: false,
      url: ''
    }
  }

  componentDidMount() {

  }

  _dismissWebView = () => {
    this.setState({ webOpen: false });
  }

  openWebView = (url) => {
    this.setState({ webOpen: true, url: url });
  }

  render() {
    return(


      <View style={styles.container}>
        <NavBar leftButton={<Image source={require('../../assets/icons/back-arrow.png')} style={styles.navButton}/>}
          leftOnPress={() => this.props.dispatch({ type: NavActions.BACK })}
          title={<Text style={{color:'black', fontSize: 20, fontFamily:'roboto-bold'}}>{this.props.product.name}</Text>}
          />
        <View style={styles.imageContainer}>
          <Image source={this.props.product.image} style={styles.productImage} />
        </View>
        <View style={styles.productInfo}>
          <View style={styles.description}>
            <Text style={styles.itemHeader}>DESCRIPTION</Text>
            <Text style={styles.itemText}>{this.props.product.description}</Text>
          </View>
          <View style={styles.juicePureeContainer}>
            <View style={styles.juice}>
              <Text style={styles.itemHeader}>JUICE</Text>
              {(this.props.product.juiceTypes.map((j) =>
                <TouchableOpacity onPress={() => this.openWebView(j.url)} style={styles.linkContainer} >
                  <Text style={styles.itemText} >{j.title}</Text>
                  <Image style={styles.send} source={require('../../assets/icons/right-arrow.png')} />
                </TouchableOpacity>
              ))}
            </View>


            <View style={styles.puree}>
              <Text style={styles.itemHeader}>PUREE</Text>
              {(this.props.product.pureeTypes.map((p) => (
                <TouchableOpacity onPress={() => this.openWebView(p.url)} style={styles.linkContainer}>
                  <Text style={styles.itemText} >{p.title}</Text>
                  <Image style={styles.send} source={require('../../assets/icons/right-arrow.png')} />
                </TouchableOpacity>
              )))}
            </View>
          </View>
        </View>
        <Modal animationType={'slide'} transparent={false} visible={this.state.webOpen} >
          <WebScreen url={this.state.url} dismiss={this._dismissWebView}/>
        </Modal>

        {(this.state.webOpen)
          ? <WebView style={{position:'absolute',left:0,top:0,right:0,bottom:0}} source={{uri: this.state.url}}/>
          : null
        }


      </View>
    )
  }

}


ProductDetailModal.propTypes = {
  product: PropTypes.object,
  dismissModal: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  linkContainer: {
    flexDirection: 'row', justifyContent: 'flex-start', alignItems:'center',
    backgroundColor: 'transparent',
    borderRadius: 8, height: 44,
    marginBottom: 16, marginRight: 16,
    overflow: 'hidden'
  },
  send: {
    height: 24, width: 24, marginLeft: 8, marginTop: 12,
    tintColor: 'white'
  },
  itemHeader: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold', fontFamily: 'roboto-bold'
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
    marginLeft: 28, marginRight: 28, marginBottom: 8,
    flex: 1
  },
  juicePureeContainer: {
    flex:2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 28, marginRight: 28, marginTop: 16
  },
  puree: {
    flex: 1,
  },
  juice: {
    flex: 1, marginRight: 8,
  },
  navButton: {
    height: 24,
    width: 24,
    marginTop: 2,
    tintColor: 'black'
  }
});

var mapStateToProps = state => {
  return {
    product: state.nav.product
  }
}

export default connect(mapStateToProps)(ProductDetailModal);
