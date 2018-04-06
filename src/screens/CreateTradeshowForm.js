import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';

import * as NavActions from '../redux/action-types/nav-action-types';
import * as Colors from '../theme/colors';
import * as SampleActions from '../redux/action-types/sample-request-action-types';

import NavBar from '../ui-elements/nav-bar';
import CalcButton from '../ui-elements/calc-button';

class CreateTradeshowForm extends Component {

  constructor() {
    super();

    this.state = {
      name: "",
      location: "",
      date: ""
    }
  }

  static propTypes = {
    dismiss: PropTypes.func
  }

  submit = () => {
    this.props.dismiss();
  }

  fieldFactory(placeholder, text, updateState) {
    return (
      <View style={styles.fieldContainer} >
        <TextInput
          selectionColor={Colors.PURPLE} autoCorrect={false}
          style={styles.field}
          placeholder={placeholder}
          onChangeText={(text) => updateState(text)}
          value={text}
          returnKeyType={'done'}
        />
      </View>
    )
  }

  render() {
    return(
      <View style={styles.container} >
        <NavBar leftButton={<Image tintColor='black' source={require('../../assets/icons/bars.png')} style={styles.navButton}/>}
                leftOnPress={this.props.dismiss}
                title={<Text style={{color:'black', fontSize: 20, fontFamily: 'roboto-bold'}}>Create Tradeshow</Text>}
        />
      <View style={{height:64, backgroundColor:'transparent'}}></View>

        {this.fieldFactory('Name', this.state.name, (text) => this.setState({ name: text }))}
        {this.fieldFactory('Location', this.state.location, (text) => this.setState({ location: text }))}
        {this.fieldFactory('Date', this.state.date, (text) => this.setState({ data: text }))}

        <View style={styles.submitButton} >
          <CalcButton onPress={this.submit} title={'SUBMIT'} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.LIGHT_GREY
  },
  submitButton: {
    marginLeft: 32, marginRight: 32, marginTop: 64
  },
  fieldContainer: {
    marginLeft: 32, marginRight: 32, marginBottom: 32,
    height: 64, justifyContent: 'center',
    borderBottomColor: Colors.PURPLE, borderBottomWidth: 2
  },
  field: {
    color: Colors.PURPLE, fontSize: 24, fontFamily: 'roboto-bold'
  },
  navButton: {
    height: 22,
    width: 22
  }
})

var mapStateToProps = state => {
  return {

  }
}

export default connect(mapStateToProps)(CreateTradeshowForm);
