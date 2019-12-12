import React, {Component} from 'react';
import {StyleSheet, Text, Image, View, TouchableOpacity, ScrollView} from 'react-native';

import { connect } from 'react-redux';
import {getNews} from '../../store/actions/news_actions';

class NewsComponent extends Component{

  componentDidMount(){
    this.props.dispatch(getNews());
  }

  renderArticle = (news) => (
    news.articles ? news.articles.map((item,i)=>(
        <TouchableOpacity
          key={i}
        >
          <View style={style.cardContainer}>
            <View>
              <Image
                style={{height:150,justifyContent:'space-around'}}
                source={{uri:`${item.image}`}}
                resizeMode='cover'
              />
            </View>

          </View>
        </TouchableOpacity>
        ))
      :null
  )

  render(){

    return (
      <ScrollView style={{backgroundColor:'#f0f0f0'}}>
        {this.renderArticle(this.props.News)}
      </ScrollView>
    )
  }
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  cardContainer: {
    backgroundColor:'white',
    margin:10,
    shadowColor:'#dddddd',
    shadowOffset: {width:0, height:2},
    shadowOpacity:0.8,
    shadowRadius:2,
    elevation: 1,
    borderRadius: 2,
  }
})

function mapStateToProps(state){
  console.log('state: ',state);
  return {
    News: state.News
  }
}

export default connect(mapStateToProps)(NewsComponent);