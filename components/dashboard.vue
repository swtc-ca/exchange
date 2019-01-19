<template>
	<screen ref='screen' :smartCSR="true" :keys="true">
		<order-asks />
		<order-bids />
		<wallet-one />
		<wallet-two />
		<logs />
	</screen>
</template>

<script>
import moment from 'moment'
import Logs from './logs.vue'
import OrderAsks from './orderAsks.vue'
import OrderBids from './orderBids.vue'
import WalletOne from './walletOne.vue'
import WalletTwo from './walletTwo.vue'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
	name: 'dashboard',
	computed: {
		...mapState(['currency_swt', 'currency_cny', 'currency_vcc', 'currency_jcc','logs', 'remote1', 'remote2', 'orders'],),
		...mapGetters(['orderAsks'],),
	},
	methods: { 
		...mapActions(['appendLog', 'appendOrder']),
	},
	components: {
		Logs,
		OrderAsks,
		OrderBids,
		WalletOne,
		WalletTwo
	},
	data: () => {
		return {
		}
	},
	mounted () {
		this.$refs.screen.key(['C-c'], () => {
			process.exit(0)
		})
		var options_swt_cny = {
			limit: 20,
			gets: this.currency_swt,
			pays: this.currency_cny
		}
		var async_ops = async () => {
			try {
				let orderbooks = await this.remote1.requestOrderBook(options_swt_cny).submitAsync()
				this.appendLog(`... ${orderbooks.offers.length} orderbook retrieved`)
				orderbooks.offers.forEach( (orderbook) => {
					this.appendOrder(orderbook)
				})
			} catch (error) {
				this.appendLog('error occurs')
				this.appendLog(JSON.stringify(error,'',2))
			}
		}
		async_ops()
	}
}
</script>
