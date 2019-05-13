import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import * as Colors from '../theme/colors';

let entry = '';

function isSuccess(pw) {
  console.log(entry)
  if(pw == entry) {
    return true;
  }
  return false;
}

const Password = props => (
  <View style={styles.container} >
    <View style={styles.content} >
      <View style={styles.inputContainer} >
        <TextInput selectionColor={Colors.PURPLE} autoCorrect={false} autoCapitalize={'none'}
          style={styles.input}
          placeholder={'Password'}
          keyboardType={'default'}
          onChangeText={(text) => entry = text}
          returnKeyType={'done'}
          />
      </View>
      <View style={styles.buttonContainer} >
        <TouchableOpacity style={styles.button} onPress={props.onDismiss} >
          <Image style={{height: 32, width: 32, tintColor: 'white'}} source={require('../../assets/icons/close.png')}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => (isSuccess(props.password) ? props.onSuccess() : props.onDismiss())}>
          <Image style={{ height: 32, width: 40, tintColor: 'white'}} source={require('../../assets/icons/right-arrow.png')} />
        </TouchableOpacity>
      </View>
    </View>
  </View>
)



Password.propTypes = {
  password: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onDismiss: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute', left: 0, right: 0, top: 0, bottom: 0,
    justifyContent: 'center', alignItems: 'stretch',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  content: {
    height: 160, borderRadius: 8, margin: 16,
    backgroundColor: 'white', justifyContent: 'space-around', alignItems: 'stretch'
  },
  inputContainer: {
    marginLeft: 16, marginRight: 16, marginTop: 8,
    height: 48,
    borderBottomColor: Colors.PURPLE, borderBottomWidth: 2
  },
  input: {
    color: Colors.PURPLE, fontSize: 24, fontFamily: 'roboto-bold'
  },
  buttonContainer: {
    height: 64, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'
  },
  button: {
    height: 48, width: 100, borderRadius: 8,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: Colors.PURPLE
  }
})

export default Password;
