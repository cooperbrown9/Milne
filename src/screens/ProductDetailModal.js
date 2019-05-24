import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, ScrollView, ListView, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Linking, WebView, Modal } from 'react-native';

import WebScreen from './WebScreen';
import NavBar from '../ui-elements/nav-bar.js';
import Menu from '../ui-elements/menu';

import * as NavActions from '../redux/action-types/nav-action-types';

class ProductDetailModal extends Component {

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);


    this.state = {
      webOpen: false,
      product: props.navigation.state.params.product,
      url: ''
    }
  }

  componentDidMount() {
  }

  _dismissWebView = () => {
    this.setState({ webOpen: false });
  }

  openWebView = (url) => {
    console.log('URL', url)
    this.setState({ webOpen: true, url: url });
  }

  render() {
    return(
      <View style={styles.container}>
        <NavBar leftButton={<Image source={require('../../assets/icons/back-arrow.png')} style={styles.navButton}/>}
          leftOnPress={() => this.props.navigation.goBack()}
          title={<Text style={{color:'black', fontSize: 20, fontFamily:'roboto-bold'}}>{this.state.product.name}</Text>}
          />
        <View style={styles.imageContainer}>
          <Image source={this.state.product.image} style={styles.productImage} />
        </View>
        <ScrollView style={styles.productInfo} contentContainerStyle={{justifyContent: 'flex-start',
        flexDirection: 'column'}}>
          <View style={styles.description}>
            <Text style={styles.itemHeader}>DESCRIPTION</Text>
            <Text style={styles.itemText}>{this.state.product.description}</Text>
          </View>
          <View style={styles.juicePureeContainer}>
            <View style={styles.juice}>
              <Text style={styles.itemHeader}>JUICE</Text>
              {(this.state.product.juiceTypes.map((j, index) =>
                <TouchableOpacity onPress={() => this.openWebView(j.url)} style={styles.linkContainer} key={index}>
                  <Text style={styles.itemText} >{j.title}</Text>
                  <Image style={styles.send} source={require('../../assets/icons/right-arrow.png')} />
                </TouchableOpacity>
              ))}
            </View>


            <View style={styles.puree}>
              <Text style={styles.itemHeader}>PUREE</Text>
              {(this.state.product.pureeTypes.map((p, index) => (
                <TouchableOpacity onPress={() => this.openWebView(p.url)} style={styles.linkContainer} key={index}>
                  <Text style={styles.itemText} >{p.title}</Text>
                  <Image style={styles.send} source={require('../../assets/icons/right-arrow.png')} />
                </TouchableOpacity>
              )))}
            </View>
          </View>
        </ScrollView>
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
    fontSize: 16,
    paddingTop: 14, lineHeight: 18
  },
  imageContainer:{
    maxHeight: 200,
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
    flex: 5,
    // justifyContent: 'flex-start',
    // flexDirection: 'column',
    // marginTop: 16,
    backgroundColor: 'purple'
  },
  description: {
    marginTop: 24,
    marginLeft: 16, marginRight: 16, marginBottom: 8
  },
  juicePureeContainer: {
    flex:1,
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
    height: 32,
    width: 32,
    marginTop: 2,
    tintColor: 'black'
  }
});

var mapStateToProps = state => {
  return {
    // product: state.nav.product
  }
}

export default connect(mapStateToProps)(ProductDetailModal);
