<template>
  <div class="rTableFoot">
    <div class="rTableCell">Total</div>
    <div class="rTableCell">
      <div>Punkte: {{getBetragSpieler(1)[0]}}</div>
      <div v-if="(getBetragSpieler(1)[1]>0)" >Anzahl Bingos: {{getBetragSpieler(1)[1]}}</div>
      <div v-if="(getBetragSpieler(1)[2]>0)" >Anzahl angezweifelt: {{getBetragSpieler(1)[2]}}</div>
      <div v-if="(getBetragSpieler(1)[3]>0)" >Davon falsch angezweifelt:  {{getBetragSpieler(1)[3]}}</div>      
    </div>
    <div class="rTableCell">
      <div>Punkte: {{getBetragSpieler(2)[0]}}</div>
      <div v-if="(getBetragSpieler(2)[1]>0)" >Anzahl Bingos: {{getBetragSpieler(2)[1]}}</div>
      <div v-if="(getBetragSpieler(2)[2]>0)" >Anzahl angezweifelt:{{getBetragSpieler(2)[2]}}</div>
      <div v-if="(getBetragSpieler(2)[3]>0)" >Davon falsch angezweifelt: {{getBetragSpieler(2)[3]}}</div>      
    </div>        
  </div>
</template>

<script>
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
      let total=[];
      total[0]=0;
      total[1]=0;
      total[2]=0;      
      total[3]=0;            
      for (let index = 0; index < this.scrabbleZuege.length; index++) {
        const doppelzug = this.scrabbleZuege[index];
        if (typeof doppelzug[num_spieler-1] !== undefined) {
          total[0] += parseInt(doppelzug[num_spieler-1].totalPunkteZug);
          if(doppelzug[num_spieler-1].bingo){
            total[1]++;
          }
          if(doppelzug[num_spieler-1].hatAngezweifelt){
            total[2]++;
            if(doppelzug[num_spieler-1].hatKorrektAngezweifelt==0){
              total[3]++;
            }
          }
        }
      }
      return total;
    } 
  }   
};
</script>  