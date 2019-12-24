import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator, ScrollView, Button} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/dist/Ionicons';

import {getTokens, setTokens} from '../../components/utils/misc';

import { connect } from 'react-redux';
import { autoSignIn} from '../../store/actions/user_actions';

class ArticleGamesComponent extends Component{

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      isAuth: true
    }
  }

  componentDidMount(){
    const User = this.props.User;

    getTokens((value) => {
      if(value[0][1] === null){
        this.manageStage(false,false);
      }else{
        this.props.dispatch(autoSignIn(value[1][1]))
        .then(() => {
          !User.auth.token?
            this.manageStage(false, false)
          :
            setTokens(User.auth, () => {
              this.manageStage(false, true);
            })
        });
      }
    })
  }

  manageStage(loading, isAuth) {
    this.setState({
      loading,
      isAuth
    })
  }

  render(){

    const params = this.props.navigation.state.params;

    if(this.state.loading){
      return(
        <View style={style.loading}>
        <ActivityIndicator/>
      </View>
      )
    }else{
      return(
      <ScrollView style={{backgroundColor:'#f0f0f0'}}>
        {
          this.state.isAuth ?
            <Video
              source={{uri:params.play}}
              controls={true}
              muted={true}
              paused={true}
              style={{width:'100%', height: 250}}
            />
          :
          <View style={style.notAuth}>
            <Icon name="md-sad" size={80} color="#d5d5d5"/>
            <Text style={style.notAuthText}>
              We are sorry you need to be Registered / logged to see this game
            </Text>
            <Button
              title="Login / Register"
              onPress = {() => this.props.navigation.navigate('Auth')}
            />
          </View>
        }
      </ScrollView>
      )
    }
  }
};

const style = StyleSheet.create({
  loading:{
    flex:1,
    backgroundColor: '#fff',
    alignItems:'center',
    justifyContent:'center'
  },
  notAuth:{
    flex: 1,
    margin: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  notAuthText:{
    fontFamily:'Roboto-Bold'
  }
})

function mapStateToProps(state){
  return {
      User: state.User
  }
}
export default connect(mapStateToProps)(ArticleGamesComponent);