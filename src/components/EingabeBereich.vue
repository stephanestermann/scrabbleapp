<template>
  <div class="input">
    {{msg}}
		<form v-on:submit.prevent="addNewScrabblezug">
			<label>Total Punkte für diesen Zug:<input v-model="zug.totalPunkteZug" /></label>
			<label>Bingo?<input type="checkbox" v-model="zug.bingo" /></label>
			<button type="submit">Scrabblezug eingeben</button>
		</form>    
  </div>
</template>

<script>
export default {
  name: 'Eingabebereich',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
