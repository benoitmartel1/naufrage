<template>
  <div class="wrapper">
    <div class="window">
      <Boucher />
      <div class="bulle">
        <div class="message">
          <div class="total">{{ total }}</div>
          <span v-if="lang == 'fr'"
            >Pour décrire tous ces régimes nouveaux, il a bien fallu inventer
            des mots. Légumivore? Poissonivore? Fruitivore? Aidez-moi à me
            démêler en reliant correctement les régimes alimentaires à leur
            définition.</span
          >
          <span v-else
            >To describe all those new types of diet, new words certainly had to
            be invented. Vegevore? Fishivore? Fruitivore? Help me to match the
            type of diet with its definition.</span
          >
        </div>

        <ContinueButton @click.native="$emit('continue')" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['total'],
  computed: {
    lang() {
      return this.$store.state.lang
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100%;

  box-sizing: border-box;
  .window {
    position: relative;
    width: 100%;
    height: 100%;
    // background-color: green;
    overflow: hidden;
    .boucher {
      //   right: unset;
      //   left: 500px;
      //   bottom: -200px;
      //   transform: scaleX(-1);
    }
    .bulle {
      left: 344px;
      top: 271px;
      width: 875px;
      //   height: 423px;
      &:after {
        transform: scaleY(-1);
        top: 150px;
        // left: -100px;
        // top: 20px;
      }
    }
  }
}
</style>
