<template>
  <div class="nav">
    <div class="btn home"><NuxtLink to="/">HOME</NuxtLink></div>
    <div class="game">{{ gameName() }}</div>
    <div class="btn lang" @click="changeLang()">
      {{ !fr ? 'fr' : 'en' }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    fr() {
      return this.$store.state.lang == 'fr'
    },
  },
  methods: {
    changeLang() {
      this.$store.commit('setLang', !this.fr ? 'fr' : 'en')
    },
    gameName() {
      switch ($nuxt.$route.name.split('-')[0]) {
        case 'panier':
          return this.fr ? 'Dans mon p’tit panier…' : 'EN In my little basket'
          break
        case 'vore':
          return this.fr ? 'Quel vore es-tu?' : 'EN In my little basket'
          break
        case 'croire':
          return this.fr
            ? 'J’sais pas si tu vas m’croire?'
            : 'EN In my little basket'
          break
        default:
          break
      }
    },
  },
}
</script>

<style lang="scss">
.nav {
  .game {
    font-weight: 400;
    font-size: 36px;
  }
  .btn {
    color: white;
    width: 80px;
    height: 80px;
    font-size: 30px;
    border-radius: 100%;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  width: 100%;
  display: flex;
  padding: 40px;
  align-items: center;
  justify-content: space-between;
  z-index: 888;
  position: absolute;
  bottom: 0;
  .lang {
    text-transform: uppercase;
  }
}
</style>
