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
    flexDirection :'row',
    height: 46,
    width: (width - 80),
    borderRadius: 23,
    borderColor: 'white',
    borderWidth: 1,
    marginTop: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'transparent',
    textAlign :'center',
    color:'#fff',
    fontSize:17,
    paddingTop:13
  }
}


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limitTime : 0,
      sendBtnEnabled:true,
      telphone : "",
      btnEnabled : true,
    }
    this.sendCode = this.sendCode.bind(this);
  }

  sendCode(){
    let phone = this.state.telphone;
    if(phone === ""){
      this.props.showAlert("手机号不能为空");return;
    }
    let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/ //手机号码正则
    if(!phone.match(reg)){
      this.props.showAlert("手机号不合法");return;
    }
    this.setState({btnEnabled:false})
    sendSMS(phone, '注册', (err, data)=>{
      if(err){
        this.props.showAlert(err);return;
      }else {
        this.props.navigator.push({
          ident:'registSendCode',
          telPhone:phone
        })
      }
    })
  }

  render(){
    return(
      <View style={{flex:1}}>
        <GlobleAlert />
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
                  <H1 style = {{color:'#fff', marginTop: 15}}>注册</H1>
                  <CFTextInputs onChangeText = {(text) => {
                    this.setState({telphone:text})
                  }} style = {{marginTop : 60}} label = {"电话号码"} color = "#fff" maxLength = {11} keyboardType = "numeric" note = {null} placeholder = "电话号码" placeholderTextColor = "rgba(255,255,255,0.5)"
                  onSubmitEditing = {e =>{this.sendCode()}}/>
                  <Text transparent style = {styles.loginButton} onPress = {e => {this.state.btnEnabled ? this.sendCode(): null}}>下一步</Text>
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
module.exports = connect(mapStateToProps,mapDispatchToProps)(Register)
