<template>
  <div class="wrapper-continue">
    <div
      class="button continue"
      v-html="text ? text : lang == 'fr' ? 'Continuer' : 'Next'"
    ></div>
  </div>
</template>

<script>
export default {
  computed: {
    lang() {
      return this.$store.state.lang
    },
  },
  props: ['text'],
}
</script>

<style scoped lang="scss">
.wrapper-continue {
  width: 100%;
  display: flex;
  justify-content: center;
  .button {
    line-height: 1em;
    display: inline-block;
    font-size: 0.9em;
    font-weight: 800;
    color: white;
    background-color: var(--pink);
    border: 2px var(--burgundy) solid;
    padding: 10px 55px;
    text-align: center;
    border-radius: 50px;
    text-transform: uppercase;
    margin-top: 30px;
  }
}
</style>
