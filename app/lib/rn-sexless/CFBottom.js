import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, } from 'react-native';
import { Window } from './CFBase';

class Bottom extends Component{
  render(){
    if(this.props.children.length !== 3){
      console.warn('children length of CF Bottom must be 3 !!!');
    }
    return (
      <View style={[styles.wapper, this.props.style]}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.left} onPress={this.props.children[0].props.onPress}>
            {this.props.children[0]}
          </TouchableOpacity>
          <TouchableOpacity style={styles.middle} onPress={this.props.children[1].props.onPress}>
            {this.props.children[1]}
          </TouchableOpacity>
          <TouchableOpacity style={styles.right} onPress={this.props.children[2].props.onPress}>
            {this.props.children[2]}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wapper: {
    height: 44,
    backgroundColor: 'white',
    width: Window.width,
    position: 'absolute',
    bottom: 0,
  },
  row: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    height: 44,
    alignItems: 'center',
  },
  left: {
    width: 44,
    height: 44,
    justifyContent: 'center',
  },
  right: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  middle: {
    flex: 1,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

module.exports = Bottom
