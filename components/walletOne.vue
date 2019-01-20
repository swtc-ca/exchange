<template>
	<log ref='one' :blessed='true' :content="walletInfoOne" align="left" valign="center" :border="{ type: 'line' }" :style="logStyle" top="60%" left="left" width="30%" height="40%"/>
</template>

<script>
import moment from 'moment'
import faker from 'faker'
import prettySeconds from 'pretty-seconds'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
	name: 'wallet-one',
	computed: {
		...mapState(['currency_swt', 'currency_cny', 'currency_vcc', 'currency_jcc','logs', 'remote1', 'remote2', 'wallet_one', 'wallet_two'],),
		...mapGetters(['walletOne', 'balanceOne', 'walletInfoOne']),
	},
	methods: { 
		...mapActions(['appendLog', 'appendOrder', 'updateWallet']),
	},
	data: () => {
		return {
			logStyle: {
				bg: 'black',
				fg: 'white',
				border: {
					fg: 'green',
					// bg: 'red'
				}
			},
			logListStyle: {
			}
		}
	},
	mounted () {
		this.updateWallet(this.wallet_one.address)
	}
}
</script>
