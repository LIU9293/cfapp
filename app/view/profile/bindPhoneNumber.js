import React, { Component, } from 'react';
import { View,Image, Text,TextInput, Navigator, TouchableOpacity, StyleSheet, Dimensions, AsyncStorage,AlertIOS } from 'react-native';
import { connect } from 'react-redux';
import { userLogin, getUserActivities, getUserInfo, getMyDiscoverFilterList ,
  WXInfo,thirdLogin,bindAuthor,userRegister,bindPhoneNumber, sendSMS, secretaryMessage } from 'connection';
import { Container, Header, Title, Button } from 'native-base';
import { Kohana } from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';


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
    }
    this.AllTime = 120;
    this.sendCode = this.sendCode.bind(this);
    this.timeCutDown = this.timeCutDown.bind(this);
    this.regist = this.regist.bind(this);
  }

  sendCode(){
    let phone = this.refs.phone._lastNativeText;
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
    let phone = this.refs.phone._lastNativeText;
    let code = this.refs.code._lastNativeText;
    let pass = this.refs.pass._lastNativeText;
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
    bindPhoneNumber(authorData.OpendId,authorData.NickName,authorData.Sex,authorData.Soucre,phone,pass,code,authorData.C_ID,authorData.IOS_TOKEN,(err,data) =>{
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

/*
<View style={{flex:1}}>
  <Image resizeMode = "cover" style = {{width : width,height : height,position :'absolute'}} source = {blurImage}/>
  <View style ={styles.header}>
    <TouchableOpacity onPress = {e=>{
      this.props.navigator.pop();
    }}>
      <Icon name = "ios-arrow-back-outline" size = {39} style = {{marginLeft:10,color:'#fff'}}/>
    </TouchableOpacity>
    <Text style = {styles.center}>账号绑定</Text>
  </View>

  <Image resizeMode = "contain" style = {{width : width ,marginTop:30 }} source = {logoImage}/>

  <View style = {styles.infoBody}>
    <TextInput ref = "phone" keyboardType = "numeric" placeholder = "手机号" maxLength = {11} style = {styles.textInput} placeholderTextColor ='#fff'/>
    <Text style = {styles.line}></Text>

    <View style = {{flexDirection : 'row',justifyContent:'space-between'}}>
      <TextInput placeholder = "验证码" ref = "code" keyboardType = "numeric" maxLength = {6} style = {styles.code} placeholderTextColor ='#fff'/>
      <Button disabled = {!this.state.sendBtnEnabled} style = {styles.sendCode} onPress = {e=>{
        this.sendCode()
      }}>{this.state.limitTime === 0 ?"获取验证码" : this.state.limitTime+" S"}</Button>
    </View>

    <Text style = {styles.line}></Text>
    <TextInput placeholder = "密码" ref = "pass" secureTextEntry = {true} style = {styles.textInput} placeholderTextColor ='#fff'/>
    <Text style = {styles.line}></Text>
    <Button style = {{width : (width - 60),backgroundColor :'#2db7f5',marginTop : 20}} onPress = {e=>{
      this.regist()
    }}>立即绑定</Button>
  </View>
</View>
*/

  render(){
    return(

      <View style={{flex:1,backgroundColor:'#fff'}}>
        <GlobleAlert />
        <StatusBar barStyle="default"/>
        <Container>
          <Header style={{backgroundColor: '#fff'}}>
            <Button transparent onPress={e=>{this.props.navigator.pop()}}>
                <Icon name='ios-arrow-back' style={{color: '#333'}} size={26} />
            </Button>
          </Header>
          <GlobleAlert AlertMessage = {this.state.err}/>
          <Content style = {{backgroundColor:'#fff'}}>
            <ScrollView style={{marginTop: 20}}>
            <View style = {styles.infoBody}>
              <TextInput ref = "phone" keyboardType = "numeric" placeholder = "手机号" maxLength = {11} style = {styles.textInput} placeholderTextColor ='#fff'/>
              <Text style = {styles.line}></Text>

              <View style = {{flexDirection : 'row',justifyContent:'space-between'}}>
                <TextInput placeholder = "验证码" ref = "code" keyboardType = "numeric" maxLength = {6} style = {styles.code} placeholderTextColor ='#fff'/>
                <Button disabled = {!this.state.sendBtnEnabled} style = {styles.sendCode} onPress = {e=>{
                  this.sendCode()
                }}>{this.state.limitTime === 0 ?"获取验证码" : this.state.limitTime+" S"}</Button>
              </View>

              <Text style = {styles.line}></Text>
              <TextInput placeholder = "密码" ref = "pass" secureTextEntry = {true} style = {styles.textInput} placeholderTextColor ='#fff'/>
              <Text style = {styles.line}></Text>
              <Button style = {{width : (width - 60),backgroundColor :'#2db7f5',marginTop : 20}} onPress = {e=>{
                this.regist()
              }}>立即绑定</Button>
            </View>
            </ScrollView>
          </Content>
        </Container>
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
    startLoading: () => {dispatch({type:'START_LOADING'})},
    stopLoading: () => {dispatch({type:'STOP_LOADING'})},
    update_user_topic: (data) => {dispatch({type: "UPDATE_SELECTED_TOPICS",data: data})},
    update_messages: (data) => {dispatch({type:'UPDATE_SECRETARY_MESSAGE', data: data})},
  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(BindPhoneNumbers)
