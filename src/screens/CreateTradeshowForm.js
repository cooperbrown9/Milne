import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text, TouchableOpacity, TextInput, StyleSheet, Image, DatePickerIOS } from 'react-native';
import { connect } from 'react-redux';

import * as NavActions from '../redux/action-types/nav-action-types';
import * as Colors from '../theme/colors';
import * as SampleActions from '../redux/action-types/sample-request-action-types';

import { createTradeshow } from '../api/api';

import axios from 'axios';
import NavBar from '../ui-elements/nav-bar';
import CalcButton from '../ui-elements/calc-button';

class CreateTradeshowForm extends Component {

  constructor() {
    super();

    this.createTradeshow = createTradeshow.bind(this);

    this.state = {
      name: '',
      location: '',
      description: '',
      date: new Date(),
      deleteDate: new Date()
    }
  }

  static propTypes = {
    dismiss: PropTypes.func
  }

  create = () => {
    const data = {
      'name': this.state.name,
      'location': this.state.location,
      'description': this.state.description,
      'date': this.state.date,
      'delete_date': this.state.deleteDate
    }
    this.createTradeshow(data, (err, show) => {
      if(err) {
        console.log(err);
        this.submit();
      } else {
        console.log(show);
        this.submit();
      }
    })
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
      <ScrollView style={styles.container} >
        <NavBar leftButton={<Image source={require('../../assets/icons/back-arrow.png')} style={styles.navButton}/>}
                leftOnPress={this.props.dismiss}
                title={<Text style={{color:'black', fontSize: 20, fontFamily: 'roboto-bold'}}>Create Tradeshow</Text>}
        />
      <View style={{height:64, backgroundColor:'transparent'}}></View>

        {this.fieldFactory('Name', this.state.title, (text) => this.setState({ name: text }))}
        {this.fieldFactory('Location', this.state.location, (text) => this.setState({ location: text }))}
        {this.fieldFactory('Description', this.state.description, (text) => this.setState({ description: text }))}

        <Text style={styles.pickerTitle} >Date</Text>
        <View style={styles.pickerContainer} >
          <DatePickerIOS
              onDateChange={(date) => { this.setState({ date: date }) }}
              date={this.state.date}
              mode={'date'}
            />
        </View>

        <Text style={styles.pickerTitle} >Delete Date</Text>
        <View style={styles.pickerContainer} >
          <DatePickerIOS
              onDateChange={(date) => { this.setState({ deleteDate: date }) }}
              date={this.state.deleteDate}
              mode={'date'}
            />
        </View>

        <View style={styles.submitButton} >
          <CalcButton onPress={this.create} title={'SUBMIT'} />
        </View>
        <View style={{height:64}}/>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.LIGHT_GREY
  },
  pickerContainer: {
    marginLeft: 16, marginRight: 16, marginBottom: 16, borderRadius: 8,
    backgroundColor: 'white', overflow: 'hidden'
  },
  pickerTitle: {
    fontSize: 24, fontFamily: 'roboto-bold', color: Colors.PURPLE,
    marginLeft: 32, marginBottom: 8
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
    width: 22,
    tintColor: 'black'
  }
})

var mapStateToProps = state => {
  return {

  }
}

export default connect(mapStateToProps)(CreateTradeshowForm);
