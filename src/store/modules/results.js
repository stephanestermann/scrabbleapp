import ResultService from '@/api/resultService.js'

const resultServiceInstance = new ResultService();

// initial state
const state = () => ({
  results: [],
  filteredResults: []

})

// getters
const getters = {
  // cartProducts: (state, getters, rootState) => {
  //   return [];
  // },

  // cartTotalPrice: (state, getters) => {
  //   return null
  // }
}

// actions
const actions = {
  loadAllresults ({ commit }) {
    commit('resetStatusInfos', undefined, { root: true })
    commit('setLastActionWithLoading', 'Lade alle Resultate...', { root: true })
    resultServiceInstance.loadAllresults().then(res => {
      commit('setResults', res);
      commit('setLastActionStopLoading', 'Alle Resultate geladen!', { root: true })
    }).catch(err => {
      commit('setResults', []);
      commit('setServerErrorStopLoading', 'Resultate laden fehlgeschlagen! (' + err + ')', { root: true })
    })    
  },
  loadResultsByDate ({ commit }, paras) {
    commit('resetStatusInfos', undefined, { root: true })
    commit('setLastActionWithLoading', 'Lade gewünschte Resultate...', { root: true })
    resultServiceInstance.loadAllresults(paras).then(res => {
      commit('setFilteredResults', res);
      commit('setLastActionStopLoading', 'Gewünschte Resultate geladen!', { root: true })
    }).catch(err => {
      commit('setFilteredResults', []);
      commit('setServerErrorStopLoading', 'Resultate laden fehlgeschlagen! (' + err + ')', { root: true })
    })    
  },
  saveGame ({ commit, dispatch }, scrabbleResult) {
    commit('resetStatusInfos', undefined, { root: true })
    commit('setLastActionWithLoading', 'Speichere das aktuellen Spiel...', { root: true })
    resultServiceInstance.saveGame(scrabbleResult).then(() => {
      commit('setLastActionStopLoading', 'Spiel erfolgreich gespeichert!', { root: true })
      dispatch('loadAllresults')
    }).catch(err => {
      commit('setServerErrorStopLoading', 'Spiel speichern fehlgeschlagen! (' + err + ')', { root: true })
    })    
  }
}

// mutations
const mutations = {
  setResults (state, results) {
    state.results = results
  },
  setFilteredResults (state, filteredResults) {
    state.filteredResults = filteredResults
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}