import React, { Component, } from 'react';
import { Navigator, NetInfo, Alert } from 'react-native';
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
import RegistDetails from './view/profile/RegistDetail';
import SetPassword from './view/profile/setPassWord';
import SetUserInfo from './view/profile/setUserInfo';
import Disconnect from './view/common/BadNetwork';

class Route extends Component{

  constructor(props){
    super(props);
    this.renderScene = this.renderScene.bind(this);
    this.handleNetWorkChange = this.handleNetWorkChange.bind(this);
    this.state = {
      reconnected: false
    };
    this.previousRoute = null;
  }

  componentDidMount(){
    NetInfo.addEventListener(
        'change',
        this.handleNetWorkChange
    );
    setTimeout(()=>{
      NetInfo.isConnected.fetch().then(isConnected => {
        if(!isConnected){
          Alert.alert('请检查网络连接～')
          this.previousRoute = {}
        }
      });
    },1000)
  }

  //每次网络变化的时候，更新到redux store，如果之前有记录下路由并有信号，则认为是重新连接上
  handleNetWorkChange(info){
    console.log(info);
    if(info == 'none' || info == 'NONE' || info == 'unknown' || info == 'UNKNOWN'){
      this.props.changeNetwork(false);
    } else{
      this.props.changeNetwork(true);
      if(this.previousRoute){
        this.setState({
          reconnected: true
        })
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log(nextProps, nextState);
    if(nextProps.network == false){
      return false
    } else {
      return true
    }
  }

  renderScene(route, navigator){
    //在render之前，如果没有信号，则改变路由
    if(!this.props.network){
      this.previousRoute = {...route};
      route.ident = 'disconnect';
    } else if(this.state.reconnected){
      //如果重新连接，替换之前的路由为现在的路由，并重置navigator stack
      route = {...this.previousRoute};
      navigator.immediatelyResetRouteStack([{},route])
      this.previousRoute = null;
      this.setState({reconnected: false})
    }
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
      case 'registSendCode': //注册页面发送验证码后跳转的页面
        return <RegistDetails navigator = {navigator} telPhone = {route.telPhone}/>
      case 'setpass'://设置密码
        return <SetPassword navigator = {navigator} telphone = {route.telphone} code = {route.code}/>
      case 'setuserinfo':
        return <SetUserInfo navigator = { navigator } userid = {route.userid}/>
      case 'disconnect':
        return <Disconnect navigator = { navigator } />
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

function mapStateToProps(store){
  return{
    network: store.network
  }
}
function mapDispatchToProps(dispatch){
  return{
    changeNetwork: (status) => {dispatch({type: 'SET_NETWORK_STATUS', status: status})}
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Route)
