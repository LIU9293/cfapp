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

class SetPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pass:"",
      passAgain:"",
      phone : this.props.telphone,
      code : this.props.code
    }
    this.nextStep = this.nextStep.bind(this);
  }

  nextStep(){
    let pass = this.state.pass
    let passAgain = this.state.passAgain
    if(pass == "" || passAgain == ""){
      this.props.showAlert("请填写正确的密码")
      return
    }
    if(pass !== passAgain){
      this.props.showAlert("两次密码不一致")
      return
    }
    userRegister(this.state.phone,this.state.code,pass,'','',(err,data) => {
      if(err){
        this.props.showAlert(err)
      }else {
        this.props.navigator.push({
          ident :'setuserinfo',
          userid : data.UserId
        })
      }
    })
  }

  render(){
    return(
      <View style={{flex:1}}>
        <GlobleAlert />
        <StatusBar barStyle="default"/>
        <Gradient>
        <Header style = {{backgroundColor:'transparent'}}>
          <Button transparent onPress={e=>{this.props.navigator.pop()}}>
              <Icon name='ios-arrow-back' style={{color: '#fff'}} size={26} />
          </Button>
          <Title></Title>
          <Text></Text>
        </Header>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Container style={{paddingHorizontal: 40, flex: 1}}>
            <View style={styles.infoBody}>
              <H1 style = {{color:'#fff'}}>账号密码</H1>
              <CFTextInputs onChangeText = {(text) => {
                this.setState({pass:text})
              }} style = {{marginTop : 60}} label = {"设置密码"} note = {null} placeholder = "设置密码" placeholderTextColor = "rgba(255,255,255,0.5)" color = "#fff" secureTextEntry = {true}/>

              <CFTextInputs onChangeText = {(text) => {
                this.setState({passAgain:text})
              }} style = {{marginTop : 30}} label = {"确认密码"} note = {null} placeholder = "确认密码"
              placeholderTextColor = "rgba(255,255,255,0.5)" color = "#fff" secureTextEntry = {true}
              onSubmitEditing = {e =>{this.nextStep()}}/>
              <Text style = {styles.loginButton} onPress = {e => {this.nextStep()}}>下一步</Text>
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
module.exports = connect(mapStateToProps,mapDispatchToProps)(SetPassword)
