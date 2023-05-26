export default {
  data() {
    return {
      webSocketConnected: false
    }
  },
  methods: {
    connect() {
      console.log('Looking for address...')
      let addr = this.$store.state.settings.websocket_address
      if (addr) {

        console.log('Connecting to ws...')
        console.log(addr)
        const that = this
        var ws = new WebSocket(addr)
        ws.onopen = function (e) {
          console.log('opened')
          that.webSocketConnected = true
        }
        ws.onmessage = function (e) {
          const data = e.data.split('_')
          that.onWsMessage({ type: data[0].toLowerCase(), value: data[1] })
        }

        ws.onclose = function (e) {
          console.log(
            'Socket is closed. Reconnect will be attempted in 1 second.',
            e.reason
          )
          that.webSocketConnected = false
          // setTimeout(function () {
          //   that.connect()
          // }, 1000)
        }

        ws.onerror = function (err) {
          console.log(err)
          // console.error(
          //   'Socket encountered error: ',
          //   err.message,
          //   'Closing socket'
          // )
          ws.close()
          that.webSocketConnected = false
        }
      }
    },
  },
  mounted() {
    setInterval(() => {
      if (!this.webSocketConnected) {
        this.connect()
      }
    }, 5000);
  },
}
