import React,{ Component } from 'react';
import {View,Text,ScrollView,RefreshControl,TouchableOpacity,Image} from 'react-native';
import {millseconds2DateDiff} from '../../vendor/helper/timeTransfer';


const styles = {
  FatherView:{
    flex:1,
    flexDirection: 'row',
    backgroundColor:'#fff',
  },headImg:{
    width:50,
    height:50,
    borderRadius:25,
    margin : 10
  },center:{
    flex:1,
    flexDirection: 'column',
  },right:{
    width:80,
    color:'#999',
    fontSize:14,
    margin:10,
    textAlign:'right',
  },nickName:{
    color:'#999',
    fontSize:15,
    marginTop:10,
  },contents:{
    fontSize:15,
    color:'#333',
    marginTop:5,
  }
}

class FirstReply extends Component {
  constructor(props) {
    super(props);
    this.deletecallback = this.deletecallback.bind(this);
    this.back = this.back.bind(this);
  }

  deletecallback(commentid,level){
    this.props.deletecallback(commentid,level);
  }

  back(fatherid,objid,username,fatherName,uid){
    this.props.callback(fatherid,objid,username,fatherName,uid);
  }



  render(){
    let item = this.props.item;
    console.log(item)
    return(
      <View style = {styles.FatherView}>
        <TouchableOpacity onPress = {e=>{
          this.props.navigator.push({
            ident: 'usercenter',
            userid: item.UserID
          })
        }}>
          <Image source = {{uri:item.HeadImg}} style = {styles.headImg}/>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.center} onPress = {e=>{
          //回复一级评论
          this.back(item.UserID,this.props.firstObjid,item.UserNickName,item.UserNickName,item.UserID);
        }}>
           <Text style = {styles.nickName}>{item.UserNickName}</Text>
           <Text style = {styles.contents}>{item.Content}</Text>
        </TouchableOpacity>
        <Text style = {styles.right}>{millseconds2DateDiff(item.ReleaseTime)}</Text>
      </View>
    )
  }
}

module.exports = FirstReply
