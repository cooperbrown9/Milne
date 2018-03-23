import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet, ListView } from 'react-native';
import { connect } from 'react-redux';

const BrixPicker = props => (
  <View style={styles.inputView} >

    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={styles.inputLabel}>Brix Value</Text>
      <Text style={styles.inputLabel}>{props.startingBrix}</Text>
    </View>

    <View style={styles.listContainer} >
      <ListView style={{backgroundColor: 'white', borderRadius: 8, marginRight: 8}} dataSource={props.wholeDataSource} renderRow={(num) =>
          <TouchableOpacity onPress={() => props.wholeBrixSelected(num)} >
            <Text style={styles.listText}>{num}</Text>
          </TouchableOpacity>
        }
      />
        <ListView style={{backgroundColor: 'white', borderRadius: 8, marginLeft: 8}} dataSource={props.decimalDataSource} renderRow={(decimal) =>
            <TouchableOpacity onPress={() => props.decimalBrixSelected(decimal)} >
              <Text style={styles.listText}>{decimal}</Text>
            </TouchableOpacity>
          } />
      </View>
  </View>
)

BrixPicker.propTypes = {
  wholeDataSource: PropTypes.object,
  decimalDataSource: PropTypes.object,
  wholeBrixSelected: PropTypes.func,
  decimalBrixSelected: PropTypes.func
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  listText: {
    fontSize: 32, fontFamily: 'roboto-bold',
    marginTop: 8, marginBottom: 8,
    textAlign: 'center'
  },
  inputView: {
    flex: 2,
    marginLeft: 32, marginRight: 32, marginTop: 16, marginBottom: 16
  },
  inputLabel: {
    marginBottom: 16,
    fontSize: 24, fontFamily: 'roboto-bold'
  },
  input: {
    color: 'black',
    fontWeight: 'bold', fontFamily: 'roboto-bold',
    fontSize: 32,
    borderBottomColor: 'black',
    borderBottomWidth: 2
  },
})

var mapStateToProps = state => {
  return {
    startingBrix: state.calc.startingBrix
  }
}

export default connect(mapStateToProps)(BrixPicker);
