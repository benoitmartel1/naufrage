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
  .btn {
    width: 100px;
    height: 100px;
    border-radius: 100%;
    background-color: #fff;
    @include bordered;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  width: 100%;
  display: flex;
  padding: 30px;
  justify-content: space-between;
  z-index: 888;
  position: absolute;
  bottom: 0;
  .lang {
    text-transform: uppercase;
  }
}
</style>
