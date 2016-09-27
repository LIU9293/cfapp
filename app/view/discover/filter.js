import React, { Component, } from 'react';
import { View, Text, Navigator, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import FilterItem from './filterItem';
import { connect } from 'react-redux';
import { getDiscoverFilterList, getMyDiscoverFilterList, updateMyDiscoverFilterList } from 'connection';
import { Header, RoundButton } from 'rn-sexless';
import Icon from 'react-native-vector-icons/Ionicons';
import NotLoginPage from '../common/notLoginPage';
const colorForTopic = (count, index) => {
  const hue = Math.round(360 * index / (count + 1));
  return `hsl(${hue}, 74%, 65%)`;
}

const bg = "#fff";

class FilterScreen extends Component{

  constructor(props){
    super(props);
  }

  componentDidMount(){
    getDiscoverFilterList((err, data) => {
      if (err){console.log(err)} else {
        let available = {};
        data.ChannelList.map((item, ii)=>{
          available[item.ChannelID] = item.ChannelName
        })
        this.props.update_topic(available);
      }
    });
    // if(this.props.user.userid){
    //   getMyDiscoverFilterList(this.props.user.userid, (err, data) => {
    //     if(err){console.log(err)} else {
    //       let select = {};
    //       data.ChannelList.map((item, ii)=>{
    //         select[item.ChannelID] = item.ChannelName
    //       })
    //       this.props.update_user_topic(select);
    //     }
    //   })
    // }
  }

  shouldComponentUpdate(nextProps, nextState){
    return nextProps !== this.props
  }

  render(){
    //Object.entries can convert an object to an array
    let arr = Object.entries(this.props.topics.available);
    const topics = arr.map((topic, ii) => {
      return(
        <FilterItem
          key={ii}
          name={topic[1]}
          color={colorForTopic(arr.length, ii)}
          isChecked={ this.props.topics.selected[topic[0]] || false }
          onToggle={this._toggleTopic.bind(this, topic[0], topic[1], (this.props.topics.selected[topic[0]] || false))}
        />
      )}
    );
    if(!this.props.user.login){
      return(
        <NotLoginPage navigator={this.props.navigator}>
          <RoundButton
            style={{borderColor: '#0098fe',marginTop:0, width: 240, height: 40}}
            textStyle={{color: '#0098fe'}}
            onPress={e => this.props.navigator.pop()}
          >
            回主页
          </RoundButton>
        </NotLoginPage>
      )
    }
    return(
      <View style={{flex:1,backgroundColor:bg}}>
        <StatusBar
          translucent={true}
          barStyle="default"
         />
       <Header>
         <View></View>
         <Text style={{fontSize: 18}}>订阅</Text>
         <TouchableOpacity onPress={e => this.props.navigator.pop()}>
           <Icon name="ios-arrow-down" size={24} />
         </TouchableOpacity>
       </Header>
        <ScrollView
          style={styles.filters}
          showsVerticalScrollIndicator={false}
        >
          {topics}
        </ScrollView>
        <View style={styles.apply}>
          <TouchableOpacity style={styles.applyButton} onPress={this._apply.bind(this)}>
            <Text style={{color: "#fff"}}>确定</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  _apply(){
    if(this.props.user.userid){
      getMyDiscoverFilterList(this.props.user.userid, (err, data) => {
        if(err){
          console.log(err);
        } else {
          let select = {};
          data.ChannelList.map((item, ii)=>{
            select[item.ChannelID] = item.ChannelName
          })
          this.props.update_user_topic(select);
        }
      })
    }
    this._exit();
  }
  _toggleTopic(id, name, isChecked){
    if(isChecked){
      this.props.delete_selected_topic(id);
      updateMyDiscoverFilterList(this.props.user.userid, id, 'Delete', (err,data)=>{
        if(err){
          console.log(err);
        }
      })
    } else {
      this.props.add_selected_topic(id, name);
      updateMyDiscoverFilterList(this.props.user.userid, id, 'Add', (err,data)=>{
        if(err){
          console.log(err);
        }
      })
    }
  }
  _clearTopic(){
    this.props.clear();
  }
  _exit(){
    this.props.navigator.pop();
  }

}

const styles = StyleSheet.create({
  applyButton:{
    height: 36,
    width: 150,
    borderRadius: 18,
    backgroundColor: "#3C5AB4",
    alignItems:'center',
    justifyContent: 'center',
  },
  header:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft:15,
    paddingRight:15,
    paddingTop:20,
    height:64,
    backgroundColor:bg,
  },
  filters:{
    flex:1,
    paddingLeft:20,
    paddingRight:20,
    paddingBottom:50,
    backgroundColor:bg,
  },
  apply:{
    height:44,
    padding:8,
    backgroundColor:bg,
    alignItems:'center',
    justifyContent: 'center',
  },
})

const mapStateToProps = (state) => {
  return{
    topics: state.topics,
    user: state.user
  }
}
const mapDispatchToProps = (dispatch) => {
  return{
    clear: ()=> {dispatch({type: "CLEAR_SELECTED_TOPICS"})},
    update_topic: (data) => {dispatch({type: "UPDATE_AVAILABLE_TOPICS",data: data})},
    update_user_topic: (data) => {dispatch({type: "UPDATE_SELECTED_TOPICS",data: data})},
    add_selected_topic: (id, name) => {dispatch({type: 'ADD_SELECTED_TOPIC', id: id, name: name})},
    delete_selected_topic: (id) => {dispatch({type: 'DELETE_SELECTED_TOPICS', id: id})},
  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(FilterScreen);
