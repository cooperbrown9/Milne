import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

import { connect } from 'react-redux';

import * as Colors from '../theme/colors';

const SampleItem = props => (
  <View style={styles.container} >

    <View style={styles.topContainer} >
      <Text style={styles.description}>{'its lit dab fam its lit dab fam its lit dab fam  its lit dab fam its lit dab fam its lit dab fam its lit dab fam'}</Text>
    </View>

    <View style={styles.bottomContainer} >
      <View style={styles.fieldContainer} >
        <Text style={styles.dataText}>40.0</Text>
        <Text style={styles.dataField}>Brix</Text>
      </View>
      <View style={styles.fieldContainer} >
        <Text style={styles.dataText}>80.0</Text>
        <Text style={styles.dataField}>Quantity</Text>
      </View>
      <View style={styles.fieldContainer} >
        <Text style={styles.dataText}>10</Text>
        <Text style={styles.dataField}>Ess</Text>
      </View>
    </View>

  </View>
)

SampleItem.propTypes = {
  sample: PropTypes.object
}

const styles = StyleSheet.create({
  container: {
    height: 128,
    borderRadius: 8, backgroundColor: 'white'
  },
  description: {
    fontSize: 16, fontFamily: 'roboto-regular',
    marginLeft: 16, marginRight: 16, marginTop: 4
  },
  topContainer: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  bottomContainer: {
    flex: 1, flexDirection: 'row',
    justifyContent: 'space-around', alignItems: 'center'
  },
  fieldContainer: {
    height: 64, justifyContent: 'center', alignItems: 'center'
  },
  dataText: {
    fontFamily: 'roboto-bold', fontSize: 24,
    textAlign: 'center', color: Colors.PURPLE
  },
  dataField: {
    fontFamily: 'roboto-regular', fontSize: 12,
    textAlign: 'center', color: 'grey'
  }
});

export default SampleItem;
