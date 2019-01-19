<template>
  <log ref='asks' :blessed='true' :content="logs" align="left" valign="center" :border="{ type: 'line' }" :style="logStyle" top="60%" left="30%" width="40%" height="40%"/>
</template>

<script>
import moment from 'moment'
import faker from 'faker'
import prettySeconds from 'pretty-seconds'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'logs',
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
    this.appendLog(`application started`)
    setInterval(() => {
      this.appendLog(`${faker.name.findName()} called from ${faker.address.state()} ${prettySeconds(faker.random.number(3600))} ago.`)
    }, 5000)
  }
}
</script>
