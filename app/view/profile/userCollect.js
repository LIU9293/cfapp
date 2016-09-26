import React , { Component } from 'react';
import { connect } from 'react-redux';
import { View,  StyleSheet, TouchableOpacity, ScrollView, RefreshControl, Dimensions, Image } from 'react-native';
import { millseconds2DateDiff } from '../../vendor/helper/timeTransfer';
import { getUserCollection } from 'connection';
import { Container, Content, List, ListItem, Text } from 'native-base';
import S from 'string';

const window = Dimensions.get('window');

class UserArticle extends Component{

  constructor(props){
    super(props);
    this.state = {
      collect: null,
      refreshing: false,
      err: null,
    }
    this.loadData = this.loadData.bind(this);
  }

  loadData(){
    this.setState({refreshing: true});
    getUserCollection(this.props.user.userid, (err,data) => {
      if(err){
        console.log(err);
        this.setState({
          refreshing: false,
          err: err,
        });
      } else {
        this.setState({
          collect: data.UserCollectList ,
          refreshing: false
        })
      };
    })
  }

  componentDidMount(){
    this.loadData();
  }
  onRefresh(){
    this.setState({
      refreshing: true,
      err: null,
      collect: null,
    });
    this.loadData();
  }
  render(){
    let collect;
    if(this.state.collect){
      collect = this.state.collect.map((item,ii)=>{
        if(item.UserArticle.Type == 1){
          let des = S(item.UserArticle.ZPT_CONTENT).decodeHTMLEntities().stripTags().s;
          return(
            <TouchableOpacity style={styles.row} key={ii} onPress={e=>{
              this.props.navigator.push({
                ident: 'article',
                articleID: item.UserArticle.ZCT_ID,
                data:{
                  cover: item.UserArticle.ZPT_COVER,
                  title: item.UserArticle.ZPT_TITLE,
                }
              })
            }}>
              <Image style={styles.cover} source={{url: item.UserArticle.ZPT_COVER + '@140h_140w_1e_1c_95q'}} />
              <View style={styles.content}>
                <Text style={styles.title} numberOfLines={1}>{item.UserArticle.ZPT_TITLE}</Text>
                <Text style={styles.des} numberOfLines={2}>{des}</Text>
              </View>
            </TouchableOpacity>
          )
        } else if(item.UserArticle.Type == 2){
          return null
        } else if(item.UserArticle.Type == 3){
          return(
            <TouchableOpacity style={styles.row} key={ii} onPress={e=>{
              this.props.navigator.push({
                ident: 'article',
                articleID: item.UserArticle.ZCT_ID,
                data:{
                  cover: item.UserArticle.ZPT_COVER,
                  title: item.UserArticle.ZPT_TITLE,
                }
              })
            }}>
              <Image style={styles.cover} source={{url: item.UserArticle.ZPT_COVER + '@140h_140w_1e_1c_95q'}} />
              <View style={styles.content}>
                <Text style={styles.title} numberOfLines={1}>{item.UserArticle.ZPT_TITLE}</Text>
                <Text style={styles.des} numberOfLines={2}>{JSON.parse(item.UserArticle.ZPT_CONTENT).intro}</Text>
              </View>
            </TouchableOpacity>
          )
        }
      })
    }
    if(this.state.err == '你还没有收藏哟！'){
      return(
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
        >
          <View style={{marginTop: 200, justifyContent: 'center', alignItems: 'center'}}>
            <Text>你还没有收藏哦</Text>
            <Text>快去首页看看吧</Text>
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
        {collect ? collect : null}
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
    marginTop: 2,
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

module.exports = connect(mapStateToProps)(UserArticle)
