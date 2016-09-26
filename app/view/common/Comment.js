import React,{ Component } from 'react';
import {Image,Text,View,TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import ZanObj from './zan';
import CollectObj from './collect';
const styles = {
  views:{
    flexDirection: 'row',
    height: 44,
    paddingLeft:10,
    paddingRight:10,
    alignItems:'center',
    justifyContent: 'space-between',
    borderTopColor: 'lightgray',
    borderTopWidth: 1
  },cmt:{
    flex:1,
    flexDirection: 'row',
    alignItems:'center',
    borderWidth:1,
    borderColor:'#999',
    borderRadius:3,
    paddingLeft:5,
    paddingRight:90,
    marginRight:20,
  },texts:{
    color:'#999',
    marginLeft:5
  },viewsr:{
    flex:1,
    flexDirection: 'row',
    alignItems:'center',
    paddingLeft:5,
  }
}

//objid --- type ---
class Comments extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <View style = {styles.views}>
        <View style = {styles.cmt}>
          <Icon name = "ios-create-outline" size={25}/>
          <TouchableOpacity onPress = {
            e => this.props.navigator.push({
              ident: 'addcomment',
              objid: this.props.objid
            })
          }>
            <Text style = {styles.texts}>添加评论</Text>
          </TouchableOpacity>
        </View>
        <View style = {styles.viewsr}>
          <ZanObj objid={this.props.objid} type = {this.props.type}/>
        </View>
        <View style = {styles.viewsr}>
          <CollectObj objid={this.props.objid} type = {this.props.type}/>
        </View>
        <View style = {styles.viewsr}>
          <TouchableOpacity onPress = {
            e => this.props.navigator.push({
              ident: 'showcommentlist',
              objid: this.props.objid,
              type : this.props.type,
              commentNum : this.props.commentNum,
            })
          } style = {{flexDirection: 'row',alignItems:'center',justifyContent: 'space-between'}}>
            <Icon name = "ios-chatbubbles-outline" size = {20} style = {{color:'#2db7f5'}}/>
            <Text style = {styles.texts}>{this.props.commentNum}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

module.exports = Comments
