import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';

import * as NavActions from '../redux/action-types/nav-action-types';
import * as Colors from '../theme/colors';
import * as SampleActions from '../redux/action-types/sample-request-action-types';
import { getCityState } from '../api/api';

import { createTradeshow } from '../api/api';

import axios from 'axios';
import NavBar from '../ui-elements/nav-bar';
import CalcButton from '../ui-elements/calc-button';

class CreateTradeshowForm extends Component {

  constructor() {
    super();

    this.createTradeshow = createTradeshow.bind(this);
    this.getCityState = getCityState.bind(this);

    this.state = {
      name: '',
      location: '',
      description: '',
      website: '',
      booth: '',
      zipCode: '',
      city: '',
      state: '',
      date: new Date(),
      endDate: new Date()
    }
  }

  static propTypes = {
    dismiss: PropTypes.func
  }

  findZipCode() {
    this.getCityState(this.state.zipCode, (err, data) => {
      if(err || data.results.length == 0) {
        console.log(err)
        console.log('Could not get city state')
      } else {
        let city = data.results[0].address_components[1].long_name;
        let state = data.results[0].address_components[3].long_name;
        this.setState({ city: city, state: state });
      }
    })
  }

  create = () => {
    if(!this.state.website.includes('https://')) {
      this.state.website = 'https://' + this.state.website;
    }
    const data = {
      'name': this.state.name,
      'location': this.state.location,
      'description': this.state.description,
      'website': this.state.website,
      'date': this.state.date,
      'booth': this.state.booth,
      'zip_code': this.state.zipCode,
      'city': this.state.city,
      'state': this.state.state,
      'delete_date': this.state.endDate
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

  fieldFactory(placeholder, text, updateState, onEnd=()=>console.log(''), keyboard='default') {
    return (
      <View style={styles.fieldContainer} >
        <TextInput
          selectionColor={Colors.PURPLE} autoCorrect={false}
          style={styles.field}
          placeholder={placeholder}
          keyboardType={keyboard}
          onChangeText={(text) => updateState(text)}
          value={text}
          returnKeyType={'done'}
          onEndEditing={() => onEnd()}
        />
      </View>
    )
  }

  render() {
    return(
      <ScrollView style={styles.container} >
        <NavBar leftButton={<Image source={require('../../assets/icons/down-arrow.png')} style={styles.navButton}/>}
                leftOnPress={this.props.dismiss}
                title={<Text style={{color:'black', fontSize: 20, fontFamily: 'roboto-bold'}}>Create Tradeshow</Text>}
        />
      <View style={{height:64, backgroundColor:'transparent'}}></View>

        {this.fieldFactory('Name', this.state.title, (text) => this.setState({ name: text }), undefined)}
        {this.fieldFactory('Location', this.state.location, (text) => this.setState({ location: text }), undefined)}
        {this.fieldFactory('Website', this.state.website, (text) => this.setState({ website: text }), undefined)}
        {this.fieldFactory('Zip Code', this.state.zipCode, (text) => this.setState({ zipCode: text }), this.findZipCode.bind(this), 'numeric')}
        {this.fieldFactory('City', this.state.city, (text) => this.setState({ city: text }), undefined)}
        {this.fieldFactory('State', this.state.state, (text) => this.setState({ state: text }), undefined)}
        {this.fieldFactory('Booth #', this.state.booth, (text) => this.setState({ booth: text }), undefined)}
        {this.fieldFactory('Description', this.state.description, (text) => this.setState({ description: text }), undefined)}

        <Text style={styles.pickerTitle} >Start Date</Text>
        {/* <View style={styles.pickerContainer} >
          <DatePickerIOS
              onDateChange={(date) => { this.setState({ date: date }) }}
              date={this.state.date}
              mode={'date'}
            />
        </View> */}

        <Text style={styles.pickerTitle} >End Date</Text>
        {/* <View style={styles.pickerContainer} >
          <DatePickerIOS
              onDateChange={(date) => { this.setState({ endDate: date }) }}
              date={this.state.endDate}
              mode={'date'}
            />
        </View> */}

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
