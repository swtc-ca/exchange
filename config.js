const JingtumLib = require('jingtum-lib')
const Wallet = JingtumLib.Wallet

var wallet_one
var wallet_two
wallet_one = Wallet.generate()
wallet_two = Wallet.generate()

module.exports = {
	wallet_one: wallet_one,
	wallet_two: wallet_two
}
