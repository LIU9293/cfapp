import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Image, TouchableOpacity, RefreshControl } from 'react-native';
import { getUserLikes } from 'connection';
import { connect } from 'react-redux';
const window = Dimensions.get('window');

class Like extends Component{
  constructor(props){
    super(props);
    this.state = {
      articleLike: null,
      refreshing: false,
    };
    this.loadData = this.loadData.bind(this);
  }
  componentDidMount(){
    this.loadData();
  }
  onRefresh(){
    this.setState({refreshing: true});
    this.loadData();
  }
  loadData(){
    this.setState({refreshing: true});
    if(this.props.user.login){
      getUserLikes(1000, 1, this.props.user.userid, 0, (err,data)=>{
        if(err){
          console.log(err);
          this.setState({refreshing: false})
        } else {
          console.log(data);
          this.setState({
            articleLike: data.PostsList,
            refreshing: false,
          })
        }
      })
    }
  }
  render(){
    let list;
    if(this.state.articleLike){
      list = this.state.articleLike.map((item,ii)=>{
        if(item.Type == 1){
          return(
            <TouchableOpacity style={styles.row} key={ii} onPress={e=>{
              this.props.navigator.push({
                ident: 'article',
                articleID: item.PostsID,
                data:{
                  cover: item.PictureUrl,
                  title: item.Title,
                }
              })
            }}>
              <Image style={styles.cover} source={{url: item.PictureUrl + '@140h_140w_1e_1c_95q'}} />
              <View style={styles.content}>
                <Text style={styles.title} numberOfLines={1}>{item.Title}</Text>
                <Text style={styles.des} numberOfLines={2}>{item.Content}</Text>
              </View>
            </TouchableOpacity>
          )
        } else if(item.Type == 2){
          return(
            <View key={ii} />
          )
        }
      })
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
    fontSize: 20,
    color: '#666',
    marginBottom: 5,
  },
  des: {
    fontSize: 14,
    color: '#aaa',
  }
})

function mapStateToProps(store){
  return{
    user: store.user
  }
}
module.exports = connect(mapStateToProps)(Like)
