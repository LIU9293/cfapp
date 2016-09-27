import React, { Component } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Cell } from 'rn-sexless';
import Icon from 'react-native-vector-icons/Ionicons';

class Disconnect extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <Cell style={[{backgroundColor: '#fff'}, this.props.style]}>
        <Text style={{marginBottom: 10, color: '#999'}}>
          网络貌似开了点小差～
        </Text>
      </Cell>
    )
  }
}

module.exports = Disconnect
