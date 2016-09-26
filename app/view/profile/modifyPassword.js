import React,{ Component } from 'react';
import {View,Text,ScrollView,RefreshControl,TouchableOpacity,Dimensions,Image,TextInput} from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Button, Content, Title } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {modefyPass} from 'connection';
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


class ModifyPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      btnEnable : true
    }
    this.ModifyLimit = this.ModifyLimit.bind(this)
  }

  ModifyLimit(){
    let oldpass = this.refs.oldPass._lastNativeText;
    let newpass = this.refs.newPass._lastNativeText;
    if(oldpass === undefined){
      this.props.showAlert("原密码不能为空");return;
    }if(oldpass.length === 0){
      this.props.showAlert("原密码不能为空");return;
    }if(newpass === undefined){
      this.props.showAlert("新密码不能为空");return;
    }if(newpass.length === 0){
      this.props.showAlert("新密码不能为空");return;
    }
    this.setState({
      btnEnable:false
    })
    modefyPass(this.props.user.userid,oldpass,newpass,(err,data) => {
      this.setState({
        btnEnable:true
      })
      if(err){
        this.props.showAlert(err)
      }else {
        this.props.showAlert("修改成功")
        this.props.navigator.pop()
      }
    })
  }

  render(){
    return(
      <View style={{flex:1}}>
        <GlobleAlert />
        <Image resizeMode = "cover" style = {{width : width,height : height,position :'absolute'}} source = {blurImage}/>
        <View style ={styles.header}>
          <TouchableOpacity onPress = {e=>{
            this.props.navigator.pop();
          }}>
            <Icon name = "ios-arrow-back-outline" size = {39} style = {{marginLeft:10,color:'#fff'}}/>
          </TouchableOpacity>
          <Text style = {styles.center}>修改密码</Text>
        </View>

        <Image resizeMode = "contain" style = {{width : width ,marginTop:30 }} source = {logoImage}/>
        <View style = {styles.infoBody}>
          <TextInput ref = "oldPass" placeholder = "原密码" secureTextEntry = {true} style = {styles.textInput} placeholderTextColor ='#fff'/>
          <Text style = {styles.line}></Text>
          <TextInput ref = "newPass" placeholder = "新密码" secureTextEntry = {true} style = {styles.textInput} placeholderTextColor ='#fff'/>
          <Text style = {styles.line}></Text>
          <Button disabled = {!this.state.btnEnable} style = {{width : (width - 60),backgroundColor :'#2db7f5',marginTop : 30}} onPress = {e=>{
            this.ModifyLimit()
          }}>立即修改</Button>
        </View>
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
    login: (userid,data) => {dispatch({type:'LOG_IN', userid:userid, userdata:data})}
  }
}
module.exports = connect(mapStateToProps,mapDispatchToProps)(ModifyPassword)
