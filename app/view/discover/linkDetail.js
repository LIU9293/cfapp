import React,{ Component } from 'react';
import { View,Image, WebView, Text,StyleSheet,TouchableOpacity,StatusBar,PixelRatio,Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Comments from '../common/comment2';

class LinkDetail extends Component{
  constructor(props){
    super(props);
  }
  render(){
    let dataInfo = this.props.dataInfo
    return(
      <View style = {styles.container}>
        <StatusBar translucent={true} barStyle="default"/>
        <View style = {styles.header}>
          <TouchableOpacity onPress = {e=>{
            this.props.navigator.pop()}}>
            <Icon name = "ios-arrow-back-outline" size = {30} style = {styles.left}/>
          </TouchableOpacity>
          <TouchableOpacity onPress = {e=>{
            this.props.navigator.push({
              ident : 'usercenter',
              userid : dataInfo.userid
            })}} style = {{marginLeft:20}}>
            <Image source = {{uri:dataInfo.userPhoto}} style = { styles.userPhoto}/>
          </TouchableOpacity>
          <TouchableOpacity onPress = {e=>{
            this.props.navigator.push({
              ident : 'usercenter',
              userid : dataInfo.userid
            })}}>
            <Text style = {styles.userName}>{dataInfo.userName}</Text>
          </TouchableOpacity>
        </View>
        <WebView style = {styles.webView}
          javaScriptEnabled={true}
          source={{uri: dataInfo.uri}}/>
        <View style ={{width: Util.size.width,height:45,position:'absolute',bottom:0,zIndex:1,backgroundColor:"#fff"}}>
          <Comments objid = {dataInfo.objid} type = {0} commentNum = {this.props.commentNum || 0} navigator = {this.props.navigator}/>
        </View>
      </View>

    )
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
  container:{
    flex:1,
    backgroundColor:'#fff',
  },header:{
    height:64,
    borderBottomWidth:1,
    borderBottomColor:'lightgray',
    flexDirection : 'row',
    paddingTop : 25,
  },left:{
    marginLeft:10,
    color:'#999'
  },userPhoto:{
    width : 30,
    height : 30,
    borderRadius : 15,
    marginLeft : 5,
  },userName:{
    fontSize:16,
    color:'#666',
    marginLeft:10,
    alignItems : 'center',
    justifyContent :'center',
    lineHeight : 26
  },webView:{
    // height : (Util.size.height - 45 - 64)
    marginBottom:45
  }
}

module.exports = LinkDetail
