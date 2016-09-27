import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView, Dimensions, PanResponder, StatusBar, WebView, TouchableOpacity } from 'react-native';
import { Container, Content, List, ListItem, Text, Icon, Badge, Header, Title, Button } from 'native-base';
const window = Dimensions.get('window');

class JoinActivitySuccessfulWithPayment extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <View style={{flex:1}}>
        <StatusBar
          showHideTransition={'fade'}
          animated={true}
          barStyle={'light-content'}
        />
      <Header style={{backgroundColor:'#0086fd'}}>
          <Title numberOfLines={1} style={{maxWidth: 280, color: '#fff', marginTop: 6,}}>{'报名成功'}</Title>
        </Header>
        <ScrollView style={styles.wapper}>
          <Image
            source={{url: this.props.data.ActivityPictureUrl + '@500h_800w_1e_1c_100q'}}
            resizeMode={"cover"}
            style={styles.cover}
          />
          <List style={{backgroundColor: '#fff', marginBottom: 20,}}>
            <ListItem iconLeft>
              <Icon name='md-calendar' />
              <Text>活动时间</Text>
              <Text>{this.props.data.ActivityStartDate}</Text>
            </ListItem>
            <ListItem iconLeft>
              <Icon name='md-clipboard' />
              <Text>订单号</Text>
              <Text>{this.props.orderID}</Text>
            </ListItem>
            <ListItem iconLeft>
              <Icon name='ios-cash' />
              <Text>支付金额</Text>
              <Text>{this.props.data.Fee}</Text>
            </ListItem>
          </List>
        </ScrollView>
        <TouchableOpacity style={styles.Bottom} onPress={e => this.props.navigator.resetTo({
            ident: 'home'
          })} >
          <Text style={{color:'#fff', fontSize:16}}>{'确定'}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wapper: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginBottom: 40,
  },
  Bottom: {
    position: 'absolute',
    bottom: 0,
    width: window.width,
    height: 40,
    backgroundColor: '#0086fd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cover: {
    height: 200,
    width: window.width,
    marginBottom: 20,
  },
})

module.exports = JoinActivitySuccessfulWithPayment
