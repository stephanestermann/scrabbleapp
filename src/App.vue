<template>
  <div id="app">
	<header>
		<div class="header-limiter">
      <h1>
        <img alt="Vue logo" src="./assets/Scrabble.jpg">
          Steph's Scrabble-App mit Vue.js
        <img alt="Vue logo" src="./assets/Scrabble.jpg">
      </h1>        
		</div>
	</header>      
    <body>
        <Uebersichts-bereich></Uebersichts-bereich>
    </body>
  </div>
</template>

<script>
import UebersichtsBereich from './components/UebersichtsBereich.vue'

export default {
  name: 'app',
  components: {
    UebersichtsBereich
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
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
