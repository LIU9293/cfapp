import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, WebView, StatusBar ,Image} from 'react-native';
const Window = Dimensions.get('window');

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const blurImage = require('../../../images/logo/backgroundimage.png');


class Gradient extends Component{
  render(){
    return(
      <View style={[styles.wapper, this.props.style]}>
        <StatusBar
          barStyle={'light-content'}
        />
        <Image resizeMode = "cover" style = {{width: width,height: height, position: 'absolute'}} source = {blurImage}/>
        {this.props.children}
      </View>
    )
  }
}

const html = `
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="initial-scale=1, minimal-ui" />
  <style>
    *{
      padding: 0;
      margin: 0;
    }
    html, body{
      height: 100%;
      width: 100%;
    }
    #bg{
      background-image: -webkit-linear-gradient(130deg,#0966f7,#0fbfff);
      -webkit-animation: hue 10s infinite linear;
      height:100%;
      width:100%;
    }
    @-webkit-keyframes hue {
      0 {-webkit-filter: hue-rotate(0deg)}
      50% {-webkit-filter: hue-rotate(-30deg)}
      100%  {-webkit-filter: hue-rotate(0deg)}
    }
  </style>
</head>
<body>
  <div id='bg'>
  </div>
</body>
</html>

`

const styles = StyleSheet.create({
  wapper: {
    flex:1,
  }
})

module.exports = Gradient
