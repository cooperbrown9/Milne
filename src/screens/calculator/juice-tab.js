import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, TouchableOpacity, Image, ListView, StyleSheet, Dimensions } from 'react-native';

import { connect } from 'react-redux';

const JuiceTab = (props) => (
  <View style={styles.container} >
    <View style={styles.topView} >
      <Text style={{fontSize: 18, marginBottom: 8, textAlign:'center',color: 'rgb(200,200,200)'}}>Single Strength Brix Values</Text>
      <Text style={{fontSize: 14, textAlign: 'center', color: 'rgb(200,200,200)'}}>Select Juice to kjas lkdjf askjd faksjf</Text>
    </View>

    <ListView dataSource={props.dataSource} renderRow={(row) =>
        <TouchableOpacity onPress={() => JuiceTab.setData(props, row)} style={{flexDirection:'row', flex: 1, marginBottom: 16}}>
          <Text style={(row.selected) ? styles.itemNameOn : styles.itemNameOff}>{row.name}</Text>
          <Text style={(row.selected) ? styles.itemBrixOn : styles.itemBrixOff}>{row.brix}</Text>
        </TouchableOpacity>

    } contentContainerStyle={styles.list} automaticallyAdjustContentInsets={false} >

    </ListView>
  </View>
)

JuiceTab.setData = (props, data) => {

  for(let i = 0; i < props.rawData.length; i++)
    props.rawData[i].selected = false;

  for(let i = 0; i < props.rawData.length; i++) {
    if(props.rawData[i].name === data.name) {
      props.rawData[i].selected = true;
      i = props.rawData.length;
      props.onSelect(props.rawData);
    }
  }
}

JuiceTab.propTypes = {
  dataSource: PropTypes.func,
  onSelect: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemBrixOff: {
    flex:1,
    marginRight:32,
    fontSize: 28,
    color: 'rgb(200,200,200)',
    textAlign:'right',
    fontWeight: 'bold'
  },
  itemNameOff: {
    flex:1,
    marginLeft: 32,
    fontSize: 28,
    color: 'rgb(200,200,200)',
    fontWeight: 'bold'
  },
  itemBrixOn: {
    flex:1,
    marginRight:32,
    fontSize: 28,
    color: 'black',
    textAlign:'right',
    fontWeight: 'bold'
  },
  itemNameOn: {
    flex:1,
    marginLeft: 32,
    fontSize: 28,
    color: 'black',
    fontWeight: 'bold'
  },
  topView: {
    height: 64,
    marginTop: 32
  },
  list: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 16
  }
})

var mapStateToProps = state => {
  return {
    dataSource: state.calc.dataSource,
    rawData: state.calc.data
  }
}

export default connect(mapStateToProps)(JuiceTab);
