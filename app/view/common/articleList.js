import React , { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Container, P, H2, Cell } from 'rn-sexless';
const window = Dimensions.get('window');
const textColor = '#0086fd';

class ArticleList extends Component{
  constructor(props){
    super(props);
    this.state = {
      preFetchImage: []
    }
  }
  render(){
    const { data, dataSource } = this.props;
    let articles = data[dataSource].map((item, ii)=>{
      //有头图的文章
      if(item.cover !== '' && item.type == 1){
        return(
          <View style={styles.box} key={ii}>
            <View style={styles.header}>
              <View style={{flexDirection: 'row', alignItems:'center',}}>
                <Image source={{url : item.avatar}} style={styles.avatar} />
                <Text style={styles.authorName}>{item.nickName}</Text>
              </View>
              <Text style={styles.time}>{item.time}</Text>
            </View>
            <TouchableWithoutFeedback onPress={e => this.props.navigator.push({
              ident: 'article',
              articleID: item.id,
              data: item,
            })}>
              <View>
                <Image source={{url: item.cover + '@200h_430w_1e_1c_100q'}} style={styles.cover} />
                <View style={styles.footer}>
                  <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
                  <Text numberOfLines={2} style={styles.description}>{item.content}</Text>
                  <View style={[styles.bottomInfo, {paddingHorizontal: 0}]}>
                    <View>
                      <Text style={styles.category}>{item.category}</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Icon
                        name="ios-chatbubbles"
                        size={15}
                        style={{marginLeft:8,marginRight:8,color:textColor}} />
                      <Text style={styles.comment}>{item.commentNum || 0}</Text>
                      <Icon
                        name="ios-heart"
                        size={15}
                        style={{marginLeft:14,marginRight:8,color:textColor}} />
                      <Text style={styles.like}>{item.likeNum}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        )
      //没有头图的文章
      } else if(item.cover == '' && item.type == 1) {
        return(
          <View style={styles.box} key={ii}>
            <View style={styles.header}>
              <View style={{flexDirection: 'row', alignItems:'center',}}>
                <Image source={{url : item.avatar}} style={styles.avatar} />
                <Text style={styles.authorName}>{item.nickName}</Text>
              </View>
              <Text style={styles.time}>{item.time}</Text>
            </View>
            <TouchableWithoutFeedback onPress={e => this.props.navigator.push({
              ident: 'article',
              articleID: item.id,
              data: item,
            })}>
                <View style={styles.footer}>
                  <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
                  <Text numberOfLines={2} style={styles.description}>{item.content}</Text>
                  <View style={[styles.bottomInfo, {paddingHorizontal: 0}]}>
                    <View>
                      <Text style={styles.category}>{item.category}</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Icon
                        name="ios-chatbubbles"
                        size={15}
                        style={{marginLeft:8,marginRight:8,color:textColor}} />
                      <Text style={styles.comment}>{item.commentNum || 0}</Text>
                      <Icon
                        name="ios-heart"
                        size={15}
                        style={{marginLeft:14,marginRight:8,color:textColor}} />
                      <Text style={styles.like}>{item.likeNum}</Text>
                    </View>
                  </View>
                </View>
            </TouchableWithoutFeedback>
          </View>
        )
      //外链
    } else if(item.type == 3) {
        let dict = JSON.parse(item.content)
        let link = dict.link;
        let userSay ;
        if( dict.intro !== undefined ){
          userSay = <Text style={{lineHeight: 18}} numberOfLines = {3}>{dict.intro}</Text>
        }
        //Image
        if(dict.image.split('@').length > 1){
          dict.image = dict.image.split('@')[0];
        }
        return(
          <View style={styles.box} key={ii}>
            <View style={styles.header}>
              <View style={{flexDirection: 'row', alignItems:'center',}}>
                <Image source={{url : item.avatar}} style={styles.avatar} />
                <Text style={styles.authorName}>{item.nickName}</Text>
              </View>
              <Text style={styles.time}>{item.time}</Text>
            </View>
            <Container style={{paddingHorizontal: 10, paddingTop: 3, backgroundColor: '#fff'}}>
              {userSay}
              <TouchableOpacity
                style={{flexDirection: 'row', marginTop: 10,
                  borderWidth: 0.5, borderColor: '#ccc', marginBottom: 0, backgroundColor: '#fff'}}
                onPress={e=>this.props.navigator.push({
                  ident: 'article',
                  articleID: item.id,
                  data: item,
                })}
              >
                <Image source={{url: dict.image + '@140h_140w_1e_1c_100q'}} style={{height: 60, width:70}} />
                <Cell style={{backgroundColor: '#fff'}}>
                  <H2 style={{maxWidth: window.width - 140, fontSize: 18}} numberOfLines={2}>
                    {item.title}
                  </H2>
                </Cell>
              </TouchableOpacity>
              <View style={styles.bottomInfo}>
                  <View>
                    <Text style={styles.category}>{item.category}</Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon
                      name="ios-chatbubbles"
                      size={15}
                      style={{marginLeft:8,marginRight:8,color:textColor}} />
                    <Text style={styles.comment}>{item.commentNum || 0}</Text>
                    <Icon
                      name="ios-heart"
                      size={15}
                      style={{marginLeft:14,marginRight:8,color:textColor}} />
                    <Text style={styles.like}>{item.likeNum}</Text>
                  </View>
                </View>
              </Container>
          </View>
        )
      }
    });
    return(
      <View style={{flex: 1, backgroundColor: '#fafafa'}}>
        { articles ? articles : null }
      </View>
    )
  }
}

function mapStateToProps(store){
  return{
    data: store.discoverListData
  }
}

const styles = StyleSheet.create({
  comment:{
    color:'#666',
  },
  like:{
    color: '#666'
  },
  category:{
    color:'#666',
  },
  description:{
    marginVertical:10,
    color: '#666',
  },
  title:{
    marginTop:10,
    fontSize:20,
    fontWeight:'bold',
    color: '#333',
  },
  footer:{
    paddingHorizontal: 10,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  authorName:{
    marginLeft:10
  },
  box:{
    backgroundColor:'#fff',
    marginBottom:10,
    borderTopWidth:0.5,
    borderBottomWidth:0.5,
    borderColor:'#dcdcdc',
  },
  time:{
    color:'#666',
  },
  avatar:{
    height:30,
    width:30,
    borderRadius:15,
  },
  cover:{
    height:140,
    width: window.width
  },
  bottomInfo:{
    flexDirection: 'row',
    height: 30,
    alignItems:'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  header:{
    flexDirection: 'row',
    height: 44,
    paddingLeft:10,
    paddingRight:10,
    alignItems:'center',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
  listView:{
    backgroundColor:"#efefef",
    flex:1,
  },
  loader:{
    flex:1,
    backgroundColor:"#fff",
    justifyContent:'center',
    alignItems:'center',
  }
})

module.exports = connect(mapStateToProps)(ArticleList)
