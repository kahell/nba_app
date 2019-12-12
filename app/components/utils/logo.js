import React, {Component} from 'react';
import {Image} from 'react-native';

import LogoImage from '../../assets/images/nba_login_logo.png';

const LogoTitle = () => (
    <Image
        source={LogoImage}
        style={{height:35, width:70}}
        resizeMode="contain"
    />
)
export default LogoTitle;
