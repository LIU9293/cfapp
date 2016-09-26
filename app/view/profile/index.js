import React, { Component, } from 'react';
import { View, Text, Navigator, Dimensions, Image, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Button, Content, Title } from 'native-base';
import ParallaxScrollView from '../common/parallaxScrollView';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabbarProfile from './tabbarProfile';
import Icon from 'react-native-vector-icons/Ionicons';
import Timeline from './timeline';
import UserArticle from './userArticle';
import UserCollect from './userCollect';

const bg = require('../../../images/logo/darkblue.png');
const notLogin = require('../../../images/logo/result@2x.png');
const window = Dimensions.get('window');
const styles = StyleSheet.create({
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 40,
  }
})

class Profile extends Component{

  render(){
    if(this.props.user.login){
      return(
        <View style={{ flex: 1, marginBottom: 50, }}>
          <Header style={{backgroundColor: '#1F415C', paddingTop: 20}}>
            <Button transparent>
              <Text></Text>
            </Button>
            <Title style={{color: '#fff', marginTop: 5}}>{this.props.user.userdata.nickName}</Title>
            <Button transparent onPress={e=>{this.props.navigator.push({
                ident: 'setting',
                sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
              })}}>
                <Icon name='ios-settings' size={26} style={{color: '#fff'}} />
            </Button>
          </Header>
          <ScrollableTabView style={{marginTop: -10}} renderTabBar={() => <TabbarProfile />} >
            <Timeline navigator = { this.props.navigator } tabLabel="动态" />
            <UserArticle navigator = { this.props.navigator } tabLabel="文章" />
            <UserCollect navigator = { this.props.navigator } tabLabel="收藏" />
          </ScrollableTabView>
        </View>
      )
    }
    return(
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={notLogin} style={{width: window.width/1.5}} resizeMode="contain" />
        <View style={{marginTop: 30,}}>
          <Button success onPress={e=>this.props.navigator.push({ident: 'login'})}>
            去登录
          </Button>
        </View>
      </View>
    )
  }
}

function mapStateToProps(store){
  return{
    user: store.user
  }
}

module.exports = connect(mapStateToProps)(Profile)
