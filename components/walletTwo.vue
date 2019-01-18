<template>
  <log ref='asks' :blessed='true' :content="logs" align="left" valign="center" :border="{ type: 'line' }" :style="logStyle" top="60%" left="70%" width="30%" height="40%"/>
</template>

<script>
import moment from 'moment'
import faker from 'faker'
import prettySeconds from 'pretty-seconds'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'wallet-two',
  computed: mapState({
    logs: state => state.logs,
  }),
  methods: mapActions([
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
