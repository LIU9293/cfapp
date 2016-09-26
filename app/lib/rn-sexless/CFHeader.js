import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

class Navbar extends Component{
  render(){
    if(this.props.children.length !== 3){
      console.warn('children length of CF Header must be 3 !!!');
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
    height: 64,
    paddingTop: 20,
    backgroundColor: 'white',
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

module.exports = Navbar
