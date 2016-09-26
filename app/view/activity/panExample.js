import React, { Component, } from 'react';
import { View, Text, Navigator, StyleSheet, Dimensions, Image, TouchableOpacity, PanResponder } from 'react-native';
const window = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';

const initalBallSize = 120;

class PanExample extends Component{

  constructor(props){
    super(props);
    this.state = {
      color: "grey",
      ballSize: initalBallSize,
    };
    this.ballStyle = {
      left: (window.width - initalBallSize)/2,
      top: (window.height - initalBallSize)/2,
    };
    this.ballStyleCurrent = {
      left: (window.width - initalBallSize)/2,
      top: (window.height - initalBallSize)/2,
    }
  }

  componentWillMount(){
    this.pan = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      // onPanResponderGrant => 用户的touch行为开始，改变颜色告诉用户他已经按住
      onPanResponderGrant: (evt, gestureState) => {this.setState({color: "white",})},
      // onPanResponderMove => 用户正在进行touch
      onPanResponderMove: (evt, gestureState) => {
        this.ballStyle = {
          left: this.ballStyleCurrent.left + gestureState.dx,
          top: this.ballStyleCurrent.top + gestureState.dy
        }
        this.updatePosition();
      },
      //释放touch
      onPanResponderRelease: (evt, gestureState) => {
        this.setState({
          color: 'grey',
        });
        this.ballStyle = {
          left: this.ballStyleCurrent.left + gestureState.dx,
          top: this.ballStyleCurrent.top + gestureState.dy
        };
        this.ballStyleCurrent = this.ballStyle;
      },
      onPanResponderTerminate: (evt, gestureState) => {
        this.setState({
          color: 'grey',
        });
        this.ballStyle = {
          left: this.ballStyleCurrent.left + gestureState.dx,
          top: this.ballStyleCurrent.top + gestureState.dy
        };
        this.ballStyleCurrent = this.ballStyle;
      },
    });
  }

  updatePosition() {
    this.circle.setNativeProps({
      style: this.ballStyle
    });
  }

  componentDidMount() {
    this.updatePosition();
  }

  render(){
    return(
      <View style={styles.container}>
        <View
          ref={(circle) => {this.circle = circle;}}
          style={styles.MoveableCircle}
          {...this.pan.panHandlers}>
          <Icon ref="baseball" name="ios-baseball" color={this.state.color} size={120}></Icon>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#191',
  },
  MoveableCircle:{
    backgroundColor:"transparent",
    position:"absolute",
    height: 120,
    width: 120,
  },
})

module.exports = PanExample
