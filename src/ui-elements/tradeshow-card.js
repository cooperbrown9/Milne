import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import * as Colors from '../theme/colors';

const TradeshowCard = props => (
  <View style={styles.container} >
    <View style={styles.header} >
      <Text style={styles.headerText}>{props.tradeshow.name}</Text>
    </View>

    <TouchableOpacity onPress={() => props.onPress(props.tradeshow)} style={styles.body} >
      <Text style={styles.location}>{props.tradeshow.location}</Text>
      <Text style={styles.location}>{props.tradeshow.city}, {props.tradeshow.state}</Text>
      <Text style={styles.date}>{props.tradeshow.cleanDate}</Text>
      <Text style={styles.description}>{props.tradeshow.description}</Text>
    </TouchableOpacity>
  </View>
)

TradeshowCard.propTypes = {
  tradeshow: PropTypes.object,
  onPress: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: Colors.LIGHT_GREY,
    overflow: 'hidden'
  },
  header: {
    height: 48,
    justifyContent: 'center',
    backgroundColor: Colors.PURPLE, overflow: 'hidden'
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'roboto-bold', textAlign: 'center', textAlignVertical: 'center',
    color: 'white'
  },
  body: {
    flex: 1,
    marginTop: 8, marginLeft: 8, marginRight: 8,
    overflow: 'hidden'
  },
  location: {
    fontSize: 18, fontFamily: 'roboto-bold',
    backgroundColor: 'transparent', textAlign: 'center',
    marginBottom: 8,
  },
  date: {
    fontSize: 18, fontFamily: 'roboto-bold',
    backgroundColor: 'transparent', textAlign: 'center',
    marginBottom: 8, marginTop: 8
  },
  description: {
    fontSize: 18, fontFamily: 'roboto-bold',
    backgroundColor: 'transparent', textAlign: 'center',
    marginBottom: 8,
  },
});

export default TradeshowCard;
