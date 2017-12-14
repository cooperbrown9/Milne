import React, { Component } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import NavBar from '../../ui-elements/nav-bar';
import CalcButton from '../../ui-elements/calc-button';
import * as NavActions from '../../redux/action-types/nav-action-types';
import * as CalcActions from '../../redux/action-types/calc-action-types';

class StartCalculator extends Component {
  static navigationOptions = {
    header: null
  }

  state = {
    brix: 0.0
  }

  _navigateCalc = () => {
    this.props.dispatch({ type: CalcActions.SET_BRIX, brix: this.state.brix });
    this.props.dispatch({ type: NavActions.MAIN_CALC, brix: this.state.brix });
  }

  render() {
    return(
      <View style={styles.container} >
        <NavBar leftButton={<Image source={require('../../../assets/icons/search.png')} style={styles.navButton}/>}
                rightButton={<Image source={require('../../../assets/icons/bars.png')} style={styles.navButton}/>}
                leftOnPress={() => {}}
                rightOnPress={() => {}}
                title={<Text style={{color:'black', fontSize: 20}}>Starting Value</Text>}
        />

      <View style={styles.inputView} >
          <Text style={styles.inputLabel}>Starting Brix Value</Text>
          <TextInput onChangeText={(text) => this.setState({ brix: text })} keyboardType={'numeric'} style={styles.input} />
      </View>

      <View style={styles.nextButton} >
        <CalcButton onPress={this._navigateCalc.bind(this)} title={'NEXT ->'}/>
      </View>

      </View>
    );
  }
}

const FRAME = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputView: {
    position: 'absolute',
    left: 32,
    right: 32,
    top: FRAME.height / 2 - 100,
    height: 100
  },
  inputLabel: {
    marginBottom: 16,
    fontSize: 18
  },
  input: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 32,
    borderBottomColor: 'black',
    borderBottomWidth: 2
  },
  nextButton: {
    position: 'absolute',
    justifyContent: 'flex-start',
    top: FRAME.height / 2 + 16,
    left: FRAME.width / 2,
    right: 16
  },
  navButton: {
    height: 22,
    width: 22,
    tintColor: 'black'
  }
});


var mapStateToProps = state => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(StartCalculator);
