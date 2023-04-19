export default {
  methods: {
    connect() {
      console.log('Connecting to ws...')
      const that = this
      var ws = new WebSocket('ws://127.0.0.1:1880/boucherie/')

      ws.onmessage = function (e) {
        const data = e.data.split('_')
        that.onWsMessage({ type: data[0].toLowerCase(), value: data[1] })
      }

      ws.onclose = function (e) {
        console.log(
          'Socket is closed. Reconnect will be attempted in 1 second.',
          e.reason
        )
        setTimeout(function () {
          that.connect()
        }, 1000)
      }

      ws.onerror = function (err) {
        console.error(
          'Socket encountered error: ',
          err.message,
          'Closing socket'
        )
        ws.close()
      }
    },
  },
  mounted() {
    this.connect()
  },
}
