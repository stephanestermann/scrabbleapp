<template>
<div class="eingabeTitel">
  <label v-if="spielzug<=1">Beginn Anica</label>
  <label v-else-if="getIsSpielerAmZug(1)">Anica's Zug</label>

  <input type="radio" id="Anica" value=1 v-if="spielzug==1" v-model="beginner" v-on:change="onBeginnChange"/>

  <label v-if="spielzug<=1">Beginn Steph</label>
  <label v-else-if="getIsSpielerAmZug(2)">Steph's Zug</label>    

  <input type="radio" id="Steph" value=2 v-if="spielzug==1" v-model="beginner" v-on:change="onBeginnChange"/>
  <br>  			
</div>
</template>

<script>

export default {
  name: "EingabeTitel",
  props: {
      spielzug: Number
  },
  data: function() {
    return {
      beginner: 0,
    };
  },
  methods: {
    onBeginnChange(event) {
      this.$emit('changed', this.beginner);
    },
    getIsSpielerAmZug(spielerNummer) {
      if(this.beginner==1){
        if(spielerNummer==1){
          return this.spielzug%2!=0;  
        }
        return this.spielzug%2==0;
      }
      if(spielerNummer==2){
        return this.spielzug%2!=0;  
      }
      return this.spielzug%2==0;
    }
  }
};
</script>
