import React,{ Component } from 'react';
import {View,Text,PixelRatio,Dimensions} from 'react-native';
import { connect } from 'react-redux';

class GlobleAlert extends Component{
  constructor(props) {
    super(props);
    this.state = {
      durtionTime: 1500, //ms
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.globleAlert!== undefined || nextProps.globleAlert!== null){
      if(nextProps.globleAlert.show){
        this.time = setTimeout(()=>{
            this.props.hideAlert()
        },this.state.durtionTime)
      }
    }
  }


  componentWillUnmount() {
   this.timer && clearTimeout(this.timer);
  }

  render(){
    if(this.props.globleAlert.show){
      return(
        <View style = {styles.mess}>
          <Text key = "errMsg" style = {{color:'#fff',fontSize:18,flex:1,textAlign:'center'}}>{this.props.globleAlert.message === null ?"":this.props.globleAlert.message}</Text>
        </View>
      )
    }else {
      return (<View key = "errMsg" style={{width:0,height:0}}/>)
    }

  }
}

const Util = {
  ratio: PixelRatio.get(),
  pixel: 1 / PixelRatio.get(),
  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
};

const styles = {
  mess:{
    position : 'absolute',
    marginHorizontal : 50,
    backgroundColor : 'rgba(0,0,0,0.75)',
    width : (Util.size.width - 100),
    top : (Util.size.height / 2),
    paddingVertical:10,
    borderRadius : 5,
    zIndex:99999999
  }
}

function mapStateToProps(store){
  return{
    globleAlert: store.GlobleAlert
  }
}

function mapDispatchToProps(dispatch){
  return{
    hideAlert: () => {dispatch({type:'HIDE_ALERT'})},
  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(GlobleAlert)
