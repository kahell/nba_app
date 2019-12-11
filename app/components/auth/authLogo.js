import React, {Component} from 'react';
import {View, Image, StyleSheet} from 'react-native';

import LogoImage from '../../assets/images/nba_login_logo.png';

class LogoComponent extends Component {
    render(){
        return(
            <View style={style.container}>
                <Image
                    source={LogoImage}
                    resizeMode='contain'
                    style={{
                        width: 270,
                        height: 150,
                    }}
                />
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default LogoComponent;
