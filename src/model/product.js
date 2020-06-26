import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, ScrollView, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
class Product extends Component {
  static propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
  }
  constructor(props) {
    super(props);

  }
}
export default Product;
