<template>
  <div>
    <AnsichtsSwitch class="ansichtsAuswahl" :aktAnsicht="aktAnsicht" @changed="onAnsichtChange" />
    <md-table v-model="results" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Gesamtstatistik</h1>
      </md-table-toolbar>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-head>{{ item.label }}</md-table-head>
        <md-table-head v-if="item.label === 'Name'">{{ item.valueOne }}</md-table-head>
        <md-table-cell v-else>{{ item.valueOne }}</md-table-cell>
        <md-table-head v-if="item.label === 'Name'">{{ item.valueTwo }}</md-table-head>
        <md-table-cell v-else>{{ item.valueTwo }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>    
</template>

<script>
import AnsichtsSwitch from '@/components/Statistik/AnsichtsSwitch.vue';
import moment from 'moment'

export default {
  name: "ZugCells",
  components: {
    AnsichtsSwitch
  },  
  props: {
    anzInTable: {
        type: Number,
        default: 0
    },
    resultForMonth: {
        type: Array,
        default: function () { return [] }      
    }
  },
  data: function() {
    return {
      aktAnsicht: 1,
      fault: undefined
    };
  },
  computed: {
    results() {
      switch (this.aktAnsicht) {
        case 2:
        case 3:
          return this.$store.state.results.filteredResults
        default:
          return this.$store.state.results.results
      }
    }
  },
  methods: {
    onAnsichtChange(aktAnsicht){
      this.aktAnsicht=aktAnsicht;
      let paras = {
        date: moment().format('YYYY-MM-DD')
      }
      switch (aktAnsicht) {
        case 2:
          paras.month = true
          this.$store.dispatch('results/loadResultsByDate', paras)
          break;
        case 3:
          paras.year = true
          this.$store.dispatch('results/loadResultsByDate', paras)
          break;      
        default:
          break;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-table .md-table-cell .md-table-cell-container .md-table-head-label{
  padding-right: 0px;
  padding-left: 0px;
}
</style>
