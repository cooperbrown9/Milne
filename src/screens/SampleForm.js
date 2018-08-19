import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text, TouchableOpacity, TextInput, StyleSheet, Image, Picker } from 'react-native';
import { connect } from 'react-redux';
import OptionView from '../ui-elements/option-view';

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
        sizeLabel: 'OZ',
        description: '',
        brix: '',
        ess: '',
        juiceType: { value: '', index: 0}
      },
      juiceTypes: [
        { value: 'NFC Juice', index: 0, selected: false },
        { value: 'Juice Concentrate', index: 1, selected: false },
        { value: 'NFC Puree', index: 2, selected: false },
        { value: 'Puree Concentrate', index: 3, selected: false },
        { value: 'Other', index: 4, selected: false }
      ],
      sizes: [
        { value: 'OZ', index: 0, selected: true },
        { value: 'LBS', index: 1, selected: false },
        { value: 'Other', index: 2, selected: false }
      ],
      sizeLabel: 'OZ',
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
      this.state.sizes.map((size) => {
        size.selected = false;
      });
      this.setState({ sample: this.props.sampleToEdit, juiceType: this.state.juiceTypes, sizes: this.state.sizes, sizeLabel: this.state.sizeLabel });

      // setTimeout(() => {
      //   this.state.juiceTypes[this.props.sampleToEdit.juiceType.index].selected = true;
      //   this.state.sizes[this.props.sampleToEdit.sizeIndex].selected = true;
      //   this.state.sizeLabel = this.state.sizes[this.props.sampleToEdit.sizeIndex].value;
      // })
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
    // if(index !== 4) {
      // this.inputs[index + 1].focus();
    // }
  }

  onSelectOption(index, array) {
    OptionView.selected(array, index, (arr) => {
      this.setState({ juiceTypes: array, sample: { ...this.state.sample, juiceType: {value: arr[index].value, index: index} } });
    })
  }

  onSizeSelected() {
    for(let i = 0; i < this.state.sizes.length; i++) {
      if(this.state.sizes[i].selected) {
        this.state.sizes[i].selected = false;

        // if end of array, make it the first value
        if(i === 2) {
          this.state.sizes[0].selected = true;
          this.setState({ sizes: this.state.sizes, sample: { ...this.state.sample, sizeLabel: this.state.sizes[0].value, sizeType: {value: this.state.sizes[0].value, index: 0}} })
        } else {
          this.state.sizes[i].selected = false;
          this.state.sizes[i+1].selected = true;
          this.setState({ sizes: this.state.sizes, sample: { ...this.state.sample, sizeLabel: this.state.sizes[i+1].value, sizeType: {value:this.state.sizes[i+1].value, index: i+1}} })
          return;
        }
      }

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
            {/*<View style={styles.pickerContainer} >
              <Picker style={styles.picker} itemStyle={styles.pickerItem}
                onValueChange={(value, index) => this.pickerSelected(value, index)}
                selectedValue={this.state.selectedValue}
              >
                {this.state.juices.map(j => (
                  <Picker.Item label={j.name} value={j.name} />
                ))}
              </Picker>
            </View>*/}

            {this.fieldFactory('Product', this.state.sample.name, 'default', (text) => this.setState({ sample: {...this.state.sample, name: text } }), 0)}
            {this.fieldFactory('Quantity', this.state.sample.quantity, 'numeric', (text) => this.setState({ sample: {...this.state.sample, quantity: text } }), 1)}
            {/*this.fieldFactory('Size', this.state.sample.size, 'numeric', (text) => this.setState({ sample: {...this.state.sample, size: text } }), 2)*/}
            <View style={styles.fieldContainer} >
              <TextInput
                selectionColor={Colors.PURPLE}
                style={styles.field}
                placeholder={'Size'}
                onChangeText={(text) => this.setState({ sample: {...this.state.sample, size: text }})}
                value={this.state.sample.size}
                keyboardType={'number-pad'}
                onEndEditing={() => this.nextInput(3)}
                ref={ref => { this.inputs.push(ref) }}
                returnKeyType={'done'}
              />
            <TouchableOpacity style={styles.sizeOptionContainer} onPress={() => this.onSizeSelected()}>
                <Text style={styles.sizeLabel}>{(this.state.sample.sizeLabel)}</Text>
              </TouchableOpacity>
            </View>
            {this.fieldFactory('Description', this.state.sample.description, 'default', (text) => this.setState({ sample: {...this.state.sample, description: text }}), 3)}
            {this.fieldFactory('Brix', this.state.sample.brix, 'numeric', (text) => this.setState({ sample: {...this.state.sample, brix: text }}), 4)}

            <View style={styles.optionContainerBase} >
              <View style={styles.optionView} >
              <Text style={styles.optionLabel}>Juice Type</Text>
                <View style={styles.optionContainer} >
                  <OptionView options={this.state.juiceTypes} selectOption={(index) => this.onSelectOption(index, this.state.juiceTypes)} />

                </View>
              </View>


            </View>

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
  sizeLabel: {
    fontSize: 24, color: 'white', textAlign: 'center',
    fontFamily: 'roboto-bold'
  },
  sizeOptionContainer: {
    height: 40, width: 100,
    position: 'absolute', right: 16, top: 16,
    justifyContent: 'center',
    backgroundColor: Colors.GREEN,
    borderRadius: 10, zIndex: 100000, shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 4, width: 4 }, // IOS
    shadowOpacity: 0.5, // IOS
    shadowRadius: 1, //IOS
  },
  optionContainer: {
    flex: 1
  },
  optionLabel: {
    fontSize: 18, fontFamily: 'roboto-regular',
    color: 'white',
    color: Colors.DARK_GREY, marginBottom: 8, marginLeft: 16
  },
  optionView: {
    flex: 1,
    justifyContent: 'center', alignItems: 'stretch',
    marginBottom: 16, marginLeft: 16, marginRight: 16
  },
  optionContainerBase: {
    height: 180,
    alignItems: 'stretch'
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
