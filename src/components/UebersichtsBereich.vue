<template>
<div class="uebersicht">
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
  <div class="saveGame" v-if="spielGeschlossen">
    <button v-on:click="saveGame">Spiel speichern !</button>
    <br /><br />
  </div>
  <AnsichtsSwitch class="ansichtsAuswahl" :aktAnsicht="aktAnsicht" @changed="onAnsichtChange" />
  <TableZuege v-if="aktAnsicht===1" :scrabbleZuege="scrabbleZuege" />     
  <TableMonths v-if="aktAnsicht===2" :resultForMonth="resultForMonth" />       
</div>
</template>

<script>
import AnsichtsSwitch from './AnsichtsSwitch.vue';
import EingabeTitel from './EingabeTitel.vue';
import TableZuege from './TableZuege/TableZuege.vue';
import TableMonths from './TableZuege/TableMonths.vue';
import * as UebersichtsCalculator from './UebersichtsCalculator.js';
import * as TotalCalculator from './TableZuege/TotalCalculator.js';

export default {
  name: "UebersichtsBereich",
  data: function() {
    return {
      spielzug: 1,
      aktAnsicht: 1,      
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
      resultForMonth: [],
      serverDomain: process.env.VUE_APP_SERVERDOMAIN
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
        points: [totalAnica[0], totalSteph[0]],
        won: [totalAnica[0]>totalSteph[0], totalSteph[0]>totalAnica[0]],
        number_bingos: [totalAnica[1], totalSteph[1]],
        number_doubtes: [totalAnica[2], totalSteph[2]],
        number_wrong_doubtes: [totalAnica[2]-totalAnica[3], totalSteph[2]-totalSteph[3]],
        number_correct_doubtes: [totalAnica[3], totalSteph[3]],
        game_ended: [totalAnica[4], totalSteph[4]],
        left_points: [totalAnica[5], totalSteph[5]]
      }
      this.$http.get(this.serverDomain).then(response => {
        const res = response
        alert('OUTPUT: ' + res.data.message + scrabbleResult.points)
      })
      // alert('url: ' + this.serverDomain + 'scrabbleResult')
      // this.$http.post(this.serverDomain + 'scrabbleResult', scrabbleResult);
    },
    onAnsichtChange(aktAnsicht){
      this.aktAnsicht=aktAnsicht;
      if(aktAnsicht===2){
        this.$http.get(this.serverDomain, {
          // params: {
          //   startDate:'01-12-2018',
          //   endDate:'31-12-2018'
          // },
        }).then(response => {
            this.resultForMonth=response.data;
        })
      }
    },
    addNewScrabblezug() {
      // Validierung ob etwas drin steht
      const eingabePunkteZug=this.zug.punkteZug;
      if (eingabePunkteZug == "" || eingabePunkteZug.length == 0 || eingabePunkteZug == null || isNaN(eingabePunkteZug)) {
        return;
      }  
      // Die Daten zum eben gespielten Zug übernehmen
      this.spielGeschlossen=this.zug.hatSpielBeendet;
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
    }
},
  components: {
    EingabeTitel, TableZuege, AnsichtsSwitch, TableMonths
  }
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
.ansichtsAuswahl{
  display: block;
  margin-left: auto;
  margin-right: auto;
	width: 50%;
  text-align: right
}

</style>
