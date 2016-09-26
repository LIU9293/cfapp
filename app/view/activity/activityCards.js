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
        console.log(data);
        this.setState({
          listdata: data
        });
        setTimeout(()=>{
          this.setState({loaded: true})
        },1000)
      }
    })
  }
  render(){
    let list;
    if(this.state.listdata){
      list = this.state.listdata.map((item, ii)=>{
        if(ii == 0){
          return(
            <TouchableOpacity key={ii} onPress={e=>{
                this.props.navigator.push({
                  ident: 'activity',
                  activityID: item.ActivityID,
                  city: id2name(item.CityID),
                  status: item.ActivityState
                })
              }}>
              <View style={styles.Overlay}>
                <Image
                  source={{url: item.PictureUrl+ '@600h_600w_1e_1c_100q'}}
                  style={styles.Overlay}
                />
                <Image
                  source={require('../../../images/logo/blur-square.jpg')}
                  style={styles.OverlayBlur}
                />
              <Text style={styles.OverlayText}>{item.ActivityTitle}</Text>
              </View>
            </TouchableOpacity>
          )
        } else {
          return(
            <TouchableOpacity key={ii} onPress={e=>{
                this.props.navigator.push({
                  ident: 'activity',
                  activityID: item.ActivityID,
                  city: id2name(item.CityID),
                  status: item.ActivityState
                })
              }}>
              <View style={styles.card}>
                <Image
                  source={{url: item.PictureUrl+ '@140h_280w_1e_1c_100q'}}
                  style={styles.cardImage}
                />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle} numberOfLines={3}>{item.ActivityTitle}</Text>
                  <View style={styles.cardInfoArea}>
                    <View style={styles.cardInfoCity}>
                      <Icon name="md-locate" size={20} style={{marginRight:5, color:'#666'}} />
                      <Text style={styles.cardText}>{id2name(item.CityID)}</Text>
                    </View>
                    <View style={styles.cardInfoStatus}>
                      <Text style={styles.cardText}>{item.ActivityState}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )
        }
      })
    }
    if(this.state.loaded){
      return(
          <ScrollView style={{backgroundColor: '#f9f9f9'}}>
            <View style={styles.ScrollWapper}>
              {list || null}
            </View>
          </ScrollView>
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
  card: {
    width: (window.width - 30)/2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {'width': 1, 'height': 2},
    shadowRadius: 1,
    marginBottom: 8,
  },
  cardImage: {
    height: 90,
    width: (window.width - 30)/2,
  },
  cardContent: {
    padding: 5,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 15,
    marginTop: 5,
    color: '#444',
    minHeight: 59,
  },
  cardInfoArea: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  cardInfoCity: {
    flexDirection: 'row',
  },
  cardText: {
    fontSize: 13,
    lineHeight: 15,
    color: '#999',
  },
  ScrollWapper: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: -20,
  },
  Overlay: {
    width: (window.width - 20),
    height: (window.width - 20),
    marginBottom: 10,
  },
  OverlayBlur: {
    position: 'absolute',
    opacity: 0.6,
    width: (window.width - 20),
    height: (window.width - 20),
    top: 0,
    left: 0,
  },
  OverlayText: {
    position: 'absolute',
    width: (window.width - 20),
    textAlign: 'center',
    top: (window.width/2) - 20,
    backgroundColor: 'transparent',
    paddingHorizontal: 30,
    color: '#fff',
    fontSize: 20,
  }
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
