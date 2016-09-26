import { getData, getDataBase64 } from './basis.js';

//获取轮播图
export const getCarousel = (callback) => {
  getData('ZQ.APP.Found.HomeFig', {}, (err,data)=>{
    if(err){callback(err)} else {
      if (data.ResultCode === 1){
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}

//发现首页获取帖子列表
export const getDiscoverList = (userID, pageNumber, perPageNumber, type, callback) => {
  let queryObj = {
    userID: userID,
    PageNumber: pageNumber,
    PerPageNumber: perPageNumber,
    Type: type,
  }
  getDataBase64('ZQ.APP.Found.GetPostsList', queryObj, (err, data)=>{
    if (err) {
      callback(err);
    }  else {
      if (data.ResultCode === 1){
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}

//获取发现帖子详情
export const getDiscoverPost = (postID, userID, callback) => {
  let queryObj = {
    PostsId: postID,
    UserID: userID
  }
  getDataBase64('ZQ.APP.Found.PostsInfo', queryObj, (err, data) => {
    if(err){
      callback(err);
    } else {
      if (data.ResultCode === 1){
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}

//发布发现帖子
export const postDiscoverArticle = (userid, title, cover, category, HTMLcontent, posttype, coverSRC, postid, type, callback) => {
  let queryObj = {
    UserId: userid,
    PostsTitle: title,
    PostsFrontCover: cover,
    PostsChannel: category,
    PostsContent: HTMLcontent,
    PostType: type,
    PostFrontCoverSrc: coverSRC,
    PostsId: postid,
    Type : type,
  }
  getData('ZQ.APP.Found.Posts', queryObj, (err, data) => {
    if(err){
      callback(err);
    } else {
      console.log(data);
      if (data.ResultCode === 1){
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}

//获取发现帖子评论
export const getDiscoverPostComment = (userid,postsId,pageNum,callback) => {
  let queryObj = {
    UserID: userid,
    PostsId: postsId,
    PageNum: pageNum,
    PageSize: 7
  };
  getData('ZQ.APP.Found.CommentInfo', queryObj, (err, data) => {
    if(err){
      callback(err);
    } else {
      if (data.ResultCode === 1){
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}

//获得发现筛选列表
export const getDiscoverFilterList = (callback) => {
  let queryObj = {};
  getData('ZQ.APP.Found.GetChannelList', queryObj, (err, data) => {
    if (err){callback(err)} else {
      if (data.ResultCode === 1){
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      };
    }
  })
}

//获得用户筛选列表
export const getMyDiscoverFilterList = (userid, callback) => {
  let queryObj = {
    UserID: userid
  };
  getData('ZQ.APP.Found.MyChannel', queryObj, (err, data) => {
    if (err){callback(err)} else {
      if (data.ResultCode === 1){
        callback(null, data);
      } else{
        callback(data.ResultMessage);
      };
    }
  })
}

//更新用户筛选列表
export const updateMyDiscoverFilterList = (userid, channels, type, callback) => {
  let queryObj = {
    UserID: userid,
    Channels: channels,
    Type: type,
  };
  getData('ZQ.APP.Found.UpdateChannel', queryObj, (err, data) => {
    if (err){callback(err)} else {
      if (data.ResultCode === 1){
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      };
    }
  })
}

//点赞
export const clickLove = (userID,objectID,state,callback)=>{
  let queryObj = {
    UserID: userID,
    ObjectID: objectID,
    State:state
  };
  getData("ZQ.APP.Found.AppLike",queryObj,(err,data)=>{
    if(err){
      callback(err);
    }else {
      console.log(data);
      if(data.ResultCode === 1){
        callback(null, data);
      }else {
        callback(data.ResultMessage);
      };
    }
  })
}
//添加评论
export const addComment = (UserID,PostsID,ObjectFatherID,Comment,ObjectID,callback)=>{
  let queryObj = {
    UserID: UserID,
    PostID: PostsID,
    ObjectFatherID:ObjectFatherID,
    Comment:Comment,
    ObjectID:ObjectID
  };
  getData("ZQ.APP.Found.PostComment",queryObj,(err,data)=>{
    if(err){
      callback(err);
    }else {
      console.log(data);
      if(data.ResultCode === 1){
        callback(null, data);
      }else {
        callback(data.ResultMessage);
      };
    }
  })
}

//删除评论
export const deleteComment = (CommentID,UserID,callback)=>{
  let queryObj = {
    CommentID: CommentID,
    UserID: UserID
  };
  getData("ZQ.APP.Found.DeleteComment",queryObj,(err,data)=>{
    if(err){
      callback(err);
    }else {
      if(data.ResultCode === 1){
        callback(null, data);
      }else {
        callback(data.ResultMessage);
      };
    }
  })
}

//增加帖子点击率
export const AddCTR = (userid,postid,callback)=>{
  let queryObj = {
    UserID: userid,
    PostsID: postid
  };
  getData("ZQ.APP.Found.AddCTR",queryObj,(err,data)=>{
    if(err){
      callback(err);
    }else {
      if(data.ResultCode === 1){
        callback(null, data);
      }else {
        callback(data.ResultMessage);
      }
    }
  })
}

//收藏
export const Collect = (userid,objid,type,callback)=>{
  let queryObj = {
    UserID: userid,
    ObjectID: objid,
    type:type
  };
  getData("ZQ.APP.Found.Collect",queryObj,(err,data)=>{
    if(err){
      callback(err);
    }else {
      if(data.ResultCode === 1)
      {
        callback(null, data);
      }else {
        callback(data.ResultMessage);
      }
    }
  })
}

//获取发帖的channel
export const PostsChannel = (userid,callback)=>{
  let queryObj = {
    UserID: userid
  };
  getData("ZQ.APP.Found.PostsChannel",queryObj,(err,data)=>{
    if(err){
      callback(err);
    }else {
      if(data.ResultCode === 1)
      {
        callback(null, data);
      }else {
        callback(data.ResultMessage);
      }
    }
  })
}

//精华
export const essenceArticle = (pageNumber, perPageNumber, callback) => {
  let queryObj = {
    PageNumber: pageNumber,
    PerPageNumber: perPageNumber,
  };
  getData("ZQ.APP.Found.NicePostList",queryObj,(err,data)=>{
    if(err){
      callback(err);
    }else {
      if(data.ResultCode === 1)
      {
        callback(null, data);
      }else {
        callback(data.ResultMessage);
      }
    }
  })
}

export const getPostsByChannel = (channels, pageNumber, perPageNumber, type, callback ) => {
  let queryObj = {
    ChannelId: channels,
    PageNumber: pageNumber,
    PerPageNumber: perPageNumber,
    Type: type,
  };
  getData("ZQ.APP.Found.ByChannelGetPostList",queryObj,(err,data) => {
    if(err){
      callback(err);
    }else {
      if(data.ResultCode === 1)
      {
        callback(null, data);
      }else {
        callback(data.ResultMessage);
      }
    }
  })
}
