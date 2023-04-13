<template>
  <div class="nav">
    <div class="btn home"><NuxtLink to="/">HOME</NuxtLink></div>
    <div class="btn lang" @click="changeLang(lang)">
      {{ lang == 'en' ? 'fr' : 'en' }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    lang() {
      return this.$store.state.lang
    },
  },
  methods: {
    changeLang(l) {
      this.$store.commit('setLang', l == 'en' ? 'fr' : 'en')
    },
  },
}
</script>

<style lang="scss">
.nav {
  width: 100%;
  /* margin: 30px; */

  //   background-color: #666;
  /* height: 107px; */
  display: flex;
  padding: 30px;
  justify-content: space-between;
  z-index: 100;
  position: absolute;
  bottom: 0;
  .lang {
    text-transform: uppercase;
  }
}
</style>
