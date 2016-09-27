import React, { Component, } from 'react';
import { View,Image,TextInput,Text, Navigator, TouchableOpacity, StyleSheet, Dimensions, AsyncStorage,Alert,ScrollView,StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Container, Title, Button,Content} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {userLogin, getUserActivities, getUserInfo,
  getMyDiscoverFilterList, WXInfo, thirdLogin, bindAuthor, secretaryMessage,updateUserNickName } from 'connection';
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


class SetUserInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userid:this.props.userid,
      username :""
    }
    this.nextStep = this.nextStep.bind(this);
  }

  nextStep(){
    if(this.state.username.replace(" ","") === "")
    {
      this.props.showAlert("昵称不正确")
      return
    }else {
      updateUserNickName(this.state.userid,this.state.username,(err,data) =>{
        if(err){
          this.props.showAlert(err)
        }else {
          let UserID = this.state.userid
          AsyncStorage.setItem('UserID', UserID);
          getUserInfo(UserID, (err,data) => {
            if(err){
            } else {
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
                <H1 style = {{color:'#fff'}}>完成注册</H1>
                <CFTextInputs onChangeText = {(text) => {
                  this.setState({username:text})
                }} style = {{marginTop : 90}} label = {"昵称"} note = {null} placeholder = "昵称"
                placeholderTextColor = "rgba(255,255,255,0.5)" color = "#fff"
                onSubmitEditing = {e =>{this.nextStep()}}/>
                <Text style = {styles.loginButton} onPress = {e => {this.nextStep()}}>完成注册</Text>
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
    user: store.user,
    messages: store.secretaryMessage.data ,
  }
}

function mapDispatchToProps(dispatch){
  return{
    showAlert:(message) =>{dispatch({type:'SHOW_ALERT',message:message})},
    login: (userid,data) => {dispatch({type:'LOG_IN', userid:userid, userdata:data})} ,
    baoming: (id) => {dispatch({type:'JOIN_ACTIVITY', id: id})} ,
    startLoading: () => {dispatch({type:'START_LOADING'})},
    stopLoading: () => {dispatch({type:'STOP_LOADING'})},
    update_user_topic: (data) => {dispatch({type: "UPDATE_SELECTED_TOPICS",data: data})},
    update_messages: (data) => {dispatch({type:'UPDATE_SECRETARY_MESSAGE', data: data})},
  }
}
module.exports = connect(mapStateToProps,mapDispatchToProps)(SetUserInfo)
