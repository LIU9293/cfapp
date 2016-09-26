import React, { Component, } from 'react';
import { View, Navigator} from 'react-native';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import HeaderTabBar from './headerTabBar';
import DiscoverListView from './discoverListView';
import DiscoverUserSubscription from './discoverUserSubscription';
import Article from './articleDetail';

class Discover extends Component{
  render(){
    return(
      <View style={{flex:1}}>
        <ScrollableTabView
          renderTabBar={() => <HeaderTabBar navigator = {this.props.navigator} />}
          style={{paddingTop: 20, backgroundColor:"#fff"}}
        >
          <DiscoverListView navigator = {this.props.navigator} NumPerPage={8} tabLabel="首页" />
          <DiscoverUserSubscription navigator = {this.props.navigator} NumPerPage={8} tabLabel="订阅" />
        </ScrollableTabView>
      </View>
    )
  }
}

function mapStateToProps(store){
  return{
    user: store.user
  }
}
function mapDispatchToProps(dispatch){
  return{
    SET_DEFAULT: () => {dispatch({type: 'SET_DEFAULT'})},
    SET_LIGHT: () => {dispatch({type: 'SET_LIGHT'})}
  }
}
module.exports = connect(mapStateToProps,mapDispatchToProps)(Discover)
