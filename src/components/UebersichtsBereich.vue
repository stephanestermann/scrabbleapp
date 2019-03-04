<template>
<div class="uebersicht">
  <form v-on:submit.prevent="addNewScrabblezug">
    <EingabeTitel :spielzug="spielzug" @changed="onBeginnChange" />
    <div class="inputArea">
    <div>
    <label>Wortpunkte für diesen Zug: <input v-model="zug.punkteZug" /></label>
    <br />
    <label>Bingo: <input type="checkbox" v-model="zug.bingo" /></label>
    <label>&nbsp&nbsp Gegner hat angezweifelt: <input type="checkbox" v-model="zug.hatAngezweifelt" /></label>
    </div>    
    <div v-if="zug.hatAngezweifelt">
      <label>Wort korrekt <input type="radio" id="Wort korrekt" value=0 v-model="zug.angezweifeltKorrekt" /></label>
      &nbsp&nbsp
      <label>Wort falsch <input type="radio" id="Wort falsch" value=1 v-model="zug.angezweifeltKorrekt" /></label>
    </div>
    <br />
    <button type="submit" v-if="(beginnEins || beginnZwei)">Scrabblezug eingeben</button><br /><br />
    </div>    
  </form>
  <TableZuege :scrabbleZuege="scrabbleZuege" />     
</div>
</template>

<script>
import EingabeTitel from './EingabeTitel.vue'
import TableZuege from './TableZuege/TableZuege.vue'

export default {
  name: "UebersichtsBereich",
  data: function() {
    return {
      spielzug: 1,
      beginnEins: false,
      beginnZwei: false,
      scrabbleZuege: [],
      lastZug: [],
      zug: { 
        totalPunkteZug: 0,
        punktezug: "",
        bingo: false,
        hatAngezweifelt: false, 
        angezweifeltKorrekt: 0
      },
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
      const eingabePunkteZug=this.zug.punkteZug;
      if (eingabePunkteZug == "" || eingabePunkteZug.length == 0 || eingabePunkteZug == null || isNaN(eingabePunkteZug)) {
        return;
      }  
      let newScrabblezug = {
        punkteZug: eingabePunkteZug,
        bingo: this.zug.bingo,
        hatAngezweifelt: false,
        hatKorrektAngezweifelt: 0
      };
      if (this.spielzug % 2 == 0) {
        let oldScrabblezug = {
          punkteZug: this.lastZug.punkteZug,
          bingo: this.lastZug.bingo,
          hatAngezweifelt: this.zug.hatAngezweifelt,
          hatKorrektAngezweifelt: this.zug.angezweifeltKorrekt
        };
        newScrabblezug.hatAngezweifelt=this.lastZug.gegnerHatAngezweifelt;
        newScrabblezug.hatKorrektAngezweifelt=this.lastZug.gegnerHatKorrektAngezweifelt;
        let dpZugZwei = getDoppelzugZuBeginner(this.beginnEins, oldScrabblezug, newScrabblezug);
        this.scrabbleZuege = this.scrabbleZuege.slice(
          0,
          this.scrabbleZuege.length - 1
        );
        calcDoppelzugTotal(dpZugZwei);        
        this.scrabbleZuege.push(dpZugZwei);
      } else {
        let emptyScrabblezug = {
          punkteZug: 0,
          bingo: false,
          hatAngezweifelt: this.zug.hatAngezweifelt, 
          hatKorrektAngezweifelt: this.zug.angezweifeltKorrekt          
        };
        let dpZugEins=getDoppelzugZuBeginner(this.beginnEins, newScrabblezug, emptyScrabblezug);
        calcDoppelzugTotal(dpZugEins);
        this.scrabbleZuege.push(dpZugEins);
      }
      this.lastZug.punkteZug = newScrabblezug.punkteZug;
      this.lastZug.bingo = newScrabblezug.bingo;
      this.lastZug.gegnerHatAngezweifelt = this.zug.hatAngezweifelt;
      this.lastZug.gegnerHatKorrektAngezweifelt = this.zug.angezweifeltKorrekt;

      // Reset Eingabebereich
      this.zug.punkteZug = '';
      this.zug.bingo = false;
      this.zug.hatAngezweifelt = false;      
      this.spielzug++;
      this.calcAnzInTableSichtbar();
    },
    handleResize(){
      console.log("resize");
      this.anzInTable=0;
      this.calcAnzInTableSichtbar();
    },
    calcAnzInTableSichtbar() {
      this.anzInTable=0;
      // this.tableBottomWithTitelAndTotal=this.$refs.tableZuege.getBoundingClientRect().top+42;
      // const windowInnerHeight=window.innerHeight;
      // const freeHeightForZuegeRows=windowInnerHeight-this.tableBottomWithTitelAndTotal;
      // if(freeHeightForZuegeRows<this.scrabbleZuege.length*21){
      //   this.anzInTable=Math.floor(freeHeightForZuegeRows/21)-1;
      //   if(this.anzInTable<=0){
      //     this.anzInTable=1;
      //   }
      // }
    }
},
  components: {
    EingabeTitel, TableZuege
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
function calcDoppelzugTotal(doppelzug) {
  calcEinzelzugTotal(doppelzug[0]);
  calcEinzelzugTotal(doppelzug[1]);  
}
function calcEinzelzugTotal(einzelzug) {
  let zugTotal=parseInt(einzelzug.punkteZug);
  if(einzelzug.bingo){
    zugTotal+=50;
  }
  if(einzelzug.hatAngezweifelt&&einzelzug.hatKorrektAngezweifelt==0){
    zugTotal-=10;
  }
  einzelzug.totalPunkteZug=zugTotal;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.uebersicht{
  
}
.inputArea{
  display: block;
  margin-left: auto;
  margin-right: auto;
	width: 50%;
  text-align: left
}
</style>
