import { getData, getDataBase64 } from './basis.js';

//查找小秘书消息 type = 全部消息、未读消息
export const secretaryMessage = (userid, type, callback) => {
  let queryObj = {
    UserId: userid,
    Type: type
  };
  getData('ZQ.APP.Message.SmallSecretaryMessage', queryObj, (err,data) => {
    if(err){callback(err)} else {
      if (data.ResultCode === 1){
        console.log('获取小秘书消息成功，返回的数据是：');
        console.log(data);
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}

//查找活动小组消息
export const activityMessage = (userid, callback) => {
  let queryObj = {
    UserId: userid
  };
  getData('ZQ.APP.Message.UserGroups', queryObj, (err,data) => {
    if(err){callback(err)} else {
      if (data.ResultCode === 1){
        console.log('获取活动小组消息成功，返回的数据是：');
        console.log(data);
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}

//查找未读消息集合
export const unreadMessage = (userid, callback) => {
  let queryObj = {
    UserId: userid
  };
  getData('ZQ.APP.Message.UnRead', queryObj, (err,data) => {
    if(err){callback(err)} else {
      if (data.ResultCode === 1){
        console.log('获取未读消息成功，返回的数据是：');
        console.log(data);
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}

//查找未读消息内容
export const unreadMessageContent = (userid, senderid, callback) => {
  let queryObj = {
    UserId: userid,
    SendUserId: senderid
  };
  getData('ZQ.APP.Message.UnReadMessage', queryObj, (err,data) => {
    if(err){callback(err)} else {
      if (data.ResultCode === 1){
        console.log('获取未读消息内容成功，返回的数据是：');
        console.log(data);
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}


export const myReceiveCollection = (userid, pagesize, pagecurrent, callback) => {
  let queryObj = {
    UserId: userid,
    PageSize: pagesize,
    PageCurrent: pagecurrent,
  };
  getData('ZQ.APP.Account.MyCollect', queryObj, (err,data) => {
    if(err){callback(err)} else {
      if (data.ResultCode === 1){
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}
export const myReceiveLike = (userid, pagesize, pagecurrent, callback) => {
  let queryObj = {
    UserId: userid,
    PageSize: pagesize,
    PageCurrent: pagecurrent,
  };
  getData('ZQ.APP.Account.MyLike', queryObj, (err,data) => {
    if(err){callback(err)} else {
      if (data.ResultCode === 1){
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}
export const myReceiveComment = (userid, pagesize, pagecurrent, callback) => {
  let queryObj = {
    UserId: userid,
    PageSize: pagesize,
    PageCurrent: pagecurrent,
  };
  getData('ZQ.APP.Account.MyComment', queryObj, (err,data) => {
    if(err){callback(err)} else {
      if (data.ResultCode === 1){
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}
