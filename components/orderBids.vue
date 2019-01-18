<template>
  <log ref='bids' :blessed='true' :content="logs" align="right" valign="center" :border="{ type: 'line' }" :style="logStyle" top="top" left="50%" width="50%" height="60%"/>
</template>

<script>
import moment from 'moment'
import faker from 'faker'
import prettySeconds from 'pretty-seconds'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'order-asks',
  computed: mapState({
    logs: state => state.logs,
  }),
  methods: mapActions([
    'appendLog',
  ]),
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
