import Vue from 'vue'
import Vuex from 'vuex'
import results from './modules/results.js'
import { createLogger } from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        results
    },
    state: {
        serverError: undefined,
        lastAction: undefined,
        isLoading: false
    },
    mutations: {
        resetStatusInfos (state) {
            state.serverError = undefined
            state.lastAction = undefined
            state.isLoading = false
        },
        setServerErrorStopLoading (state, serverError) {
            state.serverError = serverError
            state.isLoading = false
        },
        setLastActionWithLoading (state, lastAction) {
            state.lastAction = lastAction
            state.isLoading = true
        },
        setLastActionStopLoading (state, lastAction) {
            state.lastAction = lastAction
            state.isLoading = false
        },
        setIsLoading (state, isLoading) {
            state.isLoading = isLoading
        }
    },
    actions: {
        // general stuff
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
});