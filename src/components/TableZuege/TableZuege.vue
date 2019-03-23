<template>
  <div class="rTable">
    <TitelRow  />
    <div class="rTableRow" ref="tableZuege" v-if="anzInTable>0">
      <div class="rTableCell">...</div>
      <div class="rTableCell">...</div>
      <div class="rTableCell">...</div>
    </div>
    <div class="rTableRow" v-for="(items, index) in scrabbleZuege">
      <div class="rTableCell" v-if="anzInTable<=0 || index+1+anzInTable>scrabbleZuege.length">{{index+1}}</div>
      <div class="rTableCell" v-if="anzInTable<=0 || index+1+anzInTable>scrabbleZuege.length">{{getPunkteProZugString(items[0],items[1],1)}}</div>
      <div class="rTableCell" v-if="anzInTable<=0 || index+1+anzInTable>scrabbleZuege.length">{{getPunkteProZugString(items[1],items[0],2)}}</div>
    </div>
    <TotalRow :scrabbleZuege="scrabbleZuege" />
  </div> 
</template>

<script>
import TitelRow from "./TitelRow.vue";
import TotalRow from './TotalRow.vue'

export default {
  name: "ZugCells",
  props: {
    anzInTable: {
        type: Number,
        default: 0,
    },
    scrabbleZuege: {
        type: Array,
        default: function () { return [] }
    }
  },
  methods: {
    getPunkteProZugString(scrabbleZug, scrabbleZugGegner, spielerNr) {
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
      if(scrabbleZug.hatSpielBeendet){
        result='(Beendet) | '+result+' + '+scrabbleZug.bonusPunkte.toString();
      }
      if(scrabbleZug.restpunkte<0){
        result=result+' '+scrabbleZug.restpunkte.toString();
      }
      return result;
    }
  },
  components: {
    TitelRow, TotalRow
  }  
}
</script>
