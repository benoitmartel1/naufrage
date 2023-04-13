<template>
  <div>
    <Nav />
    <div class="main">
      <div class="btn panier">
        <NuxtLink to="/panier">
          <div class="title">
            <span v-if="lang == 'fr'">Dans mon p'tit panier...</span>
            <span v-else>EN Dans mon p'tit panier...</span>
          </div>
          <div class="icon"></div>
        </NuxtLink>
      </div>
      <div class="btn vore">
        <NuxtLink to="/vore">
          <div class="title">
            <span v-if="lang == 'fr'">Quel <i>vore</i> es-tu ?</span>
            <span v-else>EN Dans mon p'tit panier...</span>
          </div>
          <div class="icon"></div>
        </NuxtLink>
      </div>
      <div class="btn croire">
        <div class="title">
          <span v-if="lang == 'fr'">J'sais pas si tu vas m'croire?</span>
          <span v-else>EN Dans mon p'tit panier...</span>
        </div>
        <div class="icon"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Howl, Howler } from 'howler'
let timer, sound
export default {
  layout: 'default',
  data() {
    return {}
  },
  computed: {
    lang() {
      return this.$store.state.lang
    },
  },
  beforeMount() {
    this.$store.commit('resetGameData')
  },
  mounted() {
    if (!sound) {
      sound = new Howl({
        src: ['audio/ambient.mp3'],
        loop: true,
        volume: 0.5,
      })
      //   sound.play()
    }
  },
  methods: {
    fadeOutAudio() {
      sound.fade(1, 0, 1000)
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  width: 80%;
  margin: auto;
  gap: 30px;
  padding: 30px;

  justify-content: space-between;
  .btn {
    flex: 1;
    display: flex;
    padding: 30px;
    // margin-right: 30px;
    height: 600px;
    border: 2px solid black;
    background-color: white;
  }
}
</style>
