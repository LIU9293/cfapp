import React,{ Component } from 'react';
import {View,Text,ScrollView,RefreshControl,TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import FirstReply from './firstReply';
import SecondReply from './secondReply';
import GlobleAlert from '../common/MessageAlert';


// objid-----type   0:帖子  1:帖子评论(暂时不用)，2活动，3活动评论(暂时不用)
class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SecondCommentArray:[],
    }
    //二级评论超出这个数的 就隐藏
    this.MinCount = 2;
    this.getParamByObjid = this.getParamByObjid.bind(this);
    this.getClickComment = this.getClickComment.bind(this);
  }

  //根据对象id获取对象的配置
  //objid 指一级评论的id
  //在this.state.SecondCommentArray  存储的形式是 :{objid:objid,showmore:ture,loadcontent:"点击查看剩余6条评论",reallycontent:"点击查看剩余6条评论"}
  getParamByObjid(objid){
    let paramReturn;
    this.state.SecondCommentArray.map((item,index)=>{
      if(item.objid === objid){
        paramReturn = item
        return;
      }
    })
    return paramReturn;
  }

  //查看更多评论
  moreComment(objid){
    let originParam = this.getParamByObjid(objid);
    let newParam;
    if(originParam.showmore){
      //原来需要显示加载更多，更改状态之后，显示全部评论
      newParam = this.state.SecondCommentArray.map((item,index)=>{
        console.log(item.objid,objid)
        if(item.objid === objid){
          item.showmore = false;
          item.loadcontent = ",收起评论";
        }
        return item;
      })
    }
    else {
      newParam = this.state.SecondCommentArray.map((item,index)=>{
        if(item.objid === objid){
          item.showmore = true;
          item.loadcontent = item.reallycontent;
        }
        return item;
      })
    }
    this.setState({
      SecondCommentArray:newParam
    })
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.commentReq !== this.props.commentReq){
      return false;
    } else {
      return true
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.commentLists[this.props.objid]){
      let paramArray = [];
      nextProps.commentLists[this.props.objid].map((item,index)=>{
          var secondCommentCount = item.ChildList.length;
          if(secondCommentCount > this.MinCount){
            let paramOri = {
              objid:item.ID,
              showmore:true,
              loadcontent:"还有" + (secondCommentCount - this.MinCount) + "条评论,点击查看",
              reallycontent:"还有" + (secondCommentCount - this.MinCount) + "条评论,点击查看"}
            paramArray.push(paramOri)
          }
      })
      this.setState({
        SecondCommentArray:paramArray
      })
    }
  }

  getClickComment(fatherid,objid,username,fatherName,uid){
    if(this.props.user.userid === undefined || this.props.user.userid === null){
      this.props.navigator.push({
        ident: 'login'
      })
    }else {
      if(uid === this.props.user.userid){
        this.props.showAlert("不能给自己回复评论");
      }else {
          let reply = "回复:" + username;
          this.props.UPDATE_QUEPARAM(reply,fatherid,objid,fatherName);
        }
      }
    }

  //删除评论(暂时不用)
  deleteComments(commentid,level){
    console.log(commentid,level)
    // if(level === 1){
    //   this.props.DELETE_TOP_COMMENT(this.props.postid,commentid);
    // }else {
    //   this.props.DELETE_SECOND_COMMENT(this.props.postid,commentid);
    // }
    // if(this.props.sourceType === "activity"){
    //   if(commentid.split('.').length === 1){
    //     deleteActivityComment(this.props.user.userid,commentid,(err,data)=>{
    //       if(err){console.log(err)}
    //       else {
    //         console.log(data)
    //       }
    //     })
    //   }
    // }else {
    //   deleteComment(commentid,this.props.user.userid,(err,data)=>{
    //     if(err){console.log(err)}
    //     else {
    //       console.log(data)
    //     }
    //   })
    // }
  }



  render(){
    var comment = [];
    let commemtsData = this.props.commentLists[this.props.objid];
    if(commemtsData !== undefined){
      var keys = 0;
      if(commemtsData.length > 0){
        commemtsData.map((item,index)=>{
          keys ++;
          let firsts = <FirstReply item ={item} navigator = {this.props.navigator} firstObjid = {item.ID} callback = {this.getClickComment} deletecallback = {this.deleteComments}/>
          comment.push({...firsts,key:keys});//装载一级评论
          var secondCommentCount = item.ChildList.length;
          if(secondCommentCount > 0){//有2级评论

            if(secondCommentCount > this.MinCount){ //评论数多于最低限制，需要显示隐藏
              let param = this.getParamByObjid(item.ID);
              if(param === undefined || param === null || param.showmore === true){//需要显示加载更多
                for (var i = 0; i < this.MinCount; i++) {
                  keys ++;
                  let seconds = <SecondReply item = {item.ChildList[i]} firstObjid = {item.ID} navigator = {this.props.navigator} callback = {this.getClickComment} deletecallback = {this.deleteComments}/>
                  comment.push({...seconds,key:keys});
                }
              }
              else { //显示全部
                item.ChildList.map((item2,index2)=>{
                  keys ++;
                  let second = <SecondReply item = {item2} firstObjid = {item.ID} navigator = {this.props.navigator} callback = {this.getClickComment} deletecallback = {this.deleteComments}/>;
                  comment.push({...second,key:keys});
                })
              }
              if(param !== undefined && param !== null){//显示辅助工具
                keys ++;
                let more = <View style = {{flexDirection:'row',alignItems:'center',marginLeft:70,marginRight:10,backgroundColor:'#f9f9f9',paddingTop:5,paddingBottom:5}}>
                              <Text style = {{color:'#999',fontSize:13,marginLeft:10}}>{param.loadcontent.split(',')[0]} </Text>
                              <TouchableOpacity onPress = {e=>{
                                this.moreComment(item.ID)
                              }}>
                                <Text style = {{color:'#2db7f5',fontSize:13}}>{param.loadcontent.split(',')[1]}</Text>
                              </TouchableOpacity>
                           </View>
                comment.push({...more,key:keys});
              }
            }
            else {
              item.ChildList.map((item2,index2)=>{
                keys ++;
                let second = <SecondReply item = {item2} firstObjid = {item.ID} navigator = {this.props.navigator} callback = {this.getClickComment} deletecallback = {this.deleteComments}/>;
                comment.push({...second,key:keys});
              })
            }
          }
          keys ++;
          let h1 = <Text style = {{marginLeft:10,marginRight:10,marginTop:3,height:1,backgroundColor:'#eee'}}></Text>
          comment.push({...h1,key:keys});
        })
        return (
          <View>
            <GlobleAlert />
            {comment}
          </View>
        )
      }else {
        return(
          <View style = {{alignItems:'center'}}>
            <Text style = {{fontSize:15,color:'#666'}}>暂无更多评论..</Text>
          </View>
        )
      }
    }
    else {
      return(
        <View style = {{alignItems:'center'}}>
          <Text style = {{fontSize:15,color:'#666'}}>暂无更多评论..</Text>
        </View>
      )
    }
  }
}

function mapStateToProps(store){
  return {
    user: store.user,
    commentLists:store.commentOperate,
    commentReq:store.addCommentOperate,
  }
}

function mapDispatchToProps(dispatch){
  return {
    insertTopLevelComment: (commentData,postID) => {dispatch({type:'INSERT_TOP_LEVEL_COMMENT', commentData: commentData, postID: postID})},
    insertSecondLevelComment: (ID,commentData,postID) => {dispatch({type:'INSERT_SECOND_LEVEL_COMMENT', commentData: commentData, ID:ID, postID: postID})},
    DELETE_TOP_COMMENT:(postID,commentid)=>{dispatch({type:'DELETE_TOP_COMMENT',postID:postID,commentid:commentid})},
    DELETE_SECOND_COMMENT:(postID,commentid)=>{dispatch({type:'DELETE_SECOND_COMMENT',postID:postID,commentid:commentid})},
    startLoading: () => {dispatch({type:'START_LOADING'})},
    stopLoading: () => {dispatch({type:'STOP_LOADING'})},
    UPDATE_QUEPARAM:(userName,objFatherid,objid,fatherName)=>{dispatch({type:'UPDATE_QUEPARAM',userName:userName,objFatherid:objFatherid,objid:objid,fatherName:fatherName})},
    addCommentOperate:(userName,objFatherid,objid,fatherName,comment)=>{dispatch({type:"UPDATE_QUEPARAM",userName:userName,objFatherid:objFatherid,objid:objid,fatherName:fatherName,comment:comment})},
    showAlert:(message) =>{dispatch({type:'SHOW_ALERT',message:message})}
  }
}


module.exports = connect(mapStateToProps,mapDispatchToProps)(Comments)
