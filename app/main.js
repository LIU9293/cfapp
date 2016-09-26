import React, { Component, } from 'react';
import { AsyncStorage, View } from 'react-native';
import store from './redux/store';
import { connect } from 'react-redux';
import { getPlaygroundList, getPostsByChannel, getUserInfo,
  getUserActivities, getMyDiscoverFilterList, secretaryMessage } from './vendor/connection';
import Route from './route';
import * as wechat from 'react-native-wechat';

class App extends Component{

  componentWillMount(){
    AsyncStorage.getItem('UserID')
      .then((userid) => {
        if (userid !== null){
          this.props.login(userid, {});
          getUserInfo(userid, (err,data) => {
            if(err){
              console.log(err);
            } else {
              console.log(data)
              let userData = {
                avatar: data.ZUT_HEADIMG,
                nickName: data.ZUT_NICKNAME,
                phone: data.ZUT_PHONE,
                userDesc : data.UserDes,
                wechat: data.IsBindWeChat,
                qq: data.IsBindQQ,
                linkedin: data.IsBindLinkedIn,
              }
              this.props.login(userid, userData);
            }
          })
          getMyDiscoverFilterList(userid, (err, data) => {
            if(err){console.log(err)} else {
              let select = {};
              data.ChannelList.map((item, ii)=>{
                select[item.ChannelID] = item.ChannelName
              })
              this.props.update_user_topic(select);
            }
          })
          getUserActivities(userid, (err,data) => {
            if(err){console.log(err)} else {
              data.UserActivityList.map((item,ii)=>{
                if(item.ZET_ActivityState !== '报名失败'){
                  this.props.baoming(item.ZET_ID);
                }
              })
            }
          })
          secretaryMessage(userid, 'No', (err,data)=>{
            if(err){
              console.log(err);
            } else {
              if(data.List.length > 0){
                AsyncStorage.setItem('Messages', JSON.stringify(this.props.messages.concat(data.List)))
                  .catch(err => console.log(err))
                  .done();
                this.props.update_messages(this.props.messages.concat(data.List));
              }
            }
          })
        }
        getPlaygroundList('', 1, 1000, (err,data)=>{
          if(err){console.log(err)} else {
            this.props.update_all_activity_data(data);
            data.map((item,ii)=>{
              this.props.addAvailableCity(item.CityID);
              if(item.ActivityState.trim() == '已结束'){
                this.props.closeActivity(item.ActivityID)
              }
            })
          }
        })
      })
      .catch((error) => console.log('AsyncStorage error: ' + error.message))
      .done();
    AsyncStorage.getItem('Messages')
      .then( messages => JSON.parse(messages) )
      .then( messagesData => {
        console.log(messagesData);
        this.props.update_messages(this.props.messages.concat(messagesData));
      })
      .catch( error => console.log('Get AsyncStorage Messages Error: ' + error.message) )
      .done()
  }

  async componentDidMount(){
    try {
      await wechat.registerApp('wx2cab3c4ed8af9a7b');
    } catch (e) {
      console.error(e);
    }
  }

  render(){
    return(
      <Route ref = "window"/>
    )
  }
}

function mapStateToProps(store){
  return{
    user: store.user ,
    messages: store.secretaryMessage.data ,
  }
}

function mapDispatchToProps(dispatch){
  return{
    login: (userid,data) => {dispatch({type:'LOG_IN', userid:userid, userdata:data})},
    baoming: (id) => {dispatch({type:'JOIN_ACTIVITY', id: id})},
    closeActivity: (id) => {dispatch({type:'ADD_CLOSED', id: id})},
    startLoading: () => {dispatch({type:'START_LOADING'})},
    stopLoading: () => {dispatch({type:'STOP_LOADING'})},
    addAvailableCity: (cityID) => {dispatch({type:'UPDATE_AVAILABLE_CITY', cityID: cityID })},
    update_user_topic: (data) => {dispatch({type: "UPDATE_SELECTED_TOPICS",data: data})},
    update_all_activity_data: (data) => {dispatch({type: 'UPDATE_ALL_ACTIVITY_DATA', data: data})},
    update_messages: (data) => {dispatch({type:'UPDATE_SECRETARY_MESSAGE', data: data})},
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(App)
