import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, ScrollView, Dimensions, PanResponder, StatusBar, WebView, TouchableOpacity } from 'react-native';
import { getPlaygroundPost } from 'connection';
import { Container, Content, List, ListItem, Icon, Badge, Header, Title, Button } from 'native-base';
import { connect } from 'react-redux';
import { betterTextActivity } from '../../vendor/helper/betterText';
const window = Dimensions.get('window');
import MapView from 'react-native-maps';
import Loading from '../common/loading';
import GlobleAlert from '../common/MessageAlert';

class ActivityDetail extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: null,
      WebViewHeight: 1000,
      canJoin: true,
      status: '立即报名',
      loaded: false,
    }
    this.joinActivity = this.joinActivity.bind(this);
    this.scroll = this.scroll.bind(this);
  }
  componentWillMount(){
    getPlaygroundPost(this.props.activityID, this.props.user.userid || '', (err,data)=>{
      if(err){
        this.props.showAlert(err);
      } else {
        this.setState({
          data: data.Activity
        });
        setTimeout(()=>{
          this.setState({loaded: true})
        },1000)
      }
    })
    if(this.props.user.login){
      if(this.props.joined[this.props.activityID] == '已报名'){
        this.setState({
          canJoin: false,
          status: '已报名',
        })
      }
    }
    if(this.props.closed[this.props.activityID]){
      this.setState({
        canJoin: false,
        status: '已结束',
      })
    }
  }
  joinActivity(){
    if(this.props.user.login){
      this.props.navigator.push({
        ident: 'joinActivity',
        activityID: this.props.activityID,
        data: this.state.data
      })
    } else {
      this.props.navigator.push({
        ident: 'login',
      })
    }
  }
  scroll(e){
    let offsetY = e.contentOffset.y;
    let contentSizeHeight = e.contentSize.height;
    let layoutHeight = e.layoutMeasurement.height;
    console.log(offsetY,contentSizeHeight,layoutHeight);
  }
  render(){
    let html;
    if(this.state.data){
      html = betterTextActivity(this.state.data.ActivityContent);
    };
    if(this.state.loaded){
      console.log(this.state.data);
      return(
        <View style={{flex:1}}>
          <StatusBar
            showHideTransition={'fade'}
            animated={true}
            barStyle={'light-content'}
          />
          <ScrollView
            style={styles.wapper}
            onScroll={e => this.scroll(e.nativeEvent)}
            scrollEventThrottle={20}
          >
            {/*<Image
              source={{url: this.state.data ? (this.state.data.ActivityPictureUrl + '@500h_800w_1e_1c_100q') : '' }}
              resizeMode={"cover"}
              style={styles.cover}
            />*/}
            <View style={styles.titleArea}>
              <View style={{maxWidth: 225}}>
                <Text style={styles.title} numberOfLines={4}>{this.state.data.ActivityTitle}</Text>
              </View>
              <Text style={styles.title}>{this.state.data.ActivityStartDate.substr(5,6)}</Text>
            </View>
            <View style={styles.hr} />
            <View style={styles.row}>
              <Text style={styles.rowLabel}>{this.props.status}</Text>
              <Text style={styles.rowLabel}>{this.state.data.PeopleNum+'人'}</Text>
              <Text style={styles.rowLabel}>{this.props.city}</Text>
              <Text style={styles.rowLabel}>{(this.state.data.Fee == 0 ? '免费' : this.state.data.Fee + '元')}</Text>
            </View>
            <View style={styles.hr} />
            <WebView
              javaScriptEnabled={true}
              source={{ html: html || ''}}
              style={[styles.webview,{height:this.state.WebViewHeight}]}
              onNavigationStateChange={(info)=>{
                this.setState({
                  WebViewHeight: info.url.replace('about:blank%23','')/1
                })
              }}
            />
          {/*<Text style={[styles.title, {marginLeft: 20, marginTop: 30}]}>活动地点</Text>
            <MapView
              style={{
                width: window.width, height: 200,
                marginTop: 30,
                marginBottom: 60,
              }}
              initialRegion={{
                latitude: this.state.data.ActivityLatitude/1,
                longitude: this.state.data.ActivityLongitude/1,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <MapView.Marker
                coordinate={{
                  latitude: this.state.data.ActivityLatitude/1,
                  longitude: this.state.data.ActivityLongitude/1,
                }}
                title={'活动地点'}
              />
            </MapView>*/}
          </ScrollView>
          <TouchableOpacity style={[styles.Bottom,{
              backgroundColor: (this.state.canJoin ? 'steelblue' : '#ddd'),
            }]} onPress={this.joinActivity} disabled={!this.state.canJoin} >
            <Text style={{color:'#fff', fontSize:16, fontWeight: 'bold'}}>{this.state.status}</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return(
        <View style={{flex: 1}}>
          <Loading/>
          <GlobleAlert />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  wapper: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 40,
  },
  Bottom: {
    position: 'absolute',
    bottom: 0,
    width: window.width,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cover: {
    height: 200,
    width: window.width,
  },
  titleArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 30,
    minHeight: 60,
  },
  title: {
    fontSize: 22,
    lineHeight: 26,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  hr: {
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 20,
    width: window.width - 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  rowLabel: {
    fontSize: 16,
    color: '#aaa'
  },
  webview: {
    marginTop: 20,
    paddingBottom: 20,
  }
})

function mapStateToProps(store){
  return{
    user: store.user,
    joined: store.yibaoming,
    closed: store.yijieshu,
  }
}
function mapDispatchToProps(dispatch){
  return {
    showAlert:(message) =>{dispatch({type:'SHOW_ALERT',message:message})},
  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(ActivityDetail)
