import React,{ Component } from 'react';
import {Image,Text,View,TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {clickLove} from 'connection';

const styles = {
  texts:{
    color:'#999',
    marginLeft:5,
    fontSize:14
  },touchOp:{
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between'
  }
}

//props  objid---type
class ZanObj extends Component {
  constructor(props) {
    super(props);
    this.ZanHandler = this.ZanHandler.bind(this);
  }

  ZanHandler(){
    this.props.zan(this.props.objid);
    if(this.props.userinfo.userid === null || this.props.userinfo.userid === undefined){
      console.log("还没有登陆");
    }else {

      clickLove(this.props.userinfo.userid,this.props.objid,this.props.type,(err,data)=>{
        if(err){
          console.log(err);
        }else {
          console.log("zan 操作成功");
        }
      })
    }

  }

  render(){
    let num,iconName;
    if(this.props.dianzan[this.props.objid]){
      num = this.props.dianzan[this.props.objid].num;
      iconName = this.props.dianzan[this.props.objid].isliked == 1? "ios-heart" : "ios-heart-outline";
    }
    return(
      <TouchableOpacity onPress = {this.ZanHandler} style = {styles.touchOp}>
        <Icon name = {iconName || "ios-heart-outline"} size={20} style = {{color:'#2db7f5'}} />
        <Text style = {styles.texts}>{num || "0"}</Text>
      </TouchableOpacity>
    )
  }
}

function mapStateToProps(store){
  return {
    userinfo: store.user,
    dianzan:store.dianzan,
  }
}

function mapDispatchToProps(dispatch){
  return {
    zan :(objid)=>{dispatch({
      type:"LIKE_TOGGLE",
      objid:objid
    })}
  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(ZanObj)
