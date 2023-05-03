<template>
  <div :class="[{ appro: approMode }]">
    <div id="app">
      <Nav v-if="!this.$store.state.moviePlaying" />
      <MovieComing v-if="timeToMovie" :timeToMovie="timeToMovie" />
      <Nuxt />
    </div>
    <TestPanel />
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
      approMode: 1,
      timeToMovie: 0,
    }
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
#app {
  transition: transform 600ms ease-out;
  width: $width;
  height: $height;
  background-color: beige;
  overflow: hidden;
  &:has(.old) {
    background-color: rgb(222, 195, 157);
  }
}

.appro {
  margin: 30px;
  transform: scale(0.5);
  transform-origin: 0 0;
}
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>
