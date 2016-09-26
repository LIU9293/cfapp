import React, { Component, } from 'react';
import { View, Image, Text, Navigator, TouchableOpacity, StyleSheet, Dimensions, AsyncStorage,Alert, StatusBar, Platform, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { userLogin, getUserActivities, getUserInfo,
  getMyDiscoverFilterList, WXInfo, thirdLogin, bindAuthor, secretaryMessage } from 'connection';
import Icon from 'react-native-vector-icons/Ionicons';
import * as wechat from 'react-native-wechat';
import { CFTextInputs, H1, Container, P, Header } from 'rn-sexless';
import Spacer from 'react-native-keyboard-spacer';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import Gradient from '../common/gradientBackground';

class Login extends Component{

  constructor(props){
    super(props);
    this.state = {
      phone: null,
      password: null,
      err: null,
    }
  }

  login(){
    if(!this.state.phone){
      this.setState({err: '请填写手机号'});
    } else if (!this.state.password) {
      this.setState({err: '请填写密码'});
    } else {
      userLogin(this.state.phone, this.state.password, '','', (err,data) => {
        if(err){
          console.log(err)
          this.setState({err: err})
        } else {
          console.log(data)
          this.setState({err: null})
          let UserID = data.UserId;
          AsyncStorage.setItem('UserID', UserID);
          getUserInfo(UserID, (err,data) => {
            if(err){
              console.log(err);
            } else {
              console.log(data)
              let userData = {
                avatar: data.ZUT_HEADIMG,
                nickName: data.ZUT_NICKNAME,
                phone: data.ZUT_PHONE
              }
              this.props.login(UserID, userData);
            }
          })
          getUserActivities(UserID, (err,data) => {
            if(err){console.log(err)} else {
              data.UserActivityList.map((item,ii)=>{
                this.props.baoming(item.ZET_ID)
              })
            }
          })
          getMyDiscoverFilterList(UserID, (err, data) => {
            if(err){console.log(err)} else {
              let select = {};
              data.ChannelList.map((item, ii)=>{
                select[item.ChannelID] = item.ChannelName
              })
              this.props.update_user_topic(select);
            }
          })
          secretaryMessage(UserID, 'No', (err,data)=>{
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
  }

  render(){
    return(
      <View style={{flex:1}}>
        <Gradient>
           <Header style={{backgroundColor: 'transparent'}}>
             <TouchableOpacity onPress={e => this.props.navigator.pop()}>
               <Icon name="ios-arrow-back" size={26} style={{color: 'white'}}/>
             </TouchableOpacity>
             <View />
             <View />
          </Header>
          <Container style={{paddingHorizontal: 40, flex: 1}}>
            <H1 style = {{color:'#fff', marginTop: 20}}>登录</H1>
            <CFTextInputs
              textStyle = {{color: 'white'}}
              style = {{marginTop: 30}}
              label = "电话号码"
              placeholder = ""
              placeholderTextColor = "rgba(255,255,255,0.5)"
              keyboardType = "numeric"
              onChange={e => {this.setState({phone: e.nativeEvent.text})}}
            />
            <CFTextInputs
              textStyle = {{color: 'white'}}
              style = {{marginTop: 30}}
              label = "密码"
              placeholder = ""
              placeholderTextColor = "rgba(255,255,255,0.5)"
              returnKeyType = "go"
              autoCorrect = {false}
              secureTextEntry = {true}
              note = {this.state.err}
              noteStyle= {{color: 'red'}}
              onChange={e => {this.setState({password: e.nativeEvent.text})}}
              onSubmitEditing = {this.login.bind(this)}
            />
            <Text style={{color: '#fff', marginTop: 20}} onPress={e=>{this.props.navigator.push({ident : 'forgetPass'})}}>忘记密码</Text>
            <TouchableOpacity onPress={this.login.bind(this)} style={styles.loginButton}>
              <Text style={{color: '#fff', fontSize: 16}}>登录</Text>
            </TouchableOpacity>
          </Container>
          <Spacer />

        </Gradient>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor : 'transparent'
  },
  button:{
    width: (width - 60),
    marginLeft: 30,
    // marginTop : 0,
    backgroundColor: '#2db7f5'
  },
  warning:{
    color: 'red',
    fontSize: 14,
    marginTop: 20,
  },control:{
    width : (width - 60),
    marginTop : 15,
    flexDirection : 'row',
    justifyContent : 'space-between'
  },infoBody:{
    width: width,
    zIndex: 9999,
    paddingHorizontal:30,
    marginTop:50,
  },WXLogo:{
    width :56,
    height :56
  },
  loginButton:{
    height: 44,
    width: width - 80,
    borderRadius: 23,
    borderColor: 'white',
    borderWidth: 1,
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  }
})

function mapStateToProps(store){
  return{
    user: store.user ,
    messages: store.secretaryMessage.data ,
  }
}
function mapDispatchToProps(dispatch){
  return{
    login: (userid,data) => {dispatch({type:'LOG_IN', userid:userid, userdata:data})} ,
    baoming: (id) => {dispatch({type:'JOIN_ACTIVITY', id: id})} ,
    startLoading: () => {dispatch({type:'START_LOADING'})},
    stopLoading: () => {dispatch({type:'STOP_LOADING'})},
    update_user_topic: (data) => {dispatch({type: "UPDATE_SELECTED_TOPICS",data: data})},
    update_messages: (data) => {dispatch({type:'UPDATE_SECRETARY_MESSAGE', data: data})},
  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(Login)
