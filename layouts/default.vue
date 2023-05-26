<template>
  <div :class="[{ appro: approMode }]">
    <div id="app">
      <Nav v-if="!this.$store.state.moviePlaying" />
      <MovieComing v-if="timeToMovie" :timeToMovie="timeToMovie" />
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
      // return true
      return Boolean(
        process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'dev'
          ? 1
          : 0
      )
      // return false
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
    onWsMessage(msg) {
      if (msg.type == 'start') {
        if (!this.timeToMovie && !this.$store.state.moviePlaying) {
          this.timeToMovie = msg.value
        }
      }
      if (msg.type == 'stop') {
        this.$router.push('/')
        this.$store.commit('setMoviePlaying', false)
      }
      if (msg.type == 'volume') {
        this.$store.commit('setVolume', msg.value)
      }
      if (msg.type == 'shutdown') {
        window.shutdown()
      }
    },
  },
  watch: {
    timeToMovie(val, old) {
      if (val && old == 0) {
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
