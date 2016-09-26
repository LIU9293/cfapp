import { getData, getDataBase64 } from './basis.js';

//用户发短信 type = 注册，忘记密码，绑定手机
export const sendSMS = (phone, type, callback) => {
  let queryObj = {
    PhoneNumber: phone,
    Type: type
  };
  getData('ZQ.APP.Account.SendSMS', queryObj, (err,data) => {
    if(err){callback(err)} else {
      if (data.ResultCode === 1){
        console.log('发送短信成功，返回的数据是：');
        console.log(data);
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}

//用户注册
export const userRegister = (phone, code, password, c_id, ios_token, callback) => {
  let queryObj = {
    PhoneNumber: phone,
    Codes: code,
    PassWord: password,
    C_ID: c_id,
    IOS_Token: ios_token
  };
  getData('ZQ.APP.Account.Registered', queryObj, (err,data) => {
    if(err){callback(err)} else {
      if (data.ResultCode === 1){
        console.log('用户注册成功，返回的数据是：');
        console.log(data);
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}

//用户登陆
export const userLogin = (phone, password, c_id, ios_token, callback) => {
  let queryObj = {
    PhoneNumber: phone,
    PassWord: password,
    C_ID: c_id,
    IOS_Token: ios_token
  };
  getData('ZQ.APP.Account.Login', queryObj, (err,data) => {
    if(err){callback(err)} else {
      if (data.ResultCode === 1){
        console.log('用户登陆成功，返回的数据是：');
        console.log(data);
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}


//用户基本信息
export const getUserInfo = (userid, callback) => {
  let queryObj = {
    UserId: userid,
  };
  getData('ZQ.APP.Mime.UserBaseInfo', queryObj, (err, data) => {
    if(err){callback(err)} else {
      if (data.ResultCode === 1){
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}

//我的帖子
export const getUserArticles = (userid, callback) =>{
  let queryObj = {
    UserId: userid,
  };
  getData('ZQ.APP.Mime.UserArticle', queryObj, (err, data) => {
    if(err){callback(err)} else {
      if (data.ResultCode === 1){
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}

//我的收藏
export const getUserCollection = (userid, callback) =>{
  let queryObj = {
    UserId: userid,
  };
  getData('ZQ.APP.Mime.UserCollect', queryObj, (err, data) => {
    if(err){callback(err)} else {
      if (data.ResultCode === 1){
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}

export const getUserActivity = (userid,callback) => {
  let queryObj = {
    UserId: userid,
    UserHeadImg: useravatar
  };
  getData('ZQ.APP.Mime.UserActivity', queryObj, (err, data) => {
    if(err){callback(err)} else {
      if (data.ResultCode === 1){
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}

//更新我的头像
export const postUserAvatar = (userid, useravatar, callback) =>{
  let queryObj = {
    UserId: userid,
    UserHeadImg: useravatar
  };
  getData('ZQ.APP.Mime.UploadHeadImg', queryObj, (err, data) => {
    if(err){callback(err)} else {
      if (data.ResultCode === 1){
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}

//更改用户昵称
export const updateUserNickName = (userid, nickname, callback) =>{
  let queryObj = {
    UserId: userid,
    NickName: nickname
  };
  getData('ZQ.APP.Mime.ModifyNickName', queryObj, (err, data) => {
    if(err){callback(err)} else {
      if (data.ResultCode === 1){
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}

//修改个性签名
export const SetUserDes = (UserId,UserDes,callback)=>{
  let queryObj = {
    UserId: UserId,
    UserDes: UserDes
  };
  getData('ZQ.APP.Mime.SetUserDes', queryObj, (err, data) => {
    if(err){callback(err)} else {
      if (data.ResultCode === 1){
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}

//查看用户赞的内容
export const getUserLikes = (pageSize, pageCurrent, userid, type, callback) => {
  let queryObj = {
    PageSize: pageSize,
    PageCurrent: pageCurrent,
    UserId: userid,
    Type: type,
  };
  getData('ZQ.APP.Mime.MineLike', queryObj, (err, data) => {
    if(err){callback(err)} else {
      if (data.ResultCode === 1){
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}

//查看用户评论
export const getUserComment = (pageSize, pageCurrent, userid, type, callback) => {
  let queryObj = {
    PageSize: pageSize,
    PageCurrent: pageCurrent,
    UserId: userid,
    Type: type,
  };
  getData('ZQ.APP.Mime.MineComment', queryObj, (err, data) => {
    if(err){callback(err)} else {
      if (data.ResultCode === 1){
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}

//第三方登陆
export const thirdLogin = (OpenId,LoginSoure,C_ID,IOS_Token,callback) =>{
  let queryObj = {
    OpenId: OpenId,
    LoginSoure: LoginSoure,
    C_ID: C_ID,
    IOS_Token: IOS_Token,
  };
  getData('ZQ.APP.Account.OAuthLogin', queryObj, (err, data) => {
    if(err){callback(err)} else {
      if (data.ResultCode === 1){
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}

//第三方登陆绑定手机
export const bindPhoneNumber = (OpendId,NickName,Sex,Soucre,PhoneNumber,PassWord,Codes,C_ID,IOS_Token,callback) =>{
  let queryObj = {
    OpendId: OpendId,
    NickName: NickName,
    Sex: Sex,
    Soucre: Soucre,
    PhoneNumber:PhoneNumber,
    PassWord:PassWord,
    Codes:Codes,
    C_ID:C_ID,
    IOS_Token:IOS_Token
  };
  getData('ZQ.APP.Account.BindPhoneNumber', queryObj, (err, data) => {
    if(err){callback(err)} else {
      if (data.ResultCode === 1){
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}

//绑定第三方登陆
export const bindAuthor = (OpendId,NickName,Sex,Soucre,UserID,callback) =>{
  let queryObj = {
    OpendId: OpendId,
    NickName: NickName,
    Sex: Sex,
    Soucre: Soucre,
    UserID:UserID,
  };
  getData('ZQ.APP.Mime.BindAuthor', queryObj, (err, data) => {
    if(err){callback(err)} else {
      if (data.ResultCode === 1){
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}


//重置密码
export const resetPassword = (PhoneNumber,NewPassWord,Codes,callback) => {
  let queryObj = {
    PhoneNumber: PhoneNumber,
    NewPassWord: NewPassWord,
    Codes: Codes,
  };
  getData('ZQ.APP.Account.ResetPassWord', queryObj, (err, data) => {
    if(err){callback(err)} else {
      if (data.ResultCode === 1){
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}

//更换手机号
export const reBindPhoneNumber = (UserId,PhoneNumber,Codes,callback) =>{
  let queryObj = {
    UserId: UserId,
    PhoneNumber: PhoneNumber,
    Codes: Codes,
  };
  getData('ZQ.APP.Account.ChangeBindPhone', queryObj, (err, data) => {
    if(err){callback(err)} else {
      if (data.ResultCode === 1){
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}

//修改用户密码
export const modefyPass = (UserId,OldPassWord,NewPassWord,callback) => {
  let queryObj = {
    UserId: UserId,
    OldPassWord: OldPassWord,
    NewPassWord: NewPassWord,
  };
  getData('ZQ.APP.Mime.UpdatePwd', queryObj, (err, data) => {
    if(err){callback(err)} else {
      if (data.ResultCode === 1){
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}
