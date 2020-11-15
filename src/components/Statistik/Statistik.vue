<template>
  <div>
    <AnsichtsSwitch class="ansichtsAuswahl" :aktAnsicht="aktAnsicht" @changed="onAnsichtChange" />

    <div class="rTable">
      <div class="rTableHeading">
        <div class="rTableHead"><strong>Spieldatum</strong></div>
        <div class="rTableHead"><strong>Anica</strong></div>
        <div class="rTableHead"><strong>Steph</strong></div>
      </div>
      {{resultForMonth}}
      <!-- <div class="rTableRow" v-for="n in resultForMonth.length/2">
        <div class="rTableCell">{{resultForMonth[n*2-2].game_date}}</div>
        <div class="rTableCell">Punkte:{{resultForMonth[n*2-2].points}}<br />Bingos:{{resultForMonth[n*2-2].number_bingos}}</div>
        <div class="rTableCell">Punkte:{{resultForMonth[n*2-1].points}}<br />Bingos:{{resultForMonth[n*2-1].number_bingos}}</div>
      </div> -->
    </div> 
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
        default: 0,
    },
    resultForMonth: {
        type: Array,
        default: function () { return [] }      
    }
  },
  data: function() {
    return {
      aktAnsicht: 1
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
      this.aktAnsicht=aktAnsicht;
      if(aktAnsicht===2){
        resultServiceInstance.loadAllresults()
      }
    }
  }  
}
</script>
