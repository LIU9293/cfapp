import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, AsyncStorage, Switch, LayoutAnimation } from 'react-native';
import { secretaryMessage, getDiscoverPost } from 'connection';
import { connect } from 'react-redux';
import { H1, H2, P, RowText, Row, Container, Cell } from 'rn-sexless';
const window = Dimensions.get('window');

class Message extends Component{
  constructor(props){
    super(props);
    this.state = {
      switch: false
    }
    this.loadMessage = this.loadMessage.bind(this);
  }
  componentDidMount(){
    this.loadMessage()
  }
  loadMessage(){
    if(this.props.user.login){
      secretaryMessage(this.props.user.userid, 'No', (err,data) => {
        if(err){
          console.log(err);
        } else {
          AsyncStorage.setItem('Messages', JSON.stringify(data.List))
            .catch(err => console.log(err))
            .done()
          this.props.update(this.props.messages.concat(data.List));
        }
      })
    }
  }
  goToComment(id){
    this.props.navigator.push({
      ident: 'showcommentlist',
      objid: id,
      type: 0,
      commentNum: 0,
    })
  }
  goToArticle(id){
    getDiscoverPost(id,'',(err,data)=>{
      if(err){console.log(err)} else {
        let cover = data.PostosInfo.PostsFrontCover,
            title = data.PostosInfo.PostsTitle;
        this.props.navigator.push({
          ident: 'article',
          articleID: id,
          data:{
            cover: cover,
            title: title,
          }
        })
      }
    })
  }
  markAsRead(id){
    LayoutAnimation.easeInEaseOut();
    this.props.read(id);
    AsyncStorage.removeItem('Messages')
      .then((e)=>{
        AsyncStorage.setItem('Messages', JSON.stringify(this.props.messages))
      })
      .catch(err => console.log(err))
      .done()
  }
  clearOneMessage(id){
    LayoutAnimation.easeInEaseOut();
    this.props.clearOne(id);
    AsyncStorage.removeItem('Messages')
      .then((e)=>{
        AsyncStorage.setItem('Messages', JSON.stringify(this.props.messages))
      })
      .catch(err => console.log(err))
      .done()
  }
  render(){
    const { messages } = this.props;
    let messagesList;
    console.log(this.props.unread);
    if(messages.length > 0){
      messagesList = messages.map((item, ii) => {
        let isComment, toArticle;
        if(item.ZTMT_TITLE.match('评论')){
          isComment = true;
        };
        if(item.ZTMT_TITLE.match('精华') || item.ZTMT_TITLE.match('置顶') || item.ZTMT_TITLE.match('推荐')){
          toArticle = true;
        };
        if(!this.state.switch && item.readed == true){
          return null
        }
        return(
          <View style={styles.messageBox} key={ii}>
            <Container>
              <H2 style={{fontSize: 16, marginVertical:10}}>
                {item.ZTMT_TITLE}
              </H2>
              <View style={{alignItems: 'flex-end'}}>
                <P>
                  {item.ZTMT_SENDTIME}
                </P>
              </View>
            </Container>
            <View style={styles.buttonArea}>
              {
                isComment
                ?  <TouchableOpacity
                      style={[styles.button, {borderRightWidth:2,borderRightColor:'white'}]}
                      onPress={this.goToComment.bind(this, item.ZTMT_OBJECTID)}
                   >
                     <H2 style={{fontSize: 15}}>去看看</H2>
                   </TouchableOpacity>
                :  null
              }
              {
                toArticle
                ?  <TouchableOpacity
                      style={[styles.button, {borderRightWidth:2,borderRightColor:'white'}]}
                      onPress={this.goToArticle.bind(this, item.ZTMT_OBJECTID)}
                   >
                     <H2 style={{fontSize: 15}}>去看看</H2>
                   </TouchableOpacity>
                :  null
              }
              {
                item.readed
                ?   <TouchableOpacity
                      style={styles.button}
                      onPress={this.clearOneMessage.bind(this, item.ZTMT_ID)}
                    >
                      <H2 style={{fontSize: 15}}>清除</H2>
                    </TouchableOpacity>
                :   <TouchableOpacity
                      style={styles.button}
                      onPress={this.markAsRead.bind(this, item.ZTMT_ID)}
                    >
                      <H2 style={{fontSize: 15}}>标为已读</H2>
                    </TouchableOpacity>
              }
            </View>
          </View>
        )
      })
    }
    if(!this.props.user.login){
      return(
        <Container style={{marginTop: 45}}>
          <H1>消息</H1>
          <Cell>
            <P>您还没有登录哦～</P>
          </Cell>
        </Container>
      )
    }
    return(
      <Container style={{marginTop: 45, marginBottom: 50}}>
        <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems:'center'}}>
          <H1>{this.state.switch ? '所有消息' : '未读消息'}</H1>
          <View style={{flexDirection: 'row', alignItems:'center'}}>
            <P>{'历史消息'}</P>
            <Switch
              onValueChange={value => this.setState({switch: value})}
              style={{height: 20, marginLeft: 10, marginTop: -10}}
              value={this.state.switch}
            />
          </View>
        </View>
        {
          (this.props.unread == 0 && this.state.switch == false)
          ?   <Cell><P>您还没有消息哦～</P></Cell>
          :   <ScrollView
                style={{flex: 1, marginTop: 20}}
                showsVerticalScrollIndicator={false}
              >
                {messagesList}
              </ScrollView>
        }
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  messageBox: {
    width: window.width - 40,
    backgroundColor: '#f1f1f1',
    marginBottom: 20,
  },
  buttonArea: {
    marginTop: 10,
    borderTopWidth: 2,
    borderTopColor: 'white',
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  }
})

function mapStateToProps(store){
  return{
    user: store.user ,
    messages: store.secretaryMessage.data ,
    unread: store.secretaryMessage.UnreadMessages ,
  }
}
function mapDispatchToProps(dispatch){
  return{
    update: (data) => {dispatch({type:'UPDATE_SECRETARY_MESSAGE', data: data})},
    clear: () => {dispatch({type:'CLEAR_SECRETARY_MESSAGE'})},
    clearOne: (id) => {dispatch({type:'CLEAR_A_MESSAGE', id: id})},
    read: (id) => {dispatch({type:'READ_A_MESSAGE', id: id})},
  }
}
module.exports = connect(mapStateToProps,mapDispatchToProps)(Message)
