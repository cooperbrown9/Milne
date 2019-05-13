import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import * as Colors from '../theme/colors';

const TradeshowCard = props => (
  <View style={styles.container} >
    <TouchableOpacity style={styles.header} onPress={() => props.onPressHeader(props.tradeshow)} >
      <Text style={styles.headerText}>{props.tradeshow.name}</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => props.onPressCard(props.tradeshow)} style={styles.body} >
      <Text style={styles.location}>{props.tradeshow.location}</Text>
      <Text style={styles.location}>{props.tradeshow.city}, {props.tradeshow.state}</Text>
      <Text style={styles.date}>{props.tradeshow.cleanDate} - {props.tradeshow.cleanEndDate}</Text>
      <Text style={styles.description}>{props.tradeshow.description}</Text>
    </TouchableOpacity>
    {(props.isAdmin)
    ? <TouchableOpacity style={{height: 40, width: 100, backgroundColor: 'red', borderRadius: 10, justifyContent:'center',alignItems:'center' }} onPress={props.delete} >
        <Text style={{fontFamily:'roboto-bold', color: 'white', fontSize:18, textAlign: 'center'}}>DELETE</Text>
      </TouchableOpacity>
    : null
    }

  </View>
)

TradeshowCard.propTypes = {
  tradeshow: PropTypes.object,
  onPressCard: PropTypes.func,
  onPressHeader: PropTypes.func,
  delete: PropTypes.func,
  isAdmin: PropTypes.bool
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
    fontSize: 14, fontFamily: 'roboto-bold',
    backgroundColor: 'transparent', textAlign: 'center',
    marginBottom: 8, color: Colors.DARK_GREY
  },
});

export default TradeshowCard;
