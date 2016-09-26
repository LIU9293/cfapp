import React, { Component } from 'react';
import { Container, Button, Content, Title } from 'native-base';
import { View, StyleSheet, ScrollView, Text, Image, StatusBar, Dimensions, TextInput,TouchableOpacity,Alert,AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { getUserInfo,updateUserNickName,SetUserDes,postUserAvatar,WXInfo,bindAuthor} from 'connection';
import GlobleAlert from '../common/MessageAlert';
import imagePicker from 'react-native-image-picker';
import * as wechat from 'react-native-wechat';
import { Header } from 'rn-sexless';
const window = Dimensions.get('window');

class Setting extends Component{
  constructor(props){
    super(props);
    this.state = {
      err:null,
      nickName: this.props.user.userdata.nickName,
      userSign: this.props.user.userdata.userDesc,
      phoneNum: this.props.user.userdata.phone,
      WXBinded:0,//0 未绑定   1:已绑定
    }
    this.submitNickName = this.submitNickName.bind(this);
    this.submitUserSign = this.submitUserSign.bind(this);
    this.userLoginOut = this.userLoginOut.bind(this);
    this.chooseImage = this.chooseImage.bind(this);
    this.bindWX = this.bindWX.bind(this);
  }
  submitUserSign(){
    if(this.state.userSign === this.props.user.userdata.userDesc){
      return;
    }
    if(this.state.userSign!=='还没有签名，请添加' && this.state.userSign!==''){
      if(this.state.userSign.length > 40 || this.state.userSign.length < 2){
        this.props.showAlert("个性签名的长度为2-40")
      }else{
        SetUserDes(this.props.user.userid,this.state.userSign,(err,data)=>{
          if(err){
            this.props.showAlert(err)
          }else {
            this.props.showAlert("个性签名修改成功")
            this.props.login(this.props.user.userid,{...this.props.user.userdata,userDesc:this.state.userSign})
          }
        })
      }
    } else {
      this.props.showAlert("请输入正确的个人描述")
    }
  }
  bindWX(){
    wechat.isWXAppInstalled()
    .then(res =>{
      if(res){
        wechat.sendAuthRequest("snsapi_userinfo","0745")
        .then(code => {
          WXInfo(code,(err,data,openid) => {
            if(err){
              this.props.showAlert("获取信息失败，请重试")
            }
            else {
              //开始绑定
              bindAuthor(openid,data.nickname,data.sex+"","weixin",this.props.user.userid,(err2,data2) =>{
                if(err2){
                  this.props.showAlert(err2)
                }else {
                  this.props.showAlert("绑定成功")
                }
              })
            }
          })
        })
        .catch(err =>{console.log(err)})
      }else {
        Alert.alert("还没有安装微信")
      }
    })
  }
  submitNickName(){
    if(this.state.nickName === this.props.user.userdata.nickName){
      return;
    }
    if(this.state.nickName!==''){
      if(this.state.nickName.length > 16 || this.state.nickName.length < 2){
        this.props.showAlert("昵称的长度为2-16")
      }else {
        updateUserNickName(this.props.user.userid,this.state.nickName,(err,data)=>{
          if(err){
            this.props.showAlert(err)
          }else {
            this.props.showAlert("昵称修改成功")
            this.props.login(this.props.user.userid,{...this.props.user.userdata,nickName:this.state.nickName})
          }
        })
      }
    } else {
      this.props.showAlert("请输入正确的昵称")
    }
  }
  chooseImage(){
    var options = {
      title: '选择上传图片',
      takePhotoButtonTitle :'相机',
      chooseFromLibraryButtonTitle :'相册',
      cancelButtonTitle :'取消',
      allowsEditing:true,
      quality:0.1
    };
    imagePicker.showImagePicker(options, (response) => {
     if (response.didCancel) {
       this.props.showAlert("取消选择图片")
     }
     else if (response.error) {
       this.props.showAlert("程序出错:"+response.error)
     }
     else {
       postUserAvatar(this.props.user.userid,","+response.data,(err,data)=>{
         if(err){
           this.props.showAlert(err)
         }else {
           getUserInfo(this.props.user.userid,(err2,data2)=>{
             if(err2) {

             }else {
               this.props.login(this.props.user.userid,{...this.props.user.userdata,avatar:data2.ZUT_HEADIMG})
             }
           })
         }
       })
     }
   });
  }
  userLoginOut(){
    AsyncStorage.removeItem('UserID');
    AsyncStorage.removeItem('Messages');
    this.props.logout();
    this.props.clearMessage();
    this.props.navigator.popToTop();
  }
  render(){
    if(!this.props.user.login){
      return(
        <View />
      )
    }
    return(
      <View style={{flex:1,backgroundColor:'#fff'}}>
        <GlobleAlert />
        <StatusBar barStyle="default"/>
        <Header>
          <View />
          <View />
          <TouchableOpacity transparent onPress={e=>{this.props.navigator.pop()}}>
              <Icon name='ios-arrow-down' style={{color: '#333'}} size={26} />
          </TouchableOpacity>
          {/*<Button transparent textStyle = {{color:'#333',fontSize : 16}} onPress = {e =>{
            this.props.navigator.push({
              ident :'modifyPass'
            })
          }}>修改密码</Button>*/}
        </Header>
        <Content style = {{backgroundColor:'#fff'}}>
          <ScrollView style={{marginTop: 20}}>
            <Text style={styles.title}>设置</Text>
            <View style={[styles.row, {height:90}]}>
              <Text style={styles.rowLabel}>头像</Text>
              <TouchableOpacity onPress={this.chooseImage}>
                <Image source={{uri: this.props.user.userdata.avatar || ''}} style={{height:60, width:60, borderRadius:30}} />
              </TouchableOpacity>
            </View>
            <View style={styles.border} />
            <View style={styles.row}>
              <Text style={styles.rowLabel}>昵称</Text>
              <TextInput
                style={styles.textInput}
                value={this.state.nickName}
                onChangeText={(text)=>{
                  this.setState({nickName: text})
                }}
                onBlur={this.submitNickName}/>
            </View>
            <View style={styles.border} />
            <View style={styles.row}>
              <Text style={styles.rowLabel}>个人描述</Text>
              <TextInput
                style={styles.textInput}
                value={this.state.userSign}
                placeholder={'请写下个人描述'}
                placeholderTextColor={'#aaa'}
                onChangeText={(text)=>{
                  this.setState({userSign: text})
                }}
                multiline={true}
                onBlur={this.submitUserSign}/>
            </View>
            <View style={styles.border} />
            <View style={styles.row}>
              <Text style={styles.rowLabel}>手机号</Text>
              <TouchableOpacity onPress = {e => {
                this.props.navigator.push({
                  ident:'rebindphonenum'
                })
              }}>
                <TextInput style={styles.textInput} editable = {false} transparent textStyle = {{color:'#aaa'}} value = {this.state.phoneNum} />
              </TouchableOpacity>
            </View>
            <View style={styles.border} />
            <View style={styles.row}>
              <Text style={styles.rowLabel}>微信绑定</Text>
              <Button transparent textStyle = {{color:this.state.WXBinded === 0 ?'#2db7f5':'#aaa'}}
                disabled={this.props.user.userdata.wechat === 0 ? false : true}
                onPress = {e=>{this.bindWX()}}>
                {this.props.user.userdata.wechat === 0 ? "去绑定":"已绑定"}
              </Button>
            </View>
            <Button style = {{width : (window.width - 40),backgroundColor :'#ddd',marginTop : 30,marginHorizontal : 20, borderRadius: 0, shadowRadius: 0}}
              textStyle = {{color:'#fff'}} onPress = {e=>{
              Alert.alert("确定退出?",null,[
                  {text: '取消'},
                  {text: '确定', onPress: () => this.userLoginOut()},
                ])
            }}>退出账号</Button>
          </ScrollView>
        </Content>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor:'#fff'
  },
  rowLabel: {
    fontSize: 18,
    color: '#aaa'
  },
  border: {
    height: 1,
    backgroundColor: '#aaa',
    marginHorizontal: 20,
    width: window.width - 40,
  },
  textInput: {
    fontSize: 18,
    color: '#aaa',
    height: 40,
    width: 200,
    textAlign: 'right',
    marginTop: 0,
  },loginOutView:{
    marginTop: 20,
    flexDirection :'row',
    justifyContent : 'center',
    backgroundColor:'#ddd',
    marginLeft: 20,
    marginRight: 20,
  },loginout:{
    color :'white',
    fontSize:15,
    lineHeight : 45,
  },title:{
    color: 'black',
    fontSize: 30,
    marginLeft: 20,
    fontWeight: 'bold',
  }
})

function mapStateToProps(store){
  return{
    user: store.user
  }
}

function mapDispatchToProps(dispatch){
  return{
    login: (userid,data) => {dispatch({type:'LOG_IN', userid:userid, userdata:data})} ,
    logout: () => {dispatch({type:'LOG_OUT'})},
    showAlert:(message) =>{dispatch({type:'SHOW_ALERT',message:message})},
    clearMessage: () => {dispatch({type:'CLEAR_SECRETARY_MESSAGE'})},
  }
}
module.exports = connect(mapStateToProps,mapDispatchToProps)(Setting)
