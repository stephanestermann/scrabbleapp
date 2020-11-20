import axios from 'axios';
import {ResultStatistic} from '@/models/resultStatistic.js';

const SERVER_DOMAIN = process.env.VUE_APP_SERVERDOMAIN;
const POST_REQUEST = SERVER_DOMAIN + 'api/result/'
const GET_ALL_REQUEST = SERVER_DOMAIN + 'api/results/'

export default class ResultService {

    async loadAllresults() {
        const response = await axios.get(GET_ALL_REQUEST); //.then(response => {
        const data = await response.data;

        let resultAnica = new ResultStatistic(1);
        resultAnica.addStatistikResponse(data.data);
        let resultSteph = new ResultStatistic(2);
        resultSteph.addStatistikResponse(data.data);
        const res = resultAnica.createStatistikTableWithHeaderOnTheLeftForTwoPlayers(resultSteph);

        return res;
    }

    saveGame(scrabbleResult) {
        axios.post(POST_REQUEST, scrabbleResult);
    }
  
}