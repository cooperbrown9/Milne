import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Dimensions, Image, Animated, LayoutAnimation, Alert, Text, StyleSheet, ActionSheetIOS } from 'react-native';

import { connect } from 'react-redux';
import NavBar from '../ui-elements/nav-bar';
import Menu from '../ui-elements/menu';
import call from 'react-native-phone-call';
import Communications from 'react-native-communications';

import CalcButton from '../ui-elements/calc-button';
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

  showActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions({
      title: 'Select Media',
      options: ['Cancel', 'Email', 'Text Message'],
      cancelButtonIndex: 0
    }, (index) => {
      this.selectShareOption(index);
    })
  }

  selectShareOption(index) {
    switch(index) {
      case 1:
        // email
        Communications.email([''], null, null, 'Milne App', 'Download the Milne App!\n\n https://itunes.apple.com/us/app/the-milne-app/id996938695?ls=1&mt=8');
        break;

      case 2:
      // text
        Communications.text('', 'Download the Milne App!\n\n https://itunes.apple.com/us/app/the-milne-app/id996938695?ls=1&mt=8');
        break;

      case 3:
        break;
      default:
        break;
    }
  }

  handlePhoneCall(number) {
    const args = {
      number: number
    }
    call(args).catch(Alert.alert('Phone call could not be made at this time!'));
  }

  handleEmail() {
    Communications.email(['sales@milnefruit.com'], null, null, 'Inquiry from App', '')
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

      <ScrollView style={styles.scrollContainer} >
          <View style={{height:32}} />
          <View style={styles.blockContainer} >
            <Text style={styles.header} >Address</Text>
            <Text style={styles.text}>804 Bennett Ave</Text>
            <Text style={styles.text}>Prosser, WA 99350</Text>
          </View>

          <View style={styles.blockContainer} >
            <Text style={styles.header}>Phones</Text>
            <Text onPress={() => this.handlePhoneCall('5097862611')} style={styles.headerColor}>Main Office</Text>
            <Text onPress={() => this.handlePhoneCall('5097862611')} style={styles.text}>(509)786-2611</Text>
          </View>

          <View style={styles.blockContainer} >
            <Text style={styles.header}>Email</Text>
            <Text onPress={() => this.handleEmail()} style={styles.headerColor}>Sales</Text>
            <Text onPress={() => this.handleEmail()} style={styles.text}>sales@milnefruit.com</Text>
          </View>

        </ScrollView>

        <View style={styles.shareContainer} >
          <CalcButton title={'Share App'} onPress={() => this.showActionSheet()}/>
        </View>


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
  shareContainer: {
    position: 'absolute', left: 32, right: 32, bottom: 64,
     height: 48
  },
  scrollContainer: {
    flex: 1,
    marginLeft: 16, marginRight: 16
  },
  blockContainer: {
    marginLeft: 16, marginRight: 16, marginBottom: 40
  },
  header: {
    fontSize: 40, marginBottom: 8,
    fontFamily: 'roboto-bold',
    color: Colors.PURPLE
  },
  headerColor: {
    fontSize: 24, fontFamily: 'roboto-bold',
    color: Colors.GREEN,
    marginBottom: 4
  },
  text: {
    fontSize: 18, fontFamily: 'roboto-regular',
    color: Colors.DARK_GREY,
    marginBottom: 8
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
