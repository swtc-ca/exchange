const state = {
  logs: '',
  orderAsks: [],
  orderBids: [],
  logsList: []
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  appendLog (state, message) {
    state.logs += `\n\n${message}`
  },
  appendLogList (state, message) {
    state.logsList.push(message)
  },
  appendOrderAsks (state, message) {
    state.orderAsks.push(message)
  },
  appendOrderBids (state, message) {
    state.orderBids.push(message)
  }
}

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  appendLog: ({ commit }, message) => commit('appendLog', message),
  appendLogList: ({ commit }, message) => commit('appendLogList', message),
  appendOrderAsks: ({ commit }, message) => commit('appendOrderAsks', message),
  appendOrderBids: ({ commit }, message) => commit('appendOrderBids', message),
}

// getters are functions
const getters = {
  //orderAsks: {},
  //orderBids: {}
}

export default {
	state,
	getters,
	mutations,
	actions,
}
