import React, { Component } from 'react';
import { View, Text, Animated, LayoutAnimation, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import NavBar from '../ui-elements/nav-bar';

class BrochureScreen extends Component {
  constructor() {
    super();
  }

  openMenu() {
    this.animate();
    if(this.props.menuOpen) {
      this.props.dispatch({ type: MenuActions.CLOSE });
    } else {
      this.props.dispatch({ type: MenuActions.OPEN_FROM_PRODUCT });
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
      this.setState({ cover: 0, menuTop: -FRAME.height });
    } else {
      this.setState({ cover: 0.4, menuTop: 32 });
    }
  }

  render() {
    return(
      <View style={styles.container} >

        <Animated.View style={{position:'absolute', left:0,right:0,top:this.state.menuTop,height:FRAME.height/2,backgroundColor:'white'}} >
          <Menu toggle={this.openMenu.bind(this)} dispatch={this.props.dispatch} />
        </Animated.View>

        <NavBar leftButton={<Image source={require('../../assets/icons/bars.png')} style={styles.navButton}/>}
                leftOnPress={this.openMenu.bind(this)}
                title={<Text style={{color:'black', fontSize: 20, fontFamily: 'roboto-bold'}}>Brochure</Text>}
        />

        <Text>we lit</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

var mapStateToProps = state => {
  return {
    menuOpen: state.menu.isOpen
  }
}

export default connect(mapStateToProps)(BrochureScreen);
