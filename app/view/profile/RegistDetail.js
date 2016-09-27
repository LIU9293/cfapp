import React, { Component, } from 'react';
import { View,Image,TextInput,Text, Navigator, TouchableOpacity, StyleSheet, Dimensions, AsyncStorage,Alert,ScrollView,StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Container, Title, Button,Content} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {sendSMS, userRegister, updateUserNickName, getUserInfo} from 'connection';
import GlobleAlert from '../common/MessageAlert';
import {CFTextInputs,H1,Header} from 'rn-sexless';
import Gradient from '../common/gradientBackground';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = {
  infoBody:{
    width: width,
    // paddingHorizontal:40,
    marginTop:30,
    flexDirection : 'column',
    flex:1,
    width: (width - 80)
  },loginButton:{
    height: 46,
    width: (width - 80),
    borderRadius: 23,
    borderColor: 'white',
    borderWidth: 1,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'transparent',
    textAlign :'center',
    color:'#fff',
    fontSize:17,
    paddingTop:13
  }
}

class RegistDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      limitTime : null,
      sendBtnEnabled:true,
      telphone : this.props.telPhone,
      code:""
    }
    this.AllTime = 10;
    this.timer = null;
    this.sendCode = this.sendCode.bind(this);
    this.timeCutDown = this.timeCutDown.bind(this);
    this.nextStep = this.nextStep.bind(this);
  }

  sendCode(){
    let phone = this.state.telphone;
    sendSMS(phone, '注册', (err, data)=>{
      if(err){
        this.props.showAlert(err);return;
      }else {
        this.timeCutDown();
        this.props.showAlert("发送成功")
      }
    })
  }

  componentDidMount(){
    this.sendCode()
  }
  componentWillUnMount(){
    this.timer && clearTimeout(this.timer)
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

  nextStep(){
    if(this.state.code === ""){
      this.props.showAlert("请输入验证码")
    }else{
      this.props.navigator.push({
        ident:'setpass',
        telphone:this.state.telphone,
        code :this.state.code
      })
    }
  }

  render(){
    return(
      <View style={{flex:1}}>
        <GlobleAlert />
        <StatusBar barStyle="default"/>
        <Gradient>
        <Header style = {{backgroundColor:'transparent'}}>
          <TouchableOpacity onPress={e => this.props.navigator.popToTop()}>
            <Icon name="ios-arrow-back" size={26} style={{color: 'white'}}/>
          </TouchableOpacity>
          <Title></Title>
          <Text></Text>
        </Header>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Container style={{paddingHorizontal: 40, flex: 1}}>
              <View style={styles.infoBody}>
                <H1 style = {{color:'#fff'}}>验证账号</H1>
                <CFTextInputs onChangeText = {(text) => {
                  this.setState({code:text})
                }} style = {{marginTop : 60}} label = {"验证码"} placeholder = "验证码"
                notePress = {this.state.limitTime === 0?this.sendCode:null}
                note = {this.state.limitTime === 0 ? "未收到验证码?":("已发送至您的手机,"+this.state.limitTime+"秒后可在发送")}
                placeholderTextColor = "rgba(255,255,255,0.5)" color = "#fff" keyboardType = "numeric"/>
                <Text style = {styles.loginButton} onPress = {e => this.nextStep()}>下一步</Text>
              </View>
            </Container>
          </ScrollView>
          <KeyboardSpacer />
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
    showAlert:(message) =>{dispatch({type:'SHOW_ALERT',message:message})}
  }
}
module.exports = connect(mapStateToProps,mapDispatchToProps)(RegistDetails)
