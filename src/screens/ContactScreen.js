import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Dimensions, Image, Animated, LayoutAnimation, Text, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import NavBar from '../ui-elements/nav-bar';
import Menu from '../ui-elements/menu';

import * as Colors from '../theme/colors';
import * as MenuActions from '../redux/action-types/menu-action-types';

const FRAME = Dimensions.get('window')

class ContactScreen extends Component {

  constructor() {
    super();

    this.state = {
      menuTop: -FRAME.height
    }
  }

  componentDidMount() {

  }

  openMenu() {
    this.animate();
    if(this.props.menuOpen) {
      this.props.dispatch({ type: MenuActions.CLOSE });
    } else {
      this.props.dispatch({ type: MenuActions.OPEN_FROM_CONTACT });
    }
  }

  animate() {
    var animationProps = {
      type: 'spring',
      springDamping: 0.9,
      property: 'opacity'
    }

    var animationConfig = {
      duration: 500,
      create: animationProps,
      update: animationProps
    }
    LayoutAnimation.configureNext(animationConfig);

    if(this.props.menuOpen) {
      this.setState({ menuTop: -FRAME.height });
    } else {
      this.setState({ menuTop: 32 });
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <NavBar leftButton={<Image source={require('../../assets/icons/bars.png')} style={styles.navButton}/>}
                leftOnPress={this.openMenu.bind(this)}
                title={<Text style={{color:'black', fontSize: 20, fontFamily: 'roboto-bold'}}>Contact</Text>}
        />

        <ScrollView style={styles.container} >
          <View style={{height:64}} />
          <View style={styles.addressContainer} >
            <Text style={styles.header} >Address</Text>
            <Text style={styles.text}>1008 E Windemere Ct</Text>
            <Text style={styles.text}>Spokane, WA 99223</Text>
          </View>

          <View style={styles.phoneContainer} >
            <Text style={styles.header}>Phones</Text>
            <Text style={styles.text}>Main Office</Text>
            <Text style={styles.headerColor}>(509)990-5474</Text>
            <Text style={styles.text}>Juice Department</Text>
            <Text style={styles.headerColor}>(123)456-7890</Text>
          </View>
        </ScrollView>

        <Animated.View style={{position:'absolute', left:0,right:0,top:this.state.menuTop,height:FRAME.height/2,backgroundColor:'white'}} >
          <Menu toggle={this.openMenu.bind(this)} dispatch={this.props.dispatch} />
        </Animated.View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_GREY
  },
  addressContainer: {
    marginLeft: 16, marginRight: 16, marginBottom: 32
  },
  phoneContainer: {
    marginLeft: 16, marginRight: 16, marginBottom: 32
  },
  header: {
    fontSize: 40, marginBottom: 8,
    fontFamily: 'roboto-bold',
    color: Colors.PURPLE
  },
  headerColor: {
    fontSize: 24, fontFamily: 'roboto-bold',
    color: Colors.GREEN,
    marginBottom: 8
  },
  text: {
    fontSize: 18, fontFamily: 'roboto-regular',
    color: Colors.DARK_GREY,
    marginBottom: 4
  },
  navButton: {
    height: 24,
    width: 24,
    tintColor: 'black'
  },
})

var mapStateToProps = state => {
  return {
    menuOpen: state.menu.isOpen
  }
}

export default connect(mapStateToProps)(ContactScreen);
