import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, ActivityIndicator} from 'react-native';

import LogoComponent from './authLogo';
import AuthFormComponent from './authForm';

class AuthComponent extends Component{
  
  state = {
    loading: false
  }

  render(){
    if(this.state.loading){
        return (
          <View style={style.loading}>
            <ActivityIndicator/>
          </View>
        )
    }else{
      return (
        <ScrollView style={style.container}>
          <LogoComponent/>
          <AuthFormComponent/>
        </ScrollView>
      )
    }
  }
};

const style = StyleSheet.create({

  container: {
    flex: 1,
    padding: 50,
    backgroundColor: '#F5FCFF'
  },
  loading:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
})

export default AuthComponent;