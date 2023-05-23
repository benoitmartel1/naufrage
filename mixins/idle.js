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
    timerDuration() {
      return this.$store.state.idleTime || 20
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
        timeLeft--
        // console.log(timeLeft)
        //If no time left, go to default page
        if (timeLeft <= 0) {
          this.$router.push('/')
          this.$store.commit('setLang', 'fr')
          this.resetIdleTimer()
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
      timeLeft = this.timerDuration
    },
  },
}
