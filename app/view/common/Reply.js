import React,{ Component } from 'react';
import { connect } from 'react-redux';

class Replys extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    <View/>
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
  }
}
module.exports = connect(mapStateToProps,mapDispatchToProps)(Replys)
