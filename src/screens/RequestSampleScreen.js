import React, { Component } from 'react';
import {
  View, ScrollView, Text, AsyncStorage,
  TouchableOpacity, TextInput, StyleSheet, Image, Modal,
  Linking, ActionSheetIOS
} from 'react-native';
import { connect } from 'react-redux';
import { Constants } from 'expo';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getCityState } from '../api/api';

import * as NavActions from '../redux/action-types/nav-action-types';
import * as Colors from '../theme/colors';
import * as SampleActions from '../redux/action-types/sample-request-action-types';

import Communications from 'react-native-communications';
import SampleForm from './SampleForm';
import NavBar from '../ui-elements/nav-bar';
import CalcButton from '../ui-elements/calc-button';
import SampleItem from '../ui-elements/sample-item';
import OptionView from '../ui-elements/option-view';

class RequestSampleScreen extends Component {

  static navigationOptions = {
    header: null
  }

  constructor() {
    super();

    this.getCityState = getCityState.bind(this);

    this.state = {
      sampleFormPresented: false,
      requester: '',
      date: new Date(),
      company: '',
      attn: '',
      address: '',
      city: '',
      state: '',
      sizeLabel: '',
      juiceType: '',
      zip: '',
      phone: '',
      broker: '',
      samples: [],
      email: '',

    }
    this.inputs = [];
  }

  async componentDidMount() {
    await this.loadFields();
  }

  async loadFields() {
    const requester = await AsyncStorage.getItem('@REQUESTER');
    this.setState ({ requester: requester });
  }

  openEmail = () => {
    this.formatEmail((email) => {
      Linking.openURL('mailto://tjones@milnefruit.com?body=' + email);
    });
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
    AsyncStorage.setItem('@REQUESTER', this.state.requester, () => {
      this.formatEmail((message) => {
        switch(index) {
          case 1:
          // email
          // Linking.openURL('mailto:tjones@milnefruit.com?subject=SampleRequest&body=' + message);
          Communications.email(['dcortez@milnefruit.com'], null, null, 'Milne Sample Request', message)
          break;

          case 2:
          // text
          Communications.text('', message);
          break;

          case 3:
          break;
          default:
          break;
        }
      })
    });
    // this.share((message) => {

    // });
  }

  _editSample = (index) => {
    console.log(index);
    this.props.dispatch({ type: SampleActions.EDIT_SAMPLE, index: index });
    this.setState({ sampleFormPresented: true });
  }

  fieldFactory(placeholder, text, updateState, inputIndex, keyboard='default') {
    return (
      <View style={styles.fieldContainer} >
        <TextInput
          selectionColor={Colors.PURPLE} autoCorrect={false}
          style={styles.field}
          placeholder={placeholder}
          onChangeText={(text) => updateState(text)}
          value={text}
          returnKeyType={'next'}
          ref={ref => {this.inputs.push(ref)}}
          keyboardType={keyboard}
          onSubmitEditing={() => this.nextInput(inputIndex)}
          onEndEditing={(inputIndex === 3) ? () => this.findZipCode() : () => console.log('')}
        />
      </View>
    )
  }

  nextInput = (index) => {
    if(index !== 8) {
      this.inputs[index + 1].focus();
    }

    if(index === 3) {
      this.findZipCode();
    }
  }

  formatEmail(callback) {
    this.state.email = 'Requester: ' + this.state.requester + '\n';
    this.state.email += 'Company: ' + this.state.company + '\n';
    this.state.email += 'ATTN#: ' + this.state.attn + '\n';
    this.state.email += 'Address: \n' + this.state.address + '\n';
    this.state.email += this.state.city + ', ' + this.state.state + ' ' + this.state.zip + '\n';
    this.state.email += 'Phone #: ' + this.state.phone + '\n';
    this.state.email += 'Broker: ' + this.state.broker + '\n\n';
    this.state.email += '---------------SAMPLE REQUESTS--------------- \n';

    this.props.samples.forEach(s => {
      this.state.email += s.name + '\n';
      this.state.email += 'QTY: ' + s.quantity + '\tSIZE: ' + s.size + ' ' + s.sizeLabel + '\n';
      this.state.email += 'BRIX: ' + s.brix + ' ' + s.juiceType.value + '\n';
      this.state.email += 'NOTES: ' + s.description + '\n';
      this.state.email += 'LOT SPECIFIC: ' + ((s.isLotSpecific) ? 'YES' : 'NO');
      this.state.email += '\n\n';
    });
    callback(this.state.email);
  }



  findZipCode () {
    this.getCityState(this.state.zip, (err, data) => {
      if(err) {
        console.log('Could not get city state')
      } else {
        let city = data.results[0].address_components[1].long_name;
        let state = data.results[0].address_components[3].long_name;
        this.setState({ city: city, state: state });
      }
    })
  }

  goBack() {
    this.props.dispatch({ type: SampleActions.CLEAR_SAMPLES });
    this.props.dispatch({ type: NavActions.BACK });
  }

  render() {
    return(
      <View style={{ flex: 1 }} >
        <NavBar leftButton={<Image source={require('../../assets/icons/back-arrow.png')} style={styles.navButton}/>}
                leftOnPress={() => this.goBack()}
                title={<Text style={{color:'black', fontSize: 20, fontFamily: 'roboto-bold'}}>Request Sample</Text>}
        />
        <ScrollView style={styles.scrollContainer} >
          <KeyboardAwareScrollView style={{flex: 1}} behavior={'padding'} >
            <View style={{height:64}}></View>
            {this.fieldFactory('Requester', this.state.requester, (text) => this.setState({ requester: text }),0)}
            {this.fieldFactory('Company', this.state.company, (text) => this.setState({ company: text }),1)}
            {this.fieldFactory('ATTN #', this.state.attn, (text) => this.setState({ attn: text }),2)}
            {this.fieldFactory('Zip Code', this.state.zip, (text) => this.setState({ zip: text }),3)}
            {this.fieldFactory('City', this.state.city, (text) => this.setState({ city: text }),4)}
            {this.fieldFactory('State', this.state.state, (text) => this.setState({ state: text }),5)}
            {this.fieldFactory('Address', this.state.address, (text) => this.setState({ address: text }),6)}
            {this.fieldFactory('Phone #', this.state.phone, (text) => this.setState({ phone: text }),7, 'number-pad')}
            {this.fieldFactory('Broker', this.state.broker, (text) => this.setState({ broker: text }),8)}

            {this.props.samples.map((sample, index) => (
              <View style={{ marginTop: 16, marginBottom: 16, marginLeft: 32, marginRight: 32}} >
                <SampleItem editItem={() => this._editSample(index)} sample={sample} />
              </View>
            ))}




            <View style={styles.addButton} >
              <CalcButton title={'ADD SAMPLE'} onPress={() => this.setState({ sampleFormPresented: true })} />
            </View>

            <View style={styles.nextButton} >
              <CalcButton title={'NEXT'} onPress={() => this.showActionSheet()} />
            </View>
          </KeyboardAwareScrollView>

        </ScrollView>
        <Modal animationType={'slide'} transparent={false} visible={this.state.sampleFormPresented} >
          <SampleForm onEdit={false} dismiss={() => this.setState({ sampleFormPresented: false })} />
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch'
  },

  scrollContainer: {
    flex: 1
  },
  fieldContainer: {
    marginLeft: 32, marginRight: 32, marginBottom: 32,
    height: 64, justifyContent: 'center',
    borderBottomColor: Colors.PURPLE, borderBottomWidth: 2
  },
  field: {
    color: Colors.PURPLE, fontSize: 24, fontFamily: 'roboto-bold'
  },
  addButton: {
    marginLeft: 32, marginRight: 32, marginTop: 64, marginBottom: 32
  },
  nextButton: {
    marginLeft: 32, marginRight: 32, marginBottom: 32
  },
  navButton: {
    height: 24,
    width: 24,
    tintColor: 'black'
  }
});

var mapStateToProps = state => {
  return {
    samples: state.sample.samples
  }
}

export default connect(mapStateToProps)(RequestSampleScreen);
