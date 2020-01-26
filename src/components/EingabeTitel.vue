<template>
<div class="eingabeTitel">
  <label class="nameLabel" v-if="spielzug<=1">Beginn Anica</label>
  <label class="nameLabel" v-else-if="getIsSpielerAmZug(1)">Anica's Zug</label>
  <input type="radio" id="Anica" value=1 v-if="spielzug==1" v-model="beginner" v-on:change="onBeginnChange"/>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <label class="nameLabel" v-if="spielzug<=1">Beginn Steph</label>
  <label class="nameLabel" v-else-if="getIsSpielerAmZug(2)">Steph's Zug</label>    
  <input type="radio" id="Steph" value=2 v-if="spielzug==1" v-model="beginner" v-on:change="onBeginnChange"/>
  <br /><br />  			
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
    onBeginnChange() {
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

<style>
.eingabeTitel {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.nameLabel {
  text-decoration: underline;
  font-weight: bold;
  font-size: x-large;
}
</style>