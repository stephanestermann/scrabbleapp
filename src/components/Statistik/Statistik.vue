<template>
  <div>
    <AnsichtsSwitch class="ansichtsAuswahl" :aktAnsicht="aktAnsicht" @changed="onAnsichtChange" />
    <md-table v-model="results" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Gesamtstatistik</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.scrabblerId }}</md-table-cell>
        <md-table-cell md-label="Begonnen" md-sort-by="name">{{ item.beginner }}</md-table-cell>
        <md-table-cell md-label="Punkte" md-sort-by="email">{{ item.point }}</md-table-cell>
        <md-table-cell md-label="Gewonnen" md-sort-by="gender">{{ item.won }}</md-table-cell>
        <md-table-cell md-label="Bingos" md-sort-by="title">{{ item.numberBingos }}</md-table-cell>
        <md-table-cell md-label="Anzweiflungen" md-sort-by="title">{{ item.numberDoubtes }}</md-table-cell>
        <md-table-cell md-label="Falsch angezweifelt" md-sort-by="title">{{ item.numberWrongDoubtes }}</md-table-cell>
        <md-table-cell md-label="Korrekt angezweifelt" md-sort-by="title">{{ item.numberCorrectDoubtes }}</md-table-cell>
        <md-table-cell md-label="Spiel beendet" md-sort-by="title">{{ item.gameEnded }}</md-table-cell>
        <md-table-cell md-label="Restpunkte" md-sort-by="title">{{ item.leftPoints }}</md-table-cell>
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
          vm.results = res.data;
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
