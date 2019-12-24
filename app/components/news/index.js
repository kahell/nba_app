import React, {Component} from 'react';
import {StyleSheet, Text, Image, View, TouchableOpacity, ScrollView} from 'react-native';

import { connect } from 'react-redux';
import {getNews} from '../../store/actions/news_actions';

import Moment from 'moment';

class NewsComponent extends Component{

  componentDidMount(){
    this.props.dispatch(getNews());
  }

  renderArticle = (news) => (
    news.articles ? news.articles.map((item,i)=>(
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Article',{
            ...item
          })}
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
            <View style={style.contentCard}>
              <Text style={style.titleCard}>{item.title}</Text>
              <View style={style.bottomCard}>
                <Text style={style.bottomCardTeam}>{item.team} - </Text>
                <Text style={style.bottomCardText}>Posted at {Moment(item.date).format('d MMMM')}</Text>
              </View>
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
  },
  contentCard:{
    borderWidth: 1,
    borderColor: '#dddddd',
  },
  titleCard:{
    color:'#232323',
    fontFamily:'Roboto-Bold',
    padding: 10,
    fontSize:16,
  },
  bottomCard:{
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e6e6e6',
    padding: 10,
  },
  bottomCardTeam:{
    color: '#828282',
    fontFamily:'Roboto-Bold',
    fontSize: 12
  },
  bottomCardText:{
    fontFamily:'Roboto-Light',
    color:'#828282',
    fontSize: 12
  }
})

function mapStateToProps(state){
  console.log('state: ',state);
  return {
    News: state.News
  }
}

export default connect(mapStateToProps)(NewsComponent);