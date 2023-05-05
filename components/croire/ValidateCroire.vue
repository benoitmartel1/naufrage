<template>
  <div class="wrapper">
    <div class="window">
      <Boucher />
      <div class="bulle">
        <div class="message">
          <div v-if="isGood">
            <span v-if="fr">Bravo!</span>
            <span v-else>EN</span>
          </div>
          <div v-else><span v-if="fr">Bouhou</span> <span v-else>EN</span></div>
        </div>
        <div class="answer">
          {{ answer[fr ? 'fr' : 'en'] }}
        </div>

        <ContinueButton @click.native="$emit('continue')" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isGood', 'answer'],
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
    .boucher {
      right: unset;
      left: 500px;
      bottom: -200px;
      transform: scaleX(-1);
    }
    .bulle {
      left: 500px;
      &:after {
        transform: scaleX(-1);
        left: -100px;
        top: 20px;
      }
    }
  }
}
</style>
