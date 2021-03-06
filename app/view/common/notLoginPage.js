import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { RoundButton, Cell, P } from 'rn-sexless';

const notLogin = require('../../../images/logo/result@2x.png');

class NotLoginPage extends Component{
  render(){
    return(
      <Cell style={{backgroundColor: '#fff'}}>
        <Image source={notLogin} resizeMode="contain" style={{width: 300}} />
        <RoundButton
          style={{borderColor: '#0086fd',marginTop:30, width: 240, height: 40}}
          textStyle={{color: '#0086fd'}}
          onPress={e => this.props.navigator.push({ident:'welcome'})}
        >
          去登录
        </RoundButton>
          {this.props.children}
      </Cell>
    )
  }
}

module.exports = NotLoginPage
