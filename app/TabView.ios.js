import React, { Component, } from 'react';
import { Navigator, StyleSheet, View , Text, TabBarIOS, StatusBar } from 'react-native';
import Discover from './view/discover';
import Activity from './view/activity';
import Message  from './view/message' ;
import Profile  from './view/profile';
import { connect } from 'react-redux';

class TabViewIOS extends Component{

  constructor(props){
    super(props);
    this.state = {
      tab: 'FAXIAN'
    }
  }

  gotoProfile(){
    if(!this.props.user.login){
      this.props.navigator.push({
        ident: 'bindPhoneNumber'
      })
    } else {
      this.props.SET_LIGHT();
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
        <TabBarIOS
          tintColor="steelblue"
          translucent={false} >
          <TabBarIOS.Item
            selected={this.state.tab =="FAXIAN"}
            title={"发现"}
            onPress={()=>{
              this.props.SET_DEFAULT();
              this.setState({tab: 'FAXIAN'})
            }}
            icon={require('../images/icon/faxian.png')}>
            <Discover
            navigator = {this.props.navigator} />
          </TabBarIOS.Item>
          <TabBarIOS.Item
            selected={this.state.tab =="GUANGCHANG"}
            title={"活动"}
            onPress={()=>{
              this.props.SET_DEFAULT();
              this.setState({tab: 'GUANGCHANG'})
            }}
            icon={require('../images/icon/huodong.png')}>
            <Activity
            navigator = {this.props.navigator} />
          </TabBarIOS.Item>
          <TabBarIOS.Item
            selected={this.state.tab =="XIAOXI"}
            title={"消息"}
            badge={this.props.messageCount == 0 ? null : this.props.messageCount}
            onPress={()=>{
              this.props.SET_DEFAULT();
              this.setState({tab: 'XIAOXI'})
            }}
            icon={require('../images/icon/xiaoxi.png')}>
            <Message
            navigator = {this.props.navigator} />
          </TabBarIOS.Item>
          <TabBarIOS.Item
            selected={this.state.tab =="WODE"}
            title={"我的"}
            onPress={this.gotoProfile.bind(this)}
            icon={require('../images/icon/wode.png')}>
            <Profile
            navigator = {this.props.navigator} />
          </TabBarIOS.Item>
        </TabBarIOS>
      </View>
    )
  }
}

function mapStateToProps(store){
  return{
    user: store.user,
    StatusBarStyleIOS: store.StatusBarStyleIOS,
    messageCount: store.secretaryMessage.UnreadMessages,
  }
}
function mapDispatchToProps(dispatch){
  return{
    SET_DEFAULT: () => {dispatch({type: 'SET_DEFAULT'})},
    SET_LIGHT: () => {dispatch({type: 'SET_LIGHT'})}
  }
}
module.exports = connect(mapStateToProps,mapDispatchToProps)(TabViewIOS)
