import React , { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl, LayoutAnimation } from 'react-native';
import { millseconds2DateDiff } from '../../vendor/helper/timeTransfer';
import { getDiscoverList } from 'connection';
import ArticleList from '../common/articleList';
import Loading from '../common/loading';
import GlobleAlert from '../common/MessageAlert';

class DiscoverList extends Component{

  constructor(props){
    super(props);
    this.state = {
      page: 2,
      haveMore: true,
      refreshing: false,
      canRefresh: true,
      loaded: false,
    }
    this.loadMore = this.loadMore.bind(this);
    this.loadData = this.loadData.bind(this);
    this.scroll = this.scroll.bind(this);
  }

  loadMore(){
    this.loadData(this.state.page);
    this.setState({
      page: this.state.page + 1,
    })
  }

  scroll(e){
    let offsetY = e.contentOffset.y;
    let contentSizeHeight = e.contentSize.height;
    let layoutHeight = e.layoutMeasurement.height;
    if(contentSizeHeight - offsetY - layoutHeight < 1){
      if(this.state.canRefresh){
        this.loadData(this.state.page);
        this.setState({
          page: this.state.page + 1
        });
      }
    }
  }

  onRefresh(){
    this.setState({
      refreshing: true,
    })
    this.props.updateDiscoverListData([]);
    this.loadData(1);
    this.setState({
      refreshing: false,
      page: 2,
    })
  }

  loadData(index){
    this.setState({canRefresh: false});
    getDiscoverList('', index, this.props.NumPerPage, 0, (err,data) => {
      if(err){
        this.props.showAlert(err);
      } else {
        this.setState({canRefresh: true});
        console.log(data.PostsList);
        let discoverListData = data.PostsList.map((item,ii)=>{
          return {
            avatar: item.HeadUrl,
            category: item.ZctName,
            description: item.Content,
            nickName: item.NickName == '管理员' ? '职前小仙女' : item.NickName,
            cover: item.PictureUrl || '',
            title: item.Title,
            time: millseconds2DateDiff(item.CreatDate),
            viewNum: 0,
            commentNum: item.CommentNum,
            likeNum: item.LikeNum,
            essence: item.IsEssence,
            top: item.IsTop,
            recommand: item.IsRecommend,
            id: item.PostsID,
            type: item.Type,
            content: item.Content,
          }
        });
        if(data.PostsList.length < this.props.NumPerPage){
          this.setState({haveMore: false})
        }
        this.props.updateDiscoverListData(this.props.listData.concat(discoverListData));
        if(!this.state.loaded){
          this.setState({
            loaded: true
          })
        }
      };
    })
  }

  componentDidMount(){
    this.loadData(1);
  }

  componentWillUnmount(){
    this.props.updateDiscoverListData([]);
  }
  render(){
    if(!this.state.loaded){
      return(
        <View style={{flex: 1}}>
          <Loading/>
          <GlobleAlert />
        </View>
      )
    } else {
      LayoutAnimation.easeInEaseOut();
      return(
        <ScrollView
          onScroll={e => this.scroll(e.nativeEvent)}
          scrollEventThrottle={1000}
          style={{marginBottom: 49}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
        >
          <ArticleList navigator={ this.props.navigator } dataSource="recommandData" />
        </ScrollView>
      )
    }
  }
}

//读数据
function mapStateToProps(store){
  return{
    listData: store.discoverListData.recommandData,
    user: store.user,
  }
}
//写数据
function mapDispatchToProps(dispatch){
  return{
    updateDiscoverListData: (data) => {dispatch({type:'UPDATE_DISCOVER_LIST_DATA',data: data })},
    showAlert:(message) =>{dispatch({type:'SHOW_ALERT',message:message})},
  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(DiscoverList)
