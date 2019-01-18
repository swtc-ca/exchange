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
export default {
  name: 'dashboard',
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
