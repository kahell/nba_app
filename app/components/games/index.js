import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';

import {connect} from 'react-redux';
import { getGames } from '../../store/actions/games_actions';
import Moment from 'moment';

class GamesComponent extends Component{

  componentDidMount(){
    this.props.dispatch(getGames());
  }

  showGames = (list) => (
    list.games ? list.games.map((item, i) => (
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Article',{
            ...item
          })}
          key={i}
        >
          <View style={style.gameContainer}>
            <View style={style.gameBox}>
              <Image
                source={{uri:`${item.awayData.logo}`}}
                style={{height:80, width: 80}}
                resizeMode="contain"
              />
              <Text style={style.teamRecord}>{item.awayData.wins} - {item.awayData.loss}</Text>
            </View>
            <View style={style.gameBox}>
              <Text style={style.gameTime}>{item.time}</Text>
              <Text>{Moment(item.date).format('d MMMM')}</Text>

            </View>
            <View style={style.gameBox}>
              <Image
                source={{uri:`${item.localData.logo}`}}
                style={{height:80, width: 80}}
                resizeMode="contain"
              />
              <Text style={style.teamRecord}>{item.localData.wins} - {item.localData.loss}</Text>

            </View>
          </View>
        </TouchableOpacity>

      ))
    : null
  )

  render(){

    return (
      <ScrollView style={{backgroundColor:'#f0f0f0'}}>
          <View style={{
            flex:1,
            flexDirection: 'column',
            flexWrap:'nowrap'
          }}>
            {this.showGames(this.props.Games)}
          </View>
      </ScrollView>
    )
  }
};

const style = StyleSheet.create({
  gameContainer:{
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor:'#fff',
    shadowColor:'#dddddd',
    shadowOffset: {width:0, height:2},
    shadowOpacity:0.8,
    shadowRadius:2,
    elevation: 1,
    borderRadius: 2,
  },
  gameBox:{
    width:'33.3%',
    height:100,
    backgroundColor:'#fff',
    justifyContent:'center',
    alignItems:'center'
  },
  teamRecord:{
    fontSize:12,
    fontFamily:'Roboto-Light'
  },
  gameTime:{
    fontFamily:'Roboto-Bold',
    fontSize:15
  }
})

function mapStateToProps(state){
  return {
    Games: state.Games
  }
}

export default connect(mapStateToProps)(GamesComponent);