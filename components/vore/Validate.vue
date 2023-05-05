<template>
  <div class="wrapper">
    <div class="window">
      <Boucher />
      <div class="bulle">
        <div class="message">
          <div v-if="isGood">
            <span v-if="fr">Bravo!</span>
            <span v-else>Bravo in english</span>
          </div>
          <div v-else>
            <span v-if="fr">La réponse était:</span>
            <span v-else>The answer is:</span>
            <br />{{ goodAnswerDescription() }}
          </div>
        </div>

        <ContinueButton @click.native="$emit('continue')" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isGood', 'question'],
  computed: {
    fr() {
      return this.$store.state.lang == 'fr'
    },
  },
  methods: {
    goodAnswerDescription() {
      return this.question.answers.find((a) => a.good)[this.fr ? 'fr' : 'en']
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
