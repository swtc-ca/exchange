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
	await check_config()
	run_vue()
}

main()
