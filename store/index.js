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
	orders: [],
	order_asks: [],
	order_bids: [],
	logsList: [],
	wallet_one: {},
	wallet_two: {},
	orderbook_limit: 100,
	//wallet_one: { secret: 'sh3J3iB1ZTM9zqpYQTdi2YZL5f8Yx', address: 'jPjo5KEafx9RLmv3HwoUCh9M9VvjJ7EZf9' },
	//wallet_two: { secret: 'sshD7uwhUNtYx6dkBSP6a8ajEfEwk', address: 'jnar4SMhygqeEv4B4EJn3zNbCwuxDTV9Bb' },
	wss1: 'wss://c05.jingtum.com:5443',
	wss2: 'wss://c04.jingtum.com:5443',
	api: 'https://api.jingtum.com',
	remote1: new Remote({server: 'wss://c05.jingtum.com:5020', local_sign: true }),
	remote2: new Remote({server: 'wss://c04.jingtum.com:5020', local_sign: true }),
	currency_swt: { currency: 'SWT', issuer: '' },
	currency_cny: { currency: 'CNY', issuer: 'jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or' },
	currency_cnt: { currency: 'CNT', issuer: 'jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or' },
	currency_jcc: { currency: 'JCC', issuer: 'jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or' },
	currency_vcc: { currency: 'VCC', issuer: 'jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or' },
	currency_eth: { currency: 'eth', issuer: 'jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or' },
	currency_moac: { currency: 'MOAC', issuer: 'jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or' },
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
	appendOrder (state, message) {
		state.orders.push(message)
	},
	appendOrderAsks (state, message) {
		state.order_asks.push(message)
	},
	appendOrderBids (state, message) {
		state.order_bids.push(message)
	},
	updateWalletOne (state, options) {
		state.wallet_one = Object.assign({}, state.wallet_one, {balance: options.Balance || 0, sequence: options.Sequence || 0})
	},
	updateWalletTwo (state, options) {
		state.wallet_two = Object.assign({}, state.wallet_two, {balance: options.Balance || 0, sequence: options.Sequence || 0})
	},
}

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
	appendLog: ({ commit }, message) => commit('appendLog', message),
	appendLogList: ({ commit }, message) => commit('appendLogList', message),
	appendOrder: ({ commit }, message) => commit('appendOrder', message),
	appendOrderAsks: ({ commit }, message) => commit('appendOrderAsks', message),
	appendOrderBids: ({ commit }, message) => commit('appendOrderBids', message),
	updateWallet: ({ commit, state }, args) => {
		let wallet, address
		commit('appendLog', `... updating wallet ${args}`)
		if ( args === 'one' || args === 'wallet_one') {
			address = state.wallet_one.address
			wallet = 'wallet_one'
		} else if ( wallet === 'two' || wallet === 'wallet_two') {
			address = state.wallet_two.address
			wallet = 'wallet_two'
		} else if ( args.startsWith('j')) {
			address = args
			if (address === state.wallet_one.address) {
				wallet = 'wallet_one'
			} else if (address === state.wallet_two.address) {
				wallet = 'wallet_two'
			}
		}
		// handle with address and wallet
		if ( !!address && !!wallet ) {
			commit('appendLog', `... by wallet ${address}`)
			state.remote1.requestAccountInfo({account: address}).submitAsync()
				.then( result => {
					commit('appendLog', `account info for ${wallet}`)
					commit('appendLog', JSON.stringify(result.account_data,'',2))
					if ( wallet === 'wallet_one' ) {
						commit('updateWalletOne', result.account_data)
					} else {
						commit('updateWalletTwo', result.account_data)
					}
				})
				.catch ( error => commit('appendLog', JSON.stringify(error,'',2)) )
		} else {
			commit('appendLog', `... failed updating wallet ${wallet}`)
		}
	},
	//async actionA ({ commit }) { commit('gotData', await getData()) },
}

// getters are functions
const getters = {
	orderAsks: (state) => state.orders.filter( e => e.owner_funds !== undefined).map(e => `${e.Account.slice(0,4)}...${e.Account.slice(-4)}\t${e.owner_funds}\n\t\t${e.quality}`).reduce( (x,y) => `${x}\n${y}`, '') ,
	orderBids: (state) => state.orders.filter( e => e.owner_funds !== undefined).map(e => `${e.owner_funds}\t${e.Account.slice(0,4)}...${e.Account.slice(-4)}\n${e.quality}\t\t`).reduce( (x,y) => `${x}\n${y}`, '') ,
	walletOne: (state) => `${state.wallet_one.address.slice(0,10)}...\nSequence: ${state.wallet_one.sequence}\nBalance: ${state.wallet_one.balance}`,
	walletTwo: (state) => `${state.wallet_two.address.slice(0,10)}...\nSequence: ${state.wallet_two.sequence}\nBalance: ${state.wallet_two.balance}`,
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
		state.logs = 'vuex store created'
		console.log(`vuex store created`)
	}
})
