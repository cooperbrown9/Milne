import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

class ProductScreen extends Component {


  render() {
    return(
      <View style={styles.container} >
        <Text>buss uh on dee nihz</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue'
  }
});

export default ProductScreen;
