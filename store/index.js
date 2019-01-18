import BlessedVue from 'blessed-vue'
import Vuex from 'vuex'
import Log from './modules/log'
var Promise = require('bluebird')
var JingtumLib = require('jingtum-lib')
Promise.promisifyAll(JingtumLib)
var Wallet = JingtumLib.Wallet
var Remote = JingtumLib.Remote

BlessedVue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  logs: '',
  order_asks: [],
  order_bids: [],
  logsList: [],
  wallet_one: { secret: 'sh3J3iB1ZTM9zqpYQTdi2YZL5f8Yx', address: 'jPjo5KEafx9RLmv3HwoUCh9M9VvjJ7EZf9' },
  wallet_two: { secret: 'sshD7uwhUNtYx6dkBSP6a8ajEfEwk', address: 'jnar4SMhygqeEv4B4EJn3zNbCwuxDTV9Bb' },
  wss1: 'wss://c05.jingtum.com:5443',
  wss2: 'wss://c04.jingtum.com:5443',
  api: 'https://api.jingtum.com',
  remote1: new Remote({server: 'wss://c05.jingtum.com:5020', local_sign: true }),
  remote2: new Remote({server: 'wss://c04.jingtum.com:5020', local_sign: true })
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
  //wallet_one: (state) => state.wallet_one,
  //wallet_two: (state) => state.wallet_two,
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  modules: { },
  state,
  getters,
  actions,
  mutations,
  strict: false,
  created() {
    console.log(`vuex store created`)
  }
})
