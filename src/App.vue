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
      </md-list>
    </md-drawer>

    <md-content class="first-content">
      <router-view></router-view>
        <!-- <Uebersichts-bereich></Uebersichts-bereich> -->
    </md-content>
  </div>
</template>

<script>
import UebersichtsBereich from './components/UebersichtsBereich.vue'

export default {
  name: 'app',
  components: {
    UebersichtsBereich
  },
  data: function() {
    return {
      menuVisible: false
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
