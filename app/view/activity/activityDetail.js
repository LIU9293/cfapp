import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, Dimensions, PanResponder, StatusBar, WebView, TouchableOpacity } from 'react-native';
import { getPlaygroundPost } from 'connection';
import { connect } from 'react-redux';
import Comments from '../common/Comment';
import { betterText } from '../../vendor/helper/betterText';
const window = Dimensions.get('window');

class ActivityDetail extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: null,
      barStyle: 'light-content',
      scrollEnable: false,
    }
    this.topBannerHeightBefore = 200;
    this.topBannerHeight = 200;
    this.blur = {
      opacity: 0
    }
  }
  componentWillMount(){
    console.log(this.props.activityID)
    getPlaygroundPost(this.props.activityID, this.props.user.userid || '', (err,data)=>{
      if(err){
        console.log(err);
      } else {
        console.log(data);
        this.setState({
          data: data.Activity
        })
        /*
        ActivityAddress:"上海上海市静安区南京西路688号"
        ActivityCheckState:-2
        ActivityContent:"<p>这一次的参访活动包含了『安永超神品牌主管讲课+阳狮集团参访』两部分</p><p></p><p></p><section><section powered-by="xiumi.us"><section><section><section></section></section></section></section></section><p></p><p>面谈| 四大会计事务所『安永』HR的用人之道</p><p></p><p><img src="http://imagecdn.pine-soft.com/3AD80F674FBF4995A5BA49741226C302.png" title="图片2.png" alt="图片2.png"/></p><p>Bella Cui</p><p>两年外企猎头经验</p><p>五年安永会计事务所校招一线经验</p><p>现就职安永雇主品牌主管</p><p></p><p>课程内容：</p><ul ><li><p>如何让你的简历在60s的HR筛选时间内脱颖而出</p></li><li><p>如何定义并培养自己的核心，一键搞定面试官</p></li><li><p>最最最关键的是，如何在安永实习后留下来！</p><p></p></li></ul><p><img src="http://imagecdn.pine-soft.com/6299781E69CA46C6B5E301B2B2F13B4C.png" title="222344564.png" alt="222344564.png"/></p><p></p><p></p><section><section powered-by="xiumi.us"><section><section><section></section></section></section></section></section><p></p><p>『阳狮锐奇』（PublicisGroupe）参访</p><p></p><ul ><li><p>阳狮集团—全球广告界的四大巨无霸之一传播集团，国际4A广告公司。</p></li><li><p>旗下的李奥贝纳公司被AMC当作原型重金改成了电视剧《广告狂人》，连播7年拿了15座艾美奖。</p></li><li><p>旗下的睿域是全球最大的互动机构之一，20多个办事处分布在7个国家（澳大利亚、中国、法国、德国、日本、英国和美国）</p></li></ul><p><img src="http://imagecdn.pine-soft.com/73134E522ED14D449E112B4DBAF5CED0.jpg" title="fvbgrfnbgf.jpg" alt="fvbgrfnbgf.jpg"/></p><p></p><p>最重要的是：只要报名就可以获得安永姐姐的课堂笔记一份！并且加入名企参访微信群就可以第一时间获得课堂笔记、面授传播、更有大咖不定期分享！</p><p></p><p>报名方式：</p><p>1、网页报名</p><p>2、添加企业参访小助手微信报名，微信号：shenyuxiang7</p><p><img src="http://imagecdn.pine-soft.com/855C28AC488546C4B9C92FF2C19CA433.jpg" title="124161332757265268.jpg" alt="124161332757265268.jpg" width="336" height="212" /></p><p></p><p></p>"
        ActivityEndDate:"2016-09-24"
        ActivityID:"abd482f657c64c89bd71e4dba70b58f0"
        ActivityLatitude:"31.237269"
        ActivityLikeCount:0
        ActivityLongitude:"121.471319"
        ActivityPictureUrl:"http://imageservice.pine-soft.com/9C60A1F3A2D3447698225502C73EE244.jpg"
        ActivityStartDate:"2016-09-23"
        ActivityState:-1
        ActivityTitle:"企业参访｜阳狮集团探秘 ＋ 安永HR教你如何面试"
        CheckPeopleNum:0
        Fee:0
        IsAudit:0
        PeopleNum:3
        */
      }
    })
    this.pan = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      // onPanResponderGrant => 用户的touch行为开始，改变颜色告诉用户他已经按住
      onPanResponderGrant: (evt, gestureState) => true,
      // onPanResponderMove => 用户正在进行touch
      onPanResponderMove: (evt, gestureState) => {
        this.topBannerHeight = this.topBannerHeightBefore + gestureState.dy;
        if(this.topBannerHeight < 0){
          this.topBannerHeight = 0;
          this.setState({
            barStyle: "default" ,
            scrollEnable: true,
          })
        } else {
          this.setState({
            barStyle: "light-content" ,
            scrollEnable: false,
          })
        }
        if(this.topBannerHeight > 200){
          this.topBannerHeight = 200
        }
        this.banner.setNativeProps({
          style: {height: this.topBannerHeight}
        });
      },
      //释放touch或终止touch
      onPanResponderRelease: (evt, gestureState) => {
        this.topBannerHeightBefore = this.topBannerHeight
      },
      onPanResponderTerminate: (evt, gestureState) => {
        this.topBannerHeightBefore = this.topBannerHeight
      },
    });
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextState.barStyle == this.state.barStyle){
      return false;
    } else {
      return true;
    }
  }

  render(){
    const { data, scrollEnable } = this.state;
    return(
      <View
        style={{flex:1}}
        ref={(wapper) => {this.wapper = wapper}}
        {...this.pan.panHandlers}
      >
        <StatusBar
          showHideTransition={'fade'}
          animated={true}
          barStyle={this.state.barStyle}
        />
        <Image
          ref={(banner) => {this.banner = banner}}
          source={{url: 'http://imageservice.pine-soft.com/1E38337AEAAA4672820A693202D517F0.jpg@600h_600w_1e_1c_100q'}}
          resizeMode={"cover"}
          style={styles.header}
        />
        <View style={styles.titleArea}>
          <Text style={styles.title} numberOfLines={10} >在伟达公关，简单也能学出花样学出花样</Text>
          <View style={{alignItems: 'flex-end'}}>
            <Text style={styles.date}>9.24</Text>
            <Text style={styles.city}>上海</Text>
          </View>
        </View>
        <View style={styles.hr} />
        <ScrollView
          scrollEnabled={true}
          ref={(scroll) => {this.scroll = scroll}}
        >
          <View style={styles.row}>
            <Text style={styles.rowLabel}>昵称</Text>
          </View>
          <View style={styles.border} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>昵称</Text>
          </View>
          <View style={styles.border} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>昵称</Text>
          </View>
          <View style={styles.border} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>昵称</Text>
          </View>
          <View style={styles.border} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>昵称</Text>
          </View>
          <View style={styles.border} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>昵称</Text>
          </View>
          <View style={styles.border} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>昵称</Text>
          </View>
          <View style={styles.border} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>昵称</Text>
          </View>
          <View style={styles.border} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>昵称</Text>
          </View>
          <View style={styles.border} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>昵称</Text>
          </View>
          <View style={styles.border} />
        </ScrollView>
        <TouchableOpacity style={styles.Bottom}>
          <Text style={{color:'#fff', fontSize:16}}>立即报名</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    width: window.width,
    overflow: 'hidden',
    height: 200,
  },
  titleArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 40,
    marginBottom: 30,
    overflow: 'visible',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    maxWidth: 200,
    color: '#333',
  },
  hr: {
    height: 1,
    backgroundColor: '#333',
    width: 100,
    margin: 20,
  },
  date: {
    fontSize: 22,
    fontWeight: 'bold',
    maxWidth: 200,
    color: '#999',
  },
  city: {
    fontSize: 22,
    fontWeight: '300',
    maxWidth: 200,
    color: '#999',
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#666',
    marginLeft: 20,
  },
  Bottom: {
    position: 'absolute',
    bottom: 0,
    width: window.width,
    height: 40,
    backgroundColor: 'steelblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  rowLabel: {
    fontSize: 18,
    color: '#aaa'
  },
  border: {
    height: 0.8,
    backgroundColor: '#aaa',
    marginHorizontal: 20,
    width: window.width - 40,
  },
})

function mapStateToProps(store){
  return{
    user: store.user
  }
}

module.exports = connect(mapStateToProps)(ActivityDetail)
