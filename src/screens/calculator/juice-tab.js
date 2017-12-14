import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, Image, ListView, StyleSheet, Dimensions } from 'react-native';

import { connect } from 'react-redux';

const JuiceTab = (props) => (
  <View style={styles.container} >
    <View style={styles.topView} >
      <Text style={{fontSize: 18, marginBottom: 8, textAlign:'center',color: 'rgb(200,200,200)'}}>Single Strength Brix Values</Text>
      <Text style={{fontSize: 14, textAlign: 'center', color: 'rgb(200,200,200)'}}>Select Juice to kjas lkdjf askjd faksjf</Text>
    </View>

    <View style={styles.listView}>

    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topView: {
    height: 64,
    marginTop: 32
  }
})

export default JuiceTab;
