import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions,TextInput } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class CFTextInputs extends Component {
  render(){
    const { style, textStyle, label, note, notePress, noteStyle } = this.props;
    return(
      <View style = {[styles.coverView, style]}>
        <Text style = {styles.title}>{label}</Text>
        <TextInput {...this.props} style={[styles.textinput, textStyle]} />
        <View style = {styles.line}></View>
        <Text style = {[styles.note, noteStyle]} onPress={notePress}>{note}</Text>
      </View>
    )
  }
}

const styles = {
  coverView:{
    flexDirection : 'column',
  },title:{
    color:'#fff',
    fontSize:14,
  },textinput:{
    height : 36,
    marginTop: 5,
    flex: 1
  },note:{
    color : '#fff',
    fontSize: 14,
  },line:{
    height : 1,
    backgroundColor : 'rgba(255,255,255,0.5)',
    flex: 1,
    marginBottom: 8
  }
}
module.exports = CFTextInputs
