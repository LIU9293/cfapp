import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';

export const Window = Dimensions.get('window');

export const Row = (props) => {
  if(props.children.length !== 2){
    console.warn('there must be 2 children in a Row');
  }
  return(
    <View {...props} style={[styles.row, props.style]}>
      {props.children}
    </View>
  )
}

export const Container = (props) => {
  return(
    <View {...props} style={[styles.container, props.style]}>
      {props.children}
    </View>
  )
}

export const Cell = (props) => {
  return(
    <View {...props} style={[styles.cell, props.style]}>
      {props.children}
    </View>
  )
}

export const Hr = (props) => {
  return(
    <View {...props} style={[styles.hr, props.style]} />
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  hr: {
    height: 1,
    flex: 1,
    backgroundColor: '#aaa',
    marginVertical: 20,
  },
})
