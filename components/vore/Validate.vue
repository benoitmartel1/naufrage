<template>
  <div class="wrapper">
    <div class="window">
      <Boucher />
      <div :class="['bulle', { bad: !isGood }]">
        <div v-if="isGood" class="message">
          <img src="/img/vore/VJ-J2_GOOD.png" alt="" />
          <span v-if="fr"
            >Bravo!<br />Je suis impressionné par vos connaissances!</span
          >
          <span v-else>Bravo!<br />I'm impressed with your knowledge! </span>
          <ContinueButton @click.native="$emit('continue')" />
        </div>
        <div v-else class="message">
          <img src="/img/vore/VJ-J2_BAD.png" alt="" />
          <span v-if="fr"
            >Meilleure chance la prochaine fois!<br />La bonne réponse est :
          </span>
          <span v-else
            >Better luck next time!<br />The correct answer is:
          </span>
          <div class="correctAnswer">
            {{ goodAnswerDescription() }}
          </div>
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
      .correctAnswer {
        margin: 30px 0;
      }
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
      top: 100px;
      &.bad {
        width: 1500px;
        left: 100px;
      }
      &:after {
        transform: scale(0.7, 0.7);
        // left: -100px;
        top: 130px;
      }
    }
  }
}
</style>
