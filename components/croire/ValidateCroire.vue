<template>
  <div class="wrapper">
    <div class="window">
      <Boucher />
      <div class="bulle-wrapper">
        <div class="bulle">
          <div class="message">
            <b>
              <div v-if="isGood">
                <span v-if="fr">Bonne réponse!</span>
                <span v-else>Good answer!</span>
              </div>
              <div v-else>
                <span v-if="fr">Mauvaise réponse…</span>
                <span v-else>Wrong answer</span>
              </div>
            </b>
          </div>

          <div class="answer">
            {{ resolve[fr ? 'fr' : 'en'] }}
          </div>

          <ContinueButton @click.native="$emit('continue')" />
        </div>
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
    .bulle-wrapper {
      //   border: 1px solid yellow;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    .bulle {
      position: unset;
      width: 875px;
      min-height: 423px;
      margin-left: 344px;
      margin-bottom: 50px;
      //   top: 271px
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
