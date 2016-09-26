import React,{ Component } from 'react';
import {View,Text,Image,TextInput,ScrollView,PixelRatio,Dimensions,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {addComment} from 'connection';

const Util = {
  ratio: PixelRatio.get(),
  pixel: 1 / PixelRatio.get(),
  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
};

const styles = {
  header:{
    flexDirection:'row',
    height:64,
    paddingTop:20,
    backgroundColor:'#fff',
    borderBottomWidth:1,
    borderBottomColor:'lightgray',
  },left:{
    marginLeft:10,
    color:'#999'
  },center:{
    flex:1,
    lineHeight:30,
    fontSize:19,
    color:'#999',
    fontWeight:'bold',
    textAlign:'center',
    justifyContent:'center',
  },right:{
    marginRight:10,
    color:'#2db7f5',
  },CommentArea:{
    marginTop:10,
    padding:10,
    flex:1,
  },textInput:{
    flex:1,
    width:(Util.size.width - 20),
    fontSize:15,
    height:200,
  },toolBar:{
    alignItems:'flex-end',
    height:30,
    left:0,
    right:0,
    backgroundColor:'#eee',
    borderTopColor: 'lightgray',
    borderTopWidth: 1
  }
}



class AddCommment extends Component {
  constructor(props) {
    super(props);
    this.submitComment = this.submitComment.bind(this);
  }

  submitComment(){
    if(this.props.userinfo.userid === null || this.props.userinfo.userid === undefined){
      console.log("Need Login")
    }else {
      if(this.props.commentReq.comment.replace(" ","").length === 0){
          console.log("Commeng Inviled")
      }else{
        //UserID,PostsID,ObjectFatherID,Comment,ObjectID
        addComment(this.props.userinfo.userid,
          this.props.objid,
          this.props.commentReq.objFatherid,
          this.props.commentReq.comment,
          this.props.commentReq.objid,(err,data)=>{
            if(err){console.log(err)}else {
              this.props.addCommentOperate("","","","","");
              this.props.navigator.pop();
            }
        })
      }
    }
  }

  render(){
    return (
      <View style = {{backgroundColor:'#fff',flex:1}}>
        <View style ={styles.header}>
          <TouchableOpacity onPress = {e=>{
            this.props.navigator.pop();
          }}>
            <Icon name = "ios-arrow-back-outline" size = {39} style = {styles.left}/>
          </TouchableOpacity>
          <Text style = {styles.center}>添加评论</Text>
          <TouchableOpacity onPress = {e=>{
            this.submitComment(e);
          }}>
            <Icon name = "ios-send-outline" size = {39} style = {styles.right}/>
          </TouchableOpacity>
        </View>
        <View style = {styles.CommentArea}>
          <TextInput style = {styles.textInput}
          returnKeyType ={"default"}
          placeholder ="添加评论..."
          placeholderTextColor = "#999"
          onChangeText = {(text)=>{
            this.props.addCommentOperate("","","","",text);
          }}
          multiline  = {true} />
        </View>
        <View style = {styles.toolBar} >
            <Icon name = "ios-image" size = {24} style = {{marginRight:10,marginTop:3,color:'#2db7f5'}}/>
        </View>
        <KeyboardSpacer />
      </View>
    )
  }
}


function mapStateToProps(store){
  return {
    userinfo: store.user,
    commentReq:store.addCommentOperate,
  }
}

function mapDispatchToProps(dispatch){
  return {
    addCommentOperate :(userName,objFatherid,objid,fatherName,comment)=>{dispatch({
      type:"UPDATE_QUEPARAM",
      userName:userName,
      objFatherid:objFatherid,
      objid:objid,
      fatherName:fatherName,
      comment:comment
    })}
  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(AddCommment)
