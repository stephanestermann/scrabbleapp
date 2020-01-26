<template>
  <div class="rTableFoot">
    <div class="rTableCell">Total</div>
    <div class="rTableCell">
      <div>Punkte: {{getBetragSpieler(1)[0]}}</div>
      <div v-if="(getBetragSpieler(1)[1]>0)" >Anzahl Bingos: {{getBetragSpieler(1)[1]}}</div>
      <div v-if="(getBetragSpieler(1)[2]>0)" >Anzahl angezweifelt: {{getBetragSpieler(1)[2]}}</div>
      <div v-if="(getBetragSpieler(1)[3]>0)" >Davon falsch angezweifelt: {{getBetragSpieler(1)[3]}}</div>      
    </div>
    <div class="rTableCell">
      <div>Punkte: {{getBetragSpieler(2)[0]}}</div>
      <div v-if="(getBetragSpieler(2)[1]>0)" >Anzahl Bingos: {{getBetragSpieler(2)[1]}}</div>
      <div v-if="(getBetragSpieler(2)[2]>0)" >Anzahl angezweifelt: {{getBetragSpieler(2)[2]}}</div>
      <div v-if="(getBetragSpieler(2)[3]>0)" >Davon falsch angezweifelt: {{getBetragSpieler(2)[3]}}</div>      
    </div>        
  </div>
</template>

<script>
import * as TotalCalculator from './TotalCalculator.js';

export default {
  name: "TotalRow",
  props: {
    scrabbleZuege: {
        type: Array,
        default: function () { return [] }
    }
  },
  methods: {
    getBetragSpieler(num_spieler) {
      return TotalCalculator.getBetragProSpieler(num_spieler, this.scrabbleZuege);
    } 
  }   
};
</script>  