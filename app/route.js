import React, { Component, } from 'react';
import { Navigator } from 'react-native';
import { connect } from 'react-redux';
import TabView from './TabView';
import Login from './view/profile/login';
import Filter from './view/discover/filter';
import Article from './view/discover/articleDetail';
import LinkDetail from './view/discover/linkDetail';
import AddCommment from './view/common/addComment';
import CommentList from './view/common/commentList';
import UserCenter from './view/user/userCenter';
import Setting from './view/profile/setting';
import Register from './view/profile/regist'
import Activity from './view/activity/activityDetail2';
import JoinActivity from './view/activity/joinActivity';
import JoinActivitySuccessfulWithPayment from './view/activity/joinActivitySuccessfulWithPayment';
import JoinActivitySuccessfulWithoutPayment from './view/activity/joinActivitySuccessfulWithoutPayment';
import BindPhoneNumbers from './view/profile/bindPhoneNumber';
import ForgetPassWord from './view/profile/forgetPassWord';
import ReBindPhoneNumbers from './view/profile/ReBindPhoneNumber';
import ModifyPassword from './view/profile/modifyPassword';
import Welcome from './view/profile/welcome';

class Route extends Component{

  constructor(props){
    super(props);
    this.renderScene = this.renderScene.bind(this)
  }

  renderScene(route, navigator){
    switch (route.ident){
      case 'login':
        return <Login navigator = { navigator } />;
      case 'filter':
        return <Filter navigator = { navigator } />;
      case 'article':
        return <Article navigator = { navigator } articleID = { route.articleID } data = { route.data } />;
      case 'link':
        return <LinkDetail navigator = { navigator } dataInfo = { route.dataInfo } commentNum = { route.commentNum } />
      case 'addcomment':
        return <AddCommment navigator = { navigator } objid = { route.objid } />
      case 'showcommentlist':
        return <CommentList navigator = { navigator } objid = { route.objid } type = { route.type } commentNum = { route.commentNum }/>
      case 'usercenter'://别人的主页
        return <UserCenter navigator = { navigator } userid = { route.userid }/>
      case 'setting':
        return <Setting navigator = { navigator } />
      case 'register':
        return <Register navigator = { navigator }/>
      case 'activity':
        return <Activity navigator = { navigator } activityID = { route.activityID } city = { route.city } status = { route.status } />
      case 'joinActivity':
        return <JoinActivity navigator = { navigator } activityID = { route.activityID } data = { route.data } />
      case 'joinActivitySuccessfulWithPayment':
        return <JoinActivitySuccessfulWithPayment navigator = { navigator } activityID = { route.activityID } data = { route.data } orderID = { route.orderID } />
      case 'joinActivitySuccessfulWithoutPayment':
        return <JoinActivitySuccessfulWithoutPayment navigator = { navigator } activityID = { route.activityID } data = { route.data } />
      case 'bindPhoneNumber':
        return <BindPhoneNumbers navigator = { navigator } thirdInfo = {route.thirdInfo} />
      case 'forgetPass':
        return <ForgetPassWord navigator = { navigator} />
      case 'rebindphonenum':
        return <ReBindPhoneNumbers navigator = { navigator} />
      case 'modifyPass':
        return <ModifyPassword navigator = { navigator } />
      case 'welcome':
        return <Welcome navigator = { navigator } />
      default:
        return <TabView navigator = { navigator } />
    }
  }

  render(){
    return (
      <Navigator
        initialRoute = {{}}
        ref = "navigator"
        renderScene = {this.renderScene.bind(this)}
        configureScene ={(route, routeStack) => ({...route.sceneConfig || Navigator.SceneConfigs.PushFromRight})}
      />
    )
  }

}

module.exports = Route
