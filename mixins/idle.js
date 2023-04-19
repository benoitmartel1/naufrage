let timerDuration = 20
let timeLeft
let timerInterval

export default {
  data() {
    return { idleTimerActive: true }
  },
  watch: {
    //Enable/disable the idle timer some pages
    $route(to, from) {
      if (to.name == 'movie' || to.path == '/') {
        this.idleTimerActive = false
      } else {
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
        //If no time left, go to default page
        if (timeLeft <= 0) {
          this.$router.push('/')
          this.resetIdleTimer()
        }
      }
    }, 1000)

    //On every click on the page, reset idle timer
    if (!document.onclick) {
      document.onclick = () => {
        this.resetIdleTimer()
      }
    }
  },
  beforeDestroy() {
    clearInterval(timerInterval)
  },
  methods: {
    resetIdleTimer() {
      timeLeft = timerDuration
    },
  },
}
