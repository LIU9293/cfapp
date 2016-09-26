import React, { Component } from 'react';
import { Bottom } from 'rn-sexless';
import { TouchableOpacity, View, Text } from 'react-native';
import { Heart, Star } from 'CFAnimation';
import { clickLove, Collect } from 'connection';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

class CommentSharZan extends Component{
  constructor(props){
    super(props);
    this.like = this.like.bind(this);
    this.collect = this.collect.bind(this);
  }
  like(){
    if(!this.props.user.login){
      this.props.navigator.push({ident: 'login'});
    } else {
      this.props.zan(this.props.objid);
      clickLove(this.props.user.userid, this.props.objid, this.props.type, (err,data)=>{
        if(err){
          console.log(err);
        }else {
          console.log(data);
          console.log('点赞操作成功');
          return
        }
      })
    }
  }
  collect(){
    if(!this.props.user.login){
      this.props.navigator.push({ident: 'login'});
    } else {
      this.props.collect(this.props.objid);
      Collect(this.props.user.userid, this.props.objid, this.props.type, (err,data)=>{
        if(err){
          console.log(err);
        }else {
          console.log(data);
          console.log('收藏操作成功');
          return
        }
      })
    }
  }
  render(){
    console.log(this.props.collects);
    let liked = false,
        collected = false;
    if(this.props.dianzan[this.props.objid].isliked == 1){
      liked = true
    }
    if(this.props.collects[this.props.objid].iscollect == 1){
      collected = true
    }
    return(
      <Bottom style={{borderTopWidth: 1, borderTopColor: '#eee'}}>
        <View style={{width: 80, height: 80, marginLeft: -30, marginBottom: -10, flexDirection:'row'}}>
          <Heart like={this.like} unlike={this.like} liked={liked} />
          <Text style={{position:'absolute', top: 23, right: 17, color: '#a9b8c2', fontSize: 18}}>{this.props.dianzan[this.props.objid].num}</Text>
        </View>
        <TouchableOpacity onPress = {
          e => this.props.navigator.push({
            ident: 'showcommentlist',
            objid: this.props.objid,
            type : this.props.type,
            commentNum : this.props.commentNum,
          })
        } style = {{flexDirection: 'row',alignItems:'center',justifyContent: 'center'}}>
          <Icon name="chat-bubble" size = {22} style = {{color:'#a9b8c2'}}/>
          <Text style={{fontSize: 18, color:'#a9b8c2', marginBottom: 2}}>{"  " + this.props.commentNum}</Text>
        </TouchableOpacity>
        <View style={{width: 80, height: 80, marginRight: -40, marginBottom: -10}}>
          <Text style={{position:'absolute', top: 23, left: 10, color: '#a9b8c2', fontSize: 18}}>{this.props.collects[this.props.objid].num}</Text>
          <Star star={this.collect} unstar={this.collect} collected={collected} />
        </View>
      </Bottom>
    )
  }
}

function mapStateToProps(store){
  return {
    user: store.user,
    dianzan:store.dianzan,
    collects : store.collect,
  }
}

function mapDispatchToProps(dispatch){
  return {
    zan:(objid) => {dispatch({type:"LIKE_TOGGLE", objid: objid})},
    collect:(objid) => {dispatch({type:"COLLECT_TOGGLE", objid: objid})}
  }
}


module.exports = connect(mapStateToProps, mapDispatchToProps)(CommentSharZan)
