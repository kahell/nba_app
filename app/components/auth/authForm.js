import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, ActivityIndicator} from 'react-native';

import Input from '../utils/forms/input';

class AuthFormComponent extends Component{

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
  }
});
export default AuthFormComponent;