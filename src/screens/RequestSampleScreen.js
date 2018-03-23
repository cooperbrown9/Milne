import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity, TextInput, StyleSheet, Image, Modal, Linking } from 'react-native';
import { connect } from 'react-redux';
import { Constants } from 'expo';

import * as NavActions from '../redux/action-types/nav-action-types';
import * as Colors from '../theme/colors';
import * as SampleActions from '../redux/action-types/sample-request-action-types';

import SampleForm from './SampleForm';
import NavBar from '../ui-elements/nav-bar';
import CalcButton from '../ui-elements/calc-button';
import SampleItem from '../ui-elements/sample-item';

// no ESS
class RequestSampleScreen extends Component {

  static navigationOptions = {
    header: null
  }

  constructor() {
    super();

    this.state = {
      sampleFormPresented: false,
      requester: "",
      date: new Date(),
      company: "",
      attn: "",
      address: "",
      phone: "",
      broker: "",
      samples: [

      ]
    }

    // sample object: {
    // quantity, size(oz), description, brix, ess
    //}
  }

  componentDidMount() {

  }

  openEmail = () => {
    Linking.openURL('mailto:cooperbrown9e@gmail.com?body=fsdafdf');
  }

  _editSample = (index) => {
    console.log(index);
    this.props.dispatch({ type: SampleActions.EDIT_SAMPLE, index: index });
    this.setState({ sampleFormPresented: true });
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
        />
      </View>
    )
  }

  render() {
    return(
      <View style={{ flex: 1 }} >
        <NavBar leftButton={<Image source={require('../../assets/icons/back-arrow.png')} style={styles.navButton}/>}
                leftOnPress={() => this.props.dispatch({ type: NavActions.BACK })}
                title={<Text style={{color:'black', fontSize: 20, fontFamily: 'roboto-bold'}}>Request Sample</Text>}
        />
        <ScrollView style={styles.scrollContainer} >
          <View style={{height:64}}></View>
          {this.fieldFactory('Requester', this.state.requester, (text) => this.setState({ requester: text }))}
          {this.fieldFactory('Company', this.state.company, (text) => this.setState({ company: text }))}
          {this.fieldFactory('ATTN #', this.state.attn, (text) => this.setState({ attn: text }))}
          {this.fieldFactory('Address', this.state.address, (text) => this.setState({ address: text }))}
          {this.fieldFactory('Phone #', this.state.phone, (text) => this.setState({ phone: text }))}
          {this.fieldFactory('Broker', this.state.broker, (text) => this.setState({ broker: text }))}

          {this.props.samples.map((sample, index) => (
            <View style={{ marginTop: 16, marginBottom: 16, marginLeft: 32, marginRight: 32}} >
              <SampleItem editItem={() => this._editSample(index)} sample={sample} />
            </View>
          ))}

          <View style={styles.addButton} >
            <CalcButton title={'ADD SAMPLE'} onPress={() => this.setState({ sampleFormPresented: true })} />
          </View>

          <View style={styles.nextButton} >
            <CalcButton title={'NEXT'} onPress={() => this.openEmail()} />
          </View>

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
    flex: 1
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
