import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, TouchableOpacity, Image, ListView, StyleSheet, Dimensions } from 'react-native';

import { connect } from 'react-redux';
import { getAllJuices } from '../../api/api';
import * as CalcActions from '../../redux/action-types/calc-action-types';

class JuiceTab extends Component {

  constructor(props) {
    super(props);

    this.getAllJuices = getAllJuices.bind(this);

    // this.state = {
    //   dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    // }
  }

  static navigationOptions = {
    header: null
  }

  componentWillMount() {
    if(!this.props.dataSourceLoaded) {
      this.loadJuices();
    }
  }

  // put everything on state
  loadJuices = () => {
    this.getAllJuices((success, data) => {
      if(success) {
        for(let i = 0; i < data.data.length; i++) {
          data.data[i].selected = false;
        }
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2});
        // this.setState({ dataSource: this.state.dataSource });
        var mappedData = data.data.map(fruit => fruit);
        this.props.dispatch({ type: CalcActions.SET_DATA_AND_SOURCE, data: data.data, dataSource: ds.cloneWithRows(mappedData) });

      } else {
        console.log('COULDNT GET JUICES', data);
      }
    });
  }

  setData = (row) => {
    let data = this.props.rawData;
    for(let i = 0; i < data.length; i++) {
      data[i].selected = false;
    }

    for(let j = 0; j< data.length; j++) {
      if(data[j].name === row.name) {
        data[j].selected = true;
        j = data.length;
        // debugger;
        this.selectJuice(data);
      }
    }
  }

  selectJuice = (data) => {
    let ds = this.props.dataSource;
    this.props.dispatch({ type: CalcActions.SET_DATA_AND_SOURCE, data: data, dataSource: ds.cloneWithRows(data) });
  }

  render() {
    return(
      <View style={styles.container} >
        <View style={styles.topView} >
          <Text style={{fontSize: 18, marginBottom: 8, textAlign:'center',color: 'rgb(200,200,200)'}}>Single Strength Brix Values</Text>
          <Text style={{fontSize: 14, textAlign: 'center', color: 'rgb(200,200,200)'}}>Select Juice to kjas lkdjf askjd faksjf</Text>
        </View>

        <ListView dataSource={this.props.dataSource} renderRow={(row) =>
            <TouchableOpacity onPress={() => this.setData(row)} style={{flexDirection:'row', flex: 1, marginBottom: 16}}>
              <Text style={(row.selected) ? styles.itemNameOn : styles.itemNameOff}>{row.name}</Text>
              <Text style={(row.selected) ? styles.itemBrixOn : styles.itemBrixOff}>{row.brix}</Text>
            </TouchableOpacity>

        } contentContainerStyle={styles.list} automaticallyAdjustContentInsets={false} >

        </ListView>
      </View>
    )
  }
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
    dataSourceLoaded: state.calc.dataSourceLoaded,
    rawData: state.calc.data
  }
}

export default connect(mapStateToProps)(JuiceTab);
