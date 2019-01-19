const fs = require('fs')
var wallet_one
var wallet_two

if (fs.existsSync('./config_local.js')) {
	console.log('... found local configuration')
	var config_local = require('./config_local')
	wallet_one = config_local.wallet_one
	wallet_two = config_local.wallet_two
} else {
	const JingtumLib = require('jingtum-lib')
	const Wallet = JingtumLib.Wallet
	wallet_one = Wallet.generate()
	wallet_two = Wallet.generate()
}

module.exports = {
	wallet_one: wallet_one,
	wallet_two: wallet_two
}
