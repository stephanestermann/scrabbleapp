<template>
  <div class="root" id="app">
    <md-toolbar class="md-primary outer-toolbar">
      <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
        <md-icon>menu</md-icon>
      </md-button>
      <div class="md-title">Steph's Scrabble-App</div>
      <div class="md-toolbar-section-end">
        <img alt="Steph's Scrabble-App" src="./assets/scrabble.png">
      </div>
    </md-toolbar>
    
    <md-drawer class="scrabble-toolbar" :md-active.sync="menuVisible" md-swipeable>
      <md-toolbar class="md-transparent" md-elevation="0">Menu</md-toolbar>
      <md-list>
        <md-list-item @click="menuVisible = !menuVisible">
          <md-icon>casino</md-icon>
          <router-link class="md-list-item-text" to="/">Spielen</router-link>
        </md-list-item>
        <md-list-item @click="menuVisible = !menuVisible">
          <md-icon>insert_chart_outlined</md-icon>
          <router-link class="md-list-item-text" to="/statistik">Statistik</router-link>
        </md-list-item>
        <md-list-item @click="menuVisible = !menuVisible">
          <md-icon>construction</md-icon>
          <router-link class="md-list-item-text" to="/admin">Administration</router-link>
        </md-list-item>
      </md-list>
    </md-drawer>

    <md-content >
      <router-view></router-view>
    </md-content>

    <md-toolbar :class="getToolbarClass">
      <div class="md-layout toolbar-layout">
        <div class="md-layout-item md-size-15">
          {{$store.state.lastAction}}
        </div>
        <div class="md-layout-item">
            <md-progress-spinner v-if="isLoading" :md-diameter="13" :md-stroke="1.8" md-mode="indeterminate" />
        </div>
        <div class="md-layout-item server-error">
          {{$store.state.serverError}}
        </div>
        Version: {{ appVersion }}
      </div>
    </md-toolbar>

  </div>
</template>

<script>

import { timer } from '@/common/timer.js'

const POLLING_INTERVALLS_MS = [299000, 294000, 289000, 284000, 279000, 274000, 269000, 264000, 259000, 254000]

export default {
  name: 'app',
  components: {},
  data: function() {
    return {
      menuVisible: false
    }
  },
  created: function () {
    this.$store.dispatch('results/loadAllresults').then(() => {
      this.setThePoller()
    })
  },
  computed: {
    appVersion() {
      return process.env.VUE_APP_VERSION
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
    getToolbarClass() {
      const colorClass = this.$store.state.serverError ? 'md-accent' : 'md-transparent'
      return 'md-dense ' + colorClass
    }
  },
  methods: {
    setThePoller() {
      const vm = this
      const poller = new timer()
      poller.start(function() {
        vm.$store.dispatch('results/loadAllresults')
        poller.set_interval(vm.getRandomIntervallRepeat());
      }, vm.getRandomIntervallRepeat(), false)
    },
    getRandomIntervallRepeat() {
      const intervall = POLLING_INTERVALLS_MS[Math.floor((Math.random() * 10))]
      console.log("Neue Intervalldauer(ms): " + intervall)
      return intervall
    }
  }
}
</script>

<style>
  .root {
    height: 100vh;
    border: 1px solid;
    padding: 4px;
  }
  .outer-toolbar {
    max-height: 100px;
  }
  .toolbar-layout {
    width: 100%;
  }
  .server-error {
   text-align: right;
  }
  .md-drawer {
    width: 200px !important;
  }
  .rTable {
    display: table;
    margin-left: auto;
    margin-right: auto;  
    width: 50%;
  }
  .rTableRow {
    display: table-row;
  }
  .rTableHeading {
    display: table-header-group;
    background-color: #ddd;
    font-weight: bold;
    text-align: right;
  }
  .rTableHead {
    display: table-cell;
    padding: 3px 10px;
    border: 1px solid #999999;
  }
  .rTableCell {
    display: table-cell;
    padding: 3px 10px;
    border: 1px solid #999999;
    text-align: left;
  }

  .rTableFoot {
    display: table-footer-group;
    font-weight: bold;
    background-color: #ddd;
  }
  .rTableBody {
    display: table-row-group;
  }
  .header-limiter{
    text-align: center;
    vertical-align: middle;
  }
  img {
  vertical-align: middle;  
    width: 100px; 
  }
</style>
