import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

import { connect } from 'react-redux';
import { getAllJuices } from '../../api/api';
import * as CalcActions from '../../redux/action-types/calc-action-types';

class JuiceTab extends Component {

  constructor(props) {
    super(props);

    this.getAllJuices = getAllJuices.bind(this);

    this.state = {
      data: []
    }
  }

  static navigationOptions = {
    header: null
  }

  componentWillMount() {
    if(!this.props.dataLoaded) {
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
        // this.setState({ data: data.data });
        this.props.dispatch({ type: CalcActions.SET_DATA, data: data.data });

      } else {
        console.log('COULDNT GET JUICES', data);
      }
    });
  }

  setData = (row) => {
    // let data = this.state.data;
    let data = this.props.data;
    for(let i = 0; i < data.length; i++) {
      data[i].selected = false;
    }

    for(let j = 0; j< data.length; j++) {
      if(data[j].name === row.name) {
        data[j].selected = true;
        j = data.length;

        // this.setState({ data: data });
        this.props.dispatch({ type: CalcActions.SET_DATA, data: data });
        this.forceUpdate();
      }
    }
  }

  render() {
    return(
      <View style={styles.container} >
        <View style={styles.topView} >
          <Text style={{fontSize: 18, marginBottom: 8, textAlign:'center',color: 'rgb(200,200,200)'}}>Single Strength Brix Values</Text>
          <Text style={{fontSize: 14, textAlign: 'center', color: 'rgb(200,200,200)'}}>Select Juice to kjas lkdjf askjd faksjf</Text>
        </View>

        <ScrollView style={styles.list} >
          {(this.props.data.length !== 0) ? this.props.data.map((row) =>
            <TouchableOpacity onPress={() => { this.setData(row)} } style={{flexDirection:'row', flex: 1, marginBottom: 16}}>
              <Text style={(row.selected) ? styles.itemNameOn : styles.itemNameOff}>{row.name}</Text>
              <Text style={(row.selected) ? styles.itemBrixOn : styles.itemBrixOff}>{row.brix}</Text>
            </TouchableOpacity> ) : null
          }
        </ScrollView>

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
    flex: 1,
    flexDirection: 'column',
    marginBottom: 16
  }
})

var mapStateToProps = state => {
  return {
    dataLoaded: state.calc.dataLoaded,
    data: state.calc.data
  }
}

export default connect(mapStateToProps)(JuiceTab);
