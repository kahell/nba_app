import {
    GET_GAMES
} from '../types';
import axios from 'axios';
import {FIREBASEURL, convertFirebase, findTeamData} from '../../components/utils/misc';

export function getGames(){

    const promise = new Promise((resolve, reject) => {

        const request = axios({
            method:'GET',
            url:`${FIREBASEURL}/teams.json`
        }).then(response => {
            const teams = convertFirebase(response.data);

            axios({
                method:'GET',
                url:`${FIREBASEURL}/games.json`
            }).then(response => {
                const articles = convertFirebase(response.data);
                const responseData = [];

                for (let key in articles){
                    responseData.push({
                        ...articles[key],
                        awayData: findTeamData(articles[key].away,teams),
                        localData: findTeamData(articles[key].local,teams),
                    })
                }

                resolve(responseData);
            }).catch(e => {
                reject(false);
            })
        })
    });

    return {
        type: GET_GAMES,
        payload:promise
    }

}