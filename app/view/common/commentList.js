import React,{ Component } from 'react';
import {View,Text,ScrollView,RefreshControl,StatusBar,TouchableOpacity,PixelRatio,Dimensions,Image,TextInput} from 'react-native';
import {getDiscoverPostComment,getActivityComment,addComment,addActivityComment} from 'connection';
import { connect } from 'react-redux';
import { Button } from 'native-base';
import Comments from './comments';
import Icon from 'react-native-vector-icons/Ionicons';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Header, H2, Bottom } from 'rn-sexless';

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
  },bottomView:{
    bottom:0,
    height:44,
    left:0,
    right:0,
    backgroundColor:"#fff",
    borderTopWidth:1,
    borderTopColor:'lightgray',
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal: 10,
  },bottomImage:{
    width:30,
    height:30,
    borderRadius:15,
  },textView:{
  //  borderWidth:1,
    //borderColor:'lightgray',
    flex:1,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center',
//    borderRadius:3,
    marginHorizontal: 10,
    height:30,
  },inputView:{
    backgroundColor:'#2db7f5',
    textAlign:'center',
    color:'#fff',
    height:30,
    lineHeight:22,
    width:60,
    // flex:1
  }
}



// objid-----type   0:帖子  1:帖子评论(暂时不用)，2活动，3活动评论(暂时不用)
class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      comments:"",
    }
    this.commentNum = 0;
    this.canFresh = true;
    this.pageIndex = 1;
    this.Operation = this.Operation.bind(this);
    this.loadPostComment = this.loadPostComment.bind(this);
    this.loadActivityComment = this.loadActivityComment.bind(this);
    this.addComments = this.addComments.bind(this);
  }

  componentDidMount(){
    this.Operation();
  }

  Operation(){
    let type = this.props.type;
    if(type === 0){//帖子
      this.loadPostComment();
    }else if(type === 2){//活动
      this.loadActivityComment();
    }
  }

  //加载帖子评论
  loadPostComment(){
    if(this.canFresh){
      this.canFresh = false
      let userid = this.props.userinfo.userid === null || this.props.userinfo.userid === undefined ?'':this.props.userinfo.userid;
      console.log(this.pageIndex,"++++")
      getDiscoverPostComment(userid,this.props.objid,this.pageIndex,(err,data)=>{
        this.canFresh = true;
        if(err){console.log(err)}
        else {
          console.log(data,this.pageIndex)
          var newList = this.props.commentLists[this.props.objid] === null || this.props.commentLists[this.props.objid] === undefined ? []:this.props.commentLists[this.props.objid];
          if(this.pageIndex === 1){
            this.commentNum = data.CommentNum;//评论数
            if(data.CommentList.length > 0){
              this.pageIndex ++;
              newList = data.CommentList;
            }
          }else {
            if(data.CommentList.length > 0){
              this.pageIndex ++;
              for (var i = 0; i < data.CommentList.length; i++) {
                newList.push(data.CommentList[i]);
              }
            }
          }
          this.props.commentOperate(this.props.objid,newList);
        }
      })
    }
  }

  //加载活动评论
  loadActivityComment(){
    if(this.canFresh){
      this.canFresh = false
      let userid = this.props.userinfo.userid === null || this.props.userinfo.userid === undefined ?'':this.props.userinfo.userid;
      // eventid, userid, pageNum
      getActivityComment(this.props.objid,userid,this.pageIndex,(err,data)=>{
        this.canFresh = true;
        if(err){console.log(err)}
        else {
          var newList = this.props.commentLists[this.props.objid] === null || this.props.commentLists[this.props.objid] === undefined ? []:this.props.commentLists[this.props.objid];
          if(this.pageIndex === 1){
            this.commentNum = data.CommentNum;//评论数
            newList = data.CommentList;
          }else {
            this.pageIndex ++;
            newList.concat(data.CommentList);
          }
          this.props.commentOperate(this.props.objid,newList);
        }
      })
    }
  }

  //滚动事件
  scroll(e){
    let offsetY = e.contentOffset.y;
    let contentSizeHeight = e.contentSize.height;
    let layoutHeight = e.layoutMeasurement.height;
    if(contentSizeHeight - offsetY - layoutHeight < 1){
      if(this.canFresh){
        this.Operation();
      }
    }
  }

  //下啦刷新
  onRefresh(){
    this.pageIndex = 1;
    this.Operation();
  }

  //添加评论
  addComments(){
    if(this.props.userinfo.userid === undefined){
      this.props.navigator.push({
        ident: 'login'
      })
    }else {
        let replys = this.state.comments;
        if(replys.replace(" ","") === ""){
          console.log("评论无效")
        }else {
          let type = this.props.type;//0:帖子  1:帖子评论(暂时不用)，2活动，3活动评论(暂时不用)
          if(type === 0){
            addComment(this.props.userinfo.userid,this.props.objid,this.props.commentReq.objFatherid,replys,this.props.commentReq.objid,(err,data)=>{
                if(err){console.log(err)}
                else {
                  this.setState({comments:""});//清空文本框
                  if(this.props.commentReq.objFatherid==''){
                    this.props.insertTopLevelComment({
                      ChildList:[],
                      Content:replys,
                      HeadImg: this.props.userinfo.userdata !== null ?this.props.userinfo.userdata.avatar :"http://imageservice.pine-soft.com/logo.png",
                      ID: data.CommentId,
                      IsLike:0,
                      Level:1,
                      Phone:this.props.userinfo.userdata !== null ?this.props.userinfo.userdata.phone:"",
                      PostID:this.props.objid,
                      PraiseNumbers:0,
                      ReleaseTime:data.CommentDate,
                      ReplyNumbers:0,
                      ResultCode:0,
                      UserID:data.UserId,
                      UserNickName:this.props.userinfo.userdata.nickName,
                    },this.props.objid)
                  }else {
                    this.props.insertSecondLevelComment(this.props.commentReq.objid,{
                      Content:replys,
                      HeadImg: this.props.userinfo.userdata !== null ?this.props.userinfo.userdata.avatar :"http://imageservice.pine-soft.com/logo.png",
                      ID: data.CommentId,
                      IsLike:0,
                      Level:2,
                      Phone:this.props.userinfo.userdata !== null ?this.props.userinfo.userdata.phone:"",
                      PostID:this.props.postid,
                      PraiseNumbers:0,
                      ReleaseTime:data.CommentDate,
                      ReplyNumbers:0,
                      ResultCode:0,
                      UserID:data.UserId,
                      UserNickName:this.props.userinfo.userdata.nickName,
                      fatherID:this.props.commentReq.objid,
                      fatherName:this.props.commentReq.fatherName
                    },this.props.objid)
                  }
                  this.props.addCommentOperate("","",this.props.objid,"","")
                }
            })
          }else if(type === 2){
              addActivityComment(this.props.userinfo.userid,this.props.objid,this.props.commentReq.objFatherid,this.props.commentReq.objid,replys,(err,data)=>{
                if(err){console.log(err)}
                else {
                  this.setState({comments:""});//清空文本框
                  if(this.props.commentReq.objFatherid==''){
                    this.props.insertTopLevelComment({
                      ChildList:[],
                      Content:replys,
                      HeadImg: this.props.userinfo.userdata !== null ?this.props.userinfo.userdata.avatar :"http://imageservice.pine-soft.com/logo.png",
                      ID: Math.random().toString(),
                      IsLike:0,
                      Level:1,
                      Phone:this.props.userinfo.userdata !== null ?this.props.userinfo.userdata.phone:"",
                      PostID:this.props.objid,
                      PraiseNumbers:0,
                      ReleaseTime:'/Date('+ new Date().getTime() + ')/',
                      ReplyNumbers:0,
                      ResultCode:0,
                      UserID:this.props.userinfo.userid,
                      UserNickName:this.props.userinfo.userdata.nickName,
                    },this.props.objid)
                  }
                  else {
                    this.props.insertSecondLevelComment(this.props.commentReq.objid,{
                      Content:replys,
                      HeadImg: this.props.userinfo.userdata !== null ?this.props.userinfo.userdata.avatar :"http://imageservice.pine-soft.com/logo.png",
                      ID: Math.random().toString(),
                      IsLike:0,
                      Level:2,
                      Phone:this.props.user.userdata !== null ?this.props.user.userdata.phone:"",
                      PostID:this.props.postid,
                      PraiseNumbers:0,
                      ReleaseTime:'/Date('+ new Date().getTime() + ')/',
                      ReplyNumbers:0,
                      ResultCode:0,
                      UserID:this.props.userinfo.userid,
                      UserNickName:this.props.userinfo.userdata.nickName,
                      fatherID:this.props.commentReq.objid,
                      fatherName:this.props.commentReq.fatherName
                    },this.props.objid)
                  }
                  this.props.addCommentOperate("","",this.props.objid,"","")
                }
              })
          }
        }
    }
  }
  /*

  */

  render(){
    let holder = this.props.commentReq.userName === ""?'我来说两句':this.props.commentReq.userName;
    return (
      <View style = {{backgroundColor:'#fff',flex:1}}>
        <StatusBar
          translucent={true}
          barStyle="default"
         />
        <Header>
          <TouchableOpacity onPress={ e => this.props.navigator.pop() } >
            <Icon name = "ios-arrow-back-outline" size = {24} />
          </TouchableOpacity>
          <H2 style={{fontSize: 18}}>评论</H2>
          <View/>
        </Header>
        <ScrollView
          onScroll={e => this.scroll(e.nativeEvent)}
          scrollEventThrottle={1000}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }>
          <Comments objid = {this.props.objid} type = {this.props.type} navigator = {this.props.navigator} callback = {this.getClickComment} />
        </ScrollView>
        <Bottom style={{borderTopWidth: 1, borderTopColor: '#eee', position: 'relative'}}>
          <Image style ={styles.bottomImage} source = {{url:(this.props.userinfo.userdata === null || this.props.userinfo.userdata === undefined ?'http://imageservice.pine-soft.com/logo.png':this.props.userinfo.userdata.avatar)}}/>
          <TextInput
            ref = "textInput"
            placeholder = {holder}
            style ={{fontSize : 13,flex:1}}
            value = {this.state.comments}
            onChangeText = { text => this.setState({comments :text}) }
            onSubmitEditing = { e => {this.addComments()} }
          />
          <TouchableOpacity onPress = {e=>{this.addComments()}}>
            <Text style={{color: '#0098fe'}}>发布</Text>
          </TouchableOpacity>
        </Bottom>
        <KeyboardSpacer />
      </View>

    )
  }
}

function mapStateToProps(store){
  return {
    userinfo: store.user,
    commentLists:store.commentOperate,
    commentReq:store.addCommentOperate,
  }
}

function mapDispatchToProps(dispatch){
  //这里的postid 就是 props.objid
  return {
    commentOperate:(postid,newcommentlist)=>{dispatch({type:'UPDATE_COMMENT',commentData:newcommentlist,postID:postid})},
    insertTopLevelComment: (commentData,postID) => {dispatch({type:'INSERT_TOP_LEVEL_COMMENT', commentData: commentData, postID: postID})},
    insertSecondLevelComment: (ID,commentData,postID) => {dispatch({type:'INSERT_SECOND_LEVEL_COMMENT', commentData: commentData, ID:ID, postID: postID})},
    DELETE_TOP_COMMENT:(postID,commentid)=>{dispatch({type:'DELETE_TOP_COMMENT',postID:postID,commentid:commentid})},
    DELETE_SECOND_COMMENT:(postID,commentid)=>{dispatch({type:'DELETE_SECOND_COMMENT',postID:postID,commentid:commentid})},
    addCommentOperate:(userName,objFatherid,objid,fatherName,comment)=>{dispatch({type:"UPDATE_QUEPARAM",userName:userName,objFatherid:objFatherid,objid:objid,fatherName:fatherName,comment:comment})},
  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(CommentList)
