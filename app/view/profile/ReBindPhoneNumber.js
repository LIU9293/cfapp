import React,{ Component } from 'react';
import {View,Text,ScrollView,RefreshControl,TouchableOpacity,Dimensions,Image,TextInput,StatusBar,Alert} from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Button, Content, Title } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { sendSMS,reBindPhoneNumber,getUserInfo,getUserActivities,getMyDiscoverFilterList,secretaryMessage} from 'connection';
import GlobleAlert from '../common/MessageAlert';

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

const newStyles = {
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
}


class ReBindPhoneNumbers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      limitTime : 0,
      sendBtnEnabled:true,
    }
    this.AllTime = 120;
    this.sendCode = this.sendCode.bind(this);
    this.timeCutDown = this.timeCutDown.bind(this);
    this.BindLimit = this.BindLimit.bind(this);
  }

  sendCode(){
    let phone = this.refs.phone._lastNativeText;
    if(phone === undefined){
      this.props.showAlert("请输入手机号");return;
    }
    let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/ //手机号码正则
    if(!phone.match(reg)){
      this.props.showAlert("手机号不合法");return;
    }
    Alert.alert('是否发送验证码到'+phone,null,[
        {text: '取消'},
        {text: '确定', onPress: () => {
          if(this.state.limitTime === 0){
            sendSMS(phone, '绑定手机', (err, data)=>{
              if(err){
                this.props.showAlert(err);return;
              }else {
                this.props.showAlert("发送成功")
                this.timeCutDown();
              }
            })
          }else {
            this.props.showAlert((120 - this.AllTime) +" 秒后重试");return;
          }
        }},
      ])
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

  BindLimit(){
    let phone = this.refs.phone._lastNativeText;
    let code = this.refs.code._lastNativeText;
    if(phone === undefined)
    {
      this.props.showAlert("手机号不能为空");return;
    }
    let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/ //手机号码正则
    if(!phone.match(reg)){
      this.props.showAlert("手机号不合法");return;
    }
    if(code === undefined){
      this.props.showAlert("请输入验证码");return;
    }
    if(code.length === 0){
      this.props.showAlert("请输入验证码");return;
    }
    reBindPhoneNumber(this.props.user.userid,phone,code,(err,data)=>{
      if(err){
        this.props.showAlert(err)
      }else {
        let userid = this.props.user.userid
        getUserInfo(userid, (err4,data4) => {
          if(err4){
            console.log("err4",err4);
          } else {
            let userData = {
              avatar: data4.ZUT_HEADIMG,
              nickName: data4.ZUT_NICKNAME,
              phone: data4.ZUT_PHONE,
              userDesc : data.UserDes,
              wechat: data.IsBindWeChat,
              qq: data.IsBindQQ,
              linkedin: data.IsBindLinkedIn,
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
        this.props.navigator.pop()
      }
    })
  }

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
            <Title></Title>
          </Header>
          <GlobleAlert AlertMessage = {this.state.err}/>
          <Content style = {{backgroundColor:'#fff'}}>
            <ScrollView style={{marginTop: 20}}>
              <Text style={newStyles.title}>更换手机号</Text>
              <View style = {newStyles.infoBody}>
                <View style={newStyles.row}>
                  <Text style={newStyles.rowLabel}>手机号</Text>
                  <TextInput
                    ref = "phone"
                    keyboardType = "numeric"
                    placeholder = "新手机号"
                    maxLength = {11}
                    placeholderTextColor ='#aaa'
                    style={newStyles.textInput}
                    onBlur = {this.sendCode}
                    />
                </View>
                <View style = {newStyles.border}></View>
                <View style={newStyles.row}>
                  <Text style={newStyles.rowLabel}>验证码</Text>
                  <TextInput
                    ref = "code"
                    keyboardType = "numeric"
                    placeholder = "验证码"
                    maxLength = {11}
                    placeholderTextColor ='#aaa'
                    style={{...newStyles.textInput,width:100}} />
                </View>
                <View style = {newStyles.border}></View>
                <Button style = {{width : (width - 40),backgroundColor :'#ddd',marginTop : 150,marginHorizontal : 20}} textStyle = {{color:'#fff'}} onPress = {e=>{
                  this.BindLimit()
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
    showAlert:(message) =>{dispatch({type:'SHOW_ALERT',message:message})},
    login: (userid,data) => {dispatch({type:'LOG_IN', userid:userid, userdata:data})} ,
    baoming: (id) => {dispatch({type:'JOIN_ACTIVITY', id: id})} ,
    update_user_topic: (data) => {dispatch({type: "UPDATE_SELECTED_TOPICS",data: data})},
    update_messages: (data) => {dispatch({type:'UPDATE_SECRETARY_MESSAGE', data: data})},
  }
}
module.exports = connect(mapStateToProps,mapDispatchToProps)(ReBindPhoneNumbers)
