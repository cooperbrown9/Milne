import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import * as Colors from '../theme/colors';

const TradeshowCard = props => (
  <View style={styles.container} >
    <Text style={styles.header}>{props.tradeshow.name}</Text>

    <TouchableOpacity style={styles.body} >
      <Text style={styles.location}>{props.tradeshow.location}</Text>
      <Text style={styles.date}>{props.tradeshow.date}</Text>
      <Text style={styles.description}>{props.tradeshow.description}</Text>
    </TouchableOpacity>
  </View>
)

TradeshowCard.propTypes = {
  tradeshow: PropTypes.object
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: Colors.MID_GREY,
    overflow: 'hidden'
  },
  header: {
    fontSize: 24,
    fontFamily: 'roboto-bold', textAlign: 'center',
    height: 40,
    backgroundColor: Colors.PURPLE, color: 'white'
  },
  body: {
    flex: 1,
  },
  location: {
    fontSize: 18, fontFamily: 'roboto-bold',
    backgroundColor: 'transparent', textAlign: 'center'
  },
  date: {
    fontSize: 18, fontFamily: 'roboto-bold',
    backgroundColor: 'transparent', textAlign: 'center'
  },
  description: {
    fontSize: 18, fontFamily: 'roboto-bold',
    backgroundColor: 'transparent', textAlign: 'center'
  },
});

export default TradeshowCard;
