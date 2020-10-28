import axios from 'axios';

const SERVER_DOMAIN = process.env.VUE_APP_SERVERDOMAIN;
const POST_REQUEST = SERVER_DOMAIN + 'api/result/'
const GET_ALL_REQUEST = SERVER_DOMAIN + 'api/results/'

export default class ResultService {

    loadAllresults() {
        axios.get(GET_ALL_REQUEST).then(response => {
            const res = response
            alert('OUTPUT: ' + res.data)
        })
    }

    saveGame(scrabbleResult) {
        axios.post(POST_REQUEST, scrabbleResult);
    }
  
}