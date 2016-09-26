import { getData, getDataBase64 } from './basis.js';

//获取活动首页列表
export const getPlaygroundList = (AreaID, pageCurrent, pageSize, callback) => {
  let queryObj = {
    areaID: AreaID,
    PageCurrent: pageCurrent,
    PageSize: pageSize
  }
  getDataBase64('ZQ.APP.ActivityManage.GetActivityList', queryObj, (err, data)=>{
    if(err){
      callback(err)
    } else {
      if (data.ResultCode === 1){
        callback(null, data.ActivityList);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}

//获取活动详情
export const getPlaygroundPost = (id, userid, callback) => {
  let queryObj = {
    ActivityID: id,
    UserID: userid
  };
  getDataBase64('ZQ.APP.ActivityManage.GetActivityByID', queryObj, (err, data)=>{
    if(err){
      callback(err)
    } else {
      if (data.ResultCode === 1){
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}

//获取活动首页轮播图
export const getActivityCarousel = (areaid, callback) => {
  let queryObj={
    areaID:areaid
  }
 getData('ZQ.APP.ActivityManage.HomeFig',queryObj,(err,data)=>{
   if (err) {
     console.log(err)
   }else {
     if (data.ResultCode===1) {
       callback(null,data);
     }else {
       callback(data.ResultMessage);
     }
   }
 })
}

//获取活动评论详情
export const getActivityComment = (eventid, userid, pageNum, callback) => {
  let queryObj={
    EventID:eventid,
    UserID:userid,
    PageNum:pageNum
  };
  getData('ZQ.APP.ActivityManage.GetCommentList',queryObj,(err,data)=>{
    if(err){
      callback(err)
    }else {
      if(data.ResultCode===1){
        callback(null,data);
      }else{
        callback(data.ResultMessage);
      }
    }
  })
}

//添加活动评论
export const addActivityComment = (UserID,ActivityID,FatherUserID,FirsUserID,Comment,callback)=>{
  let queryObj={
    UserID:UserID,
    ActivityID:ActivityID,
    FatherUserID:FatherUserID,
    FirsUserID:FirsUserID,
    Comment:Comment
  };
  getData('ZQ.APP.ActivityManage.ActivityComment',queryObj,(err,data)=>{
    if(err){
      callback(err)
    }else {
      if(data.ResultCode===1){
        callback(null,data);
      }else{
        callback(data.ResultMessage);
      }
    }
  })
}

//删除活动评论
export const deleteActivityComment =(userid, commentid, callback) => {
  let queryObj = {
    UserID:userid,
    CommentID:commentid
  }
  getData('ZQ.APP.ActivityManage.DeleteComment',queryObj,(err,data) => {
    if (err) {
      callback(err)
    }else {
      if(data.ResultCode===1){
        callback(null,data);
      }else {
        callback(data.ResultMessage);
      }
    }
  })
}

//获取活动报名 - 不需要支付
export const getActivitySignUp = (userid, activityid, isneedaudit, paytype, payaccount, orderno, callback) => {
  let queryObj={
    UserID: userid,
    ActivityID: activityid,
    IsNeedAudit: isneedaudit,
    PayType: paytype,
    PayAccount: payaccount,
    OrderNo: orderno
  };
  getData('ZQ.APP.ActivityManage.SignUp',queryObj,(err,data)=>{
    if (err){
      callback(err)
    }else{
      if(data.ResultCode===1){
        callback(null,data);
      }else {
        callback(data.ResultMessage);
      }
    }
  })
}

//活动报名 － 需要支付 paytype = 1 支付宝, paytype = 2 微信
export const getActivitySignUpNeedPay = (userid, activityid, orderid, paytype, callback) => {
  let queryObj={
    ActivityID: activityid,
		OrderID: orderid,
		UserID: userid,
		PayType: paytype
  };
  getData('ZQ.APP.ActivityManage.SaveRegistrationInfo',queryObj,(err,data)=>{
    if (err){
      callback(err)
    }else{
      if(data.ResultCode===1){
        callback(null,data);
      }else {
        callback(data.ResultMessage);
      }
    }
  })
}


//获取活动报名结果
export const getSignUpResult=(userid, activityid, callback)=>{
  let queryObj={
    UserID: userid,
    ActivityID: activityid,
  };
  getData('ZQ.APP.ActivityManage.GetSignUpResult',queryObj,(err,data)=>{
    if (err) {
      callback(err)
    }else {
      if(data.ResultCode===1){
        callback(null,data);
      }else {
        callback(data.ResultMessage);
      }
    }
  })
}

//查看一个用户已经报名的活动
export const getUserActivities = (userid, callback) => {
  let queryObj = {
    UserId: userid,
  };
  getData('ZQ.APP.Mime.UserActivity', queryObj, (err, data) => {
    if(err){
      callback(err)
    } else {
      if (data.ResultCode === 1){
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}


//alipay 签名
export const getAlipaySign = (activityid, title, money, userid, callback) => {
  let queryObj = {
    ActivityId: activityid,
		Title: title,
		Money: money,
		UserID: userid,
  };
  getData("ZQ.APP.ActivityManage.AlipaySign", queryObj, (err, data) => {
    if(err){
      callback(err)
    } else {
      if (data.ResultCode === 1){
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}
