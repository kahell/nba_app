import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RootNavigator} from './routes';

class App extends Component{
  render(){
    const Nav = RootNavigator();

    return (
      <View style={style.container}>
        <Nav/>
      </View>
    )
  }
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
})

export default App;