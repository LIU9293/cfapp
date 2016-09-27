/*
 * this is the file that contains whole reducers for app
 */
import { combineReducers } from 'redux';

var initUserState = {login: false, userid: null, userdata:null}

function GlobleAlert(state = {show:false,message:null},action) {
  switch (action.type) {
    case 'SHOW_ALERT':
      return{
        ...state,
        show:true,
        message:action.message
      }
    case 'HIDE_ALERT':
      return{
        ...state,
        show:false,
        message:null
      }
    default:
      return state
  }
}

//user Reducer存放了用户的登录信息，已登录的用户可以获取到昵称、电话、头像
function user(state = initUserState, action){
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
        login: true,
        userid: action.userid,
        userdata: action.userdata,
      }
    case 'LOG_OUT':
      return {
        ...state,
        login: false,
        userid: null,
        userdata: null,
      }
    default:
      return state
  }
}

//点赞Reducer存放了在APP生命周期中的点赞内容
function dianzan(state = {}, action) {
  switch (action.type) {
    case 'UPDATE_LIKE':
      return {
        ...state,
        [action.objid]: {isliked: action.isliked, num: action.num}
      }
    case 'LIKE_TOGGLE':
    // {00 :{likenum:0,isliked:t/f}}
      return {
        ...state,
        [action.objid]: {
          isliked: !state[action.objid].isliked,
          num: state[action.objid].isliked ? (state[action.objid].num - 1 ) : (state[action.objid].num + 1 )
        }
      }
    default:
      return state
  }
}

//收藏Reducer存放了在APP生命周期中的点赞内容
function collect(state = {}, action) {
  switch (action.type) {
    case 'UPDATE_COLLECT':
      return {
        ...state,
        [action.objid]: {iscollect: action.iscollect, num: action.num}
      }
    case 'COLLECT_TOGGLE':
    // {00 :{collectnum:0,iscollect:t/f}}
      return {
        ...state,
        [action.objid]: {
          iscollect: !state[action.objid].iscollect,
          num: state[action.objid].iscollect ? (state[action.objid].num - 1 ) : (state[action.objid].num + 1 )
        }
      }
    default:
      return state
  }
}

function selectoption(state = {selectid : "-1",selectvalue : "请选择频道",display:"none"},action) {
  switch (action.type) {
    case 'UPDATE_SELECTOPTION':
      return {
        ...state,
        selectid : action.selectid,
        selectvalue : action.selectvalue,
        display :action.display
      }
      case 'TOGGLE_SELECTOPTION':
        return{
          ...state,
          selectid : state.selectid,
          selectvalue : state.selectvalue,
          display:state.display === "none" ?"" :"none",
        }
    default:
      return state
  }
}

//发帖的Reducer
function editorOperate(state = {},action) {
  switch (action.type) {
    case 'UPDATE_EDITOR':
      return{
        ...state,
        [action.userid]:action.editorcomment
      }
    default:
      return state
  }
}
//评论的Reducer
function commentOperate(state = {},action) {
    switch (action.type) {
      case 'UPDATE_COMMENT':
        return{
          ...state,
          [action.postID]: action.commentData
        }
        break;
      case 'INSERT_TOP_LEVEL_COMMENT':
        state[action.postID].push(action.commentData);
        return {...state}
        break;
      case 'INSERT_SECOND_LEVEL_COMMENT':
        let newState = state[action.postID].map((item,ii)=>{
          if(item.ID == action.ID){
            item.ChildList.push(action.commentData)
          };
          return item
        })
        return {
          ...state,
          [action.postID]: newState
        }
        break;
      case 'DELETE_TOP_COMMENT':
        state[action.postID].map((item,ii)=>{
          if(item.ID === action.commentid){
            state[action.postID].splice(ii, 1);
          }
        })
        return {
          ...state,
          [action.postID]:state[action.postID]
        }
        break;
      case 'DELETE_SECOND_COMMENT':
        state[action.postID].map((item,ii)=>{
          item.ChildList.map((item2,iii)=>{
            if(item2.ID === action.commentid){
              item.ChildList.splice(iii, 1);
            }
          })
        })
        return{
          ...state,
          [action.postID]: state[action.postID]
        }
        break;
      default:
        return state
    }
}

//添加评论请求数据的Reducer
function addCommentOperate(state = {userName :"",objFatherid:"",objid:"",fatherName:"",comment:""},action) {
  switch (action.type) {
    case 'UPDATE_QUEPARAM':
      return{
        ...state,
        userName : action.userName,
        objFatherid : action.objFatherid,
        objid : action.objid,
        fatherName : action.fatherName,
        comment : action.comment
      }
    default:
      return state
  }
}

//这个Reducer会在APP刚开始的时候或者用户登录的时候更新，获取到用户所有已经报名的活动列表
function yibaoming( state = {}, action ){
  switch (action.type) {
    case 'JOIN_ACTIVITY':
      return {
        ...state,
        [action.id]: '已报名',
      }
      break;
    case 'CANCEL_ACTIVITY':
      if(state[action.id]){
        delete state[action.id];
      }
      return {...state}
      break;
    default:
      return state
  }
}

//这个Reducer会在APP一开始的时候更新，获取所有活动的状态
function yijieshu( state = {}, action ){
  switch (action.type) {
    case 'ADD_CLOSED':
      return {
        ...state,
        [action.id]: '已结束',
      }
    default:
      return state
  }
}

function availableCities( state = {}, action){
  switch (action.type) {
    case 'UPDATE_AVAILABLE_CITY':
      return {
        ...state,
        [action.cityID]: state[action.cityID] ? state[action.cityID] + 1 : 1
      }
    default:
      return state
  }
}

//这个Reducer会存放搜索的关键字和数据
function search( state = {key: '', page: 0, haveMore: false }, action ){
  switch (action.type) {
    case 'UPDATE_SEARCH_KEY':
      return {
        ...state,
        key: action.key
      }
      break;
    case 'UPDATE_SEARCH_PAGE':
      return {
        ...state,
        page: action.page,
        haveMore: action.haveMore,
      }
      break;
    default:
      return state
  }
}

//这个Reducer存放所有发现页列表，任何需要展示发现文章列表地方可以直接用
// discoverListData.data =
// {
//   avatar: 头像链接,
//   category: 频道字符串,
//   description: 描述，最大72长度,
//   nickName: 昵称,
//   cover: 封面，没有的话写‘’！！！
//   title: 标题,
//   time: 时间，（2小时前。。。）
//   viewNum: Int, 查看量
//   likeNum: Int, 赞数量
//   essence: Int, 是否精华，1精华，0不精华
//   top: Int, 是否置顶，同上
//   recommand: Int, 是否推荐，同上
//   id: 帖子ID
//   commentNum: 评论数
//   type: 文章类别 1长文 2链接
//   content: 内容
// }

function discoverListData( state = {recommandData: [], subscribeData: [], userArticle: []}, action ){
  switch (action.type) {
    case 'UPDATE_DISCOVER_LIST_DATA':
      return{
        ...state,
        recommandData: action.data
      }
      break;
    case 'UPDATE_DISCOVER_SUBSCRIBE_DATA':
      return{
        ...state,
        subscribeData: action.data
      }
      break;
    case 'UPDATE_USER_ARTICLES':
      return{
        ...state,
        userArticle: action.data
      }
    default:
      return state
  }
}

//这个Reducer存放所有活动列表，任何需要展示发现文章列表地方可以直接用
// activityListData.data =
// {
//   address: 地址,
//   content: 内容, HTML字符串
//   endDate: 结束时间
//   startDate: 开始时间
//   id: 活动ID
//   state: 状态，已开始／未开始
//   title: 标题
//   cityID: 城市ID
//   audit: 是否审核，0不审核，1审核
//   enrolled: 已报名数量
//   cover: 封面
// }

function activityListData( state = {data: []}, action ){
  switch (action.type) {
    case 'UPDATE_ACTIVITY_LIST_DATA':
      return{
        ...state,
        data: action.data
      }
      break;
    default:
      return state
  }
}


function loading ( state = false, action){
  switch (action.type) {
    case 'START_LOADING':
      return true
      break;
    case 'STOP_LOADING':
      return false
      break;
    default:
      return state
  }
}

/*
secretaryMessage.data:
ZTMT_CONTENT:    "测试文章，请点赞，请收藏，请回复"
ZTMT_ID:         "f78f1ab68a2145e7a95581befff7573e"  unique ID of the message
ZTMT_OBJECTID:   "84e655c8fa51454aab5c688195538011"  article id or activity id
ZTMT_SENDTIME:   "2016-09-08 16:34"
ZTMT_TITLE:      "Lock收藏了您的文章，快去查看啦~"
ZTMT_TYPE:        "帖子"
*/
function secretaryMessage ( state = {data: [], UnreadMessages: 0}, action ){
  switch (action.type) {
    case 'UPDATE_SECRETARY_MESSAGE':
      let unReadData = action.data.filter(i => i.readed !== true);
      let UnreadMessages = unReadData.length;
      return{
        ...state,
        UnreadMessages: UnreadMessages,
        data: action.data,
      }
      break;
    case 'CLEAR_SECRETARY_MESSAGE':
      return{
        ...state,
        UnreadMessages: 0,
        data: [],
      }
      break;
    case 'CLEAR_A_MESSAGE':
      return{
        ...state,
        data: state.data.filter(i => i.ZTMT_ID !== action.id)
      }
      break;
    case 'READ_A_MESSAGE':
      let newData = state.data.map((item, ii)=>{
        if(item.ZTMT_ID == action.id){
          return {...item, readed: true};
        } else {
          return item;
        }
      })
      return{
        ...state,
        UnreadMessages: state.UnreadMessages - 1,
        data: newData,
      }
    default:
      return state
  }
}

function topics ( state = {available: {}, selected: {}}, action ){
  switch (action.type) {
    case 'UPDATE_AVAILABLE_TOPICS':
      return{
        ...state,
        available: action.data,
      }
      break;
    case 'UPDATE_SELECTED_TOPICS':
      return{
        ...state,
        selected: action.data,
      }
    case 'ADD_SELECTED_TOPIC':
      return{
        ...state,
        selected: {
          ...state.selected,
          [action.id]: action.name,
        }
      }
    case 'DELETE_SELECTED_TOPICS':
      delete state.selected[action.id];
      return {...state}
    case 'CLEAR_SELECTED_TOPICS':
      return{
        ...state,
        selected: {}
      }
    default:
      return state
  }
}

function StatusBarStyleIOS ( state = 'default', action ){
  switch (action.type) {
    case 'SET_DEFAULT':
      return 'default'
      break;
    case 'SET_LIGHT':
      return 'light-content'
      break;
    default:
      return state
  }
}

function allActivityData ( state = [], action){
  switch (action.type) {
    case 'UPDATE_ALL_ACTIVITY_DATA':
      return action.data;
      break;
    default:
      return state
  }
}

function network ( state = true, action ){
  switch (action.type) {
    case 'SET_NETWORK_STATUS':
      return action.status
      break;
    default:
      return state
  }
}

export default combineReducers({
  user,
  dianzan,
  yibaoming,
  yijieshu,
  search,
  discoverListData,
  commentOperate,
  editorOperate,
  loading,
  addCommentOperate,
  activityListData,
  commentOperate,
  editorOperate,
  loading,
  availableCities,
  collect,
  selectoption,
  secretaryMessage,
  topics,
  StatusBarStyleIOS,
  allActivityData,
  GlobleAlert,
  network
})
