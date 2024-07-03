<template>
  <div class="wrapper" v-if="bornes.length">
    <div class="btn fr" @pointerdown="onPointer('fr')">
      <div class="title">{{ borne.fr.title }}</div>
      <div class="sub">{{ borne.fr.sub }}</div>
    </div>
    <div class="btn en" @pointerdown="onPointer('en')">
      <div class="title">{{ borne.en.title }}</div>
      <div class="sub">{{ borne.en.sub }}</div>
    </div>
  </div>
</template>

<script>
import { bornes } from '~/static/data/bornes.json?nocache=123'

export default {
  data() {
    return {
      bornes: [],
    }
  },
  mounted() {
    this.bornes = JSON.parse(JSON.stringify(bornes))
  },
  methods: {
    changeLang(lang) {
      this.$store.commit('setLang', lang)
    },
    onPointer(lang) {
      this.changeLang(lang)
      this.$router.push('/borne_' + (this.borneIndex == 0 ? 1 : 2))
    },
  },
  computed: {
    borneIndex() {
      return this.$store.state.borne
    },
    borne() {
      return this.bornes[this.borneIndex]
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  max-width: 82%;
  margin: auto;
  margin-top: 5vh;
  //   border: 2px yellow dashed;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .btn {
    margin-top: 80px;
    text-align: center;
    &:first-of-type {
      transform: scale(1.3);
    }
    &:last-of-type {
      transform: scale(0.8);
    }
    .sub {
      font-weight: 400;
    }
  }
}
</style>
