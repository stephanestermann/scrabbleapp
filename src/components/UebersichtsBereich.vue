<template>
<div class="uebersicht">
  <form v-on:submit.prevent="addNewScrabblezug">
    <EingabeTitel :spielzug="spielzug" @changed="onBeginnChange" />
    <label>Total Punkte für diesen Zug:<input v-model="zug.totalPunkteZug" /></label>
    <br />
    <label>Bingo?<input type="checkbox" v-model="zug.bingo" /></label>
    <label>Gegner hat angezweifelt:<input type="checkbox" v-model="zug.hatAngezweifelt" /></label>
    <div v-if="zug.hatAngezweifelt">
      <label>Wort korrekt<input type="radio" id="Wort korrekt" value=0 v-model="zug.angezweifeltKorrekt" v-on:change="onBeginnChange"/></label>
      <label>Wort falsch<input type="radio" id="Wort falsch" value=1 v-model="zug.angezweifeltKorrekt" v-on:change="onBeginnChange"/></label>
    </div>
    <br />
    <button type="submit" v-if="(beginnEins || beginnZwei)">Scrabblezug eingeben</button>
  </form>      
  <div class="rTable">
    <TitelRow  />
    <div class="rTableRow" ref="tableZuege" v-if="anzInTable>0">
      <div class="rTableCell">...</div>
      <div class="rTableCell">...</div>
      <div class="rTableCell">...</div>
    </div>
    <div class="rTableRow" v-for="(items, index) in scrabbleZuege">
      <div class="rTableCell" v-if="anzInTable<=0 || index+1+anzInTable>scrabbleZuege.length">{{index+1}}</div>
      <div class="rTableCell" v-if="anzInTable<=0 || index+1+anzInTable>scrabbleZuege.length">{{items[0].totalPunkteZug}}</div>
      <div class="rTableCell" v-if="anzInTable<=0 || index+1+anzInTable>scrabbleZuege.length">{{items[1].totalPunkteZug}}</div>
    </div>
  <TotalRow :scrabbleZuege="scrabbleZuege" />
  </div> 
</div>
</template>

<script>
import TitelRow from "./TitelRow.vue";
import EingabeTitel from './EingabeTitel.vue'
import TotalRow from './TotalRow.vue'

export default {
  name: "UebersichtsBereich",
  data: function() {
    return {
      spielzug: 1,
      beginnEins: false,
      beginnZwei: false,
      scrabbleZuege: [],
      hatAngezweifelt: false,
      angezweifeltKorrekt: 0,
      lastZug: [],
      zug: { totalPunkteZug: "", bingo: false },
      tableBottomWithTitelAndTotal: 0,
      anzInTable: 0
    };
  },
  mounted: function () {
    window.addEventListener("resize", () => this.handleResize());
    console.log("ADDDED");
  },
  destroyed: function () {
    document.removeEventListener("resize",  () => this.handleResize());
    console.log("REMOVED");
  },
  methods: {
    onBeginnChange(beginner){
      this.beginnEins=(beginner==1);
      this.beginnZwei=(!this.beginnEins);
    },
    addNewScrabblezug() {
      const eingabePunkteZug=this.zug.totalPunkteZug;
      if (eingabePunkteZug == "" || eingabePunkteZug.length == 0 || eingabePunkteZug == null || isNaN(eingabePunkteZug)) {
        return;
      }
      let newScrabblezug = {
        totalPunkteZug: eingabePunkteZug,
        bingo: this.zug.bingo
      };
      if (this.spielzug % 2 == 0) {
        let oldScrabblezug = {
          totalPunkteZug: this.lastZug.totalPunkteZug,
          bingo: this.lastZug.bingo
        };
        let dpZugZwei = getDoppelzugZuBeginner(this.beginnEins, oldScrabblezug, newScrabblezug);
        this.scrabbleZuege = this.scrabbleZuege.slice(
          0,
          this.scrabbleZuege.length - 1
        );
        this.scrabbleZuege.push(dpZugZwei);
      } else {
        let emptyScrabblezug = {
          totalPunkteZug: "0",
          bingo: "Nein"
        };
        let dpZugEins=getDoppelzugZuBeginner(this.beginnEins, newScrabblezug, emptyScrabblezug);
        this.scrabbleZuege.push(dpZugEins);
      }
      this.lastZug.totalPunkteZug = newScrabblezug.totalPunkteZug;
      this.lastZug.bingo = newScrabblezug.bingo;
      this.zug.totalPunkteZug = "";
      this.zug.bingo = "";
      this.spielzug++;
      this.calcAnzInTableSichtbar();
    },
    handleResize(){
      console.log("resize");
      this.anzInTable=0;
      this.calcAnzInTableSichtbar();
    },
    calcAnzInTableSichtbar() {
      this.tableBottomWithTitelAndTotal=this.$refs.tableZuege.getBoundingClientRect().top+42;
      const windowInnerHeight=window.innerHeight;
      const freeHeightForZuegeRows=windowInnerHeight-this.tableBottomWithTitelAndTotal;
      if(freeHeightForZuegeRows<this.scrabbleZuege.length*21){
        this.anzInTable=Math.floor(freeHeightForZuegeRows/21)-1;
        if(this.anzInTable<=0){
          this.anzInTable=1;
        }
      }
    }
  },
  components: {
    TitelRow, EingabeTitel, TotalRow
  }
};
function getDoppelzugZuBeginner(beginnEins,scrabbleZugEins,scrabbleZugZwei){
  let dpZugEins;
  if(beginnEins) {
    dpZugEins = [scrabbleZugEins, scrabbleZugZwei];
  } else {
    dpZugEins = [scrabbleZugZwei, scrabbleZugEins];
  }
  return dpZugEins;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
