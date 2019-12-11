import React, {Component} from 'react';
import {View} from 'react-native';

import {
    createAppContainer,
    createSwitchNavigator
} from 'react-navigation';

import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

// Screens
import AuthComponent from './components/auth';
import NewsComponent from './components/news';
import GamesComponent from './components/games';

const AppStack = createBottomTabNavigator({
    News:NewsComponent,
    Games:GamesComponent
});

const AuthStack = createStackNavigator({
    SignIn: AuthComponent
},
{
    headerMode: 'none'
});

const AppContainer = createAppContainer(createSwitchNavigator({
    App:AppStack,
    Auth:AuthStack
},{
    initialRouteName: 'Auth'
}))
export const RootNavigator = () => (
    <View style={{flex:1}}>
        <AppContainer/>
    </View>
);