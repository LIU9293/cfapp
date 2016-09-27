import React,{ Component } from 'react';
import {View,Text,ScrollView,RefreshControl,TouchableOpacity,Image} from 'react-native';
import {millseconds2DateDiff} from '../../vendor/helper/timeTransfer';

const styles = {
  FatherView:{
    marginLeft:70,
    marginRight:10,
    backgroundColor:'#f9f9f9',
    paddingRight:10,
  },HeadImg:{
    width:40,
    height:40,
    borderRadius:20,
    margin:10,
  },right:{
    width:64,
    color:'#999',
    fontSize:12,
    textAlign:'right',
  },nickName:{
    color:'#999',
    fontSize:14,
    flex:1,
  },contents:{
    fontSize:14,
    color:'#333',
    marginTop:5
  },
}

//firstObjid
class SecondReply extends Component {
  constructor(props) {
    super(props.HeadImg);
    this.deletecallback = this.deletecallback.bind(this);
    this.back = this.back.bind(this);
  }

 //删除评论的上级回调
  deletecallback(commentid,level){
    this.props.deletecallback(commentid,level);
  }
 //添加评论的上级回调
  back(fatherid,objid,username,fatherName,uid){
    this.props.callback(fatherid,objid,username,fatherName,uid);
  }

  render(){
    let item = this.props.item;
    return(
      <View style = {styles.FatherView}>
        <View style = {{flexDirection: 'row'}}>
          <TouchableOpacity>
            <Image source = {{uri:item.HeadImg}} style = {styles.HeadImg}/>
          </TouchableOpacity>
          <View style = {{flexDirection: 'column',flex:1,marginTop:10}}>
            <View style = {{flexDirection: 'row'}}>
                <Text style = {styles.nickName}>{item.UserNickName}</Text>
                <Text style = {styles.right}>{millseconds2DateDiff(item.ReleaseTime)}</Text>
            </View>
            <TouchableOpacity onPress = {e=>{
              //回复二级评论
              this.back(item.UserID,this.props.firstObjid,item.UserNickName,item.UserNickName,item.UserID);
            }}>
              <View style = {{flexDirection: 'column',flex:1}}>
                  <Text style = {styles.contents}>回复
                    <Text style = {{...styles.contents,color:'#2db7f5'}}> {item.fatherName} : </Text>
                    {item.Content}
                  </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Text style ={{marginLeft:10,marginTop:3,height:1,backgroundColor:'#eee'}}></Text>
      </View>
    )
  }
}

module.exports = SecondReply
