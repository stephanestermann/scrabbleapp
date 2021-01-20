<template>
  <div>
    <md-toolbar >
      <h1 :id="aktAnsicht" class="md-title">
        {{getTitle()}}
        <date-picker 
          v-if="(aktAnsicht!==1)"
          :clearable="false"
          :editable="false"
          v-model="dateFormat"
          valueType="format"
          :type="getDatePickerType"
          >
        </date-picker>
      </h1>
    <AnsichtsSwitch  :aktAnsicht="aktAnsicht" @changed="onAnsichtChange" />      
    </md-toolbar>
    
    <md-table v-model="results" md-card>
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
import DatePicker from 'vue2-datepicker';

const DATE_FORMAT = 'YYYY-MM-DD'

export default {
  name: "ZugCells",
  components: {
    AnsichtsSwitch,
    DatePicker
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
      dateFormat: moment().format(DATE_FORMAT)
    };
  },
  watch: {
    dateFormat: function () {
      this.onAnsichtChange(this.aktAnsicht)
    }
  },
  computed: {
    getDatePickerType() {
      switch (this.aktAnsicht) {
        case 2:
          return 'month'
        case 3:
          return 'year'
        default:
          return ''
      }
    },
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
    getTitle() {
      switch (this.aktAnsicht) {
        case 2:
          return 'Monatsansicht für'
        case 3:
          return 'Jahresstatistik für'
        default:
          return 'Gesamtstatistik'
      }
    },
    onAnsichtChange(aktAnsicht){
      this.aktAnsicht=aktAnsicht;
      let paras = {
        date: moment().format(DATE_FORMAT)
      }
      switch (aktAnsicht) {
        case 2:
          paras.month = true
          paras.date = this.dateFormat
          this.$store.dispatch('results/loadResultsByDate', paras)
          break;
        case 3:
          paras.year = true
          paras.date = this.dateFormat
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
