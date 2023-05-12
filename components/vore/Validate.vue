<template>
  <div class="wrapper">
    <div class="window">
      <Boucher />
      <div class="bulle">
        <div v-if="isGood" class="message">
          <img src="/img/vore/VJ-J2_GOOD.png" alt="" />
          <span v-if="fr">Bravo!</span>
          <span v-else>Bravo in english</span>
          <ContinueButton @click.native="$emit('continue')" />
        </div>
        <div v-else class="message">
          <img src="/img/vore/VJ-J2_BAD.png" alt="" />
          <span v-if="fr">La réponse était:</span>
          <span v-else>The answer is:</span>
          {{ goodAnswerDescription() }}
          <ContinueButton @click.native="$emit('continue')" />
        </div>
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
      //   right: unset;
      //   left: 500px;
      //   bottom: -200px;
      //   transform: scaleX(-1);
    }
    .bulle {
      .message {
        flex-direction: column;
        // text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
      }
      img {
        width: 66px;
        // display: block;
        margin-bottom: 10px;
      }

      width: 658px;
      //   height: 313px;
      left: 613px;
      top: 335px;
      &:after {
        transform: scale(0.7, -0.7);
        // left: -100px;
        top: 60px;
      }
    }
  }
}
</style>
