import React, { Component, } from 'react';
import { Navigator, StyleSheet, View , Text, StatusBar } from 'react-native';
import Discover from './view/discover';
import Activity from './view/activity';
import Message  from './view/message' ;
import Profile  from './view/profile';
import { connect } from 'react-redux';
import TabBar from 'react-native-xtabbar';

class TabViewAndroid extends Component{

  constructor(props){
    super(props);
    this.state = {
      tab: 'FAXIAN'
    }
  }
  gotoProfile(){
    this.props.SET_LIGHT()
    if(!this.props.user.login){
      this.props.navigator.push({
        ident: 'login'
      })
    } else {
      this.setState({
        tab: 'WODE'
      })
    }
  }
  render(){
    return(
      <View style={{flex:1}}>
        <StatusBar
          showHideTransition={'fade'}
          animated={true}
          barStyle={this.props.StatusBarStyleIOS}
        />
        <TabBar
          onItemSelected={(index) => {console.log(`current item's index is ${index}`);}}
        >
          <TabBar.Item
            icon={require('../images/icon/faxian.png')}
            selectedIcon={require('../images/icon/faxian.png')}
            onPress={() => {
              this.props.SET_DEFAULT();
            }}
            title='发现'>
            <Discover
            navigator = {this.props.navigator} />
          </TabBar.Item>
          <TabBar.Item
            icon={require('../images/icon/huodong.png')}
            selectedIcon={require('../images/icon/huodong.png')}
            onPress={() => {
              this.props.SET_DEFAULT();
            }}
            title='活动'>
            <Activity
            navigator = {this.props.navigator} />
          </TabBar.Item>
          <TabBar.Item
            icon={require('../images/icon/xiaoxi.png')}
            selectedIcon={require('../images/icon/xiaoxi.png')}
            onPress={() => {
              this.props.SET_DEFAULT();
            }}
            title='消息'>
            <Message
            navigator = {this.props.navigator} />
          </TabBar.Item>
          <TabBar.Item
            icon={require('../images/icon/wode.png')}
            selectedIcon={require('../images/icon/wode.png')}
            title='我的'>
            <Profile
            navigator = {this.props.navigator} />
          </TabBar.Item>
        </TabBar>
      </View>
    )
  }
}
function mapStateToProps(store){
  return{
    user: store.user,
    StatusBarStyleIOS: store.StatusBarStyleIOS
  }
}
function mapDispatchToProps(dispatch){
  return{
    SET_DEFAULT: () => {dispatch({type: 'SET_DEFAULT'})},
    SET_LIGHT: () => {dispatch({type: 'SET_LIGHT'})}
  }
}
module.exports = connect(mapStateToProps,mapDispatchToProps)(TabViewAndroid)
