import ResultService from '@/api/resultService.js'

const resultServiceInstance = new ResultService();

// initial state
const state = () => ({
  results: []
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
  }
  //   state.items.push({
  //     id,
  //     quantity: 1
  //   })
  // },

  // setCheckoutStatus (state, status) {
  //   state.checkoutStatus = status
  // }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}