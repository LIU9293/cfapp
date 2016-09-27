import React , { Component } from 'react';
import { connect } from 'react-redux';
import { View,  StyleSheet, TouchableOpacity, ScrollView, RefreshControl, Dimensions, Image } from 'react-native';
import { millseconds2DateDiff } from '../../vendor/helper/timeTransfer';
import { getUserArticles } from 'connection';
import { Container, Content, List, ListItem, Text } from 'native-base';
import S from 'string';

const window = Dimensions.get('window');

class UserArticle extends Component{

  constructor(props){
    super(props);
    this.state = {
      articleLike: null,
      refreshing: false,
      err: null,
    }
    this.loadData = this.loadData.bind(this);
  }
  onRefresh(){
    this.setState({
      refreshing: true,
      err: null,
      articleLike: null,
    });
    this.loadData();
  }

  loadData(index){
    this.setState({refreshing: true});
    if(this.props.user.login){
      getUserArticles(this.props.user.userid, (err,data)=>{
        if(err){
          console.log(err);
          this.setState({
            refreshing: false,
            err: err,
          })
        } else {
          this.setState({
            articleLike: data.UserArticleList,
            refreshing: false,
          })
        }
      })
    }

  }

  componentDidMount(){
    this.loadData();
  }

  render(){
    let list;
    if(this.state.articleLike){
      list = this.state.articleLike.map((item,ii)=>{
        if(item.Type == 1){
          let des = S(item.ZPT_CONTENT).decodeHTMLEntities().stripTags().s;
          return(
            <TouchableOpacity style={styles.row} key={ii} onPress={e=>{
              this.props.navigator.push({
                ident: 'article',
                articleID: item.ZCT_ID,
                data:{
                  cover: item.ZPT_COVER,
                  title: item.ZPT_TITLE,
                }
              })
            }}>
              <Image style={styles.cover} source={{url: item.ZPT_COVER + '@140h_140w_1e_1c_95q'}} />
              <View style={styles.content}>
                <Text style={styles.title} numberOfLines={1}>{item.ZPT_TITLE}</Text>
                <Text style={styles.des} numberOfLines={2}>{des}</Text>
              </View>
            </TouchableOpacity>
          )
        } else if(item.Type == 3){
          let des = JSON.parse(item.ZPT_CONTENT).intro
          return(
            <TouchableOpacity style={styles.row} key={ii} onPress={e=>{
              this.props.navigator.push({
                ident: 'article',
                articleID: item.ZCT_ID,
                data:{
                  cover: item.ZPT_COVER,
                  title: item.ZPT_TITLE,
                }
              })
            }}>
              <Image style={styles.cover} source={{url: item.ZPT_COVER + '@140h_140w_1e_1c_95q'}} />
              <View style={styles.content}>
                <Text style={styles.title} numberOfLines={1}>{item.ZPT_TITLE}</Text>
                <Text style={styles.des} numberOfLines={2}>{des}</Text>
              </View>
            </TouchableOpacity>
          )
        }
      })
    }
    if(this.state.err == '没有帖子'){
      return(
        <ScrollView
          style={{flex:1}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
        >
          <View style={{marginTop: 200, justifyContent: 'center', alignItems: 'center'}}>
            <Text>你还没有发布文章哦</Text>
            <Text>快去careerfore.com发文章吧</Text>
          </View>
        </ScrollView>
      )
    }
    return(
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh.bind(this)}
          />
        }
      >
        {list ? list : null}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  row:{
    width: window.width,
    borderBottomWidth: 0.8,
    borderBottomColor: '#aaa',
    flexDirection: 'row',
    padding: 10,
  },
  cover: {
    height: 70,
    width: 70,
    marginRight: 20,
  },
  content: {
    width: window.width - 110,
    height: 70,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
  des: {
    fontSize: 14,
    color: '#aaa',
  }
})

//读数据
function mapStateToProps(store){
  return{
    user: store.user,
  }
}
//写数据
function mapDispatchToProps(dispatch){
  return{
    updateDiscoverListData: (data) => {dispatch({type:'UPDATE_USER_ARTICLES',data: data })},
    startLoading: () => {dispatch({type:'START_LOADING'})},
    stopLoading: () => {dispatch({type:'STOP_LOADING'})},
  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(UserArticle)
