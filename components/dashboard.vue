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
	}
}
</script>
