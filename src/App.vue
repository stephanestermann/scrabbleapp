<template>
  <div id="app">
	<header>
		<div class="header-limiter">
			<h1><span>Steph's Scrabble-App mit Vue.js</span></h1>
            <img alt="Vue logo" src="./assets/Scrabble.jpg">            
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
.rTable {
  display: block;
	width: 50%;
}
.rTableRow {
  display: table-row;
}
.rTableHeading {
  display: table-header-group;
	background-color: #ddd;
	font-weight: bold;
}
.rTableCell, .rTableHead {
  display: table-cell;
	padding: 3px 10px;
	border: 1px solid #999999;
}
.rTableFoot {
 	display: table-footer-group;
  font-weight: bold;
 	background-color: #ddd;
}
.rTableBody {
  display: table-row-group;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  
}
img {
  width: 150px; 
}
</style>
