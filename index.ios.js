import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './app/redux/store';
import { AppRegistry } from 'react-native';
import App from './app/main';

class Careerfore extends Component{
  render(){
    return(
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('cfapp', () => Careerfore);
