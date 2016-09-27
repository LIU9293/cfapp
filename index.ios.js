import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './app/redux/store';
import { AppRegistry } from 'react-native';
import App from './app/main';
import codePush from "react-native-code-push";

console.disableYellowBox = true;
let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };

class Careerfore extends Component{
  render(){
    return(
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

Careerfore = codePush(codePushOptions)(Careerfore);

AppRegistry.registerComponent('cfapp', () => Careerfore);
