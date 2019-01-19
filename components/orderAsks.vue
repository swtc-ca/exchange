<template>
	<log ref='asks' :blessed='true' :content="orderAsks" align="left" valign="center" :border="{ type: 'line' }" :style="logStyle" top="top" left="left" width="50%" height="60%"/>
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
		...mapGetters(['orderAsks'],),
	},
	methods: { 
		...mapActions(['appendLog', 'appendOrder']),
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
