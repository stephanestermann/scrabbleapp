<template>
  <div>
    <AnsichtsSwitch class="ansichtsAuswahl" :aktAnsicht="aktAnsicht" @changed="onAnsichtChange" />
    <md-table v-model="results" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Gesamtstatistik</h1>
      </md-table-toolbar>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-head>{{ item.label }}</md-table-head>
        <md-table-head v-if="item.label === 'Name'">{{ item.valueOne }}</md-table-head>
        <md-table-cell v-else>{{ item.valueOne }}</md-table-cell>
        <md-table-head v-if="item.label === 'Name'">{{ item.valueTwo }}</md-table-head>
        <md-table-cell v-else>{{ item.valueTwo }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>    
</template>

<script>
import AnsichtsSwitch from '@/components/Statistik/AnsichtsSwitch.vue';
import ResultService from '@/resultService.js'

const resultServiceInstance = new ResultService();

export default {
  name: "ZugCells",
  components: {
    AnsichtsSwitch
  },  
  props: {
    anzInTable: {
        type: Number,
        default: 0
    },
    resultForMonth: {
        type: Array,
        default: function () { return [] }      
    }
  },
  data: function() {
    return {
      aktAnsicht: 1,
      results: [],
      fault: undefined
    };
  },
  methods: {
    getPunkteProZugString(scrabbleZug) {
      let result='Punkte:'+scrabbleZug.punkteZug.toString();
      if(scrabbleZug.bingo){
        result=result+' + Bingo:50'
      }
      if(scrabbleZug.hatAngezweifelt){
        result='(Z) | '+result;
        if(scrabbleZug.hatKorrektAngezweifelt==0){
          result=result+' -10';
        }
      }
      return result;
    },
    onAnsichtChange(aktAnsicht){
      const vm = this
      this.aktAnsicht=aktAnsicht;
      if(aktAnsicht===2){
        resultServiceInstance.loadAllresults().then(res => {
          vm.results = res;
        }).catch(err => {
          vm.fault = err
        })
      }
    }
  }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-table .md-table-cell .md-table-cell-container .md-table-head-label{
  padding-right: 0px;
  padding-left: 0px;
}
</style>
