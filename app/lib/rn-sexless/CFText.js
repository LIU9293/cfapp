import React, { Compoent } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export const H1 = (props) => {
  return(
    <Text {...props} style={[styles.h1, props.style]} >
      {props.children}
    </Text>
  )
}

export const H2 = (props) => {
  return(
    <Text {...props} style={[styles.h2, props.style]} >
      {props.children}
    </Text>
  )
}

export const RowText = (props) => {
  return(
    <Text {...props} style={[styles.rowText, props.style]} >
      {props.children}
    </Text>
  )
}

export const P = (props) => {
  return(
    <Text {...props} style={[styles.p, props.style]} >
      {props.children}
    </Text>
  )
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  h2: {
    fontSize: 20,
    color: 'black',
  },
  rowText: {
    fontSize: 18,
    color: '#999',
  },
  p: {
    color: '#666',
    fontSize: 16,
  }
})
