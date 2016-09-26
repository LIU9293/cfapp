import React, { Component, } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Header extends Component{

  render(){
    return(
      <View style={styles.wapper}>
        <View style={styles.container}>
            {this.props.children}
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  wapper: {
    height: 64,
    paddingTop: 20,
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
})

module.exports = Header
