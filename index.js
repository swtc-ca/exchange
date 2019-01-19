import Vue from 'blessed-vue'
import Dashboard from './components/dashboard.vue'
import store from './store'
const el = Vue.dom.createElement()
Vue.dom.append(el)
var helper = require('./helper')
var config = require('./config')
const JingtumLib = require('jingtum-lib')
const Wallet = JingtumLib.Wallet

var check_config = async () => {
  if (store.state.wallet_one.address === undefined) {
    store.state.wallet_one = Object.assign({}, config.wallet_one)
  }
  if (store.state.wallet_two.address === undefined) {
    store.state.wallet_two = Object.assign({}, config.wallet_two)
  }
  console.log(config)
  await helper.delay(2000)
}

var run_vue = async () => {
  const instance = new Vue({
    name: 'app',
    components: {
      Dashboard
    },
    store,
    template: '<dashboard />'
  }).$mount(el)
}

var main = async () => {
	try {
		let connect_result1 = await store.state.remote1.connectAsync()
		console.log(connect_result1)
		store.commit('appendLog', 'remote1 connected')
		let connect_result2 = await store.state.remote2.connectAsync()
		console.log(connect_result2)
		store.commit('appendLog', 'remote2 connected')
		await check_config()
	} catch (error) {
		store.commit('appendLog','error occurs')
		console.log(error)
		process.exit(1)
	}
	run_vue()
}

main()
