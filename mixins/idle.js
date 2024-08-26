// let timerDuration = 200
let timeLeft
let timerInterval

export default {
  data() {
    return {
      idleTimerActive: false,
    }
  },
  computed: {
    videoIsPlaying() {
      return this.$store.state.videoIsPlaying
    },
    timerDuration() {
      //   return 10
      return this.$store.state.idleTime || 90
    },
    borneIndex() {
      return this.$store.state.borne
    },
  },
  watch: {
    //Enable/disable the idle timer some pages
    $route(to, from) {
      this.resetIdleTimer()

      if (to.name == 'movie' || to.path == '/') {
        this.idleTimerActive = false
      } else if (to.path != '/') {
        this.idleTimerActive = true
      }
    },
  },
  mounted() {
    this.resetIdleTimer()

    timerInterval = setInterval(() => {
      //Every second, if idle timer is active, decrement timeLeft
      if (this.idleTimerActive == true) {
        if (!this.videoIsPlaying) {
          timeLeft--

          //If no time left, go to default page
          if (timeLeft <= 0) {
            this.$router.push('/langue')
            this.$store.commit('setLang', 'fr')

            this.resetIdleTimer()
          }
        } else {
          timeLeft == this.timerDuration
        }
      }
    }, 1000)

    //On every click on the page, reset idle timer
    if (!window.onclick) {
      window.onclick = () => {
        this.resetIdleTimer()
      }
    }
  },
  beforeDestroy() {
    clearInterval(timerInterval)
  },
  methods: {
    resetIdleTimer() {
      console.log('reset to ' + this.timerDuration)
      timeLeft = this.timerDuration
    },
  },
}
