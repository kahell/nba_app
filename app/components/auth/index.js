import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, ActivityIndicator} from 'react-native';

import LogoComponent from './authLogo';
import AuthFormComponent from './authForm';

import {getTokens, setTokens} from '../../components/utils/misc';

import { connect } from 'react-redux';
import { autoSignIn} from '../../store/actions/user_actions';
import {bindActionCreators} from 'redux';

class AuthComponent extends Component{

  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }

    this.goNext = this.goNext.bind(this);
  }

  goNext = () => {
    this.props.navigation.navigate('App');
  }

  componentDidMount(){
    getTokens((value) => {
      if(value[0][1] === null){
        this.setState({
          loading: false
        })
      }else{
        this.props.autoSignIn(value[1][1]).then(() => {
          if(!this.props.User.auth.token){
            this.setState({
              loading: false
            });
          }else{
            setTokens(this.props.User.auth, () =>{
              this.goNext();
            })
          }
        });
      }
    });
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
          <AuthFormComponent
            goNext={this.goNext}
          />
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

function mapStateToProps(state){
  return {
      User: state.User
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({autoSignIn}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthComponent);