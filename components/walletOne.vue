<template>
	<log ref='one' :blessed='true' :content="walletOne" align="left" valign="center" :border="{ type: 'line' }" :style="logStyle" top="60%" left="left" width="30%" height="40%"/>
</template>

<script>
import moment from 'moment'
import faker from 'faker'
import prettySeconds from 'pretty-seconds'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
	name: 'wallet-one',
	computed: {
		...mapState(['currency_swt', 'currency_cny', 'currency_vcc', 'currency_jcc','logs', 'remote1'],),
		...mapGetters(['walletOne'],),
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
