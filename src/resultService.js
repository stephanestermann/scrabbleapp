import axios from 'axios';

const SERVER_DOMAIN = process.env.VUE_APP_SERVERDOMAIN;
const POST_REQUEST = SERVER_DOMAIN + 'api/result/'
const GET_ALL_REQUEST = SERVER_DOMAIN + 'api/results/'

export default class ResultService {

    async loadAllresults() {
        const response = await axios.get(GET_ALL_REQUEST); //.then(response => {
        const data = await response.data;
        
        return data;
    }

    saveGame(scrabbleResult) {
        axios.post(POST_REQUEST, scrabbleResult);
    }
  
}