<template>
  <div class="page-container">
    <div class="inner-toolbar">
      <form v-if="!spielGeschlossen" v-on:submit.prevent="addNewScrabblezug">
        <EingabeTitel :spielzug="spielzug" @changed="onBeginnChange" />
        <div class="inputArea">
          <div>
            <label>Wortpunkte für diesen Zug: <input v-model="zug.punkteZug" maxlength="3" /></label>
            <br />
            <label>Bingo: <input type="checkbox" v-model="zug.bingo" /></label>
            <label>&nbsp;&nbsp;Gegner hat angezweifelt: <input type="checkbox" v-model="zug.hatAngezweifelt" /></label>
            <label>&nbsp;&nbsp;Spiel beendet: <input type="checkbox" v-model="zug.hatSpielBeendet" /></label>
          </div>    
          <div v-if="zug.hatAngezweifelt">
            <label>Wort korrekt <input type="radio" id="Wort korrekt" value=0 v-model="zug.angezweifeltKorrekt" /></label>
            &nbsp;&nbsp;
            <label>Wort falsch <input type="radio" id="Wort falsch" value=1 v-model="zug.angezweifeltKorrekt" /></label>
          </div>
          <div v-if="zug.hatSpielBeendet">
            <label>Restpunkte Gegner: <input v-model="zug.restpunkteGegner" maxlength="2"/></label>
          </div>
          <br />
          <button type="submit" v-if="(beginnEins || beginnZwei)">Scrabblezug eingeben</button>
          <br /><br />
        </div>    
      </form>
      <div>
        <md-dialog-confirm
          :md-active.sync="saveConfirm"
          md-title="Spiel wirklich beenden?"
          md-content="Willst Du das Spiel wirklich beenden und es in die Datenbank schreiben?<br>Das Spiel kann danach nicht wieder aufgenommen werden."
          md-confirm-text="Ja"
          md-cancel-text="Nein"
          @md-cancel="onNoEnd"
          @md-confirm="onYesEnd"
        />
      </div>
    </div>
    <md-content class="md-scrollbar">
      <TableZuege :scrabbleZuege="scrabbleZuege" :spielGeschlossen="spielGeschlossen"/>
    </md-content>
  </div>
</template>

<script>
import EingabeTitel from './EingabeTitel.vue';
import TableZuege from './TableZuege/TableZuege.vue';
import * as UebersichtsCalculator from './UebersichtsCalculator.js';
import * as TotalCalculator from './TableZuege/TotalCalculator.js';

export default {
  name: "UebersichtsBereich",
  components: {
    EingabeTitel, TableZuege
  },
  data: function() {
    return {
      spielzug: 1,
      beginnEins: false,
      beginnZwei: false,
      scrabbleZuege: [],
      lastZug: [],
      spielGeschlossen: false,
      zug: { 
        totalPunkteZug: 0,
        punktezug: "",
        bingo: false,
        hatAngezweifelt: false, 
        angezweifeltKorrekt: 0,
        hatSpielBeendet: false,
        restpunkteGegner: 0
      },
      tableBottomWithTitelAndTotal: 0,
      anzInTable: 0,
      serverDomain: process.env.VUE_APP_SERVERDOMAIN,
      saveConfirm: false
    };
  },
  mounted: function () {
    window.addEventListener("resize", () => this.handleResize());
  },
  destroyed: function () {
    document.removeEventListener("resize",  () => this.handleResize());
  },
  methods: {
    onBeginnChange(beginner){
      this.beginnEins=(beginner==1);
      this.beginnZwei=(!this.beginnEins);
    },
    saveGame(){
      const totalAnica=TotalCalculator.getBetragProSpieler(1, this.scrabbleZuege);
      const totalSteph=TotalCalculator.getBetragProSpieler(2, this.scrabbleZuege);      
      const scrabbleResult = {
        scrabbler_ids: [1,2],
        beginner: [this.beginnEins, this.beginnZwei],
        points: [totalAnica[0], totalSteph[0]],
        won: [totalAnica[0]>totalSteph[0], totalSteph[0]>totalAnica[0]],
        number_bingos: [totalAnica[1], totalSteph[1]],
        number_doubtes: [totalAnica[2], totalSteph[2]],
        number_wrong_doubtes: [totalAnica[3], totalSteph[3]],
        number_correct_doubtes: [totalAnica[2]-totalAnica[3], totalSteph[2]-totalSteph[3]],
        game_ended: [totalAnica[4], totalSteph[4]],
        left_points: [totalAnica[5], totalSteph[5]],
        largestBingoScore: [totalAnica[7], totalSteph[7]],
        largestNonBingoScore: [totalAnica[8], totalSteph[8]],
      }
      this.$store.dispatch('results/saveGame', scrabbleResult).then(() => {
        
      })
    },
    addNewScrabblezug() {
      // Validierung ob etwas drin steht
      const eingabePunkteZug=this.zug.punkteZug;
      if (eingabePunkteZug === "" || eingabePunkteZug.length === 0 || eingabePunkteZug === null || isNaN(eingabePunkteZug) ||
          (this.beginnEins === false && this.beginnZwei === false)) {
        return;
      }
      if (this.showEndingConfirm() && !this.spielGeschlossen) {
        return;
      }
      // Die Daten zum eben gespielten Zug übernehmen
      let newScrabblezug = {
        punkteZug: eingabePunkteZug,
        bingo: this.zug.bingo,
        hatAngezweifelt: false,
        hatKorrektAngezweifelt: 0,
        hatSpielBeendet: this.zug.hatSpielBeendet,
        restpunkte: 0,
        bonusPunkte: this.zug.restpunkteGegner
      };
      if (this.spielzug % 2 == 0) {
        // Der letzte gemerkte Zug von vorher
        let oldScrabblezug = {
          punkteZug: this.lastZug.punkteZug,
          bingo: this.lastZug.bingo,
          hatAngezweifelt: this.zug.hatAngezweifelt,
          hatKorrektAngezweifelt: this.zug.angezweifeltKorrekt,
          hatSpielBeendet: false,
          restpunkte: -(this.zug.restpunkteGegner),
          bonusPunkte: 0
        };
        newScrabblezug.hatAngezweifelt=this.lastZug.gegnerHatAngezweifelt;
        newScrabblezug.hatKorrektAngezweifelt=this.lastZug.gegnerHatKorrektAngezweifelt;
        let dpZugZwei = UebersichtsCalculator.getDoppelzugZuBeginner(this.beginnEins, oldScrabblezug, newScrabblezug);
        this.scrabbleZuege = this.scrabbleZuege.slice(
          0,
          this.scrabbleZuege.length - 1
        );
        UebersichtsCalculator.calcDoppelzugTotal(dpZugZwei);        
        this.scrabbleZuege.push(dpZugZwei);
      } else {
        // Vorbereiteter Zug des nachfolgenden Spielers
        let emptyScrabblezug = {
          punkteZug: 0,
          bingo: false,
          hatAngezweifelt: this.zug.hatAngezweifelt, 
          hatKorrektAngezweifelt: this.zug.angezweifeltKorrekt,
          hatSpielBeendet: false,
          restpunkte: -(this.zug.restpunkteGegner),
          bonusPunkte: 0
        };
        let dpZugEins=UebersichtsCalculator.getDoppelzugZuBeginner(this.beginnEins, newScrabblezug, emptyScrabblezug);
        UebersichtsCalculator.calcDoppelzugTotal(dpZugEins);
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
      if (this.spielGeschlossen) {
        this.saveGame()
      }
    },
    handleResize(){
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
    },
    showEndingConfirm() {
      if (this.zug.hatSpielBeendet) {
        this.saveConfirm = true;
        return true;
      }
      return false;
    },
    onYesEnd () {
     this.spielGeschlossen = this.zug.hatSpielBeendet;
     this.addNewScrabblezug();
    },
    onNoEnd () {
      // Nothing to do...
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-content {
  /* FixMe: Calculate dynamic */
  max-height: calc(100vh - 316px);
  height: calc(100vh - 316px);
  overflow: auto;
}
.inner-toolbar {
  margin-top: 10px;
  width: 100%;
}
.inputArea{
  display: block;
  margin-left: auto;
  margin-right: auto;
	width: 50%;
  text-align: center
}
.ansichtsAuswahl{
  display: block;
  margin-left: auto;
  margin-right: auto;
	width: 50%;
  text-align: right
}

</style>
