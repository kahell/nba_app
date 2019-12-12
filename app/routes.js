import React, {Component} from 'react';
import {View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
import ArticleNewsComponent from './components/news/article';
import ArticleGamesComponent from './components/games/article';

import LogoTitle from './components/utils/logo';

const headerConf = {
    headerLayoutPreset:'center',
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:'white'
        },
        headerTintColor: '#008BFF',
        headerTitle: LogoTitle
    }
}

const NewStack = createStackNavigator({
    News:NewsComponent,
    Article:ArticleNewsComponent
}, headerConf);

const GameStack = createStackNavigator({
    Games:GamesComponent,
    Article:ArticleGamesComponent
}, headerConf);

const AppStack = createBottomTabNavigator({
    News:NewStack,
    Games:GameStack
},{
    tabBarOptions:{
        activeTintColor:'#008BFF',
        showLabel:false,
        activeBackgroundColor:'white',
        inactiveBackgroundColor:'white',
        style:{
            color:'#393e46'
        }
    },
    initialRouteName: 'News',
    defaultNavigationOptions:({navigation}) => ({
        tabBarIcon:({focused, horizontal, tintColor})=>{
            const { routeName } = navigation.state;
            let iconName;
            if(routeName === 'News'){
                iconName = 'ios-basketball';
            }else if(routeName === 'Games'){
                iconName = 'md-tv';
            }

            return <Ionicons name={iconName} size={25} color={tintColor}/>

        }
    })
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