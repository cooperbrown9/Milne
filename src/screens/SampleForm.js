import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text, TouchableOpacity, TextInput, StyleSheet, Image, Picker } from 'react-native';
import { connect } from 'react-redux';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import * as NavActions from '../redux/action-types/nav-action-types';
import * as Colors from '../theme/colors';
import * as SampleActions from '../redux/action-types/sample-request-action-types';
import { JUICES } from '../util/initial-data';

import NavBar from '../ui-elements/nav-bar';
import CalcButton from '../ui-elements/calc-button';

class SampleForm extends Component {
  constructor() {
    super();

    this.state = {
      sample: {
        name: '',
        quantity: '',
        size: '',
        description: '',
        brix: '',
        ess: '',
      },
      selectedIndex: 0,
      selectedValue: '',
      juices: JUICES
    }

    for(let i = 0; i < this.state.juices.length; i++) {
      this.state.juices[i].selected = false;
    }
    this.state.juices[0].selected = true;

    this.inputs = [];

    // sample object: {
    // quantity, size(oz), description, brix, ess
    //}
  }

  static propTypes = {
    onEdit: PropTypes.bool,
    sampleToEdit: PropTypes.object,
    dismiss: PropTypes.func,
  }

  componentDidMount() {
    if(this.props.onEdit) {
      this.setState({ sample: this.props.sampleToEdit });
    }
  }

  addSample() {
    this.props.dispatch({
      type: SampleActions.ADD_SAMPLE,
      sample: this.state.sample
    });
    this.props.dismiss();
  }

  updateSample() {
    this.props.dispatch({
      type: SampleActions.UPDATE_SAMPLE,
      sample: this.state.sample
    });
    this.props.dismiss();
  }

  deleteSample() {
    this.props.dispatch({ type: SampleActions.DELETE_SAMPLE });
    this.props.dismiss();
  }

  pickerSelected(value, index) {
    this.setState({ selectedIndex: index, selectedValue: value, sample: {...this.state.sample, name: value } });
  }

  nextInput = (index) => {
    if(index !== 4) {
      this.inputs[index + 1].focus();
    }
  }

  fieldFactory(placeholder, text, keyboard, updateState, inputIndex) {
    return (
      <View style={styles.fieldContainer} >
        <TextInput
          selectionColor={Colors.PURPLE} autoCorrect={false}
          style={styles.field}
          placeholder={placeholder}
          onChangeText={(text) => updateState(text)}
          value={text}
          keyboardType={keyboard || 'default'}
          onEndEditing={() => this.nextInput(inputIndex)}
          ref={ref => { this.inputs.push(ref) }}
          returnKeyType={'done'}
        />
      </View>
    )
  }

  render() {
    return(
      <View style={styles.container} >
        <ScrollView style={styles.container} >
          <KeyboardAwareScrollView style={{ flex: 1 }} >
            <View style={{height: 64}}></View>
            <View style={styles.pickerContainer} >
              <Picker style={styles.picker} itemStyle={styles.pickerItem}
                onValueChange={(value, index) => this.pickerSelected(value, index)}
                selectedValue={this.state.selectedValue}
              >
                {this.state.juices.map(j => (
                  <Picker.Item label={j.name} value={j.name} />
                ))}
              </Picker>
            </View>

            {this.fieldFactory('Quantity', this.state.sample.quantity, 'numeric', (text) => this.setState({ sample: {...this.state.sample, quantity: text } }), 0)}
            {this.fieldFactory('Size', this.state.sample.size, 'numeric', (text) => this.setState({ sample: {...this.state.sample, size: text } }), 1)}
            {this.fieldFactory('Description', this.state.sample.description, 'default', (text) => this.setState({ sample: {...this.state.sample, description: text }}), 2)}
            {this.fieldFactory('Brix', this.state.sample.brix, 'numeric', (text) => this.setState({ sample: {...this.state.sample, brix: text }}), 3)}
            {this.fieldFactory('ESS', this.state.sample.ess, 'numeric', (text) => this.setState({ sample: {...this.state.sample, ess: text }}), 4)}

            <View style={styles.addButton} >
              <CalcButton
                title={(this.props.onEdit) ? 'UPDATE SAMPLE' : 'ADD SAMPLE'}
                onPress={() => {(this.props.onEdit) ? this.updateSample() : this.addSample()}}
              />
            </View>

            <View style={styles.cancelButton} >
              <CalcButton title={'CANCEL'} onPress={this.props.dismiss} />
            </View>

            {(this.props.onEdit)
              ? <View style={styles.deleteButton} >
                  <CalcButton
                    title={'DELETE'}
                    onPress={() => this.deleteSample()}
                    backgroundColorOn={true}
                    backgroundColor={'red'}
                  />
                </View>
              : null
            }
            <View style={{height: 32}}></View>
          </KeyboardAwareScrollView>
        </ScrollView>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.LIGHT_GREY
  },
  pickerContainer: {
    marginLeft:32,
    marginRight:32,
    marginBottom:16,
    backgroundColor:'white',
    borderRadius:8
  },
  picker: {
    flex: 1,
    marginLeft:8, marginRight:8,
    fontFamily:'roboto-bold'
  },
  pickerItem: {
    fontFamily:'roboto-bold'
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
    marginTop: 64, marginLeft: 32, marginRight: 32
  },
  cancelButton: {
    marginTop: 32, marginLeft: 32, marginRight: 32
  },
  deleteButton: {
    marginTop: 64, marginBottom: 32, marginLeft: 32, marginRight: 32
  }
});

var mapStateToProps = state => {
  return {
    samples: state.sample.samples,
    onEdit: state.sample.onEdit,
    sampleToEdit: state.sample.sampleToEdit
  }
}

export default connect(mapStateToProps)(SampleForm);
