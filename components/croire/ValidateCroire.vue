<template>
  <div class="wrapper">
    <div class="window">
      <Boucher />
      <div class="bulle">
        <div class="message">
          <div v-if="isGood">
            <span v-if="fr">Bonne réponse!</span>
            <span v-else>Good answer!</span>
          </div>
          <div v-else>
            <span v-if="fr">Mauvaise réponse…</span>
            <span v-else>Wrong answer</span>
          </div>
        </div>

        <div class="answer">
          {{ resolve[fr ? 'fr' : 'en'] }}
        </div>

        <ContinueButton @click.native="$emit('continue')" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isGood', 'resolve'],
  computed: {
    fr() {
      return this.$store.state.lang == 'fr'
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
    .answer {
      margin-top: 30px;
    }
    .boucher {
      //   right: unset;
      //   left: 500px;
      //   bottom: -200px;
      //   transform: scaleX(-1);
    }
    .bulle {
      width: 875px;
      min-height: 423px;
      left: 344px;
      top: 271px;
      //   left: 500px;
      &:after {
        // transform: scaleX(-1);
        // right: -100px;
        top: 200px;
      }
    }
  }
}
</style>
