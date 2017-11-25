import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';import NavBar from '../ui-elements/nav-bar.js';
import Menu from '../ui-elements/menu';
import * as MenuActions from '../redux/action-types/menu-action-types';

class ProductScreen extends Component {

  static navigationOptions = {
    header: null
  };

  dropDownMenu(){
    console.log('yuh');
    this.props.dispatch({ type: MenuActions.OPEN_FROM_PRODUCT });
  }

  render() {

    const { height, width } = Dimensions.get('window');

    return(
      <View style={styles.container} >

        <NavBar leftButton={<Image source={require('../../assets/icons/search.png')} style={styles.navButton}/>}
                rightButton={<Image source={require('../../assets/icons/bars.png')} style={styles.navButton}/>}
                leftOnPress={() => {this.dropDownMenu()}}
                rightOnPress={this.dropDownMenu.bind(this)}
                title={<Text style={{color:'black', fontSize: 20}}>Products</Text>}
        />

        {this.props.menuOpen ?
          <Menu />
            : null
          }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'transparent',
    flex: 1,
    backgroundColor: 'white',
    flexDirection:'column',
    justifyContent: 'flex-start',
  },
  menuContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    left: 0, top: 0, bottom: 0, right: 0,
    height: Dimensions.get('window').height,
    zIndex: 10
  },
  navButton: {
    height: 22,
    width: 22,
    tintColor: 'black'
  }
});

var mapStateToProps = state => {
  return {
    menuOpen: state.menu.isOpen,
    user: state.user
  }
}

export default connect(mapStateToProps)(ProductScreen);
