import React , { Component } from 'react';
import { connect } from 'react-redux';
import { View,  StyleSheet, TouchableOpacity, ScrollView, RefreshControl, Dimensions, Image } from 'react-native';
import { millseconds2DateDiff } from '../../vendor/helper/timeTransfer';
import { getUserActivities } from 'connection';
import { id2name } from '../../vendor/helper/cityid';
import { Container, Content, List, ListItem, Text } from 'native-base';

const window = Dimensions.get('window');

class UserArticle extends Component{

  constructor(props){
    super(props);
    this.state = {
      activityData: null,
      refreshing: false,
    }
    this.loadData = this.loadData.bind(this);
  }

  loadData(index){
    this.setState({refreshing: true});
    getUserActivities(this.props.user.userid, (err,data) => {
      if(err){
        console.log(err);
      } else {
        console.log(data.UserActivityList)
        this.setState({
          activityData: data.UserActivityList,
          refreshing: false,
        })
      };
    })
  }

  componentDidMount(){
    this.loadData(1);
  }

  onRefresh(){
    this.setState({refreshing: true});
    this.loadData();
  }

  render(){

    let activities;
    if(this.state.activityData){
      activities = this.state.activityData.map((item,ii)=>{
        return(
          <TouchableOpacity style={styles.row} key={ii}>
            <Image style={styles.cover} source={{url: item.ZET_ADVERTS + '@140h_140w_1e_1c_95q'}} />
            <View style={styles.content}>
              <Text style={styles.title} numberOfLines={1}>{item.ZET_TITLE}</Text>
              <View style={styles.des}>
                <View style={styles.cell}>
                  <Text style={{color:'#888'}}>地点 - {id2name(item.City)}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={{color:'#888'}}>状态 - {item.ZET_ActivityState}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )
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
        {activities ? activities : null}
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
    marginTop: 2,
  },
  des: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: window.width - 110,
  },
  cell: {
    height: 40
  }
})

//读数据
function mapStateToProps(store){
  return{
    user: store.user,
  }
}

module.exports = connect(mapStateToProps)(UserArticle)
