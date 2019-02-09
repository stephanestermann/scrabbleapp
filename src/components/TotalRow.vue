<template>
  <div class="rTableFoot">
    <div class="rTableCell">Total</div>
    <div class="rTableCell">{{getBetragSpieler(1)}}</div>
    <div class="rTableCell">{{getBetragSpieler(2)}}</div>        
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
      let total = 0;
      for (let index = 0; index < this.scrabbleZuege.length; index++) {
        const doppelzug = this.scrabbleZuege[index];
        if (typeof doppelzug[num_spieler-1] !== undefined) {
          total += parseInt(doppelzug[num_spieler-1].totalPunkteZug);
        }
      }
      return total;
    } 
  }   
};
</script>  