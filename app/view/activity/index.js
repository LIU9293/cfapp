import React, { Component } from 'react';
import { View, Navigator, Text, StyleSheet } from 'react-native';
import { Container, Header, Button, Content, Title } from 'native-base';
import ActivityCards from './activityCards2';

class Activity extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <View style={{flex:1, marginBottom: 50}}>
        <Text style={styles.title}>活动</Text>
        <ActivityCards navigator = { this.props.navigator } />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title:{
    color: 'black',
    fontSize: 30,
    marginLeft: 20,
    fontWeight: 'bold',
    marginTop: 45,
    marginBottom: 30,
  }
})

module.exports = Activity
