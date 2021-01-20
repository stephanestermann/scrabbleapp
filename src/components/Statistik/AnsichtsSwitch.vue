<template>
<div class="md-layout-item ansichtsSwitch">
  <md-radio v-model="ansicht" @change="onAnsichtChange" :value="1">Gesamtstatistik</md-radio>
  <md-radio v-model="ansicht" @change="onAnsichtChange" :value="2">Monatsstatistik</md-radio>
  <md-radio v-model="ansicht" @change="onAnsichtChange" :value="3">Jahresstatistik</md-radio>
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
      ansicht: 1,
    };
  },
  mounted: function () {
    this.ansicht=this.aktAnsicht;
  },  
  methods: {
    onAnsichtChange() {
      this.$emit('changed', parseInt(this.ansicht));
    }
  }
};
</script>

<style>
.ansichtsSwitch {
  text-align: right;
  margin-left: auto;
  margin-right: auto;
}
</style>