import React from 'react';
import {StyleSheet, Text, View, Picker} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const Input = (props) => {
    let template = null;

    switch(props.type){
        case "textinput":
            template =
            <TextInput
                {...props}
                style={[style.input, props.overrideStyle]}
            />
        break;
        default:
            return template;
    }

    return template;

}

const style = StyleSheet.create({
    input:{
        width: '100%',
        borderBottomWidth: 2,
        borderBottomColor:'#008BFF',
        fontSize:16,
        padding: 5,
        margin: 10,
    }
});

export default Input;