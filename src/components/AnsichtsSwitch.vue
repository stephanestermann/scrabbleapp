<template>
<div class="ansichtsSwitch">
  <label class="">Aktuelles Spiel</label>
  <input type="radio" id="spiel" value=1 v-model="ansicht" v-on:change="onAnsichtChange"/>
    &nbsp;
  <label class="">Monatsübersicht</label>&nbsp;
  <input type="radio" id="monat" value=2 v-model="ansicht" v-on:change="onAnsichtChange"/>
  <select v-model="selected">
    <option disabled value="">Anzuzeigenden Monat wählen</option>
    <option>Januar</option>
    <option>Februar</option>
    <option>März</option>
  </select>
  <br />
</div>
</template>

<script>

export default {
  name: "AnsichtsSwitch",
  props: {
      aktAnsicht: Number
  },
  data: function() {
    return {
      ansicht: 0,
      selected: ''
    };
  },
  mounted: function () {
    this.ansicht=this.aktAnsicht;
        console.log("Mounted ansicht");
  },  
  methods: {
    onAnsichtChange(event) {
        console.log("Ansicht changed");
      this.$emit('changed', parseInt(this.ansicht));
    }
  }
};
</script>

<style>
.ansichtsSwitch {
  display: block;
  text-align: right;
  margin-left: auto;
  margin-right: auto;
}
</style>