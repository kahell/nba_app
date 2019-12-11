import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RootNavigator} from './routes';

class App extends Component{
  render(){

    return (
      <View style={{flex: 1}}>
        <RootNavigator/>
      </View>
    )
  }
};

export default App;