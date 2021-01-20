import axios from 'axios';
import {ResultStatistic} from '@/models/resultStatistic.js';

const SERVER_DOMAIN = process.env.VUE_APP_SERVERDOMAIN;
const POST_REQUEST = SERVER_DOMAIN + 'api/result/'
// const GET_ALL_REQUEST = SERVER_DOMAIN + 'api/results/'
const GET_ALL_SUMMARIZED_REQUEST = SERVER_DOMAIN + 'api/results/summarized'

export default class ResultService {

    async loadAllresults(paras) {
        const params = {
            params: paras
        }
        const response = await axios.get(GET_ALL_SUMMARIZED_REQUEST, params);
        const data = await response.data;

        let resultAnica = new ResultStatistic(1);
        resultAnica.addStatistikResponse(data.data);
        let resultSteph = new ResultStatistic(2);
        resultSteph.addStatistikResponse(data.data);
        const res = resultAnica.createStatistikTableWithHeaderOnTheLeftForTwoPlayers(resultSteph);

        return res;
    }

    async saveGame(scrabbleResult) {
        return axios.post(POST_REQUEST, scrabbleResult);
    }
  
}