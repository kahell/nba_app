import axios from 'axios';
import {
    SIGN_IN,
    SIGN_UP,
    AUTO_SIGN_IN
} from '../types';
import { SIGNIN, SIGNUP, FIREBASEURL, REFRESH} from '../../components/utils/misc';

export function signUp(data){

    const request = axios({
        method: 'POST',
        url: SIGNUP,
        data:{
            email: data.email,
            password: data.password,
            returnSecureToken: true,
        },
        header:{
            "Content-Type":"application/json"
        }
    }).then(response => {
        console.log(response.data);
        return response.data;
    }).catch(e =>{
        return false;
    });

    return {
        type: SIGN_UP,
        payload: request
    }
}

export function signIn(data){
    const request = axios({
        method: 'POST',
        url: SIGNIN,
        data:{
            email: data.email,
            password: data.password,
            returnSecureToken: true,
        },
        header:{
            "Content-Type":"application/json"
        }
    }).then(response => {
        console.log(response.data);
        return response.data;
    }).catch(e =>{
        return false;
    });

    return {
        type: SIGN_IN,
        payload: request
    }
}

export const autoSignIn = (refToken) => {

    const request = axios({
        method: 'POST',
        url: REFRESH,
        data:"grant_type=refresh_token&refresh_token="+refToken,
        header:{
            "Content-Type":"application/x-www-form-urlencoded"
        }
    }).then(response => {
        console.log(response.data);
        return response.data;
    }).catch(e =>{
        return false;
    });

    return {
        type: AUTO_SIGN_IN,
        payload: request
    }
}