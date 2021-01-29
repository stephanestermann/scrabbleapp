<template>
  <div>
    <md-list>
      <md-list-item>
        <md-button @click="downloadDb()" class="md-icon-button">
          <md-icon>cloud_download</md-icon>
        </md-button>    
        <span class="md-list-item-text">Download DB</span>
      </md-list-item>

      <md-list-item>
        <md-button @click="backupDb()" class="md-icon-button">
          <md-icon>cloud_upload</md-icon>
        </md-button>    
        <span class="md-list-item-text">Backup DB</span>
      </md-list-item>
    </md-list>
</div>    
</template>

<script>

import AdminService from '@/api/administrationService.js'
import moment from 'moment'

const adminServiceInstance = new AdminService();
const DATE_FORMAT = 'YYYY-MM-DD_HH:mm:ss'

export default {
  name: "Administration",
  components: {},  
  props: {},
  data: function() {
    return {};
  },
  watch: {},
  computed: {
    getDbName() {
      return 'scrabble-db_' + moment().format(DATE_FORMAT) + '.db'
    }
  },
  methods: {
    downloadDb() {
      this.$store.commit('resetStatusInfos', undefined)
      this.$store.commit('setLastActionWithLoading', 'Datenbank wird heruntergeladen...')
      adminServiceInstance.downloadDb().then((response) => {
        const fileURL = window.URL.createObjectURL(new Blob([response.data]));
        let fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', this.getDbName);
        document.body.appendChild(fileLink);
        fileLink.click();
        this.$store.commit('setLastActionStopLoading', 'Datenbank erfolgreich heruntergeladen!')
      }).catch(err => {
        this.$store.commit('setServerErrorStopLoading', 'Datenbank herunterladen fehlgeschlagen! (' + err + ')')
      })   
    },
    backupDb() {
      this.$store.commit('resetStatusInfos', undefined)
      this.$store.commit('setLastActionWithLoading', 'Datenbank wird gesichert...')
      adminServiceInstance.backupDb().then(() => {
        this.$store.commit('setLastActionStopLoading', 'Datenbank erfolgreich gesichert!')
      }).catch(err => {
        this.$store.commit('setServerErrorStopLoading', 'Datenbank konnte nicht gesichert werden! (' + err + ')')
      })   
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
