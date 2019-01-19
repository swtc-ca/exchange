<template>
	<log ref='two' :blessed='true' :content="walletTwo" align="left" valign="center" :border="{ type: 'line' }" :style="logStyle" top="60%" left="70%" width="30%" height="40%"/>
</template>

<script>
import moment from 'moment'
import faker from 'faker'
import prettySeconds from 'pretty-seconds'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
	name: 'wallet-two',
	computed: {
		...mapState(['currency_swt', 'currency_cny', 'currency_vcc', 'currency_jcc','logs', 'remote1'],),
		...mapGetters(['walletTwo'],),
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
