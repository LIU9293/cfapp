import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Header, Button, Title, Icon, Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { getAlipaySign, getActivitySignUp, getActivitySignUpNeedPay } from 'connection';
import Alipay from 'react-native-yunpeng-alipay';
import MapView from 'react-native-maps';
const window = Dimensions.get('window');

class JoinActivity extends Component{
  constructor(props){
    super(props);
    this.join = this.join.bind(this);
  }
  join(){
    if(this.props.user.login){
      if(this.props.data.Fee == 0){
        getActivitySignUp(this.props.user.userid, this.props.activityID, this.props.data.IsAudit, 0, '', '', (err,res) => {
          if(err){
            console.log(err);
          } else {
            this.props.baoming(this.props.activityID);
            this.props.navigator.push({
              ident: 'joinActivitySuccessfulWithoutPayment',
              activityID: this.props.activityID,
              data: this.props.data,
            })
          }
        })
      } else {
        console.log('in payment session...');
        getAlipaySign(this.props.activityID, this.props.data.ActivityTitle, this.props.data.Fee, this.props.user.userid, (err, sign)=>{
          if(err){
            console.log(err);
          } else {
            //sign.PayInfo 是签名； sign.OrderID 是订单号
            Alipay.pay(sign.PayInfo)
              .then((data) => {
                getActivitySignUpNeedPay(this.props.user.userid, this.props.activityID, sign.OrderID, 1, (err, res) => {
                  if(err){
                    console.log(err);
                  } else {
                    this.props.baoming(this.props.activityID);
                    this.props.navigator.push({
                      ident: 'joinActivitySuccessfulWithPayment',
                      activityID: this.props.activityID,
                      orderID: sign.OrderID,
                      data: this.props.data,
                    })
                  }
                })
              }, (err) => {
                console.log(err);
              })
              .done()
          }
        })
      }
    } else {
      this.props.navigator.push({
        ident: 'login'
      })
    }
  }
  render(){
    const { data, activityID } = this.props;
    console.log(data, activityID);
    return(
      <View style={{flex:1,backgroundColor:'#fff'}}>
        <StatusBar barStyle="default"/>
        <Header style={{backgroundColor:'#fff',shadowColor:'transparent'}}>
          <Button transparent onPress={e => this.props.navigator.pop()}>
             <Icon name='ios-arrow-back' style={{color: '#333', marginTop: 5}} />
          </Button>
          <Title></Title>
        </Header>
        <ScrollView style={{marginTop: 20, flex: 1, marginBottom: 50}}>
          <Text style={styles.title}>报名确认</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>手机号</Text>
            <Text style={styles.rowLabel}>{this.props.user.userdata.phone}</Text>
          </View>
          <View style={styles.hr}></View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>时间</Text>
            <Text style={styles.rowLabel}>{this.props.data.ActivityStartDate}</Text>
          </View>
          <View style={styles.hr}></View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>费用</Text>
            <Text style={styles.rowLabel}>{this.props.data.Fee == 0 ? '免费' : (this.props.data.Fee + '元')}</Text>
          </View>
          <View style={styles.hr}></View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>地点</Text>
            <View style={{maxWidth: 220}}>
              <Text style={styles.rowLabel}>{this.props.data.ActivityAddress}</Text>
            </View>
          </View>
          <MapView
            style={{
              width: window.width, height: 200,
              marginTop: 10,
              marginBottom: 60,
            }}
            initialRegion={{
              latitude: this.props.data.ActivityLatitude/1,
              longitude: this.props.data.ActivityLongitude/1,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <MapView.Marker
              coordinate={{
                latitude: this.props.data.ActivityLatitude/1,
                longitude: this.props.data.ActivityLongitude/1,
              }}
              title={'活动地点'}
            />
          </MapView>
        </ScrollView>
        <TouchableOpacity style={styles.Bottom} onPress={this.join}>
          <Text style={{color:'#fff', fontSize:16}}>立即报名</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  Bottom:{
    position: 'absolute',
    bottom: 0,
    width: window.width,
    height: 50,
    backgroundColor: '#0086fd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hr:{
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 20,
    width: window.width - 40,
  },
  rowLabel: {
    fontSize: 18,
    color: '#aaa',
    textAlign: 'right',
  },
  title:{
    color: 'black',
    fontSize: 30,
    marginLeft: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  }
})

function mapStateToProps(store){
  return{
    user: store.user,
  }
}
function mapDispatchToProps(dispatch){
  return{
    baoming: (id) => {dispatch({type:'JOIN_ACTIVITY', id: id})} ,
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(JoinActivity)
