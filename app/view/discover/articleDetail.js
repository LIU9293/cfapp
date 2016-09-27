import React,{ Component } from 'react';
import {ScrollView,Image,Alert,StyleSheet,Text,TouchableHighlight,PanResponder,LayoutAnimation,StatusBar,SegmentedControlIOS,View,TouchableOpacity,PixelRatio,Dimensions,WebView,Button} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import GitIcon from 'react-native-vector-icons/Octicons';
import { getDiscoverPost ,getDiscoverPostComment,AddCTR} from 'connection';
import Comments from '../common/comment2';
import { connect } from 'react-redux';
import * as wechat from 'react-native-wechat';
import Loading from '../common/loading';
import GlobleAlert from '../common/MessageAlert';
import { H1, H2, P, Row, Hr, Container, Header, Cell } from 'rn-sexless';
import { betterText, millseconds2DateDiff } from 'helper';

const blurImage = require('../../../images/logo/blur.jpg');
const Util = {
  ratio: PixelRatio.get(),
  pixel: 1 / PixelRatio.get(),
  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
};

class TwitterUser extends Component{
	constructor() {
    super();
		this.state = {
			scrollEnabled: false,
      scale: 1,
      iconTop: 95,
      bannerTop:0,
      opacity:0,
      articleContent:null,
      commentNum:0,
      data:null,
      showMsg:false,
      loaded: false,
		};
    this.addReadNum = this.addReadNum.bind(this);
	}

  _scrollEnabled = false;
	_previousTop = 0;
  _iconTop = 95;
  _scale = 1;
  _bannerTop = 0;
  _opacity = 0;
	_minTop = -192;
	_userStyle = {};
  user = (null : ?{ setNativeProps(props: Object): void });

  _updatePosition() {
	   this.user && this.user.setNativeProps(this._userStyles);
	}

	_endMove(evt, gestureState) {
		this._previousTop = this._userStyles.style.top;
	}

  async addReadNum(){
    AddCTR(this.props.user.userid || '',this.props.articleID,(err,data) => {
      if(err){
        return
      }else {
        return
      }
    })
  }

  shareToTimeLine(articleType,){
    //articleType  1or2 长短文  3 外链

  }


	componentWillMount() {
		this._panResponder = PanResponder.create({
	    onStartShouldSetPanResponder: (evt, gestureState) => true,
	    onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
	    onMoveShouldSetPanResponder: (evt, gestureState) => {
	    	return gestureState.dy/gestureState.dx!=0;
		  },
	    onPanResponderGrant: (evt, gestureState) => true,
	    onPanResponderMove: (evt, gestureState) => {
       	this._userStyles.style.top = this._previousTop + gestureState.dy;
        this._scale = 1+this._userStyles.style.top/162.5;
        this._iconTop = 95 - this._userStyles.style.top/4.16;
        this._bannerTop = 0;
        this._opacity = 0;
        // this._scrollEnabled = false;
        if (this._userStyles.style.top< -62.5) {
          this._scale = 0.6;
          this._iconTop = 110;
          this._bannerTop = -this._userStyles.style.top-62.5;
          this._opacity = Math.pow((-this._userStyles.style.top-62.5)/129.5,0.5)
        };
       	if (this._userStyles.style.top>0) {
       		this._userStyles.style.top = 0;
          this._scale = 1;
          this._iconTop = 95
       	};
       	if (this._userStyles.style.top < this._minTop) {
       		this._userStyles.style.top = this._minTop;
          this._opacity = 1;
          this._bannerTop = 129.5;
          // this._scrollEnabled = true;
       	};

        this.setState({
          // scrollEnabled: this._scrollEnabled,
          scale: this._scale,
          iconTop: this._iconTop,
          bannerTop: this._bannerTop,
          opacity: this._opacity
        });

		   	this._updatePosition();
	    },
	    onPanResponderTerminationRequest: (evt, gestureState) => true,
	    onPanResponderRelease: (evt, gestureState) => this._endMove(evt, gestureState),
	    onPanResponderTerminate: (evt, gestureState) => this._endMove(evt, gestureState),
	    onShouldBlockNativeResponder: (event, gestureState) => true,
	 	});

    this._userStyles = {
      style: {
        top: this._previousTop,
      },
    };

  }

  componentDidMount() {
    this.addReadNum()
		this._updatePosition();
    getDiscoverPost(this.props.articleID, this.props.user.userid === null ?'':this.props.user.userid, (err,data)=>{
      if(err){
        this.props.showAlert(err);
      } else {
        this.props.UPDATE_LIKE(data.PostosInfo.PostID,data.IsLike,data.PostosInfo.LikeNum);
        this.props.UPDATE_COLLECT(data.PostosInfo.PostID,data.IsCollect,data.PostosInfo.CollectionNumbers);
        this.setState({
          articleContent: (betterText(data.PostosInfo.Content)),
          data: data.PostosInfo
        });
        setTimeout(()=>{
          this.setState({loaded: true})
        },1000)
      }
    })
    getDiscoverPostComment(this.props.user.userid === null ?'':this.props.user.userid,this.props.articleID,1,(err,data)=>{
      if(err){console.log(err)}else {
        this.setState({
          commentNum:data.CommentNum
        })
      }
    })
	}

	render () {
    if(this.state.loaded){
      let panProps = this.state.scrollEnabled?{}:{...this._panResponder.panHandlers};
      let thisContent = this.state.articleContent || '';
      let avatar;
      if(this.state.data){
        avatar = this.state.data.UserHeadUrl;
      }
      let type = this.state.data.Type ;
      if(type === 1 || type === 2){//长短文
        return(
          <View style={styles.twitterContainer}>
            <StatusBar
              translucent={true}
              barStyle="light-content"
             />
      			<View ref={(user) => {this.user = user;}} style={styles.userContainer} {...panProps}>
      				<View style={styles.userPanel}>
                <Image style={[styles.banner,{top: this.state.bannerTop}]} source={{uri:this.props.data.cover + '@300h_' + (Util.size.width*2) + 'w_1e_1c_100q'}}></Image>
                {avatar ? <View style={[styles.iconContainer,{top:this.state.iconTop,transform:[{scale:this.state.scale}]}]}><Image style={styles.icon} source={{uri: avatar}}></Image></View> : <View />}
                {this.state.bannerTop<=0?<View></View>:<Image style={[styles.banner,{top: this.state.bannerTop}]} source={{uri:this.props.data.cover+'@300h_' + (Util.size.width*2) + 'w_1e_1c_100q'}}></Image>}
                {<Image style={[styles.banner,{top: this.state.bannerTop, opacity:this.state.opacity/1.3}]} source={blurImage}></Image>}
                <View style={{position:"absolute", top: this.state.bannerTop+90, backgroundColor:"transparent", justifyContent:'center', alignItems:'center', width:Util.size.width}}>
                  <Text style={{ fontSize:18, fontWeight:"400", opacity:this.state.opacity, backgroundColor:"transparent", color:"#fff"}} numberOfLines={1}>{this.props.data.title}</Text>
                </View>
              </View>
              <WebView
                scalesPageToFit={true}
                javaScriptEnabled={true}
                source={{ html: thisContent }}
                style={{zIndex: 0,flex:1}}
              />
      			</View>
            <View style ={{width: Util.size.width,height:45,position:'absolute',bottom:0,zIndex:1,backgroundColor:"#fff"}}>
              <Comments objid = {this.props.articleID} type = {0} commentNum = {this.state.commentNum} navigator = {this.props.navigator}/>
            </View>
          </View>
    		)
      }
      else if(type === 3){//外链
        let dict = JSON.parse(this.state.data.Content);
        let introArr = dict.intro.split('\n')
        var arr = introArr.map((item,index)=>{
          return (
            <Text style = {{fontSize:18,color:'#333',lineHeight:28, backgroundColor:'transparent', marginBottom: 20}} key = {index}>
              {item.trim()}
            </Text>
          )
        })
        let img = dict.image.split("@").length > 1?dict.image.split("@")[0]:dict.image
        img += "@200h_" + (Util.size.width + 200) + "w_1e_1c_95q"
        return(
          <View style={{flex:1, paddingBottom: 44, backgroundColor: '#fff'}}>
            <StatusBar
              translucent={false}
              barStyle="default"
            />
            <ScrollView>
              <Container>
                <H1 style={{marginTop: 45, maxWidth: Util.size.width - 100, fontSize: 26, marginBottom: 30}}>
                  {this.state.data.PostsTitle}
                </H1>
                <Image style = {{height: Util.size.width < 500 ? 180 : 320, flex: 1}} resizeMode="cover" source = {{uri:img}}/>
                <Hr style={{backgroundColor: '#ccc', marginVertical: 30}}/>
                <Row>
                  <View>
                    <P>{'发布人: ' + this.state.data.UserName}</P>
                    <P>{millseconds2DateDiff(this.state.data.PostsDate)}</P>
                  </View>
                  <Image style = {{width:50, height:50, borderRadius:25,}} source = {{uri:this.state.data.UserHeadUrl}} />
                </Row>
                <Hr style={{width: 80, backgroundColor: '#ccc'}}/>
                {arr}
              </Container>
            </ScrollView>
            <Header style={{position: 'absolute', bottom: 0, backgroundColor: '#0086fd', height: 44, paddingTop: 0, width: Util.size.width}}>
              <TouchableOpacity onPress={ e => this.props.navigator.pop() }>
                <Icon name="ios-arrow-back" size={18} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress = { e => {
                this.props.navigator.push({
                  ident: 'link',
                  dataInfo: {
                    userid : this.state.data.UserID,
                    userPhoto : this.state.data.UserHeadUrl,
                    userName : this.state.data.UserName,
                    objid : this.state.data.PostID,
                    uri : dict.link,
                  },
                  commentNum: this.state.commentNum
                })
              }}>
                <Cell>
                  <P style={{color: 'white'}}>查看原文</P>
                </Cell>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection: 'row'}} onPress={ e => this.props.navigator.push({
                  ident: 'showcommentlist',
                  objid: this.state.data.PostID,
                  type: 0,
                  commentNum: this.state.commentNum,
                }) }>
                <GitIcon name="comment" size={18} color="white" />
                <Text style={{color: 'white', fontSize: 16}}>{"  " + this.state.commentNum}</Text>
              </TouchableOpacity>
            </Header>
          </View>
    		)
      }else {
        return <View/>
      }
    }
		else {
		  return (
        <View style={{flex: 1}}>
          <Loading/>
          <GlobleAlert />
        </View>
      )
		}

	}
}

function mapStateToProps(store){
  return {
    user: store.user
  }
}
function mapDispatchToProps(dispatch){
  return {
    insertTopLevelComment: (commentData,postID) => {dispatch({type:'INSERT_TOP_LEVEL_COMMENT', commentData: commentData, postID: postID})},
    insertSecondLevelComment: (ID,commentData,postID) => {dispatch({type:'INSERT_SECOND_LEVEL_COMMENT', commentData: commentData, ID:ID, postID: postID})},
    UPDATE_QUEPARAM:(userName,objFatherid,objid,fatherName)=>{dispatch({type:'UPDATE_QUEPARAM',userName:userName,objFatherid:objFatherid,objid:objid,fatherName:fatherName})},
    UPDATE_LIKE:(objid,isliked,num)=>{dispatch({type:"UPDATE_LIKE",objid:objid,isliked:isliked,num:num})},
    UPDATE_COLLECT:(objid,iscollect,num)=>{dispatch({type:"UPDATE_COLLECT",objid:objid,iscollect:iscollect,num:num})},
    showAlert:(message) =>{dispatch({type:'SHOW_ALERT',message:message})},
  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(TwitterUser)

const styles = StyleSheet.create({
	itemWrapper:{
  	backgroundColor: '#fff'
  },
	twitterContainer:{
  	width: Util.size.width,
  	height: Util.size.height,
    backgroundColor:"transparent",
  },
	userContainer:{
		width: Util.size.width,
  	height: Util.size.height+150,
  	backgroundColor:"#fff",
  	position:"absolute",
  	top:0,
  	left:0,
	},
	userPanel:{
		height:170,
    zIndex: 2
	},
	banner:{
		width: Util.size.width,
		height:125,
		position:"absolute",
		top:0,
		left:0,
	},
  iconContainer:{
    position:"absolute",
    left:10,
    top:95,
    // borderWidth:5,
    // borderColor:"#fff",

  },
  icon:{
    width:68,
    height:68,
    borderRadius:34,
  },
  userControl:{
    height:55,
    position:"absolute",
    top:125,
    width: 200,
    right:10,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between"
  },
  controlBtn:{
    borderColor:"#8999a5",
    borderWidth:1,
    paddingTop:3,paddingLeft:5,paddingBottom:3,paddingRight:5,
    borderRadius:3,
    width:40,
    height:30,
    alignItems:"center",
    justifyContent:"center"
  },
  controlBtn2:{
    borderColor:"#8999a5",
    borderWidth:1,
    paddingTop:3,paddingLeft:5,paddingBottom:3,paddingRight:5,
    borderRadius:3,
    width:120,
    height:30,
    alignItems:"center",
    justifyContent:"center"
  },
  controlIcon:{
    width: 30
  },
  controlBtnText:{
    color:"#8999a5",
    fontSize:14
  },
  userInfo:{
    width: Util.size.width,
    position:"absolute",
    top: 165,
    paddingTop:15, paddingLeft:15, paddingBottom:15,
    left:0,
    height:90,
  },
  userInfoName:{
    color:"#292f33",
    fontSize:20,
    fontWeight:"500",
    paddingBottom:5
  },
  userInfoAccount:{
    color:"#66757f",
    paddingBottom:5
  },
  userInfoFollower:{
    color:"#95a4ae",
    width:110
  },
  userInfoFollowing:{
    color:"#95a4ae",
    width:110
  },
  userInfoFollow:{
    flexDirection:"row"
  },
  fontEm:{
    color:"#292f33",
    fontWeight:"500"
  },
  segment:{
    position: "absolute",
    top: 263,
    left:0,
    width: Util.size.width-15,
    paddingLeft:15,
    height:40,
  }
});
