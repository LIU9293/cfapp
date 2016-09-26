import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import { getUserComment, getUserActivities, getUserArticles, getUserLikes, getUserCollection } from 'connection';
import { millseconds2DateDiff } from '../../vendor/helper/timeTransfer';
import { id2name, dataTime2Millsecond } from 'helper';
import TimelineItem from './timelineItem';
import Loading from '../common/loading';
import GlobleAlert from '../common/MessageAlert';

class Timeline extends Component{
  constructor(props){
    super(props);
    this.state = {
      commentLoaded: false,
      commentData: [],
      articleLoaded: false,
      articleData: [],
      likeLoaded: false,
      likeData: [],
      collectLoaded: false,
      collectData: [],
      activityLoaded: false,
      activityData: [],
      loaded: false,
    };
    this.loaded = false;
    this.t = null;
    this.sortedData = [];
  }
  componentWillMount(){
    if(!this.props.user.login){
      this.props.navigator.push({
        ident: 'login'
      })
    } else {
      getUserLikes(1000, 1, this.props.user.userid, 0, (err,data)=>{
        if(err){
          console.log(err);
          this.setState({
            likeLoaded: true,
          })
        } else {
          this.setState({
            likeLoaded: true,
            likeData: data.PostsList,
          })
        }
      });
      getUserArticles(this.props.user.userid, (err,data)=>{
        if(err){
          console.log(err);
          this.setState({
            articleLoaded: true,
          })
        } else {
          console.log('发文章timeline', data.UserArticleList);
          this.setState({
            articleLoaded: true,
            articleData: data.UserArticleList,
          })
        }
      });
      getUserCollection(this.props.user.userid, (err,data) => {
        if(err){
          console.log(err);
          this.setState({
            collectLoaded: true,
          })
        } else {
          console.log('收藏timeline', data.UserCollectList);
          this.setState({
            collectLoaded: true,
            collectData: data.UserCollectList ,
          })
        };
      });
      getUserActivities(this.props.user.userid, (err,data) => {
        if(err){
          console.log(err);
          this.setState({
            activityLoaded: true,
          })
        } else {
          this.setState({
            activityLoaded: true,
            activityData: data.UserActivityList,
          })
        };
      });
      getUserComment(1000, 1, this.props.user.userid, 0, (err,data)=>{
        if(err){
          console.log(err);
          this.setState({
            commentLoaded: true,
          })
        } else {
          this.setState({
            commentLoaded: true,
            commentData: data.PostsList,
          })
        }
      });
    }
  }
  // shouldComponentUpdate(nextProps, nextState){
  //   if(nextState.loaded == this.state.loaded && nextProps == this.props){
  //     return false
  //   } else {
  //     return true
  //   }
  // }
  componentWillUnmount(){
    this.t = null;
  }
  shouldComponentUpdate(nextProps, nextState){
    if(nextState.commentLoaded && nextState.articleLoaded && nextState.likeLoaded && nextState.collectLoaded && nextState.activityLoaded && !this.state.loaded){
      this.loaded = true;
      return true;
    } else if (nextProps.user !== this.props.user){
      return true;
    } else {
      return false;
    }
  }
  render(){
    const { commentData, articleData, likeData, collectData, activityData } = this.state;
    let timeline;
    if(this.loaded){
      this.sortedData = [];
      commentData.map((item,ii)=>{
        this.sortedData.push({
          type: 'comment',
           articleType: item.Type,
           articleID: item.PostsID,
           articleContent: item.Content,
           articleChannel: item.ZctName,
           articleTitle: item.Title,
           articleCover: item.PictureUrl,
           articleWriterName: item.NickName,
           articleWriterAvatar: item.HeadUrl,
           time: millseconds2DateDiff(item.CreatDate),
           createTime: parseInt(item.CreatDate.substr(6, 13)),
        })
      });
      articleData.map((item,ii)=>{
        if(item.ZPT_STATE !== "已删除"){
          this.sortedData.push({
            type: 'article',
            articleType: item.Type,
            articleID: item.ZCT_ID,
            articleContent: item.ZPT_CONTENT,
            articleTitle: item.ZPT_TITLE,
            articleCover: item.ZPT_COVER,
            time: millseconds2DateDiff(dataTime2Millsecond(item.ArticleReleaseToNow)),
            createTime: dataTime2Millsecond(item.ArticleReleaseToNow),
          })
        }
      });
      likeData.map((item,ii)=>{
        this.sortedData.push({
          type: 'like',
          articleType: item.Type,
          articleID: item.PostsID,
          articleContent: item.Content,
          articleChannel: item.ZctName,
          articleTitle: item.Title,
          articleCover: item.PictureUrl,
          articleWriterName: item.NickName,
          articleWriterAvatar: item.HeadUrl,
          time: millseconds2DateDiff(item.CreatDate),
          createTime: parseInt(item.CreatDate.substr(6, 13)),
        })
      });
      collectData.map((item,ii)=>{
        this.sortedData.push({
          type: 'collect',
          articleType: item.UserArticle.Type,
          articleID: item.UserArticle.ZCT_ID,
          articleContent: item.UserArticle.ZPT_CONTENT,
          articleChannel: item.ZMCT_TYPE,
          articleTitle: item.UserArticle.ZPT_TITLE,
          articleCover: item.UserArticle.ZPT_COVER,
          articleWriterName: item.UserArticle.Push_People,
          time: millseconds2DateDiff(dataTime2Millsecond(item.UserArticle.CollentDate)),
          createTime: dataTime2Millsecond(item.UserArticle.CollentDate),
        })
      });
      this.sortedData.sort((a,b) => b.createTime - a.createTime)
      timeline = this.sortedData.map((item,ii)=>{
        return(
          <TimelineItem type = { item.type } key = { ii } data = { item } navigator = { this.props.navigator } />
        )
      });
      if(!this.state.loaded){
        this.t = setTimeout(()=>{
          this.setState({loaded: true})
        },300)
      }
      // activityData.map((item,ii)=>{
      //   if(item.ZET_ActivityState !== '报名失败'){
      //     this.sortedData.push({
      //       type: 'activity',
      //       activityTitle: item.ZET_TITLE,
      //       activityStartTime: item.ZET_STARTTIME,
      //       activityCity: id2name(item.City),
      //       activityID: item.ZET_ID,
      //       activityContent: item.ActivityContent,
      //       activityAddress: item.ActivityAddress,
      //       createTime:
      //     })
      //   }
      // })
      // console.log(commentData);
      // console.log(articleData);
      // console.log(likeData);
      // console.log(collectData);
      // console.log(activityData);
    }
    if(!this.state.loaded){
      return(
        <View style={{flex: 1}}>
          <Loading/>
          <GlobleAlert />
        </View>
      )
    } else if(this.sortedData.length == 0){
      return(
        <View style={styles.bg}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text>你还没有任何动态</Text>
          </View>
        </View>
      )
    } else {
      LayoutAnimation.easeInEaseOut();
      return(
        <ScrollView style={styles.bg}>
          { timeline || null }
        </ScrollView>
      )
    }
  }
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#fff',
    paddingVertical: 40,
    marginTop: -20,
    flex:1,
  }
})

function mapStateToProps(store){
  return{
    user: store.user
  }
}
function mapDispatchToProps(dispatch){
  return {
    showAlert:(message) =>{dispatch({type:'SHOW_ALERT',message:message})},
  }
}
module.exports = connect(mapStateToProps,mapDispatchToProps)(Timeline)
