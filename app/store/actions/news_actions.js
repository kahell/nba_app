import {
    GET_NEWS
} from '../types';
import axios from 'axios';
import {FIREBASEURL} from '../../components/utils/misc';

export function getNews(){
    const request = axios({
        method:'GET',
        url: `${FIREBASEURL}/news.json`
    }).then(response => {
        const articles = [];

        for (key in response.data){
            articles.push({
                ...response.data[key],
                id:key
            });
        }

        return articles;
    }).catch(e => {
        return false
    })
    return{
        type:GET_NEWS,
        payload:request
    }
}