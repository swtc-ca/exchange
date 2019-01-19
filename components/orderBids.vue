<template>
	<log ref='bids' :blessed='true' :content="orderBids" align="right" valign="center" :border="{ type: 'line' }" :style="logStyle" top="top" left="70%" width="30%" height="60%"/>
</template>

<script>
import moment from 'moment'
import faker from 'faker'
import prettySeconds from 'pretty-seconds'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
	name: 'order-bids',
	computed: {
		...mapState(['currency_swt', 'currency_cny', 'currency_vcc', 'currency_jcc','logs', 'remote1', 'remote2', 'orders'],),
		...mapGetters(['orderBids'],),
	},
	methods: { 
		...mapActions(['appendLog', 'appendOrderBids']),
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
	}
}
</script>
