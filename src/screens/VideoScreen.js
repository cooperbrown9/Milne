import React, { Component } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, Animated, LayoutAnimation, Dimensions, Modal } from 'react-native';
import { connect } from 'react-redux';

import NavBar from '../ui-elements/nav-bar';
import Menu from '../ui-elements/menu';
import WebScreen from './WebScreen';
import CalcButton from '../ui-elements/calc-button';

import VIDEOS from '../constants/video-data';

import * as MenuActions from '../redux/action-types/menu-action-types';
import * as Colors from '../theme/colors';

const FRAME = Dimensions.get('window');

class VideoScreen extends Component {
  constructor() {
    super();



    this.state = {
      url: '',
      webviewPresent: false,
      menuTop: -FRAME.height
    }
  }

  componentWillMount() {
    let randVal = Math.floor(Math.random() * 5);

    switch(randVal) {
      case 0:
        this.setState({ image: require('../../assets/images/blueberries.jpg') });
        break;
      case 1:
        this.setState({ image: require('../../assets/images/cherry-bg.jpg') });
        break;
      case 2:
        this.setState({ image: require('../../assets/images/farmer.jpg') });
        break;
      case 3:
        this.setState({ image: require('../../assets/images/grapes.jpg') });
        break;
      case 4:
        this.setState({ image: require('../../assets/images/night.jpg') });
        break;
      default:
        this.setState({ image: require('../../assets/images/cherry-bg.jpg') });
    }
  }

  openVideo(url) {
    console.log(url);
    this.setState({ webviewPresent: true, url: url });
  }

  openMenu() {
    this.animate();
    if(this.props.menuOpen) {
      this.props.dispatch({ type: MenuActions.CLOSE });
    } else {
      this.props.dispatch({ type: MenuActions.OPEN_FROM_VIDEO });
    }
  }

  _dismissWebView = () => {
    this.setState({ webviewPresent: false });
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
    return (
      <View style={styles.container} >
        <NavBar leftButton={<Image source={require('../../assets/icons/bars.png')} style={styles.navButton}/>}
          leftOnPress={this.openMenu.bind(this)}
          title={<Text style={{color:'black', fontSize: 20, fontFamily: 'roboto-bold'}}>Videos</Text>}
          />

        <Image style={styles.bgImage} source={this.state.image} resizeMode={'contain'} resizeMethod={'resize'} />


        <ScrollView style={styles.scrollContainer} >


          <View style={styles.buttonContainer} >
            {(VIDEOS.map(v => (
              <TouchableOpacity style={styles.button} onPress={() => this.openVideo(v.url)} >
                <Text style={styles.buttonText}>{v.title}</Text>
                <Image style={styles.play} source={require('../../assets/icons/play.png')} resizeMode={'contain'} />
              </TouchableOpacity>
            )))}
          </View>

        </ScrollView>

        <Modal animationType={'slide'} visible={this.state.webviewPresent} >
          <WebScreen url={this.state.url} dismiss={() => this._dismissWebView()} />
        </Modal>

        <Animated.View style={{position:'absolute', left:0,right:0,top:this.state.menuTop,height:FRAME.height/2,backgroundColor:'white',zIndex:2}} >
          <Menu toggle={this.openMenu.bind(this)} dispatch={this.props.dispatch} />
        </Animated.View>


      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    zIndex: 2
  },
  buttonContainer: {
    flex: 1,
    marginTop: 16, marginLeft: 16, marginRight: 16, marginBottom: 16
  },
  play: {
    height: 48, width: 48, marginRight: 8, tintColor: 'black'
  },
  button: {
    flex: 1, flexDirection: 'row',
    height: 64, borderRadius: 8, marginBottom: 16,
    backgroundColor: Colors.MID_GREY, opacity: 0.9,
    justifyContent: 'space-between', alignItems: 'center'
  },
  buttonText: {
    fontSize: 28, fontFamily: 'roboto-bold',
    textAlign: 'center', color: Colors.PURPLE,
    marginLeft: 16
  },
  navButton: {
    height: 24,
    width: 24,
    tintColor: 'black'
  },
  bgImage: {
    position: 'absolute',
    left: 0, right: 0, top: 0, bottom: 0,
    zIndex: 1
  }
})

var mapStateToProps = state => {
  return {
    menuOpen: state.menu.isOpen
  }
}

export default connect(mapStateToProps)(VideoScreen);
