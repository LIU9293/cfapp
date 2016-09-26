import React, { Compoent } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export const RoundButton = (props) => {
  return(
    <TouchableOpacity {...props} style={[styles.round, props.style]} >
      <Text style={[styles.text, props.textStyle]}>{props.children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  round: {
    height: 44,
    width: 280,
    borderRadius: 22,
    borderColor: 'white',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    color: '#fff',
  }
})
