import React,{ Component } from 'react';
import {Image,Text,View,TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {Collect} from 'connection';

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
class CollectObj extends Component {
  constructor(props) {
    super(props);
    this.CollectHandler = this.CollectHandler.bind(this);
  }

  CollectHandler(){
    this.props.collectobj(this.props.objid);
    if(this.props.userinfo.userid === null || this.props.userinfo.userid === undefined){
      console.log("还没有登陆");
    }else {

      Collect(this.props.userinfo.userid,this.props.objid,this.props.type,(err,data)=>{
        if(err){
          console.log(err);
        }else {
          console.log("Collect 操作成功");
        }
      })
    }

  }

  render(){
    let collect,num
    if(this.props.collects[this.props.objid]){
      num = this.props.collects[this.props.objid].num;
      collect = this.props.collects[this.props.objid].iscollect == 1 ? "ios-star" : "ios-star-outline" ;
    }
    return(
      <TouchableOpacity onPress = {this.CollectHandler} style = {styles.touchOp}>
        <Icon name = {collect || "ios-star-outline"} size={20} style = {{color:'#2db7f5'}} />
        <Text style = {styles.texts}>{num || "0"}</Text>
      </TouchableOpacity>
    )
  }
}

function mapStateToProps(store){
  return {
    userinfo : store.user,
    collects : store.collect,
  }
}

function mapDispatchToProps(dispatch){
  return {
    collectobj :(objid)=>{dispatch({
      type:"COLLECT_TOGGLE",
      objid:objid
    })}
  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(CollectObj)
