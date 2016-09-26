import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity, Image, AsyncStorage, Alert } from 'react-native';
import * as wechat from 'react-native-wechat';
import Icon from 'react-native-vector-icons/Ionicons';
import { Container, Header, Window, Cell } from 'rn-sexless';
import Gradient from '../common/gradientBackground';
import { userLogin, getUserActivities, getUserInfo,
  getMyDiscoverFilterList, WXInfo, thirdLogin, bindAuthor, secretaryMessage } from 'connection';

const logo = require('../../../images/logo/logo-white.png');

class Welcome extends Component{
  constructor(props){
    super(props);
    this.wechatLogin = this.wechatLogin.bind(this)
  }
  wechatLogin(){
    wechat.isWXAppInstalled()
      .then(res => {
        if(res){
          wechat.sendAuthRequest("snsapi_userinfo","0744")
            .then(code => {
              WXInfo(code,(err,data,openid)=>{
                if(err){
                  console.log("err",err)
                }else {
                  //qq   weixin
                  thirdLogin(openid, "weixin", "", "", (err2,data2) => {
                    if(err2) {//没有这个用户
                        this.props.navigator.push({
                          ident : "bindPhoneNumber",
                          thirdInfo : {
                            OpendId :openid,
                            NickName : data.nickname,
                            Sex :data.sex+"",
                            Soucre : "weixin",
                            C_ID:"",
                            IOS_TOKEN:""
                          }
                        })
                    } else {
                      let userid = data2.UserId;
                      AsyncStorage.setItem('UserID', userid);
                      bindAuthor(openid, data.nickname, data.sex+"", "weixin", userid, (err3,data3) => {
                        getUserInfo(userid, (err4,data4) => {
                          if(err4){
                            console.log("err4",err4);
                          } else {
                            let userData = {
                              avatar: data.ZUT_HEADIMG,
                              nickName: data.ZUT_NICKNAME,
                              phone: data.ZUT_PHONE,
                              userDesc : data.UserDes,
                              wechat: data.IsBindWeChat,
                              qq: data.IsBindQQ,
                              linkedin: data.IsBindLinkedIn,
                            }
                            this.props.login(userid, userData);
                          }
                        })
                      });
                      getUserInfo(userid, (err4,data4) => {
                        if(err4){
                          console.log("err4",err4);
                        } else {
                          let userData = {
                            avatar: data.ZUT_HEADIMG,
                            nickName: data.ZUT_NICKNAME,
                            phone: data.ZUT_PHONE,
                            userDesc : data.UserDes,
                            wechat: data.IsBindWeChat,
                            qq: data.IsBindQQ,
                            linkedin: data.IsBindLinkedIn,
                          }
                          this.props.login(userid, userData);
                        }
                      })
                      getUserActivities(userid, (err,data) => {
                        if(err){console.log(err)} else {
                          data.UserActivityList.map((item,ii)=>{
                            this.props.baoming(item.ZET_ID)
                          })
                        }
                      })
                      getMyDiscoverFilterList(userid, (err, data) => {
                        if(err){console.log(err)} else {
                          let select = {};
                          data.ChannelList.map((item, ii)=>{
                            select[item.ChannelID] = item.ChannelName
                          })
                          this.props.update_user_topic(select);
                        }
                      })
                      secretaryMessage(userid, 'No', (err,data)=>{
                        if(err){
                          console.log(err);
                        } else {
                          if(data.List.length > 0){
                            AsyncStorage.setItem('Messages', JSON.stringify(this.props.messages.concat(data.List)))
                              .catch(err => console.log(err))
                              .done()
                            this.props.update_messages(this.props.messages.concat(data.List));
                          }
                        }
                      })
                      this.props.navigator.popToTop();
                    }
                  })
                }
              })
            })
            .catch(err => console.log(err))
        }
        else {
          Alert.alert('没有安装微信')
        }
      })
      .catch(err => console.log(err))
      .done()
  }

  render(){
    return(
      <View style={{flex: 1}}>
        <Gradient>
          <Header style={{backgroundColor: 'transparent'}}>
            <TouchableOpacity onPress={e => this.props.navigator.pop()}>
              <Icon name="ios-arrow-back" size={26} style={{color: 'white'}}/>
            </TouchableOpacity>
            <View />
            <View />
          </Header>
          <Cell style={{marginBottom: 30}}>
            <Image source={logo} style={styles.logo} resizeMode="contain" />
            <TouchableOpacity style={[styles.button, {backgroundColor: '#fff'}]} onPress={e => this.props.navigator.push({ident: 'login'})}>
              <Text style={{color: 'steelblue'}}>登录</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={e => this.wechatLogin()}>
              <Text style={{color: '#fff'}}>微信登录</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={e => this.props.navigator.push({ident: 'register'})}>
              <Text style={{color: '#fff'}}>注册账号</Text>
            </TouchableOpacity>
          </Cell>
        </Gradient>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 280,
    marginBottom: 50,
  },
  button: {
    height: 44,
    width: 280,
    borderRadius: 23,
    borderColor: 'white',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  }
})

function mapStateToProps(store){
  return{
    user: store.user ,
  }
}
function mapDispatchToProps(dispatch){
  return{
    login: (userid,data) => {dispatch({type:'LOG_IN', userid:userid, userdata:data})} ,
    baoming: (id) => {dispatch({type:'JOIN_ACTIVITY', id: id})} ,
    update_user_topic: (data) => {dispatch({type: "UPDATE_SELECTED_TOPICS",data: data})},
    update_messages: (data) => {dispatch({type:'UPDATE_SECRETARY_MESSAGE', data: data})},
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Welcome)
