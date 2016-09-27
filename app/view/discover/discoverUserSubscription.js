import React , { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl, Dimensions , Image} from 'react-native';
import { millseconds2DateDiff } from '../../vendor/helper/timeTransfer';
import { getPostsByChannel, getMyDiscoverFilterList } from 'connection';
import ArticleList from '../common/articleList';
import { Button } from 'native-base';
import NotLoginPage from '../common/notLoginPage';

class DiscoverUserSubscription extends Component{

  constructor(props){
    super(props);
    this.state = {
      page: 2,
      haveMore: true,
      refreshing: false,
      canRefresh: true,
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
    let str = '';
    let arr = Object.keys(this.props.selectedTopics);
    arr.map(i => {
      str = str + i + ';'
    });
    str = str.substr(0,(str.length - 1));
    getPostsByChannel(str, index, this.props.NumPerPage, 0, (err,data) => {
      if(err){
        console.log(err);
      } else {
        this.setState({canRefresh: true});
        let discoverListData = data.PostsList.map((item,ii)=>{
          return {
            avatar: item.HeadUrl,
            category: item.ZctName,
            description: item.Content.length > 72 ? item.Content.substring(0,72)+'...' : item.Content,
            nickName: item.NickName == '管理员' ? '职前小仙女' : item.NickName,
            cover: item.PictureUrl || '',
            title: item.Title,
            time: millseconds2DateDiff(item.CreatDate),
            viewNum: 0,
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
        this.props.stopLoading();
      };
    })
  }

  componentWillMount(){
    this.props.startLoading();
  }

  componentDidMount(){
    this.loadData(1);
  }

  componentWillUnmount(){
    this.props.updateDiscoverListData([]);
  }
  render(){
    if(!this.props.user.login){
      return(
        <NotLoginPage navigator={this.props.navigator} />
      )
    } else if(Object.entries(this.props.selectedTopics).length == 0) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={require('../../../images/logo/ddd.png')} style={{width: 250, resizeMode: 'cover', height: 150, marginBottom:50}}/>
        </View>
      )
    } else {
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
          <ArticleList navigator={ this.props.navigator } dataSource="subscribeData" />
        </ScrollView>
      )
    }
  }
}

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  button:{
    position: 'absolute',
    width: 300,
    marginLeft: (width-300)/2,
    bottom: 140,
    backgroundColor: 'steelblue'
  },
})

//读数据
function mapStateToProps(store){
  return{
    listData: store.discoverListData.subscribeData,
    user: store.user,
    selectedTopics: store.topics.selected
  }
}
//写数据
function mapDispatchToProps(dispatch){
  return{
    updateDiscoverListData: (data) => {dispatch({type:'UPDATE_DISCOVER_SUBSCRIBE_DATA',data: data })},
    startLoading: () => {dispatch({type:'START_LOADING'})},
    stopLoading: () => {dispatch({type:'STOP_LOADING'})},
  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(DiscoverUserSubscription)
