import React,{ Component } from 'react';
import {View,Text} from 'react-native';

class UserCenter extends Component {
  constructor(props) {
      super(props);
  }
  render(){
    return(
      <View style = {{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Text>uid:{this.props.userid}</Text>
        <Text>User  Center</Text>
      </View>
    )
  }
}
module.exports = UserCenter
