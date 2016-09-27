import React, { Component } from 'react';
import { Image, AppRegistry, Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
const star = require('../../../images/animation/star.png');

class Star extends Component{
  constructor(props){
    super(props);
    this.state = {
      position: this.props.collected ? 49 : 0,
      nextIsAnimate: this.props.collected ? false : true,
    }
    this.animate = this.animate.bind(this);
    this.clear = this.clear.bind(this);
    this.imageNum = 50;
    this.t = null;
    this.count = 0;
  }
  animate(){
    if(this.count == 0 && this.state.position == 0){
      this.t = setInterval(()=>{
        this.setState({
          position: this.state.position + 1,
        });
        this.count = this.count + 1;
      }, 1000/50);
      this.props.star();
    }
  }
  clear(){
    this.setState({position: 0});
    this.count = 0;
    this.props.unstar();
  }
  render(){
    if(this.count == this.imageNum - 2){
      clearInterval(this.t);
      this.count = 0;
    }
    return(
      <View
        style={{height: 70, width: 70, overflow: 'hidden'}}
      >
        <Image
          source={star}
          resizeMode="contain"
          style={[styles.image, {left: this.state.position*(-70)}]}
        />
        <TouchableWithoutFeedback
          onPress={e=>{
            if(this.props.disabled){
              this.props.star()
            } else if(this.state.nextIsAnimate && this.state.position == 0){
              this.animate();
              this.setState({nextIsAnimate: !this.state.nextIsAnimate});
            } else if (!this.state.nextIsAnimate && this.count <= 1){
              this.clear();
              this.setState({nextIsAnimate: !this.state.nextIsAnimate});
            } else {
              return
            }
          }}
        >
          <View style={{position: 'absolute', height: 70, width: 70, top:0, left:0}} />
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: 5000*0.7,
    height: 100*0.7,
  }
})

module.exports = Star
