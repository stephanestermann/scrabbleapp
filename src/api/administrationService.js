import axios from 'axios';

const SERVER_DOMAIN = process.env.VUE_APP_SERVERDOMAIN;
const GET_DB_DOWNLOAD = SERVER_DOMAIN + 'api/results/downloadDb'
const GET_DB_BACKUP = SERVER_DOMAIN + 'api/results/backupDb'

export default class AdministrationService {

    async downloadDb() {
        return axios.get(GET_DB_DOWNLOAD, {responseType: 'blob'});
    }

    async backupDb() {
        return axios.get(GET_DB_BACKUP);
    }
}