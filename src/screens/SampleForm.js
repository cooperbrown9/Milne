import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';

import * as NavActions from '../redux/action-types/nav-action-types';
import * as Colors from '../theme/colors';
import * as SampleActions from '../redux/action-types/sample-request-action-types';

import NavBar from '../ui-elements/nav-bar';
import CalcButton from '../ui-elements/calc-button';

class SampleForm extends Component {
  constructor() {
    super();

    this.state = {
      quantity: "",
      size: "",
      description: "",
      brix: "",
      ess: ""
    }

    // sample object: {
    // quantity, size(oz), description, brix, ess
    //}
  }

  static propTypes = {
    onEdit: PropTypes.bool,
    sample: PropTypes.object,
    addSample: PropTypes.func,
    updateSample: PropTypes.func,
    deleteSample: PropTypes.func,
    dismiss: PropTypes.func,
  }

  componentWillMount() {
    if(this.props.onEdit) {

    }
  }

  addSample() {
    this.props.dispatch({
      type: SampleActions.ADD_SAMPLE,
      sample: {
        quantity: this.state.quantity, size: this.state.size,
        description: this.state.description, brix: this.state.brix,
        ess: this.state.ess
      }
    });
    this.props.dismiss();
  }

  fieldFactory(placeholder, text, keyboard, updateState) {
    return (
      <View style={styles.fieldContainer} >
        <TextInput
          selectionColor={Colors.PURPLE} autoCorrect={false}
          style={styles.field}
          placeholder={placeholder}
          onChangeText={(text) => updateState(text)}
          value={text}
          keyboardType={keyboard || 'default'}
          returnKeyType={'done'}
        />
      </View>
    )
  }

  render() {
    return(
      <View style={styles.container} >
        <ScrollView style={styles.container} >
          <View style={{height: 64}}></View>
          {this.fieldFactory('Quantity', this.state.quantity, 'numeric', (text) => this.setState({ quantity: text }))}
          {this.fieldFactory('Size', this.state.size, 'numeric', (text) => this.setState({ size: text }))}
          {this.fieldFactory('Description', this.state.description, 'default', (text) => this.setState({ description: text }))}
          {this.fieldFactory('Brix', this.state.brix, 'numeric', (text) => this.setState({ brix: text }))}
          {this.fieldFactory('ESS', this.state.ess, 'numeric', (text) => this.setState({ ess: text }))}

          <View style={styles.addButton} >
            <CalcButton title={(this.props.onEdit) ? 'UPDATE SAMPLE' : 'ADD SAMPLE'} onPress={() => this.addSample()} />
          </View>

          <View style={styles.cancelButton} >
            <CalcButton title={'CANCEL'} onPress={this.props.dismiss} />
          </View>

          {(this.props.onEdit)
            ? <View style={styles.deleteButton} >
                <CalcButton
                  title={'DELETE'}
                  onPress={() => this.props.deleteSample()}
                  backgroundColorOn={true}
                  backgroundColor={'red'}
                />
              </View>
            : null
          }
          <View style={{height: 32}}></View>
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
  console.log(state.sample.samples);
  return {
    samples: state.sample.samples
  }
}

export default connect(mapStateToProps)(SampleForm);
