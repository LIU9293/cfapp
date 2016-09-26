import React, { Component, } from 'react';
import { View,Image, Text,TextInput, Navigator, TouchableOpacity, StyleSheet, Dimensions, AsyncStorage,AlertIOS,StatusBar,ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { userLogin, getUserActivities, getUserInfo, getMyDiscoverFilterList ,
  WXInfo,thirdLogin,bindAuthor,userRegister,bindPhoneNumber, sendSMS, secretaryMessage } from 'connection';
import { Kohana } from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import GlobleAlert from '../common/MessageAlert';
import Gradient from '../common/gradientBackground';
import { Header, RoundButton, CFTextInputs, Container, Cell, H1 } from 'rn-sexless';
import Spacer from 'react-native-keyboard-spacer';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const blurImage = require('../../../images/logo/loginbj.png');
const logoImage = require('../../../images/logo/logopencil.png');

const styles = {
  infoBody:{
    width: width,
    paddingHorizontal:30,
    marginTop:30,
    flexDirection : 'column',
    justifyContent : 'space-between',
  },header:{
    flexDirection:'row',
    height:64,
    paddingTop:20,
    backgroundColor:'transparent',
    justifyContent :'flex-start',
    alignItems :'center'
  },center:{
    color:'#fff',
    fontSize:18,
    flex:1,
    textAlign : 'center',
    marginRight : 20
  },textInput:{
    height : 45,
    paddingVertical:10,
    color :'#fff'
  },line:{
    height:0.5,
    backgroundColor : '#f5f5f5'
  },code:{
    width :130,
    height : 45,
    paddingVertical:10,
    color :'#fff'
  },sendCode:{
    backgroundColor :'#2db7f5',
    width:100,
    height:30,
    marginVertical:7,
    borderRadius : 3
  }
}

const styless = {
  infoBody:{
    width: width,
    paddingHorizontal:30,
    marginTop:30,
    flexDirection : 'column',
    justifyContent : 'space-between',
  },header:{
    flexDirection:'row',
    height:64,
    paddingTop:20,
    backgroundColor:'transparent',
    justifyContent :'flex-start',
    alignItems :'center'
  },center:{
    color:'#fff',
    fontSize:18,
    flex:1,
    textAlign : 'center',
    marginRight : 20
  },textInput:{
    height : 45,
    paddingVertical:10,
    color :'#fff'
  },line:{
    height:0.5,
    backgroundColor : '#f5f5f5'
  },code:{
    width :130,
    height : 45,
    paddingVertical:10,
    color :'#fff'
  },sendCode:{
    backgroundColor :'#2db7f5',
    width:100,
    height:30,
    marginVertical:7,
    borderRadius : 3
  }
}

class BindPhoneNumbers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limitTime : 0,
      sendBtnEnabled:true,
      phone: null,
      varify: null,
      password: null,
    }
    this.AllTime = 120;
    this.sendCode = this.sendCode.bind(this);
    this.timeCutDown = this.timeCutDown.bind(this);
  }

  sendCode(){
    let phone = this.state.phone;
    if(phone === undefined){
      Alert.alert("请输入手机号");return;
    }
    let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/ //手机号码正则
    if(!phone.match(reg)){
      console.log("手机号不合法");return;
    }
    // this.timeCutDown();
    sendSMS(phone, '绑定手机', (err, data)=>{
      if(err){
        console.log(err)
      }else {
        this.timeCutDown();
      }
    })
  }

  timeCutDown(){
    this.AllTime -- ;
    if(this.AllTime <= 0){
      this.setState({
        limitTime : 0,
        sendBtnEnabled : true,
      })
      this.AllTime = 120
      return;
    }
    this.setState({
      limitTime : this.AllTime,
      sendBtnEnabled : false,
    })
    this.timer = setTimeout(()=>{
      this.timeCutDown();
    }, 1000);
  }

  componentWillUnmount(){
    this.timer && clearTimeout(this.timer);
  }

  regist(){
    let phone = this.state.phone;
    let code = this.state.varify;
    let pass = this.state.password;
    if(phone === undefined)
    {
        console.log("手机号不能为空");return;
    }
    let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/ //手机号码正则
    if(!phone.match(reg)){
      console.log("手机号不合法");return;
    }
    if(code === undefined){
      console.log("请输入验证码");return;
    }

    if(pass === undefined){
      console.log("请输入有效的密码");return;
    }
    let authorData = this.props.thirdInfo;
    bindPhoneNumber(authorData.OpendId, authorData.NickName, authorData.Sex, authorData.Soucre, phone, pass, code, authorData.C_ID, authorData.IOS_TOKEN, (err,data) => {
      if(err){
        console.log(err)
      }else {
        let userid = data.UserId
        AsyncStorage.setItem('UserID', userid);
        getUserInfo(userid, (err4,data4) => {
          if(err4){
            console.log("err4",err4);
          } else {
            console.log(data4)
            let userData = {
              avatar: data4.ZUT_HEADIMG,
              nickName: data4.ZUT_NICKNAME,
              phone: data4.ZUT_PHONE
            }
            this.props.login(userid, userData);
          }
        });
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

  render(){
    return(
      <View style={{flex:1}}>
        <Gradient>
          <Header style={{backgroundColor: 'transparent'}}>
            <TouchableOpacity onPress={e=>this.props.navigator.pop()}>
              <Icon name="ios-arrow-back" style={{color: 'white'}} size={22} />
            </TouchableOpacity>
            <View />
            <View />
          </Header>
          <Container style={{paddingHorizontal: 40, flex: 1}}>
            <H1 style = {{color:'#fff', marginTop: 20}}>绑定手机</H1>
            <CFTextInputs
              textStyle = {{color: 'white'}}
              style = {{marginTop: 30}}
              label = "电话号码"
              placeholder = ""
              placeholderTextColor = "rgba(255,255,255,0.5)"
              keyboardType = "numeric"
              note = {this.state.sendBtnEnabled ? '发送验证码' : '请等待' + this.state.limitTime + '秒后再发送'}
              notePress = { e => this.sendCode() }
              onChange={e => {this.setState({phone: e.nativeEvent.text})}}
            />
            <CFTextInputs
              textStyle = {{color: 'white'}}
              style = {{marginTop: 30, width: 100}}
              label = "验证码"
              placeholder = ""
              placeholderTextColor = "rgba(255,255,255,0.5)"
              keyboardType = "numeric"
              onChange={e => {this.setState({varify: e.nativeEvent.text})}}
            />
            <CFTextInputs
              textStyle = {{color: 'white'}}
              style = {{marginTop: 30}}
              label = "密码"
              placeholder = ""
              returnKeyType = "go"
              autoCorrect = {false}
              secureTextEntry = {true}
              placeholderTextColor = "rgba(255,255,255,0.5)"
              onChange={e => {this.setState({password: e.nativeEvent.text})}}
            />
            <RoundButton
              style={{position: 'absolute', bottom: 30}}
              onPress={e => this.regist.bind(this)}
            >
              绑定
            </RoundButton>
          </Container>
          <Spacer />
        </Gradient>
      </View>

    )
  }
}


function mapStateToProps(store){
  return{
    user: store.user
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

module.exports = connect(mapStateToProps,mapDispatchToProps)(BindPhoneNumbers)
