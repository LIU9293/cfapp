import React, { Component } from 'react';
import { View, StyleSheet, navigator, ScrollView, Dimensions, Text, Image, TouchableOpacity } from 'react-native'
import { Container, Header, Button, Content, Title } from 'native-base';
import { getPlaygroundList } from 'connection';
import { id2name } from '../../vendor/helper/cityid';
const window = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import Loading from '../common/loading';
import GlobleAlert from '../common/MessageAlert';
import { connect } from 'react-redux';
import CardSilder from './cardSilder';

class ActivityCards extends Component {
  constructor(props){
    super(props);
    this.state = {
      listdata: null,
      loaded: false,
    }
  }
  componentWillMount(){
    getPlaygroundList('', 1, 1000, (err,data)=>{
      if(err){
        this.props.showAlert(err);
      } else {
        this.setState({
          listdata: data
        });
        setTimeout(()=>{
          this.setState({loaded: true})
        },500)
      }
    })
  }
  render(){
    let list;
    if(this.state.listdata){
      console.log(this.state.listdata);
      list = this.state.listdata.map((item,ii)=>{
        return(
          <ScrollView
            style={{flex:1}}
            key={ii}
            horizontal={false}
          >
            <TouchableOpacity key={ii} onPress={e=>{
                this.props.navigator.push({
                  ident: 'activity',
                  activityID: item.ActivityID,
                  city: id2name(item.CityID),
                  status: item.ActivityState
                })
              }}
            >
              <Image source={{url: item.PictureUrl + '@220h_400w_1e_1c_100q'}} style={styles.cover} resizeMode="cover" />
              <Text style={styles.subtitle}>{item.ActivityTitle}</Text>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>地点</Text>
                <View style={{maxWidth: 220}}>
                  <Text style={[styles.rowLabel,{textAlign:'right'}]}>{item.ActivityAddress}</Text>
                </View>
              </View>
              <View style={styles.border} />
              <View style={styles.row}>
                <Text style={styles.rowLabel}>开始时间</Text>
                <Text style={styles.rowLabel}>{item.ActivityStartDate.substr(5,6)}</Text>
              </View>
              <View style={styles.border} />
              <View style={styles.row}>
                <Text style={styles.rowLabel}>状态</Text>
                <Text style={styles.rowLabel}>{item.ActivityState}</Text>
              </View>
              <View style={styles.border} />
              <View style={styles.row}>
                <Text style={styles.rowLabel}>已报名</Text>
                <Text style={styles.rowLabel}>{item.PeopleNum+'人'}</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        )
      })
    }
    if(this.state.loaded){
      return(
        <CardSilder>
          {list || null}
        </CardSilder>
      );
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
  scroll: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
    overflow: 'visible',
    marginBottom: 10,
  },
  card: {
    width: (window.width - 40),
    marginLeft: 5,
    marginRight: 5,
  },
  cover: {
    width: (window.width - 40),
    height: 160,
  },
  subtitle: {
    color: '#000',
    fontSize: 20,
    marginVertical: 20,
    paddingHorizontal: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor:'#fff'
  },
  rowLabel: {
    fontSize: 18,
    color: '#aaa',
  },
  border: {
    height: 1,
    backgroundColor: '#aaa',
    marginHorizontal: 15,
    width: window.width - 70,
  },
})

function mapStateToProps(store){
  return {
    user: store.user
  }
}
function mapDispatchToProps(dispatch){
  return {
    showAlert:(message) =>{dispatch({type:'SHOW_ALERT',message:message})},
  }
}


module.exports = connect(mapStateToProps,mapDispatchToProps)(ActivityCards)
