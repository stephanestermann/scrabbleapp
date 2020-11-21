<template>
<div class="ansichtsSwitch">
  <md-radio v-model="ansicht" @change="onAnsichtChange" value="1">Gesamtstatistik</md-radio>
  <md-radio v-model="ansicht" @change="onAnsichtChange" value="2">Monatsstatistik</md-radio>
  <md-radio v-model="ansicht" @change="onAnsichtChange" value="3">Jahresstatistik</md-radio>
  <month-picker 
    lang="de" 
    v-if="showPicker"
    :year-only="ansicht === '3' ? true : false"
    @change="showDate">
  </month-picker>
  <br />
</div>
</template>

<script>
import { MonthPicker } from 'vue-month-picker'

export default {
  name: "AnsichtsSwitch",
  components: { MonthPicker },
  props: {
      aktAnsicht: Number
  },
  data: function() {
    return {
      ansicht: "1",
      selected: '',
			date: {
				from: null,
				to: null,
				month: null,
				year: null
      },
      showPicker: false
    };
  },
  mounted: function () {
    this.ansicht=this.aktAnsicht;
  },  
  methods: {
    onAnsichtChange() {
      this.showPicker = (this.ansicht === '2' || this.ansicht === '3') ? true : false;
      this.$emit('changed', parseInt(this.ansicht));
    },
    showDate (date) {
			this.date = date
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