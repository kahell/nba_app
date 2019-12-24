import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';

import Moment from 'moment';

class ArticleNewsComponent extends Component{

  formatText = (content) =>{
    const text = content.replace(/<p>/g, "").replace(/<\/p>/g, "");
    return text;
  }
  render(){

    const params = this.props.navigation.state.params;
    return (
      <ScrollView style={{backgroundColor:'#f0f0f0'}}>
        <Image
          style={{height:250}}
          source={{uri: params.image}}
          resizeMode='cover'
        />
        <View style={style.articleContainer}>
          <View>
            <Text style={style.articleTitle}>
              {params.title}
            </Text>
            <Text style={style.articleData}> 
              {params.team} - Posted at {Moment(params.date).format('d MMMM')}
            </Text>
          </View>
          <View style={style.articleContent}>
            <Text style={style.articleText}>
              {this.formatText(params.content)}
            </Text>
          </View>
        </View>
      </ScrollView>
    )
  }
};

const style = StyleSheet.create({
  articleContainer: {
    padding: 10
  },
  articleTitle:{
    fontFamily: 'Roboto-Bold',
    fontSize: 23,
    color: '#323232'
  },
  articleData:{
    fontFamily: 'Roboto-Light',
    fontSize: 12,
    color: '#828282'
  },
  articleContent:{
    marginTop: 30
  },
  articleText:{
    fontFamily: 'Roboto-Light',
    textAlign: 'justify',
    lineHeight: 20,
    fontSize: 14
  }
})

export default ArticleNewsComponent;