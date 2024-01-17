<template>
  <div :class="[{ appro: approMode }]">
    <div id="app" class="no-cursor">
      <Nav v-if="!this.$store.state.moviePlaying" />
      <MovieComing v-if="timeToMovie > 0" :timeToMovie="timeToMovie" />
      <Nuxt />
    </div>
    <TestPanel v-if="approMode" />
  </div>
</template>

<script>
import ws from '@/mixins/ws.js'
import sound from '@/mixins/sound.js'
import idle from '~/mixins/idle.js'
let movieInterval
export default {
  data() {
    return {
      timeToMovie: 0,
    }
  },
  computed: {
    approMode() {
      return false
      return Boolean(
        process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'dev'
          ? 1
          : 0
      )
    },
    doLoop() {
      return this.$store.state.settings.movieLoop
    },
  },
  mounted() {
    document.addEventListener('keydown', (e) => {
      if (e.key == 'v') {
        // alert('v')
        this.timeToMovie = 3
      }
    })
  },
  mixins: [ws, sound, idle],
  methods: {
    startMovie(secondsBeforePlayback) {
      if (!this.timeToMovie && !this.$store.state.moviePlaying) {
        this.timeToMovie =
          secondsBeforePlayback == 0 ? -1 : secondsBeforePlayback
      }
    },
    stopMovie() {
      this.timeToMovie = 0
      clearInterval(movieInterval)

      if (this.$route.name == 'movie') {
        this.$router.push('/')
        this.$store.commit('setMoviePlaying', false)
      }
    },
    onWsMessage(msg) {
      if (msg.type == 'start' && !this.$store.state.settings.movieLoop) {
        this.startMovie(msg.value)
      }

      if (msg.type == 'stop' && this.doLoop !== 'true') {
        this.stopMovie()
      }
      if (msg.type == 'vol_film') {
        this.$store.commit('setFilmVolume', msg.value / 100)
      }
      if (msg.type == 'vol_amb') {
        this.$store.commit('setAmbVolume', msg.value / 100)
      }
      if (msg.type == 'loop') {
        this.$store.commit('setLoop', msg.value)
        if (msg.value == 'true' && !this.$store.state.moviePlaying) {
          this.startMovie(0)
        }
      }
      if (msg.type == 'shutdown') {
        window.shutdown()
      }
      if (msg.type == 'reboot') {
        window.reboot()
      }
    },
  },
  watch: {
    timeToMovie(val, old) {
      if (old == 0) {
        if (val == -1) {
          this.timeToMovie = 0
          this.$store.commit('setMoviePlaying', true)
          this.$router.push('/movie')
        } else {
          if (val) {
            let fadeOutStartTime = val * 0.2
            this.fadeOutDuration = fadeOutStartTime

            movieInterval = setInterval(() => {
              this.timeToMovie--
              if (this.timeToMovie <= fadeOutStartTime && !this.moviePlaying) {
                this.$store.commit('setMoviePlaying', true)
              }
              if (this.timeToMovie <= 0) {
                clearInterval(movieInterval)
                this.$router.push('/movie')
              }
            }, 1000)
          }
        }
      }
    },
  },
}
</script>

<style lang="scss">
body {
  font-size: 48px;
  margin: 0;
  background-color: #333;
}
@keyframes bg-scrolling-reverse {
  100% {
    background-position: 56px 56px;
  }
}
#app {
  position: relative;
  background: url('~/assets/img/Pattern-1.png');
  transition: transform 600ms ease-out;
  width: $width;
  height: $height;
  overflow: hidden;
  &:has(.old) {
    background: url('~/assets/img/Pattern-1920.png');
  }
}

.appro {
  //   margin: 30px;
  transform: scale(0.9);
  transform-origin: 0 0;
}
.page-enter-active {
  transition: all 0.4s;
  .backdrop,
  .woman {
    transition: all 0.4s var(--cubic);
  }
}
.page-enter {
  opacity: 0;
}
.page-enter {
  .backdrop {
    transform: scale(0.92) rotate(-3deg);
  }
  .woman {
    filter: brightness(0);
    transform: scale(1.2) translateX(-200px);
  }
}
</style>
