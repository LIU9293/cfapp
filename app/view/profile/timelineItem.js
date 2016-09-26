import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, navigator, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import S from 'string';
import { Container, H2, Cell } from 'rn-sexless';
const window = Dimensions.get('window');
const zan = require('../../../images/icon/zan.png');
const article = require('../../../images/icon/article.png');
const collect = require('../../../images/icon/collect.png');
const comment = require('../../../images/icon/comment.png');
const triangle = require('../../../images/icon/triangle.png');

class TimelineItem extends Component{
  constructor(props){
    super(props);
  }
  nav(type, id, cover, title){
    if(type == 'comment'){
      this.props.navigator.push({
        ident: 'showcommentlist',
        objid: id,
        type: 0,
        commentNum: 0,
      })
    } else {
      this.props.navigator.push({
        ident: 'article',
        articleID: id,
        data: {
          cover: cover,
          title: title,
        }
      })
    }
  }
  render(){
    const { type, data } = this.props;
    switch (type) {
      case 'comment':
        if(data.articleType == 1){
          return(
            <View style={styles.wapper}>
              <View style={styles.verticalLine} />
              <Image style={styles.icon} source={comment} />
              <TouchableOpacity style={styles.content} onPress={this.nav.bind(this, type, data.articleID, data.articleCover, data.articleTitle)}>
                <View style={styles.row}>
                  <Text style={styles.intro}>{'评论了 '+ data.articleWriterName +' 的文章'}</Text>
                  <Text style={styles.intro}>{data.time}</Text>
                </View>
                <Image style={styles.cover} source={{url: data.articleCover + '@140h_300w_1e_1c_100q'}} />
                <Text style={styles.title} numberOfLines={1} >{data.articleTitle}</Text>
                <Text style={styles.intro} numberOfLines={2} >{S(data.articleContent).decodeHTMLEntities().stripTags().s}</Text>
              </TouchableOpacity>
              <Image style={styles.triangle} source={triangle} />
            </View>
          )
        } else {
          return (
            <View style={styles.wapper}>
              <View style={styles.verticalLine} />
              <Image style={styles.icon} source={comment} />
              <TouchableOpacity style={styles.content} onPress={this.nav.bind(this, type, data.articleID, data.articleCover, data.articleTitle)}>
                <View style={styles.row}>
                  <Text style={styles.intro}>{'评论了 '+ data.articleWriterName +' 的文章'}</Text>
                  <Text style={styles.intro}>{data.time}</Text>
                </View>
                <View
                  style={{flexDirection: 'row', margin: 5,
                    borderWidth: 0.5, borderColor: '#ccc'}}
                >
                  <Image source={{url: data.articleCover + '@140h_140w_1e_1c_100q'}} style={{height: 55, width:60}} />
                  <Cell>
                    <H2 style={{marginHorizontal: 5, fontSize: 16}} numberOfLines={2}>
                      {data.articleTitle}
                    </H2>
                  </Cell>
                </View>
              </TouchableOpacity>
              <Image style={styles.triangle} source={triangle} />
            </View>
          )
        }
        break;
      case 'article':
        if(data.articleType == 1){
          return(
            <View style={styles.wapper}>
              <View style={styles.verticalLine} />
              <Image style={styles.icon} source={article} />
              <TouchableOpacity style={styles.content} onPress={this.nav.bind(this, type, data.articleID, data.articleCover, data.articleTitle)}>
                <View style={styles.row}>
                  <Text style={styles.intro}>{'发布了文章'}</Text>
                  <Text style={styles.intro}>{data.time}</Text>
                </View>
                <Image style={styles.cover} source={{url: data.articleCover + '@140h_300w_1e_1c_100q'}} />
                <Text style={styles.title} numberOfLines={1} >{data.articleTitle}</Text>
                <Text style={styles.intro} numberOfLines={2} >{S(data.articleContent).decodeHTMLEntities().stripTags().s}</Text>
              </TouchableOpacity>
              <Image style={styles.triangle} source={triangle} />
            </View>
          )
        } else {
          return (
            <View style={styles.wapper}>
              <View style={styles.verticalLine} />
              <Image style={styles.icon} source={article} />
              <TouchableOpacity style={styles.content} onPress={this.nav.bind(this, type, data.articleID, data.articleCover, data.articleTitle)}>
                <View style={styles.row}>
                  <Text style={styles.intro}>{'发布了链接'}</Text>
                  <Text style={styles.intro}>{data.time}</Text>
                </View>
                <View
                  style={{flexDirection: 'row', margin: 5,
                    borderWidth: 0.5, borderColor: '#ccc'}}
                >
                  <Image source={{url: data.articleCover + '@140h_140w_1e_1c_100q'}} style={{height: 55, width:60}} />
                  <Cell>
                    <H2 style={{marginHorizontal: 5, fontSize: 16}} numberOfLines={2}>
                      {data.articleTitle}
                    </H2>
                  </Cell>
                </View>
              </TouchableOpacity>
              <Image style={styles.triangle} source={triangle} />
            </View>
          )
        }
        break;
      case 'like':
        if(data.articleType == 1){
          return(
            <View style={styles.wapper}>
              <View style={styles.verticalLine} />
              <Image style={styles.icon} source={zan} />
              <TouchableOpacity style={styles.content} onPress={this.nav.bind(this, type, data.articleID, data.articleCover, data.articleTitle)}>
                <View style={styles.row}>
                  <Text style={styles.intro}>{'👍了 '+ data.articleWriterName +' 的文章'}</Text>
                  <Text style={styles.intro}>{data.time}</Text>
                </View>
                <Image style={styles.cover} source={{url: data.articleCover + '@140h_300w_1e_1c_100q'}} />
                <Text style={styles.title} numberOfLines={1} >{data.articleTitle}</Text>
                <Text style={styles.intro} numberOfLines={2} >{S(data.articleContent).decodeHTMLEntities().stripTags().s}</Text>
              </TouchableOpacity>
              <Image style={styles.triangle} source={triangle} />
            </View>
          )
        } else {
          return(
            <View style={styles.wapper}>
              <View style={styles.verticalLine} />
              <Image style={styles.icon} source={zan} />
              <TouchableOpacity style={styles.content} onPress={this.nav.bind(this, type, data.articleID, data.articleCover, data.articleTitle)}>
                <View style={styles.row}>
                  <Text style={styles.intro}>{'👍了 '+ data.articleWriterName +' 的文章'}</Text>
                  <Text style={styles.intro}>{data.time}</Text>
                </View>
                <View
                  style={{flexDirection: 'row', margin: 5,
                    borderWidth: 0.5, borderColor: '#ccc'}}
                >
                  <Image source={{url: data.articleCover + '@140h_140w_1e_1c_100q'}} style={{height: 55, width:60}} />
                  <Cell>
                    <H2 style={{marginHorizontal: 5, fontSize: 16}} numberOfLines={2}>
                      {data.articleTitle}
                    </H2>
                  </Cell>
                </View>
              </TouchableOpacity>
              <Image style={styles.triangle} source={triangle} />
            </View>
          )
        }
        break;
      case 'collect':
        if(data.articleType == 1){
          return(
            <View style={styles.wapper}>
              <View style={styles.verticalLine} />
              <Image style={styles.icon} source={collect} />
              <TouchableOpacity style={styles.content} onPress={this.nav.bind(this, type, data.articleID, data.articleCover, data.articleTitle)}>
                <View style={styles.row}>
                  <Text style={styles.intro}>{'收藏了 '+ data.articleWriterName +' 的文章'}</Text>
                  <Text style={styles.intro}>{data.time}</Text>
                </View>
                <Image style={styles.cover} source={{url: data.articleCover + '@140h_300w_1e_1c_100q'}} />
                <Text style={styles.title} numberOfLines={1} >{data.articleTitle}</Text>
                <Text style={styles.intro} numberOfLines={2} >{S(data.articleContent).decodeHTMLEntities().stripTags().s}</Text>
              </TouchableOpacity>
              <Image style={styles.triangle} source={triangle} />
            </View>
          )
        } else {
          return(
            <View style={styles.wapper}>
              <View style={styles.verticalLine} />
              <Image style={styles.icon} source={collect} />
              <TouchableOpacity style={styles.content} onPress={this.nav.bind(this, type, data.articleID, data.articleCover, data.articleTitle)}>
                <View style={styles.row}>
                  <Text style={styles.intro}>{'收藏了 '+ data.articleWriterName +' 的文章'}</Text>
                  <Text style={styles.intro}>{data.time}</Text>
                </View>
                <View
                  style={{flexDirection: 'row', margin: 5,
                    borderWidth: 0.5, borderColor: '#ccc'}}
                >
                  <Image source={{url: data.articleCover + '@140h_140w_1e_1c_100q'}} style={{height: 55, width:60}} />
                  <Cell>
                    <H2 style={{marginHorizontal: 5, fontSize: 16}} numberOfLines={2}>
                      {data.articleTitle}
                    </H2>
                  </Cell>
                </View>
              </TouchableOpacity>
              <Image style={styles.triangle} source={triangle} />
            </View>
          )
        }
        break;
      default:
        return null
    }
  }
}

const styles = StyleSheet.create({
  wapper: {
    width: window.width,
    minHeight: 150,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  verticalLine: {
    height: 500,
    width: 3,
    backgroundColor: '#d7e4ed',
    position: 'absolute',
    top: 0,
    left: 38.5,
  },
  icon: {
    position: 'absolute',
    top: 40,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#d7e4ed'
  },
  content: {
    marginTop: 40,
    marginLeft: 80,
    marginRight: 20,
    backgroundColor: '#fff',
    width: window.width - 100,
    minHeight: 100,
    padding: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {'width': 2, 'height': 2},
    shadowRadius: 1,
    borderRadius: 4,
    borderWidth: 0.8,
    borderColor: '#eee',
    overflow:'hidden'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    alignItems: 'center',
  },
  intro: {
    fontSize: 12,
    color: '#aaa',
  },
  title: {
    fontSize: 16,
    color: '#666',
    marginVertical: 8,
  },
  cover: {
    width: window.width - 100,
    height: 100,
    marginLeft: -5,
  },
  button: {
    backgroundColor: '#acb7c0',
    height: 26,
    width: 70,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  triangle: {
    height: 16,
    width: 14,
    top: 48,
    left: 68,
    position: 'absolute',
  }
})

function mapStateToProps(store){
  return{
    user: store.user
  }
}
module.exports = connect(mapStateToProps)(TimelineItem)
