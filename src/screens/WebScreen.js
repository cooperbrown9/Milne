import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

import { onShare } from '../util/util';
import { PURPLE } from '../theme/colors';

const WebScreen = props => (
  <View style={styles.container} >
    <WebView style={{flex: 1}} source={{uri: props.url}} />
    {(props.dismiss)
      ? <TouchableOpacity style={styles.close} onPress={props.dismiss}>
          <Image style={{tintColor:'white',width:32,height:32}} source={require('../../assets/icons/down-arrow.png')} />
        </TouchableOpacity>
      : null
    }

    <TouchableOpacity style={styles.share} onPress={() => onShare(props.url)} >
      <Image style={{tintColor:'white',width:32,height:32}} source={require('../../assets/icons/share.png')} />
    </TouchableOpacity>

  </View>

)

WebScreen.propTypes = {
  url: PropTypes.string,
  dismiss: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  close: {
    position: 'absolute', justifyContent: 'center', alignItems: 'center',
    left: 32, bottom: 32,
    height: 64, width: 64,
    borderRadius: 32,
    backgroundColor: PURPLE
  },
  share: {
    position: 'absolute', justifyContent: 'center', alignItems: 'center',
    right: 32, bottom: 32,
    height: 64, width: 64,
    borderRadius: 32,
    backgroundColor: PURPLE
  }
})

export default WebScreen;
