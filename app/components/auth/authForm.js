import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, Platform} from 'react-native';

import Input from '../utils/forms/input';
import ValidationRules from '../utils/forms/validationRules';

import { connect } from 'react-redux';
import { signIn, signUp } from '../../store/actions/user_actions';
import {bindActionCreators} from 'redux';

import {setTokens} from '../../components/utils/misc';

class AuthFormComponent extends Component{

    constructor(props) {
        super(props)
    
        this.changeFormType = this.changeFormType.bind(this);
        this.submitUser = this.submitUser.bind(this);
    }

    state = {
        type: 'Login',
        action: 'Login',
        actionMode: 'I Want To Register',
        hasErrors: false,
        form:{
            email:{
                value:'',
                valid:false,
                type:'textinput',
                rules:{
                    isRequired: true,
                    isEmail: true,
                }
            },
            password: {
                value:'',
                valid:false,
                type:'textinput',
                rules:{
                    isRequired: true,
                    minLength: 6,
                }
            },
            confirmPassword:{
                value:'',
                valid:false,
                type:'textinput',
                rules:{
                    confirmPass: 'password',
                }
            }
        }
    }

    updateInput = (name, value) => {
        this.setState({
            hasErrors: false
        });

        let formCopy = this.state.form;
        formCopy[name].value=value;

        // Rules
        let rules = formCopy[name].rules;
        let valid = ValidationRules(value, rules, formCopy);

        formCopy[name].valid = valid;

        this.setState({
            form: formCopy
        })
    }

    confirmPassword = () => (
        this.state.type != 'Login' ?  <Input
            placeholder='Enter Confirm Password'
            placeholderTextColor='#008BFF'
            type={this.state.form.confirmPassword.type}
            value={this.state.form.confirmPassword.value}
            onChangeText={value => this.updateInput('confirmPassword', value)}
            secureTextEntry
            // overrideStyle={{}}
        /> : null
    )

    formHasErrors = () => (
        this.state.hasErrors ? 
        <View style={style.errorContainer}>
            <Text style={style.errorLabel}>Oops.. Check your info</Text>
        </View>
        : null
    )

    changeFormType = () => {
        const type = this.state.type;

        this.setState({
            type: type === 'Login' ? 'Register' : 'Login',
            action: type === 'Login' ? 'Register' : 'Login',
            actionMode: type === 'Login' ? 'I want to Login' : 'I want to Register',
        });
    }

    manageAccess = () => {
        if(!this.props.User.auth.uid){
            this.setState({
                hasErrors: true
            })
        }else{
            setTokens(this.props.User.auth, () =>{
                this.setState({
                    hasErrors: false
                })
                this.props.goNext();
            });
        }
    }

    submitUser = () => {
        let isFormValid = true;
        let formToSubmit = {};
        const formCopy = this.state.form;

        for(let key in formCopy){
            if(this.state.type === 'Login'){
                // Login
                if(key !== 'confirmPassword'){
                    isFormValid = isFormValid && formCopy[key].valid;
                    formToSubmit[key] = formCopy[key].value;
                }
            }else{
                // Register
                isFormValid = isFormValid && formCopy[key].valid;
                formToSubmit[key] = formCopy[key].value;
            }
        }

        if(isFormValid){
            if(this.state.type === 'Login'){
                this.props.signIn(formToSubmit).then(() => {
                    this.manageAccess();
                });
            }else{
                this.props.signUp(formToSubmit).then(() => {
                    this.manageAccess();
                });
            }
        }else{
            this.setState({
                hasErrors: true
            })
        }
    }
  
    render(){
        return (
            <View style={style.container}>
                <Input
                    placeholder='Enter Email'
                    placeholderTextColor='#008BFF'
                    type={this.state.form.email.type}
                    value={this.state.form.email.value}
                    autoCapitalize={'none'}
                    keyboardType={'email-address'}
                    onChangeText={value => this.updateInput('email', value)}
                    // overrideStyle={{}}
                />
                <Input
                    placeholder='Enter Password'
                    placeholderTextColor='#008BFF'
                    type={this.state.form.password.type}
                    value={this.state.form.password.value}
                    onChangeText={value => this.updateInput('password', value)}
                    secureTextEntry
                    // overrideStyle={{}}
                />

                {this.confirmPassword()}
                {this.formHasErrors()}

                <View style={{marginTop: 20}}>
                    <View style={style.button}>
                        <Button
                            title={this.state.action}
                            onPress={this.submitUser}
                        />
                    </View>
                    <View style={style.actionMode}>
                        <Button
                            title={this.state.actionMode}
                            onPress={this.changeFormType}
                        />
                    </View>
                    <View style={style.actionMode}>
                        <Button
                            title="I'll do it later"
                            onPress={() => this.props.goNext()}
                        />
                    </View>
                </View>

            </View>
        )
    }
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  loading:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  
  },
  errorContainer:{
      marginBottom: 10,
      marginTop: 30,
      padding: 10,
      backgroundColor:'#f44336'
  },
  errorLabel:{
      color:'#fff',
      textAlign:'center',
      textAlignVertical:'center'
  },
  button:{
      ...Platform.select({
          ios:{
              marginBottom:0,
              borderRadius:10,
              borderWidth: 1,
              borderColor: '#008BFF'
          },
          android:{
              marginBottom: 10,
              marginTop: 10,
              borderRadius:10,
              borderWidth: 1,
              borderColor: '#008BFF'
          }
      })    
  },
  actionMode:{
    ...Platform.select({
        ios:{
            marginTop:10,
            marginBottom:0,
            borderRadius:10
        },
        android:{
            marginBottom: 10,
            marginTop: 10
        }
    })    
  }
});

function mapStateToProps(state){
    console.log(state);
    return {
        User: state.User
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({signIn, signUp}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthFormComponent);