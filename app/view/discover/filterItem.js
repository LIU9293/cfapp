'use strict'

import React, { Component, } from 'react';
import { View, Text, Navigator, StyleSheet, TouchableOpacity, } from 'react-native';

class FilterItem extends Component {

  render() {

    const {name, isChecked, color, onToggle} = this.props;
    const accessibilityTraits = ['button'];
    let style;

    if (isChecked) {
      accessibilityTraits.push('selected');
      style = {backgroundColor: color};
    } else {
      style = {borderColor: color, borderWidth: 1}
    }

    return (
      <TouchableOpacity
        accessibilityTraits={accessibilityTraits}
        activeOpacity={0.8}
        style={styles.container}
        onPress={onToggle}>
        <View style={[styles.checkbox, style]} />
        <Text style={styles.title}>
          {name}
        </Text>
      </TouchableOpacity>
    );
  }
}

const SIZE = 24;

var styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.8,
    borderBottomColor: '#aaa',
  },
  checkbox: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    marginRight: 10,
  },
  title: {
    fontSize: 17,
    color: '#333',
    flex: 1,
  },
});

module.exports = FilterItem;
