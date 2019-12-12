import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

class ArticleNewsComponent extends Component{
  render(){

    return (
      <View style={style.container}>
          <Text>Hello I'm Article Component</Text>
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

export default ArticleNewsComponent;